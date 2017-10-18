<template>

  <div class="rent-bill">
    <div class="col-md-12">
      <p class="title">费用明细：</p>



      <el-row :gutter="5">
        <el-form ref="form"  :model="form" label-width="60px">
          <el-form-item label="租金">
            <el-col :md="4" class="line">
              <el-input  placeholder="金额"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-date-picker type="date" placeholder="开始日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :md="4" class="line">
              <el-date-picker type="date" placeholder="结束日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :md="4" class="line">
              <el-input  placeholder="说明"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-checkbox>上缴北船</el-checkbox>
            </el-col>
          </el-form-item>

          <el-form-item label="物业费">
            <el-col :md="4" class="line">
              <el-input  placeholder="金额"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-date-picker type="date" placeholder="开始日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :md="4" class="line">
              <el-date-picker type="date" placeholder="结束日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :md="4" class="line">
              <el-input  placeholder="说明"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-checkbox>上缴北船</el-checkbox>
            </el-col>
          </el-form-item>

          <el-form-item label="电梯费">
            <el-col :md="4" class="line">
              <el-input placeholder="金额"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-date-picker type="date" placeholder="开始日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :md="4" class="line">
              <el-date-picker type="date" placeholder="结束日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :md="4" class="line">
              <el-input  placeholder="说明"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-checkbox>上缴北船</el-checkbox>
            </el-col>
          </el-form-item>

          <el-form-item label="电费">
            <el-col :md="4" class="line">
              <el-input placeholder="金额"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-input placeholder="上次底数"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-input placeholder="本次底数"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-input  placeholder="说明"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-checkbox>上缴北船</el-checkbox>
            </el-col>
          </el-form-item>

          <el-form-item label="水费">
            <el-col :md="4" class="line">
              <el-input placeholder="金额"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-input placeholder="单价"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-input  placeholder="上次底数"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-input  placeholder="本次底数"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-input  placeholder="说明"></el-input>
            </el-col>
            <el-col :md="4" class="line">
              <el-checkbox>上缴北船</el-checkbox>
            </el-col>
          </el-form-item>
        </el-form>
      </el-row>

    </div>
    <div class="config col-md-12">
      <br>  <br>
      <p>总费用：<span>{{ fees }}</span></p>
      <p>上缴总费用：<span>{{ turn_in_fees }}</span></p>
      <div>
        <p>
          滞纳金基数：
          <span style="width:200px;display:inline-block;">
            <el-input placeholder="金额" v-model="form.late_fees_base"></el-input>
          </span>
        </p>
        <p>
          滞纳金费率：0.3%
        </p>
        <p>滞纳金开始计算日：<span><el-date-picker type="date" placeholder="选择日期" style="width:200px;"></el-date-picker></span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rent-bill',
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
          '项目': '租金',
          '金额': '',
          '费用起始日':'',
          '费用结束日':'',
          '说明': '',
          '上缴北船': true
        }, {
          '项目': '物业费',
          '金额': '',
          '说明': '',
          '上缴北船': false
        }, {
          '项目': '电梯费',
          '金额': '',
          '说明': '',
          '上缴北船': false
        }, {
          '项目': '电费',
          '金额': '',
          '说明': '',
          '上缴北船': true
        }, {
          '项目': '水费',
          '金额': '',
          '说明': '',
          '上缴北船': true
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
        // for (let i of val) {
        //   // set this.fees and this.turn_in_fees
        //   if (i.item && Number.parseFloat(i.money)) {
        //     this.fees += Number.parseFloat(i.money)
        //     if (i['上缴北船']) {
        //       this.turn_in_fees += Number.parseFloat(i.money)
        //     }
        //   }
        // }
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
  .el-form-item{
    margin: 0 ;
  }
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
