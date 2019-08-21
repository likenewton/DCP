<template>
  <el-dropdown class="v-drapdown" @command="handleCommand" trigger="click">
    <el-button type="primary" size="small">
      同步缓存<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="-1">一键缓存</el-dropdown-item>
      <el-dropdown-item v-for="(item, index) in redis" :key="index" :command="index">缓存地址：{{item.ip}}:{{item.port}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import Api from 'assets/js/api.js'

export default {
  name: 'vDropdown',
  data() {
    return {
      loading: null
    }
  },
  props: {
    infos: {
      type: Object,
      default: {}
    }
  },
  created() {

  },
  methods: {
    handleCommand(command) {
      this.showCfmBox({
        message: command === -1 ? '确定同步缓存到所有的地址？' : `确定同步缓存到${this.redis[command].ip}:${this.redis[command].port}？`,
        cb: () => {
          this.loading = this.$loading({
            lock: true,
            text: '同步缓存中...',
            spinner: Api.STATIC.loadIcon,
            background: Api.STATIC.loadBg
          })
          _axios.send({
            method: 'get',
            url: _axios.ajaxAd.refresh,
            params: {
              type: this.routeName,
              connectString: this.getParams(command),
            },
            done: () => {
              this.loading.close()
              this.showMsgBox({
                type: 'success',
                message: '缓存同步成功！'
              })
            },
            fail: () => {
              this.loading.close()
            }
          })
        }
      })
    },
    getParams(index) { // 获取缓存同步的参数
      let params = ''
      if (index === -1) {
        this.redis.forEach((v) => {
          params += `${v.ip}&${v.port},`
        })
      } else {
        params = `${this.redis[index].ip}&${this.redis[index].port},`
      }
      return params.substr(0, params.length - 1)
    }
  }
}

</script>
<style lang="scss"></style>
