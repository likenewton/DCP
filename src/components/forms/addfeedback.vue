<template>
  <el-card class="addfeedback-container" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>反馈信息</span>
    </div>
    <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="120px" size="small">
      <el-form-item>
        <span slot="label">问题类型：</span>
        <el-input v-model="formInline.type" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label">用户名称：</span>
        <el-input v-model="formInline.username" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label">联系手机：</span>
        <el-input v-model="formInline.tel" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label">反馈时间：</span>
        <el-input v-model="formInline.fd_time" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label">问题描述：</span>
        <el-input type="textarea" rows="4" v-model="formInline.disc" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label">问题截图：</span>
        <el-card class="resource_wrapper pointer" :body-style="{ padding: '6px' }" shadow="hover" @click.native="showPicView">
          <div class="block">
            <el-tooltip content="点击查看原图" placement="top">
              <el-image :src="formInline.pic" fit="cover"></el-image>
            </el-tooltip>
          </div>
        </el-card>
      </el-form-item>
      <el-form-item prop="status">
        <span slot="label">处理状态：</span>
        <el-select v-model="formInline.status" filterable placeholder="请选择">
          <el-option label="未处理" :value="0"></el-option>
          <el-option label="已处理" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <span slot="label">操作备注：</span>
        <el-input type="textarea" rows="4" v-model="formInline.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="$router.back()">返回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 图片预览 -->
    <v-picview ref="picview" width="800px"></v-picview>
  </el-card>
</template>
<script>
import Api from 'assets/js/api.js'

export default {
  data() {
    return {
      formInline: {
        pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      rules: {
        status: [{
          required: true,
          message: '请输入品牌名称',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取数据
    getData() {
      this.loadData = false
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过

        } else {
          Api.UNITS.showMsgBox()
          return false;
        }
      })
    },
    showPicView() {
      this.$refs.picview.showPicView(this.formInline.pic)
    }
  }
}

</script>
<style lang="scss">
.addfeedback-container {
  .resource_wrapper {
    width: 100px;
    height: 85px;
  }
}

</style>
