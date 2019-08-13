<template>
  <div class="devExcepLog-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-select v-model="formInline.batchSn" filterable clearable placeholder="请选择批次号" @change="searchData">
              <el-option v-for="(item, index) in batchs" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table :data="list.data" ref="listTable" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="batchSn" label="批次号" sortable="custom" width="140"></el-table-column>
          <el-table-column prop="deviceSn" label="设备号" sortable="custom" width="160"></el-table-column>
          <el-table-column prop="excepDesc" label="异常描述" sortable="custom"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable="custom" width="160">
            <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
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
      batchs: []
    }
  },
  mounted() {
    this.getBatchList()
    this.getData()
  },
  methods: {
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getDeviceExcepLog,
        data: {
          batchId: Api.UNITS.getQuery('batchId')
        }
      })
    },
    getBatchList() {
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.queryBatchSnList,
        params: { batchId: Api.UNITS.getQuery('batchId') },
        done: ((res) => {
          let data = res.data || []
          this.batchs = []
          data.forEach((v) => {
            this.batchs.push({
              label: v.batchSn,
              value: v.batchSn
            })
          })
        })
      })
    }
  }
}

</script>
<style lang="scss"></style>
