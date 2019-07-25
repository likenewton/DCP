<template>
  <div class="bluetooth-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name:'addremind'})">新增</el-button>
          <v-dropdown></v-dropdown>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-select filterable clearable placeholder="客户名称"></el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="客户名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="客户项目名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="适用场景" sortable="custom"></el-table-column>
          <el-table-column prop="" label="是否提醒" sortable="custom"></el-table-column>
          <el-table-column prop="" label="关闭方式" sortable="custom"></el-table-column>
          <el-table-column prop="" label="自动关闭时间(S)" sortable="custom"></el-table-column>
          <el-table-column prop="" label="提醒内容" sortable="custom"></el-table-column>
          <el-table-column prop="" label="TTS播报内容" sortable="custom"></el-table-column>
          <el-table-column prop="" label="触发周期" sortable="custom"></el-table-column>
          <el-table-column prop="" label="显示周期(H,M,S)" sortable="custom"></el-table-column>
          <el-table-column prop="" label="时速(KM/H)" sortable="custom"></el-table-column>
          <el-table-column prop="" label="状态" sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建人" sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建时间" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" class="text_editor" @click="$router.push({name:'addremind',query:{type:'update'}})">修改</el-button>
              <el-button type="text" class="text_danger" @click="close">关闭</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="750px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="110px">
            <el-form-item label="客户名称">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="客户项目名称">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="是否提示">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="关闭方式">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="场景">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="触发周期">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item style="width:100%">
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
    close() {
      this.showCfmBox({
        message: '是否确认关闭配置？关闭后提醒配置将立即失效',
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
