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
      loading: null,
      sync: [{
        text: '汽车品牌数据同步',
        msg: '确认同步所有汽车品牌数据至缓存？',
        url: _axios.ajaxAd.carBrandsSync2Redis
      }, {
        text: '频道类型缓存同步',
        msg: '确认同步所有频道类型数据至缓存？',
        url: _axios.ajaxAd.categorySync2Redis
      }, {
        text: '平台资源缓存同步',
        msg: '确认同步所有资源数据至缓存？',
        url: _axios.ajaxAd.contentResourceSync2Redis
      }, {
        text: '平台资源子集缓存同步',
        msg: '确认同步所有资源子集数据至缓存？',
        url: _axios.ajaxAd.contentResourceChildSync2Redis
      }, {
        text: '黑词缓存同步',
        msg: '确认同步所有黑词数据至缓存？',
        url: _axios.ajaxAd.dirtwordConfigSync2Redis
      }, {
        text: '平台资讯缓存同步',
        msg: '确认同步所有资讯数据至缓存？',
        url: _axios.ajaxAd.newsSync2Redis
      }, {
        text: '操作记录缓存同步',
        msg: '确认同步所有资源操作记录至缓存？',
        url: _axios.ajaxAd.resourceOperationSync2Redis
      }, {
        text: '资讯评论缓存同步',
        msg: '确认同步所有资讯评论至缓存？',
        url: _axios.ajaxAd.commentNewsSync2Redis
      }, {
        text: '资源评论缓存同步',
        msg: '确认同步所有资源评论至缓存？',
        url: _axios.ajaxAd.commentRecordSync2Redis
      }]
    }
  },
  methods: {
    syncs(data) {
      this.showCfmBox({
        message: data.msg,
        cb: () => {
          this.loading = this.$loading({
            lock: true,
            text: '同步中...',
            spinner: Api.STATIC.loadIcon,
            background: Api.STATIC.loadBg
          })
          _axios.send({
            method: 'get',
            url: data.url,
            done: ((res) => {
              this.loading.close()
              this.showMsgBox({
                type: 'success',
                message: res.msg || '同步成功！'
              })
            }),
            fail: () => {
              this.loading.close()
            }
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
