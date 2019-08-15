<template>
  <div class="batch-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name:'addbatch'})">添加批次</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.batchName" @keyup.enter.native="simpleSearchData" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="batchId" label="车联网批次" sortable="custom" min-width="96"></el-table-column>
          <el-table-column prop="batchSn" label="批次号" sortable="custom" min-width="145"></el-table-column>
          <el-table-column prop="batchName" label="名称" sortable="custom" min-width="120"></el-table-column>
          <el-table-column prop="organCode" label="机构" sortable="custom" min-width="150">
            <template slot-scope="scope">{{scope.row.organCode | valueToLabel(orgs)}}</template>
          </el-table-column>
          <el-table-column prop="organCode" label="公司名称" sortable="custom" min-width="150">
            <template slot-scope="scope">{{scope.row.organCode | valueToLabel(orgs, 'label2')}}</template>
          </el-table-column>
          <el-table-column prop="batchShipper" label="发货人" sortable="custom" width="80"></el-table-column>
          <el-table-column prop="outTime" label="出货时间" sortable="custom" width="96">
            <template slot-scope="scope">{{scope.row.outTime | formatDate('yyyy-mm-dd')}}</template>
          </el-table-column>
          <el-table-column prop="pickerName" label="提货人" sortable="custom" width="80"></el-table-column>
          <el-table-column prop="timeAdded" label="创建时间" sortable="custom" width="153">
            <template slot-scope="scope">{{scope.row.timeAdded | formatDate}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" @click="showBatchDetail(scope)">详情</el-button>
              <el-button type="text" @click="$router.push({name:'batImpDetail',query:{batchId:scope.row.batchId}})">导入明细</el-button>
              <el-button type="text" @click="$router.push({name:'devExcepLog', query:{batchId: scope.row.batchId}})">异常记录</el-button>
              <el-button type="text" class="text_warning" @click="showImportDevBatchSn(scope)">导入</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="600px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="90px" v-loading="loadData">
            <el-form-item label="名称">
              <el-input v-model="formInline.batchName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="设备SN号">
              <el-input v-model="formInline.sn" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="公司名称">
              <el-select v-model="formInline.organCode" filterable clearable placeholder="请选择">
                <el-tooltip effect="dark" :content="'所属机构：' + item.label" placement="right" v-for="(item, index) in orgs" :key="index">
                  <el-option :label="item.label2" :value="item.value"></el-option>
                </el-tooltip>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="formInline.createStartTime" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="创建时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.createEndTime" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="创建时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 导入设备SN号 -->
    <el-dialog title="导入设备SN号" @close="close" :visible.sync="importSnVisible" width="700px" :close-on-click-modal="false">
      <div slot>
        <el-form ref="uploadForm" :inline="false" size="small" label-width="110px">
          <el-form-item label="请选择文件：">
            <v-upload ref="upload" :format="['.txt']" :hasPreview="true" @showPriview="showPriview"></v-upload>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="submitForm">导入</el-button>
      </div>
    </el-dialog>
    <!-- 查看批次详细信息 -->
    <el-drawer title="查看批次详细信息" :visible.sync="isShowBatchDetail" direction="rtl" size="500px" :wrapperClosable="true">
      <el-form class="check-form" :inline="false" :model="batchDetailData" size="small" label-width="120px" v-loading="detailLoadData">
        <el-form-item label="批次编号：">
          <span>{{batchDetailData.batchSn}}</span>
        </el-form-item>
        <el-form-item label="批次名称：">
          <span>{{batchDetailData.batchName}}</span>
        </el-form-item>
        <el-form-item label="批次备注：">
          <span>{{batchDetailData.batchMemo}}</span>
        </el-form-item>
        <el-form-item label="发货人姓名：">
          <span>{{batchDetailData.batchShipper}}</span>
        </el-form-item>
        <el-form-item label="出货时间：">
          <span>{{batchDetailData.outTime | formatDate('yyyy-mm-dd')}}</span>
        </el-form-item>
        <el-form-item label="机构：">
          <span>{{batchDetailData.orgnName}}</span>
        </el-form-item>
        <el-form-item label="销往省份：">
          <span>{{batchDetailData.proviceName}}</span>
        </el-form-item>
        <el-form-item label="销往城市：">
          <span>{{batchDetailData.cityName}}</span>
        </el-form-item>
        <el-form-item label="销往区县：">
          <span>{{batchDetailData.districtName}}</span>
        </el-form-item>
        <el-form-item label="提货人姓名：">
          <span>{{batchDetailData.pickerName}}</span>
        </el-form-item>
        <el-form-item label="提货人电话：">
          <span>{{batchDetailData.pickerPhone}}</span>
        </el-form-item>
        <el-form-item label="提货人邮箱：">
          <span>{{batchDetailData.pickerEmail}}</span>
        </el-form-item>
        <el-form-item label="硬件版本：">
          <span>{{batchDetailData.hardVersionName}}</span>
        </el-form-item>
        <el-form-item label="软件版：">
          <span>{{batchDetailData.softVersionName}}</span>
        </el-form-item>
        <el-form-item label="创建时间：">
          <span>{{batchDetailData.timeAdded | formatDate}}</span>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 上传文件结果 -->
    <v-result ref="result" :resultData="resultData" label="设备SN号" tProp="sn"></v-result>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      importSnVisible: false,
      isShowBatchDetail: false,
      detailLoadData: false,
      batchDetailData: {},
      resultData: [],
      curScope: {},
      devAbRecord: {
        data: [{
          a: 1
        }],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    simpleSearchData() { // 简单查询
      let batchName = this.formInline.batchName
      this.formInline = {
        batchName,
      }
      this.searchData()
    },
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getDevicebatch
      })
    },
    showBatchDetail(scope) {
      this.isShowBatchDetail = true
      this.detailLoadData = true
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.deviceBatchDetail,
        params: { id: scope.row.batchId },
        done: ((res) => {
          this.detailLoadData = false
          this.batchDetailData = res.data || {}
        })
      })
    },
    // 提交表单上传文件
    submitForm() {
      if (this.$refs.upload.fileList.length === 0) {
        this.showMsgBox({
          message: '请选择要上传的文件！'
        })
      } else {
        this.formData = new FormData()
        this.formData.append('file', this.$refs.upload.fileList[0].raw)
        this.formData.append('batchId', this.curScope.batchId)
        this.formData.append('batchSn', this.curScope.batchSn)
        this.formData.append('organCode', this.curScope.organCode)
        _axios.send({
          method: 'post',
          url: _axios.ajaxAd.importDeviceBatchSn,
          data: this.formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          done: ((res) => {
            this.resultData = res.data || []
            this.importSnVisible = false
            this.$refs.result.show()
            setTimeout(() => {
              this.showMsgBox({
                type: 'success',
                message: '操作成功！'
              })
            }, 150)
          })
        })
      }
    },
    close() {
      // 关闭弹框的时候清掉选择上传的文件
      this.$refs.upload.clearFileList()
    },
    showPriview() { // 展示.txt模板文件
      Api.UNITS.showTxT('deviceSn.txt', '1060111802001035#1060111802001036#1060111802001037')
    },
    showImportDevBatchSn(scope) {
      this.importSnVisible = true
      this.curScope = scope.row
    },
  },
  computed: {
    // 起始时间约数
    startDatePicker() {
      return Api.UNITS.startDatePicker(this, this.formInline.createEndTime)
    },
    // 结束时间约数
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this.formInline.createStartTime)
    }
  }
}

</script>
<style lang="scss"></style>
