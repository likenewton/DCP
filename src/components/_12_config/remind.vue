<template>
  <div class="remind-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name:'addremind'})">新增</el-button>
          <v-dropdown></v-dropdown>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-select v-model="formInline.zenCustomerName" filterable clearable placeholder="客户名称" @change="simpleSearchData">
              <el-option v-for="(item, index) in zenCustomerName" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="zenCustomerName" label="客户名称" :sortable="sortable" width="95"></el-table-column>
          <el-table-column prop="zenCustomerPrj" label="客户项目名称" :sortable="sortable" width="110"></el-table-column>
          <el-table-column prop="scenseId" label="适用场景" :sortable="sortable" min-width="120">
            <template slot-scope="scope">{{scope.row.scenseId | valueToLabel(scenseId)}}</template>
          </el-table-column>
          <el-table-column prop="isPrompt" label="是否提醒" :sortable="sortable" width="88">
            <template slot-scope="scope">{{scope.row.isPrompt | valueToLabel(isPrompt)}}</template>
          </el-table-column>
          <el-table-column prop="isClosePromptBox" label="关闭方式" :sortable="sortable" width="88">
            <template slot-scope="scope">{{scope.row.isClosePromptBox | valueToLabel(isClosePromptBox)}}</template>
          </el-table-column>
          <el-table-column prop="selfClosingTime" label="自动关闭时间(s)" :sortable="sortable" width="126" align="right"></el-table-column>k
          <el-table-column prop="tts" label="提醒内容" :sortable="sortable" min-width="132" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tips" label="TTS播报内容" :sortable="sortable" min-width="132" show-overflow-tooltip></el-table-column>
          <el-table-column prop="triggerPeriod" label="触发周期" :sortable="sortable" width="110">
            <template slot-scope="scope">{{scope.row.triggerPeriod | valueToLabel(triggerPeriod)}}</template>
          </el-table-column>
          <el-table-column prop="period" label="显示周期(H,M,S)" :sortable="sortable" width="128">
            <template slot-scope="scope">
              <span v-if="scope.row.period">{{scope.row.period}}</span>
              <span v-else>仅显示一次</span>
            </template>
          </el-table-column>
          <el-table-column prop="speed" label="时速(KM/H)" :sortable="sortable" width="100" align="right"></el-table-column>
          <el-table-column prop="enable" label="状态" :sortable="sortable" width="62">
            <template slot-scope="scope">
              <span class="text_success bold" v-if="scope.row.enable === '0'">启用</span>
              <span class="text_danger bold" v-if="scope.row.enable === '1'">禁用</span>
            </template>
          </el-table-column>
          <el-table-column prop="creater" label="创建人" :sortable="sortable" width="80"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" :sortable="sortable" width="153">
            <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="98">
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
          <el-form :inline="false" :model="formInline" size="small" label-width="110px" v-loading="loadData">
            <el-form-item label="客户名称">
              <el-select v-model="formInline.zenCustomerName" filterable clearable placeholder="请选择">
                <el-option v-for="(item, index) in zenCustomerName" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户项目名称">
              <el-select v-model="formInline.zenCustomerPrj" filterable clearable placeholder="请选择">
                <el-option v-for="(item, index) in zenCustomerPrj" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否提示">
              <el-select v-model="formInline.isPrompt" filterable clearable placeholder="请选择">
                <el-option v-for="(item, index) in isPrompt" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关闭方式">
              <el-select v-model="formInline.isClosePromptBox" filterable clearable placeholder="请选择">
                <el-option v-for="(item, index) in isClosePromptBox" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="场景">
              <el-select v-model="formInline.scenseId" filterable clearable placeholder="请选择">
                <el-option v-for="(item, index) in scenseId" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="触发周期">
              <el-select v-model="formInline.triggerPeriod" filterable clearable placeholder="请选择">
                <el-option v-for="(item, index) in triggerPeriod" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="formInline.enable" filterable clearable placeholder="请选择">
                <el-option v-for="(item, index) in enable" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
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
      zenCustomerName: [],
      zenCustomerPrj: [],
      isPrompt: [{
        label: '关闭提醒',
        value: 0
      }, {
        label: '全屏遮罩',
        value: 1
      }, {
        label: '顶部半屏遮罩',
        value: 2
      }, {
        label: '悬浮小水滴',
        value: 3
      }],
      isClosePromptBox: [{
        label: '不能关闭',
        value: 0
      }, {
        label: '手动',
        value: 1
      }, {
        label: '自动',
        value: 2
      }],
      scenseId: [{
        label: '设备有卡，关闭蜂窝网络离线使用',
        value: '00'
      }, {
        label: '设备使用非云智卡',
        value: '01'
      }, {
        label: '设备未激活绑定或车主解绑',
        value: '02'
      }, {
        label: '设备使用非云智卡',
        value: '03'
      }, {
        label: '设备使用wifi',
        value: '04'
      }, {
        label: '卡流量低于设定阈值区间',
        value: '05'
      }, {
        label: '卡无流量',
        value: '06'
      }, {
        label: '卡套餐有效期低于设定阈值',
        value: '07'
      }, {
        label: '卡套餐到期',
        value: '08'
      }, {
        label: '未实名认证',
        value: '09'
      }, {
        label: '车主上路',
        value: '10'
      }],
      triggerPeriod: [{
        label: '每次设备开机',
        value: '0'
      }, {
        label: '每天首次开机',
        value: '1'
      }],
      enable: [{
        label: '启用',
        value: '0'
      }, {
        label: '禁用',
        value: '1'
      }],
    }
  },
  mounted() {
    this.list.data = []
    this.getData()
    this.getCustomerNameList()
    this.getCustomerProjectNameList()
  },
  methods: {
    simpleSearchData() { // 简单查询
      let zenCustomerName = this.formInline.zenCustomerName
      this.formInline = {
        zenCustomerName
      }
      this.searchData()
    },
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getPageTips
      })
    },
    getCustomerNameList() { // 获取客户名称
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getCustomerNameList,
        done: ((res) => {
          this.zenCustomerName = res.data || {}
        })
      })
    },
    getCustomerProjectNameList() { // 获取项目名称
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getCustomerProjectNameList,
        done: ((res) => {
          this.zenCustomerPrj = res.data || {}
        })
      })
    },
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
