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
              v-model="searchInput">
               <el-button slot="append" icon="el-icon-search"  @click="searchByInput"></el-button>
            </el-input>

          </div>
          <div class="pull-left">
            <el-form :inline="true" :model="rentDateSearchOption">
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
                  style="width:140px;"
                  placeholder="开始日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item v-if="rentDateSearchOn" prop="end_date">
                <el-date-picker
                 style="width:140px;"
                  v-model="rentDateSearchOption.end_date"
                  type="date"
                  placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item v-if="rentDateSearchOn">
                <el-button icon="el-icon-search" type="default" @click="searchByDate">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </section>
      <el-popover
        ref="popovermore"
        placement="bottom"
        title="标题"
        width="200"
        trigger="click"
        content="11111111">
      </el-popover>
      <section class="content">
        <div class="container-fluid main-content">
          <div class="row" v-loading="loading">
            <div class="col-md-6 room"
              v-for="(room, roomIndex) in rooms"
              :key="room.id">
              <el-card class="room-card"
                :body-style="{ padding: '5px' }">
                <div class="card-header">
                  <el-row :gutter="5">
                    <el-col :span="6">
                      <h2 @click="searchRoom" style="font-size:24px;cursor:pointer">{{room.display_name}}</h2>
                      <el-button type="text">调整用途</el-button>
                    </el-col>
                    <el-col :span="18">
                      <el-row :gutter="5">
                        <el-col :span="18" style="margin-top:5px;">
                          {{room.remark}}&nbsp;备注
                        </el-col>
                        <el-col :span="6">
                          <div class="pull-right">
                            <history-record :roomId="room.id"></history-record>

                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
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
                              <p>{{room.people[i - 1].department}}&nbsp;</p>
                              <p>{{room.people[i - 1].phone_number}}&nbsp;</p>
                            </el-col>
                            <el-col :span="12">
                              <p v-if="room.people[i - 1].checkin_at">入住时间</p>
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
                            <el-col :span="18">
                              <p>备注：</p>{{room.people[i - 1].remark}}
                            </el-col>
                            <el-col :span="6">
                              <div class="pull-right">
                                <el-popover
                                  placement="top"
                                  width="250">
                                  <div>
                                    <p v-if="room.people[i - 1].identify">身份证号：{{room.people[i - 1].identify}}</p>
                                    <p v-if="room.people[i - 1].bed_number">床号：{{room.people[i - 1].bed_number}}</p>
                                    <p v-if="room.people[i - 1].standby_phone_number">备用电话：{{room.people[i - 1].standby_phone_number}}</p>
                                    <p v-if="room.people[i - 1].spouse">配偶姓名：{{room.people[i - 1].spouse}}</p>
                                    <p v-if="room.people[i - 1].spouse_phone_number">配偶电话：{{room.people[i - 1].spouse_phone_number}}</p>
                                    <p v-if="room.people[i - 1].spouse_identify">配偶身份证号：{{room.people[i - 1].spouse_identify}}</p>
                                  </div>
                                  <a href="javascript:;" slot="reference" class="more" @click="moreInfo(roomIndex, room.people[i - 1].id)">详细>></a>
                                </el-popover>
                              </div>
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
                        <add-person :roomIndex="roomIndex" :room="room" v-on:success="personAdded"></add-person>
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
  </div>
</template>

<script>
import AddPerson from '@/components/person/dialog/add-person'
import HistoryRecord from '@/components/person/dialog/history-record'

export default {
  name: 'people',
  components: {
    AddPerson,
    HistoryRecord
  },
  data () {
    return {
      currentPerson: {},
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
      roomStructure: []
    }
  },
  methods: {
    moreInfo(roomIndex, personId) {
      const room = this.rooms[roomIndex]
      for (const p of room.people) {
        if (p.id == personId) {
          this.currentPerson = p
          break
        }
      }
    },
    personAdded(ret) {
      this.rooms[ret.index].people.push(ret.person)
      this.peopleCount++
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
  .rent-date-search{
    height: 100%;
    vertical-align: middle;
  }
  .el-card .card-header{
    padding: 0 5px 0;
    border-bottom: 1px solid rgb(209, 219, 229);
    overflow: hidden;
  }
  .el-card .card-header h2{
    margin-top: 3px;
  }
  .card-header .header-left{
    width:120px;
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
  .el-form-item{
    margin: 0 ;
  }
  .more{
    display: inline-block;
    margin-top: 3px;
    color: #d73925;
    font-size: 12px;
  }
  .more:hover{
    color: #c9302c;
  }

</style>
