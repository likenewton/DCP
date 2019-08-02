<template>
  <el-card class="addbrand" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>品牌信息</span>
    </div>
    <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="120px" size="small">
      <el-form-item prop="brandName">
        <span slot="label">品牌名称：</span>
        <el-input v-model="formInline.brandName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="distributor">
        <span slot="label">分销商：</span>
        <el-input v-model="formInline.distributor" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="organCode">
        <span slot="label">公司名称：</span>
        <el-select v-model="formInline.organCode" filterable placeholder="请选择">
          <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
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
      rules: {
        brandName: [{
          required: true,
          message: '请输入品牌名称',
          trigger: 'blur'
        }],
        distributor: [{
          required: true,
          message: '请输入分销商',
          trigger: 'blur'
        }],
        organCode: [{
          required: true,
          message: '请选择公司名称',
          trigger: 'change'
        }]
      }
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
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.detialUpDevBrand,
        params: { id: Api.UNITS.getQuery('id') },
        done: ((res) => {
          this.loadData = false
          this.formInline = res.data
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate()
          })
        })
      })
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          let url = _axios.ajaxAd.addDeviceBrand;
          if (this.isUpdate) url = _axios.ajaxAd.updateDeviceBrand
          _axios.send({
            method: 'post',
            url,
            data: this.formInline,
            done: ((res) => {
              if (res.status === 400) {
                this.formInline[res.data] = ''
                this.$refs.ruleForm.validateField([res.data])
              } else {
                this.$router.push({ name: 'brand' })
                setTimeout(() => {
                  this.showMsgBox({
                    type: 'success',
                    message: res.msg || '操作成功！'
                  })
                }, 150)
              }
            })
          })
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
