<template>
    <div class="login-page">
       <div class="login-box">
          <div class="login-logo">
            <b>单身公寓管理系统</b>
          </div>
          <!-- /.login-logo -->
          <div class="login-box-body">
            <p class="login-box-msg" :click="login">系统登录</p>
            <form  @submit.prevent="login">
              <div class="form-group has-feedback">
                <input type="username" class="form-control" placeholder="用户名" v-model:value="form.name">
                <span class="glyphicon glyphicon-user form-control-feedback"></span>
              </div>
              <div class="form-group has-feedback">
                <input type="password" class="form-control" placeholder="密码" v-model:value="form.password">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
              </div>
              <div class="row form-group has-error">
                <!-- /.col -->
                <div class="col-xs-4 pull-right">
                  <button type="submit" class="btn btn-primary btn-block btn-flat">{{buttonMsg}}</button>
                </div>
                <!-- /.col -->
              </div>
            </form>
          </div>
          <!-- /.login-box-body -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        name:'admin',
        password:'admin888'
      },
      buttonMsg:'登录',
    }
  },
  methods: {
    login() {
      this.buttonMsg = '验证中...'
      $('button[type=submit]').attr('disabled', 'disabled')
      this.http.post({
        url: 'login',
        data: this.form,
        success: (result) => {
            sessionStorage.setItem('access_token', result.token)
            sessionStorage.setItem('username', this.form.name)
            this.$router.push(this.$route.query.redirect || '/')
        },
        errorMsg: '用户名或密码错误',
        done:()=>{
          this.buttonMsg = '登录'
          $('button[type=submit]').removeAttr('disabled')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-page{
    height:auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(210, 214, 222);
  }
  .login-box{
    margin-top: 200px;
  }
</style>
