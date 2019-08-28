<template>
  <el-card class="addversions-container" shadow="never" v-loading="loadData">
    <div slot="header" class="clearfix">
      <span>版本信息</span>
    </div>
    <el-form class="editor-form" :inline="false" :model="formInline" :rules="rules" ref="ruleForm" label-width="100px" size="small">
      <el-form-item v-if="pageType === 'upgrade'">
        <span slot="label">旧版本号：</span>
        <el-input v-model="formInline.beforeVersionName" placeholder="请输入" disabled></el-input>
      </el-form-item>
      <el-form-item prop="versionName">
        <span slot="label">版本号：</span>
        <el-input v-model="formInline.versionName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="versionType">
        <span slot="label">版本类型：</span>
        <el-select v-model="formInline.versionType" filterable placeholder="请选择" :disabled="pageType === 'update' || pageType === 'upgrade'">
          <el-option label="硬件" :value="0"></el-option>
          <el-option label="软件" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="status">
        <span slot="label">启用状态：</span>
        <el-radio-group v-model="formInline.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="remark">
        <span slot="label">备注：</span>
        <el-input v-model="formInline.remark" type="textarea" rows="4" placeholder="请输入"></el-input>
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
          <el-form class="org_filter" :inline="true" size="small">
            <el-form-item>
              <el-input size="small" @input="filterOrg" v-model="jgFitler" placeholder="机构过滤"></el-input>
            </el-form-item>
          </el-form>
          <el-checkbox class="title-checkbox" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-shadow:[flag] v-model="orgpos_name_arr" @change="handleChoiceChange" :max="orgs.length" :style="{'maxHeight': winHeight/2 + 'px'}">
            <el-checkbox v-for="item in jgs" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
          <div v-if="jgs.length === 0" style="text-align: center; color: #ccc; line-height: 100px">没有符合条件的机构</div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="warning" @click="handleChoiceChange([])">清 空</el-button>
        <el-button size="small" type="warning" @click="handleChoiceChange(formInline.checkboxValArr)">重 选</el-button>
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
      flag: false,
      isUpdate: false,
      checkAll: false, // 是否全选
      pageType: Api.UNITS.getQuery('type'),
      isIndeterminate: false, // 是否半选
      formInline: {
        status: 1
      },
      jgFitler: '',
      jgs: [],
      orgpos_name_arr: [],
      orgpos_name_arr_tmp: [],
      rules: {
        versionName: [{
          required: true,
          message: '请填写版本号',
          trigger: 'blur'
        }, {
          max: 100,
          message: '版本号不能超过100字符',
          trigger: 'blur'
        }],
        status: [{
          required: true,
          message: '请选择启用状态',
          trigger: 'change'
        }]
      }
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
    filterOrg() {
      this.jgs = this.orgs.filter((v) => {
        return v.label.indexOf(this.jgFitler) > -1
      })
    },
    openChoice() {
      this.dialogVisible = true
      this.jgFitler = ''
      this.filterOrg(this.jgFitler)
      setTimeout(() => {
        this.flag = !this.flag
      }, 200)
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
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.toEditVersionPage,
        params: { id: Api.UNITS.getQuery('id') },
        done: ((res) => {
          this.loadData = false
          this.formInline = res.data || {}
          this.formInline.checkboxValArr = this.orgpos_name_arr_tmp = res.data.checkboxVal ? res.data.checkboxVal.split(',') : []
          if (this.pageType === 'upgrade') {
            this.formInline.beforeVersionName = this.formInline.versionName
            this.formInline.versionName = ''
          }
        }),
        fail: () => {
          this.loadData = false
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.formInline = {
        status: 1
      }
      this.orgpos_name_arr = []
      this.orgpos_name_arr_tmp = []
      if (this.pageType === 'update' || this.pageType === 'upgrade') {
        this.getData()
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.pageType === 'update') {
            this.formInline.checkboxVal = this.orgpos_name_arr_tmp.join(',')
            _axios.send({
              method: 'post',
              url: _axios.ajaxAd.updateVersion,
              data: this.formInline,
              done: ((res) => {
                if (res.status === 400) {
                  this.formInline[res.data] = ''
                  this.$refs.ruleForm.validateField([res.data])
                } else {
                  this.$router.push({ name: 'dictionary' })
                  setTimeout(() => {
                    this.showMsgBox({
                      type: 'success',
                      message: '修改成功！'
                    })
                  }, 150)
                }
              })
            })
          } else {
            // 添加与升级是同一个接口
            _axios.send({
              method: 'post',
              url: _axios.ajaxAd.addVersion,
              data: Object.assign({}, this.formInline, {
                // 有该参数代表升级，没有代表新增
                beforeVersionId: Api.UNITS.getQuery('id')
              }),
              done: ((res) => {
                if (res.status === 400) {
                  this.formInline[res.data] = ''
                  this.$refs.ruleForm.validateField([res.data])
                } else {
                  this.$router.push({ name: 'dictionary' })
                  setTimeout(() => {
                    this.showMsgBox({
                      type: 'success',
                      message: this.pageType === 'upgrade' ? '升级成功！' : '添加成功！'
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

  .org_filter {
    position: absolute;
    bottom: 2px;
    right: 232px;
  }
}

</style>
