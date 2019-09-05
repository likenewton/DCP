<template>
  <div class="devInfo-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name: 'addupinfo'})" :disabled="!pageAuthBtn.DCP_sysUpgrade_ADD">添加升级包</el-button>
          <v-dropdown :disabled="!pageAuthBtn.DCP_sysUpgrade_CACHE"></v-dropdown>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-select v-model="formInline.organCode" @change="searchData" filterable clearable placeholder="机构列表">
              <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData" :disabled="!pageAuthBtn.DCP_sysUpgrade_LIST">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="pageAuthBtn.DCP_sysUpgrade_LIST && list.data" @sort-change="handleSortChange" :stripe="isStripe" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="organCode" label="机构名称" :sortable="sortable" min-width="140">
            <template slot-scope="scope">{{scope.row.organCode | valueToLabel(orgs)}}</template>
          </el-table-column>
          <el-table-column prop="hardCode" label="硬件版本号" :sortable="sortable" width="130"></el-table-column>
          <el-table-column prop="softCode" label="软件版本号 " :sortable="sortable" width="130"></el-table-column>
          <el-table-column prop="softFor" label="适合版本号" :sortable="sortable" min-width="150"></el-table-column>
          <el-table-column prop="packCount" label="版本数量" :sortable="sortable" align-right="right" width="88"></el-table-column>
          <el-table-column prop="isForced" label="升级方式" :sortable="sortable" width="95">
            <template slot-scope="scope">
              <span class="text_danger bold" v-if="scope.row.isForced === 0">非强制升级</span>
              <span class="text_success bold" v-if="scope.row.isForced === 1">强制升级</span>
              <span class="text_warning bold" v-if="scope.row.isForced === 2">静默安装</span>
            </template>
          </el-table-column>
          <el-table-column prop="timePublish" label="发布时间" :sortable="sortable" width="90">
            <template slot-scope="scope">{{scope.row.timePublish | formatDate('yyy-mm-dd')}}</template>
          </el-table-column>
          <el-table-column prop="packUrl" label="升级包地址" :sortable="sortable" min-width="180"></el-table-column>
          <el-table-column fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <el-button type="text" @click="$router.push({name:'hisVersions',query:{organCode:scope.row.organCode}})" :disabled="!pageAuthBtn.DCP_sysUpgrade_VERSION">版本</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
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
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getPageOta
      })
    },
  }
}

</script>
<style lang="scss"></style>
