<template>
  <el-card class="addbatch-container" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>批次信息</span>
    </div>
    <div class="form-wrapper" :style="{maxHeight: maxTableHeight + 'px'}" v-shadow>
      <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="120px" size="small">
        <el-form-item label="批次编号：" prop="batchSn">
          <el-input v-model="formInline.batchSn" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="批次名称：" prop="batchName">
          <el-input v-model="formInline.batchName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="批次备注：" prop="batchMemo">
          <el-input v-model="formInline.batchMemo" type="textarea" rows="4" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="发货人姓名：" prop="batchShipper">
          <el-input v-model="formInline.batchShipper" placeholder="请输入" :disabled="isCheck"></el-input>
        </el-form-item>
        <el-form-item label="出货时间" prop="outTime">
          <el-date-picker v-model="formInline.outTime" type="datetime" :picker-options="datePicker" :clearable="false" placeholder="出货时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="公司名称：" prop="organCode">
          <el-select v-model="formInline.organCode" filterable placeholder="请选择" @change="orgsSelect">
            <el-tooltip effect="dark" :content="'所属机构：' + item.label" placement="right" v-for="(item, index) in orgs" :key="index">
              <el-option :label="item.label2" :value="item.value"></el-option>
            </el-tooltip>
          </el-select>
          <div class="annotation" v-show="formInline.organCode">所属机构：{{formInline.organCode | valueToLabel(orgs)}}</div>
        </el-form-item>
        <el-form-item label="销往省份：" prop="province">
          <el-select v-model="formInline.province" filterable placeholder="请选择" @change="provinceSelect">
            <el-option v-for="(item, index) in provinceData" :key="index" :label="item.name" :value="item.tno"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销往城市：" prop="city">
          <el-select v-model="formInline.city" filterable clearable placeholder="请先选择销往省份" :disabled="!formInline.province" @change="citySelect">
            <el-option v-for="(item, index) in cityData" :key="index" :label="item.name" :value="item.tno"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销往区县：" prop="district">
          <el-select v-model="formInline.district" filterable clearable placeholder="请先选择销往城市" :disabled="!formInline.city">
            <el-option v-for="(item, index) in districtData" :key="index" :label="item.name" :value="item.tno"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提货人姓名：" prop="pickerName">
          <el-input v-model="formInline.pickerName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="提货人电话：" prop="pickerPhone">
          <el-input v-model="formInline.pickerPhone" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="提货人邮箱：" prop="pickerEmail">
          <el-input v-model.email="formInline.pickerEmail" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="硬件版本：" prop="hardVersionId">
          <el-select v-model="formInline.hardVersionId" filterable placeholder="请先选择公司名称" :disabled="!formInline.organCode">
            <el-option v-for="(item, index) in hardwareData" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="软件版本：" prop="softVersionId">
          <el-select v-model="formInline.softVersionId" filterable placeholder="请先选择公司名称" :disabled="!formInline.organCode">
            <el-option v-for="(item, index) in sorfwareData" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.back()">返回</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script>
import Api from 'assets/js/api.js'

export default {
  data() {
    return {
      provinceData: [],
      hardwareData: [],
      softwareData: [],
      cityData: [],
      districtData: [],
      type: Api.UNITS.getQuery('type') || 'create',
      maxTableHeight: Api.UNITS.maxTableHeight(266),
      rules: {
        batchSn: [{
          required: true,
          message: '请输入批次编号',
          trigger: 'blur'
        }],
        batchName: [{
          required: true,
          message: '请输入批次名称',
          trigger: 'blur'
        }],
        batchShipper: [{
          required: true,
          message: '请输入发货人姓名',
          trigger: 'blur'
        }],
        outTime: [{
          required: true,
          message: '请选择出货时间',
          trigger: ['change', 'blur']
        }],
        organCode: [{
          required: true,
          message: '请选择公司',
          trigger: 'change'
        }],
        province: [{
          required: true,
          message: '请选择销往省份',
          trigger: 'change'
        }],
        pickerName: [{
          required: true,
          message: '请输入提货人姓名',
          trigger: 'blur'
        }],
        pickerPhone: [{
          required: true,
          message: '请输入提货人电话',
          trigger: 'blur'
        }, {
          validator: this.validatorPhoneNumber,
          trigger: 'blur'
        }],
        pickerEmail: [{
          required: true,
          message: '请输入提货人邮箱',
          trigger: 'blur'
        }, {
          type: 'email',
          message: '邮箱地址格式不正确',
          trigger: 'blur'
        }],
        hardVersionId: [{
          required: true,
          message: '请选择硬件版本',
          trigger: 'change'
        }],
        softVersionId: [{
          required: true,
          message: '请选择软件版本',
          trigger: 'change'
        }]
      }
    }
  },
  mounted() {
    this.setRegionData('root', 'provinceData')
    this.loadData = false
  },
  methods: {
    // === 地区选择 start ===
    getNations(parentNo = 'root', cb) {
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getArea,
        params: { parentNo },
        done: ((res) => {
          cb && cb(res)
        })
      })
    },
    provinceSelect(id) { // 省级选择
      this.setRegionData(id, 'cityData')
      this.$delete(this.formInline, 'city')
      this.$delete(this.formInline, 'district')
    },
    citySelect(id) { // 市级选择
      this.setRegionData(id, 'districtData')
      this.$delete(this.formInline, 'district')
    },
    setRegionData(id, key) { // 保存数据，处理被删除的区域
      this.getNations(id, (res) => {
        this[key] = res.data || []
      })
    },
    // === 地区选择 end ===
    submitForm(formName) { // 提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          _axios.send({
            method: 'post',
            url: _axios.ajaxAd.addDeviceBatch,
            data: this.formInline,
            done: ((res) => {
              if (res.status === 400) {
                this.formInline[res.data] = ''
                this.$refs.ruleForm.validateField([res.data])
              } else {
                this.$router.push({ name: 'batch' })
                setTimeout(() => {
                  // 加个延迟，动画更流畅
                  this.showMsgBox({
                    type: 'success',
                    message: res.msg || '新增批次成功！'
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
    },
    orgsSelect() {
      // 选择公司名称的时候要清空掉硬件与软件版本
      if (this.formInline.m) this.$delete(this.formInline, 'hardVersionId')
      if (this.formInline.n) this.$delete(this.formInline, 'softVersionId')
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.queryVersionByOrganCode,
        params: { organCode: this.formInline.organCode },
        done: ((res) => {
          let data = res.data || []
          this.hardwareData = []
          this.sorfwareData = []
          data.forEach((v) => {
            if (v.versionType === 0) { // 硬件
              this.hardwareData.push({
                label: v.versionName,
                value: v.id
              })
            } else if (v.versionType === 1) { // 软件
              this.sorfwareData.push({
                label: v.versionName,
                value: v.id
              })
            }
          })
        })
      })
    },
    // 以下是表单验证工具函数
    validatorPhoneNumber(rule, value, callback) {
      if (!value || Api.UNITS.validatorPhoneNumber(value)) {
        callback()
      } else {
        callback(new Error('手机格式不正确'))
      }
    }
  },
  computed: {
    datePicker() {
      return {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    },
  }
}

</script>
<style lang="scss">
.addbatch-container {
  .form-wrapper {
    overflow: auto;
  }

  input,
  textarea {
    background: transparent;
  }
}

</style>
