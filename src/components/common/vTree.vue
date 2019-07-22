<template>
  <div class="v-tree">
    <el-tree :data="data" node-key="id" :props="defaultProps" :expand-on-click-node="false" @node-click="handleNodeClick" icon-class="iconfont-wenjianjia">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          <i v-if="node.isLeaf" class="iconfont-wenjian leaf"></i>
          <span class="label">{{ node.label }}</span>
          <span class="el-icon-close"></span>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'vTree',
  data() {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 11,
          label: '二级 1-1',
          children: [{
            id: 111,
            label: '三级 1-1-1'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 21,
          label: '二级 2-1',
          children: [{
            id: 211,
            label: '三级 2-1-1'
          }]
        }, {
          id: 22,
          label: '二级 2-2',
          children: [{
            id: 221,
            label: '三级 2-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {

  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
}

</script>
<style lang="scss">
.v-tree {
  padding: 5px;
  height: 100%;
  border: 1px solid #ccc;

  .el-tree {

    .el-tree-node__expand-icon {
      color: #ff9800;
    }

    .el-tree-node__content {
      .is-leaf {
        display: none;
      }

      .leaf {
        color: $primary;
      }

      .el-icon-close {
        display: none;
        font-weight: bold;
        color: $danger;
        cursor: pointer;
        font-size: 12px;
      }

      &:hover {
        .el-icon-close {
          display: inline-block;
        }
      }
    }

  }
}

</style>
