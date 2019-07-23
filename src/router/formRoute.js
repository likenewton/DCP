// [chunk2](侧边栏菜单动态路由)
const Asidemenu = r => require.ensure([], () => r(require('@/components/container/index.vue')), 'chunk2')
const Blank = r => require.ensure([], () => r(require('@/components/container/blank.vue')), 'chunk2')

// [chunk3](一般是表单增删改查页面)
const Addbrand = r => require.ensure([], () => r(require('@/components/forms/addbrand.vue')), 'chunk3')
const Directive = r => require.ensure([], () => r(require('@/components/forms/directive.vue')), 'chunk3')
const Addbatch = r => require.ensure([], () => r(require('@/components/forms/addbatch.vue')), 'chunk3')
const Addcarbrand = r => require.ensure([], () => r(require('@/components/forms/addcarbrand.vue')), 'chunk3')
const Addcarmodel = r => require.ensure([], () => r(require('@/components/forms/addcarmodel.vue')), 'chunk3')
const Addcoreapp = r => require.ensure([], () => r(require('@/components/forms/addcoreapp.vue')), 'chunk3')

let formRoute = {
    // 表单文件
    path: '/forms',
    name: 'forms',
    component: Asidemenu,
    children: [{
      path: 'addbrand',
      name: 'addbrand',
      component: Addbrand
    }, {
      path: 'directive',
      name: 'directive',
      component: Directive
    }, {
      path: 'addbatch',
      name: 'addbatch',
      component: Addbatch
    }, {
      path: 'addcarbrand',
      name: 'addcarbrand',
      component: Addcarbrand
    }, {
      path: 'addcarmodel',
      name: 'addcarmodel',
      component: Addcarmodel
    }, {
      path: 'addcoreapp',
      name: 'addcoreapp',
      component: Addcoreapp
    }]
  }

export default formRoute
