<template>
  <div class="add-nav">
      <section class="content-header">
        <h1>
          这是模板
          <!-- 刷新按钮 -->
          <!-- <small>&nbsp;&nbsp;&nbsp;<a class="pull-right glyphicon glyphicon-refresh" href="#rooms"></a></small> -->
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
          <li class="active">这是模板 </li>
        </ol>
      <div class="search-nav">
        <div class="col-md-3">
          请选择：
          <el-cascader
            width="500px"
            v-loading="roomStructureLoading"
            :options="roomStructure"
            v-model="selectedOptions2"
            placeholder="选择楼号"
            popper-class="aaa"
            clearable=true
            @change="handleChange">
          </el-cascader>
        </div>
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
      roomStructureLoading: false,
      msg:'',
      input:'',
      types:'',
      building:'',
      unit:'',
      roomStructure: [],
      selectedOptions2: []
    }
  },
  methods: {
    handleIconClick() {

    },
    handleChange(value) {
      console.log(value);
    },
    getRoomStructure() {
      if (!sessionStorage.getItem('room-structure')) {
        this.roomStructureLoading = true
        this.http.get({
          url: 'room-structure',
          success: (res) => {
            this.roomStructure = res.data
            this.roomStructureLoading = false
            $('.el-cascader').trigger('click')
            sessionStorage.setItem('room-structure', JSON.stringify(res.data))
          }
        })
      } else {
        this.roomStructure = JSON.parse(sessionStorage.getItem('room-structure'))
        $('.el-cascader').trigger('click')

      }
    }
  },
  mounted() {
    // 计算内容区域高度
    window.resizeContent()
    this.getRoomStructure()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  label{
    font-weight: normal;
    margin:0;
  }
  .aaa{
    background-color: red;
    height: auto;
    overflow: hidden;
  }
</style>
