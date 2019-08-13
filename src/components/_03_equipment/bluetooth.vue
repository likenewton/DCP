<template>
  <div class="bluetooth-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-date-picker v-model="formInline.timeAddedbegin" :picker-options="startDatePicker_1" type="date" value-format="timestamp" @change="simpleSearchData" placeholder="激活开始时间（起）"></el-date-picker> -
            <el-date-picker v-model="formInline.timeAddedend" :picker-options="endDatePicker_1" type="date" value-format="timestamp" @change="simpleSearchData" placeholder="激活开始时间（止）"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="" label="激活开始时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="激活结束时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="生成时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="文件" sortable="custom"></el-table-column>
          <el-table-column prop="" label="操作" sortable="custom"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="650px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="110px">
            <el-form-item label="激活开始时间">
              <el-date-picker v-model="formInline.timeAddedbegin" :picker-options="startDatePicker_1" type="date" value-format="timestamp" placeholder="激活开始时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.timeAddedend" :picker-options="endDatePicker_1" type="date" value-format="timestamp" placeholder="激活开始时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item label="激活结束时间">
              <el-date-picker v-model="formInline.startTimeLast" :picker-options="startDatePicker_2" type="date" value-format="timestamp" placeholder="激活结束时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.endTimeLast" :picker-options="endDatePicker_2" type="date" value-format="timestamp" placeholder="激活结束时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item label="生成时间">
              <el-date-picker v-model="formInline.startAdasUpdateTime" :picker-options="startDatePicker_3" type="date" value-format="timestamp" placeholder="生成时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.endAdasUpdateTime" :picker-options="endDatePicker_3" type="date" value-format="timestamp" placeholder="生成时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
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
export default {
  data() {
    return {}
  },
  mounted() {
    this.getData()
  },
  methods: {
    simpleSearchData() { // 简单查询
      let deviceSn = this.formInline.deviceSn
      this.formInline = { deviceSn }
      this.searchData()
    },
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getBlueToothReport
      })
    }
  },
  computed: {
    // === 激活时间约束 ===
    startDatePicker_1() {
      return Api.UNITS.startDatePicker(this, this.formInline.timeAddedend)
    },
    endDatePicker_1() {
      return Api.UNITS.endDatePicker(this, this.formInline.timeAddedbegin)
    },
    // === 更新时间约束 ===
    startDatePicker_2() {
      return Api.UNITS.startDatePicker(this, this.formInline.endTimeLast)
    },
    endDatePicker_2() {
      return Api.UNITS.endDatePicker(this, this.formInline.startTimeLast)
    },
    // === ADAS时间约束 ===
    startDatePicker_3() {
      return Api.UNITS.startDatePicker(this, this.formInline.endAdasUpdateTime)
    },
    endDatePicker_3() {
      return Api.UNITS.endDatePicker(this, this.formInline.startAdasUpdateTime)
    }
  }
}

</script>
<style lang="scss"></style>
