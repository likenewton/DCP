import getters from './getter'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
	isLogin: false,
  asideCollapse: false, // 侧边栏折叠状态
  asideFlag: [], // 面包屑地址导航数据，配合static.js中的数据使用，用于同步面包屑与侧边栏在选中菜单层级的一致性
  dialogVisible: false, // 公共dialog是否显示
  authMenu: [], // 授权可以展示的菜单
  authButtons: {}, // 授权页面中的功能按钮权限
  orgs: [],
  redis: [], // 缓存地址列表
  deviceType: [{ label: '车机', value: 0 }, { label: '车镜', value: 1 }],
  iccidCode: [{
    label: '中国移动',
    value: 898600
  }, {
    label: '中国联通',
    value: 898601
  }, {
    label: '中国电信',
    value: 898606
  }, {
    label: '其他',
    value: 800000
  }],
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
