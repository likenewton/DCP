// [chunk2](侧边栏菜单动态路由)
const Asidemenu = r => require.ensure([], () => r(require('@/components/container/index.vue')), 'chunk2')
const Blank = r => require.ensure([], () => r(require('@/components/container/blank.vue')), 'chunk2')

// [chunk4](展示列表,页面里面的二级页面)
const DevRecord = r => require.ensure([], () => r(require('@/components/list/devRecord.vue')), 'chunk4')
const BatImpDetail = r => require.ensure([], () => r(require('@/components/list/batImpDetail.vue')), 'chunk4')
const Carmodel = r => require.ensure([], () => r(require('@/components/list/carmodel.vue')), 'chunk4')
const Relyinfo = r => require.ensure([], () => r(require('@/components/list/relyinfo.vue')), 'chunk4')
const HisVersions = r => require.ensure([], () => r(require('@/components/list/hisVersions.vue')), 'chunk4') // 历史版本
const DevExcepLog = r => require.ensure([], () => r(require('@/components/list/devExcepLog.vue')), 'chunk4') // 设备号异常记录

let listRoute = {
    // 展示列表
    path: '/list',
    name: 'list',
    component: Asidemenu,
    children: [{
      path: 'devRecord',
      name: 'devRecord',
      component: DevRecord
    }, {
      path: 'batImpDetail',
      name: 'batImpDetail',
      component: BatImpDetail
    }, {
      path: 'carmodel',
      name: 'carmodel',
      component: Carmodel
    }, {
      path: 'relyinfo',
      name: 'relyinfo',
      component: Relyinfo
    }, {
      path: 'hisVersions',
      name: 'hisVersions',
      component: HisVersions
    }, {
      path: 'devExcepLog',
      name: 'devExcepLog',
      component: DevExcepLog
    }]
  }

export default listRoute
