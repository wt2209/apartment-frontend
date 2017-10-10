<template>
  <div class="people">
      <section class="content-header">
        <h1>
          住户
          <!-- 刷新按钮 -->
          <!-- <small>&nbsp;&nbsp;&nbsp;<a class="pull-right glyphicon glyphicon-refresh" href="#rooms"></a></small> -->
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
          <li class="active">住户 </li>
        </ol>
        <div class="search-nav">
          <div class="pull-left" style="margin-right: 50px;">
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
          <div class="pull-left" style="margin-right: 50px;" @keyup.enter="searchByInput">
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
              <el-form-item v-if="rentDateSearchOn" prop="startDate">
                <el-select v-model="rentDateSearchOption.dateType" style="width:115px;">
                  <el-option label="租赁开始日" value="start"></el-option>
                  <el-option label="租赁结束日" value="end"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="rentDateSearchOn" prop="startDate">
                <el-date-picker
                  v-model="rentDateSearchOption.startDate"
                  type="date"
                  style="width:125px;"
                  placeholder="开始日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item v-if="rentDateSearchOn" prop="endDate">
                <el-date-picker
                 style="width:125px;"
                  v-model="rentDateSearchOption.endDate"
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
              v-for="room in rooms"
              :key="room.key">
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
                    <el-col :xs="24" :sm="room.person_number > 1 ? 12 : 24" v-for="index in room.person_number" :key="room.people.key">
                      <el-card class="person-card" v-if="room.people[index - 1]" :body-style="{ padding: '5px' }">
                        <div class="person-name">
                          {{ room.people[index - 1].name }}
                          <span style="font-size:12px">
                            ({{room.people[index - 1].gender}}<span v-if="room.people[index - 1].education">， 硕士</span>)
                          </span>
                        </div>
                        <div class="person-detail">
                          <el-row :gutter="5" >
                            <el-col :span="12">
                              <p>{{room.people[index - 1].department}}</p>
                              <p>{{room.people[index - 1].phone_number}}</p>
                            </el-col>
                            <el-col :span="12">
                              <p>入住时间</p>
                              <p>{{room.people[index - 1].checkin_at}}</p>
                            </el-col>
                          </el-row>
                        </div>
                        <div class="person-detail" v-if="room.people[index - 1].rent_start_date">
                          <el-row :gutter="5">
                            <el-col :span="12">
                              <p>租赁合同</p>
                              <p>{{room.people[index - 1].rent_start_date}} — {{room.people[index - 1].rent_end_date}}</p>
                            </el-col>
                            <el-col :span="12">
                              <p>劳动合同</p>
                              <p>{{room.people[index - 1].contract_start_date}} — {{room.people[index - 1].contract_end_date}}</p>
                            </el-col>
                          </el-row>
                        </div>
                        <div class="person-detail">
                          <el-row >
                            <el-col :span="24">
                              <p>备注：</p>{{room.people[index - 1].remark}}
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
                        <router-link :to="{ name: 'add-person', params: { id: room.id}}" class="person-add">
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                        </router-link>
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
export default {
  name: 'people',
  data () {
    //date1 > date2
    const bigger = (date1, date2) => {
      const d1 = new Date(date1)
      const d2 = new Date(date2)
      return d1 > d2 || d1 == d2
    }
    // const isDate = (rule, value, callback) => {
    //   if (value != '') {
    //     this.log(value.toString())
    //     if (new Date(value).getDate() != value.substring(value.length-2)) {
    //       callback(new Error('请输入一个日期'))
    //     }
    //   }
    //   callback()
    // }
    const validateEndDate = (rule, value, callback) => {
      if (this.rentDateSearchOption.startDate != '') {
        if (bigger(this.rentDateSearchOption.startDate, value)) {
          callback(new Error('结束日期小于开始日期'))
        }
      }
      callback()
    }
    const validateStartDate = (rule, value, callback) => {
      if (this.rentDateSearchOption.endDate != '') {
        if (bigger(value, this.rentDateSearchOption.endDate)) {
          callback(new Error('开始日期大于结束日期'))
        }
      }
      callback()
    }
    return {
      loading: false,
      noDataMsg: '',
      roomStructureLoading: false,
      rooms: [],
      peopleCount: 0,
      roomCount: 0,
      searchInput:'',
      rentDateSearchOn: false,
      rentDateSearchOption: {
        dateType: 'start',
        startDate:'',
        endDate:''
      },
      selectedOption: [],
      roomStructure: [],
      rules:{
        startDate: [
          { validator: validateStartDate, trigger: 'change' }
        ],
        endDate: [
          { validator: validateEndDate, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    fetchData(params) {
      this.loading = true,
      this.http.get({
        url: 'people',
        params: params,
        success: (res) => {
          if (res.data.people.length == 0) {
            this.noDataMsg = '没有找到相关人员'
          } else {
            this.noDataMsg = ''
          }
          this.rooms = res.data.people
          this.peopleCount = res.data.peopleCount
          this.roomCount = res.data.roomCount
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
        this.fetchData({search: this.searchInput})
      }
    },
    searchByDate() {
      if (this.rentDateSearchOption.startDate != ''
            && this.rentDateSearchOption.endDate != '') {
        this.fetchData(this.rentDateSearchOption)
      }
    },
    searchRoom(event) {
      this.searchInput = event.target.innerText
      this.search({search: this.searchInput})
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
        this.fetchData(option)
      }
    },
    getRoomStructure() {
      if (!sessionStorage.getItem('room-structure')) {
        this.roomStructureLoading = true
        this.http.get({
          url: 'room-structure',
          success: (res) => {
            this.roomStructure = res.data
            this.roomStructureLoading = false
            $('.el-cascader').trigger('click')
            sessionStorage.setItem('room-structure', JSON.stringify(res.data))
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
    line-height: 100px;
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
