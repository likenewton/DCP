<template>
  <div class="iccid-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="primary" @click="showEchart">ICCID统计</el-button>
        </el-button-group>
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
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="iccidCode" label="运营商" sortable="custom" width="150">
            <template slot-scope="scope">{{scope.row.iccidCode | valueToLabel(iccidCode)}}</template>
          </el-table-column>
          <el-table-column prop="totalNum" label="数量" sortable="custom" align="right" width="100"></el-table-column>
          <el-table-column prop="organCode" label="机构" sortable="custom">
            <template slot-scope="scope">{{scope.row.organCode | valueToLabel(orgs)}}</template>
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
          <el-form :inline="false" :model="formInline" size="small" label-width="90px" v-loading="loadData">
            <el-form-item label="所属机构">
              <el-select v-model="formInline.organCode" filterable clearable placeholder="请选择">
                <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
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
    <!-- 图表 -->
    <el-dialog title="ICCID卡统计" :visible.sync="echartVisible" center width="800px" :close-on-click-modal="false">
      <div slot>
        <div id="myChart" style="height: 400px" v-loading="echartLoadData"></div>
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
      other: {},
      provinceData: [],
      cityData: [],
      echartVisible: false,
      echartLoadData: false,
      myChart: null,
      // 展示图表的视图
      option: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          data: ['中国移动', '中国电信', '中国联通', '其他']
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
                    str += `<tr class="thead"><td class="th" style="font-weight:bold">${v.name}</td><td class="th" style="font-weight:bold">ICCID数量</td></tr>`
                    v.data.forEach((v2) => {
                      if (v2.value) str += `<tr class="tbody"><td class="td">${v2.name}</td><td class="td">${v2.value}</td></tr>`
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
          name: 'ICCID卡统计',
          type: 'pie',
          radius: '65%',
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
                return Api.UNITS.getColorList(['danger', 'primary', 'purple', 'warning'])[params.dataIndex]
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
    this.list.data = []
    this.setRegionData('root', 'provinceData')
    this.getData()
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
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getIccidReport,
        cb: ((res) => {
          this.other = res.data.other || {}
        })
      })
    },
    getEchartData() {
      // 获取数据之后渲染
      this.option.series[0].data = [{
        value: this.other.iccid_mobile_num,
        name: '中国移动'
      }, {
        value: this.other.iccid_telecom_num,
        name: '中国电信'
      }, {
        value: this.other.iccid_unicom_num,
        name: '中国联通'
      }, {
        value: this.other.iccid_other_num,
        name: '其他'
      }] // 分类一数据
      this.myChart.setOption(this.option)
      $("[_echarts_instance_]").find(":last-child").trigger('click')
    },
    showEchart() {
      this.echartVisible = true
      this.$nextTick(() => {
        this.myChart = this.$echarts.init(document.getElementById('myChart'))
        this.getEchartData()
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
<style lang="scss"></style>
