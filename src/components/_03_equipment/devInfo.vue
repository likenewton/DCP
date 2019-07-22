<template>
  <div class="devInfo-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="warning">导出</el-button>
          <el-button size="small" type="warning">ADAS导出</el-button>
          <el-button size="small" type="warning" @click="importADASvisible = true">ADAS导入</el-button>
          <el-button size="small" type="primary">生成语音报表</el-button>
          <el-button size="small" type="primary">生成蓝牙报表</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="设备SN号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column fixed="left" prop="org_id" label="机构" sortable="custom"></el-table-column>
          <el-table-column prop="" label="设备品牌" sortable="custom"></el-table-column>
          <el-table-column prop="" label="设备名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="设备SN号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="设备ICCID" sortable="custom"></el-table-column>
          <el-table-column prop="" label="设备IMEI" sortable="custom"></el-table-column>
          <el-table-column prop="" label="上网卡IMSI" sortable="custom"></el-table-column>
          <el-table-column prop="" label="硬件版本" sortable="custom"></el-table-column>
          <el-table-column prop="" label="软件版本" sortable="custom"></el-table-column>
          <el-table-column prop="" label="车主姓名" sortable="custom"></el-table-column>
          <el-table-column prop="" label="车主电话" sortable="custom"></el-table-column>
          <el-table-column prop="" label="车牌号码" sortable="custom"></el-table-column>
          <el-table-column prop="" label="车辆型号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="失效状态" sortable="custom"></el-table-column>
          <el-table-column prop="" label="ADAS开关" sortable="custom"></el-table-column>
          <el-table-column prop="" label="ADAS更新时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="激活时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="更新时间" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="操作" min-width="440">
            <template slot-scope="scope">
              <el-button type="text" @click="$router.push({name:'devRecord'})">设备记录</el-button>
              <el-button type="text" @click="$router.push({name:'directive'})">下发指令</el-button>
              <el-button type="text" @click="showBandCar">绑定的客户</el-button>
              <el-button type="text" @click="showLifeTrack">生命轨迹</el-button>
              <el-button type="text" class="text_danger" @click="disabled">失效</el-button>
              <el-button type="text" class="text_success" @click="switchADAS">开启ADAS</el-button>
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
          <el-form :inline="false" :model="formInline" size="small" label-width="90px">
            <el-form-item label="设备SN号">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="ICCID">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="车主姓名">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="车主电话">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="车牌号码">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="设备IMEI">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="机构列表">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="设备品牌">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="绑定状态">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="ADAS开关">
              <el-select filterable clearable placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="软件版本">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="激活时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="激活时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="激活时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="更新时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="更新时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item label="ADAS时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="ADAS时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="ADAS时间（止）"></el-date-picker>
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
    <el-dialog title="ADAS导入" @close="close" :visible.sync="importADASvisible" width="700px" :close-on-click-modal="false">
      <div slot>
        <el-form ref="uploadForm" :model="uploadForm" :rules="rules" :inline="false" size="small" label-width="110px">
          <el-form-item label="请选择文件：">
            <v-upload ref="upload" :format="['.txt']"></v-upload>
          </el-form-item>
          <el-form-item prop="status" label="ADAS开关：">
            <el-radio-group v-model="uploadForm.status">
              <el-radio :label="1">开</el-radio>
              <el-radio :label="0">关</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="导入日志：">
            <el-input type="textarea" placeholder="请输入导入日志" rows="4"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="submitForm('uploadForm')">导入</el-button>
      </div>
    </el-dialog>
    <!-- 查看设备生命轨迹信息 -->
    <el-dialog title="查看设备生命轨迹信息" :visible.sync="trackInfoVisible" width="1200px" :close-on-click-modal="false">
      <div slot>
        <el-table :data="lifeTrack.data" @sort-change="handleSortChange" :max-height="winHeight/2.2" border resizable size="mini">
          <el-table-column prop="a" label="事件类型" sortable="custom"></el-table-column>
          <el-table-column prop="" label="事件时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="事件描述" sortable="custom" show-overflow-tooltip></el-table-column>
          <el-table-column prop="" label="原值" sortable="custom"></el-table-column>
          <el-table-column prop="" label="现值" sortable="custom"></el-table-column>
          <el-table-column prop="" label="记录员" sortable="custom"></el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="trackInfoVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 查看绑定的客户 -->
    <el-dialog title="绑定该机车的客户" :visible.sync="bandCarVisible" width="1200px" :close-on-click-modal="false">
      <div slot>
        <el-table :data="bandCar.data" @sort-change="handleSortChange" :max-height="winHeight/2.2" border resizable size="mini">
          <el-table-column prop="a" label="客户名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="客户电话" sortable="custom"></el-table-column>
          <el-table-column prop="" label="设备SN号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="绑定时间" sortable="custom"></el-table-column>
          <el-table-column label="是否解绑" sortable="custom">
            <template slot-scope="scope">
              <el-button type="text" @click="unbind">解绑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="bandCarVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      importADASvisible: false,
      trackInfoVisible: false,
      bandCarVisible: false,
      uploadForm: {
        status: 1
      },
      // 列表
      list: {
        data: [{
          org_id: 'a'
        }],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      // 生命轨迹
      lifeTrack: {
        data: [{
          a: 'a'
        }],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      bandCar: {
        data: [{
          a: 'b'
        }],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      rules: {
        status: [{
          required: true,
          message: '请选择ADAS开关'
        }]
      }
    }
  },
  mounted() {

  },
  methods: {
    getData() {},
    close() {
      // 关闭弹框的时候清掉选择上传的文件
      this.$refs.upload.clearFileList()
      this.uploadForm = {
        status: 1
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          if (this.$refs.upload.fileList.length === 0) {
            this.showMsgBox({
              message: '请选择要上传的文件！'
            })
          } else {
            console.log(this.$refs.upload.fileList)
          }
        } else {
          Api.UNITS.showMsgBox()
          return false;
        }
      })
    },
    // 设备失效
    disabled() {
      this.showCfmBox({
        message: '确定使设备失效吗？',
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功'
          })
        }
      })
    },
    // ADAS切换
    switchADAS() {
      this.showCfmBox({
        message: '确定开启ADAS吗？',
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功'
          })
        }
      })
    },
    // 解除绑定
    unbind() {
      this.showCfmBox({
        message: '取消绑定将清除所有数据,您确定要执行吗？',
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功'
          })
        }
      })
    },
    // 查看生命轨迹
    showLifeTrack() {
      this.trackInfoVisible = true
    },
    // 查看绑定该机车的客户
    showBandCar() {
      this.bandCarVisible = true
    }
  }
}

</script>
<style lang="scss"></style>
