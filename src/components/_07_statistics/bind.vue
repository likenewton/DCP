<template>
  <div class="bindAct-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="primary" @click="showEchart_0" :disabled="!pageAuthBtn.DCP_bind_ECHART1">设备绑定趋势</el-button>
          <el-button size="small" type="primary" @click="showEchart_1" :disabled="!pageAuthBtn.DCP_bind_ECHART2">设备绑定分布</el-button>
          <el-button size="small" type="warning" @click="" :disabled="!pageAuthBtn.DCP_bind_EXPORT">导出数据</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item label="设备SN">
            <el-input v-model="formInline.deviceSn" @keyup.enter.native="simpleSearchData" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData" :disabled="!pageAuthBtn.DCP_bind_LIST">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true" :disabled="!pageAuthBtn.DCP_bind_LIST">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="pageAuthBtn.DCP_bind_LIST && list.data" @sort-change="handleSortChange" :stripe="isStripe" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="deviceSn" label="设备SN" :sortable="sortable" width="180"></el-table-column>
          <el-table-column prop="organCode" label="所属机构" :sortable="sortable" min-width="200">
            <template slot-scope="scope">{{scope.row.organCode | valueToLabel(orgs)}}</template>
          </el-table-column>
          <el-table-column prop="deviceIccid" label="设备IMEI卡ICCID" :sortable="sortable" width="182"></el-table-column>
          <el-table-column prop="autocarName" label="车主姓名" :sortable="sortable" width="120"></el-table-column>
          <el-table-column prop="autocarTel" label="手机号" :sortable="sortable" width="120"></el-table-column>
          <el-table-column prop="wxDomain" label="公众号" :sortable="sortable" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="timeAdded" label="绑定时间" :sortable="sortable" width="160">
            <template slot-scope="scope">{{scope.row.timeAdded | formatDate}}</template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table"></el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="700px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="90px" v-loading="loadData">
            <el-form-item label="设备SN">
              <el-input v-model="formInline.deviceSn" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="所属机构">
              <el-select v-model="formInline.organCode" filterable clearable placeholder="请选择">
                <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="formInline.autocarTel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="公众号">
              <el-input v-model="formInline.wxDomain" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="车主姓名">
              <el-input v-model="formInline.autocarName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="卡ICCID">
              <el-input v-model="formInline.deviceIccid" @input="formInline.deviceIccid = limitNumberAndLetter(formInline.deviceIccid)" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="绑定时间">
              <el-date-picker v-model="formInline.beginTime" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="绑定时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.endTime" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="绑定时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item style="width: 100%">
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 设备绑定趋势 -->
    <el-dialog title="设备绑定趋势(台)" :visible.sync="echartVisible_0" center width="1200px" :close-on-click-modal="false">
      <div slot>
        <div id="myChart_0" style="height: 400px" v-loading="echartLoadData"></div>
      </div>
    </el-dialog>
    <!-- 图表 -->
    <el-dialog title="设备绑定分布(台)" :visible.sync="echartVisible_1" center width="1200px" :close-on-click-modal="false">
      <div slot>
        <div id="myChart_1" style="height: 400px" v-loading="echartLoadData"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'

export default {
  data() {
    return {
      echartVisible_0: false,
      echartVisible_1: false,
      echartLoadData: false,
      myChart: null,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    simpleSearchData() {
      let deviceSn = this.formInline.deviceSn
      this.formInline = {
        deviceSn
      }
      this.searchData()
    },
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getBindActivityReport
      })
    },
    getEchartData_0() {
      this.echartLoadData = true
      _axios.send({
        method: 'post',
        url: _axios.ajaxAd.getBindStatistical,
        data: this.formInline,
        done: ((res) => {
          this.echartLoadData = false
          // 获取数据之后渲染
          const _echart = new Api.ECHARTS({ dataViewTitle: '时间' })
          let data = res.data || []

          _echart.setOption({
            legend: ['绑定设备'],
            xAxis: { data: data.length > 0 ? data.map((v) => v.dayTime) : [] },
            series: [{
              data: data.length > 0 ? data.map((v) => v.number) : []
            }]
          })

          this.myChart.setOption(_echart.getOption(), true)
          $("[_echarts_instance_]").find(":last-child").trigger('click')
        })
      })
    },
    showEchart_0() {
      this.echartVisible_0 = true
      this.$nextTick(() => {
        this.myChart = this.$echarts.init(document.getElementById('myChart_0'))
        this.getEchartData_0()
      })
    },
    getEchartData_1() {
      this.echartLoadData = true
      _axios.send({
        method: 'post',
        url: _axios.ajaxAd.getBindStatisticalByOrgancode,
        data: this.formInline,
        done: ((res) => {
          this.echartLoadData = false
          // 获取数据之后渲染
          const _echart = new Api.ECHARTS({ dataViewTitle: '机构' })
          let data = res.data || []
          _echart.setOption({
            legend: ['绑定设备'],
            xAxis: { data: data.length > 0 ? data.map((v) => v.organCode) : [] },
            series: [{
              data: data.length > 0 ? data.map((v) => v.number) : [],
              type: 'bar'
            }]
          })

          let option = _echart.getOption()
          option.xAxis.axisLabel.rotate = 40

          this.myChart.setOption(option, true)
          $("[_echarts_instance_]").find(":last-child").trigger('click')
        })
      })
    },
    showEchart_1() {
      this.echartVisible_1 = true
      this.$nextTick(() => {
        this.myChart = this.$echarts.init(document.getElementById('myChart_1'))
        this.getEchartData_1()
      })
    }
  },
  computed: {
    startDatePicker() {
      return Object.assign({
        shortcuts: Api.STATIC.shortcuts
      }, Api.UNITS.startDatePicker(this, this.formInline.endTime))
    },
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this.formInline.beginTime)
    }
  }
}

</script>
<style lang="scss"></style>
