// [chunk2](侧边栏菜单动态路由)
const Container = r => require.ensure([], () => r(require('@/components/container/index.vue')), 'chunk2')
const Blank = r => require.ensure([], () => r(require('@/components/container/blank.vue')), 'chunk2')
// 内容管理
const Channel = r => require.ensure([], () => r(require('@/components/_01_content/channel.vue')), 'chunk2')
const Resource = r => require.ensure([], () => r(require('@/components/_01_content/resource.vue')), 'chunk2')
// 推送管理
const Multimedia = r => require.ensure([], () => r(require('@/components/_02_push/multimedia.vue')), 'chunk2')
// 设备管理
const Brand = r => require.ensure([], () => r(require('@/components/_03_equipment/brand.vue')), 'chunk2')
const DevInfo = r => require.ensure([], () => r(require('@/components/_03_equipment/devInfo.vue')), 'chunk2')
const Bluetooth = r => require.ensure([], () => r(require('@/components/_03_equipment/bluetooth.vue')), 'chunk2')
const Batch = r => require.ensure([], () => r(require('@/components/_03_equipment/batch.vue')), 'chunk2')
const Voicereport = r => require.ensure([], () => r(require('@/components/_03_equipment/voicereport.vue')), 'chunk2')
const Client = r => require.ensure([], () => r(require('@/components/_03_equipment/client.vue')), 'chunk2')
const Spedev = r => require.ensure([], () => r(require('@/components/_03_equipment/spedev.vue')), 'chunk2')
const Remoteplat = r => require.ensure([], () => r(require('@/components/_03_equipment/remoteplat.vue')), 'chunk2')
const Onpic = r => require.ensure([], () => r(require('@/components/_03_equipment/onpic.vue')), 'chunk2')
const Exinfo = r => require.ensure([], () => r(require('@/components/_03_equipment/exinfo.vue')), 'chunk2')

// 这里面试所有的配置，后续根据权限动态删除一些路由
let menuRoute = {
  path: '/menu',
  name: 'menu',
  component: Container,
  redirect: '/menu/content',
  // 侧边栏菜单
  children: [{
    path: 'content',
    name: 'content',
    component: Blank,
    children: [{
      path: 'channel',
      name: 'channel',
      component: Channel
    }, {
      path: 'resource',
      name: 'resource',
      component: Resource
    }]
  }, {
    path: 'push',
    name: 'push',
    component: Blank,
    children: [{
      path: 'multimedia',
      name: 'multimedia',
      component: Multimedia
    }]
  }, {
    path: 'equipment',
    name: 'equipment',
    component: Blank,
    children: [{
      path: 'brand',
      name: 'brand',
      component: Brand
    }, {
      path: 'devInfo',
      name: 'devInfo',
      component: DevInfo
    }, {
      path: 'bluetooth',
      name: 'bluetooth',
      component: Bluetooth
    }, {
      path: 'batch',
      name: 'batch',
      component: Batch
    }, {
      path: 'voicereport',
      name: 'voicereport',
      component: Voicereport
    }, {
      path: 'client',
      name: 'client',
      component: Client
    }, {
      path: 'spedev',
      name: 'spedev',
      component: Spedev
    }, {
      path: 'remoteplat',
      name: 'remoteplat',
      component: Remoteplat
    }, {
      path: 'onpic',
      name: 'onpic',
      component: Onpic
    }, {
      path: 'exinfo',
      name: 'exinfo',
      component: Exinfo
    }]
  }]
}

export default menuRoute
