<template>
  <div class="home_container">
    <el-row>
      <el-card class="zhuangche" shadow="never">
        <div slot="header" class="clearfix">
          <span>装车设备分布</span>
        </div>
        <div class="container clearfix">
          <div class="left">
            <el-card shadow="hover" style="background: #fafafa">
              <el-form :model="formInline" size="small">
                <el-form-item label="选择机构">
                  <el-select filterable clearable placeholder="请选择" v-model="formInline.organCode">
                    <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="设备类型" style="margin-bottom: 0">
                  <el-select filterable clearable placeholder="请选择" v-model="formInline.deviceType">
                    <el-option v-for="(item, index) in deviceType" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-card>
            <el-card shadow="hover" style="margin-top:20px;background: #fafafa">
              <el-tabs>
                <el-tab-pane label="城市排行">
                  <div id="canvas_2" style="height: 260px"></div>
                </el-tab-pane>
              </el-tabs>
            </el-card>
            <el-card shadow="hover" style="margin-top:20px;background: #fafafa">
              <el-tabs>
                <el-tab-pane label="设备转换统计">
                  <div id="canvas_0" style="height: 220px"></div>
                  <div id="canvas_1" style="height: 220px"></div>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </div>
          <div class="right">
            <div class="card-list">
              <div class="card-item">
                <el-card shadow="hover" :body-style="{background: getColorList('primary')}">
                  <div class="card_title">设备总数</div>
                  <div class="card_value">526343台</div>
                </el-card>
              </div>
              <div class="card-item">
                <el-card shadow="hover" :body-style="{background: getColorList('success')}">
                  <div class="card_title">在线设备数</div>
                  <div class="card_value">526343台</div>
                </el-card>
              </div>
              <div class="card-item">
                <el-card shadow="hover" :body-style="{background: getColorList('warning')}">
                  <div class="card_title">装车设备数</div>
                  <div class="card_value">526343台</div>
                </el-card>
              </div>
              <div class="card-item">
                <el-card shadow="hover" :body-style="{background: getColorList('danger')}">
                  <div class="card_title">绑定设备数</div>
                  <div class="card_value">526343台</div>
                </el-card>
              </div>
              <div class="card-item">
                <el-card shadow="hover" :body-style="{background: getColorList('purple')}">
                  <div class="card_title">充值设备数</div>
                  <div class="card_value">526343台</div>
                </el-card>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row :gutter="20">
      <el-col>
        <el-card class="bottom-card" shadow="never" :style="{height: '400px'}" style="margin-top: 20px">
          <div class="time-filter">
            <el-date-picker class="date_picker" v-model="timePickData" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="getData" value-format="yyyy-MM-dd" size="small" :clearable="false">
            </el-date-picker>
            <el-select class="stype_choice" v-model="stype" placeholder="请选择统计方式" @change="getData" size="small">
              <el-option label="按日统计" :value="0"></el-option>
              <el-option label="按月统计" :value="1"></el-option>
              <el-option label="按年统计" :value="2"></el-option>
            </el-select>
          </div>
          <el-tabs @tab-click="changeTab_2" v-model="tabIndex_2">
            <el-tab-pane label="设备使用趋势">
              <div id="canvas_2_0" style="height: 300px"></div>
            </el-tab-pane>
            <el-tab-pane label="设备转化率">
              <div id="canvas_2_1"></div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      tabIndex_2: '0',
      myChart_0: null,
      myChart_1: null,
      myChart_2: null,
      myChart_3: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近半年',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一年',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      option_0: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}台 ({d}%)"
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        series: [{
          name: '设备转换统计',
          type: 'pie',
          radius: ['50%', '70%'],
          hoverAnimation: false,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              // position: 'inside',
              formatter: '{b}: {c}台',
              rich: {
                a: {
                  color: '#909399',
                  fontSize: '14',
                  lineHeight: '30'
                },
                b: {
                  color: '#333',
                  fontSize: '20',
                  lineHeight: '30'
                }
              }
            }
          },
          itemStyle: {
            normal: {
              color(params) {
                return Api.UNITS.getColorList(['primary', 'danger'])[params.dataIndex]
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: [] // 需设置
        }]
      },
      option_1: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}台 ({d}%)"
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [{
          name: '绑定占比',
          type: 'pie',
          radius: ['50%', '70%'],
          hoverAnimation: false,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              formatter: '{b}: {c}台',
              rich: {
                a: {
                  color: '#909399',
                  fontSize: '14',
                  lineHeight: '30'
                },
                b: {
                  color: '#333',
                  fontSize: '20',
                  lineHeight: '30'
                }
              }
            }
          },
          itemStyle: {
            normal: {
              color(params) {
                return Api.UNITS.getColorList(['success', 'warning', ])[params.dataIndex]
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: [] // 需设置
        }]
      },
      option_2: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          splitLine: { show: false },
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [{
          name: '数量',
          type: 'bar',
          barMaxWidth: '18',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          itemStyle: {
            normal: {
              color(params) {
                return Api.UNITS.getColorList(['primary', 'danger', 'success', 'purple', 'warning', 'editor', 'primary'])[params.dataIndex]
              }
            }
          },
          data: []
        }, ]
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.myChart_0 = this.$echarts.init(document.getElementById('canvas_0'))
      this.myChart_1 = this.$echarts.init(document.getElementById('canvas_1'))
      this.myChart_2 = this.$echarts.init(document.getElementById('canvas_2'))
      this.myChart_0.resize()
      this.myChart_1.resize()
      this.myChart_2.resize()
      this.getTopData()
    })
    this.changeTab_2({ index: 0 })
  },
  methods: {
    changeTab_2(para) {
      setTimeout(() => {
        this.myChart_3 = this.$echarts.init(document.getElementById(`canvas_2_${para.index}`))
        this.myChart_3.resize()
      }, 0)
      this.getBottomData()
    },
    getTopData() {
      setTimeout(() => {
        this.option_0.series[0].data = [
          { value: 50, name: '装车' },
          { value: 50, name: '未装车' }
        ]
        this.option_1.series[0].data = [
          { value: 3353, name: '已绑定' },
          { value: 30, name: '未绑定' }
        ]
        this.option_2.yAxis.data = ['7.北京', '6.上海', '5.内蒙古', '4.呼和浩特', '3.长沙', '2.齐齐哈尔', '1.深圳']
        this.option_2.series[0].data = [200, 220, 230, 250, 255, 290, 320]
        Vue.nextTick(() => {
          this.myChart_0.setOption(this.option_0)
          this.myChart_1.setOption(this.option_1)
          this.myChart_2.setOption(this.option_2)
          $("[_echarts_instance_]").find(":last-child").trigger('click')
        })
      }, 10)
    },
    getBottomData() {
      setTimeout(() => {
        if (this.tabIndex_2 === '0') {
          let xAxisData = []
          let data1 = []
          let data2 = []
          let data3 = []
          for (let i = 1; i <= 30; i++) {
            xAxisData.push(`2019-07-${i}`)
            data1.push(200 + Math.ceil(Math.random() * 200))
            data2.push(200 + Math.ceil(Math.random() * 200))
            data3.push(200 + Math.ceil(Math.random() * 200))
          }
          const _echart = new Api.ECHARTS({ dataViewTitle: '时间' })
          _echart.setOption({
            legend: ['装车设备', '绑定设备', '充值设备'],
            xAxis: { data: xAxisData },
            series: [{
              data: data1,
            }, {
              data: data2,
            }, {
              data: data3,
            }]
          })
          Vue.nextTick(() => {
            this.myChart_3.setOption(_echart.getOption(), true)
            $("[_echarts_instance_]").find(":last-child").trigger('click')
          })
        }
      }, 10)
    }
  }
}

</script>
<style lang="scss">
.home_container {
  .zhuangche {
    .container {
      position: relative;
      height: auto;

      .left {
        float: left;
        width: 350px;
        left: 0;
        top: 0;
      }

      .right {
        padding-left: 370px;

        .card-list {
          font-size: 0;

          .card-item {
            width: 20%;
            padding: 0 5px;
            display: inline-block;
            font-size: 14px;

            .card_title {
              font-size: 14px;
              color: #fff;
            }

            .card_value {
              font-size: 18px;
              color: #fff;
            }
          }
        }
      }
    }
  }

  .bottom-card {
    position: relative;

    .time-filter {

      .date_picker {
        position: absolute;
        right: 20px;
        top: 18px;
        z-index: 10;
        width: 260px;

        .el-range__close-icon {
          display: none;
        }
      }

      .stype_choice {
        position: absolute;
        width: 150px;
        right: 290px;
        top: 18px;
        z-index: 10;
      }
    }
  }
}

</style>
