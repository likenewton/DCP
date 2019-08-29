module.exports = {
  // 侧边栏菜单配置数据(最高权限)
  asideData: [{
    title: '设备管理',
    icon: 'iconfont-shebei',
    name: 'equipment'
  }, {
    title: '版本管理',
    icon: 'iconfont-banbenxinjian',
    name: 'versions'
  }, {
    title: '汽车管理',
    icon: 'iconfont-qiche',
    name: 'car'
  }, {
    title: '运营统计',
    icon: 'iconfont-tongji',
    name: 'statistics'
  }, {
    title: '缓存同步',
    icon: 'iconfont-lucenehuancun',
    name: 'cache'
  }, {
    title: '设备IMEI池',
    icon: 'iconfont-cardb',
    name: 'imei'
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
      update: '修改批次信息',
      check: '查看批次详情信息'
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
      create: '新增核心应用升级配置信息',
      update: '修改核心应用升级配置信息',
      check: '查看核心应用升级配置信息'
    },
    name: 'addcoreapp'
  }, {
    title: {
      create: '新增IP白名单信息',
      update: '修改IP白名单信息'
    },
    name: 'addipwlist'
  }, {
    title: {
      create: '新增提醒策略',
      update: '修改提醒策略'
    },
    name: 'addremind'
  }, {
    title: {
      create: '新增版本信息',
      update: '修改版本信息',
      upgrade: '升级版本信息'
    },
    name: 'addversions'
  }, {
    title: {
      create: '新增升级信息',
      update: '修改升级信息',
    },
    name: 'addupinfo'
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
  }, {
    title: '历史版本',
    name: 'hisVersions'
  }, {
    title: '设备号异常记录',
    name: 'devExcepLog'
  }],
  token: 'iov-token',
  loadIcon: 'el-icon-loading',
  loadBg: 'rgba(0, 0, 0, 0.7)',
  // 分页器公共配置项
  pageSizes: [10, 20, 40, 60],
}
