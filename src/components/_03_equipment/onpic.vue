<template>
  <div class="onpic-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-date-picker v-model="formInline.startTimeAdded" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" @change="searchData" placeholder="拍摄时间（起）"></el-date-picker> -
            <el-date-picker v-model="formInline.endTimeAdded" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" @change="searchData" placeholder="拍摄时间（止）"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="photoUrl" label="图片" width="100">
            <template slot-scope="scope">
              <el-tooltip content="点击查看原图" placement="top">
                <el-image :src="scope.row.photoUrl" fit="cover" @click="$refs.picview.showPicView(scope.row.photoUrl)" class="pointer"></el-image>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="deviceSn" label="设备SN号" sortable="custom" width="155"></el-table-column>
          <el-table-column prop="autocarName" label="车主姓名" sortable="custom" width="100"></el-table-column>
          <el-table-column prop="autocarTel" label="车主电话" sortable="custom" width="110"></el-table-column>
          <el-table-column prop="autocarTag" label="车牌号" sortable="custom" width="100"></el-table-column>
          <el-table-column prop="longitude" label="经度坐标" sortable="custom" width="100"></el-table-column>
          <el-table-column prop="latitude" label="纬度坐标" sortable="custom" width="100"></el-table-column>
          <el-table-column prop="location" label="地理位置" sortable="custom" min-width="200"></el-table-column>
          <el-table-column prop="timeAdded" label="拍摄时间" sortable="custom" width="160">
            <template slot-scope="scope">{{scope.row.timeAdded | formatDate}}</template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 图片预览 -->
    <v-picview ref="picview"></v-picview>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {}
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getOnpicList
      })
    }
  },
  computed: {
    startDatePicker() {
      return Api.UNITS.startDatePicker(this, this.formInline.endTimeAdded)
    },
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this.formInline.startTimeAdded)
    },
  }
}

</script>
<style lang="scss">
.onpic-container {
  .el-table {
    .el-image {
      height: 50px;
      width: 100%;
    }
  }

}

</style>
