<template>
  <div class="feedback-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="问题描述"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="公司名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="APPID" sortable="custom"></el-table-column>
          <el-table-column prop="" label="问题类型" sortable="custom"></el-table-column>
          <el-table-column prop="" label="问题描述" sortable="custom"></el-table-column>
          <el-table-column prop="" label="用户称呼" sortable="custom"></el-table-column>
          <el-table-column prop="" label="联系手机" sortable="custom"></el-table-column>
          <el-table-column prop="" label="反馈时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="处理状态" sortable="custom"></el-table-column>
          <el-table-column prop="" label="操作人" sortable="custom"></el-table-column>
          <el-table-column prop="" label="操作备注" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" class="text_editor" @click="$router.push({name:'addfeedback'})">处理</el-button>
              <el-button type="text" class="text_danger" @click="delSinle(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="620px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="90px">
            <el-form-item label="问题描述">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="问题类型">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="处理状态">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="反馈时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="反馈时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="反馈时间（止）"></el-date-picker>
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
    delSinle(scope) {
      this.showCfmBox({
        message: '确定要删除该反馈吗？',
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功'
          })
        }
      })
    }
  }
}

</script>
<style lang="scss"></style>
