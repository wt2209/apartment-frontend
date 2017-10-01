<template>
    <div>
        <div v-if="isLogin()">
            <div class="wrapper">
                 <top-nav></top-nav>
                 <left-side></left-side>
                   <div class="content-wrapper">
                       <router-view></router-view>
                   </div>
                   <right-side></right-side>
                 <!-- <bottom-nav></bottom-nav> -->
            </div>
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
  name: 'app',
  data() {
      return {

      }
  },
  methods: {
    isLogin() {
      return sessionStorage.getItem("access_token")
    }
  },
  mounted() {
    // axios 加载 baseURL
    this.axios.defaults.baseURL = this.appBaseURL
  }
}
</script>

<style>

</style>
