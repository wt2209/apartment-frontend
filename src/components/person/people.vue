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
          <li class="active">这是模板 </li>
        </ol>
        <div class="search-nav">
          <div class="col-md-3">
            请选择：
            <el-cascader
              width="500px"
              v-loading="roomStructureLoading"
              :options="roomStructure"
              placeholder="选择楼号"
              popper-class="cascader"
              clearable
              @change="selectChange">
            </el-cascader>
          </div>
          <div class="col-md-3">
            <el-input
              placeholder="搜索"
              icon="search"
              v-model="search"
              :on-icon-click="handleIconClick">
            </el-input>
          </div>
        </div>
      </section>

      <section class="content">
        <div class="container-fluid main-content">
          <div class="row" v-loading="loading">
            <div class="col-md-6 room" v-for="room in rooms" :key="room.key">
              <el-card class="room-card"
                :body-style="{ padding: '5px' }">
                <div slot="header">
                  <span style="font-size:24px;">{{room.display_name}}</span>
                  <span style="margin-left:8px;">
                    {{room.remark}}
                  </span>
                  <span class="pull-right">
                    <el-button type="text">房间记录</el-button>
                  </span>
                </div>
                <el-row>
                    <el-col :xs="24" :sm="12" v-for="index in room.person_number" :key="room.people.key">
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
                      <el-card  v-else class="person-card" :body-style="{ padding: '5px' }">
                        <a href="#/add-person" class="person-add">
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                        </a>
                      </el-card>
                    </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
        </div>

      </section>
  </div>
</template>

<script>
export default {
  name: 'people',
  data () {
    return {
      loading: false,
      roomStructureLoading: false,
      rooms: [],
      search:'',
      roomStructure: [],
    }
  },
  methods: {
    handleIconClick() {

    },
    selectChange(value) {
      if (value.length < 3) {
        return
      }
      const option = {
        typeId: value[0],
        building: value[1],
        unit: value[2]
      }
      this.loading = true,
      this.http.get({
        url: 'people',
        params: option,
        success: (res) => {
          this.rooms = res.data
        },
        done: ()=>{
          this.loading = false
        }
      })

      this.log(value);
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
  .person{
    height: auto;
    overflow: hidden;
  }
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
