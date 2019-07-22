<template>
  <el-card class="directive" shadow="never">
    <div slot="header" class="clearfix">
      <span>下发指令</span>
    </div>
    <el-form class="editor-form" v-loading="loadData" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="120px" size="small">
      <el-form-item prop="">
        <span slot="label">指令类型：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">是否需要回调：</span>
        <el-radio-group>
          <el-radio :label="0">需要</el-radio>
          <el-radio :label="1">不需要</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">指令参数：</span>
        <el-input type="textarea" rows="4" placeholder="请输入"></el-input>
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
      // this.loadData = true
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
