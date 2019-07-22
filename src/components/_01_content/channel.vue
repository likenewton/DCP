<template>
  <div class="channel-container">
    <el-card class="clearfix" shadow="never">
      <el-row style="margin-bottom: 10px">
        <el-button type="success" size="small">添加频道</el-button>
      </el-row>
      <el-row :gutter="20" type="flex">
        <el-col style="width: 250px; height: 600px">
          <v-tree></v-tree>
        </el-col>
        <el-col style="width: 800px">
          <el-form :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="110px" size="small">
            <el-form-item prop="">
              <span slot="label">频道编号：</span>
              <el-input placeholder="频道编号"></el-input>
            </el-form-item>
            <el-form-item prop="">
              <span slot="label">频道名称：</span>
              <el-input placeholder="频道名称"></el-input>
            </el-form-item>
            <el-form-item prop="">
              <span slot="label">频道类型：</span>
              <el-radio-group>
                <el-radio :label="0">资源</el-radio>
                <el-radio :label="1">资讯</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="">
              <span slot="label">排序：</span>
              <el-input placeholder="排序"></el-input>
            </el-form-item>
            <el-form-item prop="">
              <span slot="label">层级：</span>
              <el-input placeholder="层级"></el-input>
            </el-form-item>
            <el-form-item prop="">
              <span slot="label">父类频道：</span>
              <el-input placeholder="单机频道树节点，确定父类资源"></el-input>
            </el-form-item>
            <el-form-item prop="">
              <span slot="label">状态：</span>
              <el-radio-group>
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">停用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="">
              <span slot="label">备注：</span>
              <el-input placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {

  },
  methods: {
    getData() {}
  }
}

</script>
<style lang="scss">
.channel-container {}

</style>
