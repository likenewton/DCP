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
  token: 'iov-token-DCP',
  sortable: false,
  loadIcon: 'el-icon-loading',
  loadBg: 'rgba(0, 0, 0, 0.7)',
  // 分页器公共配置项
  pageSizes: [10, 20, 40, 60],
  isStripe: true,
  // 范围
  shortcutsRange: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      console.log([start, end])
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近半年',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一年',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
      picker.$emit('pick', [start, end]);
    }
  }],
  // 单个时间
  shortcuts: [{
    text: '一周前',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', date);
    }
  }, {
    text: '一月前',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', date);
    }
  }, {
    text: '三月前',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', date);
    }
  }, {
    text: '半年前',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 180);
      picker.$emit('pick', date);
    }
  }, {
    text: '一年前',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
      picker.$emit('pick', date);
    }
  }]
}
