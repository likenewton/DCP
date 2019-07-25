<template>
  <el-dropdown class="v-drapdown" @command="handleCommand">
    <el-button type="primary" size="small">
      同步缓存<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>缓存地址：10.0.3.53:6379</el-dropdown-item>
      <el-dropdown-item>缓存地址：192.168.3.240:6379</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: 'vDropdown',
  data() {
    return {}
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
      console.log(command)
    }
  }
}

</script>
<style lang="scss"></style>
