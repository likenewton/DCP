<template>
  <div class="voicereport-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-date-picker v-model="formInline.start" type="datetime" placeholder="激活开始时间（起）"></el-date-picker> -
            <el-date-picker v-model="formInline.end" type="datetime" placeholder="激活开始时间（止）"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="激活开始时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="激活结束时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="生成时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="文件" sortable="custom"></el-table-column>
          <el-table-column fixed="right" prop="" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="rebuild">重新生成</el-button>
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
          <el-form :inline="false" :model="formInline" size="small" label-width="110px">
            <el-form-item label="激活开始时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="激活开始时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="激活开始时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item label="激活结束时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="激活结束时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="激活结束时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item label="生成时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="生成时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="生成时间（止）"></el-date-picker>
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
    return {
      list: {
        data: [{
          a: 1
        }],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
    }
  },
  mounted() {

  },
  methods: {
    getData() {},
    rebuild() {
      this.showCfmBox({
        message: '确定生成语音报表文件吗？',
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功！'
          })
        }
      })
    }
  }
}

</script>
<style lang="scss"></style>
