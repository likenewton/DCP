// [chunk2](侧边栏菜单动态路由)
const Container = r => require.ensure([], () => r(require('@/components/container/index.vue')), 'chunk2')
const Blank = r => require.ensure([], () => r(require('@/components/container/blank.vue')), 'chunk2')
// 设备管理03
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
// 版本管理05
const Dictionary = r => require.ensure([], () => r(require('@/components/_05_versions/dictionary.vue')), 'chunk2')
const SysUpgrade = r => require.ensure([], () => r(require('@/components/_05_versions/sysUpgrade.vue')), 'chunk2')
const DevUprecorde = r => require.ensure([], () => r(require('@/components/_05_versions/devUprecorde.vue')), 'chunk2')
const CoreApp = r => require.ensure([], () => r(require('@/components/_05_versions/coreApp.vue')), 'chunk2')
// 字典库管理06
const Carbrand = r => require.ensure([], () => r(require('@/components/_06_car/carbrand.vue')), 'chunk2')
// 运营统计07
const Truckload = r => require.ensure([], () => r(require('@/components/_07_statistics/truckload.vue')), 'chunk2')
const Bind = r => require.ensure([], () => r(require('@/components/_07_statistics/bind.vue')), 'chunk2')
const Iccid = r => require.ensure([], () => r(require('@/components/_07_statistics/iccid.vue')), 'chunk2')
const Active = r => require.ensure([], () => r(require('@/components/_07_statistics/active.vue')), 'chunk2')
const Summary = r => require.ensure([], () => r(require('@/components/_07_statistics/summary.vue')), 'chunk2') // 汇总统计
// 缓存同步
const Sync = r => require.ensure([], () => r(require('@/components/_09_cache/sync.vue')), 'chunk2')
// 设备imei池
const Dev = r => require.ensure([], () => r(require('@/components/_11_imei/dev.vue')), 'chunk2')
const Log = r => require.ensure([], () => r(require('@/components/_11_imei/log.vue')), 'chunk2')
const Card = r => require.ensure([], () => r(require('@/components/_11_imei/card.vue')), 'chunk2')
// 配置管理
const Ipwhitelist = r => require.ensure([], () => r(require('@/components/_12_config/ipwhitelist.vue')), 'chunk2')

// 这里面试所有的配置，后续根据权限动态删除一些路由
let menuRoute = {
  path: '/menu',
  name: 'menu',
  component: Container,
  redirect: '/menu/content',
  // 侧边栏菜单
  children: [{
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
      component: DevInfo,
      meta: {
        keepAlive: true // 需要被缓存
      }
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
  }, {
    path: 'versions',
    name: 'versions',
    component: Blank,
    children: [{
      path: 'dictionary',
      name: 'dictionary',
      component: Dictionary
    }, {
      path: 'sysUpgrade',
      name: 'sysUpgrade',
      component: SysUpgrade
    }, {
      path: 'devUprecorde',
      name: 'devUprecorde',
      component: DevUprecorde
    }, {
      path: 'coreApp',
      name: 'coreApp',
      component: CoreApp
    }]
  }, {
    path: 'car',
    name: 'car',
    component: Blank,
    children: [{
      path: 'carbrand',
      name: 'carbrand',
      component: Carbrand
    }]
  }, {
    path: 'statistics',
    name: 'statistics',
    component: Blank,
    children: [{
      path: 'truckload',
      name: 'truckload',
      component: Truckload
    }, {
      path: 'bind',
      name: 'bind',
      component: Bind
    }, {
      path: 'iccid',
      name: 'iccid',
      component: Iccid
    }, {
      path: 'active',
      name: 'active',
      component: Active
    }, {
      path: 'summary',
      name: 'summary',
      component: Summary
    }]
  }, {
    path: 'cache',
    name: 'cache',
    component: Blank,
    children: [{
      path: 'sync',
      name: 'sync',
      component: Sync
    }]
  }, {
    path: 'imei',
    name: 'imei',
    component: Blank,
    children: [{
      path: 'dev',
      name: 'dev',
      component: Dev
    }, {
      path: 'log',
      name: 'log',
      component: Log
    }, {
      path: 'card',
      name: 'card',
      component: Card
    }]
  }, {
    path: 'config',
    name: 'config',
    component: Blank,
    children: [{
      path: 'ipwhitelist',
      name: 'ipwhitelist',
      component: Ipwhitelist
    }]
  }]
}

export default menuRoute
