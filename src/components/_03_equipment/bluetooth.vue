<template>
  <div class="bluetooth-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-date-picker v-model="formInline.startTimeAddedStart" :picker-options="startDatePicker_1" type="date" value-format="yyyy-MM-dd" @change="simpleSearchData" placeholder="激活开始时间（起）"></el-date-picker> -
            <el-date-picker v-model="formInline.startTimeAddedEnd" :picker-options="endDatePicker_1" type="date" value-format="yyyy-MM-dd" @change="simpleSearchData" placeholder="激活开始时间（止）"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData" :disabled="!pageAuthBtn.DCP_bluetooth_LIST">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true" :disabled="!pageAuthBtn.DCP_bluetooth_LIST">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="pageAuthBtn.DCP_bluetooth_LIST && list.data" @sort-change="handleSortChange" :stripe="isStripe" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="startTimeAdded" label="激活开始时间" :sortable="sortable" width="120">
            <template slot-scope="scope">{{scope.row.startTimeAdded | formatDate('yyyy-mm-dd')}}</template>
          </el-table-column>
          <el-table-column prop="endTimeAdded" label="激活结束时间" :sortable="sortable" width="120">
            <template slot-scope="scope">{{scope.row.endTimeAdded | formatDate('yyyy-mm-dd')}}</template>
          </el-table-column>
          <el-table-column prop="generateTime" label="生成时间" :sortable="sortable" width="160">
            <template slot-scope="scope">{{scope.row.generateTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="fileName" label="文件" :sortable="sortable">
            <template slot-scope="scope">
              <el-link v-if="scope.row.fileName" type="primary" :href="scope.row.host + scope.row.fileName">{{scope.row.fileName}}</el-link>
              <span v-else>文件未生成</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" prop="" label="操作" :sortable="sortable" width="100">
            <template slot-scope="scope">
              <el-button v-if="scope.row.fileName" type="text" @click="rebuild(scope)" :disabled="!pageAuthBtn.DCP_bluetooth_REBUILD">重新生成</el-button>
              <el-button v-else type="text" @click="rebuild(scope)" :disabled="!pageAuthBtn.DCP_bluetooth_REBUILD">生成文件</el-button>
            </template>
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
          <el-form :inline="false" :model="formInline" size="small" label-width="110px" v-loading="loadData">
            <el-form-item label="激活开始时间">
              <el-date-picker v-model="formInline.startTimeAddedStart" :picker-options="startDatePicker_1" type="date" value-format="yyyy-MM-dd" placeholder="激活开始时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.startTimeAddedEnd" :picker-options="endDatePicker_1" type="date" value-format="yyyy-MM-dd" placeholder="激活开始时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item label="激活结束时间">
              <el-date-picker v-model="formInline.endTimeAddedStart" :picker-options="startDatePicker_2" type="date" value-format="yyyy-MM-dd" placeholder="激活结束时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.endTimeAddedEnd" :picker-options="endDatePicker_2" type="date" value-format="yyyy-MM-dd" placeholder="激活结束时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item label="生成时间">
              <el-date-picker v-model="formInline.startGenerateTime" :picker-options="startDatePicker_3" type="date" value-format="yyyy-MM-dd" placeholder="生成时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.endGenerateTime" :picker-options="endDatePicker_3" type="date" value-format="yyyy-MM-dd" placeholder="生成时间（止）"></el-date-picker>
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
    this.list.data = []
    this.getData()
  },
  methods: {
    simpleSearchData() { // 简单查询
      let startTimeAddedStart = this.formInline.startTimeAddedStart
      let startTimeAddedEnd = this.formInline.startTimeAddedEnd
      this.formInline = {
        startTimeAddedStart,
        startTimeAddedEnd
      }
      this.searchData()
    },
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getBlueToothReport
      })
    },
    rebuild(scope) {
      this.showCfmBox({
        message: '确定生成蓝牙报表文件吗？',
        cb: () => {
          this.loading = this.$loading({
            lock: true,
            text: '蓝牙报表文件生成中...',
            spinner: Api.STATIC.loadIcon,
            background: Api.STATIC.loadBg
          })
          _axios.send({
            method: 'get',
            url: _axios.ajaxAd.generateReportFile,
            params: { id: scope.row.id },
            done: () => {
              this.loading.close()
              this.getData()
              this.showMsgBox({
                type: 'success',
                message: '操作成功！'
              })
            },
            fail: () => {
              this.loading.close()
            }
          })
        }
      })
    }
  },
  computed: {
    // === 激活时间约束 ===
    startDatePicker_1() {
      return Api.UNITS.startDatePicker(this, this.formInline.startTimeAddedEnd)
    },
    endDatePicker_1() {
      return Api.UNITS.endDatePicker(this, this.formInline.startTimeAddedStart)
    },
    // === 更新时间约束 ===
    startDatePicker_2() {
      return Api.UNITS.startDatePicker(this, this.formInline.endTimeAddedEnd)
    },
    endDatePicker_2() {
      return Api.UNITS.endDatePicker(this, this.formInline.endTimeAddedStart)
    },
    // === ADAS时间约束 ===
    startDatePicker_3() {
      return Api.UNITS.startDatePicker(this, this.formInline.endGenerateTime)
    },
    endDatePicker_3() {
      return Api.UNITS.endDatePicker(this, this.formInline.startGenerateTime)
    }
  }
}

</script>
<style lang="scss"></style>
