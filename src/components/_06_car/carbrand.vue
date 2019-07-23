<template>
  <div class="client-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name:'addcarbrand'})">添加品牌</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="品牌名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="品牌名称" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="$router.push({name:'addcarbrand',query:{type:'update'}})">修改</el-button>
              <el-button type="text" @click="$router.push({name:'carmodel'})">型号</el-button>
              <el-button type="text" class="text_danger" @click="deleteBrand">删除</el-button>
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
    return {
      list: {
        data: [{
          a: 'test'
        }],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      }
    }
  },
  mounted() {

  },
  methods: {
    getData() {},
    deleteBrand() {
      this.showCfmBox({
        message: '确定删除吗？',
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功！'
          })
        }
      })
    }
  }
}

</script>
<style lang="scss"></style>
