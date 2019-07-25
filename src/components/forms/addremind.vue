<template>
  <el-card class="addbrand" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>提醒策略</span>
    </div>
    <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="145px" size="small">
      <el-form-item prop="username">
        <span slot="label">客户名称：</span>
        <el-input v-model="formInline.username" placeholder="请输入" :disabled="isUpdate"></el-input>
      </el-form-item>
      <el-form-item prop="pmname">
        <span slot="label">客户项目名称：</span>
        <el-input v-model="formInline.pmname" placeholder="请输入" :disabled="isUpdate"></el-input>
      </el-form-item>
      <el-form-item prop="scene">
        <span slot="label">适用场景：</span>
        <el-select v-model="formInline.scene" filterable clearable placeholder="请选择" :disabled="isUpdate">
          <el-option label="车主上路" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="remindstyle">
        <span slot="label">是否提醒：</span>
        <el-select v-model="formInline.remindstyle" filterable placeholder="请选择">
          <el-option label="关闭提醒" :value="0"></el-option>
          <el-option label="全屏遮罩" :value="1"></el-option>
          <el-option label="顶部半屏遮罩" :value="2"></el-option>
          <el-option label="悬浮小水滴" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="remindcontent" v-show="formInline.remindstyle !== 0">
        <span slot="label">提醒内容：</span>
        <el-input v-model="formInline.remindcontent" type="textarea" rows="4" placeholder="请输入"></el-input>
        <div class="annotation">注意：填写流量预警值设置请用#数值#表达</div>
      </el-form-item>
      <el-form-item prop="closestyle" v-show="formInline.remindstyle !== 0">
        <span slot="label">关闭方式：</span>
        <el-select v-model="formInline.closestyle" filterable placeholder="请选择">
          <el-option label="不可关闭" :value="0"></el-option>
          <el-option label="手动" :value="1"></el-option>
          <el-option label="自动" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="" v-show="formInline.closestyle !== 0 && formInline.remindstyle !== 0">
        <span slot="label">显示周期(h, m, s)：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="period" v-show="formInline.closestyle !== 0 && formInline.remindstyle !== 0">
        <span slot="label">触发周期：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="closetime" v-show="formInline.closestyle === 2 && formInline.remindstyle !== 0">
        <span slot="label">自动关闭时间(秒)：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="" v-show="formInline.remindstyle !== 0">
        <span slot="label">时速(km/h)：</span>
        <el-input placeholder="请输入"></el-input>
        <div class="annotation">用于设置达到该时速时提醒不启用</div>
      </el-form-item>
      <el-form-item prop="voicestyle">
        <span slot="label">是否语音播报：</span>
        <el-select v-model="formInline.voicestyle" filterable placeholder="请选择">
          <el-option label="否" :value="0"></el-option>
          <el-option label="是" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="" v-show="formInline.voicestyle !== 0">
        <span slot="label">语音播报内容：</span>
        <el-input type="textarea" rows="4" placeholder="请输入"></el-input>
        <div class="annotation">注意：语音无法识别特殊词汇，尽量填写中文以保证播报无歧义</div>
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
        remindstyle: 0,
        voicestyle: 0,
        closestyle: 0
      },
      rules: {
        username: [{
          required: true,
          message: '请输入客户名称',
          trigger: 'blur'
        }],
        pmname: [{
          required: true,
          message: '请输入项目名称',
          trigger: 'blur'
        }],
        scene: [{
          required: true,
          message: '请选择适用场景',
          trigger: 'change'
        }],
        remindstyle: [{
          required: true,
          message: '请选择是否提醒',
          trigger: 'change'
        }],
        remindcontent: [{
          required: true,
          message: '请输入提醒内容',
          trigger: ['change', 'blur']
        }, {
          max: 400,
          message: '最多输入400个字符',
          trigger: ['change', 'blur']
        }],
        closestyle: [{
          required: true,
          message: '请选择关闭方式',
          trigger: 'change'
        }],
        period: [{
          required: true,
          message: '请选择触发周期',
          trigger: 'change'
        }],
        closetime: [{
          required: true,
          message: '请输入自动关闭时间',
          trigger: 'blur'
        }],
        voicestyle: [{
          required: true,
          message: '请选择是否语音播报',
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
      setTimeout(() => {
        this.loadData = false
      }, 1000)
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.formInline)
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
