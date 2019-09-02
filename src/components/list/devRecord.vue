<template>
  <div class="devrecord-container">
    <el-card class="clearfix" shadow="never">
      <v-record-info :infos="deviceInfo"></v-record-info>
      <el-form v-show="tabIndex === '0'" :inline="true" :model="formInline_0" class="pos-form" size="small" @submit.native.prevent>
        <el-form-item>
          <el-date-picker v-model="formInline_0.timeAddedStart" @change="searchData" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（起）"></el-date-picker> -
          <el-date-picker v-model="formInline_0.timeAddedEnd" @change="searchData" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（止）"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-form v-show="tabIndex === '1'" :inline="true" :model="formInline_1" class="pos-form" size="small" @submit.native.prevent>
        <el-form-item>
          <el-date-picker v-model="formInline_1.timeAddedStart" @change="searchData" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（起）"></el-date-picker> -
          <el-date-picker v-model="formInline_1.timeAddedEnd" @change="searchData" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（止）"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-form v-show="tabIndex === '3'" :inline="true" :model="formInline_3" class="pos-form" size="small" @submit.native.prevent>
        <el-form-item>
          <el-date-picker v-model="formInline_3.beginTime" @change="searchData" :picker-options="startDatePicker_3" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（起）"></el-date-picker> -
          <el-date-picker v-model="formInline_3.endTime" @change="searchData" :picker-options="endDatePicker_3" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（止）"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-form v-show="tabIndex === '5'" :inline="true" :model="formInline_5" class="pos-form" size="small" @submit.native.prevent>
        <el-form-item>
          <el-date-picker v-model="formInline_5.timeAddedStart" @change="searchData" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（起）"></el-date-picker> -
          <el-date-picker v-model="formInline_5.timeAddedEnd" @change="searchData" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（止）"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-form v-show="tabIndex === '6'" :inline="true" :model="formInline_6" class="pos-form" size="small" @submit.native.prevent>
        <el-form-item>
          <el-date-picker v-model="formInline_6.timeAddedStart" @change="searchData" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（起）"></el-date-picker> -
          <el-date-picker v-model="formInline_6.timeAddedEnd" @change="searchData" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（止）"></el-date-picker>
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list_0.currentPage" :page-sizes="pageSizes" :page-size="list_0.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list_0.total" class="clearfix pagination-table"></el-pagination>
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list_1.currentPage" :page-sizes="pageSizes" :page-size="list_1.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list_1.total" class="clearfix pagination-table"></el-pagination>
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
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list_2.currentPage" :page-sizes="pageSizes" :page-size="list_2.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list_2.total" class="clearfix pagination-table"></el-pagination>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">行车轨迹</span>
          <div v-if="list_3.data.length > 0">
            <div id="Bmap-container" :style="{height: maxTableHeight_3 + 'px'}"></div>
          </div>
          <div v-if="list_3.data.length === 0" class="map-none" :style="{height: maxTableHeight_3 + 'px'}">
            <span class="data_null">暂无历史轨迹（默认查询最近一天的轨迹）</span>
          </div>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">OBD信息</span>
          <el-button-group style="margin-bottom: 10px">
            <el-button size="small" type="primary" @click="getParas">查看参数</el-button>
          </el-button-group>
          <el-table ref="listTable" :data="list_4.data" @sort-change="handleSortChange" :max-height="maxTableHeight_4" border resizable size="mini">
            <el-table-column prop="obdKey" label="故障码" sortable="custom" min-width="120"></el-table-column>
            <el-table-column prop="obdVal" label="故障描述" sortable="custom" min-width="600"></el-table-column>
            <el-table-column prop="obdStatus" label="状态" sortable="custom" min-width="120">
              <template slot-scope="scope">
                <span class="text_success" v-if="scope.row.obdStatus === '01'">正常</span>
                <span class="text_danger" v-if="scope.row.obdStatus === '02'">故障</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">历史碰撞</span>
          <el-row class="resource_container shadow-wrappr" :gutter="20" v-shadow>
            <el-col v-if="list_5.data.length > 0" :span="4" v-for="(item, index) in list_5.data" :key="index" style="margin-bottom: 12px">
              <el-card class="resource_wrapper" :body-style="{ padding: '6px' }" shadow="hover">
                <div class="block">
                  <el-image class="pointer" :src="item.url" fit="cover" @click.native="$refs.picview.showPicView(item.url)"></el-image>
                </div>
                <div style="padding: 5px">
                  <span class="text">{{item.timeAdded | formatDate('yyyy-mm-dd')}}</span>
                  <div class="text">
                    <span style="display: inline-block; margin-top: 3px">{{item.url === item.purl1 ? '前置摄像头拍照' : '后置摄像头拍照'}}</span>
                    <el-button style="padding: 0" v-if="item.purl1 && item.purl2" type="text" @click="switchCamera(item)">(切换)</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col class="data_null" v-if="list_5.data.length === 0">
              <span>暂无数据</span>
            </el-col>
          </el-row>
          <el-row>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list_5.currentPage" :page-sizes="pageSizes" :page-size="list_5.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list_5.total" class="clearfix pagination-table"></el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">违章抓拍</span>
          <el-row class="resource_container shadow-wrappr" :gutter="20" v-shadow>
            <el-col v-if="list_6.data.length > 0" :span="4" v-for="(item, index) in list_6.data" :key="index" style="margin-bottom: 12px">
              <el-card class="resource_wrapper" :body-style="{ padding: '6px' }" shadow="hover">
                <div class="block">
                  <el-image class="pointer" :src="item.videoUrl" fit="cover" @click.native="$refs.picview.showPicView(item.videoUrl)"></el-image>
                </div>
                <div style="padding: 5px">
                  <span class="text">{{item.timeAdded | formatDate('yyyy-mm-dd')}}</span>
                </div>
              </el-card>
            </el-col>
            <el-col class="data_null" v-if="list_6.data.length === 0">
              <span>暂无数据</span>
            </el-col>
          </el-row>
          <el-row>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list_6.currentPage" :page-sizes="pageSizes" :page-size="list_6.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list_6.total" class="clearfix pagination-table"></el-pagination>
          </el-row>
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
              <el-date-picker v-model="formInline_7.timeAddedStart" @change="searchData" :picker-options="startDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline_7.timeAddedEnd" @change="searchData" :picker-options="endDatePicker" type="date" value-format="yyyy-MM-dd" placeholder="记录时间（止）"></el-date-picker>
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
            <el-table-column prop="longitude" label="精度坐标" sortable="custom" width="100" align="right">
              <template slot-scope="scope">{{scope.row.longitude | fixed(6)}}</template>
            </el-table-column>
            <el-table-column prop="latitude" label="纬度坐标" sortable="custom" width="100" align="right">
              <template slot-scope="scope">{{scope.row.latitude | fixed(6)}}</template>
            </el-table-column>
            <el-table-column prop="gpsTime" label="GPS时间" sortable="custom" width="153">
              <template slot-scope="scope">{{scope.row.gpsTime | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="gpsOrientation" label="GPS航迹读数" sortable="custom" width="112" align="right"></el-table-column>
            <el-table-column prop="gpsSpeed" label="GPS速度(KM/H)" sortable="custom" width="130" align="right">
              <template slot-scope="scope">{{scope.row.gpsSpeed | fixed}}</template>
            </el-table-column>
            <el-table-column prop="gpsCount" label="连接的卫星数" sortable="custom" width="112" align="right"></el-table-column>
            <el-table-column prop="batteryVoltage" label="电瓶电压(V)" sortable="custom" width="102" align="right">
              <template slot-scope="scope">{{scope.row.batteryVoltage | fixed}}</template>
            </el-table-column>
            <el-table-column prop="currentOdometer" label="当前车辆总里程(KM)" sortable="custom" width="150" align="right">
              <template slot-scope="scope">{{scope.row.currentOdometer | fixed}}</template>
            </el-table-column>
            <el-table-column prop="forceSpeed" label="加速度(M/S2)" sortable="custom" width="112" align="right">
              <template slot-scope="scope">{{scope.row.forceSpeed | fixed}}</template>
            </el-table-column>
            <el-table-column prop="timeAdded" label="记录时间" sortable="custom" width="153">
              <template slot-scope="scope">{{scope.row.timeAdded | formatDate}}</template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list_7.currentPage" :page-sizes="pageSizes" :page-size="list_7.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list_7.total" class="clearfix pagination-table"></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <v-picview ref="picview" width="800px"></v-picview>
    <v-videoview ref="videoview" width="800px"></v-videoview>
    <!-- 查看批次详细信息 -->
    <el-drawer title="参数" :visible.sync="isShowPara" direction="rtl" size="450px" :wrapperClosable="true">
      <div class="para-wrapper" v-shadow:[isShowPara]>
        <el-form class="check-form" :inline="false" size="small" label-width="148px">
          <el-form-item label="发动机负荷：">
            <span>{{parasData.param1}}</span>
          </el-form-item>
          <el-form-item label="冷却液温度：">
            <span>{{parasData.param2 && parasData.param2 + '°C'}}</span>
          </el-form-item>
          <el-form-item label="发动机转速：">
            <span>{{parasData.param3}}</span>
          </el-form-item>
          <el-form-item label="车速：">
            <span>{{parasData.param4 && parasData.param4 + 'KM/H'}}</span>
          </el-form-item>
          <el-form-item label="点火提前角：">
            <span>{{parasData.param5}}</span>
          </el-form-item>
          <el-form-item label="进气温度：">
            <span>{{parasData.param6 && parasData.param6 + '°C'}}</span>
          </el-form-item>
          <el-form-item label="引擎运行时间：">
            <span>{{parasData.param7 && parasData.param7 + 'H'}}</span>
          </el-form-item>
          <el-form-item label="油箱剩余油量：">
            <span>{{parasData.param8}}</span>
          </el-form-item>
          <el-form-item label="电瓶电压：">
            <span>{{parasData.param9 && parasData.param9 + 'V'}}</span>
          </el-form-item>
          <el-form-item label="百公里平均油耗：">
            <span>{{parasData.param10 && parasData.param10 + 'L/100KM'}}</span>
          </el-form-item>
          <el-form-item label="本次里程：">
            <span>{{parasData.param11 && parasData.param11 + 'KM'}}</span>
          </el-form-item>
          <el-form-item label="累计里程：">
            <span>{{parasData.param12 && parasData.param12 + 'KM'}}</span>
          </el-form-item>
          <el-form-item label="总里程：">
            <span>{{parasData.param12 && parasData.param12 + 'KM'}}</span>
          </el-form-item>
          <el-form-item label="本次耗油量：">
            <span>{{parasData.param13 && parasData.param13 + 'L'}}</span>
          </el-form-item>
          <el-form-item label="累计耗油量：">
            <span>{{parasData.param14 && parasData.param14 + 'L'}}</span>
          </el-form-item>
          <el-form-item label="本次怠速时间：">
            <span>{{parasData.param15 && parasData.param15 + 'H'}}</span>
          </el-form-item>
          <el-form-item label="本次行驶时间：">
            <span>{{parasData.param16 && parasData.param16 + 'H'}}</span>
          </el-form-item>
          <el-form-item label="累计怠速时间：">
            <span>{{parasData.param17 && parasData.param17 + 'H'}}</span>
          </el-form-item>
          <el-form-item label="累计行驶时间：">
            <span>{{parasData.param18 && parasData.param18 + 'H'}}</span>
          </el-form-item>
          <el-form-item label="总点火：">
            <span>{{parasData.param22 && parasData.param22 + '次'}}</span>
          </el-form-item>
          <el-form-item label="平均热车时间：">
            <span>{{parasData.param23 && parasData.param23 + 'H'}}</span>
          </el-form-item>
          <el-form-item label="平均车速：">
            <span>{{parasData.param24 && parasData.param24 + 'KM/H'}}</span>
          </el-form-item>
          <el-form-item label="历史最高车速：">
            <span>{{parasData.param25 && parasData.param25 + 'KM/H'}}</span>
          </el-form-item>
          <el-form-item label="历史最高转速：">
            <span>{{parasData.param26 && parasData.param26 + 'RPM'}}</span>
          </el-form-item>
          <el-form-item label="累计急加速：">
            <span>{{parasData.param27 && parasData.param27 + '次'}}</span>
          </el-form-item>
          <el-form-item label="累计急减速：">
            <span>{{parasData.param28 && parasData.param28 + '次'}}</span>
          </el-form-item>
          <el-form-item label="瞬时油耗：">
            <span>{{parasData.param29 && parasData.param29 + 'L/H'}}</span>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
import BMap from 'BMap'

export default {
  data() {
    return {
      tabIndex: '0',
      imgH: 0,
      map: null,
      isShowPara: false,
      parasData: {},
      deviceInfo: {},
      // tabHeight
      maxTableHeight_0: Api.UNITS.maxTableHeight(358),
      maxTableHeight_1: Api.UNITS.maxTableHeight(358),
      maxTableHeight_2: Api.UNITS.maxTableHeight(358),
      maxTableHeight_3: Api.UNITS.maxTableHeight(302),
      maxTableHeight_4: Api.UNITS.maxTableHeight(344),
      maxTableHeight_5: Api.UNITS.maxTableHeight(358),
      maxTableHeight_6: Api.UNITS.maxTableHeight(358),
      maxTableHeight_7: Api.UNITS.maxTableHeight(408),
      // 表单
      formInline_0: {},
      formInline_1: {},
      formInline_2: {},
      formInline_3: {},
      formInline_4: {},
      formInline_5: {},
      formInline_6: {},
      formInline_7: {},
      // 排序
      sort_0: {},
      sort_1: {},
      sort_2: {},
      sort_3: {},
      sort_4: {},
      sort_5: {},
      sort_6: {},
      sort_7: {},
      // 列表
      list_0: {
        data: [],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      list_1: {
        data: [],
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
      list_3: {
        data: [],
        data_bd: [],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      list_4: {
        data: [],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      list_5: {
        data: [],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      list_6: {
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
      }],
      pointers: []
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
    getParas() { // 获取OBD参数信息
      this.isShowPara = true
      this.loadData = true
      if (Object.keys(this.parasData).length > 0) return
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getObdInfo,
        params: { deviceId: Api.UNITS.getQuery('deviceId') },
        done: ((res) => {
          this.loadData = false
          this.parasData = res.data || {}
        }),
        fail: () => {
          this.loadData = false
        }
      })
    },
    getData() { // tab上公共数据
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
    getData_0() { // 历史照片
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
    getData_1() { // 历史视频
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
    getData_2() { // 历史位置
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getLocationHistory,
        data: { deviceId: Api.UNITS.getQuery('deviceId') },
        list: 'list_2',
        sort: 'sort_2'
      })
    },
    getData_3() { // 行车轨迹
      _axios.send({
        method: 'post',
        url: _axios.ajaxAd.getDeviceTrack,
        data: Object.assign({ deviceId: Api.UNITS.getQuery('deviceId') }, this.formInline_3),
        done: ((res) => {
          if (!res.data[0]) {
            this.list_3.data = []
            return
          } else {
            this.list_3.data = Array.from(new Set(res.data)) // 此处是否要去重？
          }
          this.list_3.data_bd = []
          this.list_3.data = this.list_3.data.map((v) => {
            return new BMap.Point(...v.split(','))
          })
          this.$nextTick(() => {
            this.map = new BMap.Map("Bmap-container")
            this.map.centerAndZoom(this.list_3.data[0], 20)
            this.map.enableScrollWheelZoom(true)
            this.map.clearOverlays()
            // 添加带有定位的导航控件
            let navigationControl = new BMap.NavigationControl({
              anchor: BMAP_ANCHOR_TOP_LEFT,
              type: BMAP_NAVIGATION_CONTROL_LARGE,
            })
            this.map.addControl(navigationControl)
            // 添加比例尺
            let top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT })
            top_left_control.setOffset(new BMap.Size(20, 65))
            this.map.addControl(top_left_control)
            // 坐标系转换
            if (res.ver === 1) { // 百度坐标系， 无需转换
              this.list_3.data_bd = this.list_3.data
              this.drowLine()
            } else { // 火星坐标系, 一次只能转换10个坐标
              let convertor = new BMap.Convertor()
              for (let i = 0; i < this.list_3.data.length; i += 10) {
                let pos = this.list_3.data.slice(i, i + 10)
                convertor.translate(pos, 1, 5, (data) => {
                  if (data.status === 0) {
                    this.list_3.data_bd.push(...data.points)
                    if (i === 0) {
                      this.map.setCenter(data.points[0])
                    }
                  }
                })
              }
              setTimeout(() => {
                this.drowLine()
              }, 1000)
            }
          })
        })
      })
    },
    getData_4() { // OBD信息
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getObdErrList,
        params: { deviceId: Api.UNITS.getQuery('deviceId') },
        done: ((res) => {
          this.list_4.data = res.data || []
        })
      })
    },
    getData_5() { // 历史碰撞
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.gsensorHistory,
        data: { deviceId: Api.UNITS.getQuery('deviceId') },
        formInline: 'formInline_5',
        list: 'list_5',
        sort: 'sort_5',
        cb: () => {
          this.list_5.data.forEach((v) => {
            this.$set(v, 'url', v.purl1 || v.purl2)
          })
          this.reRenderImg()
        }
      })
    },
    getData_6() { // 违章抓拍
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getIllegalCapture,
        data: { deviceId: Api.UNITS.getQuery('deviceId') },
        list: 'list_6',
        sort: 'sort_6',
        cb: () => {
          this.reRenderImg()
        }
      })
    },
    getData_7() { // 驾驶行为
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
    reRenderImg() { // el-image 高度计算
      this.$nextTick(() => {
        let width = Math.ceil($('.resource_wrapper').width() * 0.65)
        if (width >= 0) {
          this.imgH = width
        }
        $('.resource_wrapper .block').height(this.imgH)
        $('.resource_container').height(this.maxTableHeight_0)
      })
    },
    switchCamera(item) { // 切换摄像头角度，只有当前后两个摄像头都存在
      if (item.url === item.purl1) {
        item.url = item.purl2
      } else {
        item.url = item.purl1
      }
    },
    drowLine() { // 绘制轨迹
      let polyline = new BMap.Polyline(this.list_3.data_bd, { strokeColor: "blue", strokeWeight: 4, strokeOpacity: 0.6 })
      this.map.addOverlay(polyline)
      // let startPointer = this.list_3.data_bd[0]
      // let endPointer = this.list_3.data_bd[this.list_3.data_bd.length - 1]
      // this.map.addOverlay(new BMap.Marker(startPointer))
      // this.map.addOverlay(new BMap.Marker(endPointer))
      // this.map.setViewport([startPointer, endPointer])

      let IconStart = 'M811.862928 127.601246c-165.88162-165.88162-430.654206-165.88162-596.535825-3.190031-165.88162 165.88162-169.071651 433.844237-3.190031 599.725857l296.672897 299.862928 299.862928-296.672897c165.88162-165.88162 169.071651-433.844237 3.190031-599.725857z m-309.433021 114.841122h178.641744v159.501557h-31.900311v-15.950156H543.900312v105.271029c0 15.950156 6.380062 22.330218 22.330218 22.330218h76.560747c15.950156 0 25.520249-6.380062 28.710281-22.330218 3.190031-12.760125 3.190031-31.900312 6.380062-57.420561 9.570093 3.190031 19.140187 9.570093 31.900311 12.760124-3.190031 28.71028-6.380062 47.850467-6.380062 60.610592-3.190031 25.520249-22.330218 35.090343-54.230529 35.090343h-86.130842c-31.900312 0-47.850467-15.950156-47.850467-51.040498V350.903427h137.17134V274.342679h-143.551402v-31.900311zM703.401869 631.626168h-223.302181c-70.180685 0-118.031153-25.520249-143.551401-76.560747-9.570093 38.280374-19.140187 70.180685-35.090343 92.510903-6.380062-12.760125-12.760125-28.71028-19.140187-41.470405 22.330218-38.280374 35.090343-95.700935 35.090343-175.451713l31.900311 3.190031c0 28.71028-3.190031 54.23053-6.380062 79.750779 9.570093 22.330218 25.520249 41.470405 44.660436 57.42056v-162.691588H285.507788v-31.900312h89.320872v-63.800623H301.457944v-31.900312h73.370716v-63.800623h35.090343v60.610592h73.370717v31.900312h-73.370717v63.800623h82.94081v31.900311h-70.180685v66.990655h66.990654v31.900311h-66.990654v82.94081c19.140187 9.570093 44.660436 12.760125 70.180685 12.760125 70.180685 0 146.741433 0 226.492212-3.190031-9.570093 15.950156-12.760125 25.520249-15.950156 35.090342z';
      let IconEnd = 'M470.416361 291.488198c19.192449 35.186156 38.384898 60.776088 63.974829 83.167278 28.788673-22.39119 54.378605-51.179864 73.571055-83.167278h-137.545884z M774.296803 125.15364C607.962245-41.180918 339.267959-41.180918 172.933402 121.954898 6.598844 288.289456 6.598844 556.983742 169.73466 723.318299l297.482959 300.681701 300.681701-297.482959c169.533299-166.334558 169.533299-435.028843 6.397483-601.363401zM323.274252 211.51966l31.987415 12.794966c-28.788673 54.378605-54.378605 102.359728-76.769796 137.545885h51.179864c9.596224-19.192449 22.39119-41.583639 35.186156-63.97483l31.987415 15.993707c-41.583639 73.571054-76.769796 127.94966-102.359728 166.334558 25.589932-3.198741 54.378605-6.397483 86.366021-12.794966-3.198741 12.794966-3.198741 22.39119-3.198742 31.987415-31.987415 3.198741-73.571054 9.596224-121.552177 19.192449l-6.397483-31.987415c15.993707-19.192449 38.384898-51.179864 67.173572-95.962245-31.987415 3.198741-51.179864 3.198741-67.173572 3.198741l-9.596224-28.788673c28.788673-31.987415 54.378605-86.36602 83.167279-153.539592z m67.173571 371.054014c-38.384898 9.596224-86.36602 19.192449-140.744626 35.186156l-9.596224-35.186156c44.782381-9.596224 95.962245-19.192449 150.34085-35.186157v35.186157z m223.911905 60.776088c-73.571054-25.589932-140.744626-47.981122-198.321973-63.97483l12.794966-31.987415c54.378605 15.993707 121.552177 35.186156 198.321973 57.577347l-12.794966 38.384898z m-147.142109-143.943367l12.794966-28.788674c44.782381 12.794966 89.564762 28.788673 131.148401 44.782381l-15.993707 35.186157c-38.384898-22.39119-83.167279-38.384898-127.94966-51.179864z m195.123231-22.391191c-51.179864-15.993707-92.763503-35.186156-131.148401-60.776088-38.384898 25.589932-83.167279 47.981122-137.545884 67.173571-3.198741-9.596224-9.596224-22.39119-15.993708-31.987415 47.981122-12.794966 89.564762-31.987415 127.94966-57.577347-22.39119-22.39119-41.583639-47.981122-57.577347-76.769795-12.794966 22.39119-28.788673 44.782381-44.782381 67.173571l-22.39119-22.39119c35.186156-47.981122 63.97483-95.962245 83.167279-150.340851l31.987415 9.596225-19.192449 38.384898H639.94966v31.987415c-22.39119 38.384898-51.179864 73.571054-86.366021 102.359727 31.987415 22.39119 73.571054 38.384898 118.353436 44.782381 0 15.993707-3.198741 28.788673-9.596225 38.384898z';
      let startMarker = new BMap.Marker(this.list_3.data_bd[0], {
        // 指定Marker的icon属性为Symbol
        icon: new BMap.Symbol(IconStart, {
          scale: 0.03, //图标缩放大小
          fillColor: '#32b16c', //填充颜色
          fillOpacity: 1, //填充透明度
          strokeColor: '#fff', //线色
          strokeWeight: 1 //线宽
        }),
        offset: new BMap.Size(-17, -31), //自定义图标需设置偏移量
      })
      let endMarker = new BMap.Marker(this.list_3.data_bd[this.list_3.data_bd.length - 1], {
        icon: new BMap.Symbol(IconEnd, {
          scale: 0.03,
          fillColor: '#fc4e52',
          fillOpacity: 1,
          strokeColor: '#fff',
          strokeWeight: 1
        }),
        offset: new BMap.Size(-17, -31), //自定义图标需设置偏移量
      })
      this.map.addOverlay(startMarker)
      this.map.addOverlay(endMarker)
    }
  },
  computed: {
    startDatePicker() {
      return Api.UNITS.startDatePicker(this, this[`formInline_${this.tabIndex}`].timeAddedEnd)
    },
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this[`formInline_${this.tabIndex}`].timeAddedStart)
    },
    startDatePicker_3() {
      return Api.UNITS.startDatePicker(this, this[`formInline_${this.tabIndex}`].endTime)
    },
    endDatePicker_3() {
      return Api.UNITS.endDatePicker(this, this[`formInline_${this.tabIndex}`].beginTime)
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

  .map-none {
    position: relative;

    .data_null {
      display: block;
      width: 100%;
      color: #ccc;
      position: absolute;
      top: 50%;
      text-align: center;
    }
  }

  #Bmap-container {
    width: 100%;
  }

  .pos-form {
    position: absolute;
    z-index: 99;
    right: 20px;
    top: 93px;

    input,
    .el-input {
      width: 180px !important;
    }
  }

}

</style>
