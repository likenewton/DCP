<template>
  <div class="dictionary-container">
    <el-card class="clearfix" shadow="never">
      <el-row>
        <el-button-group style="margin-bottom: 10px">
          <el-button size="small" type="success" @click="$router.push({name:'addversions'})">添加版本</el-button>
        </el-button-group>
        <el-form :inline="true" class="search-form" size="small" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="versions" @input="filterData" placeholder="版本过滤"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row :gutter="20" v-shadow:[collapse] class="collapse-wrapper" :style="{height: maxCollapseHeight + 'px'}">
        <div class="nodata" v-show="dictionary_0.length === 0">暂无数据</div>
        <el-col :span="8" v-if="dictionary_0.length > 0">
          <el-collapse accordion @change="handleCollapseChange">
            <el-collapse-item :title="dir.data[0].text" v-for="(dir, index) in dictionary_0" :key="index">
              <el-timeline>
                <el-timeline-item v-for="(item, index) in dir.data" :key="index">
                  <span class="text">{{item.text}}</span>
                  <el-button type="text" @click="editorVersions(item)"> [修改]</el-button>
                  <el-button v-if="index === 0" type="text" @click="upgradeVersions(item)"> [升级]</el-button>
                  <i v-if="index === 0" class="news iconfont-zuixinnew3"></i>
                </el-timeline-item>
              </el-timeline>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :span="8" v-if="dictionary_1.length > 0">
          <el-collapse accordion @change="handleCollapseChange">
            <el-collapse-item :title="dir.data[0].text" v-for="(dir, index) in dictionary_1" :key="index">
              <el-timeline>
                <el-timeline-item v-for="(item, index) in dir.data" :key="index">
                  <span class="text">{{item.text}}</span>
                  <el-button type="text" @click="editorVersions(item)"> [修改]</el-button>
                  <el-button v-if="index === 0" type="text" @click="upgradeVersions(item)"> [升级]</el-button>
                  <i v-if="index === 0" class="news iconfont-zuixinnew3"></i>
                </el-timeline-item>
              </el-timeline>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :span="8" v-if="dictionary_2.length > 0">
          <el-collapse accordion @change="handleCollapseChange">
            <el-collapse-item :title="dir.data[0].text" v-for="(dir, index) in dictionary_2" :key="index">
              <el-timeline>
                <el-timeline-item v-for="(item, index) in dir.data" :key="index">
                  <span class="text">{{item.text}}</span>
                  <el-button type="text" @click="editorVersions(item)"> [修改]</el-button>
                  <el-button v-if="index === 0" type="text" @click="upgradeVersions(item)"> [升级]</el-button>
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
      maxCollapseHeight: Api.UNITS.maxTableHeight(258),
      boxShadow: '',
      dictionary: [], // 总数据
      dictionary_0: [], // 分支一
      dictionary_1: [], // 分支二
      dictionary_2: [], // 分支三
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      // 模拟获取数据
      for (var i = 0; i <= 50; i++) {
        this.dictionary.push({
          pid: 1,
          data: [{
            ntid: 1,
            text: `S1.k86m.13_${i}`
          }, {
            ntid: 2,
            text: 'S1.k86m.12'
          }, {
            ntid: 3,
            text: 'S1.k86m.11'
          }, {
            ntid: 4,
            text: 'S1.k86m.10'
          }, {
            ntid: 5,
            text: 'S1.k86m.09'
          }]
        })
      }
      this.dispatch(this.dictionary)
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
          return v.data[0].text.indexOf(this.versions) > -1
        })
        this.dispatch(dictionary)
      } else {
        this.dispatch(this.dictionary)
      }
      return false
    },
    dispatch(data) {
      this.dictionary_0 = []
      this.dictionary_1 = []
      this.dictionary_2 = []
      data.forEach((v, i) => {
        let group = i % 3
        this[`dictionary_${group}`].push(v)
      })
    },
    editorVersions(item) {
      this.$router.push({
        name: 'addversions',
        query: {
          type: 'update'
        }
      })
    },
    upgradeVersions(item) {
      this.$router.push({
        name: 'addversions',
        query: {
          type: 'upgrade'
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
      }

      .el-collapse-item__content {
        padding-bottom: 0;
      }

      .el-collapse-item {
        padding: 0 10px;

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
