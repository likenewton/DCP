<template>
  <div class="summary-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-row class="exp-search">
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
        <el-tabs @tab-click="changeTab" v-model="tabIndex" style="margin-top: 8px">
          <el-tab-pane label="车机上传统计" v-loading="loadData">
            <div id="myChart_0" style="height: 500px"></div>
          </el-tab-pane>
          <el-tab-pane label="上传数据增长率" v-loading="loadData">
            <div id="myChart_1" style="height: 500px"></div>
          </el-tab-pane>
          <el-tab-pane label="上传轨迹增长率" v-loading="loadData">
            <div id="myChart_2" style="height: 500px"></div>
          </el-tab-pane>
          <el-tab-pane label="上传定位增长率" v-loading="loadData">
            <div id="myChart_3" style="height: 500px"></div>
          </el-tab-pane>
          <el-tab-pane label="上传图片增长率" v-loading="loadData">
            <div id="myChart_4" style="height: 500px"></div>
          </el-tab-pane>
          <el-tab-pane label="上传视频增长率" v-loading="loadData">
            <div id="myChart_5" style="height: 500px"></div>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="630px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="90px">
            <el-form-item label="所属机构">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="统计方式">
              <el-select filterable clearable placeholder="请选择">
                <el-option label="按周统计" :value="0"></el-option>
                <el-option label="按月统计" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="时间（止）"></el-date-picker>
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
      tabIndex: '0',
      formInline: {},
      myChart: null,
      // 展示图表的视图
      option_0: {},
      option_1: {},
      option_2: {},
      option_3: {},
      option_4: {},
      option_5: {},
    }
  },
  mounted() {
    this.showEchart()
  },
  methods: {
    changeTab() {
      this.showEchart()
    },
    getEchartData() {
      this.loadData = true
      setTimeout(() => {
        this.loadData = false
        // 获取数据之后渲染
        if (this.tabIndex === '0') {
          const _echart = new Api.ECHARTS({ dataViewTitle: '时间' })
          let [xAxisData, data1, data2, data3, data4, data5] = [
            [],
            [],
            [],
            [],
            [],
            []
          ]
          for (let i = 0; i < 52; i++) {
            xAxisData.push(`第${i + 1}周`)
            data1.push((Math.random() * 100).toFixed(0))
            data2.push((Math.random() * 100).toFixed(0))
            data3.push((Math.random() * 100).toFixed(0))
            data4.push((Math.random() * 100).toFixed(0))
            data5.push((Math.random() * 100).toFixed(0))
          }
          _echart.setOption({
            colorList: Api.UNITS.getColorList(['purple', 'primary', 'danger', 'success', 'warning']),
            legend: ['上传数据', '上传轨迹', '上传定位', '上传图片', '上传视频'],
            xAxis: { data: xAxisData },
            series: [{
              data: data1,
              type: 'bar'
            }, {
              data: data2,
              type: 'bar'
            }, {
              data: data3,
              type: 'bar'
            }, {
              data: data4,
              type: 'bar'
            }, {
              data: data5,
              type: 'bar'
            }]
          })
          this[`option_${this.tabIndex}`] = _echart.getOption()
        }
        if (this.tabIndex === '1') {
          const _echart = new Api.ECHARTS({ dataViewTitle: '时间' })
          let [xAxisData, data1, data2] = [
            [],
            [],
            []
          ]
          for (let i = 0; i < 52; i++) {
            xAxisData.push(`第${i + 1}周`)
            data1.push((Math.random() * 1000).toFixed(0))
            data2.push((Math.random() * 100).toFixed(2))
          }
          _echart.setOption({
            colorList: Api.UNITS.getColorList(['editor', 'danger']),
            legend: ['上传数据', '增长率'],
            xAxis: { data: xAxisData },
            series: [{
              data: data1,
              type: 'bar',
            }, {
              data: data2,
              yAxisIndex: 1
            }]
          })
          this[`option_${this.tabIndex}`] = _echart.getOption()
        }
        if (this.tabIndex === '2') {
          const _echart = new Api.ECHARTS({ dataViewTitle: '时间' })
          let [xAxisData, data1, data2] = [
            [],
            [],
            []
          ]
          for (let i = 0; i < 52; i++) {
            xAxisData.push(`第${i + 1}周`)
            data1.push((Math.random() * 1000).toFixed(0))
            data2.push((Math.random() * 100).toFixed(2))
          }
          _echart.setOption({
            colorList: Api.UNITS.getColorList(['editor', 'danger']),
            legend: ['上传轨迹', '增长率'],
            xAxis: { data: xAxisData },
            series: [{
              data: data1,
              type: 'bar',
            }, {
              data: data2,
              yAxisIndex: 1
            }]
          })
          this[`option_${this.tabIndex}`] = _echart.getOption()
        }
        if (this.tabIndex === '3') {
          const _echart = new Api.ECHARTS({ dataViewTitle: '时间' })
          let [xAxisData, data1, data2] = [
            [],
            [],
            []
          ]
          for (let i = 0; i < 52; i++) {
            xAxisData.push(`第${i + 1}周`)
            data1.push((Math.random() * 1000).toFixed(0))
            data2.push((Math.random() * 100).toFixed(2))
          }
          _echart.setOption({
            colorList: Api.UNITS.getColorList(['editor', 'danger']),
            legend: ['上传定位', '增长率'],
            xAxis: { data: xAxisData },
            series: [{
              data: data1,
              type: 'bar',
            }, {
              data: data2,
              yAxisIndex: 1
            }]
          })
          this[`option_${this.tabIndex}`] = _echart.getOption()
        }
        if (this.tabIndex === '4') {
          const _echart = new Api.ECHARTS({ dataViewTitle: '时间' })
          let [xAxisData, data1, data2] = [
            [],
            [],
            []
          ]
          for (let i = 0; i < 52; i++) {
            xAxisData.push(`第${i + 1}周`)
            data1.push((Math.random() * 1000).toFixed(0))
            data2.push((Math.random() * 100).toFixed(2))
          }
          _echart.setOption({
            colorList: Api.UNITS.getColorList(['editor', 'danger']),
            legend: ['上传照片', '增长率'],
            xAxis: { data: xAxisData },
            series: [{
              data: data1,
              type: 'bar',
            }, {
              data: data2,
              yAxisIndex: 1
            }]
          })
          this[`option_${this.tabIndex}`] = _echart.getOption()
        }
        if (this.tabIndex === '5') {
          const _echart = new Api.ECHARTS({ dataViewTitle: '时间' })
          let [xAxisData, data1, data2] = [
            [],
            [],
            []
          ]
          for (let i = 0; i < 52; i++) {
            xAxisData.push(`第${i + 1}周`)
            data1.push((Math.random() * 1000).toFixed(0))
            data2.push((Math.random() * 100).toFixed(2))
          }
          _echart.setOption({
            colorList: Api.UNITS.getColorList(['editor', 'danger']),
            showNum: 20,
            legend: ['上传视频', '增长率'],
            xAxis: { data: xAxisData },
            series: [{
              data: data1,
              type: 'bar',
            }, {
              data: data2,
              yAxisIndex: 1
            }]
          })
          this[`option_${this.tabIndex}`] = _echart.getOption()
        }
        this.myChart.setOption(this[`option_${this.tabIndex}`])
        // 如果图表数据有刷新要从数据视图返回到图表
        $("[_echarts_instance_]").find(":last-child").trigger('click')
      }, 600)
    },
    showEchart() {
      this.$nextTick(() => {
        this.myChart = this.$echarts.init(document.getElementById(`myChart_${this.tabIndex}`))
        this.getEchartData()
      })
    },
    resetData() {
      this[`formInline_${this.tabIndex}`] = {}
      this.getEchartData()
    }
  }
}

</script>
<style lang="scss">
.summary-container {
  .exp-search {
    position: absolute;
    right: 0;
    z-index: 1;

  }
}

</style>
