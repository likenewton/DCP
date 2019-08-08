<template>
  <el-card class="directive" shadow="never">
    <div slot="header" class="clearfix">
      <span>下发指令</span>
    </div>
    <el-form class="editor-form" v-loading="loadData" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="120px" size="small">
      <el-form-item prop="code">
        <span slot="label">指令类型：</span>
        <el-select v-model="formInline.code" filterable placeholder="请选择">
          <el-option v-for="(item, index) in directiveType" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div class="annotation">{{directiveTip}}</div>
      </el-form-item>
      <el-form-item prop="needFeedBack">
        <span slot="label">是否需要回调：</span>
        <el-radio-group v-model="formInline.needFeedBack">
          <el-radio :label="0">需要</el-radio>
          <el-radio :label="1">不需要</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="parameter">
        <span slot="label">指令参数：</span>
        <el-input v-model="formInline.parameter" type="textarea" rows="4" placeholder="请输入"></el-input>
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
      formInline: {
        needFeedBack: 1
      },
      directiveType: [{
        label: 'adbshell',
        value: 'adbshell',
        tip: 'text=“dumpsys dropbox” ；#执行adb shell命令'
      }, {
        label: 'logswitch',
        value: 'logswitch',
        tip: 'text=“pkgname1:2;pkgname3:0” ；#pkgname包名:2代表把该apk的log开关打开，0是关闭'
      }, {
        label: 'logupload',
        value: 'logupload',
        tip: 'text=“/sdcard/nxos_log/” ；#上传/sdcard/nxos_log/的目录的文件'
      }, {
        label: 'assistant',
        value: 'assistant',
        tip: '页面参数格式：{"switch":"0"} ；#远程调试开关，0：关，1开， 后台拼接为text={"remotePort":"xxx","remoteIP":"xxx","remoteUser":"xxx","remoteProxyPort":"xxx","remotePassword":"xxx","switch":"0"}传给终端'
      }],
      rules: {
        code: [{
          required: true,
          message: '请选择指令类型',
          trigger: 'change'
        }],
        needFeedBack: [{
          required: true,
          message: '请选择是否需要回调',
          trigger: 'change'
        }],
        parameter: [{
          required: true,
          message: '请输入指令参数',
          trigger: ['blur', 'change']
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
    getData() {},
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          if (this.isUpdate) {
            // 目前该页面只有创建，没有更新
          } else {
            _axios.send({
              method: 'post',
              url: _axios.ajaxAd.directivePush,
              data: $.extend({ deviceSn: Api.UNITS.getQuery('deviceSn') }, this.formInline),
              done: ((res) => {
                if (res.status === 400) {
                  this.formInline[res.data] = ''
                  this.$refs.ruleForm.validateField([res.data])
                } else {
                  this.$router.push({ name: 'devInfo' })
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
  },
  computed: {
    directiveTip() {
      let tip = '选择指令，这里会有对应的提示哦~'
      this.directiveType.forEach((v) => {
        if (v.value === this.formInline.code) {
          tip = v.tip
        }
      })
      return `Tip：${tip}`
    }
  }
}

</script>
<style lang="scss"></style>
