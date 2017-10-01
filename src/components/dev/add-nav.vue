<template>
  <div class="add-nav">
      <section class="content-header">
        <h1>
          添加导航
          <!-- 刷新按钮 -->
          <!-- <small>&nbsp;&nbsp;&nbsp;<a class="pull-right glyphicon glyphicon-refresh" href="#rooms"></a></small> -->
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
          <li class="active">添加导航 </li>
        </ol>
      <div class="search-nav">
          <div class="col-md-3">
            <el-input
              placeholder="搜索"
              icon="search"
              v-model="input2"
              :on-icon-click="handleIconClick">
            </el-input>
          </div>
        </div>
      </section>

      <section class="content">
        <div class="row">
          <div class="col-xs-12">
            <div class="panel panel-default">
              <div class="panel-heading">
                添加导航
              </div>
              <div class="panel-body">
                <el-form ref="form" :model="form" label-width="140px">
                  <el-form-item label="name">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="display_name">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="父级">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="url">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="icon">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
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
  name: 'add-nav',
  data () {
    return {
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        input2:''
    }
  },
  methods: {
    onSubmit() {

    },
    handleIconClick(){

    }
  },
  mounted() {
    window.resizeContent()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
