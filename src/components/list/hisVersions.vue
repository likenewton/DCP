<template>
  <div class="hisVersion-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input @keyup.enter.native="" placeholder="软件版本号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="primary" @click="searchVipVisible = true">高级查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="软件版本号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="硬件版本号" sortable="custom"></el-table-column>
          <el-table-column prop="" label="强制升级" sortable="custom"></el-table-column>
          <el-table-column prop="" label="发布时间" sortable="custom"></el-table-column>
          <el-table-column prop="" label="升级包地址" sortable="custom"></el-table-column>
          <el-table-column prop="" label="增加时间" sortable="custom"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" class="text_danger" @click="disabled">停用</el-button>
              <el-button type="text" @click="showVersionInfo('查看')">详情</el-button>
              <el-button type="text" class="text_editor" @click="showVersionInfo('修改')">修改</el-button>
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
            <el-form-item label="软件版本号">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="硬件版本号">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="强制升级">
              <el-select filterable clearable placeholder="请选择">
                <el-option label="否" :value="0"></el-option>
                <el-option label="是" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属机构">
              <el-select filterable clearable placeholder="" disabled></el-select>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker v-model="formInline.start" type="datetime" placeholder="发布时间（起）"></el-date-picker> -
              <el-date-picker v-model="formInline.end" type="datetime" placeholder="发布时间（止）"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 查看版本信息 -->
    <el-dialog :title="dialogType + '版本信息'" @close="close" :visible.sync="versionInfoVisible" width="600px" :close-on-click-modal="false" class="check-version">
      <div slot>
        <el-form ref="versionForm" :model="versionForm" :inline="false" size="small" label-width="130px">
          <el-form-item label="机构名称：" class="text">
            <span>云智测试</span>
          </el-form-item>
          <el-form-item label="机构编号：" class="text">
            <span>MS16_GP-F1</span>
          </el-form-item>
          <el-form-item label="硬件版本号：" class="text">
            <span>MS16</span>
          </el-form-item>
          <el-form-item label="软件版本号：" class="text">
            <span>V1.0.2</span>
          </el-form-item>
          <el-form-item label="适合版本号：" class="text">
            <span>MS16_V1.0.1_GP-F1_Release_1554740315</span>
          </el-form-item>
          <el-form-item label="解决方案：" class="text" v-show="dialogType === '查看'">
            <span>车机</span>
          </el-form-item>
          <el-form-item label="车型：" class="text" v-show="dialogType === '查看'">
            <span>s400</span>
          </el-form-item>
          <el-form-item label="版本描述：">
            <el-input v-model="versionForm.version_memo" type="textarea" rows="4" placeholder="请输入" :disabled="dialogType === '查看'"></el-input>
          </el-form-item>
          <el-form-item label="SN列表：">
            <el-input type="textarea" rows="4" placeholder="请输入" :disabled="dialogType === '查看'"></el-input>
          </el-form-item>
          <el-form-item label="是否强制升级：">
            <el-select filterable clearable placeholder="请选择" :disabled="dialogType === '查看'">
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间：" class="text">
            <span>2019-04-10</span>
          </el-form-item>
          <el-form-item label="升级包文件URL：" class="text">
            <span>http://app.yunovo.cn/roms/sdupdate.zip</span>
          </el-form-item>
          <el-form-item label="升级包文件MD5：" class="text">
            <span>3dbe381b6dc3ccc00d2bae128a237974</span>
          </el-form-item>
          <el-form-item label="升级包文件大小：" class="text">
            <span>527525740字节</span>
          </el-form-item>
          <el-form-item style="margin-top: 15px" v-show="dialogType === '修改'">
            <el-button type="primary" @click="submitForm('versionForm')">保存</el-button>
            <el-button type="warning" @click="resetForm('versionForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      versionInfoVisible: false,
      dialogType: '查看',
      list: {
        data: [{
          a: 1
        }],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      versionForm: {}
    }
  },
  mounted() {

  },
  methods: {
    getData() {},
    getVersionFormData() {},
    // 设备失效
    disabled() {
      this.showCfmBox({
        message: '确定停用吗？',
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功'
          })
        }
      })
    },
    showVersionInfo(type) {
      this.dialogType = type
      this.versionInfoVisible = true
      this.getVersionFormData()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过

        } else {
          Api.UNITS.showMsgBox()
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.versionForm = {}
      this.getVersionFormData()
    },
  }
}

</script>
<style lang="scss">
.hisVersion-container {
  .check-version {
    .el-dialog {
      margin-top: 10vh !important;
    }

    .el-dialog__body {
      padding: 10px 20px 30px;

      .el-form-item.text {
        margin-bottom: 5px;
      }
    }

  }
}

</style>
