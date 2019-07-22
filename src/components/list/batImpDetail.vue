<template>
  <div class="batImpDetail-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="设备SN号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select filterable clearable placeholder="机构列表"></el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="formInline.start" type="datetime" placeholder="导入时间（起）"></el-date-picker> -
            <el-date-picker v-model="formInline.end" type="datetime" placeholder="导入时间（止）"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="设备SN号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="机构" sortable="custom"></el-table-column>
          <el-table-column prop="" label="导入时间" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="$router.push({name:'devRecord'})">设备记录</el-button>
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
          a: 1
        }],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
    }
  },
  mounted() {

  },
  methods: {
    getData() {}
  }
}

</script>
<style lang="scss"></style>
