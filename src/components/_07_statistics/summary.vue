<template>
  <div class="summary-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-row class="exp-search">
          <el-form v-show="tabIndex === '0'" :inline="true" :model="formInline_0" class="search-form" size="small" @submit.native.prevent>
            <el-form-item>
              <el-select filterable clearable placeholder="所属机构"></el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="formInline_0.start" type="datetime" placeholder="时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline_0.end" type="datetime" placeholder="时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
          <el-form v-show="tabIndex === '1'" :inline="true" :model="formInline_1" class="search-form" size="small" @submit.native.prevent>
            <el-form-item>
              <el-select filterable clearable placeholder="统计方式">
                <el-option label="按周统计" :value="0"></el-option>
                <el-option label="按月统计" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="formInline_1.year" type="year" placeholder="选择年份">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-tabs @tab-click="changeTab" v-model="tabIndex" style="margin-top: 8px">
          <el-tab-pane label="汇总统计" v-loading="loadData">
            <div id="myChart_0" style="height: 500px"></div>
          </el-tab-pane>
          <el-tab-pane label="增长率统计" v-loading="loadData">
            <div id="myChart_1" style="height: 500px"></div>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
const _echart = new Api.ECHARTS({
  dataViewTitle: '增长率'
})
export default {
  data() {
    return {
      tabIndex: '0',
      formInline_0: {},
      formInline_1: {},
      myChart: null,
      // 展示图表的视图
      option_0: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          data: ['设备总数', '设备激活数', '用户总数', '微信用户数', '手机用户数'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: true,
          right: 20,
          feature: {
            dataView: {
              show: true,
              iconStyle: {
                borderColor: Api.UNITS.getColorList('purple')
              },
              emphasis: {
                iconStyle: {
                  borderColor: '#9a8dda'
                }
              },
              readOnly: true,
              optionToContent(opt) {
                let series = opt.series
                let table = `<table style="width:100%;text-align:center"><tbody>
                ${function a() {
                  let str = ''
                  series.forEach((v) => {
                    str += `<tr><td style="font-weight:bold">${v.name}</td><td style="font-weight:bold">数量</td></tr>`
                    v.data.forEach((v2) => {
                      str += `<tr><td>${v2.name}</td><td>${v2.value}</td></tr>`
                    })
                    str += '<tr style="height: 20px"></tr>'
                  })
                  return str
                }()}
              </tbody></table>`
                return table
              },
              contentToOption() {},
              buttonColor: '#ff7477'
            },
            restore: {
              show: true,
              iconStyle: {
                borderColor: Api.UNITS.getColorList('warning')
              },
              emphasis: {
                iconStyle: {
                  borderColor: '#ffcf85'
                }
              }
            },
            saveAsImage: {
              show: true,
              iconStyle: {
                borderColor: Api.UNITS.getColorList('primary')
              },
              emphasis: {
                iconStyle: {
                  borderColor: '#63c1ff'
                }
              }
            }
          }
        },
        series: [{
          name: '汇总统计',
          type: 'pie',
          radius: '70%',
          label: {
            normal: {
              show: true,
              // position: 'inside',
              formatter: '{b}: {c} ({d}%)'
            }
          },
          data: [{
            value: 561,
            name: '设备总数'
          }, {
            value: 652,
            name: '设备激活数'
          }, {
            value: 485,
            name: '用户总数'
          }, {
            value: 520,
            name: '微信用户数'
          }, {
            value: 874,
            name: '手机用户数'
          }],
          itemStyle: {
            normal: {
              color(params) {
                return Api.UNITS.getColorList(['purple', 'primary', 'danger', 'success', 'warning'])[params.dataIndex]
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      option_1: {}
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
        if (this.tabIndex === '1') {
          let [xAxisData, data1, data2, data3, data4, data5] = [[], [], [], [], [], []]
          for (let i = 0; i < 52; i++) {
            xAxisData.push(`第${i + 1}周`)
            data1.push((Math.random() * 2 - 1).toFixed(2))
            data2.push((Math.random() * 2 - 1).toFixed(2))
            data3.push((Math.random() * 2 - 1).toFixed(2))
            data4.push((Math.random() * 2 - 1).toFixed(2))
            data5.push((Math.random() * 2 - 1).toFixed(2))
          }
          _echart.setOption({
            colorList: Api.UNITS.getColorList(['purple', 'primary', 'danger', 'success', 'warning']),
            legend: ['设备增长率', '激活增长率', '用户增长率', '微信用户增长率', '手机用户增长率'],
            xAxis: { data: xAxisData },
            series: [{ data: data1 },
              { data: data2 },
              { data: data3 },
              { data: data4 },
              { data: data5 }
            ]
          })
          this.option_1 = _echart.getOption()
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
