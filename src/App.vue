<template>
    <div>
        <div v-if="isLogin()">
            <div class="wrapper">
              <top-nav></top-nav>
              <left-side></left-side>
              <right-side></right-side>
              <div class="content-wrapper">
                 <router-view></router-view>
              </div>
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
    },
    setup() {
      this.getRoomStructure()
    },
    getRoomStructure() {
      this.http.get({
        url: 'room-structure',
        success: (res) => {
          sessionStorage.setItem('room-structure', JSON.stringify(res.data))
        }
      })
    },
    checkEnvironment() {
      if (!window.sessionStorage) {
        alert('浏览器版本太老！ 请更换火狐浏览器！')
        return false
      }
    }
  },
  mounted() {
    this.checkEnvironment()
    // initialize app when user is login
    if (this.isLogin()) {
      this.setup()
    }
  }
}
</script>

<style>

</style>
