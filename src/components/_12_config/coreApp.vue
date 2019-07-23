<template>
  <div class="bluetooth-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name:'addcoreapp'})">添加核心应用配置</el-button>
          <el-dropdown @command="handleCommand">
            <el-button type="primary" size="small">
              同步缓存<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>缓存地址：10.0.3.53:6379</el-dropdown-item>
              <el-dropdown-item>缓存地址：192.168.3.240:6379</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="应用包名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="应用包名" sortable="custom"></el-table-column>
          <el-table-column prop="" label="应用名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="版本名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="版本代码" sortable="custom"></el-table-column>
          <el-table-column prop="" label="指定ROM版本" sortable="custom"></el-table-column>
          <el-table-column prop="" label="指定经销商" sortable="custom"></el-table-column>
          <el-table-column prop="" label="配置文件下载地址" sortable="custom"></el-table-column>
          <el-table-column prop="" label="APP下载地址" sortable="custom"></el-table-column>
          <el-table-column prop="" label="是否核心服务" sortable="custom"></el-table-column>
          <el-table-column prop="" label="专栏类型" sortable="custom"></el-table-column>
          <el-table-column prop="" label="版本描述" sortable="custom"></el-table-column>
          <el-table-column prop="" label="升级方式" sortable="custom"></el-table-column>
          <el-table-column prop="" label="指定设备SN" sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建人" sortable="custom"></el-table-column>
          <el-table-column prop="" label="最后更新人" sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="更新时间" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="操作" width="230">
            <template slot-scope="scope">
              <el-button type="text" @click="$router.push({name:'addcoreapp',query:{type:'update'}})">修改</el-button>
              <el-button type="text" class="text_danger" @click="disabled">失效</el-button>
              <el-button type="text" @click="$router.push({name:'relyinfo'})">App版本依赖信息</el-button>
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
    handleCommand(command) {
      console.log(command)
    },
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
    }
  }
}

</script>
<style lang="scss"></style>
