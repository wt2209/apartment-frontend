<template>
  <div class="add-nav">
      <section class="content-header">
        <h1>
          添加导航
          <!-- 刷新按钮 -->
          <!-- <small>&nbsp;&nbsp;&nbsp;<a class="pull-right glyphicon glyphicon-refresh" href="#rooms"></a></small> -->
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
          <li class="active">添加导航 </li>
        </ol>
      <div class="search-nav">
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
        <div class="row">
          <div class="col-xs-12">
            <div class="panel panel-default">
              <div class="panel-heading">
                添加导航
              </div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-4">
                    <el-form ref="add-nav" :rules="rules" :model="form" label-width="100px">
                      <el-form-item label="name">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                      <el-form-item label="display_name">
                        <el-input v-model="form.display_name"></el-input>
                      </el-form-item>
                      <el-form-item label="父级" prop="parent">
                        <el-select v-model="form.parent_id" clearable placeholder="请选择父级" :loading="loading">
                          <el-option :label="root.label" :value="root.value" default></el-option>
                          <el-option v-for="node in form.nodes" :key="node.id" :label="node.display_name" :value="node.id"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="url">
                        <el-input v-model="form.url"></el-input>
                      </el-form-item>
                      <el-form-item label="icon">
                        <el-input v-model="form.icon"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit('add-nav')">立即创建</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="col-xs-8">
                    <p>现有导航：</p>
                    <el-tree
                      :data="tree"
                      v-loading="treeLoading"
                      default-expand-all
                      node-key="id"
                      highlight-current
                      :props="defaultProps">
                    </el-tree>
                  </div>
                </div>
                <!-- <el-row  :gutter="40">
                  <el-col :span="8">

                  </el-col>
                  <el-col :span="16">

                  </el-col>
                </el-row> -->
              </div>
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

import axios from 'axios'
export default {
  name: 'add-nav',
  data () {
    return {
      search: '',
      loading:true,
      treeLoading:true,
      form: {
        name: '',
        display_name: '',
        nodes: [],
        parent_id: '',
        url: '',
        icon: '',
      },
      tree: [],
      defaultProps:{label: 'display_name',  children: 'children'},
      root: {
        label: '根',
        value: 0
      },
      rules:{
        parent_id: [
            { type: 'number', required: true, message: '请选择父级', trigger: 'change' }
          ],
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addNode()
          } else {
            return false
          }
      })
    },
    handleIconClick(){

    },
    getRootNodes(){
      this.loading = true
      this.http.get({
        url: 'root-nodes',
        success: (res) => {
          this.form.nodes = res.data
        },
        done: () => {
          this.loading = false
        }
      })
    },
    getNavigationTree() {
      this.treeLoading = true
      this.http.get({
        url: 'navigations',
        success: (res) => {
          this.tree = res.data
        },
        done: () => {
          this.treeLoading = false
        }
      })
    },
    addNode() {
      console.log('start')
      let postData = {
        name: this.form.name,
        display_name: this.form.display_name,
        url: this.form.url,
        icon: this.form.icon,
        parent_id: this.form.parent_id
      }
      this.http.post({
        url: 'navigation',
        data: postData,
        success: (res) => {
          this.getNavigationTree()
        }
      })
    }
  },
  mounted() {
    window.resizeContent()
    this.getRootNodes()
    this.getNavigationTree()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
