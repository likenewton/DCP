<template>
  <el-card class="addcoreapp-container" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>核心应用升级配置信息</span>
    </div>
    <div class="form-wrapper" :style="{maxHeight: maxTableHeight + 'px'}" v-shadow>
      <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="140px" size="small">
        <el-form-item prop="">
          <span slot="label">应用列表：</span>
          <el-select v-model="appIndex" filterable placeholder="请选择应用">
            <el-option v-for="(app, index) in appList" :key="index" :label="app.app_name" :value="app.id"></el-option>
          </el-select>
          <el-button class="editor" style="margin-left:10px" @click="editorApp">编辑应用</el-button>
          <el-button type="success" style="margin-left:10px" @click="createApp">新增应用</el-button>
          <el-button type="danger" style="margin-left:10px" v-if="appList.length > 1">删除应用</el-button>
          <div class="annotation">选择应用以编辑或删除</div>
        </el-form-item>
        <el-form-item>
          <span slot="label">发布数量：</span>
          <el-input v-model="formInline.release_num" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">指定ROM版本：</span>
          <el-input v-model="formInline.roms" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">装车时间：</span>
          <el-date-picker v-model="formInline.load_datetime" :picker-options="startDatePicker_1" type="date" value-format="timestamp" placeholder="装车时间（起）"></el-date-picker> -
          <el-date-picker v-model="formInline.load_end_datetime" :picker-options="endDatePicker_1" type="date" value-format="timestamp" placeholder="装车时间（止）"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <span slot="label">生效时间：</span>
          <el-date-picker v-model="formInline.valid_datetime" :picker-options="startDatePicker_2" type="date" value-format="timestamp" placeholder="生效时间（起）"></el-date-picker> -
          <el-date-picker v-model="formInline.valid_end_datetime" :picker-options="endDatePicker_2" type="date" value-format="timestamp" placeholder="生效时间（止）"></el-date-picker>
        </el-form-item>
        <el-form-item prop="desc">
          <span slot="label">版本描述：</span>
          <el-input v-model="formInline.desc" type="textarea" rows="4" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="sn_list">
          <span slot="label">SN列表：</span>
          <el-input v-model="formInline.sn_list" type="textarea" rows="4" placeholder="请输入"></el-input>
          <div class="annotation">多个SN用英文逗号分隔</div>
        </el-form-item>
        <el-form-item prop="agreement_id">
          <span slot="label">协议ID：</span>
          <el-input v-model="formInline.agreement_id" placeholder="请输入"></el-input>
          <div class="annotation">多个ID用英文逗号分隔</div>
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.back()">返回</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 应用 -->
    <el-dialog :title="'应用--' + appForm.app_name" @close="" :visible.sync="appVisible" width="650px" :close-on-click-modal="false">
      <div slot>
        <el-form class="appform" ref="appForm" :model="appForm" :rules="appRules" :inline="false" size="small" label-width="150px" v-shadow:[appFlag] :style="{maxHeight: winHeight / 1.6 + 'px'}">
          <el-form-item prop="pack_name">
            <span slot="label">应用包名：</span>
            <el-input v-model="appForm.pack_name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="app_name">
            <span slot="label">应用名称：</span>
            <el-input v-model="appForm.app_name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="version_name">
            <span slot="label">版本名称：</span>
            <el-input v-model="appForm.version_name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="property">
            <span slot="label">应用类型：</span>
            <el-select v-model="appForm.property" filterable placeholder="请选择" @change="propertyChange">
              <el-option label="应用程序" :value="0"></el-option>
              <el-option label="MCU" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="version_code">
            <span slot="label">版本代码：</span>
            <el-input v-model="appForm.version_code" placeholder="请输入"></el-input>
            <div class="annotation">必须是整数</div>
          </el-form-item>
          <el-form-item prop="url">
            <span slot="label">配置App下载地址：</span>
            <el-input v-model="appForm.url" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="config_url">
            <span slot="label">配置文件地址：</span>
            <el-input v-model="appForm.config_url" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="upgrade_way">
            <span slot="label">升级方式：</span>
            <el-select v-model="appForm.upgrade_way" filterable placeholder="请选择" :disabled="appForm.property === 1">
              <el-option label="非静默升级" :value="0"></el-option>
              <el-option label="静默升级" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="">
            <span slot="label">依赖应用配置：</span>
            <el-select v-model="configIndex" filterable placeholder="请选择应用">
              <el-option v-for="(config, index) in configList" :key="index" :label="config.pack_name" :value="index"></el-option>
            </el-select>
            <el-button class="editor" style="margin-left:10px" @click="editorConfig">编辑</el-button>
            <el-button type="success" style="margin-left:10px" @click="createConfig">添加</el-button>
            <el-button type="danger" style="margin-left:10px" @click="deleteConfig" v-if="configList.length > 1">删除</el-button>
            <div class="annotation">选择依赖以编辑或删除</div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitAppForm('appForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 依赖配置 -->
    <el-dialog :title="'依赖配置--' + configForm.pack_name" @close="" :visible.sync="configVisible" width="650px" :close-on-click-modal="false">
      <div slot>
        <el-form ref="configForm" :model="configForm" :rules="configRules" :inline="false" size="small" label-width="140px">
          <el-form-item prop="pack_name">
            <span slot="label">依赖应用包名：</span>
            <el-input v-model="configForm.pack_name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="version_code">
            <span slot="label">依赖版本应用：</span>
            <el-input v-model="configForm.version_code" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitConfigForm('configForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import Api from 'assets/js/api.js'

export default {
  data() {
    return {
      isUpdate: false,
      maxTableHeight: Api.UNITS.maxTableHeight(266),
      // 应用列表
      appList: [],
      appFlag: false, // v-shadow使用
      appVisible: false, // 应用编辑弹框
      appIndex: undefined, // 当前选中的应用
      appForm: {},
      // 依赖配置
      configVisible: false,
      configIndex: 0,
      configList: [],
      configForm: {},
      rules: {},
      appRules: {
        pack_name: [{
          required: true,
          message: '请输入应用包名',
          trigger: 'blur'
        }],
        app_name: [{
          required: true,
          message: '请输入应用名称',
          trigger: 'blur'
        }],
        version_name: [{
          required: true,
          message: '请输入版本名称',
          trigger: 'blur'
        }],
        property: [{
          required: true,
          message: '请选择应用类型',
          trigger: 'change'
        }],
        version_code: [{
          required: true,
          message: '请输入版本代码',
          trigger: 'blur'
        }],
        url: [{
          required: true,
          message: '请输入配置App下载地址',
          trigger: 'blur'
        }]
      },
      configRules: {
        pack_name: [{
          required: true,
          message: '请输入依赖应用包名',
          trigger: 'blur'
        }],
        version_code: [{
          required: true,
          message: '依赖版本应用',
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
        url: _axios.ajaxAd.toUpdateAppVerInfo,
        params: { plan_id: Api.UNITS.getQuery('plan_id') },
        done: ((res) => {
          this.loadData = false
          let list = res.data || []
          let baseData = list[0] || {}
          // 最外层的表单
          this.formInline = {
            release_num: baseData.release_num,
            roms: baseData.roms,
            desc: baseData.desc,
            sn_list: baseData.sn_list,
            agreement_id: baseData.agreement_id,
            load_datetime: baseData.load_datetime,
            load_end_datetime: baseData.load_end_datetime,
            valid_datetime: baseData.valid_datetime,
            valid_end_datetime: baseData.valid_end_datetime
          }
          // 应用列表
          this.appList = []
          list.forEach((v) => {
            this.appList.push(v)
          })
          this.appIndex = list[0].id
        }),
        fail: () => {
          this.loadData = false
        }
      })
    },
    // === app应用 start ===
    createApp() { // 新增应用
      this.showCfmBox({
        message: '是否要新增一个应用？',
        cb: () => {

        }
      })
    },
    editorApp() { // 编辑应用
      this.appVisible = true
      this.configIndex = 0
      this.getAppForm()
      setTimeout(() => {
        this.appFlag = !this.appFlag
      }, 200)
      // 再打开应用编辑的时候需要配置依赖
      this.$nextTick(() => {
        this.$refs.appForm.clearValidate()
        let dependencies = this.appForm.dependencies
        this.configList = typeof dependencies === 'string' ? JSON.parse(dependencies) : dependencies
      })
    },
    getAppForm() { // 获取appForm
      this.appList.forEach((v) => {
        if (v.id === this.appIndex) {
          this.appForm = Object.assign({}, v)
        }
      })
    },
    propertyChange(value) { // 应用类型发生改变时（MCU），升级方式要变成非静默升级
      if (value === 1) {
        this.appForm.upgrade_way = 0
      }
    },
    submitAppForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          this.appVisible = false
          this.appList.forEach((v) => {
            if (v.id === this.appIndex) {
              v.dependencies = this.configList
            }
          })
          this.showMsgBox({
            type: 'success',
            message: '应用保存成功！'
          })
        } else {
          Api.UNITS.showMsgBox({
            type: 'error',
            message: '不符合规范，无法保存！'
          })
          return false
        }
      })
    },
    // === app应用 end ===

    // === 依赖配置 start ===
    createConfig() { // 依赖配置项-新增

    },
    editorConfig() { // 依赖配置项-编辑
      this.configVisible = true
      this.getConfigForm()
      this.$nextTick(() => {
        this.$refs.configForm.clearValidate()
      })
    },
    deleteConfig() { // 依赖配置项-删除

    },
    getConfigForm() { // 获取configForm
      this.configForm = Object.assign({}, this.configList[this.configIndex])
    },
    submitConfigForm(formName) { // 应用保存
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          this.configVisible = false
          this.configList[this.configIndex] = this.configForm
          this.showMsgBox({
            type: 'success',
            message: '依赖配置保存成功！'
          })
        } else {
          Api.UNITS.showMsgBox({
            type: 'error',
            message: '不符合规范，无法保存！'
          })
          return false
        }
      })
    },
    // === 依赖配置 end ===

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
          return false
        }
      })
    },
    resetForm(formName) {
      this.showCfmBox({
        message: '已编辑的应用也将会重置，确认要重置吗？',
        cb: () => {
          this.$refs[formName].resetFields()
          this.formInline = {}
          this.configIndex = 0
          this.isUpdate && this.getData()
        }
      })
    }
  },
  computed: {
    // === 装车时间 ===
    startDatePicker_1() {
      return Api.UNITS.startDatePicker(this, this.formInline.load_end_datetime)
    },
    endDatePicker_1() {
      return Api.UNITS.endDatePicker(this, this.formInline.load_datetime)
    },
    // === 生效时间 ===
    startDatePicker_2() {
      return Api.UNITS.startDatePicker(this, this.formInline.valid_end_datetime)
    },
    endDatePicker_2() {
      return Api.UNITS.endDatePicker(this, this.formInline.valid_datetime)
    }
  },
}

</script>
<style lang="scss">
.addcoreapp-container {
  .appform {
    padding-right: 25px;
    overflow: auto;
  }

  .form-wrapper {
    overflow: auto;
  }

  input,
  textarea {
    background: transparent;
  }
}

</style>
