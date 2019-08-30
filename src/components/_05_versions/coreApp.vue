<template>
  <div class="coreApp-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name:'addcoreapp'})">添加核心应用配置</el-button>
          <el-button size="small" type="primary" @click="$refs.vCheckbox.openChoice()">展示列表</el-button>
          <v-dropdown></v-dropdown>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.pack_name" @keyup.enter.native="simpleSearchData" placeholder="应用包名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :stripe="isStripe" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="应用包名：">
                  <span>{{props.row.app_name}}</span>
                </el-form-item>
                <el-form-item label="应用名称：">
                  <span>{{props.row.app_name}}</span>
                </el-form-item>
                <el-form-item label="版本名称：">
                  <span>{{props.row.version_name}}</span>
                </el-form-item>
                <el-form-item label="版本代码：">
                  <span>{{props.row.version_code}}</span>
                </el-form-item>
                <el-form-item label="指定ROM版本：">
                  <span>{{props.row.roms}}</span>
                </el-form-item>
                <el-form-item label="配置文件下载地址：">
                  <span>{{props.row.config_url}}</span>
                </el-form-item>
                <el-form-item label="APP下载地址：">
                  <span>{{props.row.url}}</span>
                </el-form-item>
                <el-form-item label="版本描述：">
                  <span>{{props.row.desc}}</span>
                </el-form-item>
                <el-form-item label="指定设备SN：">
                  <span>{{props.row.sn_list}}</span>
                </el-form-item>
                <el-form-item label="创建人：">
                  <span>{{props.row.create_by}}</span>
                </el-form-item>
                <el-form-item label="最后更新人：">
                  <span>{{props.row.update_by}}</span>
                </el-form-item>
                <el-form-item label="创建时间：">
                  <span>{{props.row.create_datetime | formatDate}}</span>
                </el-form-item>
                <el-form-item label="更新时间：">
                  <span>{{props.row.update_datetime | formatDate}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="pack_name" label="应用包名" sortable="custom" min-width="160">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.pack_name.split(',')" :key="index">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('app_name')" prop="app_name" label="应用名称" sortable="custom" min-width="160">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.app_name.split(',')" :key="index">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('version_name')" prop="version_name" label="版本名称" sortable="custom" min-width="160">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.version_name.split(',')" :key="index">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('version_code')" prop="version_code" label="版本代码" sortable="custom" width="88">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.version_code.split(',')" :key="index">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('roms')" prop="roms" label="指定ROM版本" sortable="custom" min-width="260"></el-table-column>
          <el-table-column v-if="checkedData.includes('config_url')" prop="config_url" label="配置文件下载地址" sortable="custom" min-width="300" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.config_url.split(',')" :key="index">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('url')" prop="url" label="APP下载地址" sortable="custom" min-width="300" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.url.split(',')" :key="index">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('desc')" prop="desc" label="版本描述" sortable="custom" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column v-if="checkedData.includes('sn_list')" prop="sn_list" label="指定设备SN" sortable="custom" width="155" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.sn_list.split(',')" :key="index">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('create_by')" prop="create_by" label="创建人" sortable="custom" width="100"></el-table-column>
          <el-table-column v-if="checkedData.includes('update_by')" prop="update_by" label="最后更新人" sortable="custom" width="100"></el-table-column>
          <el-table-column v-if="checkedData.includes('create_datetime')" prop="create_datetime" label="创建时间" sortable="custom" width="153">
            <template slot-scope="scope">{{scope.row.create_datetime | formatDate}}</template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('update_datetime')" prop="update_datetime" label="更新时间" sortable="custom" width="153">
            <template slot-scope="scope">{{scope.row.update_datetime | formatDate}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" class="text_editor" @click="$router.push({name:'addcoreapp',query:{type:'update',plan_id:scope.row.plan_id}})">编辑</el-button>
              <el-button v-if="scope.row.status === 1" type="text" class="text_danger" @click="disabled(scope)">失效</el-button>
              <el-button v-if="scope.row.status === 0" type="text" class="text_danger" @click="disabled(scope)">生效</el-button>
              <el-button type="text" @click="$router.push({name:'addcoreapp',query:{type:'check',plan_id:scope.row.plan_id}})">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table"></el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="750px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="110px">
            <el-form-item label="应用包名">
              <el-input v-model="formInline.pack_name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="应用名称">
              <el-input v-model="formInline.app_name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="版本名称">
              <el-input v-model="formInline.version_name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="版本代码">
              <el-input v-model="formInline.version_code" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 列表展示 -->
    <v-checkbox ref="vCheckbox" :checkboxData="checkboxData" :defaultData="defaultData" @checkSave="checkSave"></v-checkbox>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      // === 列表显示控制静态数据 ===
      checkboxData: [{
        label: '应用名称',
        value: 'app_name'
      }, {
        label: '版本名称',
        value: 'version_name'
      }, {
        label: '版本代码',
        value: 'version_code'
      }, {
        label: '指定ROM版本',
        value: 'roms'
      }, {
        label: '配置文件下载地址',
        value: 'config_url'
      }, {
        label: 'APP下载地址',
        value: 'url'
      }, {
        label: '版本描述',
        value: 'desc'
      }, {
        label: '指定设备SN',
        value: 'sn_list'
      }, {
        label: '创建人',
        value: 'create_by'
      }, {
        label: '最后更新人',
        value: 'update_by'
      }, {
        label: '创建时间',
        value: 'create_datetime'
      }, {
        label: '更新时间',
        value: 'update_datetime'
      }],
      defaultData: ['app_name', 'version_name', 'version_code', 'sn_list', 'create_by', 'update_by'],
      checkedData: [],
    }
  },
  mounted() {
    this.list.data = []
    this.checkGet()
    this.getData()
  },
  methods: {
    simpleSearchData() { // 简单查询
      let pack_name = this.formInline.pack_name
      this.formInline = { pack_name }
      this.searchData()
    },
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getPageAppVerInfo
      })
    },
    // === 列表选择性展示 start ===
    checkSave(data) { // v-checkbox组件保存后回调
      localStorage.setItem(`__${this.routeName}Check__`, JSON.stringify(data))
      this.checkGet()
    },
    checkGet() {
      let checkedData = JSON.parse(localStorage.getItem(`__${this.routeName}Check__`))
      if (checkedData) {
        this.checkedData = checkedData
        this.$nextTick(() => {
          this.$forceUpdate()
        })
      } else {
        this.checkedData = this.defaultData
      }
    },
    // === 列表选择性展示 end ===
    disabled(scope) {
      this.showCfmBox({
        message: scope.row.status === 1 ? '确定失效吗？' : '确定生效吗？',
        cb: () => {
          this.loading = this.$loading({
            lock: true,
            text: scope.row.status === 1 ? '失效中...' : '生效中...',
            spinner: Api.STATIC.loadIcon,
            background: Api.STATIC.loadBg
          })
          _axios.send({
            method: 'get',
            url: _axios.ajaxAd.appVerInfoChangeState,
            params: {
              plan_id: scope.row.plan_id,
              status: scope.row.status === 0 ? 1 : 0
            },
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
  }
}

</script>
<style lang="scss">
.coreApp-container {
  .table-expand {
    font-size: 0;

    * {
      line-height: 32px;
    }

    label {
      width: 150px;
      color: #99a9bf;
      text-align: right;
    }

    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;

    }
  }
}

</style>
