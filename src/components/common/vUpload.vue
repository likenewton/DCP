<template>
  <div class="v-upload-container">
    <el-upload ref="upload" action="" :on-change="uploadHandleChange" :on-exceed="fileExceed" :before-remove="beforeRemove" :with-credentials="true" :limit="1" :file-list="fileList" :auto-upload="false">
      <el-button type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip" v-if="format_upload__tip">
        <span>{{format_upload__tip}}</span>
        <span v-if="hasPreview" class="text_primary pointer" @click="showPriview"> (格式预览)</span>
      </div>
    </el-upload>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'

export default {
  name: 'vUpload',
  data() {
    return {
      fileList: []
    }
  },
  props: {
    format: {
      type: Array,
      default: []
    },
    size: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER // 单位：M
    },
    hasPreview: {
      type: Boolean,
      default: false
    }
  },
  created() {

  },
  methods: {
    beforeRemove(file) {
      this.fileList = []
    },
    // 上传文件超出上限的钩子
    fileExceed() {
      this.showMsgBox({
        type: 'error',
        message: '一次最多只能上传一个文件，如想修改上传的文件请先删除原文件！'
      })
    },
    // 处理上传文件(同时上传一个文件)
    uploadHandleChange(file, fileList) {
      this.fileList = fileList
      let type = file.name
      let size = file.size / (1024 * 1024) // 单位：M
      if (!this.validatorFileType(type)) {
        this.showMsgBox({
          type: 'error',
          message: '上传文件格式不正确！'
        })
        this.fileList = []
        return false
      }
      if (!this.validatorFileSize(size)) {
        this.showMsgBox({
          type: 'error',
          message: `上传文件大小不能超过${Api.UNITS.formatFlowUnit(this.size, 0)}！`
        })
        this.fileList = []
        return false
      }
    },
    // 验证上传的文件是否符合要求
    validatorFileType(type) { // 格式验证
      if (this.format.length === 0) return true
      let valid = false
      this.format.forEach((v) => {
        let ergexp = new RegExp("\\" + v + "$")
        if (ergexp.test(type)) {
          valid = true
        }
      })
      return valid
    },
    validatorFileSize(size) { // 大小验证
      if (!this.size || (size <= this.size)) return true
    },
    clearFileList() {
      this.fileList = []
    },
    showPriview() {
      this.$emit('showPriview')
    }
  },
  computed: {
    format_upload__tip() {
      if (this.format.length === 0 && !this.size) {
        return false
      }
      let str = ''
      if (this.format.length > 0) {
        str = '只能上传'
        this.format.forEach((v) => {
          str += v + ' '
        })
        str += '格式文件'
      }
      if (this.size) {
        if (this.format.length > 0) str += '、'
        str += `大小不能超过${Api.UNITS.formatFlowUnit(this.size, 0)}`
      }
      return str
    }
  }
}

</script>
<style lang="scss"></style>
