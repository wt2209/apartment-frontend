import axios from 'axios'
import appConfig from './appConfig'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

let baseURL = appConfig.appBaseURL


const result = {
  install(Vue){
    Vue.prototype.http = {
      post(obj) {
        this.fetch('post', obj)
      },
      get(obj) {
        this.fetch('get', obj)
      },
      fetch(method, obj) {
        if (!obj.url) {
          return false
        }
        obj.init && obj.init()
        return axios({
                method: method,
                baseURL: baseURL,
                url: obj.url,
                params: obj.params,
                data: obj.data
              })
              .then(function(response) {
                obj.success && obj.success(response)
                // 不管请求成功与否，都会执行
                obj.done && obj.done()
              })
              .catch((error) => {
                if (error) {
                  obj.error && obj.error(error.response)
                  Vue.prototype.$notify.error({
                    title: '错误: ' + obj.errorMsg || error.message,
                    message: '错误代码：' + error.response.status
                  })
                  obj.done && obj.done()
                }
              })
      }
    }
  }
}

/************拦截器*************/
// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
  let token = sessionStorage.getItem('access_token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
    config.headers['contentType'] = 'application/json;charset=utf-8'
  }
  return config
})

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  if (response.status == 200){
    return response
  }
  //其他错误
  const err = new Error('未知错误')
  err.response = response
  err.response.status = 0
  throw err

}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break
      case 401:
        err.message = '没有权限'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = `请求地址出错`
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器内部错误'
        break
      case 501:
        err.message = '服务未实现'
        break
      case 502:
        err.message = '网关错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网关超时'
        break
      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
        err.message = '未知错误'
    }
  }
  return Promise.reject(err)
})

export default result
