<template>
  <div class="hisVersion-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-select v-model="organCode" filterable clearable placeholder="对应的机构可能已经删除" disabled>
              <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formInline.softCode" @keyup.enter.native="simpleSearchData" placeholder="软件版本号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="softCode" label="软件版本号" sortable="custom" width="150"></el-table-column>
          <el-table-column prop="hardCode" label="硬件版本号" sortable="custom" width="150"></el-table-column>
          <el-table-column prop="isForced" label="升级方式" sortable="custom" width="100">
            <template slot-scope="scope">
              <span class="text_danger bold" v-if="scope.row.isForced === 0">非强制升级</span>
              <span class="text_success bold" v-if="scope.row.isForced === 1">强制升级</span>
              <span class="text_warning bold" v-if="scope.row.isForced === 2">静默安装</span>
            </template>
          </el-table-column>
          <el-table-column prop="timePublish" label="发布时间" sortable="custom" width="100">
            <template slot-scope="scope">{{scope.row.timePublish | formatDate('yyy-mm-dd')}}</template>
          </el-table-column>
          <el-table-column prop="packUrl" label="升级包地址" sortable="custom" min-width="180"></el-table-column>
          <el-table-column prop="timeAdded" label="增加时间" sortable="custom" width="155">
            <template slot-scope="scope">{{scope.row.timeAdded | formatDate}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button v-if="scope.row.isValid === 1" type="text" class="text_danger" @click="disabled(scope)">停用</el-button>
              <el-button v-else-if="scope.row.isValid === 0" type="text" class="text_success" @click="disabled(scope)">启用</el-button>
              <el-button type="text" @click="showCheckVersionInfo(scope)">详情</el-button>
              <el-button type="text" class="text_editor" @click="showUpdateVersionInfo(scope)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="620px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="90px">
            <el-form-item label="软件版本号">
              <el-input v-model="formInline.softCode" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="硬件版本号">
              <el-input v-model="formInline.hardCode" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="升级方式">
              <el-select v-model="formInline.isForced" filterable clearable placeholder="请选择">
                <el-option label="非强制升级" :value="0"></el-option>
                <el-option label="强制升级" :value="1"></el-option>
                <el-option label="静默升级" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker v-model="formInline.timeStartPublish" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="发布时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.timeEndPublish" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="发布时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 修改版本信息 -->
    <el-dialog title="修改版本信息" @close="close" :visible.sync="updateVersionInfo" width="700px" :close-on-click-modal="false" class="check-version">
      <div slot>
        <el-form ref="versionForm" :model="versionForm" :inline="false" :rules="rules" size="small" label-width="130px">
          <el-form-item label="机构名称：" class="text">
            <span>{{versionForm.organCode | valueToLabel(orgs)}}</span>
          </el-form-item>
          <el-form-item label="机构编号：" class="text">
            <span>{{versionForm.orgCode}}</span>
          </el-form-item>
          <el-form-item label="硬件版本号：" class="text">
            <span>{{versionForm.hardCode}}</span>
          </el-form-item>
          <el-form-item label="软件版本号：" class="text">
            <span>{{versionForm.softCode}}</span>
          </el-form-item>
          <el-form-item label="适合版本号：" class="text">
            <span>{{versionForm.softFor}}</span>
          </el-form-item>
          <el-form-item label="版本描述：">
            <el-input v-model="versionForm.softDesc" type="textarea" rows="4" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="SN列表：">
            <el-input v-model="versionForm.snList" type="textarea" rows="4" placeholder="请输入"></el-input>
            <div class="annotation">当为空时所有SN都可以升级，当有SN时，指定SN才可升级，多个SN使用英文逗号分隔</div>
          </el-form-item>
          <el-form-item label="升级方式：" prop="isForced">
            <el-select v-model="versionForm.isForced" filterable placeholder="请选择">
              <el-option label="非强制升级" :value="0"></el-option>
              <el-option label="强势升级" :value="1"></el-option>
              <el-option label="静默升级" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间：" class="text">
            <span>{{versionForm.timePublish | formatDate('yyyy-mm-dd')}}</span>
          </el-form-item>
          <el-form-item label="升级包文件URL：" class="text">
            <span>{{versionForm.packUrl}}</span>
          </el-form-item>
          <el-form-item label="升级包文件MD5：" class="text">
            <span>{{versionForm.packMd5}}</span>
          </el-form-item>
          <el-form-item label="升级包文件大小：" class="text">
            <span>{{versionForm.packSize ? versionForm.packSize : 0}} 字节</span>
          </el-form-item>
          <el-form-item style="margin-top: 15px">
            <el-button type="primary" @click="submitForm('versionForm')">保存</el-button>
            <el-button type="warning" @click="resetForm('versionForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 查看版本信息 -->
    <el-drawer title="查看版本信息" :visible.sync="checkVersionInfo" direction="rtl" size="600px" :wrapperClosable="true">
      <div class="para-wrapper" v-shadow:[checkVersionInfo]>
        <el-form class="check-form" :inline="false" :model="versionForm" size="small" label-width="150px" style="padding-right: 20px">
          <el-form-item label="机构名称：">
            <span>{{versionForm.organCode | valueToLabel(orgs)}}</span>
          </el-form-item>
          <el-form-item label="机构编号：">
            <span>{{versionForm.orgCode}}</span>
          </el-form-item>
          <el-form-item label="硬件版本号：">
            <span>{{versionForm.hardCode}}</span>
          </el-form-item>
          <el-form-item label="软件版本号：">
            <span>{{versionForm.softCode}}</span>
          </el-form-item>
          <el-form-item label="适合版本号：">
            <span>{{versionForm.softFor}}</span>
          </el-form-item>
          <el-form-item label="解决方案：">
            <span>{{versionForm.solution === 0 ? '车机' : '车镜'}}</span>
          </el-form-item>
<!--           <el-form-item label="车型：">
            <span>{{versionForm.carType}}</span>
          </el-form-item> -->
          <el-form-item label="版本描述：">
            <el-input v-model="versionForm.softDesc" type="textarea" rows="4" placeholder="请输入" disabled></el-input>
          </el-form-item>
          <el-form-item label="SN列表：">
            <el-input v-model="versionForm.snList" type="textarea" rows="4" placeholder="请输入" disabled></el-input>
          </el-form-item>
          <el-form-item label="升级方式：">
            <span>{{isForced[versionForm.isForced]}}</span>
          </el-form-item>
          <el-form-item label="发布时间：" class="text">
            <span>{{versionForm.timePublish | formatDate('yyyy-mm-dd')}}</span>
          </el-form-item>
          <el-form-item label="升级包文件URL：">
            <span>{{versionForm.packUrl}}</span>
          </el-form-item>
          <el-form-item label="升级包文件MD5：">
            <span>{{versionForm.packMd5}}</span>
          </el-form-item>
          <el-form-item label="升级包文件大小：">
            <span>{{versionForm.packSize ? versionForm.packSize : 0}} 字节</span>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      curScope: null,
      updateVersionInfo: false,
      checkVersionInfo: false,
      organCode: Api.UNITS.getQuery('organCode'),
      versionForm: {},
      rules: {
        isForced: [{
          required: true,
          message: '请选择升级方式',
          trigger: 'change'
        }]
      },
      isForced: {
        '0': '非强制升级',
        '1': '强制升级',
        '2': '静默安装'
      }
    }
  },
  mounted() {
    this.list.data = []
    this.getData()
  },
  methods: {
    simpleSearchData() { // 简单查询
      let softCode = this.formInline.softCode
      this.formInline = {
        softCode,
      }
      this.searchData()
    },
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getOtaDetail,
        data: { organCode: this.organCode }
      })
    },
    getVersionFormData() {
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getOtaHistoryDetail,
        params: { id: this.curScope.row.otaId },
        done: ((res) => {
          this.versionForm = res.data || {}
          this.$nextTick(() => {
            this.$refs.versionForm.clearValidate()
          })
        })
      })
    },
    // 设备失效
    disabled(scope) {
      this.showCfmBox({
        message: scope.row.isValid === 1 ? '确认停用该版本吗？' : '确认启用该版本吗？',
        cb: () => {
          this.loading = this.$loading({
            lock: true,
            text: scope.row.isValid === 1 ? '停用中...' : '启用中...',
            spinner: Api.STATIC.loadIcon,
            background: Api.STATIC.loadBg
          })
          _axios.send({
            method: 'get',
            url: _axios.ajaxAd.updateOtaValid,
            params: {
              otaId: scope.row.otaId,
              isValid: scope.row.isValid === 1 ? 0 : 1
            },
            done: () => {
              this.loading.close()
              this.getData()
              this.showMsgBox({
                type: 'success',
                message: '操作成功！'
              })
            },
            fail: () => {
              this.loading.close()
            }
          })
        }
      })
    },
    showCheckVersionInfo(scope) {
      this.curScope = scope
      this.checkVersionInfo = true
      this.getVersionFormData()
    },
    showUpdateVersionInfo(scope) {
      this.curScope = scope
      this.updateVersionInfo = true
      this.getVersionFormData()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          _axios.send({
            method: 'post',
            url: _axios.ajaxAd.updateOta,
            data: this.versionForm,
            done: ((res) => {
              if (res.status === 400) {
                this.versionForm[res.data] = ''
                this.$refs.versionForm.validateField([res.data])
              } else {
                this.updateVersionInfo = false
                this.getData()
                setTimeout(() => {
                  this.showMsgBox({
                    type: 'success',
                    message: res.msg || '操作成功！'
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
      this.$refs[formName].resetFields()
      this.versionForm = {}
      this.getVersionFormData()
    },
  },
  computed: {
    startDatePicker() {
      return Api.UNITS.startDatePicker(this, this.formInline.timeEndPublish)
    },
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this.formInline.timeStartPublish)
    }
  }
}

</script>
<style lang="scss">
.hisVersion-container {
  .check-version {
    .el-dialog {
      margin-top: 10vh !important;
    }

    .el-dialog__body {
      padding: 10px 20px 30px;

      .el-form-item.text {
        margin-bottom: 5px;
      }
    }

  }
}

</style>
