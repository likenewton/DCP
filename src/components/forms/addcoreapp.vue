<template>
  <el-card class="addbrand" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>核心应用升级配置信息</span>
    </div>
    <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="140px" size="small">
      <el-form-item prop="">
        <span slot="label">应用包名：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">应用名称：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">版本名称：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">版本代码：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">指定ROM版本：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">指定经销商：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">配置文件下载地址：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">app下载地址：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">是否核心服务：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">专栏类型：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">版本描述：</span>
        <el-input type="textarea" rows="4" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">升级方式：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">指定设备SN：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="$router.back()">返回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import Api from 'assets/js/api.js'

export default {
  data() {
    return {
      isUpdate: false,
      rules: {}
    }
  },
  mounted() {
    this.isUpdate = Api.UNITS.getQuery('type') === 'update'
    if (this.isUpdate) {
      this.getData()
    } else {
      this.loadData = false
    }
  },
  methods: {
    // 获取数据
    getData() {
      this.loadData = true
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          if (this.isUpdate) {

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
