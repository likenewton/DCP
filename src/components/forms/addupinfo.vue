<template>
  <el-card class="addbrand" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>升级信息</span>
    </div>
    <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="140px" size="small">
      <el-form-item prop="">
        <span slot="label">文件储存地址：</span>
        <el-radio-group>
          <el-radio label="服务器本地" :value="0"></el-radio>
          <el-radio label="阿里云存储" :value="1"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <span slot="label">上传升级包：</span>
        <v-upload ref="upload" :format="[]"></v-upload>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">解决方案：</span>
        <el-select filterable clearable placeholder="请选择">
          <el-option label="车机" value="0"></el-option>
          <el-option label="车镜" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">机构名称：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">硬件版本号：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">软件版本号：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">适合版本号：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">版本描述：</span>
        <el-input type="textarea" rows="4" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">SN列表：</span>
        <el-input type="textarea" rows="4" placeholder="请输入"></el-input>
        <div class="annotation">当为空时所有SN都可以升级，当有SN时，指定SN才可升级，多个SN使用英文逗号分隔</div>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">厂商：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">车系：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">车型：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">升级方式：</span>
        <el-select filterable clearable placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">升级包文件URL：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">升级包文件MD5：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">升级包文件大小：</span>
        <el-input placeholder="请输入"></el-input>
        <div class="annotation">单位：字节</div>
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
      this.loadData = true
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
