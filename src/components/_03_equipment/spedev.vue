<template>
  <div class="spedev-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.batchName" @keyup.enter.native="searchData" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.organCode" filterable clearable placeholder="请选择机构" @change="searchData">
              <el-option v-for="(item, index) in orgs" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="formInline.createStartTime" :picker-options="startDatePicker" type="date" value-format="timestamp" placeholder="创建时间（起）" @change="searchData"></el-date-picker> -
            <el-date-picker v-model="formInline.createEndTime" :picker-options="endDatePicker" type="date" value-format="timestamp" placeholder="创建时间（止）" @change="searchData"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="batchSn" label="批次号" sortable="custom" width="130"></el-table-column>
          <el-table-column prop="batchName" label="名称" sortable="custom"></el-table-column>
          <el-table-column prop="organCode" label="机构" sortable="custom">
            <template slot-scope="scope">{{scope.row.organCode | valueToLabel(orgs)}}</template>
          </el-table-column>
          <el-table-column prop="batchShipper" label="发货人" sortable="custom" width="100"></el-table-column>
          <el-table-column prop="outTime" label="出货时间" sortable="custom" width="110">
            <template slot-scope="scope">{{scope.row.outTime | formatDate('yyyy-mm-dd')}}</template>
          </el-table-column>
          <el-table-column prop="pickerName" label="提货人" sortable="custom" width="100"></el-table-column>
          <el-table-column prop="timeAdded" label="创建时间" sortable="custom" width="153">
            <template slot-scope="scope">{{scope.row.timeAdded | formatDate}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button type="text" class="text_warning" @click="importSNVisible = true">导入</el-button>
              <el-button type="text" class="text_danger" @click="$router.push({name:'devExcepLog', query:{batchId: scope.row.batchId}})">异常记录</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 导入特殊设备SN号 -->
    <el-dialog title="导入特殊设备SN号" @close="close" :visible.sync="importSNVisible" width="700px" :close-on-click-modal="false">
      <div slot>
        <el-form ref="uploadForm" :inline="false" size="small" label-width="110px">
          <el-form-item label="请选择文件：">
            <v-upload ref="upload" :format="['.txt']"></v-upload>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="submitForm">导入</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      importSNVisible: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      Api.UNITS.getListData({
        vue: this,
        url: _axios.ajaxAd.getSpeDevList
      })
    },
    // === 文件导入 start ===
    submitForm() { // 提交表单上传文件
      if (this.$refs.upload.fileList.length === 0) {
        this.showMsgBox({
          message: '请选择要上传的文件！'
        })
      } else {
        console.log(this.$refs.upload.fileList)
      }
    },
    close() {
      // 关闭弹框的时候清掉选择上传的文件
      this.$refs.upload.clearFileList()
    },
    // === 文件导入 end ===
  },
  computed: {
    startDatePicker() {
      return Api.UNITS.startDatePicker(this, this.formInline.createEndTime)
    },
    endDatePicker() {
      return Api.UNITS.endDatePicker(this, this.formInline.createStartTime)
    },
  }
}

</script>
<style lang="scss"></style>
