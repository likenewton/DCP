module.exports = {
  // 侧边栏菜单配置数据(最高权限)
  asideData: [{
    title: '设备管理',
    icon: 'iconfont-shebei',
    name: 'equipment'
  }, {
    title: '汽车管理',
    icon: 'iconfont-qiche',
    name: 'car'
  }, {
    title: '缓存同步',
    icon: 'iconfont-lucenehuancun',
    name: 'cache'
  }, {
    title: '流量卡管理',
    icon: 'iconfont-cardb',
    name: 'card'
  }, {
    title: '配置管理',
    icon: 'iconfont-xitongshezhi',
    name: 'config'
  }],
  // 菜单中的二级页面
  operData: [{
    title: {
      create: '新增品牌信息',
      update: '修改品牌信息'
    },
    name: 'addbrand'
  }, {
    title: {
      create: '新增批次信息',
      update: '修改批次信息'
    },
    name: 'addbatch'
  }, {
    title: {
      create: '新增汽车品牌',
      update: '修改汽车品牌'
    },
    name: 'addcarbrand'
  }, {
    title: {
      create: '新增汽车型号',
      update: '修改汽车型号'
    },
    name: 'addcarmodel'
  }, {
    title: {
      create: '新增核心应用升级配置信息',
      update: '修改核心应用升级配置信息'
    },
    name: 'addcoreapp'
  }, {
    title: '下发指令',
    name: 'directive'
  }, {
    title: '设备记录',
    name: 'devRecord'
  }, {
    title: '批次导入明细',
    name: 'batImpDetail'
  }, {
    title: '汽车型号',
    name: 'carmodel'
  }, {
    title: '核心应用依赖信息查询',
    name: 'relyinfo'
  }],
  token: 'iov-token',
  // 分页器公共配置项
  pageSizes: [10, 20, 40, 60],
}
