<template>
  <div class="people">
      <section class="content-header">
        <h1>住户</h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
          <li class="active">住户 </li>
        </ol>
        <div class="search-nav">
          <div class="pull-left" style="margin-right: 68px;">
            <el-cascader
              width="500px"
              v-loading="roomStructureLoading"
              :options="roomStructure"
              v-model="selectedOption"
              placeholder="选择楼号"
              popper-class="cascader"
              clearable
              @change="selectChange">
            </el-cascader>
          </div>
          <div class="pull-left" style="margin-right: 68px;" @keyup.enter="searchByInput">
            <el-input
              placeholder="搜索"
              icon="search"
              v-model="searchInput"
              :on-icon-click="searchByInput">
            </el-input>
          </div>
          <div class="pull-left">
            <el-form :inline="true" :rules="rules" :model="rentDateSearchOption">
              <el-form-item>
                <el-checkbox v-model="rentDateSearchOn">租期搜索&nbsp;&nbsp;&nbsp;</el-checkbox>
              </el-form-item>
              <el-form-item v-if="rentDateSearchOn" prop="date_type">
                <el-select v-model="rentDateSearchOption.date_type" style="width:115px;">
                  <el-option label="租赁开始日" value="start"></el-option>
                  <el-option label="租赁结束日" value="end"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="rentDateSearchOn" prop="start_date">
                <el-date-picker
                  v-model="rentDateSearchOption.start_date"
                  type="date"
                  style="width:125px;"
                  placeholder="开始日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item v-if="rentDateSearchOn" prop="end_date">
                <el-date-picker
                 style="width:125px;"
                  v-model="rentDateSearchOption.end_date"
                  type="date"
                  placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item v-if="rentDateSearchOn">
                <el-button icon="search" type="primary" @click="searchByDate">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </section>

      <section class="content">
        <div class="container-fluid main-content">
          <div class="row" v-loading="loading">
            <div class="col-md-6 room"
              v-for="(room, roomIndex) in rooms"
              :key="room.id">
              <el-card class="room-card"
                :body-style="{ padding: '5px' }">
                <div slot="header">
                  <span style="font-size:24px;cursor:pointer" @click="searchRoom">
                    {{room.display_name}}
                  </span>
                  <span style="margin-left:8px;">
                    {{room.remark}}
                  </span>
                  <span class="pull-right">
                    <el-button type="text">房间记录</el-button>
                  </span>
                </div>
                <el-row>
                    <el-col :xs="24" :sm="room.person_number > 1 ? 12 : 24" v-for="i in room.person_number" :key="i">
                      <el-card class="person-card" v-if="room.people[i - 1]" :body-style="{ padding: '5px' }">
                        <div class="person-name">
                          {{ room.people[i - 1].name }}
                          <span style="font-size:12px">
                            ({{room.people[i - 1].gender}}<span v-if="room.people[i - 1].education">， 硕士</span>)
                          </span>
                        </div>
                        <div class="person-detail">
                          <el-row :gutter="5" >
                            <el-col :span="12">
                              <p>{{room.people[i - 1].department}}</p>
                              <p>{{room.people[i - 1].phone_number}}</p>
                            </el-col>
                            <el-col :span="12">
                              <p>入住时间</p>
                              <p>{{room.people[i - 1].checkin_at}}</p>
                            </el-col>
                          </el-row>
                        </div>
                        <div class="person-detail" v-if="room.people[i - 1].rent_start_date">
                          <el-row :gutter="5">
                            <el-col :span="12">
                              <p>租赁合同</p>
                              <p>{{room.people[i - 1].rent_start_date}} — {{room.people[i - 1].rent_end_date}}</p>
                            </el-col>
                            <el-col :span="12">
                              <p>劳动合同</p>
                              <p>{{room.people[i - 1].contract_start_date}} — {{room.people[i - 1].contract_end_date}}</p>
                            </el-col>
                          </el-row>
                        </div>
                        <div class="person-detail">
                          <el-row >
                            <el-col :span="24">
                              <p>备注：</p>{{room.people[i - 1].remark}}
                            </el-col>
                          </el-row>
                        </div>
                        <div class="person-buttons">
                          <button class="btn btn-warning btn-xs">退房</button>
                          <button class="btn btn-success btn-xs">调房</button>
                          <button class="btn btn-success btn-xs">修改</button>
                          <button class="btn btn-danger btn-xs">删除</button>
                        </div>
                      </el-card>
                      <el-card v-else class="person-card" :body-style="{ padding: '5px' }">
                        <div class="person-add" @click="addPerson(roomIndex)">
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                      </el-card>
                    </el-col>
                </el-row>
              </el-card>
            </div>
            <div v-if="rooms.length == 0" class="no-data">{{ noDataMsg }}</div>
          </div>
        </div>
      </section>

      <div class="footer">
        <div class="footer-content">
          <p v-if="peopleCount || roomCount">
            共计 {{ peopleCount }} 人，{{ roomCount }} 个房间
          </p>
        </div>
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
            <el-form-item label="" label-width="68px" v-if="personMeta.has_contract">
              &nbsp;
            </el-form-item>
            <el-form-item label="劳动合同" label-width="68px" v-if="personMeta.has_contract">
              <el-input v-model="person.contract_start_date" ></el-input>
            </el-form-item>
            <el-form-item label="劳动合同" label-width="68px" v-if="personMeta.has_contract">
              <el-input v-model="person.contract_end_date" ></el-input>
            </el-form-item>
            <el-form-item label="租房合同起始日" label-width="68px" v-if="personMeta.has_contract">
              <el-input v-model="person.rent_start_date" ></el-input>
            </el-form-item>
            <el-form-item label="租房合同结束日" label-width="68px" v-if="personMeta.has_contract">
              <el-input v-model="person.rent_end_date" ></el-input>
            </el-form-item>
            <el-form-item label="配偶姓名" label-width="68px" v-if="!personMeta.is_single">
              <el-input v-model="person.spouse" ></el-input>
            </el-form-item>
            <el-form-item label="配偶电话" label-width="68px" v-if="!personMeta.is_single">
              <el-input v-model="person.spouse_phone_number" ></el-input>
            </el-form-item>
            <el-form-item label="配偶身份证号" label-width="68px" v-if="!personMeta.is_single">
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
  name: 'people',
  data () {
    //date1 > date2
    const bigger = (date1, date2) => {
      const d1 = new Date(date1)
      const d2 = new Date(date2)
      return d1 > d2 || d1 == d2
    }
    const validateEndDate = (rule, value, callback) => {
      if (this.rentDateSearchOption.start_date != '') {
        if (bigger(this.rentDateSearchOption.start_date, value)) {
          callback(new Error('结束日期小于开始日期'))
        }
      }
      callback()
    }
    const validateStartDate = (rule, value, callback) => {
      if (this.rentDateSearchOption.end_date != '') {
        if (bigger(value, this.rentDateSearchOption.end_date)) {
          callback(new Error('开始日期大于结束日期'))
        }
      }
      callback()
    }
    return {
      checkinFormVisible: false,
      checkinRoomIndex: '',
      getRoomLoading: false,
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
      loading: false,
      noDataMsg: '',
      roomStructureLoading: false,
      rooms: [],
      currentRoomIndex:0,
      peopleCount: 0,
      roomCount: 0,
      searchInput:'',
      rentDateSearchOn: false,
      rentDateSearchOption: {
        date_type: 'start',
        start_date:'',
        end_date:''
      },
      selectedOption: [],
      roomStructure: [],
      rules:{
        start_date: [
          { validator: validateStartDate, trigger: 'change' }
        ],
        end_date: [
          { validator: validateEndDate, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    addPerson(roomIndex) {
      this.checkinFormVisible = true
      this.currentRoomIndex = roomIndex
      let roomId = this.rooms[roomIndex].id
      this.getRoom(roomId)
      // this.rooms[roomIndex].people.push(this.person)

    },
    getRoom(roomId) {
      this.resetPerson()
      this.getRoomLoading = true
      this.http.get({
        url:'rooms/' + roomId,
        success: (result) => {
          this.person.room_id = result.data.id
          this.personMeta.room = result.data.display_name
          this.personMeta.room_type = result.data.type.name
          this.personMeta.has_contract = result.data.type.has_contract
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
        success:(result) => {
          let person = this.person
          person.id = result.data.id
          this.rooms[this.currentRoomIndex].people.push(person)
          this.checkinFormVisible = false
          this.peopleCount++
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
    },
    fetchData(type, params) {
      this.loading = true
      params.search = type
      this.http.get({
        url: 'people',
        params: params,
        success: (result) => {
          if (result.data.length == 0) {
            this.noDataMsg = '没有找到相关人员'
          } else {
            this.noDataMsg = ''
          }
          this.rooms = result.data
          this.peopleCount = result.meta.peopleCount
          this.roomCount = result.meta.roomCount
        },
        done: ()=>{
          this.loading = false
        }
      })
    },
    searchByInput() {
      if (this.searchInput) {
        this.rentDateSearchOn = false
        this.selectedOption = []
        this.fetchData('keyword', {
          keyword: this.searchInput
        })
      }
    },
    searchByDate() {
      if (this.rentDateSearchOption.startDate != ''
            && this.rentDateSearchOption.endDate != '') {
        this.fetchData('date', this.rentDateSearchOption)
      }
    },
    searchRoom(event) {
      this.searchInput = event.target.innerText
      this.fetchData('keyword', {
        keyword: this.searchInput
      })
    },
    selectChange(value) {
      if (value.length == 3) {
        this.searchInput = ''
        this.rentDateSearchOn = false
        const option = {
          type: value[0],
          building: value[1],
          unit: value[2]
        }
        this.fetchData('select', option)
      }
    },
    getRoomStructure() {
      if (!sessionStorage.getItem('room-structure')) {
        this.roomStructureLoading = true
        this.http.get({
          url: 'room-structure',
          success: (result) => {
            this.roomStructure = result.data
            this.roomStructureLoading = false
            $('.el-cascader').trigger('click')
            sessionStorage.setItem('room-structure', JSON.stringify(result.data))
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
  .search-nav{
    padding: 10px 15px 16px;
  }
  .rent-date-search{
    height: 100%;
    vertical-align: middle;
  }
  .el-form-item{
    margin: 0 ;
  }
  .main-content{
    max-width: 1200px;
  }
  .room-card{
    margin-bottom: 15px;
  }
  .person-card{
    margin:3px;
    background-color: rgb(93, 173, 226);
    /*background-color: #eeeeee;*/
  }
  .row{
    min-height: 200px;
  }
  .row .no-data{
    line-height: 68px;
    font-size: 22px;
    color: #999;
    font-weight: normal;
    text-align: center;
  }
  .person{
    height: auto;
    overflow: hidden;
  }
  .row .room:nth-child(odd),
  .el-row .el-col:nth-child(odd){
    clear: both;
    /*background-color: red;*/
  }
  .person-name{
    font-size: 16px;
    padding: 0 0 3px 3px;
    font-weight: bold;
  }
  .person-detail{
    font-size: 12px;
    padding: 3px 8px;
    border-top: 1px solid #7ec4e6;
  }
  .person-detail p{
    margin-top: 3px;
    padding:0;
  }
  .person-buttons{
    margin-top: 10px;
  }
  .clearfix{
    clear: both;
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
