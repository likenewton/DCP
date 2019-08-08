import { token } from './static.js'

class AXIOS {
  constructor(para) {
    this.data = {
      method: 'get',
      params: null,
      timeout: 60000,
      data: null, // 请求体所带的参数
      done: null, // 接口请求成功回调函数
    }
    // 实例化时初始的参数
    this.constData = Object.assign(this.data, para)

    // ajax请求地址
    this.ajaxAd = {
      // 登录
      isLogin: '/mpk_app/api/sso/isLogin',
      getLoginInfo: '/mpk_app/api/sso/getLoginInfo',
      getAuthMenu: '/mpk_app/api/sso/menus',
      getAuthButtons: '/mpk_app/api/sso/buttons',
      // drapdown
      getOrgs: '/mpk_app/api/deviceBrand/queryCooperateOrganList',
      getBrands: '/mpk_app/api/deviceBrand/getDeviceBrandList',
      // list
      getDeviceBrand: '/mpk_app/api/deviceBrand/pageDeviceBrand',
      getDeviceList: '/mpk_app/api/device/devicelistByOrg',
      getBindCustomer: '/mpk_app/api/device/bindCustomer', // 查看绑定的客户
      // detail
      detialUpDevBrand: '/mpk_app/api/deviceBrand/toUpdateDeviceBrand', // 品牌修改查询
      getDeviceRecord: '/mpk_app/api/device/deviceRecord', // 设备记录
      getTrackList: '/mpk_app/api/deviceLifeCycle/queryDeviceLifeList', // 设备查询-生命轨迹
      // form
      updateDeviceBrand: '/mpk_app/api/deviceBrand/updateDeviceBrand', // 品牌修改
      addDeviceBrand: '/mpk_app/api/deviceBrand/addDeviceBrand',  //品牌新增
      directivePush: '/mpk_app/api/messagePush/push', // 设备查询-指令推送
      // diabled
      brandChangeState: '/mpk_app/api/deviceBrand/changeState',
      toUpdIsDisable: '/mpk_app/api/device/toUpdIsDisable',  // 设备查询 有效、失效
      toUpdAdasStatus: '/mpk_app/api/device/toUpdAdasStatus', // 设备查询 adas 开关
      // export
      exportDeviceData: '/mpk_app/api/device/exportDeviceData', // 导出设备信息
      // 功能
      unBindByDeviceId: '/mpk_app/api/device/unBindByDeviceId', // 设备查询-解除绑定
    }
  }

  send(para) {
    let data = Object.assign({}, this.constData, para)
    data.headers = para.headers || {}
    data.headers[token] = localStorage.getItem(token) || ''

    axios({
      method: data.method,
      url: data.url,
      data: data.data,
      params: data.params,
      timeout: data.timeout,
      headers: data.headers
    }).then(res => {
      // 这里要根据状态码来对不同的响应状态做处理
      if (res.data.status === 401) {
        // 如果没有登录要记录跳转次数，大于5次就不跳转了
        let loginCount = localStorage.getItem('loginCount') || '0'
        if (loginCount - 0 <= 5) {
          localStorage.setItem('loginCount', ++loginCount + '')
          sessionStorage.setItem('target_href', location.href)
          // 未登录状态跳转登录页
          location.replace(res.data.redirectUrl)
        } else {
          Vue.prototype.$notify.error({
            title: '错误',
            message: 'token校验异常'
          })
          localStorage.setItem('loginCount', '0')
          sessionStorage.removeItem('target_href')
        }
      } else {
        localStorage.setItem('loginCount', '0')
        // status === 0 为正常返回, 表示已经登录了
        if (res.data.status === 0) {
          return data.done && data.done(res.data)
        } else {
          data.fail && data.fail()
          // 除了 status === 0 其他消息都通过boxMsg通知用户
          Vue.prototype.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
        // status === 400代表表单验证失败，需要进行处理
        if (res.data.status === 400) {
          return data.done && data.done(res.data)
        }
      }
    }).catch(error => {
      console.log(error)
      Vue.prototype.$notify.error({
        title: '错误',
        message: '未连接到服务器'
      })
    })
  }

  static init(para) {
    return new AXIOS(para)
  }
}

export default AXIOS
