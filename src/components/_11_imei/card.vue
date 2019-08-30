<template>
  <div class="card-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="warning" @click="importSnVisible = true">导入</el-button>
          <el-button size="small" type="danger" @click="deleteDatas">批量删除</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.batch_no" @keyup.enter.native="searchData" placeholder="批次号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formInline.iccid" @keyup.enter.native="searchData" @input="formInline.iccid = limitNumberAndLetter(formInline.iccid)" placeholder="ICCID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select filterable clearable placeholder="卡商列表" v-model="formInline.card_type" @change="searchData">
              <el-option v-for="(item, index) in cardType" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" @selection-change="handleSelectionChange" :stripe="isStripe" :row-key="getRowKeys" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column fixed="left" type="selection" :reserve-selection="true" min-width="60"></el-table-column>
          <el-table-column prop="batch_no" label="批次号" sortable="custom" min-width="180"></el-table-column>
          <el-table-column prop="iccid" label="ICCID" sortable="custom" min-width="190"></el-table-column>
          <el-table-column prop="card_type" label="厂商" sortable="custom" min-width="140">
            <template slot-scope="scope">{{scope.row.card_type | valueToLabel(cardType)}}</template>
          </el-table-column>
          <el-table-column prop="create_datetime" label="创建时间" sortable="custom" width="155">
            <template slot-scope="scope">{{scope.row.create_datetime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="create_by" label="创建人" sortable="custom" min-width="100"></el-table-column>
          <el-table-column prop="update_datetime" label="修改时间" sortable="custom" width="155">
            <template slot-scope="scope">{{scope.row.update_datetime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="update_by" label="修改人" sortable="custom" min-width="100"></el-table-column>
          <el-table-column fixed="right" label="操作" width="70">
            <template slot-scope="scope">
              <el-button type="text" class="text_danger" @click="singleDel(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table"></el-pagination>
      </el-row>
    </el-card>
    <!-- 批量导入 -->
    <el-dialog title="卡商信息导入" @close="closeUpload" :visible.sync="importSnVisible" width="700px" :close-on-click-modal="false">
      <div slot>
        <el-form ref="uploadForm" :model="uploadForm" :rules="rules" :inline="false" size="small" label-width="110px">
          <el-form-item label="卡商：" prop="card_type">
            <el-select filterable clearable placeholder="请选择" v-model="uploadForm.card_type">
              <el-option v-for="(item, index) in cardType" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请选择文件：">
            <v-upload ref="upload" :format="['.xlsx']"></v-upload>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="warning" @click="download">导入模板文件下载</el-button>
        <el-button size="small" type="primary" @click="submitForm('uploadForm')">导入</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      importSnVisible: false,
      formData: null,
      logInfo: {},
      selectData: [],
      uploadForm: {},
      cardType: [{
        label: '硕软-高德(sy_gd)',
        value: 'sy_gd'
      }, {
        label: '硕软-云智(sy_yz)',
        value: 'sy_yz'
      }],
      rules: {
        card_type: [{
          required: true,
          message: '请选择卡商',
          trigger: 'change'
        }]
      }
    }
  },
  mounted() {
    this.list.data = []
    this.getData()
  },
  methods: {
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getIccidList
      })
    },
    getRowKeys(row) { // 以org_id作为select的唯一标识
      return row.id
    },
    handleSelectionChange(data) { // 处理列表选择
      this.selectData = data
    },
    download() { // 下载xlsx模板文件
      window.open('/static/template.xlsx', '_self')
    },
    singleDel(scope) { // 单个删除
      this.showCfmBox({
        message: '确定要删除吗？',
        cb: () => {
          _axios.send({
            method: 'get',
            url: _axios.ajaxAd.delIccid,
            params: { id: scope.row.id },
            done: ((res) => {
              this.$refs.listTable.clearSelection()
              this.searchData()
              setTimeout(() => {
                this.showMsgBox({
                  type: 'success',
                  title: '成功',
                  message: '删除成功'
                })
              }, 150)
            })
          })
        }
      })
    },
    deleteDatas() { // 批量删除
      if (this.selectData.length === 0) {
        this.showMsgBox({
          type: 'warning',
          message: '请先勾选要删除的流量卡！'
        })
      } else {
        this.showCfmBox({
          message: `您选中了${this.selectData.length}项，是否确认删除？`,
          cb: () => {
            _axios.send({
              method: 'get',
              url: _axios.ajaxAd.delIccid,
              params: { id: this.selectData.map((v) => v.id).join(',') },
              done: ((res) => {
                this.$refs.listTable.clearSelection()
                this.searchData()
                setTimeout(() => {
                  this.showMsgBox({
                    type: 'success',
                    title: '成功',
                    message: '批量删除成功'
                  })
                }, 150)
              })
            })
          }
        })
      }
    },
    closeUpload() { // 关闭上传弹框
      this.importSnVisible = false
      this.uploadForm = {}
      this.$refs.upload.clearFileList()
      this.$nextTick(() => {

        this.$refs.uploadForm.clearValidate()
      })
    },
    submitForm(formName) { // 提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs.upload.fileList.length === 0) {
            this.showMsgBox({
              message: '请选择要上传的文件！'
            })
            return
          }
          this.formData = new FormData()
          this.formData.append('file', this.$refs.upload.fileList[0].raw)
          this.formData.append('card_type', this.uploadForm.card_type)
          // 验证通过
          _axios.send({
            method: 'post',
            url: _axios.ajaxAd.importIccid,
            data: this.formData,
            done: ((res) => {
              if (res.status === 400) {
                this.uploadForm[res.data] = ''
                this.$refs.uploadForm.validateField([res.data])
              } else {
                this.closeUpload()
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
    }
  }
}

</script>
<style lang="scss"></style>
