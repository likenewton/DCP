<template>
  <div class="dictionary-container">
    <el-card class="clearfix" shadow="never" v-loading="loadData">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name:'addversions'})" :disabled="!pageAuthBtn.DCP_dictionary_ADD">添加版本</el-button>
        </el-button-group>
        <el-form :inline="true" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="versions" @input="filterData" placeholder="版本过滤"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row :gutter="20" v-shadow:[collapse] class="collapse-wrapper" :style="{height: maxCollapseHeight + 'px'}">
        <div class="nodata" v-show="dictionary.length === 0 || !pageAuthBtn.DCP_dictionary_LIST">暂无数据</div>
        <el-col :span="8" v-if="dictionary.length > 0" v-for="(group, index) in pageAuthBtn.DCP_dictionary_LIST && dictionaryDispatch" :key="index">
          <el-collapse accordion @change="handleCollapseChange" v-if="group.length > 0">
            <el-collapse-item v-for="(dir, index) in group" :key="index">
              <template slot="title">
                <span class="bold" style="color: #666">{{dir[0].versionName}}</span>
                <span v-if="dir[0].versionType === 0" class="bold" style="color: #666">&nbsp;[硬件]</span>
                <span v-if="dir[0].versionType === 1" class="bold" style="color: #666">&nbsp;[软件]</span>
              </template>
              <el-timeline>
                <el-timeline-item v-for="(item, index) in dir" :key="index">
                  <span class="text">{{item.versionName}}</span>
                  <el-button type="text" @click="editorVersions(item)" :disabled="!pageAuthBtn.DCP_dictionary_EDITOR"> [修改]</el-button>
                  <el-button v-if="index === 0" type="text" @click="upgradeVersions(item)" :disabled="!pageAuthBtn.DCP_dictionary_UPGRADE"> [升级]</el-button>
                  <i v-if="index === 0" class="news iconfont-zuixinnew3"></i>
                </el-timeline-item>
              </el-timeline>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import Api from 'assets/js/api.js'
export default {
  data() {
    return {
      collapse: true,
      versions: '', // 默认查询版本
      maxCollapseHeight: Api.UNITS.maxTableHeight(259),
      boxShadow: '',
      dictionary: [], // 总数据
      dictionaryDispatch: [[], [], []]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loadData = true
      _axios.send({
        method: 'get',
        url: _axios.ajaxAd.getListVersion,
        done: ((res) => {
          this.loadData = false
          this.dictionary = res.data || []
          this.dispatch(this.dictionary)
        }),
        fail: () => {
          this.loadData = true
        }
      })
    },
    handleCollapseChange() {
      // 这里之所有要加一个定时器是因为要在动画结束之后再进行shadow指令计算
      setTimeout(() => {
        this.collapse = !this.collapse
      }, 250)
    },
    filterData() {
      if (this.versions) {
        let dictionary = this.dictionary.filter((v) => {
          return v[0].versionName.indexOf(this.versions) > -1
        })
        this.dispatch(dictionary)
      } else {
        this.dispatch(this.dictionary)
      }
      return false
    },
    dispatch(data) {
      this.dictionaryDispatch = [[], [], []]
      data.forEach((v, i) => {
        let group = i % 3
        this.dictionaryDispatch[group].push(v)
      })
    },
    editorVersions(item) {
      this.$router.push({
        name: 'addversions',
        query: {
          type: 'update',
          id: item.id
        }
      })
    },
    upgradeVersions(item) {
      this.$router.push({
        name: 'addversions',
        query: {
          type: 'upgrade',
          id: item.id
        }
      })
    }
  }
}

</script>
<style lang="scss">
.dictionary-container {
  .collapse-wrapper {
    overflow: auto;

    .nodata {
      display: flex;
      height: 100%;
      font-size: 14px;
      color: #ccc;
      align-items: center;
      justify-content: center;
    }

    .el-collapse {
      border: 1px solid $borderColor;

      .el-collapse-item__header,
      .el-collapse-item__wrap {
        background: transparent;
        border: 0;
      }

      .el-collapse-item__content {
        padding-bottom: 0;
      }

      .el-collapse-item {
        padding: 0 10px;

        &:nth-child(odd) {
          background: rgba(0, 0, 0, 0.03);
        }

        .el-timeline {
          padding: 18px 5px 0;

          .el-timeline-item {
            padding-bottom: 1px;
          }

          .text {
            display: inline-block;
            margin-top: -10px;
          }

          button {
            margin-top: -13px;
            margin-left: 0;
          }

          .news {
            position: absolute;
            top: -13px;
            margin-left: 4px;
            color: $danger;
            font-size: 25px;
          }
        }
      }
    }
  }

}

</style>
