const appConfig = {

  /**
   * when this is true, the Vue.log or this.log method will equals to console.log
   * when this is true, the Vue.log or this.log method will do nothing
   */
  debugMode: true,

  /**
   * the APP's server side api url
   */
  appBaseURL: 'http://apartment-api.app/api/'
}


export default{
  install(Vue,options)
  {
    Vue.appBaseURL = appConfig.appBaseURL,
    Vue.prototype.debugMode = Vue.debugMode = appConfig.debugMode,
    Vue.prototype.log = Vue.log = (...args) => {
      if (appConfig.debugMode) {
        console.log(...args)
      }
    }
  }
}
