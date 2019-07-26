<template>
  <div class="active-container">
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
          <el-tab-pane label="活跃统计" v-loading="loadData">
            <div id="myChart" style="height: 500px"></div>
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
            <el-form-item label="活跃天数">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="省/市">
              <el-select filterable clearable placeholder="请选择省份"></el-select> -
              <el-select filterable clearable placeholder="请选择城市"></el-select>
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
const _echart = new Api.ECHARTS()
export default {
  data() {
    return {
      myChart: null,
      // 展示图表的视图
      option: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          data: ['设备数', '绑定用户数', '活跃数'],
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
                    str += `<tr><td style="font-weight:bold">${v.name}</td><td style="font-weight:bold">活跃数量</td></tr>`
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
          name: '活跃统计',
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
            name: '设备数'
          }, {
            value: 652,
            name: '绑定用户数'
          }, {
            value: 485,
            name: '活跃数'
          }],
          itemStyle: {
            normal: {
              color(params) {
                return Api.UNITS.getColorList(['purple', 'danger', 'primary'])[params.dataIndex]
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    }
  },
  mounted() {
    this.showEchart()
  },
  methods: {
    getData() {},
    getEchartData() {
      this.loadData = true
      setTimeout(() => {
        this.loadData = false
        // 获取数据之后渲染
        this.myChart.setOption(this.option)
        $("[_echarts_instance_]").find(":last-child").trigger('click')
      }, 600)
    },
    showEchart() {
      this.$nextTick(() => {
        this.myChart = this.$echarts.init(document.getElementById('myChart'))
        this.getEchartData()
      })
    }
  }
}

</script>
<style lang="scss">
.active-container {
  .exp-search {
    position: absolute;
    right: 0;
    z-index: 1;

  }
}

</style>
