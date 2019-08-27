<template>
  <el-card class="addupinfo-container" shadow="never">
    <div slot="header" class="clearfix">
      <span>升级信息</span>
    </div>
    <div class="form-wrapper" :style="{maxHeight: maxTableHeight + 'px'}" v-shadow>
      <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="140px" size="small">
        <el-form-item prop="store">
          <span slot="label">文件储存地址：</span>
          <el-radio-group v-model="formInline.store">
            <el-radio :label="0">服务器本地</el-radio>
            <el-radio :label="1">阿里云存储</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <span slot="label">上传升级包：</span>
          <v-upload ref="upload" :format="['.zip']" :size="20"></v-upload>
        </el-form-item>
        <el-form-item prop="solution">
          <span slot="label">解决方案：</span>
          <el-select v-model="formInline.solution" filterable placeholder="请选择">
            <el-option v-for="(item, index) in deviceType" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="organCode">
          <span slot="label">机构名称：</span>
          <el-select filterable placeholder="请选择" v-model="formInline.organCode" @change="getNewQueryVersionSoftFor">
            <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="orgCode">
          <span slot="label">机构编号：</span>
          <el-input v-model="formInline.orgCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="hardCode">
          <span slot="label">硬件版本号：</span>
          <el-input v-model="formInline.hardCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="softCode">
          <span slot="label">软件版本号：</span>
          <el-input v-model="formInline.softCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="softFor">
          <span slot="label">适合版本号：</span>
          <el-select v-model="formInline.softFor" filterable placeholder="请选择" allow-create>
            <el-option v-for="(item, index) in softFor" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <div class="annotation">可手动输入自定义的版本号</div>
        </el-form-item>
        <el-form-item prop="softDesc">
          <span slot="label">版本描述：</span>
          <el-input v-model="formInline.softDesc" type="textarea" rows="4" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="snList">
          <span slot="label">SN列表：</span>
          <el-input v-model="formInline.snList" type="textarea" rows="4" placeholder="请输入"></el-input>
          <div class="annotation">当为空时所有SN都可以升级，当有SN时，指定SN才可升级，多个SN使用英文逗号分隔</div>
        </el-form-item>
        <!--       <el-form-item prop="company">
        <span slot="label">厂商：</span>
        <el-select v-model="formInline.company" filterable clearable placeholder="请选择" @change="companySelect('company')">
          <el-option v-for="(item, index) in company" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="series">
        <span slot="label">车系：</span>
        <el-select v-model="formInline.series" filterable clearable placeholder="请选择" @change="seriesSelect('series')">
          <el-option v-for="(item, index) in series" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="carType">
        <span slot="label">车型：</span>
        <el-select v-model="formInline.carType" filterable clearable placeholder="请选择">
          <el-option v-for="(item, index) in carType" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item> -->
        <el-form-item prop="isForced">
          <span slot="label">升级方式：</span>
          <el-select v-model="formInline.isForced" filterable placeholder="请选择">
            <el-option label="非强制升级" value="0"></el-option>
            <el-option label="强制升级" value="1"></el-option>
            <el-option label="静默安装" value="2"></el-option>
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
      company: [], // 厂商
      series: [], // 车系
      carType: [], // 车型
      softFor: [], // 合适的版本号
      maxTableHeight: Api.UNITS.maxTableHeight(266),
      formData: null,
      formInline: {
        store: 0
      },
      rules: {
        store: [{
          required: true,
          message: '请选择存储地址',
          trigger: 'change'
        }],
        solution: [{
          required: true,
          message: '请选择解决方案',
          trigger: 'change'
        }],
        organCode: [{
          required: true,
          message: '请选择机构',
          trigger: 'change'
        }],
        orgCode: [{
          required: true,
          message: '请输入机构编号',
          trigger: 'blur'
        }],
        hardCode: [{
          required: true,
          message: '请输入硬件版本号',
          trigger: 'blur'
        }],
        softCode: [{
          required: true,
          message: '请输入软件版本号',
          trigger: 'blur'
        }],
        softFor: [{
          required: true,
          message: '请选择合适版本',
          trigger: 'change'
        }],
        isForced: [{
          required: true,
          message: '请选择升级方式',
          trigger: 'change'
        }]
      },
    }
  },
  mounted() {
    // this.setRegionData({}, 'company')
    this.getNewQueryVersionSoftFor()
  },
  methods: {
    // === 车型选择(禁用) start ===
    getCarType(para = {}, cb) {
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getCarTypeJson,
        params: para,
        done: ((res) => {
          cb && cb(res)
        })
      })
    },
    companySelect(parent) { // 省级选择
      this.setRegionData({
        parent,
        value: this.formInline.company
      }, 'series')
      this.$delete(this.formInline, 'series')
      this.$delete(this.formInline, 'carType')
    },
    seriesSelect(parent) { // 市级选择
      this.setRegionData({
        parent,
        value: this.formInline.series
      }, 'carType')
      this.$delete(this.formInline, 'carType')
    },
    setRegionData(para = {}, key) { // 保存数据，处理被删除的区域
      this.getCarType(para, (res) => {
        this[key] = res.data || []
      })
    },
    // === 车型选择(禁用) end ===
    getNewQueryVersionSoftFor() { // 获取合适的版本号
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getNewQueryVersionSoftFor,
        params: {
          organCode: this.formInline.organCode,
          hardCode: 'H3.1'
        },
        done: ((res) => {
          this.softFor = res.data || []
        })
      })
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData = new FormData()
          this.formData.append('file', this.$refs.upload.fileList[0].raw)
          for (let key in this.formInline) {
            this.formData.append(key, this.formInline[key])
          }
          // 验证通过
          _axios.send({
            method: 'post',
            url: _axios.ajaxAd.importOta,
            data: this.formData,
            done: ((res) => {
              if (res.status === 400) {
                this.formInline[res.data] = ''
                this.$refs.ruleForm.validateField([res.data])
              } else {
                this.$router.push({ name: 'sysUpgrade' })
                setTimeout(() => {
                  // 加个延迟，动画更流畅
                  this.showMsgBox({
                    type: 'success',
                    message: '新增成功！'
                  })
                }, 150)
              }
            })
          })
        } else {
          Api.UNITS.showMsgBox()
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.formInline = {
        store: 0
      }
      this.$refs.upload.clearFileList()
    }
  }
}

</script>
<style lang="scss">
  .addupinfo-container {
    .form-wrapper {
      overflow: auto;

      input, textarea {
        background: transparent;
      }
    }
  }
</style>
