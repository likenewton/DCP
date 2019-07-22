<template>
  <div class="batch-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name:'addbatch'})">添加批次</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="车联网批次" sortable="custom"></el-table-column>
          <el-table-column prop="" label="批次号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="机构" sortable="custom"></el-table-column>
          <el-table-column prop="" label="公司名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="发货人" sortable="custom"></el-table-column>
          <el-table-column prop="" label="出货时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="提货人" sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建时间" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="操作" width="245">
            <template slot-scope="scope">
              <el-button type="text" @click="$router.push({name:'addbatch',query:{type:'update'}})">详情</el-button>
              <el-button type="text" @click="$router.push({name:'batImpDetail'})">导入明细</el-button>
              <el-button type="text" @click="showDevAbRecord">异常记录</el-button>
              <el-button type="text" class="text_warning" @click="importSnVisible = true">导入</el-button>
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
          <el-form :inline="false" :model="formInline" size="small" label-width="90px">
            <el-form-item label="名称">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="设备SN号">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="公司名称">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="创建时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="创建时间（止）"></el-date-picker>
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
            <v-upload ref="upload" :format="['.txt']"></v-upload>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="submitForm">导入</el-button>
      </div>
    </el-dialog>
    <!-- 设备号异常记录 -->
    <el-dialog title="设备号异常记录" :visible.sync="devAbRecordVisible" width="1200px" :close-on-click-modal="false">
      <div slot>
        <el-table :data="devAbRecord.data" @sort-change="handleSortChange" :max-height="winHeight/2.2" border resizable size="mini">
          <el-table-column prop="a" label="批次号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="设备号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="异常描述" show-overflow-tooltip sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建时间" sortable="custom"></el-table-column>
        </el-table>
        <div class="clearfix">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="devAbRecord.currentPage" :page-sizes="pageSizes" :page-size="devAbRecord.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="devAbRecord.total" class="clearfix pagination-table">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      importSnVisible: false,
      devAbRecordVisible: false,
      list: {
        data: [{
          a: 1
        }],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
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

  },
  methods: {
    getData() {},
    // 提交表单上传文件
    submitForm() {
      if (this.$refs.upload.fileList.length === 0) {
        this.showMsgBox({
          message: '请选择要上传的文件！'
        })
      } else {
        console.log(this.$refs.upload.fileList)
      }
    },
    close() {
      // 关闭弹框的时候清掉选择上传的文件
      this.$refs.upload.clearFileList()
    },
    showDevAbRecord() {
      this.devAbRecordVisible = true
    }
  }
}

</script>
<style lang="scss"></style>
