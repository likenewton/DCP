module.exports = {
  // 侧边栏菜单配置数据(最高权限)
  asideData: [{
    title: '内容管理',
    icon: 'iconfont-yewu-tianchong',
    name: 'content'
  }, {
    title: '推送管理',
    icon: 'iconfont-huaban',
    name: 'push'
  }, {
    title: '设备管理',
    icon: 'iconfont-shebei',
    name: 'equipment'
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
    title: '下发指令',
    name: 'directive'
  }, {
    title: '设备记录',
    name: 'devRecord'
  }, {
    title: '批次导入明细',
    name: 'batImpDetail'
  }],
  token: 'iov-token',
  // 分页器公共配置项
  pageSizes: [10, 20, 40, 60],
}
