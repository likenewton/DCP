<template>
  <div class="bluetooth-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name: 'addupinfo'})">添加升级包</el-button>
          <v-dropdown></v-dropdown>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-select filterable clearable placeholder="机构列表"></el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="机构名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="硬件版本号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="软件版本号 " sortable="custom"></el-table-column>
          <el-table-column prop="" label="适合版本号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="版本数量" sortable="custom"></el-table-column>
          <el-table-column prop="" label="升级方式" sortable="custom"></el-table-column>
          <el-table-column prop="" label="发布时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="升级包地址" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="text" @click="$router.push({name:'hisVersions'})">版本</el-button>
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
            <el-form-item label="应用包名">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="应用名称">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="版本名称">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="版本代码">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="指定经销商">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="是否核心应用">
              <el-select filterable clearable placeholder="请选择"></el-select>
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
    disabled() {
      this.showCfmBox({
        message: '确定使记录失效吗？',
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功！'
          })
        }
      })
    },
    deleteSingle() {
      this.showCfmBox({
        message: '确定删除该记录吗？',
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
