// [chunk2](侧边栏菜单动态路由)
const Asidemenu = r => require.ensure([], () => r(require('@/components/container/index.vue')), 'chunk2')
const Blank = r => require.ensure([], () => r(require('@/components/container/blank.vue')), 'chunk2')

// [chunk4](展示列表,页面里面的二级页面)
const DevRecord = r => require.ensure([], () => r(require('@/components/list/devRecord.vue')), 'chunk4')
const BatImpDetail = r => require.ensure([], () => r(require('@/components/list/batImpDetail.vue')), 'chunk4')

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
    }]
  }

export default listRoute
