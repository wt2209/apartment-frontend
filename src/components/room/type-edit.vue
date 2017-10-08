<template>
  <div class="room-type-edit">
      <section class="content-header">
        <h1>
          修改类型
          <!-- 刷新按钮 -->
          <!-- <small>&nbsp;&nbsp;&nbsp;<a class="pull-right glyphicon glyphicon-refresh" href="#rooms"></a></small> -->
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
          <li class="active">修改类型 </li>
        </ol>
      <div class="search-nav">
          <div class="col-md-3">
            <el-input
              placeholder="搜索"
              icon="search"
              v-model="input"
              :on-icon-click="handleIconClick">
            </el-input>
          </div>
        </div>
      </section>

      <section class="content">

        <!-- 占位 -->
        <div style="height:1000px;"></div>


      </section>

      <div class="footer">
        <div class="footer-content">

        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'room-type-edit',
  props:['id'],
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
    alert(this.id)
    // 计算内容区域高度
    window.resizeContent()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
