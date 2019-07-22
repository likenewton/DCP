<template>
  <div class="spedev-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="客户实名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select filterable clearable placeholder="请选择机构"></el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="formInline.start" type="datetime" placeholder="创建时间（起）"></el-date-picker> -
            <el-date-picker v-model="formInline.end" type="datetime" placeholder="创建时间（止）"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="批次号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="机构" sortable="custom"></el-table-column>
          <el-table-column prop="" label="发货人" sortable="custom"></el-table-column>
          <el-table-column prop="" label="出货时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="提货人" sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建时间" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" class="text_warning" @click="importSNVisible = true">导入</el-button>
              <el-button type="text" class="text_danger" @click="showDevAbRecord">异常记录</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 导入特殊设备SN号 -->
    <el-dialog title="导入特殊设备SN号" @close="close" :visible.sync="importSNVisible" width="700px" :close-on-click-modal="false">
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
      importSNVisible: false,
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
