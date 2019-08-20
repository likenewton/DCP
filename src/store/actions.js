import Api from 'assets/js/api.js'
import router from '../router'
import menuRoute from '../router/menuRoute.js'

export default {
  // 菜单权限(同时生成动态路由)
  getAuthMenu(context) {
    _axios.send({
      method: 'get',
      url: '../../static/authMenu.json',
      done: ((res) => {
        context.commit('SET_AUTHMENU', { authMenu: Api.UNITS.getAuthMenu(Api.STATIC.asideData, res.data) }) // 保存菜单数据
        router.addRoutes([Api.UNITS.getMenuRoute(menuRoute, res.data)]) // 生成动态路由
      })
    })
  },
  // 功能按钮权限列表（所有页面）
  getAuthButtons(context) {
    _axios.send({
      method: 'get',
      url: _axios.ajaxAd.getAuthButtons,
      done: ((res) => {
        context.commit('SET_AUTHBUTTONS', { authButtons: res.data }) // 保存功能按钮权限
      })
    })
  },
  // 获取机构类表
  getOrgs(context) {
    _axios.send({
      method: 'get',
      url: _axios.ajaxAd.getOrgs,
      done: ((res) => {
        context.commit('SET_ORGS', { orgs: res.data }) // 保存功能按钮权限
      })
    })
  },
  // 获取缓存地址
  getRedis(context) {
    _axios.send({
      method: 'get',
      url: _axios.ajaxAd.getRedisJson,
      done: ((res) => {
        context.commit('SET_REDIS', { redis: res.data.redisAddress }) // 保存功能按钮权限
      })
    })
  }
}
