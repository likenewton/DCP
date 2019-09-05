<template>
  <div class="bluetooth-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name:'addipwlist'})" :disabled="!pageAuthBtn.DCP_ipwhitelist_ADD">添加Ip白名单配置</el-button>
          <v-dropdown :disabled="!pageAuthBtn.DCP_ipwhitelist_CACHE"></v-dropdown>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.queryIP" @keyup.enter.native="searchData" placeholder="IP"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData" :disabled="!pageAuthBtn.DCP_ipwhitelist_LIST">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="pageAuthBtn.DCP_ipwhitelist_LIST && list.data" @sort-change="handleSortChange" :stripe="isStripe" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="ip" label="IP" :sortable="sortable" min-width="130">
            <template slot-scope="scope">{{scope.row.ip}}</template>
          </el-table-column>
          <el-table-column prop="subnet_mask" label="子网掩码" :sortable="sortable" min-width="130">
            <template slot-scope="scope">{{scope.row.subnet_mask}}</template>
          </el-table-column>
          <el-table-column prop="status" label="状态" :sortable="sortable" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1" class="text_success bold">生效</span>
              <span v-else class="text_danger bold">失效</span>
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="描述" :sortable="sortable" min-width="160"></el-table-column>
          <el-table-column prop="create_by" label="创建人" :sortable="sortable" width="100"></el-table-column>
          <el-table-column prop="create_datetime" label="创建时间" :sortable="sortable" width="160">
            <template slot-scope="scope">{{scope.row.create_datetime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="update_by" label="修改人" :sortable="sortable" width="100"></el-table-column>
          <el-table-column prop="update_datetime" label="修改时间" :sortable="sortable" width="160">
            <template slot-scope="scope">{{scope.row.update_datetime | formatDate}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" class="text_editor" @click="$router.push({name:'addipwlist',query:{type:'update',id:scope.row.id}})" :disabled="!pageAuthBtn.DCP_ipwhitelist_EDITOR">修改</el-button>
              <el-button v-if="scope.row.status === 1" type="text" class="text_danger" @click="disabled(scope)" :disabled="!pageAuthBtn.DCP_ipwhitelist_DISABLED">失效</el-button>
              <el-button v-else-if="scope.row.status === 0" type="text" class="text_success" @click="disabled(scope)" :disabled="!pageAuthBtn.DCP_ipwhitelist_DISABLED">生效</el-button>
              <el-button type="text" class="text_danger" @click="deleteSingle(scope)" :disabled="!pageAuthBtn.DCP_ipwhitelist_DELETE">删除</el-button>
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
        url: _axios.ajaxAd.getIpwhiteInfo
      })
    },
    disabled(scope) {
      this.showCfmBox({
        message: scope.row.status === 1 ? '确定变更状态为失效吗？' : '确定变更状态为有效吗？',
        cb: () => {
          _axios.send({
            method: 'get',
            url: _axios.ajaxAd.toUpdateIPWhiteListStatus,
            params: {
              id: scope.row.id,
              status: scope.row.status === 1 ? 0 : 1
            },
            done: ((res) => {
              this.getData()
              setTimeout(() => {
                this.showMsgBox({
                  type: 'success',
                  message: '操作成功！'
                })
              }, 150)
            })
          })
        }
      })
    },
    deleteSingle(scope) {
      this.showCfmBox({
        message: '确定删除该记录吗？',
        cb: () => {
          _axios.send({
            method: 'get',
            url: _axios.ajaxAd.toDelIPWhiteList,
            params: { id: scope.row.id },
            done: ((res) => {
              this.getData()
              setTimeout(() => {
                this.showMsgBox({
                  type: 'success',
                  message: '操作成功！'
                })
              }, 150)
            })
          })
        }
      })
    }
  }
}

</script>
<style lang="scss"></style>
