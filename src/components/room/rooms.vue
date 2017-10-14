<template>

  <div class="rooms">
      <section class="content-header">
        <h1>
          所有房间
          <!-- 刷新按钮 -->
          <!-- <small>&nbsp;&nbsp;&nbsp;<a class="pull-right glyphicon glyphicon-refresh" href="#rooms"></a></small> -->
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
          <li class="active">所有房间 </li>
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

        <el-table
            v-loading.body="loading"
           :data="tableData"
           border
           style="width: 100%">
           <el-table-column
             prop="display_name"
             label="房间号"
             width="180">
           </el-table-column>
           <el-table-column
             prop="type.name"
             label="房间类型">
           </el-table-column>
           <el-table-column
             prop="person_number"
             label="最大人数"
             width="180">
           </el-table-column>

         </el-table>


      </section>

      <div class="footer">
        <div class="footer-content">

        </div>
      </div>
  </div>
</template>

<script>
  // import _ from 'lodash'
export default {
    name: 'rooms',
    data() {
      return {
        tableData: [],
        loading:true
      }
    },
    watch: {
        roomType(){
            this.searchRooms();
        }
    },
    mounted(){
      // 计算内容区域高度
      window.resizeContent()
      this.fetchData()

    },
    methods: {
        fetchData() {
          this.http.get({
            url: 'rooms',
            success: (result) => {
              this.loading = false
              this.tableData = result.data
            }
          })

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
