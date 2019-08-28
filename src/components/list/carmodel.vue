<template>
  <div class="client-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="openCreateBrand">添加型号</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="brandNames" placeholder="品牌名称" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formInline.brandName" @keyup.enter.native="searchData" placeholder="型号名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="brandName" label="型号名称" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="openUpdateBrand(scope)">修改</el-button>
              <el-button type="text" class="text_danger" @click="deleteBrand(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 型号新增 -->
    <el-dialog :title="isUpdate === false ? '新增汽车型号' : '修改汽车型号'" @close="closeBrand" :visible.sync="brandVisible" width="700px" :close-on-click-modal="false">
      <div slot>
        <el-form ref="uploadForm" :model="uploadForm" :rules="rules" :inline="false" size="small" label-width="100px" @submit.native.prevent>
          <el-form-item prop="brandName" label="型号名称：">
            <el-input v-model="uploadForm.brandName" placeholder="型号名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('uploadForm')">保存</el-button>
            <el-button type="warning" @click="resetForm('uploadForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      isUpdate: false,
      brandVisible: false,
      curBrand: {},
      // 品牌名称（formInlne中的未型号名称）
      brandNames: decodeURIComponent(Api.UNITS.getQuery('brandName')),
      uploadForm: {},
      rules: {
        brandName: [{
          required: true,
          message: '请输入型号名称',
          trigger: 'blur'
        }, {
          max: 100,
          message: '型号不能超过100字符',
          trigger: 'blur'
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
        url: _axios.ajaxAd.getListCarModels,
        data: { brandId: Api.UNITS.getQuery('brandId') }
      })
    },
    getBrand() {
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.toEditCarModels,
        params: { brandId: this.curBrand.brandId },
        done: ((res) => {
          this.uploadForm = res.data || {}
        })
      })
    },
    deleteBrand(scope) {
      this.showCfmBox({
        message: '确定删除吗？',
        cb: () => {
          _axios.send({
            method: 'get',
            url: _axios.ajaxAd.deleteCarBrands,
            params: { brandId: scope.row.brandId },
            done: ((res) => {
              this.getData()
              setTimeout(() => {
                this.showMsgBox({
                  type: 'success',
                  message: '操作成功！'
                }, 150)
              })
            })
          })
        }
      })
    },
    openCreateBrand() { // 打开添加型号
      this.brandVisible = true
      this.isUpdate = false
    },
    openUpdateBrand(scope) { // 打开修改型号
      this.curBrand = scope.row
      this.brandVisible = true
      this.isUpdate = true
      this.getBrand()
    },
    closeBrand() { // 添加修改品牌-关闭
      this.$refs.uploadForm.clearValidate()
      this.brandVisible = false
      this.uploadForm = {}
    },
    resetForm(formName) { // 重置型号弹框
      this.$refs[formName].resetFields()
      this.uploadForm = {}
      this.isUpdate && this.getBrand()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          if (this.isUpdate) {
            _axios.send({
              method: 'post',
              url: _axios.ajaxAd.toUpdateCarModels,
              data: Object.assign({
                brandId: this.curBrand.brandId,
                parentId: Api.UNITS.getQuery('brandId'),
              }, this.uploadForm),
              done: ((res) => {
                if (res.status === 400) {
                  this.uploadForm[res.data] = ''
                  this.$refs.uploadForm.validateField([res.data])
                } else {
                  this.closeBrand()
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
            _axios.send({
              method: 'post',
              url: _axios.ajaxAd.toAddCarModels,
              data: Object.assign({
                parentId: Api.UNITS.getQuery('brandId'),
              }, this.uploadForm),
              done: ((res) => {
                if (res.status === 400) {
                  this.uploadForm[res.data] = ''
                  this.$refs.uploadForm.validateField([res.data])
                } else {
                  this.closeBrand()
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
