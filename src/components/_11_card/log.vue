<template>
  <div class="log-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="ICCID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="EVENT_ID" sortable="custom"></el-table-column>
          <el-table-column prop="" label="EVENT_TYPE" sortable="custom"></el-table-column>
          <el-table-column prop="" label="ICCID" sortable="custom"></el-table-column>
          <el-table-column prop="" label="PREVIOUS_IMEI" sortable="custom"></el-table-column>
          <el-table-column prop="" label="CURRENT_IMEI" sortable="custom"></el-table-column>
          <el-table-column prop="" label="创建时间" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="创建时间">
            <template slot-scope="scope">
              <el-button type="text" @click="showLogInfo">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 高级查询 -->
    <el-dialog title="高级查询" :visible.sync="searchVipVisible" width="650px" :close-on-click-modal="false">
      <div slot>
        <div class="searchForm_vip" style="width:100%;overflow: auto">
          <el-form :inline="false" :model="formInline" size="small" label-width="110px">
            <el-form-item label="变更前IMEI">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="变更后IMEI">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="ICCID">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="创建时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="创建时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 查看日志信息 -->
    <el-dialog title="查看日志信息" :visible.sync="logInfoVisible" width="550px" :close-on-click-modal="false" class="check-log">
      <div slot>
        <div style="width:100%;overflow: auto">
          <el-form :model="formInline" size="small" label-width="115px">
            <el-form-item label="event_id：">
              <span>SIM_STATE_CHANGE-73031208718</span>
            </el-form-item>
            <el-form-item label="event_type：">
              <span>SIM_STATE_CHANGE-73031208718</span>
            </el-form-item>
            <el-form-item label="timestamp：">
              <span>SIM_STATE_CHANGE-73031208718</span>
            </el-form-item>
            <el-form-item label="signature：">
              <span>SIM_STATE_CHANGE-73031208718</span>
            </el-form-item>
            <el-form-item label="signature2：">
              <span>gj8HEDn5gzWutNQUOOyl/BWobysYwsVZ6FaEBCwX17w=</span>
            </el-form-item>
            <el-form-item label="data：">
              <el-input type="textarea" rows="4" disabled></el-input>
            </el-form-item>
            <el-form-item label="iccid：">
              <span>SIM_STATE_CHANGE-73031208718</span>
            </el-form-item>
            <el-form-item label="previous_imei：">
              <span>SIM_STATE_CHANGE-73031208718</span>
            </el-form-item>
            <el-form-item label="current_imei：">
              <span>SIM_STATE_CHANGE-73031208718</span>
            </el-form-item>
            <el-form-item label="date_changed：">
              <span>SIM_STATE_CHANGE-73031208718</span>
            </el-form-item>
            <el-form-item label="创建时间：">
              <span>2019-07-22 23:33:13</span>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="textarea" rows="4" disabled></el-input>
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
      logInfoVisible: false,
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
    rebuild() {
      this.showCfmBox({
        message: '确定生成语音报表文件吗？',
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功！'
          })
        }
      })
    },
    close() {
      // 关闭弹框的时候清掉选择上传的文件
      this.$refs.upload.clearFileList()
      this.uploadForm = {
        status: 1
      }
    },
    // 提交表单
    submitForm(formName) {
      if (this.$refs.upload.fileList.length === 0) {
        this.showMsgBox({
          message: '请选择要上传的文件！'
        })
      } else {
        console.log(this.$refs.upload.fileList)
      }
    },
    showLogInfo() {
      this.logInfoVisible = true
    }
  }
}

</script>
<style lang="scss">
.log-container {
  .check-log {
    .el-dialog__body {
      padding: 10px 20px 30px;
      .el-form-item {
        margin-bottom: 5px;
      }
    }

  }
}

</style>
