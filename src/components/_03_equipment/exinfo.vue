<template>
  <div class="batch-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.deviceSn" @keyup.enter.native="simpleSearchData" placeholder="设备SN号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData" :disabled="!pageAuthBtn.DCP_exinfo_LIST">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true" :disabled="!pageAuthBtn.DCP_exinfo_LIST">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="pageAuthBtn.DCP_exinfo_LIST && list.data" @sort-change="handleSortChange" :stripe="isStripe" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column fixed="left" prop="deviceSn" label="设备SN号" :sortable="sortable" width="160"></el-table-column>
          <el-table-column prop="extName" label="扩展类型" :sortable="sortable" width="140"></el-table-column>
          <el-table-column prop="extValue" label="扩展值" :sortable="sortable"></el-table-column>
          <el-table-column prop="timeAdded" label="激活时间" :sortable="sortable" width="180">
            <template slot-scope="scope">{{scope.row.timeAdded | formatDate}}</template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :stripe="isStripe" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="620px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="90px" v-loading="loadData">
            <el-form-item label="设备SN号">
              <el-input v-model="formInline.deviceSn" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="扩展值">
              <el-input v-model="formInline.extValue" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="扩展类型">
              <el-select v-model="formInline.extName" filterable clearable placeholder="请选择">
                <el-option label="通电开关" value="acc"></el-option>
                <el-option label="导航" value="navmap"></el-option>
                <el-option label="语音" value="voice"></el-option>
                <el-option label="蓝牙" value="bluetooth"></el-option>
                <el-option label="音乐" value="music"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="激活时间">
              <el-date-picker v-model="formInline.timeAddedBegin" :picker-options="startDatePicker" type="date" value-format="timestamp" placeholder="激活时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.timeAddedEnd" :picker-options="endDatePicker" type="date" value-format="timestamp" placeholder="激活时间（止）"></el-date-picker>
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
    simpleSearchData() { // 简单查询
      let deviceSn = this.formInline.deviceSn
      this.formInline = { deviceSn }
      this.searchData()
    },
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getPageDeviceExt
      })
    }
  },
  computed: {
    // 起始时间约数
    startDatePicker() {
      return Api.UNITS.startDatePicker(this, this.formInline.timeAddedEnd)
    },
    // 结束时间约数
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this.formInline.timeAddedBegin)
    }
  }
}

</script>
<style lang="scss"></style>
