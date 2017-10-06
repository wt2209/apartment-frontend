<template>
  <div class="add-nav">
      <section class="content-header">
        <h1>
          这是模板
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
            v-model="selectedOptions2"
            placeholder="选择楼号"
            popper-class="cascader"
            clearable
            @change="handleChange">
          </el-cascader>
        </div>
        <div class="col-md-3">
          <el-input
            placeholder="搜索"
            icon="search"
            v-model="input"
            :on-icon-click="handleIconClick">
          </el-input>
        </div>

        </div>
      </section>

      <section class="content">
        <div class="container-fluid main-content">
          <div class="row">
            <div class="col-md-6">
              <el-card class="room-card" :body-style="{ padding: '5px' }">
                <div slot="header">
                  <span style="font-size:24px;">7-1-101</span>
                  <span style="margin-left:8px;">
                    房间备注
                  </span>
                  <span class="pull-right">
                    <el-button type="text">房间记录</el-button>
                  </span>
                </div>
                <el-row>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row >
                          <el-col :span="24">
                            <p>备注：</p>
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
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="24">
                            <p>备注：</p>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="24">
                            <p>备注：</p>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <a href="#/add-person" class="person-add">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                      </a>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </div>
            <div class="col-md-6">
              <el-card class="room-card" :body-style="{ padding: '5px' }">
                <div slot="header">
                  <span style="font-size:24px;">7-1-101</span>
                  <span style="margin-left:8px;">
                    房间备注
                  </span>
                  <span class="pull-right">
                    <el-button type="text">房间记录</el-button>
                  </span>
                </div>
                <el-row>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row >
                          <el-col :span="24">
                            <p>备注：</p>
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
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="24">
                            <p>备注：</p>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="24">
                            <p>备注：</p>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <a href="#/add-person" class="person-add">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                      </a>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </div>
            <div class="col-md-6">
              <el-card class="room-card" :body-style="{ padding: '5px' }">
                <div slot="header">
                  <span style="font-size:24px;">7-1-101</span>
                  <span style="margin-left:8px;">
                    房间备注
                  </span>
                  <span class="pull-right">
                    <el-button type="text">房间记录</el-button>
                  </span>
                </div>
                <el-row>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row >
                          <el-col :span="24">
                            <p>备注：</p>
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
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="24">
                            <p>备注：</p>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="24">
                            <p>备注：</p>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <a href="#/add-person" class="person-add">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                      </a>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </div>
            <div class="col-md-6">
              <el-card class="room-card" :body-style="{ padding: '5px' }">
                <div slot="header">
                  <span style="font-size:24px;">7-1-101</span>
                  <span style="margin-left:8px;">
                    房间备注
                  </span>
                  <span class="pull-right">
                    <el-button type="text">房间记录</el-button>
                  </span>
                </div>
                <el-row>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row >
                          <el-col :span="24">
                            <p>备注：</p>
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
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="24">
                            <p>备注：</p>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="24">
                            <p>备注：</p>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <a href="#/add-person" class="person-add">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                      </a>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </div>
            <div class="col-md-6">
              <el-card class="room-card" :body-style="{ padding: '5px' }">
                <div slot="header">
                  <span style="font-size:24px;">7-1-101</span>
                  <span style="margin-left:8px;">
                    房间备注
                  </span>
                  <span class="pull-right">
                    <el-button type="text">房间记录</el-button>
                  </span>
                </div>
                <el-row>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row >
                          <el-col :span="24">
                            <p>备注：</p>
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
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="24">
                            <p>备注：</p>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
                      <div class="person-name">
                        张三 <span style="font-size:12px">(男， 硕士)</span>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5" >
                          <el-col :span="12">
                            <p>涂装工程部</p>
                            <p>13963922214</p>
                          </el-col>
                          <el-col :span="12">
                            <p>入住时间</p>
                            <p>2015-7-1</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <p>租赁合同</p>
                            <p>2013-7-31—2017-12-31</p>
                          </el-col>
                          <el-col :span="12">
                            <p>劳动合同</p>
                            <p>2013-7-31— 2017-12-31</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="person-detail">
                        <el-row :gutter="5">
                          <el-col :span="24">
                            <p>备注：</p>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-card class="person-card" :body-style="{ padding: '5px' }">
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
      <div class="footer">
        <div class="footer-content">

        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'add-nav',
  data () {
    return {
      roomStructureLoading: false,
      msg:'',
      input:'',
      types:'',
      building:'',
      unit:'',
      roomStructure: [],
      selectedOptions2: []
    }
  },
  methods: {
    handleIconClick() {

    },
    handleChange(value) {
      console.log(value);
    },
    getRoomStructure() {
      if (!sessionStorage.getItem('room-structure')) {
        this.roomStructureLoading = true
        this.http.get({
          url: 'room-structure',
          success: (res) => {
            this.roomStructure = res.data
            this.roomStructureLoading = false
            // $('.el-cascader').trigger('click')
            sessionStorage.setItem('room-structure', JSON.stringify(res.data))
          }
        })
      } else {
        this.roomStructure = JSON.parse(sessionStorage.getItem('room-structure'))
        // $('.el-cascader').trigger('click')
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
  .el-row .el-col:nth-child(odd){
    clear: both;
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
    line-height: 100px;
    text-align: center;
    font-size: 36px;
  }
  .person-add i{
    color:gray;
  }
  .person-add {
    color: #000000;
  }
</style>
