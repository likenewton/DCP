import Api from 'assets/js/api.js'
import { mapState, mapMutations } from 'vuex'

// 全局混入对象
export default {
  data() {
    return {
      loadData: true,
      searchVipVisible: false, // 是否显示高级查询dialog
      pageSizes: Api.STATIC.pageSizes,
      maxTableHeight: Api.UNITS.maxTableHeight(),
      list: {
        data: [],
        pagesize: Api.STATIC.pageSizes[2],
        currentPage: 1,
        total: 0,
      },
      sort: {},
      formInline: {},
      winHeight: $(window).height(),
    }
  },
  methods: {
    ...mapMutations([
      'SET_ASIDEFLAG',
      'SET_ASIDECOLLAPSE',
      'SET_DIALOGVISIBLE'
    ]),
    // 操作导航条
    handleSizeChange(val) {
      this.list.pagesize = val
      this.list.currentPage = 1
      this.getData()
    },
    handleCurrentChange(val) {
      this.list.currentPage = val
      this.getData()
    },
    // 处理排序
    handleSortChange(val) {
      Api.UNITS.setSortSearch(val, this)
      this.getData()
    },
    // 表单
    resetData() {
      this.list.currentPage = 1
      this.formInline = {}
      this.sort = {}
      this.$refs.listTable.clearSort()
      this.$refs.listTable.clearSelection()
      this.getData()
    },
    searchData() {
      this.list.currentPage = 1
      this.getData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.formInline = {}
      this.isUpdate && this.getData()
    },
    getColorList: Api.UNITS.getColorList,
    limitNumber: Api.UNITS.limitNumber,
    showMsgBox: Api.UNITS.showMsgBox,
    showCfmBox: Api.UNITS.showCfmBox,
    fixed: Api.UNITS.fixed,
  },
  computed: {
    ...mapState({
      orgs: 'orgs', // 机构/公司列表
      redis: 'redis', // 缓存地址
      authMenu: 'authMenu', // 菜单权限
      authButtons: 'authButtons', // 按钮权限
      asideCollapse: 'asideCollapse', // 侧边栏是否隐藏
      dialogVisible: 'dialogVisible', // 公共dialog
    }),
    routeName() {
      return this.$route.name
    },
    pageAuthBtn() {
      let authArr = this.authButtons[`DCP_${this.routeName}`]
      if (!authArr) return {}
      return authArr
    }
  }
}
