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
          <el-table-column prop="ip" label="IP地址" sortable="custom"></el-table-column>
          <el-table-column prop="status" label="状态" sortable="custom">
            <template slot-scope="scope">
              <span class="bold text_success" v-if="scope.row.status === 1">启用</span>
              <span class="bold text_danger" v-else-if="scope.row.status === 0">停用</span>
            </template>
          </el-table-column>
          <el-table-column prop="dateAdded" label="创建时间" sortable="custom">
            <template slot-scope="scope">{{scope.row.dateAdded | formatDate}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="checkDevInfos(scope)">设备信息</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 查看设备信息 -->
    <el-dialog title="查看设备信息" :visible.sync="devInfo.visibel" width="1400px" :close-on-click-modal="true">
      <div slot>
        <el-table :data="devInfo.data" :max-height="winHeight/1.8" border resizable size="mini" v-loading="devInfo.loadData">
          <el-table-column prop="organCode" label="机构" min-width="140">
            <template slot-scope="scope">{{scope.row.organCode | valueToLabel(orgs)}}</template>
          </el-table-column>
          <el-table-column prop="deviceSn" label="设备SN号" width="150"></el-table-column>
          <el-table-column prop="deviceMac" label="MAC地址" width="138"></el-table-column>
          <el-table-column prop="deviceIccId" label="设备ICCID" width="182"></el-table-column>
          <el-table-column prop="deviceVersion" label="设备版本" width="100"></el-table-column>
          <el-table-column prop="softVersion" label="软件版本" width="130"></el-table-column>
          <el-table-column prop="autocarName" label="车主姓名" width="72"></el-table-column>
          <el-table-column prop="autocarTel" label="车主电话" width="108"></el-table-column>
          <el-table-column prop="autocarTag" label="汽车牌照" width="86"></el-table-column>
          <el-table-column prop="autocarModel" label="汽车型号" width="70"></el-table-column>
          <el-table-column prop="timeAdded" label="激活时间" width="153">
            <template slot-scope="scope">{{scope.row.timeAdded | formatDate}}</template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      devInfo: {
        data: [],
        loadData: false,
        visibel: false,
      }
    }
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
    },
    checkDevInfos(scope) {
      this.devInfo.loadData = true
      this.devInfo.visibel = true
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getBindDevice,
        params: { customerId: scope.row.customerId },
        done: ((res) => {
          this.devInfo.loadData = false
          this.devInfo.data = res.data || []
        })
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
