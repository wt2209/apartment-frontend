export default{
  install(Vue,options)
  {
    Vue.prototype.appBaseURL = this.appBaseURL
  },
  appBaseURL: 'http://apartment-api.app/api/'
}
