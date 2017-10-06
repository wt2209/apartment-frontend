<template>
  <div class="add-bill">
      <section class="content-header">
        <h1>
          添加费用
          <!-- 刷新按钮 -->
          <!-- <small>&nbsp;&nbsp;&nbsp;<a class="pull-right glyphicon glyphicon-refresh" href="#rooms"></a></small> -->
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
          <li class="active">添加费用 </li>
        </ol>
      </section>

      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="col-md-12">
                  <p class="title">基本信息：</p>
                  <el-form ref="form" :inline="true" label-width="70px">
                    <el-form-item label="名称">
                      <el-input v-model="form.title" placeholder="如：租赁费用"></el-input>
                    </el-form-item>
                    <el-form-item label="房间号" placeholder="金额">
                      <el-input v-model="form.room"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="col-md-12">
                  <p class="title">费用明细：</p>
                  <div v-for="detail in form.items"  class="fee-items">
                    <div class="col-md-2">
                      <el-input v-model="detail.item" placeholder="类型，如：电费"></el-input>
                    </div>
                    <div class="col-md-2">
                      <el-input v-model="detail.money" placeholder="金额"></el-input>
                    </div>
                    <div  class="col-md-6">
                      <el-input v-model="detail.description" placeholder="费用说明"></el-input>
                    </div>
                    <div class="col-md-2" style="line-height:36px">
                      <el-checkbox v-model="detail.turn_in">上缴北船</el-checkbox>
                    </div>
                    <!-- <div class="col-md-1" >
                      <el-button type="text" @click="addNewItem()">删除行</el-button>
                    </div> -->
                  </div>
                  <div class="add-new-item">
                    <el-button type="text" @click="addNewItem()">添加新行</el-button>
                  </div>
                </div>
                <div class="config col-md-12">
                  <p>总费用：<span>{{ fees }}</span></p>
                  <p>上缴总费用：<span>{{ turn_in_fees }}</span></p>
                  <p>
                    是否收取滞纳金：
                    <el-switch v-model="value1" on-color="#13ce66" on-value="1" off-value="0" on-text="收取" off-text="不收"></el-switch>
                  </p>
                  <div v-if="value1 == 1">
                    <p>
                      滞纳金费率：
                      <span style="width:200px;display:inline-block;">
                        <el-input placeholder="费用说明" v-model="late_rate">
                          <template slot="append">%</template>
                        </el-input>
                      </span>
                      （只精确到0.1%）
                    </p>
                    <p>
                      以 <el-select v-model="form.late_fees_base" placeholder="请选择">
                          <el-option label="总金额" value="总金额"></el-option>
                          <el-option v-for="item in form.items" :key="item.item" v-if="item.item" :label="item.item" :value="item.item"></el-option>
                        </el-select>
                      作为滞纳金基数
                    </p>
                    <p>滞纳金开始计算日：<el-date-picker type="date" placeholder="选择日期" style="width:200px;"></el-date-picker></p>
                  </div>
                </div>
              </div>
              <div class="panel-footer">
                <button type="button" class="btn btn-success" @click="submit()">提交</button>
              </div>
            </div>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'add-bill',
  data () {
    return {
      radio: '',
      value1:false,
      //fees 和 turn_in_fees 必须在后台重新算，因此不计入form
      fees: 0,
      turn_in_fees: 0,
      // form.late_rate 必须乘100
      late_rate:0.3,

      form: {
        title: '',
        room: '',
        name: '',
        late_fees_base: '总金额',
        items: [{
          item: '',
          money: '',
          description: '',
          turn_in: true
        },{
          item: '',
          money: '',
          description: '',
          turn_in: true
        }]
      },
      input:''
    }
  },
  watch:{
    'form.items': {
      handler: function(val, oldVal){
        let changed = true
        // reset this.fees and this.turn_in_fees
        this.fees = 0
        this.turn_in_fees = 0
        for (let i of val) {
          if (i.item === this.form.late_fees_base) {
            changed = false
          }
          // set this.fees and this.turn_in_fees
          if (i.item && Number.parseFloat(i.money)) {
            this.fees += Number.parseFloat(i.money)
            if (i.turn_in) {
              this.turn_in_fees += Number.parseFloat(i.money)
            }
          }
        }
        if (changed) {
          this.form.late_fees_base = '总金额'
        }
      },
      deep: true
    }
  },
  methods: {
    handleIconClick() {

    },
    addNewItem(){
      this.form.items.push({
        item: '',
        money: '',
        description: '',
        turn_in:true
      })
    },
    submit() {
      this.form.late_rate = this.late_rate / 1000
      this.log(this.form.items)
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
  label{
    font-weight: normal;
  }
  .fee-items{
    margin: 15px 0;
    height: auto;
    overflow: hidden;
  }
  .add-new-item{
    margin: 0 0 30px 15px ;
  }
  .title,
  .config p{
    color:#48576a;
    margin: 15px 0 ;
    font-weight: bold;
  }
  .config p span{
    font-weight: normal;
  }
</style>
