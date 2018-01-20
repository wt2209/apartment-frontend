<template>
  <div>
    <el-button type="text" @click="showDialog">房间历史</el-button>

    <el-dialog title="房间历史" :visible.sync="dialogVisible" width="30%">
      <el-row class="row" v-loading="getRoomHistoryLoading">
        <el-steps direction="vertical">
          <el-step title="2017-11-21" status="process" icon="fa fa-circle-o" description="这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤 2" status="process" icon="fa fa-circle-o"></el-step>
          <el-step title="步骤 3" status="process" icon="fa fa-circle-o" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
      </el-row>
      <el-row class="row" :gutter="5">
        <el-col :md="7" :xs="24">
          <el-date-picker
           style="width:140px;"
            type="date"
            size="small"
            placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :md="12" :xs="24">
          <el-input type="textarea"
            placeholder="请输入内容"
            :autosize="{minRows: 1, maxRows: 4}" ></el-input>
        </el-col>
        <el-col :md="5" :xs="24">
          <el-button type="success" size="small" @click="addRecord">新增记录</el-button>
        </el-col>
      </el-row>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="checkinFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="store">{{storeButtonMsg}}</el-button>
      </div> -->
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'add-person-dialog',
  props:['roomIndex', 'room'],
  data () {
    return {
      dialogVisible: false,
      currentRoom:{},
      getRoomHistoryLoading: false,
      openEnded: false,
      noEdit: false,
      storeButtonMsg: '提 交',
    }
  },
  watch: {
    openEnded: function (value) {
      if (value === true) {
        this.person.contract_end_date = '无固定期'
        this.noEdit = true
      } else {
        this.person.contract_end_date = ''
        this.noEdit = false
      }
    }
  },
  methods: {
    showDialog() {

      this.dialogVisible = true

    },
    addRecord() {

    },


    getRoom(roomId) {
      this.getRoomLoading = true
      this.http.get({
        url:'rooms/' + roomId,
        success: (result) => {
          this.person.room_id = result.data.id
          this.personMeta.room = result.data.display_name
          this.personMeta.room_type = result.data.type.name
          // this.personMeta.has_contract = result.data.type.has_contract
          // TODO
          this.personMeta.has_contract = true
          this.personMeta.is_single = result.data.type.is_single
        },
        done: ()=>{
          this.getRoomLoading = false
        }
      })
    },
    store() {
      this.storeButtonMsg = '提交中...'
      this.http.post({
        url: 'people',
        data: this.person,
        success:(data) => {
          let ret = {
            index: this.roomIndex,
            person: this.person
          }
          ret.person.id = data.id
          this.checkinFormVisible = false
          this.$emit('success', ret)
        },
        successMsg: '保存成功',
        done:()=>{
          this.storeButtonMsg = '提 交'
        }
      })
    },
    resetPerson() {
      // reset
      for (var p in this.person) {
        if (this.person.hasOwnProperty(p)) {
          this.person[p] = null
        }
      }
      this.personMeta.room = ''
      this.personMeta.room_type = ''
      this.personMeta.has_contract = false
      this.personMeta.is_single = false
    }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label{
  font-weight: normal;
  margin:0;
}
.row {
  padding:0 20px 20px;
}
.item{
  line-height: 1.2em;
}
</style>
