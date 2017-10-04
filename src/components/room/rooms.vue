<template>
  <div class="rooms">
    <!-- Content Header (Page header) -->
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
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <!--<h3 class="box-title"></h3>-->
              <!--<div class="input-group input-group-sm" style="width: 200px;"></div>-->
                <!-- <form class="form-inline col-md-4" @submit.prevent="searchRooms">
                  <div class="form-group">
                    <input class="form-control" v-model="searchOptions.keyword" placeholder="搜索，按下回车后开始搜索">
                  </div>
                  <select class="form-control" v-model="searchOptions.roomType">
                    <option value=0>类型</option>
                    <option v-for="roomType in this.$store.state.room.roomTypes" :value="roomType.id" >{{roomType.name}}</option>
                  </select>
                </form> -->
              <!--<div class="box-tools"></div>-->
            </div>
            <!-- {{this.$store.state.room.loading ? 'loading':''}} -->
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
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
                     prop="person_number"
                     label="人数"
                     width="180">
                   </el-table-column>
                   <el-table-column
                     prop="unit"
                     label="单元">
                   </el-table-column>
                 </el-table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
      </div>
    </section>
    <!-- /.content -->
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
        this.fetchData()

    },
    methods: {
        fetchData() {
          this.http.get({
            url: 'rooms',
            success: (res) => {
              this.loading = false
              this.tableData = res.data
            }
          })

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
