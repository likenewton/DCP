module.exports = {
  // 获取权限菜单列表
  getAuthMenu(asideData = [], resources = []) {
    // 排序
    resources.sort((v1, v2) => {
      return v1.seqNum - v2.seqNum
    })
    resources.forEach((v) => {
      v.childResources.sort((v1, v2) => {
        return v1.seqNum - v2.seqNum
      })
    })
    // 如果后台配置的页面在所有已开发的页面中都找不到不让其加到菜单列表当中
    let newResource = []
    resources.forEach((v1, i1) => {
      let level_1 = false
      asideData.forEach((v2, i2) => {
        if (v1.resUrl === v2.name) {
          v1.icon = v2.icon
          level_1 = true
        }
      })
      if (level_1) {
        newResource.push(v1)
      }
    })
    return newResource
  },
  // 获取菜单动态路由
  getMenuRoute(menuRoute = [], resources = []) {
    menuRoute.children.forEach((v1, i1) => {
      let level_1 = false
      resources.forEach((r1, j1) => {
        if (v1.name === r1.resUrl) {
          level_1 = true
          v1.redirect = `/menu/${r1.resUrl}/${r1.childResources[0].resUrl}`
          v1.children.forEach((v2, i2) => {
            let level_2 = false
            r1.childResources.forEach((r2, j2) => {
              if (v2.name === r2.resUrl) {
                level_2 = true
              }
            })
            if (!level_2) {
              v1.children.splice(i2, 1)
            }
          })
        }
      })
      if (!level_1) {
        menuRoute.children.splice(i1, 1)
      }
    })
    return menuRoute
  },
  // 设置升降序字段
  setSortSearch(val, _this, sort = 'sort') {
    if (!val.prop) return _this[sort] = {}
    if (val.order === 'descending') { // 降序
      _this[sort] = {
        descs: val.prop
      }
    } else if (val.order === 'ascending') { // 升序
      _this[sort] = {
        ascs: val.prop,
      }
    } else { // 不排序
      _this[sort] = {}
    }
  },
  // 获取列表数据（通用） this, url, list, formInline, sort
  getListData(paras) {
    let para = paras
    let list = para.vue[para.list || 'list']
    let sort = para.vue[para.sort || 'sort']
    let formInline = para.vue[para.formInline || 'formInline'] || {}
    para.vue[para.loadData || 'loadData'] = true
    _axios.send({
      method: para.method || 'post',
      url: para.url,
      data: $.extend({}, formInline, {
        ascs: sort.ascs,
        descs: sort.descs,
        pageSize: list.pagesize,
        pageNo: list.currentPage
      }),
      done: (res) => {
        para.vue[para.loadData || 'loadData'] = false
        para.vue.searchVipVisible = false // 高级查询功能
        list.data = res.data ? (res.data.data ? res.data.data : []) : []
        list.total = res.data ? res.data.rowCount : 0
        para.cb && para.cb(res)
      }
    })
  },
  // 获取页面面包屑数组
  getBreadArr(name, authMenu) {
    let breadArr = []
    if (name === 'home') return [, , 'home']
    authMenu.forEach((v1) => {
      if (v1.resUrl === name) {
        breadArr.push('home', v1.resUrl)
        return false
      }
      v1.childResources.forEach((v2) => {
        if (v2.resUrl === name) {
          breadArr.push('home', v1.resUrl, v2.resUrl)
          return false
        }
      })
    })
    if (breadArr.length > 0) {
      // 点击的是侧边栏页面
      sessionStorage.setItem('authMenu', breadArr)
    } else {
      // 打开的不是侧边栏页面，将目录拉取下来
      breadArr = sessionStorage.getItem('authMenu')
      if (breadArr) {
        // 如果有数据就代表是通过其他路由进入的
        breadArr = breadArr.split(',')
      } else {
        // 如果没有数据就代表是直接通过url进入的默认进入 第一个菜单第一项
        breadArr = ['home', authMenu[0].resUrl, authMenu[0].childResources[0].resUrl]
      }
    }
    return breadArr
  },
  // 获取主题颜色
  getColorList(para, count) {
    let colorList = ['#3cb1ff', '#ffc367', '#ff7477', '#27da99', '#3ecec9', '#9a83da']
    let colorData = {
      primary: '#3cb1ff',
      warning: '#ffc367',
      danger: '#ff7477',
      success: '#27da99',
      editor: '#3ecec9',
      purple: '#9a83da'
    }
    if (!count) {
      if (!para) return colorList
      else if (typeof para === 'string') {
        return colorData[para]
      } else if (Array.isArray(para)) {
        let arr = []
        para.forEach((v) => {
          arr.push(colorData[v])
        })
        return arr
      }
    } else {
      if (typeof para === 'string') {
        let arr = []
        for (let i = 0; i < count; i++) {
          arr.push(colorData[para])
        }
        return arr
      }
      if (Array.isArray(para)) {
        if (para.length === 0) {
          let arr = []
          for (let i = 0; i < Math.ceil(count / 6); i++) {
            arr = arr.concat(colorList)
          }
          return arr.slice(0, count)
        } else {
          let arr = []
          for (let i = 0; i < Math.ceil(count / para.length); i++) {
            arr = arr.concat(para)
          }
          return arr.slice(0, count)
        }
      }
    }
  },
  getQuery(attr) {
    let href = location.href
    let queryStr = href.substr(href.indexOf('?') + 1)
    let queryArr = queryStr.split('&')
    let queryObj = {}
    queryArr.forEach(v => {
      let tplArr = v.split('=')
      queryObj[tplArr[0]] = tplArr[1]
    })
    if (attr) return queryObj[attr]
    else return queryObj
  },
  maxTableHeight(leftHeight = 316) {
    let winWidth = $(window).width()
    // let zoom = winWidth > 1200 ? winWidth / window.screen.width : 1
    let zoom = 1
    let calcHeight = ($(window).height() - leftHeight * zoom) / zoom
    return calcHeight
  },
  // 导出excel
  exportExcel(url, params = {}) {
    let link = `${url}?iov-token=${localStorage.getItem('iov-token')}`
    for (let key in params) {
      if (params[key]) {
        link += `&${key}=${params[key]}`
      }
    }
    window.open(link, '_self')
  },
  compatibel_Ie_input() {
    $('.el-select .el-input__inner').attr("unselectable", "on")
  },
  // 默认提示提交的表单不符合规范
  showMsgBox(para = {}) {
    Vue.prototype.$notify({
      type: para.type || 'error',
      title: para.title || (para.type === 'error' || !para.type ? '错误' : '温馨提示'),
      message: para.message || '提交的表单数据不符合规范！',
      duration: isNaN(para.duration) ? 4500 : para.duration
    })
  },
  // 默认的comfirm提示框，为了省事~
  showCfmBox(para = {}) {
    Vue.prototype.$confirm(`${para.message || '确定执行该操作吗？'}`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: para.type || 'warning'
    }).then(() => {
      para.cb && para.cb()
    }).catch(() => {
      this.showMsgBox({
        type: 'info',
        message: '操作已取消'
      })
    })
  }

}
