<template>
  <el-card class="addbrand" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>批次信息</span>
    </div>
    <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="120px" size="small">
      <el-form-item prop="">
        <span slot="label">批次编号：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">批次名称：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">批次备注：</span>
        <el-input type="textarea" rows="4" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">发货人姓名：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="出货时间">
        <el-date-picker v-model="formInline.start" type="datetime" placeholder="出货时间"></el-date-picker>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">公司名称：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">销往省份：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">销往城市：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">销往区县：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">提货人姓名：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">提货人电话：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">提货人邮箱：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">硬件版本：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">软件版本：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
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
