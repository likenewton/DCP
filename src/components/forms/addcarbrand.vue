<template>
  <el-card class="addcarbrand-container" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>汽车品牌信息</span>
    </div>
    <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="120px" size="small">
      <el-form-item prop="brandName">
        <span slot="label">品牌名称：</span>
        <el-input v-model="formInline.brandName" placeholder="请输入"></el-input>
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
          message: '请输入品牌',
          trigger: 'blur'
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
        url: _axios.ajaxAd.toEditCarBrands,
        params: { brandId: Api.UNITS.getQuery('brandId') },
        done: ((res) => {
          this.loadData = false
          this.formInline = res.data || {}
        }),
        fail: () => {
          this.loadData = false
        }
      })
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          if (this.isUpdate) {
            _axios.send({
              method: 'post',
              url: _axios.ajaxAd.toUpdateCarBrands,
              data: Object.assign({
                brandId: Api.UNITS.getQuery('brandId'),
                parentId: Api.UNITS.getQuery('parentId'),
              }, this.formInline),
              done: ((res) => {
                if (res.status === 400) {
                  this.formInline[res.data] = ''
                  this.$refs.ruleForm.validateField([res.data])
                } else {
                  this.$router.push({ name: 'carbrand' })
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
            _axios.send({
              method: 'post',
              url: _axios.ajaxAd.toAddCarBrands,
              data: Object.assign({ parentId: 0 }, this.formInline),
              done: ((res) => {
                if (res.status === 400) {
                  this.formInline[res.data] = ''
                  this.$refs.ruleForm.validateField([res.data])
                } else {
                  this.$router.push({ name: 'carbrand' })
                  setTimeout(() => {
                    this.showMsgBox({
                      type: 'success',
                      message: res.msg || '操作成功！'
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
    }
  }
}

</script>
<style lang="scss"></style>
