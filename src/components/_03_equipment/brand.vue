<template>
  <div class="brand-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name: 'addbrand'})">添加品牌</el-button>
        </el-button-group>
        <el-form :inline="true" :model="formInline" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-select filterable clearable placeholder="状态"></el-select>
          </el-form-item>
          <el-form-item>
            <el-select filterable clearable placeholder="所属机构"></el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="warning" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table ref="listTable" :data="list.data" @sort-change="handleSortChange" :max-height="maxTableHeight" border resizable size="mini">
          <el-table-column prop="a" label="品牌名称" sortable="custom"></el-table-column>
          <el-table-column prop="" label="分销商" sortable="custom"></el-table-column>
          <el-table-column prop="" label="所属机构" sortable="custom"></el-table-column>
          <el-table-column prop="" label="状态" sortable="custom"></el-table-column>
          <el-table-column label="操作" width="245">
            <template slot-scope="scope">
              <el-button type="text" class="text_editor" @click="$router.push({name:'addbrand',query:{type:'update'}})">编辑</el-button>
              <el-button type="text" class="text_danger" @click="disabled">失效</el-button>
              <el-button type="text" class="text_primary" @click="$router.push({name:'devInfo'})">设备详情</el-button>
              <el-button type="text" class="text_warning" @click="importDevVisible = true">导入设备</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.currentPage" :page-sizes="pageSizes" :page-size="list.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="list.total" class="clearfix pagination-table">
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 导入设备 -->
    <el-dialog title="导入设备SN号" @close="close" :visible.sync="importDevVisible" width="700px" :close-on-click-modal="false">
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
      importDevVisible: false,
      list: {
        data: [{
          a: 'test'
        }],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      }
    }
  },
  mounted() {

  },
  methods: {
    getData() {},
    disabled() {
      this.showCfmBox({
        message: '确定使记录失效吗？',
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功'
          })
        }
      })
    },
    // 提交表单上传文件
    submitForm() {
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
    }
  }
}

</script>
<style lang="scss"></style>
