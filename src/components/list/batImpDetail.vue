<template>
  <div class="batImpDetail-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.sn" @keyup.enter.native="searchData" placeholder="设备SN号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.organCode" filterable clearable placeholder="机构列表" @change="searchData">
              <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="formInline.importStartTime" :picker-options="startDatePicker" type="date" value-format="timestamp" placeholder="导入时间（起）" @change="searchData"></el-date-picker> -
            <el-date-picker v-model="formInline.importEndTime" :picker-options="endDatePicker" type="date" value-format="timestamp" placeholder="导入时间（止）" @change="searchData"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="batchSn" label="批次号" sortable="custom"></el-table-column>
          <el-table-column prop="sn" label="设备SN号" sortable="custom"></el-table-column>
          <el-table-column prop="organCode" label="机构" sortable="custom">
            <template slot-scope="scope">{{scope.row.organCode | valueToLabel(orgs)}}</template>
          </el-table-column>
          <el-table-column prop="createTime" label="导入时间" sortable="custom">
            <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
          </el-table-column>
          <el-table-column label="操作" width="100">
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
    return {}
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.pageDeviceMateriel,
        data: {
          batchId: Api.UNITS.getQuery('batchId')
        }
      })
    }
  },
  computed: {
    // 起始时间约数
    startDatePicker() {
      return Api.UNITS.startDatePicker(this, this.formInline.importEndTime)
    },
    // 结束时间约数
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this.formInline.importStartTime)
    }
  }
}

</script>
<style lang="scss"></style>
