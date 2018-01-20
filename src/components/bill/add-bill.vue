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
                    <el-form-item label="房间号" >
                      <el-input v-model="form.room"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="col-md-12">
                  <p class="title">费用明细：</p>
                  <el-form :model="form" ref="form" label-width="70px" class="demo-dynamic">
                    <el-form-item
                      v-for="(item, index) in form.items"
                      :key="item.type">
                      <el-row :gutter="10">
                        <el-col :md="3" :xs="24">
                          <el-select v-model="item.type" v-loading="billTypesLoading" placeholder="选择费用类型">
                            <el-option v-for="(type, index) in billTypes" :key="type.id" :label="type.title" :value="type.id"></el-option>
                          </el-select>
                        </el-col>
                        <el-col :md="3" :xs="24">
                          <el-input v-model="item.amount" placeholder="金额"></el-input>
                        </el-col>
                        <el-col :md="6" :xs="24">
                          <el-input v-model="item.description" placeholder="费用说明"></el-input>
                        </el-col>
                        <el-col :md="6" :xs="24">
                          <el-input v-model="item.remark" placeholder="备注"></el-input>
                        </el-col>
                        <el-col :md="2" :xs="24">
                          <el-button v-if="index!=0" @click.prevent="removeItem(item)">删除</el-button>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="text" @click="addNewItem">新增费用</el-button>
                    </el-form-item>
                  </el-form>
                  <p>
                    费用生成后立即缴费：
                    <el-switch v-model="form.charge" active-color="#00a65a"></el-switch>
                  </p>
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
      billTypesLoading:false,
      billTypes:[],
      buttonMsg: "提 交",
      //fees 和 turn_in_fees 必须在后台重新算，因此不计入form
      // fees: 0,
      // turn_in_fees: 0,
      // form.late_rate 必须除以100
      // late_rate:0.3,
      form: {
        room:null,
        name:null,
        charge:false,
        items: [{
          type: '',
          amount: '',
          description: '',
          remark:''
        }]
      }
    }
  },
  methods: {
    getBillTypes(){
      if (!sessionStorage.getItem('bill-types')) {
        this.billTypesLoading = true
        this.http.get({
          url: 'bill-types',
          success: (result) => {
            this.billTypes = result.data
            this.billTypesLoading = false
            sessionStorage.setItem('bill-types', JSON.stringify(result.data))
          }
        })
      } else {
        this.billTypes = JSON.parse(sessionStorage.getItem('bill-types'))
      }
    },
    addNewItem(){
      this.form.items.push({
        type: null,
        amount: null,
        description:null,
        remark: null
      })
    },
    removeItem(item) {
       var index = this.form.items.indexOf(item)
       if (index !== -1) {
         this.form.items.splice(index, 1)
       }
     },
    submit() {
      this.buttonMsg = '提交中...'
      $('#submitButton').attr('disabled', 'disabled')
      this.http.post({
        url: '/bill',
        data: this.form,
        successMsg: '添加成功',
        success: (res) => {
          this.log(res)
          this.resetForm()
        },
        done: () => {
          this.buttonMsg = '提 交'
          $('#submitButton').removeAttr('disabled')
        }
      })
    },
    resetForm() {
      this.form = {
        charge:false,
        items: [{
          type: null,
          fees: null,
          remark: null,
          late_fees_base:null,
          late_at:null
        }]
      }
    }
  },
  mounted() {
    // 计算内容区域高度
    window.resizeContent();
    this.getBillTypes();
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
   p{
    color:#48576a;
    margin: 15px 0 ;
    font-weight: bold;
  }

</style>
