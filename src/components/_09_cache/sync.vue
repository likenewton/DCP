<template>
  <div class="sync-container">
    <el-card class="clearfix" shadow="never">
      <el-row v-for="(item, index) in sync" :key="index">
        <el-button size="small" type="primary" @click="syncs(item)">{{item.text}}</el-button>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      sync: [{
        text: '汽车品牌数据同步',
        msg: '确认同步所有汽车品牌数据至缓存？',
        url: ''
      }, {
        text: '频道类型缓存同步',
        msg: '确认同步所有频道类型数据至缓存？',
        url: ''
      }, {
        text: '平台资源缓存同步',
        msg: '确认同步所有资源数据至缓存？',
        url: ''
      }, {
        text: '平台资源子集缓存同步',
        msg: '确认同步所有资源子集数据至缓存？',
        url: ''
      }, {
        text: '黑词缓存同步',
        msg: '确认同步所有黑词数据至缓存？',
        url: ''
      }, {
        text: '平台资讯缓存同步',
        msg: '确认同步所有资讯数据至缓存？',
        url: ''
      }, {
        text: '操作记录缓存同步',
        msg: '确认同步所有资源操作记录至缓存？',
        url: ''
      }, {
        text: '资讯评论缓存同步',
        msg: '确认同步所有资讯评论至缓存？',
        url: ''
      }, {
        text: '资源评论缓存同步',
        msg: '确认同步所有资源评论至缓存？',
        url: ''
      }]
    }
  },
  methods: {
    syncs(data) {
      this.showCfmBox({
        message: data.msg,
        cb: () => {
          this.showMsgBox({
            type: 'success',
            message: '操作成功！'
          })
        }
      })
    }
  }
}

</script>
<style lang="scss">
.sync-container {
  .el-row {
    margin-bottom: 20px;
  }
}

</style>
