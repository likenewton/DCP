<template>
  <div class="client-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="客户实名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="formInline.start" type="datetime" placeholder="创建时间（起）"></el-date-picker> -
            <el-date-picker v-model="formInline.end" type="datetime" placeholder="创建时间（止）"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="" label="客户实名" sortable="custom"></el-table-column>
          <el-table-column prop="" label="手机号码" sortable="custom"></el-table-column>
          <el-table-column prop="" label="状态" sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建时间" sortable="custom"></el-table-column>
          <el-table-column flxed="right" label="操作" sortable="custom"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
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
<style lang="scss"></style>
