<template>
  <!-- 图片预览 -->
  <el-dialog class="picview-container" title="图片预览" :visible.sync="picviewVisible" width="500px">
    <div slot>
      <div class="img-wrapper">
        <el-image :src="src" fit="cover"></el-image>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'vPicView',
  data() {
    return {
      picviewVisible: false
    }
  },
  props: {
    src: {
      type: 'string',
      default: ''
    }
  },
  created() {

  },
  methods: {
    showPicView(src) {
      if (src) {
        this.src = src
      }
      this.picviewVisible = true
    },
    closePicView() {
      this.picviewVisible = false
    }
  }
}

</script>
<style lang="scss">
.picview-container {
  .el-dialog__body {
    padding-top: 10px;
  }

  .img-wrapper {
    .el-image {
      width: 100%;
    }

  }
}

</style>
