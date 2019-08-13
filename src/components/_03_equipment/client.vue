<template>
  <div class="client-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.firstname" @keyup.enter.native="searchData" placeholder="客户实名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formInline.telephone" @keyup.enter.native="searchData" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="formInline.createStartTime" :picker-options="startDatePicker" type="date" value-format="timestamp" @change="searchData" placeholder="创建时间（起）"></el-date-picker> -
            <el-date-picker v-model="formInline.createEndTime" :picker-options="startDatePicker" type="date" value-format="timestamp" @change="searchData" placeholder="创建时间（止）"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="firstname" label="客户实名" sortable="custom"></el-table-column>
          <el-table-column prop="telephone" label="手机号码" sortable="custom"></el-table-column>
          <el-table-column prop="status" label="状态" sortable="custom">
            <template slot-scope="scope">
              <span class="bold text_success" v-if="scope.row.status === 1">启用</span>
              <span class="bold text_danger" v-else-if="scope.row.status === 0">停用</span>
            </template>
          </el-table-column>
          <el-table-column prop="dateAdded" label="创建时间" sortable="custom">
            <template slot-scope="scope">{{scope.row.dateAdded | formatDate}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button type="text">设备</el-button>
              <el-button type="text">详情</el-button>
<!--               <el-button type="text" class="text_editor">修改</el-button>
              <el-button v-if="scope.row.status === 0" type="text" class="text_success">启用</el-button>
              <el-button v-else-if="scope.row.status === 1" type="text" class="text_danger">停用</el-button>
              <el-button type="text" class="text_danger">删除</el-button> -->
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
    this.getData()
  },
  methods: {
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getListCustomer
      })
    }
  },
  computed: {
    // 起始时间约数
    startDatePicker() {
      return Api.UNITS.startDatePicker(this, this.formInline.createEndTime)
    },
    // 结束时间约数
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this.formInline.createStartTime)
    }
  }
}

</script>
<style lang="scss"></style>
