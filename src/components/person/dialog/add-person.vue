<template>
  <div>
    <div class="person-add" @click="addPerson(roomIndex)">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </div>

    <el-dialog title="人员入住" :visible.sync="checkinFormVisible">
      <div class="row" v-loading="getRoomLoading">
        <div class="col-md-6">
          <el-form :model="person"  label-position="left">
            <el-form-item label="房间号" label-width="68px">
              {{ personMeta.room }} — {{ personMeta.room_type }}
            </el-form-item>
            <el-form-item label="姓名" label-width="68px">
              <el-input v-model="person.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" label-width="68px">
              <el-radio class="radio" v-model="person.gender" label="男">男</el-radio>
              <el-radio class="radio" v-model="person.gender" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="学历" label-width="68px">
              <el-radio-group v-model="person.education" size="small">
               <el-radio-button label="专科"></el-radio-button>
               <el-radio-button label="本科"></el-radio-button>
               <el-radio-button label="硕士"></el-radio-button>
               <el-radio-button label="博士"></el-radio-button>
               <el-radio-button label="其他"></el-radio-button>
             </el-radio-group>
            </el-form-item>
            <el-form-item label="部门" label-width="68px">
              <el-input v-model="person.department" ></el-input>
            </el-form-item>
            <el-form-item label="身份证号" label-width="68px">
              <el-input v-model="person.identify" ></el-input>
            </el-form-item>
            <el-form-item label="入住时间" label-width="68px">
              <el-input v-model="person.checkin_at" ></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="68px">
              <el-input v-model="person.phone_number" ></el-input>
            </el-form-item>
            <el-form-item label="备用电话" label-width="68px">
              <el-input v-model="person.standby_phone_number" ></el-input>
            </el-form-item>
            <el-form-item label="床号" label-width="68px">
              <el-input v-model="person.bed_number" ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div class="col-md-6">
        <el-form :model="person">
          <el-form-item label=" " label-width="110px">&nbsp;</el-form-item>
          <el-form-item label="劳动合同起始日" label-width="110px" v-if="personMeta.has_contract">
            <el-input v-model="person.contract_start_date" ></el-input>
          </el-form-item>
          <el-form-item label="劳动合同结束日" label-width="110px" v-if="personMeta.has_contract">
            <el-col :sm="13">
              <el-input v-model="person.contract_end_date" :disabled="noEdit"></el-input>
            </el-col>
            <el-col :sm="10">
              &nbsp;&nbsp;<el-checkbox v-model="openEnded">无固定期</el-checkbox>
            </el-col>
          </el-form-item>
          <el-form-item label="租房合同起始日" label-width="110px" v-if="personMeta.has_contract">
            <el-input v-model="person.rent_start_date"></el-input>
          </el-form-item>
          <el-form-item label="租房合同结束日" label-width="110px" v-if="personMeta.has_contract">
            <el-input v-model="person.rent_end_date" ></el-input>
          </el-form-item>
          <el-form-item label="配偶姓名" label-width="110px" v-if="!personMeta.is_single">
            <el-input v-model="person.spouse" ></el-input>
          </el-form-item>
          <el-form-item label="配偶电话" label-width="110px" v-if="!personMeta.is_single">
            <el-input v-model="person.spouse_phone_number" ></el-input>
          </el-form-item>
          <el-form-item label="配偶身份证号" label-width="110px" v-if="!personMeta.is_single">
            <el-input v-model="person.spouse_identify" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkinFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="store">{{storeButtonMsg}}</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'add-person-dialog',
  props:['roomIndex', 'room'],
  data () {
    return {
      checkinFormVisible: false,
      currentRoom:{},
      getRoomLoading: false,
      openEnded: false,
      noEdit: false,
      person: {
        room_id:null,
        name: null,
        gender: null,
        education: null,
        department: null,
        checkin_at: null,
        phone_number: null,
        rent_start_date: null,
        rent_end_date: null,
        identify: null,
        standby_phone_number:null,
        contract_start_date:null,
        contract_end_date:null,
        spouse:null,
        spouse_identify:null,
        spouse_phone_number:null,
        bed_number:null,
        remark:null
      },
      personMeta: {
        room:'',
        room_type:'',
        has_contract: true,
        is_single:false
      },
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
    addPerson() {
      // const roomIndex = this.roomIndex
      // this.currentRoomIndex = this.roomIndex
      this.currentRoom = this.room
      this.checkinFormVisible = true
      let roomId = this.currentRoom.id
      this.resetPerson()
      this.getRoom(roomId)
    },
    getRoom(roomId) {
      this.getRoomLoading = true
      this.http.get({
        url:'rooms/' + roomId,
        success: (data) => {
          this.person.room_id = data.id
          this.personMeta.room = data.display_name
          this.personMeta.room_type = data.type.name
          // this.personMeta.has_contract = result.data.type.has_contract
          // TODO
          this.personMeta.has_contract = true
          this.personMeta.is_single = data.type.is_single
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
.el-form-item{
  margin: 0 ;
}
.person-add{
  display: block;
  cursor: pointer;
  line-height: 131px;
  text-align: center;
  font-size: 42px;
}
.person-add i{
  color:gray;
}
.person-add {
  color: #000000;
}
</style>
