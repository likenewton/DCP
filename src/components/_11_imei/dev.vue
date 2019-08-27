<template>
  <div class="dev-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="importIEMIvisible = true">设备导入</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.deviceImei" @keyup.enter.native="simpleSearchData" placeholder="设备IMEI"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="deviceImei" label="设备IMEI" sortable="custom" width="160"></el-table-column>
          <el-table-column prop="organCode" label="机构" sortable="custom" min-width="160">
            <template slot-scope="scope">{{scope.row.organCode | valueToLabel(orgs)}}</template>
          </el-table-column>
          <el-table-column prop="organCode" label="公司名称" sortable="custom" min-width="160">
            <template slot-scope="scope">{{scope.row.organCode | valueToLabel(orgs, 'label2')}}</template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable="custom" width="180">
            <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="createPerson" label="创建人" sortable="custom" width="120"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="650px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="110px" v-loading="loadData">
            <el-form-item label="设备IMEI">
              <el-input v-model="formInline.deviceImei" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="公司名称">
              <el-select v-model="formInline.organCode" filterable clearable placeholder="请选择">
                <el-tooltip effect="dark" :content="'所属机构：' + item.label" placement="right" v-for="(item, index) in orgs" :key="index">
                  <el-option :label="item.label2" :value="item.value"></el-option>
                </el-tooltip>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="formInline.createStartTime" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="生成时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.createEndTime" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="生成时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 导入设备IEMI号 -->
    <el-dialog title="导入设备IEMI号" @close="close" :visible.sync="importIEMIvisible" width="700px" :close-on-click-modal="false">
      <div slot>
        <el-form ref="uploadForm" :model="uploadForm" :rules="rules" :inline="false" size="small" label-width="110px">
          <el-form-item prop="organCode" label="公司名称：">
            <el-select v-model="uploadForm.organCode" filterable clearable placeholder="请选择">
              <el-tooltip effect="dark" :content="'所属机构：' + item.label" placement="right" v-for="(item, index) in orgs" :key="index">
                <el-option :label="item.label2" :value="item.value"></el-option>
              </el-tooltip>
            </el-select>
          </el-form-item>
          <el-form-item label="请选择文件：">
            <v-upload ref="upload" :format="['.txt']" :hasPreview="true" @showPriview="showPriview"></v-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('uploadForm')">保存</el-button>
            <el-button type="warning" @click="resetForm('uploadForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 上传文件结果 -->
    <v-result ref="result" :resultData="resultData" label="设备IMEI" tProp="imei"></v-result>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      importIEMIvisible: false,
      uploadForm: {},
      formData: null,
      resultData: [], // 文件上传的结果
      rules: {
        organCode: [{
          required: true,
          message: '请选择公司',
          trigger: 'change'
        }]
      }
    }
  },
  mounted() {
    this.list.data = []
    this.getData()
  },
  methods: {
    simpleSearchData() { // 简单查询
      let deviceImei = this.formInline.deviceImei
      this.formInline = {
        deviceImei
      }
      this.searchData()
    },
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getPageDeviceImei
      })
    },
    close() {
      // 关闭弹框的时候清掉选择上传的文件
      this.uploadForm = {}
      this.$nextTick(() => {
        this.$refs.uploadForm.clearValidate()
        this.$refs.upload.clearFileList()
      })
    },
    showPriview() { // 展示.txt模板文件
      Api.UNITS.showTxT('deviceImei.txt', '857201512191830\r\n857201512191831\r\n857201512191832')
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          if (this.$refs.upload.fileList.length === 0) {
            this.showMsgBox({
              message: '请选择要上传的文件！'
            })
          } else {
            this.formData = new FormData()
            this.formData.append('file', this.$refs.upload.fileList[0].raw)
            this.formData.append('organCode', this.uploadForm.organCode)
            _axios.send({
              method: 'post',
              url: _axios.ajaxAd.importDeviceImei,
              data: this.formData,
              done: ((res) => {
                if (res.status === 400) {
                  this.formData[res.data] = ''
                  this.$refs.uploadForm.validateField([res.data])
                } else {
                  this.$refs.result.show()
                  this.importIEMIvisible = false
                  this.$nextTick(() => {
                    this.resultData = res.data || []
                  })
                  setTimeout(() => {
                    this.showMsgBox({
                      type: 'success',
                      message: '操作成功！'
                    })
                  }, 150)
                }
              })
            })
          }
        } else {
          Api.UNITS.showMsgBox()
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.$refs.upload.clearFileList()
    }
  },
  computed: {
    startDatePicker() {
      return Api.UNITS.startDatePicker(this, this.formInline.createEndTime)
    },
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this.formInline.createStartTime)
    }
  }
}

</script>
<style lang="scss"></style>
