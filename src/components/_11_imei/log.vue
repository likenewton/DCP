<template>
  <div class="log-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.iccid" @keyup.enter.native="simpleSearchData" placeholder="ICCID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="eventId" label="事件ID" sortable="custom" min-width="200"></el-table-column>
          <el-table-column prop="eventType" label="事件类型" sortable="custom" min-width="160"></el-table-column>
          <el-table-column prop="iccid" label="ICCID" sortable="custom" width="190"></el-table-column>
          <el-table-column prop="previousImei" label="变更前IMEI" sortable="custom" width="160"></el-table-column>
          <el-table-column prop="currentImei" label="变更后IMEI" sortable="custom" width="160"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable="custom" width="160">
            <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="text" @click="showLogInfo(scope)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="650px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="110px" v-loading="loadData">
            <el-form-item label="ICCID">
              <el-input v-model="formInline.iccid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="变更前IMEI">
              <el-input v-model="formInline.previousImei" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="变更后IMEI">
              <el-input v-model="formInline.currentImei" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="formInline.createStartTime" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="生成时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.createEndTime" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="生成时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 查看批次详细信息 -->
    <el-drawer title="查看日志信息" :visible.sync="logInfoVisible" direction="rtl" size="600px" :wrapperClosable="true">
      <div class="para-wrapper" v-shadow:[logInfoVisible]>
        <el-form class="check-form" :inline="false" :model="logInfo" size="small" label-width="140px" style="padding-right: 20px">
          <el-form-item label="事件ID：">
            <span>{{logInfo.eventId}}</span>
          </el-form-item>
          <el-form-item label="事件类型：">
            <span>{{logInfo.eventType}}</span>
          </el-form-item>
          <el-form-item label="timestamp：">
            <span>{{logInfo.timestamp | formatDate}}</span>
          </el-form-item>
          <el-form-item label="signature：">
            <span>{{logInfo.signature}}</span>
          </el-form-item>
          <el-form-item label="signature2：">
            <span>{{logInfo.signature2}}</span>
          </el-form-item>
          <el-form-item label="data：">
            <el-input v-model="logInfo.data" type="textarea" rows="6" disabled></el-input>
          </el-form-item>
          <el-form-item label="iccid：">
            <span>{{logInfo.iccid}}</span>
          </el-form-item>
          <el-form-item label="变更前IMEI：">
            <span>{{logInfo.previousImei}}</span>
          </el-form-item>
          <el-form-item label="变更后IMEI：">
            <span>{{logInfo.currentImei}}</span>
          </el-form-item>
          <el-form-item label="更改时间：">
            <span>{{logInfo.dateChanged}}</span>
          </el-form-item>
          <el-form-item label="创建时间：">
            <span>{{logInfo.createTime | formatDate}}</span>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="logInfo.remark" type="textarea" rows="4" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      logInfoVisible: false,
      logInfo: {}
    }
  },
  mounted() {
    this.list.data = []
    this.getData()
  },
  methods: {
    simpleSearchData() { // 简单查询
      let iccid = this.formInline.iccid
      this.formInline = {
        iccid
      }
      this.searchData()
    },
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getPageJspaerLog
      })
    },
    showLogInfo(scope) {
      this.logInfoVisible = true
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getViewJspaerLog,
        params: { id: scope.row.id },
        done: ((res) => {
          this.logInfo = res.data || {}
        })
      })
    }
  },
  computed: {
    startDatePicker() {
      return Api.UNITS.startDatePicker(this, this.formInline.createEndTime)
    },
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this.formInline.createStartTime)
    }
  }
}

</script>
<style lang="scss"></style>
