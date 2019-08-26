<template>
  <div class="bindAct-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="primary" @click="showEchart">图表</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-select filterable clearable placeholder="所属机构"></el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="机构" sortable="custom"></el-table-column>
          <el-table-column prop="" label="激活数量" sortable="custom"></el-table-column>
          <el-table-column prop="" label="绑定数量" sortable="custom"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="650px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="90px">
            <el-form-item label="所属机构">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="筛选方式">
              <el-select v-model="formInline.timeType" placeholder="请选择">
                <el-option label="月份" :value="0"></el-option>
                <el-option label="年份" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="刷选月份" v-show="formInline.timeType === 0">
              <el-date-picker v-model="formInline.month" type="month" placeholder="请选择月份"></el-date-picker>
            </el-form-item>
            <el-form-item label="刷选年份" v-show="formInline.timeType === 1">
              <el-date-picker v-model="formInline.year" type="year" placeholder="请选择年份"></el-date-picker>
            </el-form-item>
            <el-form-item label="省/市">
              <el-select filterable clearable placeholder="请选择省份"></el-select> -
              <el-select filterable clearable placeholder="请选择城市"></el-select>
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
    <el-dialog title="绑定/激活统计(台)" :visible.sync="echartVisible" center width="1200px" :close-on-click-modal="false">
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
      echartVisible: false,
      echartLoadData: false,
      formInline: {
        timeType: 0
      },
      list: {
        data: [{
          a: 1
        }],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
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
              <div>
                <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${series[1].color}"></span>
                <span>${series[1].seriesName}:</span>
                <span>${series[1].data} 台</span>
              </div>
            </div>`
          }
        },
        legend: {
          data: ['激活', '绑定']
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
            name: '激活',
            type: 'bar',
            stack: '总量',
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
                color: Api.UNITS.getColorList('primary'),
              }
            }
          },
          {
            name: '绑定',
            type: 'bar',
            stack: '总量',
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
                color: Api.UNITS.getColorList('warning')
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.list.data = []
    this.getData()
  },
  methods: {
    getData() {},
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
        let data2 = this.option.series[1].data = [] // 分类二数据
        // 设置假数据 - start
        if (this.formInline.timeType === 0) {
          for (let i = 0; i < 31; i++) {
            label.push(`2019-01-${i + 1}`)
            data1.push(420 + i)
            data2.push(220 + 2 * i)
          }
        } else {
          for (let i = 0; i < 12; i++) {
            label.push(`2019-${i}`)
            data1.push(4022 + 50 * i)
            data2.push(2022 + 100 * i)
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
    }
  }
}

</script>
<style lang="scss"></style>
