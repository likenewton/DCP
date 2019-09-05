<template>
  <div class="devUprecorde-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.deviceSn" @keyup.enter.native="simpleSearchData" placeholder="设备SN号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData" :disabled="!pageAuthBtn.DCP_devUprecorde_LIST">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true" :disabled="!pageAuthBtn.DCP_devUprecorde_LIST">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="pageAuthBtn.DCP_devUprecorde_LIST && list.data" @sort-change="handleSortChange" :stripe="isStripe" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="deviceSn" fixed="left" label="设备SN号" :sortable="sortable" width="160">
<!--             <template slot-scope="scope">
              <el-link type="primary" @click="$router.push({name:'devRecord',query:{deviceId:scope.row.deviceId}})">{{scope.row.deviceSn}}</el-link>
            </template> -->
          </el-table-column>
          <el-table-column prop="organCode" label="机构名称" :sortable="sortable" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.organCode">{{scope.row.organCode | valueToLabel(orgs)}}</span>
              <span v-else>平台机构</span>
            </template>
          </el-table-column>
          <el-table-column prop="hardCode" label="硬件版本号" :sortable="sortable" min-width="100"></el-table-column>
          <el-table-column prop="softCode" label="软件版本号" :sortable="sortable" min-width="130"></el-table-column>
          <el-table-column prop="deviceIp" label="设备IP地址" :sortable="sortable" width="120"></el-table-column>
          <el-table-column prop="deviceMac" label="设备MAC地址" :sortable="sortable" width="160"></el-table-column>
          <el-table-column prop="upgradeCount" label="升级次数" :sortable="sortable" align="right" width="88"></el-table-column>
          <el-table-column prop="addedTime" label="初次升级时间" :sortable="sortable" width="153">
            <template slot-scope="scope">{{scope.row.addedTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="upgradeTime" label="上次升级时间" :sortable="sortable" width="153">
            <template slot-scope="scope">{{scope.row.upgradeTime | formatDate}}</template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="730px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="110px" v-loading="loadData">
            <el-form-item label="设备SN号">
              <el-input v-model="formInline.deviceSn" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="所属机构">
              <el-select v-model="formInline.organCode" filterable clearable placeholder="请选择">
                <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="硬件版本号">
              <el-input v-model="formInline.hardCode" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="软件版本号">
              <el-input v-model="formInline.softCode" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="初次升级时间">
              <el-date-picker v-model="formInline.addedTimeStart" :picker-options="startDatePicker_1" type="date" value-format="yyyy-MM-dd" placeholder="初次升级时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.addedTimeEnd" :picker-options="endDatePicker_1" type="date" value-format="yyyy-MM-dd" placeholder="初次升级时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item label="上次升级时间">
              <el-date-picker v-model="formInline.upgradeTimeStart" :picker-options="startDatePicker_2" type="date" value-format="yyyy-MM-dd" placeholder="上次升级时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.upgradeTimeEnd" :picker-options="endDatePicker_2" type="date" value-format="yyyy-MM-dd" placeholder="上次升级时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item style="width: 100%">
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
    return {

    }
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
        url: _axios.ajaxAd.getPageOtaDevice
      })
    },
  },
  computed: {
    // 初次升级时间
    startDatePicker_1() {
      return Api.UNITS.startDatePicker(this, this.formInline.addedTimeEnd)
    },
    endDatePicker_1() {
      return Api.UNITS.endDatePicker(this, this.formInline.addedTimeStart)
    },
    // 上次升级时间
    startDatePicker_2() {
      return Api.UNITS.startDatePicker(this, this.formInline.upgradeTimeEnd)
    },
    endDatePicker_2() {
      return Api.UNITS.endDatePicker(this, this.formInline.upgradeTimeStart)
    },
  },
}

</script>
<style lang="scss"></style>
