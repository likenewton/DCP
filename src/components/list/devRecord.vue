<template>
  <div class="devrecord-container">
    <el-card class="clearfix" shadow="never">
      <v-record-info :infos="deviceInfo"></v-record-info>
      <el-tabs @tab-click="changeTab" v-model="tabIndex">
        <el-tab-pane v-loading="loadData">
          <span slot="label">历史照片</span>
          <el-row class="resource_container shadow-wrappr" :gutter="20" v-shadow>
            <el-col :span="4" v-for="(item, index) in list_0.data" :key="index" style="margin-bottom: 12px">
              <el-card class="resource_wrapper" :body-style="{ padding: '6px' }" shadow="hover">
                <div class="block">
                  <el-image class="pointer" :src="item.src" fit="cover" @click.native="showPicView"></el-image>
                </div>
                <div style="padding: 10px">
                  <span class="text">好吃的汉堡</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list_0.currentPage" :page-sizes="pageSizes" :page-size="list_0.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list_0.total" class="clearfix pagination-table">
            </el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">历史视频</span>
        </el-tab-pane>
        <el-tab-pane v-loading="loadData">
          <span slot="label">历史位置</span>
          <el-table ref="listTable" :data="list_2.data" @sort-change="handleSortChange" :max-height="maxTableHeight_2" border resizable size="mini">
            <el-table-column prop="" label="定位时间" sortable="custom"></el-table-column>
            <el-table-column prop="" label="定位地址" sortable="custom"></el-table-column>
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
              <el-select filterable clearable placeholder="事件类型"></el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="formInline_7.start" type="datetime" placeholder="记录时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline_7.end" type="datetime" placeholder="记录时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
          <el-table ref="listTable" :data="list_7.data" @sort-change="handleSortChange" :max-height="maxTableHeight_7" border resizable size="mini">
            <el-table-column prop="" label="事件类型" sortable="custom"></el-table-column>
            <el-table-column prop="" label="精度坐标" sortable="custom"></el-table-column>
            <el-table-column prop="" label="纬度坐标" sortable="custom"></el-table-column>
            <el-table-column prop="" label="GPS时间" sortable="custom"></el-table-column>
            <el-table-column prop="" label="GPS航迹读数" sortable="custom"></el-table-column>
            <el-table-column prop="" label="GPS速度(KM/H)" sortable="custom"></el-table-column>
            <el-table-column prop="" label="连接的卫星数" sortable="custom"></el-table-column>
            <el-table-column prop="" label="电瓶电压(V)" sortable="custom"></el-table-column>
            <el-table-column prop="" label="当前车辆总里程(KM)" sortable="custom"></el-table-column>
            <el-table-column prop="" label="加速度(M/S2)" sortable="custom"></el-table-column>
            <el-table-column prop="" label="记录时间" sortable="custom"></el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list_7.currentPage" :page-sizes="pageSizes" :page-size="list_7.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list_7.total" class="clearfix pagination-table">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <v-picview ref="picview"></v-picview>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      tabIndex: '0',
      imgH: 0,
      // tabHeight
      maxTableHeight_0: Api.UNITS.maxTableHeight(358),
      maxTableHeight_2: Api.UNITS.maxTableHeight(358),
      maxTableHeight_7: Api.UNITS.maxTableHeight(408),
      maxMapHeight: Api.UNITS.maxTableHeight(302),
      deviceInfo: {},
      // 表单
      formInline_2: {},
      formInline_7: {},
      // 列表
      list_0: {
        data: [{
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }, {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }, {
          src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        }, {
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }, {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }, {
          src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        }, {
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }, {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }, {
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }, {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }, {
          src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        }, {
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }, {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }, {
          src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        }, {
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }, {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }, {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }, {
          src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        }, {
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }, {
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
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
    }
  },
  mounted() {
    this.getData()
    this.$nextTick(() => {
      this.imgH = Math.ceil($('.resource_wrapper').width() * 0.65)
      $('.resource_wrapper .block').height(this.imgH)
      $('.resource_container').height(this.maxTableHeight_0)
    })
  },
  methods: {
    changeTab() {

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
    showPicView(e) {
      this.$refs.picview.showPicView(e.target.src)
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

        .text {
          font-size: 14px;
        }
      }
    }
  }

  .shadow-wrappr {

    .el-card {
      background: transparent;

    }
  }

  .Bmap-container {
    width: 100%;
    background: pink;
  }
}

</style>
