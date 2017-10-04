<template>
  <div class="not-found">
    <h1>
      请求页面不存在
      <!-- 刷新按钮 -->
      <!-- <small>&nbsp;&nbsp;&nbsp;<a class="pull-right glyphicon glyphicon-refresh" href="#rooms"></a></small> -->
    </h1>
  </div>
</template>

<script>
export default {
  name: 'add-nav',
  data () {
    return {
      msg:'',
      input:''
    }
  },
  methods: {
    handleIconClick() {

    }
  },
  mounted() {
    // 计算内容区域高度
    window.resizeContent()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
