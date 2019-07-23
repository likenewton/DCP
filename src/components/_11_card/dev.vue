<template>
  <div class="dev-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="importIEMIvisible = true">设备导入</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="设备IMEI"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="设备IMEI" sortable="custom"></el-table-column>
          <el-table-column prop="" label="机构" sortable="custom"></el-table-column>
          <el-table-column prop="" label="公司名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建人" sortable="custom"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="650px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="110px">
            <el-form-item label="设备IMEI">
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
    <!-- 导入设备IEMI号 -->
    <el-dialog title="导入设备IEMI号" @close="close" :visible.sync="importIEMIvisible" width="700px" :close-on-click-modal="false">
      <div slot>
        <el-form ref="uploadForm" :model="uploadForm" :rules="rules" :inline="false" size="small" label-width="110px">
          <el-form-item label="请选择文件：">
            <v-upload ref="upload" :format="['.txt']"></v-upload>
          </el-form-item>
          <el-form-item prop="status" label="公司名称：">
            <el-select filterable clearable placeholder="请选择"></el-select>
          </el-form-item>
          <el-form-item label="导入日志：">
            <el-input type="textarea" placeholder="请输入导入日志" rows="4"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('uploadForm')">保存</el-button>
            <el-button type="warning" @click="resetForm('uploadForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      importIEMIvisible: false,
      list: {
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
    rebuild() {
      this.showCfmBox({
        message: '确定生成语音报表文件吗？',
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功！'
          })
        }
      })
    },
    close() {
      // 关闭弹框的时候清掉选择上传的文件
      this.$refs.upload.clearFileList()
      this.uploadForm = {
        status: 1
      }
    },
    // 提交表单
    submitForm(formName) {
      if (this.$refs.upload.fileList.length === 0) {
        this.showMsgBox({
          message: '请选择要上传的文件！'
        })
      } else {
        console.log(this.$refs.upload.fileList)
      }
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.$refs.upload.clearFileList()
    }
  }
}

</script>
<style lang="scss"></style>
