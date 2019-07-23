<template>
  <div class="batch-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-date-picker v-model="formInline.start" type="datetime" placeholder="拍摄时间（起）"></el-date-picker> -
            <el-date-picker v-model="formInline.end" type="datetime" placeholder="拍摄时间（止）"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="" label="图片" width="100">
            <template slot-scope="scope">
              <el-tooltip content="点击查看原图" placement="top">
                <el-image :src="scope.row.src" fit="cover" @click="showPicView(scope)" class="pointer"></el-image>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="" label="设备SN号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="车主姓名" sortable="custom"></el-table-column>
          <el-table-column prop="" label="车主电话" sortable="custom"></el-table-column>
          <el-table-column prop="" label="车牌号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="经度坐标" sortable="custom"></el-table-column>
          <el-table-column prop="" label="纬度坐标" sortable="custom"></el-table-column>
          <el-table-column prop="" label="地理位置" sortable="custom"></el-table-column>
          <el-table-column prop="" label="拍摄时间" sortable="custom"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="700px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="90px">
            <el-form-item label="名称">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="公司名称">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="设备SN号">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="创建时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="创建时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 图片预览 -->
    <v-picview ref="picview"></v-picview>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      list: {
        data: [{
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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
    getData() {},
    showPicView(scope) {
      this.$refs.picview.showPicView(scope.row.src)
    }
  }
}

</script>
<style lang="scss"></style>
