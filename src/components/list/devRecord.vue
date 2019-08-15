<template>
  <div class="devrecord-container">
    <el-card class="clearfix" shadow="never">
      <v-record-info :infos="deviceInfo"></v-record-info>
      <el-form v-show="tabIndex === '0'" :inline="true" :model="formInline_0" class="pos-form" size="small" @submit.native.prevent>
        <el-form-item>
          <el-date-picker v-model="formInline_0.timeAddedStart" @change="searchData" :picker-options="startDatePicker_0" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（起）"></el-date-picker> -
          <el-date-picker v-model="formInline_0.timeAddedEnd" @change="searchData" :picker-options="endDatePicker_0" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（止）"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-tabs @tab-click="changeTab" v-model="tabIndex">
        <el-tab-pane v-loading="loadData">
          <span slot="label">历史照片</span>
          <el-row class="resource_container shadow-wrappr" :gutter="20" v-shadow>
            <el-col v-if="list_0.data.length > 0" :span="4" v-for="(item, index) in list_0.data" :key="index" style="margin-bottom: 12px">
              <el-card class="resource_wrapper" :body-style="{ padding: '6px' }" shadow="hover">
                <div class="block">
                  <el-image class="pointer" :src="item.photoUrl" fit="cover" @click.native="$refs.picview.showPicView(item.photoUrl)"></el-image>
                </div>
                <div style="padding: 5px">
                  <span class="text">{{item.timeAdded | formatDate('yyyy-mm-dd')}}</span>
                </div>
              </el-card>
            </el-col>
            <el-col class="data_null" v-if="list_0.data.length === 0">
              <span>暂无数据</span>
            </el-col>
          </el-row>
          <el-row>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list_0.currentPage" :page-sizes="pageSizes" :page-size="list_0.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list_0.total" class="clearfix pagination-table">
            </el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">历史视频</span>
          <el-row class="resource_container shadow-wrappr" :gutter="20" v-shadow>
            <el-col v-if="list_1.data.length > 0" :span="4" v-for="(item, index) in list_1.data" :key="index" style="margin-bottom: 12px">
              <el-card class="resource_wrapper" :body-style="{ padding: '6px' }" shadow="hover">
                <div class="block">
                  <el-image class="pointer" :src="item.posterUrl" fit="cover" @click.native="$refs.videoview.show(item.videoUrl, item.posterUrl)"></el-image>
                </div>
                <div style="padding: 5px">
                  <span class="text">{{item.timeAdded | formatDate('yyyy-mm-dd')}}</span>
                </div>
              </el-card>
            </el-col>
            <el-col class="data_null" v-if="list_1.data.length === 0">
              <span>暂无数据</span>
            </el-col>
          </el-row>
          <el-row>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list_0.currentPage" :page-sizes="pageSizes" :page-size="list_0.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list_0.total" class="clearfix pagination-table">
            </el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">历史位置</span>
          <el-table ref="listTable" :data="list_2.data" @sort-change="handleSortChange" :max-height="maxTableHeight_2" border resizable size="mini">
            <el-table-column prop="timeAdded" label="定位时间" sortable="custom">
              <template slot-scope="scope">{{scope.row.timeAdded | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="location" label="定位地址" sortable="custom"></el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list_2.currentPage" :page-sizes="pageSizes" :page-size="list_2.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list_2.total" class="clearfix pagination-table">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">行车轨迹</span>
          <div class="Bmap-container" :style="{height: maxMapHeight + 'px'}"></div>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">OBD信息</span>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">历史碰撞</span>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">违章抓拍</span>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">驾驶行为</span>
          <el-form :inline="true" :model="formInline_7" class="search-form" size="small" @submit.native.prevent>
            <el-form-item>
              <el-select v-model="formInline_7.eventType" @change="searchData" filterable clearable placeholder="事件类型">
                <el-option v-for="(item, index) in eventType" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="formInline_7.startTimeAdded" @change="searchData" :picker-options="startDatePicker_7" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline_7.endTimeAdded" @change="searchData" :picker-options="endDatePicker_7" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
          <el-table ref="listTable_7" :data="list_7.data" @sort-change="handleSortChange" :max-height="maxTableHeight_7" border resizable size="mini">
            <el-table-column prop="eventType" label="事件类型" sortable="custom" min-width="160">
              <template slot-scope="scope">{{scope.row.eventType | valueToLabel(eventType)}}</template>
            </el-table-column>
            <el-table-column prop="longitude" label="精度坐标" sortable="custom" width="100"></el-table-column>
            <el-table-column prop="latitude" label="纬度坐标" sortable="custom" width="100"></el-table-column>
            <el-table-column prop="gpsTime" label="GPS时间" sortable="custom" width="153">
              <template slot-scope="scope">{{scope.row.gpsTime | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="gpsOrientation" label="GPS航迹读数" sortable="custom" width="112"></el-table-column>
            <el-table-column prop="gpsSpeed" label="GPS速度(KM/H)" sortable="custom" width="130"></el-table-column>
            <el-table-column prop="gpsCount" label="连接的卫星数" sortable="custom" width="112"></el-table-column>
            <el-table-column prop="batteryVoltage" label="电瓶电压(V)" sortable="custom" width="102"></el-table-column>
            <el-table-column prop="currentOdometer" label="当前车辆总里程(KM)" sortable="custom" width="150"></el-table-column>
            <el-table-column prop="forceSpeed" label="加速度(M/S2)" sortable="custom" width="112"></el-table-column>
            <el-table-column prop="timeAdded" label="记录时间" sortable="custom" width="153">
              <template slot-scope="scope">{{scope.row.timeAdded | formatDate}}</template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list_7.currentPage" :page-sizes="pageSizes" :page-size="list_7.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list_7.total" class="clearfix pagination-table">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <v-picview ref="picview" width="800px"></v-picview>
    <v-videoview ref="videoview" width="800px"></v-videoview>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      tabIndex: '0',
      imgH: 0,
      deviceInfo: {},
      // tabHeight
      maxTableHeight_0: Api.UNITS.maxTableHeight(358),
      maxTableHeight_1: Api.UNITS.maxTableHeight(358),
      maxTableHeight_2: Api.UNITS.maxTableHeight(358),
      maxTableHeight_7: Api.UNITS.maxTableHeight(408),
      maxMapHeight: Api.UNITS.maxTableHeight(302),
      // 表单
      formInline_0: {},
      formInline_1: {},
      formInline_2: {},
      formInline_7: {},
      // 排序
      sort_0: {},
      sort_1: {},
      sort_2: {},
      sort_7: {},
      // 列表
      list_0: {
        data: [],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      // src https://www.runoob.com/try/demo_source/mov_bbb.mp4
      //poster https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg
      list_1: {
        data: [{
          videoUrl: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
        }, {
          videoUrl: 'https://www.runoob.com/try/demo_source/movie.mp4',
        }],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      list_2: {
        data: [],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      list_7: {
        data: [],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      eventType: [{
        label: 'TIMED_EVENT',
        value: 1
      }, {
        label: 'JOURNEY_START_EVENT',
        value: 2
      }, {
        label: 'JOURNEY_END_EVENT',
        value: 3
      }, {
        label: 'ACCELERATION_EVENT',
        value: 4
      }, {
        label: 'DECELERATION_EVENT',
        value: 5
      }]
    }
  },
  mounted() {
    this.getData()
    this[`getData_${this.tabIndex}`]()
  },
  methods: {
    changeTab() {
      this[`getData_${this.tabIndex}`]()
    },
    // 处理多个pagination的情况
    handleSizeChange(val) {
      this[`list_${this.tabIndex}`].currentPage = 1
      this[`list_${this.tabIndex}`].pagesize = val
      this[`getData_${this.tabIndex}`]()
    },
    handleCurrentChange(val) {
      this[`list_${this.tabIndex}`].currentPage = val
      this[`getData_${this.tabIndex}`]()
    },
    handleSortChange(val = {}) {
      Api.UNITS.setSortSearch(val, this, `sort_${this.tabIndex}`)
      this[`getData_${this.tabIndex}`]()
    },
    searchData() {
      this[`list_${this.tabIndex}`].currentPage = 1
      this[`getData_${this.tabIndex}`]()
    },
    getData() {
      this.loadData = true
      _axios.send({
        method: 'post',
        url: _axios.ajaxAd.getDeviceRecord,
        data: {
          deviceId: Api.UNITS.getQuery('deviceId')
        },
        done: ((res) => {
          this.loadData = false
          this.deviceInfo = res.data
        })
      })
    },
    getData_0() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getPhotoHistory,
        data: { deviceId: Api.UNITS.getQuery('deviceId') },
        formInline: 'formInline_0',
        list: 'list_0',
        sort: 'sort_0',
        cb: () => {
          this.reRenderImg()
        }
      })
    },
    getData_1() {
      this.reRenderImg()
      return
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getVideoHistory,
        data: { deviceId: Api.UNITS.getQuery('deviceId') },
        formInline: 'formInline_1',
        list: 'list_1',
        sort: 'sort_1',
        cb: () => {
          this.reRenderImg()
        }
      })
    },
    getData_2() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getLocationHistory,
        data: { deviceId: Api.UNITS.getQuery('deviceId') },
        list: 'list_2',
        sort: 'sort_2'
      })
    },
    getData_7() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getPageDrivingBehavior,
        data: { deviceId: Api.UNITS.getQuery('deviceId') },
        formInline: 'formInline_7',
        list: 'list_7',
        sort: 'sort_7'
      })
    },
    resetData() {
      this[`list_${this.tabIndex}`].currentPage = 1
      this[`formInline_${this.tabIndex}`] = {}
      this[`sort_${this.tabIndex}`] = {}
      this.$refs[`listTable_${this.tabIndex}`].clearSort()
      this.$refs[`listTable_${this.tabIndex}`].clearSelection()
      this[`getData_${this.tabIndex}`]()
    },
    reRenderImg() {
      this.$nextTick(() => {
        let width = Math.ceil($('.resource_wrapper').width() * 0.65)
        if (width >= 0) {
          this.imgH = width
        }
        $('.resource_wrapper .block').height(this.imgH)
        $('.resource_container').height(this.maxTableHeight_0)
      })
    }
  },
  computed: {
    startDatePicker_0() {
      return Api.UNITS.startDatePicker(this, this.formInline_7.timeAddedEnd)
    },
    endDatePicker_0() {
      return Api.UNITS.endDatePicker(this, this.formInline_7.timeAddedStart)
    },
    startDatePicker_7() {
      return Api.UNITS.startDatePicker(this, this.formInline_7.endTimeAdded)
    },
    endDatePicker_7() {
      return Api.UNITS.endDatePicker(this, this.formInline_7.startTimeAdded)
    }
  }
}

</script>
<style lang="scss">
.devrecord-container {
  .resource_container {
    position: relative;
    overflow: auto;

    .resource_wrapper {
      .block {
        .el-image {
          height: 100%;
          width: 100%;
        }
      }

      .text {
        font-size: 14px;
      }
    }
  }

  .shadow-wrappr {

    .el-card {
      background: transparent;

    }
  }

  .data_null {
    color: #ccc;
    position: absolute;
    top: 50%;
    text-align: center;
  }

  .Bmap-container {
    width: 100%;
    background: pink;
  }

  .pos-form {
    position: absolute;
    z-index: 99;
    right: 20px;
    top: 90px;

    input,
    .el-input {
      width: 180px !important;
    }
  }
}

</style>
