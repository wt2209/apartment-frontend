<template>
  <div class="bills">
      <section class="content-header">
        <h1>
          费用明细
          <!-- 刷新按钮 -->
          <!-- <small>&nbsp;&nbsp;&nbsp;<a class="pull-right glyphicon glyphicon-refresh" href="#rooms"></a></small> -->
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
          <li class="active">费用明细 </li>
        </ol>
      <div class="search-nav">
          <div class="col-md-3">
            <el-input
              placeholder="搜索"
              icon="search"
              v-model="searchInput"
              :on-icon-click="search">
            </el-input>
          </div>
        </div>
      </section>

      <section class="content">
        <el-table
            :data="table"
            :height="tableHeight"
            v-loading="initLoading"
            border
            style="width: 100%">
            <el-table-column
              prop="title"
              label="名称"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="person"
              label="姓名"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="room"
              label="房间号"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="symbol"
              label="是否退费"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="fees"
              label="金额"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="late_fees"
              label="滞纳金"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="total_fees"
              label="总额"
              min-width="100"
              sortable>
            </el-table-column>
            <el-table-column
              prop="payer"
              label="缴费人"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="payed_at"
              label="缴费时间"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="printed_at"
              label="单据打印时间"
              min-width="130">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
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
// TODO  need to delete
import data from '../../data/json'


export default {
  name: 'bills',
  data () {
    return {
      searchInput: '',
      initLoading: true,
      table: [],
      tableHeight:0,
    }
  },
  methods: {
    handleClick(row) {
      console.log(row.fees);
    },
    search(){

    },
    fetchData() {
      this.initLoading = true
      //TODO
      setTimeout(() => {
        this.table = data.bills
        this.initLoading = false
        this.setTableHeight()
      }, 2000)
    },
    setTableHeight() {
      this.tableHeight = $('.content').height()
    }
  },
  mounted() {
    // 计算内容区域高度
    window.resizeContent()
    window.addEventListener('resize', () => {this.setTableHeight()})
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope>

</style>
