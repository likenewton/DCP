<template>
  <div class="remoteplat-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.deviceSn" @keyup.enter.native="simpleSearchData" placeholder="设备SN号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="simpleSearchData">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="organCode" label="机构" sortable="custom" min-width="165">
            <template slot-scope="scope">{{scope.row.organCode | valueToLabel(orgs)}}</template>
          </el-table-column>
          <el-table-column prop="deviceName" label="设备名称" sortable="custom" width="100"></el-table-column>
          <el-table-column prop="deviceSn" label="设备SN号" sortable="custom" width="155"></el-table-column>
          <el-table-column prop="deviceIccId" label="设备ICCID" sortable="custom" width="182"></el-table-column>
          <el-table-column prop="deviceImei" label="设备IMEI" sortable="custom" width="140"></el-table-column>
          <el-table-column prop="autocarName" label="车主姓名" sortable="custom" width="90"></el-table-column>
          <el-table-column prop="autocarTel" label="车主电话" sortable="custom" width="110"></el-table-column>
          <el-table-column prop="autocarTag" label="车牌号码" sortable="custom" width="110"></el-table-column>
          <el-table-column prop="modelName" label="车辆型号" sortable="custom" width="110"></el-table-column>
          <el-table-column fixed="right" label="操作" width="125">
            <template slot-scope="scope">
              <el-button type="text" class="text_purple" @click="$router.push({name:'devRecord',query: {deviceId:scope.row.deviceId}})">历史记录</el-button>
              <el-button type="text" @click="capture(scope)">抓拍</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="700px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="90px" v-loading="loadData">
            <el-form-item label="设备SN号">
              <el-input v-model="formInline.deviceSn" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="设备IMEI">
              <el-input v-model="formInline.deviceImei" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="ICCID">
              <el-input v-model="formInline.deviceIccId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="车主姓名">
              <el-input v-model="formInline.autocarName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="车主电话">
              <el-input v-model="formInline.autocarTel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="车牌号码">
              <el-input v-model="formInline.autocarTag" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="机构列表">
              <el-select v-model="formInline.organCode" filterable clearable placeholder="请选择">
                <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width: 100%">
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
    return {}
  },
  mounted() {
    this.list.data = []
    this.getData()
  },
  methods: {
    simpleSearchData() { // 简单查询
      let deviceSn = this.formInline.deviceSn
      this.formInline = { deviceSn }
      this.searchData()
    },
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getRemotePlat
      })
    },
    capture(scope) {
      this.showCfmBox({
        message: '确定抓拍吗？',
        cb: () => {
          _axios.send({
            method: 'get',
            url: _axios.ajaxAd.getVideobg,
            params: { deviceId: scope.row.deviceId },
            done: () => {
              setTimeout(() => {
                this.showMsgBox({
                  type: 'success',
                  message: '抓拍成功！'
                })
              }, 150)
            }
          })
        }
      })
    }
  }
}

</script>
<style lang="scss"></style>
