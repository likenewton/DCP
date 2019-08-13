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
      if (!this.validatorFileType(type)) {
        this.showMsgBox({
          type: 'error',
          message: `${this.format_upload__tip}！`
        })
        this.fileList = []
        return false
      }
    },
    // 验证上传的文件是否符合要求
    validatorFileType(type) {
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
    clearFileList() {
      this.fileList = []
    },
    showPriview() {
      this.$emit('showPriview')
    }
  },
  computed: {
    format_upload__tip() {
      if (this.format.length === 0) {
        return false
      }
      let str = '只能上传'
      this.format.forEach((v) => {
        str += v + ' '
      })
      return str += '格式文件'
    }
  }
}

</script>
<style lang="scss"></style>
