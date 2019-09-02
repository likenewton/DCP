<template>
  <div class="bindAct-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="primary" @click="showEchart">设备绑定趋势</el-button>
          <el-button size="small" type="primary" @click="">设备绑定分布</el-button>
          <el-button size="small" type="warning" @click="">导出数据</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item label="设备SN">
            <el-input v-model="formInline.deviceSn" @keyup.enter.native="simpleSearchData" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :stripe="isStripe" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="deviceSn" label="设备SN" sortable="custom" width="180"></el-table-column>
          <el-table-column prop="organCode" label="所属机构" sortable="custom" min-width="200">
            <template slot-scope="scope">{{scope.row.organCode | valueToLabel(orgs)}}</template>
          </el-table-column>
          <el-table-column prop="deviceIccid" label="设备IMEI卡ICCID" sortable="custom" width="182"></el-table-column>
          <el-table-column prop="autocarName" label="车主姓名" sortable="custom" width="120"></el-table-column>
          <el-table-column prop="autocarTel" label="手机号" sortable="custom" width="120"></el-table-column>
          <el-table-column prop="wxDomain" label="公众号" sortable="custom" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="timeAdded" label="绑定时间" sortable="custom" width="160">
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
          <el-form :inline="false" :model="formInline" size="small" label-width="90px">
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
            <el-form-item label="筛选方式">
              <el-select v-model="formInline.timeType" placeholder="请选择">
                <el-option label="月份" :value="0"></el-option>
                <el-option label="年份" :value="1"></el-option>
              </el-select>
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
    <!-- 图表 -->
    <el-dialog title="设备绑定统计(台)" :visible.sync="echartVisible" center width="1200px" :close-on-click-modal="false">
      <div slot>
        <div id="myChart" style="height: 400px" v-loading="echartLoadData"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
const _echart = new Api.ECHARTS({
  dataViewTitle: '时间'
})
export default {
  data() {
    return {
      other: {},
      echartVisible: false,
      echartLoadData: false,
      formInline: {
        timeType: 0
      },
      myChart: null,
      // 展示图表的视图
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter(series) {
            return `<div>
            <div>${series[0].axisValueLabel}</div>
              <div>
                <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${series[0].color}"></span>
                <span>${series[0].seriesName}:</span>
                <span>${series[0].data} 台</span>
              </div>
            </div>`
          }
        },
        legend: {
          data: ['绑定']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: _echart.getOption().toolbox,
        yAxis: {
          type: 'value',
          splitLine: { show: false }
        },
        xAxis: {
          type: 'category',
          data: [], //要设置的
          axisLabel: {
            textStyle: {
              fontSize: 12
            },
            interval: 0,
            rotate: 0
          },
        },
        series: [{
          name: '绑定设备',
          type: 'bar',
          barMaxWidth: 100,
          label: {
            normal: {
              show: true,
              position: 'inside',
            }
          },
          data: [], //要设置的
          itemStyle: {
            normal: {
              color: Api.UNITS.getColorList('primary')
            }
          }
        }]
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    simpleSearchData() {
      let deviceSn = this.formInline.deviceSn
      this.formInline = { deviceSn }
      this.searchData()
    },
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getBindActivityReport,
        cb: ((res) => {
          this.other = res.data.other || {}
        })
      })
    },
    getEchartData() {
      this.echartLoadData = true
      setTimeout(() => {
        this.echartLoadData = false
        // 如果是月份横轴要旋转一定的角度
        if (this.formInline.timeType === 0) {
          this.option.xAxis.axisLabel.rotate = 40
        } else {
          this.option.xAxis.axisLabel.rotate = 0
        }
        // 获取数据之后渲染
        let label = this.option.xAxis.data = [] // 底坐标标签
        let data1 = this.option.series[0].data = [] // 分类一数据
        // 设置假数据 - start
        if (this.formInline.timeType === 0) {
          for (let i = 0; i < 31; i++) {
            label.push(`2019-01-${i + 1}`)
            data1.push(420 + i)
          }
        } else {
          for (let i = 0; i < 12; i++) {
            label.push(`2019-${i + 1}`)
            data1.push(4022 + 50 * i)
          }
        }
        // end
        this.myChart.setOption(this.option)
        $("[_echarts_instance_]").find(":last-child").trigger('click')
      }, 600)
    },
    showEchart() {
      this.echartVisible = true
      this.$nextTick(() => {
        this.myChart = this.$echarts.init(document.getElementById('myChart'))
        this.getEchartData()
      })
    },
    resetData() {
      this.list.currentPage = 1
      this.formInline = { timeType: 0 }
      this.sort = {}
      this.$refs.listTable.clearSort()
      this.getData()
    }
  },
  computed: {
    startDatePicker() {
      return Api.UNITS.startDatePicker(this, this.formInline.endTime)
    },
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this.formInline.beginTime)
    }
  }
}

</script>
<style lang="scss"></style>
