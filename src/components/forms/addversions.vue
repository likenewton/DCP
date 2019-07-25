<template>
  <el-card class="addversions-container" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>版本信息</span>
    </div>
    <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="100px" size="small">
      <el-form-item prop="" v-if="pageType === 'upgrade'">
        <span slot="label">旧版本号：</span>
        <el-input placeholder="旧版本号" disabled></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">版本号：</span>
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">版本类型：</span>
        <el-select filterable placeholder="请选择" :disabled="pageType === 'update' || pageType === 'upgrade'">
          <el-option label="硬件" :value="0"></el-option>
          <el-option label="软件" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <span slot="label">启用状态：</span>
        <el-radio-group>
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">备注：</span>
        <el-input type="textarea" rows="4" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <span slot="label">机构列表：</span>
        <el-button type="primary" @click="openChoice">选择可控机构 <span>({{orgpos_name_arr_tmp.length}}/{{orgs.length}})</span></el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="$router.back()">返回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible="dialogVisible" @close="cancelChoice" :close-on-click-modal="false" width="1200px">
      <span slot="title">可选机构<span>({{orgpos_name_arr.length}}/{{orgs.length}})</span></span>
      <div class="dialog_content">
        <div slot>
          <el-checkbox class="title-checkbox" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="orgpos_name_arr" @change="handleChoiceChange" :max="orgs.length" :style="{'maxHeight': winHeight/2 + 'px'}">
            <el-checkbox v-for="item in orgs" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="warning" @click="handleChoiceChange([])">清 空</el-button>
        <el-button size="small" type="warning" @click="handleChoiceChange(formInline.orgpos)">重 选</el-button>
        <el-button size="small" type="primary" @click="makesureChoice">保 存</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import Api from 'assets/js/api.js'

export default {
  data() {
    return {
      dialogVisible: false,
      isUpdate: false,
      checkAll: false, // 是否全选
      pageType: Api.UNITS.getQuery('type'),
      isIndeterminate: false, // 是否半选
      orgpos_name_arr: [],
      orgpos_name_arr_tmp: [],
      rules: {},
      // 假数据
      orgs: [{
        label: '云智易联 > 测试机构1',
        value: 1
      }, {
        label: '云智易联 > 测试机构2',
        value: 2
      }, {
        label: '威仕特 > CM01大屏车机-威仕特 CM1DPCJ-WST',
        value: 3
      }, {
        label: '云智易联 > 测试机构4',
        value: 4
      }]
    }
  },
  mounted() {
    // 这个页面很特殊有三种状态
    if (this.pageType === 'update') {
      this.getData()
    } else if (this.pageType === 'upgrade') {
      this.getData()
    } else {
      this.loadData = false
    }
  },
  methods: {
    openChoice() {
      this.dialogVisible = true
      // checked弹框关闭的时候都会被清空，打开弹框的时候要从temp获取选择的数据
      this.handleChoiceChange(this.orgpos_name_arr_tmp)
    },
    // 弹框关闭的时清空checked
    cancelChoice() {
      this.dialogVisible = false
      this.handleChoiceChange(this.formInline.orgpos)
    },
    // 多选发生改变时执行
    handleChoiceChange(para = []) {
      let checkedCount = para.length
      this.orgpos_name_arr = para
      this.checkAll = checkedCount === this.orgs.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.orgs.length
    },
    // 保存选择
    makesureChoice() {
      let list = this.list[this.choiceType]
      this.$message.success(`已选择 ${this.orgpos_name_arr.length} 项`)
      this.orgpos_name_arr_tmp = this.orgpos_name_arr
      this.dialogVisible = false
    },
    // 全选
    handleCheckAllChange(val) {
      this.orgpos_name_arr = val ? this.orgs.map((v) => v.value) : [];
      this.isIndeterminate = false;
    },
    // 获取数据
    getData() {
      this.loadData = true
      setTimeout(() => {
        this.loadData = false
      }, 500)
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.formInline = {}
      this.orgpos_name_arr = []
      this.orgpos_name_arr_tmp = []
      // this.isUpdate && this.getData()
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

        } else {
          Api.UNITS.showMsgBox()
          return false;
        }
      })
    }
  }
}

</script>
<style lang="scss">
.addversions-container {
  .el-card__header {
    margin: 0 15px;
  }

  .el-transfer-panel {
    width: 30%;
    min-width: 250px;
  }

  .el-dialog__body {
    padding: 20px;

    .el-checkbox-group {
      overflow: auto;

      label {
        margin: 0;
        padding: 5px;
        width: 370px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &.is-checked {
          .el-checkbox__label {
            color: #666;
          }
        }

        &:hover {
          background: #fafafa;
        }

        .el-checkbox__inner {
          vertical-align: initial;
        }
      }
    }

    .title-checkbox {
      &.is-checked {
        .el-checkbox__label {
          color: #666;
        }
      }

      height: 35px;
      padding: 5px;
    }
  }
}

</style>
