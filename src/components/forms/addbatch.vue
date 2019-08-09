<template>
  <el-card class="addbrand-container" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>批次信息</span>
    </div>
    <div class="form-wrapper" :style="{maxHeight: maxTableHeight + 'px'}" v-shadow>
      <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="120px" size="small">
        <el-form-item prop="a">
          <span slot="label">批次编号：</span>
          <el-input v-model="formInline.a" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="b">
          <span slot="label">批次名称：</span>
          <el-input v-model="formInline.b" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="c">
          <span slot="label">批次备注：</span>
          <el-input v-model="formInline.c" type="textarea" rows="4" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="d">
          <span slot="label">发货人姓名：</span>
          <el-input v-model="formInline.d" placeholder="请输入" :disabled="isCheck"></el-input>
        </el-form-item>
        <el-form-item label="出货时间" prop="e">
          <el-date-picker v-model="formInline.e" type="datetime" placeholder="出货时间"></el-date-picker>
        </el-form-item>
        <el-form-item prop="f">
          <span slot="label">公司名称：</span>
          <el-select v-model="formInline.organCode" filterable placeholder="请选择" @change="orgsSelect">
            <el-tooltip effect="dark" :content="'所属机构：' + item.label" placement="right" v-for="(item, index) in orgs" :key="index">
              <el-option :label="item.label2" :value="item.value"></el-option>
            </el-tooltip>
          </el-select>
          <div class="annotation" v-show="formInline.f">所属机构：{{formInline.f | valueToLabel(orgs)}}</div>
        </el-form-item>
        <el-form-item prop="province">
          <span slot="label">销往省份：</span>
          <el-select v-model="formInline.province" filterable placeholder="请选择" @change="provinceSelect">
            <el-option v-for="(item, index) in provinceData" :key="index" :label="item.name" :value="item.tno"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="city">
          <span slot="label">销往城市：</span>
          <el-select v-model="formInline.city" filterable clearable placeholder="请选择" :disabled="!formInline.province" @change="citySelect">
            <el-option v-for="(item, index) in cityData" :key="index" :label="item.name" :value="item.tno"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="district">
          <span slot="label">销往区县：</span>
          <el-select v-model="formInline.district" filterable clearable placeholder="请选择" :disabled="!formInline.city">
            <el-option v-for="(item, index) in districtData" :key="index" :label="item.name" :value="item.tno"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="j">
          <span slot="label">提货人姓名：</span>
          <el-input v-model="formInline.j" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="k">
          <span slot="label">提货人电话：</span>
          <el-input v-model="formInline.k" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="l">
          <span slot="label">提货人邮箱：</span>
          <el-input v-model="formInline.l" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="m">
          <span slot="label">硬件版本：</span>
          <el-select v-model="formInline.m" filterable placeholder="请选择">
            <el-option v-for="(item, index) in hardwareData" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="n">
          <span slot="label">软件版本：</span>
          <el-select v-model="formInline.n" filterable placeholder="请选择">
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
        a: [{
          required: true,
          message: '请输入批次编号',
          trigger: 'blur'
        }],
        b: [{
          required: true,
          message: '请输入批次名称',
          trigger: 'blur'
        }],
        d: [{
          required: true,
          message: '请输入发货人姓名',
          trigger: 'blur'
        }],
        e: [{
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
        l: [{
          required: true,
          message: '请输入提货人邮箱',
          trigger: 'blur'
        }],
        m: [{
          required: true,
          message: '请选择硬件版本',
          trigger: 'change'
        }],
        n: [{
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
      let formInline = this.formInline
      delete formInline.city
      delete formInline.district
    },
    citySelect(id) { // 市级选择
      this.setRegionData(id, 'districtData')
      let formInline = this.formInline
      delete formInline.district
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

        } else {
          Api.UNITS.showMsgBox()
          return false;
        }
      })
    },
    orgsSelect() {
      // 选择公司名称的时候要清空掉硬件与软件版本
      if (this.formInline.m) this.$delete(this.formInline, 'm')
      if (this.formInline.n) this.$delete(this.formInline, 'n')
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
                value: v.versionName
              })
            } else if (v.versionType === 1) { // 软件
              this.sorfwareData.push({
                label: v.versionName,
                value: v.versionName
              })
            }
          })
        })
      })
    }
  }
}

</script>
<style lang="scss">
.addbrand-container {
  .form-wrapper {
    overflow: auto;
  }

  input,
  textarea {
    background: transparent;
  }
}

</style>
