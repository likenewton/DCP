<template>
  <div class="brand-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name: 'addbrand'})">添加品牌</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-select v-model="formInline.state" filterable clearable placeholder="状态" @change="searchData">
              <el-option label="有效" :value="1"></el-option>
              <el-option label="无效" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.organCode" filterable clearable placeholder="所属机构" @change="searchData">
              <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="brandName" label="品牌名称"></el-table-column>
          <el-table-column prop="distributor" label="分销商"></el-table-column>
          <el-table-column prop="organCode" label="所属机构" sortable="custom">
            <template slot-scope="scope">{{scope.row.organName}}</template>
          </el-table-column>
          <el-table-column prop="state" label="状态" sortable="custom" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.state === 1" class="text_success">有效</span>
              <span v-else class="text_danger">无效</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="245">
            <template slot-scope="scope">
              <el-button type="text" class="text_editor" @click="$router.push({name:'addbrand',query:{type:'update', id:scope.row.id}})">编辑</el-button>
              <el-button type="text" :class="[scope.row.state===1?'text_danger':'text_success']" @click="disabled(scope)">{{scope.row.state ===1?'失效':'生效'}}</el-button>
              <el-button type="text" class="text_primary" @click="$router.push({name:'devInfo'})">设备详情</el-button>
              <el-button type="text" class="text_warning" @click="importDevVisible = true">导入设备</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 导入设备 -->
    <el-dialog title="导入设备SN号" @close="close" :visible.sync="importDevVisible" width="700px" :close-on-click-modal="false">
      <div slot>
        <el-form ref="uploadForm" :inline="false" size="small" label-width="110px">
          <el-form-item label="请选择文件：">
            <v-upload ref="upload" :format="['.txt']"></v-upload>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="submitForm">导入</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      importDevVisible: false,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getDeviceBrand
      })
    },
    disabled(scope) {
      this.showCfmBox({
        message: `确定使记录${scope.row.state===1?'失效':'生效'}吗？`,
        cb: () => {
          _axios.send({
            method: 'get',
            url: _axios.ajaxAd.brandChangeState,
            params: {
              brandId: scope.row.id,
              state: scope.row.state
            },
            done: ((res) => {
              this.getData()
              setTimeout(() => {
                this.showMsgBox({
                  type: 'success',
                  message: '操作成功'
                })
              }, 150)
            })
          })
        }
      })
    },
    // 提交表单上传文件
    submitForm() {
      if (this.$refs.upload.fileList.length === 0) {
        this.showMsgBox({
          message: '请选择要上传的文件！'
        })
      } else {
        console.log(this.$refs.upload.fileList)
      }
    },
    close() {
      // 关闭弹框的时候清掉选择上传的文件
      this.$refs.upload.clearFileList()
    }
  }
}

</script>
<style lang="scss"></style>
