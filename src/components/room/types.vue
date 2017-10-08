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
      </section>

      <section class="content">
        <div class="row" >
          <div class="col-md-12"  v-loading="loading">
            <div v-for="(type, key, index) in types" :key="type.key" class="col-md-3">
              <div class="panel panel-default">
                <div class="panel-heading">
                  {{ type.name }}
                </div>
                <div class="panel-body">
                  类型说明：
                  <div class="description">
                    {{ type.name }}
                  </div>
                </div>
                <div class="panel-footer">
                  <router-link :to="'type/edit/' + type.id"  class="btn btn-success btn-xs">修改</router-link>
                  <button class="btn btn-danger btn-xs">删除</button>
                </div>
              </div>
            </div>
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
    edit(key) {
      alert(key)
    },
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
  .description{
    padding:20px;
  }
</style>
