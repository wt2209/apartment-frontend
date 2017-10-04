<template>
  <div class="room-types">
      <section class="content-header">
        <h1>
          房间类型
          <!-- 刷新按钮 -->
          <!-- <small>&nbsp;&nbsp;&nbsp;<a class="pull-right glyphicon glyphicon-refresh" href="#rooms"></a></small> -->
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
          <li class="active">房间类型 </li>
        </ol>
      <div class="search-nav">
          <div class="col-md-3">
            <el-input
              placeholder="搜索"
              icon="search"
              v-model="search"
              :on-icon-click="handleIconClick">
            </el-input>
          </div>
        </div>
      </section>

      <section class="content">
        <div class="row" >
          <div class="col-xs-4">

          </div>
          <div class="col-xs-8">
            <div v-for="type in types" :key="type.key" class="col-xs-4" v-loading="loading">
              <div class="panel panel-default">
                <div class="panel-heading">
                  {{ type.name }}
                </div>
                <div class="panel-body">
                  {{ type.name }}
                </div>
              </div>
            </div>
          </div>

          <div class="col-xs-4">

          </div>
        </div>

      </section>

      <div class="footer">
        <div class="footer-content">

        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'room-types',
  data () {
    return {
      loading: true,
      types:[],
      search:''
    }
  },
  methods: {
    handleIconClick() {

    },
    getAllTypes() {
      this.loading = true
      this.http.get({
        url: 'room-types',
        success: (res) => {
          this.types = res.data
        },
        done: () => {
          this.loading = false
        }
      })
    }
  },
  mounted() {
    // 计算内容区域高度
    window.resizeContent()
    this.getAllTypes()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
