<template>
  <div class="record_info_container">
    <span class="item">
      <span>机构：</span>
      <span>云智易联</span>
    </span>
    <span class="item">
      <span>设备SN号：</span>
      <span>1060111802001035</span>
    </span>
    <span class="item">
      <span>车主姓名：</span>
      <span>Newton</span>
    </span>
    <span class="item">
      <span>车牌号码：</span>
      <span>湘D165452</span>
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
