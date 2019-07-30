<template>
  <div class="home_container">
    <el-row :gutter="20">
      <el-col :span="9">
        <el-card class="topleft_card" shadow="never" :body-style="{background: getColorList('success')}">
          <div class="card_item">
            <div class="card_title">今日新增设备</div>
            <div class="card_value">526</div>
          </div>
          <div class="card_item">
            <div class="card_title">今日新增用户</div>
            <div class="card_value">220</div>
          </div>
        </el-card>
        <el-card class="topleft_card" shadow="never" :body-style="{background: getColorList('primary')}">
          <div class="card_item">
            <div class="card_title">当月新增设备</div>
            <div class="card_value">526</div>
          </div>
          <div class="card_item">
            <div class="card_title">当月新增用户</div>
            <div class="card_value">220</div>
          </div>
        </el-card>
        <el-card class="topleft_card" shadow="never" :body-style="{background: getColorList('warning')}">
          <div class="card_item">
            <div class="card_title">累计设备</div>
            <div class="card_value">526</div>
          </div>
          <div class="card_item">
            <div class="card_title">累计用户</div>
            <div class="card_value">220</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card class="topright-card" shadow="never" :style="{height: '336px'}">
          <div class="time-filter">
            <el-date-picker class="date_picker" v-model="timePickData" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="getData" value-format="yyyy-MM-dd" size="small" :clearable="false">
            </el-date-picker>
            <el-select class="stype_choice" v-model="stype" placeholder="请选择统计方式" @change="getData" size="small">
              <el-option label="按日统计" :value="0"></el-option>
              <el-option label="按月统计" :value="1"></el-option>
              <el-option label="按年统计" :value="2"></el-option>
            </el-select>
          </div>
          <el-tabs @tab-click="changeTab_1" v-model="tabIndex_2">
            <el-tab-pane label="新增设备趋势">
              <div id="canvas_1_0" style="height: 250px"></div>
            </el-tab-pane>
            <el-tab-pane label="新增用户趋势">
              <div id="canvas_1_1"></div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="middle_card" shadow="never" style="margin-top: 20px">
          <div class="header">数据总览</div>
          <el-row class="content" :gutter="8">
            <el-col :span="12">
              <el-card shadow="hover" style="border: none" class="pointer">
                <div class="value">52</div>
                <div class="key">汽车品牌数</div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover" style="border: none" class="pointer">
                <div class="value">32</div>
                <div class="key">IP白名单数</div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
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
          <el-tabs @tab-click="changeTab_2" v-model="tabIndex_1">
            <el-tab-pane label="设备视频抓拍">
              <div id="canvas_2_0" style="height: 300px"></div>
            </el-tab-pane>
            <el-tab-pane label="设备图片抓拍">
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
      tabIndex_1: '0',
      tabIndex_2: '0',
      myChart_1: null,
      myChart_2: null,
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
      }
    }
  },
  mounted() {
    this.changeTab_1({ index: 0 })
    this.changeTab_2({ index: 0 })
  },
  methods: {
    changeTab_1(para) {
      setTimeout(() => {
        this.myChart_1 = this.$echarts.init(document.getElementById(`canvas_1_${para.index}`))
        this.myChart_1.resize()
      }, 0)
      this.getTopData()
    },
    changeTab_2(para) {
      setTimeout(() => {
        this.myChart_2 = this.$echarts.init(document.getElementById(`canvas_2_${para.index}`))
        this.myChart_2.resize()
      }, 0)
      this.getBottomData()
    },
    getTopData() {
      setTimeout(() => {
        if (this.tabIndex_1 === '0') {
          const _echart = new Api.ECHARTS({ dataViewTitle: '时间' })
          _echart.setOption({
            legend: ['新增设备趋势'],
            xAxis: { data: ['2019-07-01', '2019-07-02', '2019-07-03'] },
            series: [{
              data: [5, 6, 5],
            }]
          })
          Vue.nextTick(() => {
            this.myChart_1.setOption(_echart.getOption(), true)
            $("[_echarts_instance_]").find(":last-child").trigger('click')
          })
        }
      }, 10)
    },
    getBottomData() {
      setTimeout(() => {
        if (this.tabIndex_2 === '0') {
          let xAxisData = []
          let data = []
          for(let i = 1; i <= 30; i++) {
            xAxisData.push(`2019-07-${i}`)
            data.push(200 + Math.ceil(Math.random() * 300))
          }
          const _echart = new Api.ECHARTS({ dataViewTitle: '时间' })
          _echart.setOption({
            legend: ['设备视频抓拍'],
            xAxis: { data: xAxisData },
            series: [{
              data: data,
            }]
          })
          Vue.nextTick(() => {
            this.myChart_2.setOption(_echart.getOption(), true)
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
  .topleft_card {
    margin-bottom: 15px;

    &:last-of-type {
      margin-bottom: 0;
    }

    * {
      color: #fff;
    }

    .el-card__body {
      display: flex;
      justify-content: space-around;
      height: 100px;
    }

    .card_item {
      display: inline-block;
      justify-content: space-around;
      flex: 1;
      text-align: center;

      .card_title {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
      }

      .card_value {
        font-weight: bold;
        height: 30px;
        line-height: 30px;
      }
    }
  }

  .topright-card {
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

  .middle_card {
    >.el-card__body {
      padding-bottom: 0;
    }

    .header {
      padding-bottom: 18px;
      border-bottom: 1px solid $borderColor;
    }

    .content {
      height: 140px;

      .el-col {
        height: 100%;
        text-align: center;

        .el-card {
          height: 100%;
        }

        .value {
          font-size: 24px;
          font-weight: bold;
          color: $primary;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
        }

        .key {
          font-size: 14px;
          height: 35px;
          line-height: 35px;
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
