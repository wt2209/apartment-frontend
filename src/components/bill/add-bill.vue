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

                  <el-form :inline="true" :model="form" ref="form" label-width="100px" class="demo-dynamic">
                    <el-form-item
                      v-for="(item, index) in form.items"
                      :key="item.type"
                    >


                    <div class="col-md-3">
                      <el-select v-model="item.type" placeholder="选择费用类型">
                        <el-option label="房租" value="shanghai"></el-option>
                        <el-option label="电费" value="beijing"></el-option>
                      </el-select>
                    </div>
                    <div class="col-md-3">
                      <el-input v-model="item.money" placeholder="金额"></el-input>
                    </div>
                    <div  class="col-md-6">
                      <el-input v-model="item.description" placeholder="费用说明"></el-input>
                    </div>


                    <el-button @click.prevent="removeItem(item)">删除</el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="addNewItem">新增费用</el-button>
                    </el-form-item>
                  </el-form>


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
                    <el-switch v-model="form.late_fees_on" on-color="#13ce66" on-value="1" off-value="0" on-text="收取" off-text="不收"></el-switch>
                  </p>
                  <div v-if="form.late_fees_on == 1">
                    <p>
                      滞纳金基数：
                      <span style="width:200px;display:inline-block;">
                        <el-input placeholder="金额" v-model="form.late_fees_base"></el-input>
                      </span>
                    </p>
                    <p>
                      滞纳金费率：
                      <span style="width:200px;display:inline-block;">
                        <el-input placeholder="费用说明" v-model="late_rate">
                          <template slot="append">%</template>
                        </el-input>
                      </span>
                      （只精确到0.1%）
                    </p>
                    <p>滞纳金开始计算日：<span><el-date-picker type="date" placeholder="选择日期" style="width:200px;"></el-date-picker></span></p>
                  </div>
                </div>
              </div>
              <div class="panel-footer">
                <button type="button" class="btn btn-success" id="submitButton"  @click="submit()">{{ buttonMsg }}</button>
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
      buttonMsg: '提 交',
      //fees 和 turn_in_fees 必须在后台重新算，因此不计入form
      fees: 0,
      turn_in_fees: 0,
      // form.late_rate 必须除以100
      late_rate:0.3,
      form: {
        title: '',
        room: '',
        name: '',
        late_fees_on: 0,
        late_fees_base: '',
        items: [{
          type: '',
          money: '',
          description: ''
        }]
      }
    }
  },
  watch:{
    'form.items': {
      handler: function(val, oldVal){
        // reset this.fees and this.turn_in_fees
        this.fees = 0
        this.turn_in_fees = 0
        for (let i of val) {
          // set this.fees and this.turn_in_fees
          if (i.item && Number.parseFloat(i.money)) {
            this.fees += Number.parseFloat(i.money)
            if (i.turn_in) {
              this.turn_in_fees += Number.parseFloat(i.money)
            }
          }
        }
      },
      deep: true
    }
  },
  methods: {
    addNewItem(){
      this.form.items.push({
        type: '',
        money: '',
        description: ''
      })
    },
    removeItem(item) {
       var index = this.form.items.indexOf(item)
       if (index !== -1) {
         this.form.items.splice(index, 1)
       }
     },
    submit() {
      this.form.late_rate = this.late_rate / 1000
      this.buttonMsg = '提交中...'
      $('#submitButton').attr('disabled', 'disabled')
      this.http.post({
        url: '/bill',
        data: this.form,
        successMsg: '添加成功',
        success: (res) => {
          this.log(res)
        },
        done: () => {
          this.buttonMsg = '提 交'
          $('#submitButton').removeAttr('disabled')
          this.resetForm()
        }
      })
    },
    resetForm() {
      this.form = {
        late_fees_on: 0,
        title: '',
        room: '',
        name: '',
        late_fees_base: '',
        items: [{
          item: '',
          money: '',
          description: '',
          turn_in: true
        }]
      },
      this.fees = 0,
      this.turn_in_fees = 0,
      this.late_rate = 0.3
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
