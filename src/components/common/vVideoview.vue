<template>
  <!-- 图片预览 -->
  <el-dialog class="video-container" title="视频预览" @close="close" :visible.sync="visible" :width="width">
    <div slot>
      <div class="img-wrapper">
        <video v-if="flag" width="100%" :poster="poster" controls>
          <source :src="src" type="video/mp4">
        </video>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'vVideo',
  data() {
    return {
      src: '',
      poster: '',
      visible: false,
      flag: true
    }
  },
  props: {
    src: {
      type: 'string',
      default: ''
    },
    width: {
      type: 'string',
      default: '500px'
    }
  },
  created() {

  },
  methods: {
    async show(src, poster) {
      this.visible = true
      this.flag = false
      this.$nextTick()
      this.flag = true
      this.src = src
      this.poster = poster
    },
    close() {
      this.visible = false
    }
  }
}

</script>
<style lang="scss">
.video-container {
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
