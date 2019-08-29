<template>
  <div class="active-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-row class="exp-search">
          <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
            <el-form-item>
              <el-select v-model="formInline.organCode" filterable clearable placeholder="所属机构" @change="simpleSearchData">
                <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="simpleSearchData">查询</el-button>
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
          <el-form :inline="false" :model="formInline" size="small" label-width="90px" v-loading="loadData">
            <el-form-item label="所属机构">
              <el-select v-model="formInline.organCode" filterable clearable placeholder="请选择">
                <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活跃天数"> 
              <el-input v-model="formInline.dateNum" @input="formInline.dateNum = limitNumber(formInline.dateNum, 4, 0)" placeholder="必须是整数"></el-input>
            </el-form-item>
            <el-form-item label="省/市">
              <el-select v-model="formInline.province" filterable clearable placeholder="请选择省份" @change="provinceSelect">
                <el-option v-for="(item, index) in provinceData" :key="index" :label="item.name" :value="item.tno"></el-option>
              </el-select> -
              <el-select v-model="formInline.city" filterable clearable placeholder="请选择城市" :disabled="!formInline.province">
                <el-option v-for="(item, index) in cityData" :key="index" :label="item.name" :value="item.tno"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker v-model="formInline.beginTime" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.endTime" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="时间（止）"></el-date-picker>
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
      provinceData: [],
      cityData: [],
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
                let table = `<div class="dataViewContainer"><table class="dataViewTable" style="width:100%;text-align:center"><tbody>
                ${function a() {
                  let str = ''
                  series.forEach((v) => {
                    str += `<tr class="thead"><td class="th" style="font-weight:bold">${v.name}</td><td class="th" style="font-weight:bold">活跃数量</td></tr>`
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
          data: [],
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
    this.setRegionData('root', 'provinceData')
    this.showEchart()
  },
  methods: {
    // === 地区选择 start ===
    getNations(parentNo = 'root', cb) {
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getArea,
        params: { parentNo },
        done: ((res) => {
          cb && cb(res)
        })
      })
    },
    provinceSelect(id) { // 省级选择
      this.setRegionData(id, 'cityData')
      this.$delete(this.formInline, 'city')
    },
    setRegionData(id, key) { // 保存数据，处理被删除的区域
      this.getNations(id, (res) => {
        this[key] = res.data || []
      })
    },
    // === 地区选择 end ===
    simpleSearchData() { // 简单查询
      let organCode = this.formInline.organCode
      this.formInline = { organCode }
      this.searchData()
    },
    getData() {
      this.loadData = true
      _axios.send({
        method: 'post',
        url: _axios.ajaxAd.getDeviceActivitisAsyn,
        data: this.formInline,
        done: ((res) => {
          this.loadData = false
          this.searchVipVisible = false
          // 获取数据之后渲染
          this.option.series[0].data = [{
            value: res.data.device_num,
            name: '设备数'
          }, {
            value: res.data.customer_num,
            name: '绑定用户数'
          }, {
            value: res.data.activity_deviceNum,
            name: '活跃数'
          }]
          this.myChart.setOption(this.option)
          $("[_echarts_instance_]").find(":last-child").trigger('click')
        })
      })
    },
    resetData() {
      this.formInline = {}
      this.getData()
    },
    showEchart() {
      this.$nextTick(() => {
        this.myChart = this.$echarts.init(document.getElementById('myChart'))
        this.getData()
      })
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
<style lang="scss">
.active-container {
  .exp-search {
    position: absolute;
    right: 0;
    z-index: 1;

  }
}

</style>
