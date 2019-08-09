<template>
  <div class="record_info_container">
    <span class="item">
      <span>机构：</span>
      <span>{{infos.organCode | valueToLabel(orgs)}}</span>
    </span>
    <span class="item">
      <span>设备SN号：</span>
      <span>{{infos.deviceSn}}</span>
    </span>
    <span class="item">
      <span>车主姓名：</span>
      <span>{{infos.autocarName}}</span>
    </span>
    <span class="item">
      <span>车牌号码：</span>
      <span>{{infos.autocarTag}}</span>
    </span>
  </div>
</template>
<script>
export default {
  name: 'vRecordInfo',
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

  }
}

</script>
<style lang="scss">
.record_info_container {
  font-size: 14px;
  margin-bottom: 10px;

  .item {
    display: inline-block;
    margin: 5px 14px;
  }

}

</style>
