<template>
  <el-dialog class="v-result-container" title="执行结果" :visible.sync="visible" :close-on-click-modal="false" :width="width">
    <div slot>
      <div style="width:100%;overflow: auto">
        <div class="statictics">
          <span>总计：{{statictics.total}}</span>
          <span>成功：{{statictics.success}}</span>
          <span>失败：{{statictics.fail}}</span>
        </div>
        <el-input class="filter" v-model="filterText" :placeholder="label" size="mini"></el-input>
        <el-table :data="data" border resizable size="mini" :max-height="winHeight / 2.2" empty-text="没有符合条件的数据">
          <el-table-column :prop="tProp" :label="label" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="msg" label="执行结果" min-width="200">
            <template slot-scope="scope">
              <span class="text_danger bold" v-if="scope.row.ret === 0">{{scope.row.msg}}</span>
              <span class="text_success bold" v-else-if="scope.row.ret === 1">{{scope.row.msg}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'vResult',
  data() {
    return {
      visible: false,
      filterText: ''
    }
  },
  props: {
    resultData: {
      type: Array,
      default: []
    },
    label: {
      type: 'string',
      default: ''
    },
    tProp: {
      type: 'string',
      default: ''
    },
    width: {
      type: 'string',
      default: '800px'
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    close() {
      this.visible = false
    }
  },
  computed: {
    data() {
      return this.resultData.filter((v) => v[this.tProp].indexOf(this.filterText) > -1)
    },
    statictics() {
      let obj = {
        total: 0,
        success: 0,
        fail: 0
      }
      this.resultData.forEach((v) => {
        obj.total++
        if (v.ret === 1) {
          obj.success++
        } else {
          obj.fail++
        }
      })
      return obj
    }
  }
}

</script>
<style lang="scss">
.v-result-container {
  .el-dialog__body {
    padding-top: 5px;
  }

  .statictics {
    line-height: 28px;
    span {
      display: inline-block;
      padding: 0 5px;
      font-weight: bold;
    }
  }

  .filter {
    position: absolute;
    width: 200px;
    right: 21px;
    top: 50px;
  }
}

</style>
