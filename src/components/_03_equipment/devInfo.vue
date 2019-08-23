<template>
  <div class="devInfo-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="warning" @click="exportExcel('exportDeviceData')">导出</el-button>
          <el-button size="small" type="warning" @click="exportExcel('exportADASInfo')">ADAS导出</el-button>
          <el-button size="small" type="warning" @click="importADASvisible = true">ADAS导入</el-button>
          <el-button size="small" type="primary" @click="createExcel('语音')">生成语音报表</el-button>
          <el-button size="small" type="primary" @click="createExcel('蓝牙')">生成蓝牙报表</el-button>
          <el-button size="small" type="primary" @click="$refs.vCheckbox.openChoice()">展示列表</el-button>
        </el-button-group>
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
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="机构：">
                  <span>{{props.row.organName}}</span>
                </el-form-item>
                <el-form-item label="设备品牌：">
                  <span>{{props.row.deviceBrandName}}</span>
                </el-form-item>
                <el-form-item label="设备名称：">
                  <span>{{props.row.deviceName}}</span>
                </el-form-item>
                <el-form-item label="产品型号：">
                  <span>{{props.row.proName}}</span>
                </el-form-item>
                <el-form-item label="设备SN号：">
                  <span>{{props.row.deviceSn}}</span>
                </el-form-item>
                <el-form-item label="设备ICCID：">
                  <span>{{props.row.deviceIccId}}</span>
                </el-form-item>
                <el-form-item label="设备IMEI：">
                  <span>{{props.row.deviceImei}}</span>
                </el-form-item>
                <el-form-item label="上网卡IMSI：">
                  <span>{{props.row.deviceImsi}}</span>
                </el-form-item>
                <el-form-item label="设硬件版本：">
                  <span>{{props.row.deviceVersion}}</span>
                </el-form-item>
                <el-form-item label="软件版本：">
                  <span>{{props.row.softVersion}}</span>
                </el-form-item>
                <el-form-item label="车主姓名：">
                  <span>{{props.row.autocarName}}</span>
                </el-form-item>
                <el-form-item label="车主电话：">
                  <span>{{props.row.autocarTel}}</span>
                </el-form-item>
                <el-form-item label="车牌号码：">
                  <span>{{props.row.autocarTag}}</span>
                </el-form-item>
                <el-form-item label="车辆型号：">
                  <span>{{props.row.modelName}}</span>
                </el-form-item>
                <el-form-item label="失效状态：">
                  <span>{{props.row.isDisable === 1 ? '失效' : '可用'}}</span>
                </el-form-item>
                <el-form-item label="ADAS开关：">
                  <span>{{props.row.adasOnoff === 0 ? '关' : '开'}}</span>
                </el-form-item>
                <el-form-item label="ADAS更新时间：">
                  <span>{{props.row.adasUpdateTime | formatDate}}</span>
                </el-form-item>
                <el-form-item label="激活时间：">
                  <span>{{props.row.timeAdded | formatDate}}</span>
                </el-form-item>
                <el-form-item label="更新时间：">
                  <span>{{props.row.timeLast | formatDate}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('organCode')" prop="organCode" label="机构" sortable="custom" min-width="150">
            <template slot-scope="scope">{{scope.row.organName}}</template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('deviceBrandId')" prop="deviceBrandId" label="设备品牌" sortable="custom" min-width="100">
            <template slot-scope="scope">{{scope.row.deviceBrandName}}</template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('deviceName')" prop="deviceName" label="设备名称" sortable="custom" min-width="100"></el-table-column>
          <el-table-column v-if="checkedData.includes('proName')" prop="proName" label="产品型号" sortable="custom" min-width="85"></el-table-column>
          <el-table-column prop="deviceSn" label="设备SN号" sortable="custom" min-width="153"></el-table-column>
          <el-table-column v-if="checkedData.includes('deviceIccId')" prop="deviceIccId" label="设备ICCID" sortable="custom" width="182"></el-table-column>
          <el-table-column v-if="checkedData.includes('deviceImei')" prop="deviceImei" label="设备IMEI" sortable="custom" min-width="150"></el-table-column>
          <el-table-column v-if="checkedData.includes('deviceImsi')" prop="deviceImsi" label="上网卡IMSI" sortable="custom" min-width="150"></el-table-column>
          <el-table-column v-if="checkedData.includes('deviceVersion')" prop="deviceVersion" label="硬件版本" sortable="custom" min-width="150"></el-table-column>
          <el-table-column v-if="checkedData.includes('softVersion')" prop="softVersion" label="软件版本" sortable="custom" min-width="150"></el-table-column>
          <el-table-column v-if="checkedData.includes('autocarName')" prop="autocarName" label="车主姓名" sortable="custom" min-width="90"></el-table-column>
          <el-table-column v-if="checkedData.includes('autocarTel')" prop="autocarTel" label="车主电话" sortable="custom" min-width="110"></el-table-column>
          <el-table-column v-if="checkedData.includes('autocarTag')" prop="autocarTag" label="车牌号码" sortable="custom" min-width="90"></el-table-column>
          <el-table-column v-if="checkedData.includes('modelName')" prop="modelName" label="车辆型号" sortable="custom" min-width="90"></el-table-column>
          <el-table-column v-if="checkedData.includes('isDisable')" prop="isDisable" label="失效状态" sortable="custom" min-width="85">
            <template slot-scope="scope">
              <span class="text_danger" v-if="scope.row.isDisable === 1">失效</span>
              <span class="text_success" v-else-if="scope.row.isDisable === 0">可用</span>
            </template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('adasOnoff')" prop="adasOnoff" label="ADAS开关" sortable="custom" min-width="95">
            <template slot-scope="scope">
              <span class="text_danger" v-if="scope.row.adasOnoff===0">关</span>
              <span class="text_success" v-else-if="scope.row.adasOnoff===1">开</span>
            </template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('adasUpdateTime')" prop="adasUpdateTime" label="ADAS更新时间" sortable="custom" min-width="153">
            <template slot-scope="scope">{{scope.row.adasUpdateTime | formatDate}}</template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('timeAdded')" prop="timeAdded" label="激活时间" sortable="custom" min-width="153">
            <template slot-scope="scope">{{scope.row.timeAdded | formatDate}}</template>
          </el-table-column>
          <el-table-column v-if="checkedData.includes('timeLast')" prop="timeLast" label="更新时间" sortable="custom" min-width="153">
            <template slot-scope="scope">{{scope.row.timeLast | formatDate}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-dropdown split-button type="primary" size="mini" @click="$router.push({name:'devRecord',query: {deviceId:scope.row.deviceId}})" @command="handleCommand">
                设备记录
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{command: 'directive', data: scope.row}">下发指令</el-dropdown-item>
                  <el-dropdown-item :command="{command: 'bandCustomer', data: scope.row}">绑定的客户</el-dropdown-item>
                  <el-dropdown-item :command="{command: 'lifetrack', data: scope.row}">生命轨迹</el-dropdown-item>
                  <el-dropdown-item :command="{command: 'disabled', data: scope.row}">
                    <span v-if="scope.row.isDisable === 1">有效</span>
                    <span v-else-if="scope.row.isDisable === 0">失效</span>
                  </el-dropdown-item>
                  <el-dropdown-item :command="{command: 'adas', data: scope.row}">
                    <span v-if="scope.row.adasOnoff===0">开启ADAS</span>
                    <span v-else-if="scope.row.adasOnoff===1">关闭ADAS</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
            <el-form-item label="设备IMEI">
              <el-input v-model="formInline.deviceImei" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="机构列表">
              <el-select filterable clearable placeholder="请选择" v-model="formInline.organCode" @change="getBrands(formInline.organCode)">
                <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备品牌">
              <el-select filterable clearable placeholder="请选择" v-model="formInline.deviceBrandId">
                <el-option v-for="(item, index) in brands" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="绑定状态">
              <el-select v-model="formInline.bindStatus" filterable clearable placeholder="请选择">
                <el-option label="未绑定" :value="1"></el-option>
                <el-option label="已绑定" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="ADAS开关">
              <el-select filterable clearable placeholder="请选择" v-model="formInline.adasOnoff">
                <el-option label="关" :value="0"></el-option>
                <el-option label="开" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="软件版本">
              <el-input v-model="formInline.softVersion" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="激活时间">
              <el-date-picker v-model="formInline.timeAddedbegin" :picker-options="startDatePicker_1" type="date" value-format="yyyy-MM-dd" placeholder="激活时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.timeAddedend" :picker-options="endDatePicker_1" type="date" value-format="yyyy-MM-dd" placeholder="激活时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-date-picker v-model="formInline.startTimeLast" :picker-options="startDatePicker_2" type="date" value-format="yyyy-MM-dd" placeholder="更新时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.endTimeLast" :picker-options="endDatePicker_2" type="date" value-format="yyyy-MM-dd" placeholder="更新时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item label="ADAS时间">
              <el-date-picker v-model="formInline.startAdasUpdateTime" :picker-options="startDatePicker_3" type="date" value-format="yyyy-MM-dd" placeholder="ADAS时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.endAdasUpdateTime" :picker-options="endDatePicker_3" type="date" value-format="yyyy-MM-dd" placeholder="ADAS时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- ADAS导入 -->
    <el-dialog title="ADAS导入" @close="ADASclose" :visible.sync="importADASvisible" width="700px" :close-on-click-modal="false">
      <div slot>
        <el-form ref="uploadForm" :model="uploadForm" :rules="rules" :inline="false" size="small" label-width="110px">
          <el-form-item label="请选择文件：">
            <v-upload ref="upload" :format="['.txt']" :hasPreview="true" @showPriview="showPriview"></v-upload>
          </el-form-item>
          <el-form-item prop="flag" label="ADAS开关：">
            <el-radio-group v-model="uploadForm.flag">
              <el-radio :label="1">开</el-radio>
              <el-radio :label="0">关</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('uploadForm')">保存</el-button>
            <el-button type="warning" @click="resetForm('uploadForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 查看设备生命轨迹信息 -->
    <el-dialog title="查看设备生命轨迹信息" :visible.sync="lifeTrack.lifeTrackVisible" width="1200px" :close-on-click-modal="false">
      <div slot>
        <el-table :data="lifeTrack.data" :max-height="winHeight/2.2" border resizable size="mini" v-loading="lifeTrack.loadData">
          <el-table-column prop="eventType" label="事件类型" sortable="custom">
            <template slot-scope="scope">{{scope.row.eventTypeName}}</template>
          </el-table-column>
          <el-table-column prop="eventTime" label="事件时间" sortable="custom">
            <template slot-scope="scope">{{scope.row.eventTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="eventDesc" label="事件描述" sortable="custom" show-overflow-tooltip></el-table-column>
          <el-table-column prop="oldValue" label="原值" sortable="custom"></el-table-column>
          <el-table-column prop="newValue" label="现值" sortable="custom"></el-table-column>
          <el-table-column prop="recorder" label="记录员" sortable="custom"></el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="lifeTrack.lifeTrackVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 查看绑定的客户 -->
    <el-dialog title="绑定该机车的客户" :visible.sync="bandCustomer.bandCustomerVisible" width="1200px" :close-on-click-modal="false">
      <div slot>
        <el-table :data="bandCustomer.data" :max-height="winHeight/2.2" border resizable size="mini" v-loading="bandCustomer.loadData">
          <el-table-column prop="customerName" label="客户名称" sortable="custom"></el-table-column>
          <el-table-column prop="customerTelephone" label="客户电话" sortable="custom"></el-table-column>
          <el-table-column prop="deviceSn" label="设备SN号" sortable="custom"></el-table-column>
          <el-table-column prop="timeAdded" label="绑定时间" sortable="custom">
            <template slot-scope="scope">{{scope.row.timeAdded | formatDate}}</template>
          </el-table-column>
          <el-table-column label="是否解绑" sortable="custom">
            <template slot-scope="scope">
              <el-button type="text" @click="unbind(scope)">解绑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="bandCustomer.bandCustomerVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 列表展示 -->
    <v-checkbox ref="vCheckbox" :checkboxData="checkboxData" :defaultData="defaultData" @checkSave="checkSave"></v-checkbox>
    <!-- 上传文件结果 -->
    <v-result ref="result" :resultData="resultData" label="设备SN号" tProp="sn"></v-result>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  name: 'devInfo',
  data() {
    return {
      exportType: {
        exportDeviceData: _axios.ajaxAd.exportDeviceData,
        exportADASInfo: _axios.ajaxAd.exportADASInfo
      },
      keepAlive: true,
      importADASvisible: false,
      brands: [], // 设备品牌是挂载在机构下的，选择机构需重新加载品牌
      resultData: [], // 文件上传的结果
      uploadForm: {
        flag: 1
      },
      formInline: {
        organCode: Api.UNITS.getQuery('organCode'),
        deviceBrandId: Api.UNITS.getQuery('brandId'),
      },
      // === 列表显示控制静态数据 ===
      checkboxData: [{
        label: '机构',
        value: 'organCode'
      }, {
        label: '设备品牌',
        value: 'deviceBrandId'
      }, {
        label: '设备名称',
        value: 'deviceName'
      }, {
        label: '产品型号',
        value: 'proName'
      }, {
        label: '设备ICCID',
        value: 'deviceIccId'
      }, {
        label: '设备IMEI',
        value: 'deviceImei'
      }, {
        label: '上网卡IMSI',
        value: 'deviceImsi'
      }, {
        label: '设硬件版本',
        value: 'deviceVersion'
      }, {
        label: '软件版本',
        value: 'softVersion'
      }, {
        label: '车主姓名',
        value: 'autocarName'
      }, {
        label: '车主电话',
        value: 'autocarTel'
      }, {
        label: '车牌号码',
        value: 'autocarTag'
      }, {
        label: '车辆型号',
        value: 'modelName'
      }, {
        label: '失效状态',
        value: 'isDisable'
      }, {
        label: 'ADAS开关',
        value: 'adasOnoff'
      }, {
        label: 'ADAS更新时间',
        value: 'adasUpdateTime'
      }, {
        label: '激活时间',
        value: 'timeAdded'
      }, {
        label: '更新时间',
        value: 'timeLast'
      }],
      defaultData: ['organCode', 'proName', 'deviceIccId', 'softVersion', 'isDisable', 'adasOnoff', 'timeLast'],
      checkedData: [],
      // === 绑定的客户 ===
      bandCustomer: {
        data: [],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
        loadData: true,
        bandCustomerVisible: false,
      },
      sort_bandCustomer: {},
      // === 生命轨迹 ===
      lifeTrack: {
        data: [],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
        loadData: true,
        lifeTrackVisible: false,
      },
      sort_lifeTrack: {},
      // === 表单验证规则 ===
      rules: {
        flag: [{
          required: true,
          message: '请选择ADAS开关'
        }]
      }
    }
  },
  mounted() {
    this.list.data = []
    this.checkGet()
    this.getData()
    this.getBrands()
  },
  activated() {
    if (!this.keepAlive) {
      this.formInline = {
        organCode: Api.UNITS.getQuery('organCode'),
        deviceBrandId: Api.UNITS.getQuery('brandId'),
      }
      this.checkGet()
      this.getData()
      this.getBrands()
    }
  },
  methods: {
    // === 设备查询 start ===
    getData() { // 获取主列表数据
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getDeviceList
      })
    },
    getBrands(organCode) { // 获取品牌下拉列表
      // 品牌是挂载到机构下的，所以在选中机构的时候选中的品牌要清空
      let formInline = this.formInline
      if (organCode) delete formInline.deviceBrandId
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getBrands,
        params: { organCode: organCode || this.formInline.organCode },
        done: ((res) => {
          this.brands = res.data || []
        })
      })
    },
    simpleSearchData() { // 简单查询
      let deviceSn = this.formInline.deviceSn
      this.formInline = {
        deviceSn,
        organCode: Api.UNITS.getQuery('organCode'),
        deviceBrandId: Api.UNITS.getQuery('brandId')
      }
      this.searchData()
    },
    resetData() { // 高级查询-重置
      this.list.currentPage = 1
      this.formInline = {
        organCode: Api.UNITS.getQuery('organCode'),
        deviceBrandId: Api.UNITS.getQuery('brandId')
      }
      this.sort = {}
      this.$refs.listTable.clearSort()
      this.$refs.listTable.clearSelection()
      this.getData()
      this.getBrands()
    },
    handleCommand(para) { // 操作-下拉菜单功能
      if (para.command === 'directive') { // 下发指令
        this.$router.push({
          name: 'directive',
          query: {
            deviceSn: para.data.deviceSn
          }
        })
      } else if (para.command === 'bandCustomer') { // 查看绑定的客户
        this.bandCustomer.bandCustomerVisible = true
        this.getBindCustomer({ deviceId: para.data.deviceId })
      } else if (para.command === 'lifetrack') { // 查看生命轨迹
        this.lifeTrack.lifeTrackVisible = true
        this.getTrackList({ deviceId: para.data.deviceId })
      } else if (para.command === 'disabled') { // 启用与失效
        this.showCfmBox({
          message: `确定${para.data.isDisable === 0 ? '使设备失效' : '恢复设备有效'}吗？`,
          cb: () => {
            _axios.send({
              method: 'get',
              url: _axios.ajaxAd.toUpdIsDisable,
              params: {
                deviceId: para.data.deviceId,
                isDisable: para.data.isDisable === 1 ? 0 : 1
              },
              done: ((res) => {
                this.getData()
                setTimeout(() => {
                  this.showMsgBox({
                    type: 'success',
                    message: '操作成功'
                  })
                }, 150)
              })
            })
          }
        })
      } else if (para.command === 'adas') { // adas开关
        this.showCfmBox({
          message: `确定${para.data.adasOnoff === 0 ? '开启ADAS' : '关闭ADAS'}吗？`,
          cb: () => {
            _axios.send({
              method: 'get',
              url: _axios.ajaxAd.toUpdAdasStatus,
              params: {
                deviceId: para.data.deviceId,
                status: para.data.adasOnoff === 1 ? 0 : 1
              },
              done: ((res) => {
                this.getData()
                setTimeout(() => {
                  this.showMsgBox({
                    type: 'success',
                    message: '操作成功'
                  })
                }, 150)
              })
            })
          }
        })
      }
    },
    exportExcel(type) { // 导出设备信息
      if (!this.formInline.timeAddedbegin) {
        this.showMsgBox({
          message: '高级查询->激活时间（起）不能为空'
        })
        return
      }
      if (!this.formInline.timeAddedend) {
        this.showMsgBox({
          message: '高级查询->激活时间（止）不能为空'
        })
        return
      }
      Api.UNITS.exportExcel(this.exportType[type], this.formInline)
    },
    showPriview() { // 展示.txt模板文件
      Api.UNITS.showTxT('ADAS.txt', '1060111802001035\r\n1060111802001036\r\n1060111802001037')
    },
    // === 设备查询 end ===
    // === 操作 start ===
    getBindCustomer(params = {}) { // 获取绑定客户
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getBindCustomer,
        data: params,
        list: 'bandCustomer',
        sort: 'sort_bandCustomer'
      })
    },
    unbind(scope) { // 绑定用户解除绑定
      this.showCfmBox({
        message: '取消绑定将清除所有数据,您确定要执行吗？',
        cb: () => {
          _axios.send({
            method: 'get',
            url: _axios.ajaxAd.unBindByDeviceId,
            params: {
              deviceId: scope.row.deviceId,
              customerId: scope.row.customerId
            },
            done: ((res) => {
              this.getData()
              this.bandCustomer.bandCustomerVisible = false
              setTimeout(() => {
                this.showMsgBox({
                  type: 'success',
                  message: '操作成功'
                })
              }, 150)
            })
          })
        }
      })
    },
    getTrackList(params = {}) { // 获取生命轨迹
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getTrackList,
        data: params,
        list: 'lifeTrack',
        sort: 'sort_lifeTrack'
      })
    },
    // === 操作 end ===
    // === ADAS导入 start ===
    submitForm(formName) { // ADAS导入提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          if (this.$refs.upload.fileList.length === 0) {
            this.showMsgBox({
              message: '请选择要上传的文件！'
            })
          } else {
            this.formData = new FormData()
            this.formData.append('file', this.$refs.upload.fileList[0].raw)
            this.formData.append('flag', this.uploadForm.flag)
            _axios.send({
              method: 'post',
              url: _axios.ajaxAd.importAdas,
              data: this.formData,
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              done: ((res) => {
                this.resultData = res.data || []
                this.importADASvisible = false
                this.$refs.result.show()
                setTimeout(() => {
                  this.showMsgBox({
                    type: 'success',
                    message: '操作成功！'
                  })
                }, 150)
              })
            })
          }
        } else {
          Api.UNITS.showMsgBox()
          return false;
        }
      })
    },
    resetForm(formName) { // ADAS导入重置
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.$refs.upload.clearFileList()
    },
    ADASclose() { // ADAS上传弹窗关闭
      this.$refs.upload.clearFileList()
      this.uploadForm = {
        flag: 1
      }
    },
    // === ADAS导入 end ===
    // === 列表选择性展示 start ===
    checkSave(data) { // v-checkbox组件保存后回调
      localStorage.setItem(`__${this.routeName}Check__`, JSON.stringify(data))
      this.checkGet()
    },
    checkGet() {
      let checkedData = JSON.parse(localStorage.getItem(`__${this.routeName}Check__`))
      if (checkedData) this.checkedData = checkedData
      else this.checkedData = this.defaultData
      this.getData()
    },
    // === 列表选择性展示 end ===
    createExcel(type) { // 生成报表-语音、蓝牙
      if (!this.formInline.timeAddedbegin || !this.formInline.timeAddedend) {
        this.showMsgBox({
          title: '温馨提示',
          message: '激活起、止时间不能为空！'
        })
      } else if (this.formInline.timeAddedend > new Date().getTime()) {
        this.showMsgBox({
          title: '温馨提示',
          message: '当前时间不能早于激活(止)时间！'
        })
      } else {
        this.showCfmBox({
          message: `确定生成${type}报表吗？`,
          cb: () => {
            this.loading = this.$loading({
              lock: true,
              text: `${type}报表生成中...`,
              spinner: Api.STATIC.loadIcon,
              background: Api.STATIC.loadBg
            })
            _axios.send({
              method: 'get',
              url: type === '语音' ? _axios.ajaxAd.addSpeechForms : _axios.ajaxAd.addBlueToothForms,
              params: {
                timeAddedbegin: this.formInline.timeAddedbegin,
                timeAddedend: this.formInline.timeAddedend
              },
              done: () => {
                this.loading.close()
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

  },
  computed: {
    // === 激活时间约束 ===
    startDatePicker_1() {
      return Api.UNITS.startDatePicker(this, this.formInline.timeAddedend)
    },
    endDatePicker_1() {
      return Api.UNITS.endDatePicker(this, this.formInline.timeAddedbegin)
    },
    // === 更新时间约束 ===
    startDatePicker_2() {
      return Api.UNITS.startDatePicker(this, this.formInline.endTimeLast)
    },
    endDatePicker_2() {
      return Api.UNITS.endDatePicker(this, this.formInline.startTimeLast)
    },
    // === ADAS时间约束 ===
    startDatePicker_3() {
      return Api.UNITS.startDatePicker(this, this.formInline.endAdasUpdateTime)
    },
    endDatePicker_3() {
      return Api.UNITS.endDatePicker(this, this.formInline.startAdasUpdateTime)
    }
  },
  watch: {
    '$route': function(to, from) {
      if (from.name === 'devRecord' && to.name === 'devInfo') {
        // 如果是从devRecord跳转过来的不做任何处理
        this.keepAlive = true
      } else {
        // 如果是从其他页面跳转过来的
        this.keepAlive = false
      }
    }
  }
}

</script>
<style lang="scss">
.devInfo-container {
  .table-expand {
    font-size: 0;

    * {
      line-height: 32px;
    }

    label {
      width: 130px;
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
