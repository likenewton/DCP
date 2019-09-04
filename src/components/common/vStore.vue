<template>
  <div class="v-store-container"></div>
</template>
<script>
import { mapActions } from 'vuex'
import Api from 'assets/js/api.js'

// 该组件主要用于vuex 中获取只需获取一次的数据，用于公共的展示
export default {
  name: 'vStore',
  data() {
    return {}
  },
  created() {
    this.getOrgs()
    this.getRedis()
    this.getAuthButtons()
  },
  methods: {
    ...mapActions([
      'getAuthButtons',
      'getRedis',
      'getOrgs',
    ])
  }
}

</script>
<style lang="scss">
.v-store-container {
  position: fixed;
  height: 0;
  width: 0;
}

</style>
