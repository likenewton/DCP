import { token } from './static.js'
import { getCookie } from './unit.js'

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
      getArea: '/mpk_app/api/systemArea/querySystemAreaByParentNo', // 获取地区
      queryVersionByOrganCode: '/mpk_app/api/version/queryVersionByOrganCode', // 根据organCode获取硬件版本与软件版本
      queryBatchSnList: '/mpk_app/api/deviceExcepLog/queryBatchSnList', // 特殊设备处理-设备异常记录->获取批次号列表
      pageDeviceMateriel: '/mpk_app/api/deviceMateriel/pageDeviceMateriel', // 批次管理->导入明细
      getRedisJson: '/mpk_app/api/simCardTips/getRedisJson', // 缓存地址
      getCustomerNameList: '/mpk_app/api/simCardTips/customerNameList', // 提醒策略-客户名称
      getCustomerProjectNameList: '/mpk_app/api/simCardTips/customerProjectNameList', // 提醒策略-项目名称
      getCarTypeJson: '/mpk_app/api/ota/getCarTypeJson', // 厂商-车型-车系
      getNewQueryVersionSoftFor: '/mpk_app/api/version/newQueryVersionSoftFor', // 系统升级-新增-合适的版本号
      // list
      getDeviceBrand: '/mpk_app/api/deviceBrand/pageDeviceBrand',
      getDeviceList: '/mpk_app/api/device/devicelistByOrg',
      getBindCustomer: '/mpk_app/api/device/bindCustomer', // 查看绑定的客户
      getDevicebatch: '/mpk_app/api/deviceBatch/listDevicebatch', // 批次管理查询
      getSpeechLog: '/mpk_app/api/speechForms/pageSpeechForms', // 语音报表查询
      getSpeDevList: '/mpk_app/api/deviceBatchSpecial/listDevicebatchSpecial', // 特殊设备处理
      getRemotePlat: '/mpk_app/api/device/remotePlatform', // 远程平台查询
      getOnpicList: '/mpk_app/api/photobg/pagePhotobg', // 开机图片列表
      getPageDeviceExt: '/mpk_app/api/deviceExt/pageDeviceExt', // 设备扩展信息
      getListCustomer: '/mpk_app/api/customer/listCustomer', // 车主管理
      getBlueToothReport: '/mpk_app/api/bluetoothReport/pageBluetoothReport', // 蓝牙报表
      getPhotoHistory: '/mpk_app/api/photo/photoHistory', // 设备记录-历史照片
      getPageDrivingBehavior: '/mpk_app/api/drivingBehavior/pageDrivingBehavior', // 设备记录-驾驶行为
      getLocationHistory: '/mpk_app/api/location/locationHistory', // 设备记录-历史位置
      getVideoHistory: '/mpk_app/api/video/videoHistory', // 设备记录-历史视频
      getIllegalCapture: '/mpk_app/api/violation/illegalCapture', // 设备记录-违章抓拍
      gsensorHistory: '/mpk_app/api/gsensor/gsensorHistory', // 设备记录-历史碰撞
      getObdErrList: '/mpk_app/api/obd/getObdErrList', // 设备记录-OBD列表查询
      getListCarBrands: '/mpk_app/api/carBrands/listCarBrands',  // 汽车品牌管理
      getListCarModels: '/mpk_app/api/carBrands/listCarModels', // 汽车型号查询
      getIpwhiteInfo: '/mpk_app/api/ipwhitelist/ipwhiteInfo', // IP白名单管理
      getPageTips: '/mpk_app/api/simCardTips/pageTips', // 提醒策略缓存地址
      getPageDeviceImei: '/mpk_app/api/deviceImei/pageDeviceImei', // 导入设备IMEI
      getPageJspaerLog: '/mpk_app/api/jspaerLog/pageJspaerLog', // IMEI变更日志
      getPageOta: '/mpk_app/api/ota/pageOta', // 系统升级
      getOtaDetail: '/mpk_app/api/ota/otaDetail', // 系统版本-实例升级
      getPageOtaDevice: '/mpk_app/api/otaDevice/pageOtaDevice', // 设备升级记录
      getListVersion: '/mpk_app/api/version/listVersion', // 版本字典
      getPageAppVerInfo: '/mpk_app/api/appVerInfo/pageAppVerInfo', // 核心应用升级-查询
      getIccidList: '/mpk_app/api/llcar/queryList', // imei-流量卡管理
      getBindActivityReport: '/mpk_app/api/device/bindReport', // 运营统计-绑定激活列表
      // echart
      getIccidReport: '/mpk_app/api/statisticalDeviceIccid/iccidReport', // 运营统计-iccid
      getDeviceActivitisAsyn: '/mpk_app/api/statisticalDeviceActivity/deviceActivitisAsyn', // 运营统计-活跃天数
      getSummaryAsyn: '/mpk_app/api/summary/summaryAsyn', // 运营统计-汇总统计
      getIncreaseReportAsyn: '/mpk_app/api/summary/increaseReportAsyn', // 运营统计-增长率统计
      getBindStatistical: '/mpk_app/api/device/bindStatistical', // 设备绑定统计-趋势
      getBindStatisticalByOrgancode: '/mpk_app/api/device/bindStatisticalByOrgancode', // 设备绑定统计-分布
      // detail
      detialUpDevBrand: '/mpk_app/api/deviceBrand/toUpdateDeviceBrand', // 品牌修改查询
      getDeviceRecord: '/mpk_app/api/device/deviceRecord', // 设备记录
      getTrackList: '/mpk_app/api/deviceLifeCycle/queryDeviceLifeList', // 设备查询-生命轨迹
      deviceBatchDetail: '/mpk_app/api/deviceBatch/deviceBatchDetail', // 查看批次详情
      getDeviceExcepLog: '/mpk_app/api/deviceExcepLog/toExcepDeviceList', // 批次管理-异常记录
      getBindDevice: '/mpk_app/api/customer/bindDevice', // 查询客户绑定的设备
      getObdInfo: '/mpk_app/api/obd/getObdInfo', // 设备查询-OBD参数查询
      getViewJspaerLog: '/mpk_app/api/jspaerLog/viewJspaerLog', // 日志管理-详情
      getOtaHistoryDetail: '/mpk_app/api/ota/otaHistoryDetail', // 系统升级-历史版本-详情
      updateOta: '/mpk_app/api/ota/updateOta', // 系统升级-历史版本-修改
      // form
      updateDeviceBrand: '/mpk_app/api/deviceBrand/updateDeviceBrand', // 品牌修改
      addDeviceBrand: '/mpk_app/api/deviceBrand/addDeviceBrand',  //品牌新增
      directivePush: '/mpk_app/api/messagePush/push', // 设备查询-指令推送
      addDeviceBatch: '/mpk_app/api/deviceBatch/addDeviceBatch', // 添加批次
      toAddCarBrands: '/mpk_app/api/carBrands/toAddCarBrands', // 添加汽车品牌
      toUpdateCarBrands: '/mpk_app/api/carBrands/toUpdateCarBrands', // 修改汽车品牌
      toEditCarBrands: '/mpk_app/api/carBrands/toEditCarBrands', // 修改汽车品牌-查询
      toAddCarModels: '/mpk_app/api/carBrands/toAddCarModels', // 添加汽车型号
      toEditCarModels: '/mpk_app/api/carBrands/toEditCarModels', // 修改汽车型号-查询
      toUpdateCarModels: '/mpk_app/api/carBrands/toUpdateCarModels', // 修改汽车型号
      toAddWilteListInfo: '/mpk_app/api/ipwhitelist/toAddWilteListInfo', // IP白名单新增
      toUpdateWilteList: '/mpk_app/api/ipwhitelist/toUpdateWilteList', // IP白名单修改查询
      toUpdateWilteListInfo: '/mpk_app/api/ipwhitelist/toUpdateWilteListInfo', // IP白名单修改
      toEditVersionPage: '/mpk_app/api/version/toEditVersionPage', // 版本字典-修改查询
      updateVersion: '/mpk_app/api/version/updateVersion', // 版本字典-修改
      addVersion: '/mpk_app/api/version/addVersion', // 版本字典-添加
      toUpdateAppVerInfo: '/mpk_app/api/appVerInfo/toUpdateAppVerInfo', // 核心应用升级-编辑查询
      updateAppVerInfo: '/mpk_app/api/appVerInfo/updateAppVerInfo', // 核心应用升级-编辑
      addAppVerInfo: '/mpk_app/api/appVerInfo/addAppVerInfo', // 核心应用升级-新增
      // diabled
      brandChangeState: '/mpk_app/api/deviceBrand/changeState', // 设备品牌-生效、失效
      toUpdIsDisable: '/mpk_app/api/device/toUpdIsDisable',  // 设备查询 有效、失效
      toUpdAdasStatus: '/mpk_app/api/device/toUpdAdasStatus', // 设备查询 adas 开关
      toUpdateIPWhiteListStatus: '/mpk_app/api/ipwhitelist/toUpdateIPWhiteListStatus', // IP白名单失效有效变更
      updateOtaValid: '/mpk_app/api/ota/updateOtaValid', // 系统升级-历史版本-停用启用
      appVerInfoChangeState:'/mpk_app/api/appVerInfo/appVerInfoChangeState', // 核心应用升级-失效、生效
      // export
      exportDeviceData: '/mpk_app/api/device/exportDeviceData', // 导出设备信息
      exportADASInfo: '/mpk_app/api/device/exportADASInfo', // 设备查询adas导出
      // 功能
      unBindByDeviceId: '/mpk_app/api/device/unBindByDeviceId', // 设备查询-解除绑定
      generateSpeechForms: '/mpk_app/api/speechFormsDetail/generateSpeechForms', // 语音报表重新生成
      generateReportFile: '/mpk_app/api/bluetoothReport/generateReportFile', // 蓝牙报表重新生成
      addSpeechForms: '/mpk_app/api/speechForms/addSpeechForms', // 生成语音报表
      addBlueToothForms: '/mpk_app/api/bluetoothReport/addBluetoothReport', // 生成蓝牙报表
      getVideobg: '/mpk_app/api/device/getVideobg', // 远程平台-抓拍
      getDeviceTrack: '/mpk_app/api/device/deviceTrack', // 设备记录-行车轨迹
      deleteCarBrands: '/mpk_app/api/carBrands/deleteCarBrands', // 删除汽车品牌
      toDelIPWhiteList: '/mpk_app/api/ipwhitelist/toDelIPWhiteList', // 删除Ip白名单
      delIccid: '/mpk_app/api/llcar/toDel', // imei-流量卡管理-删除
      // 上传文件
      importDeviceSn: '/mpk_app/api/deviceBrand/importDeviceSn', // 设备品牌-导入设备
      importAdas: '/mpk_app/api/device/importAdas', // 设备查询-ADAS导入
      importSpecialDeviceSn: '/mpk_app/api/deviceBatchSpecial/importSpecialDeviceSn', // 特殊设备处理-导入
      importDeviceBatchSn: '/mpk_app/api/deviceBatch/importDeviceSn', // 批次管理-导入
      importDeviceImei: '/mpk_app/api/deviceImei/importDeviceImei', // 设备IMEI上传
      importOta: '/mpk_app/api/ota/addOta', // 系统升级-添加升级包
      importIccid: '/mpk_app/api/llcar/upload', // iccid上传
      // 缓存管理
      refresh: '/mpk_app/api/cache/refresh', // 同步缓存
      carBrandsSync2Redis: '/mpk_app/api/cache/carBrandsSync2Redis', // 汽车品牌同步redis
      categorySync2Redis: '/mpk_app/api/cache/categorySync2Redis', // 频道类型同步redis
      commentNewsSync2Redis: '/mpk_app/api/cache/commentNewsSync2Redis', // 资讯评论同步redis
      commentRecordSync2Redis: '/mpk_app/api/cache/commentRecordSync2Redis', // 资源评论同步redis
      contentResourceChildSync2Redis: '/mpk_app/api/cache/contentResourceChildSync2Redis', // 平台资源子集同步redis
      contentResourceSync2Redis: '/mpk_app/api/cache/contentResourceSync2Redis', // 平台资源同步redis
      dirtwordConfigSync2Redis: '/mpk_app/api/cache/dirtwordConfigSync2Redis', // 黑词同步redis
      newsSync2Redis: '/mpk_app/api/cache/newsSync2Redis', // 平台资讯同步redis
      resourceOperationSync2Redis: '/mpk_app/api/cache/resourceOperationSync2Redis', // 操作记录同步redis
    }
  }

  send(para) {
    let data = Object.assign({}, this.constData, para)
    data.headers = para.headers || {}
    data.headers['iov-token'] = getCookie(token) || ''

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
