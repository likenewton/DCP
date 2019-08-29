<template>
  <div class="summary-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-row class="exp-search">
          <el-form v-show="tabIndex === '0'" :inline="true" :model="formInline_0" class="search-form" size="small" @submit.native.prevent>
            <el-form-item>
              <el-select v-model="formInline_0.organCode" filterable clearable placeholder="所属机构" @change="getEchartData">
                <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="formInline_0.beginTime" @change="getEchartData" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline_0.endTime" @change="getEchartData" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getEchartData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
          <el-form v-show="tabIndex === '1'" :inline="true" :model="formInline_1" class="search-form" size="small" @submit.native.prevent>
            <el-form-item>
              <el-select v-model="formInline_1.dateType" filterable placeholder="统计方式" @change="getEchartData">
                <el-option label="按周统计" :value="0"></el-option>
                <el-option label="按月统计" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="formInline_1.year" type="year" value-format="yyyy" :editable="false" :clearable="false" @change="getEchartData" placeholder="选择年份"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getEchartData">查询</el-button>
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
  dataViewTitle: '时间'
})
export default {
  data() {
    return {
      tabIndex: '0',
      formInline_0: {},
      formInline_1: {
        dateType: 0,
        year: Api.UNITS.formatDate(new Date(), 'yyyy')
      },
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
                let table = `<div class="dataViewContainer"><table class="dataViewTable" style="width:100%;text-align:center"><tbody>
                ${function a() {
                  let str = ''
                  series.forEach((v) => {
                    str += `<tr class="thead"><td class="th" style="font-weight:bold">${v.name}</td><td class="th" style="font-weight:bold">数量</td></tr>`
                    v.data.forEach((v2) => {
                      str += `<tr class="tbody"><td class="td">${v2.name}</td><td class="td">${v2.value}</td></tr>`
                    })
                    str += '<tr style="height: 20px"></tr>'
                  })
                  return str
                }()}
              </tbody></table></div>`
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
          data: [],
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
      option_1: {
        tooltip: {
          trigger: 'axis',
          formatter(series) {
            return `<div>
            <div>${series[0].axisValueLabel}</div>
              ${function a() {
                let str = ''
                series.forEach((v) => {
                  str += `<div>
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${v.color}"></span>
                    <span>${v.seriesName}:</span>
                    <span>${v.data}%</span>
                  </div>`
                })
                return str
              }()}
            </div>`
          }
        },
        legend: {
          data: ['设备增长率', '激活增长率', '用户增长率', '微信用户增长率', '手机用户增长率']
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
          splitLine: { show: false },
          axisLabel: {
            formatter: '{value}%'
          },
          axisLine: {
            onZero: false
          }
        },
        xAxis: {
          type: 'category',
          data: [], //要设置的
          axisLine: {
            onZero: false
          },
          axisLabel: {
            textStyle: {
              fontSize: 12
            },
            interval: 0,
            rotate: 0
          },
        },
        series: [{
            name: '设备增长率',
            type: 'line',
            data: [],
            itemStyle: {
              normal: {
                color: Api.UNITS.getColorList('purple'),
              }
            }
          },
          {
            name: '激活增长率',
            type: 'line',
            data: [],
            itemStyle: {
              normal: {
                color: Api.UNITS.getColorList('primary')
              }
            }
          },
          {
            name: '用户增长率',
            type: 'line',
            data: [],
            itemStyle: {
              normal: {
                color: Api.UNITS.getColorList('danger')
              }
            }
          },
          {
            name: '微信用户增长率',
            type: 'line',
            data: [],
            itemStyle: {
              normal: {
                color: Api.UNITS.getColorList('success')
              }
            }
          },
          {
            name: '手机用户增长率',
            type: 'line',
            data: [],
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
    this.showEchart()
  },
  methods: {
    changeTab() {
      this.showEchart()
    },
    getEchartData() {
      this.loadData = true
      if (this.tabIndex === '0') {
        _axios.send({
          method: 'post',
          url: _axios.ajaxAd.getSummaryAsyn,
          data: this.formInline_0,
          done: ((res) => {
            this.loadData = false
            this.option_0.series[0].data = [{
              value: res.data.DEVICE_NUM,
              name: '设备总数'
            }, {
              value: res.data.DEVICE_ACTIVITY_NUM,
              name: '设备激活数'
            }, {
              value: res.data.MEMBER_NUM,
              name: '用户总数'
            }, {
              value: res.data.WX_NUM,
              name: '微信用户数'
            }, {
              value: res.data.PHONE_NUM,
              name: '手机用户数'
            }]
            this.myChart.setOption(this.option_0)
            $("[_echarts_instance_]").find(":last-child").trigger('click')
          })
        })
      } else if (this.tabIndex === '1') {
        _axios.send({
          method: 'post',
          url: _axios.ajaxAd.getIncreaseReportAsyn,
          data: this.formInline_1,
          done: ((res) => {
            this.loadData = false
            // 获取数据之后渲染
            if (res.data.dateType === 0) {
              this.option_1.xAxis.axisLabel.rotate = 40
            } else {
              this.option_1.xAxis.axisLabel.rotate = 0
            }
            this.option_1.xAxis.data = res.data.xAxis ? res.data.xAxis.split(',') : []
            this.option_1.series[0].data = res.data.xDevice ? res.data.xDevice.split(',') : []
            this.option_1.series[1].data = res.data.xDeviceActivity ? res.data.xDeviceActivity.split(',') : []
            this.option_1.series[2].data = res.data.xCustomer ? res.data.xCustomer.split(',') : []
            this.option_1.series[3].data = res.data.xWeixin ? res.data.xWeixin.split(',') : []
            this.option_1.series[4].data = res.data.xMobile ? res.data.xMobile.split(',') : []
            this.myChart.setOption(this[`option_${this.tabIndex}`])
            // 如果图表数据有刷新要从数据视图返回到图表
            $("[_echarts_instance_]").find(":last-child").trigger('click')
          })
        })
      }
    },
    showEchart() {
      this.$nextTick(() => {
        this.myChart = this.$echarts.init(document.getElementById(`myChart_${this.tabIndex}`))
        this.getEchartData()
      })
    },
    resetData() {
      this[`formInline_${this.tabIndex}`] = {
        dateType: 0,
        year: Api.UNITS.formatDate(new Date(), 'yyyy')
      }
      this.getEchartData()
    }
  },
  computed: {
    startDatePicker() {
      return Api.UNITS.startDatePicker(this, this.formInline_0.endTime)
    },
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this.formInline_0.beginTime)
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
