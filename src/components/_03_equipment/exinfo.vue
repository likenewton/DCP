<template>
  <div class="batch-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="设备SN号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="" label="设备SN号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="扩展类型" sortable="custom"></el-table-column>
          <el-table-column prop="" label="扩展值" sortable="custom"></el-table-column>
          <el-table-column prop="" label="激活时间" sortable="custom"></el-table-column>
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
            <el-form-item label="设备SN号">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="扩展值">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="扩展类型">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="激活时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="激活时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="激活时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
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
