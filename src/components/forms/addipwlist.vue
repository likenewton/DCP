<template>
  <el-card class="addipwlist-container" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>IP白名单信息</span>
    </div>
    <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="100px" size="small">
      <el-form-item prop="ip">
        <span slot="label">IP：</span>
        <el-input v-model="formInline.ip" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="subnet_mask">
        <span slot="label">子网掩码：</span>
        <el-input v-model="formInline.subnet_mask" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="desc">
        <span slot="label">描述：</span>
        <el-input v-model="formInline.desc" type="textarea" rows="4" placeholder="请输入"></el-input>
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
        ip: [{
          required: true,
          message: '请输入IP',
          trigger: 'blur'
        }, {
          validator: this.ipValidator,
          trigger: 'blur'
        }],
        subnet_mask: [{
          required: true,
          message: '请输入子网掩码',
          trigger: 'blur'
        }, {
          max: 100,
          message: '子网掩码不能超过100字符',
          trigger: 'blur'
        }, {
          validator: this.maskValidator,
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
        url: _axios.ajaxAd.toUpdateWilteList,
        params: { id: Api.UNITS.getQuery('id') },
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
              url: _axios.ajaxAd.toUpdateWilteListInfo,
              data: Object.assign({ id: Api.UNITS.getQuery('id') }, this.formInline),
              done: ((res) => {
                if (res.status === 400) {
                  this.formInline[res.data] = ''
                  this.$refs.ruleForm.validateField([res.data])
                } else {
                  this.$router.push({ name: 'ipwhitelist' })
                  setTimeout(() => {
                    this.showMsgBox({
                      type: 'success',
                      message: '修改成功！'
                    })
                  }, 150)
                }
              })
            })
          } else {
            _axios.send({
              method: 'post',
              url: _axios.ajaxAd.toAddWilteListInfo,
              data: this.formInline,
              done: ((res) => {
                if (res.status === 400) {
                  this.formInline[res.data] = ''
                  this.$refs.ruleForm.validateField([res.data])
                } else {
                  this.$router.push({ name: 'ipwhitelist' })
                  setTimeout(() => {
                    this.showMsgBox({
                      type: 'success',
                      message: '新增成功！'
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
    // 以下为验证
    ipValidator(rule, value, callback) {
      if (!value || Api.UNITS.validatorIP(value)) {
        callback()
      } else {
        callback(new Error('IP格式不正确'))
      }
    },
    maskValidator(rule, value, callback) {
      if (!value || Api.UNITS.validatorMask(value)) {
        callback()
      } else {
        callback(new Error('子网掩码不正确'))
      }
    }
  }
}

</script>
<style lang="scss"></style>
