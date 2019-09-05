<template>
  <div class="resource-container">
    <el-card class="clearfix" shadow="never">
      <el-row :gutter="20">
        <el-col style="height: 600px" :span="4">
          <v-tree></v-tree>
        </el-col>
        <el-col :span="20">
          <el-button-group style="margin-bottom: 10px">
            <el-button size="small" type="primary">上线</el-button>
            <el-button size="small" type="primary">下线</el-button>
            <el-button size="small" type="success">添加图片</el-button>
            <el-button size="small" type="success">添加视频</el-button>
            <el-button size="small" type="success">启用</el-button>
            <el-button size="small" type="danger">停用</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </el-button-group>
          <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
            <el-form-item>
              <el-input @keyup.enter.native="" placeholder="资源名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="">查询</el-button>
              <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
            </el-form-item>
          </el-form>
          <el-row>
            <el-table ref="listTable" :data="list.data" @selection-change="handleSelectionChange" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
              <el-table-column fixed="left" type="selection" min-width="60"></el-table-column>
              <el-table-column prop="" label="示例图" :sortable="sortable"></el-table-column>
              <el-table-column prop="" label="频道" :sortable="sortable"></el-table-column>
              <el-table-column prop="" label="资源类型" :sortable="sortable"></el-table-column>
              <el-table-column prop="" label="资源名称" :sortable="sortable"></el-table-column>
              <el-table-column prop="" label="资源状态" :sortable="sortable"></el-table-column>
              <el-table-column prop="" label="状态" :sortable="sortable"></el-table-column>
              <el-table-column prop="" label="是否静态化" :sortable="sortable"></el-table-column>
              <el-table-column prop="" label="创建时间" :sortable="sortable"></el-table-column>
              <el-table-column prop="" label="操作" :sortable="sortable"></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
            </el-pagination>
          </el-row>
        </el-col>
      </el-row>
      <!-- 高级查询 -->
      <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="700px" :close-on-click-modal="false">
        <div slot>
          <div class="searchForm_vip" style="width:100%;overflow: auto">
            <el-form :inline="false" :model="formInline" size="small" label-width="90px">
              <el-form-item label="资源名称">
                <el-input placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="资源类型">
                <el-select filterable clearable placeholder="请选择"></el-select>
              </el-form-item>
              <el-form-item label="创建时间">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期"></el-date-picker> -
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="warning" @click="resetData">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 选中的数据
      selectData: [],
    }
  },
  mounted() {

  },
  methods: {
    getData() {}
  }
}

</script>
<style lang="scss">
.resource-container {}

</style>
