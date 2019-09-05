<template>
  <div class="carbrand-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name:'addcarbrand'})" :disabled="!pageAuthBtn.DCP_carbrand_ADD">添加品牌</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.brandName" @keyup.enter.native="searchData" placeholder="品牌名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData" :disabled="!pageAuthBtn.DCP_carbrand_LIST">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="pageAuthBtn.DCP_carbrand_LIST && list.data" @sort-change="handleSortChange" :stripe="isStripe" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="brandName" label="品牌名称" :sortable="sortable"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" class="text_editor" @click="$router.push({name:'addcarbrand',query:{type:'update',brandId:scope.row.brandId,parentId:scope.row.parentId}})" :disabled="!pageAuthBtn.DCP_carbrand_EDITOR">修改</el-button>
              <el-button type="text" @click="$router.push({name:'carmodel',query:{brandName:scope.row.brandName,parentId:scope.row.parentId,brandId:scope.row.brandId}})" :disabled="!pageAuthBtn.DCP_carbrand_CHECK">型号</el-button>
              <el-button type="text" class="text_danger" @click="deleteBrand(scope)" :disabled="!pageAuthBtn.DCP_carbrand_DELETE">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {}
  },
  mounted() {
    this.list.data = []
    this.getData()
  },
  methods: {
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getListCarBrands
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
    }
  }
}

</script>
<style lang="scss"></style>
