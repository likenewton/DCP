// [chunk2](侧边栏菜单动态路由)
const Asidemenu = r => require.ensure([], () => r(require('@/components/container/index.vue')), 'chunk2')
const Blank = r => require.ensure([], () => r(require('@/components/container/blank.vue')), 'chunk2')

// [chunk3](一般是表单增删改查页面)
const Addbrand = r => require.ensure([], () => r(require('@/components/forms/addbrand.vue')), 'chunk3')
const Directive = r => require.ensure([], () => r(require('@/components/forms/directive.vue')), 'chunk3')
const Addbatch = r => require.ensure([], () => r(require('@/components/forms/addbatch.vue')), 'chunk3')

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
    }]
  }

export default formRoute
