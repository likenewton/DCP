// 过滤器
// 格式金钱截取两位
Vue.filter('formatMoney', function(value, type) {
  if (!value) return '0.00'
  value = value.toString().replace(/^(\d*)$/, "$1.")
  value = (value + "00").replace(/(\d*\.\d\d)\d*/, "$1")
  value = value.replace(".", ",")
  var re = /(\d)(\d{3},)/
  while (re.test(value))
    value = value.replace(re, "$1,$2")
  value = value.replace(/,(\d\d)$/, ".$1")
  if (type === 0) {
    value = value.split(".")[0]
  }
  return value
})

// 截取到小数点后几位
Vue.filter('sliceFloat', function(value, pos = 3) {
  if (typeof value != 'number') {
    let v = 0
    return v.toFixed(pos)
  } else {
    return (Math.floor(value * Math.pow(10, pos)) / Math.pow(10, pos)).toFixed(pos)
  }
})

// 格式秒
Vue.filter('formatSecond', function(second) {
  second -= 0
  let htmlStr = ''
  if (Math.abs(second / 60) < 1) {
    htmlStr = `${second}秒`
  } else if (Math.abs(second / 60 / 60) < 1) {
    let m = Math.floor(second / 60)
    let s = second % 60
    htmlStr = `${m}分${s}秒`
  } else if (Math.abs(second / 60 / 60 / 24) < 1) {
    let h = Math.floor(second / 3600)
    let m = Math.floor((second % 3600) / 60)
    let s = second % 60
    htmlStr = `${h}时${m}分${s}秒`
  } else {
    let d = Math.floor(second / 3600 / 24)
    let h = Math.floor((second - d * 3600 * 24) / 3600)
    let m = Math.floor((second % 3600) / 60)
    let s = second % 60
    htmlStr = `${d}天${h}时${m}分${s}秒`
  }
  return htmlStr
})

// 将下拉列表中的value转化成客户看的label
Vue.filter('valueToLabel', function(value, data = [], tag = 'label') {
  let label = ''
  data.forEach((v) => {
    if (v.value == value) {
      label = v[tag]
    }
  })
  return label
})

Vue.filter('fixed', function(value, fixed = 2, unit) {
  if (value || value == 0) {
    if (unit) return Number(value).toFixed(fixed) + unit
    else return Number(value).toFixed(fixed)
  } else {
    return ''
  }
})

// 时间格式化
Vue.filter('formatDate', function(date, fmt) {
  if (!date) return ''
  date = new Date(date);
  let timeString = fmt || 'yyyy-mm-dd hh:ff:ss';
  let getFullYear = String(date.getFullYear());

  function padLeftZero(str) {
    var padLeft = '00';
    return (padLeft + str).substr(str.length);
  }

  // 如果存在至少一个y
  if (/(y+)/.test(timeString)) {
    // RegExp.$1 为匹配第一个大括号的内容
    timeString = timeString.replace(RegExp.$1, getFullYear.substr(4 - RegExp.$1.length));
  }
  let o = {
    'm+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'f+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (var k in o) {
    if (new RegExp(`(${k})`).test(timeString)) {
      let str = String(o[k]);
      timeString = timeString.replace(RegExp.$1, str.length == 1 ? padLeftZero(str) : str);
    }
  }
  return timeString;
})
