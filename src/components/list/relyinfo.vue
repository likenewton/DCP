<template>
  <div class="bluetooth-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="showRely('新增')">添加App版本依赖</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="依赖app包名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="依赖app版本名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="依赖app版本代码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="依赖APP版本信息ID" sortable="custom"></el-table-column>
          <el-table-column prop="" label="依赖APP包名" sortable="custom"></el-table-column>
          <el-table-column prop="" label="依赖APP版本名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="依赖APP版本代码" sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建人" sortable="custom"></el-table-column>
          <el-table-column prop="" label="最后更新人" sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="更新时间" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" class="text_editor" @click="showRely('修改')">修改</el-button>
              <el-button type="text" class="text_danger" @click="disabled">失效</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 新增app版本依赖信息 -->
    <el-dialog :title="type + 'app版本依赖信息'" @close="close" :visible.sync="relyVisible" width="650px" :close-on-click-modal="false">
      <div slot>
        <el-form ref="submitForm" :model="submitFormData" :inline="false" size="small" label-width="140px" v-loading="formLoadData">
          <el-form-item label="依赖的应用包名：">
            <el-input v-model="submitFormData.a" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="依赖的版本名称：">
            <el-input v-model="submitFormData.b" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="依赖的版本代码：">
            <el-input v-model="submitFormData.c" placeholder="请输入"></el-input>
            <div class="annotation">必须为整数</div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('submitForm')">保存</el-button>
            <el-button type="warning" @click="resetForm('submitForm')">重置</el-button>
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
      relyVisible: false,
      formLoadData: false,
      type: '新增',
      submitFormData: {},
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
    getFormData() {
      this.formLoadData = true

      setTimeout(() => {
        this.formLoadData = false
      }, 1000)
    },
    disabled() {
      this.showCfmBox({
        message: '确定使记录失效吗？',
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功！'
          })
        }
      })
    },
    showRely(type = '新增') {
      this.type = type
      this.relyVisible = true
      this.resetForm('submitForm')
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.submitFormData = {}
      this.type === '修改' && this.getFormData()
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          if (this.type === '新增') {

          } else {

          }
        } else {
          Api.UNITS.showMsgBox()
          return false;
        }
      })
    }
  }
}

</script>
<style lang="scss"></style>
