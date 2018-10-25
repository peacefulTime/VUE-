<template>
    <div class="home">
    <el-container>
    <!-- 侧边栏 -->
      <el-aside width='auto'>
          <el-row class="tac">
              <!-- <el-col :span="12"> -->
    <div class="logo"></div>
    <el-menu index="1"
      default-active="/user"
      class="el-menu-admin"
      :unique-opened="true"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      :router='true'
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="item.path" v-for="item in menueData" :key="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item :index="tag.path" v-for="tag in item.children" :key="tag.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{tag.authName}}</span>
          </el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="/right">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
          </el-menu-item>
           <el-menu-item index="/role">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
          </el-menu-item>
      </el-submenu> -->
    </el-menu>
  <!-- </el-col> -->
</el-row>
</el-aside>
      <el-container>
    <!-- 头部 -->
    <el-header>
      <i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i>
      <div class="system-title">电商后台管理系统</div>
      <div><span class="welcome">您好，{{$store.getters.username}}</span>
      <el-button type="text" @click="logout">退出</el-button></div>
    </el-header>
    <!-- 主题部分 -->
         <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
    </div>
</template>
<script>
import {userList, getMenu} from '@/api'
export default {
  data () {
    return {
      isCollapse: false,
      menueData: []
    }
  },
  mounted () {
    let params = {params: {query: '', pagenum: 1, pagesize: 2}}
    userList(params).then(res => {
      console.log(res)
    })
    getMenu().then(res => {
      this.menueData = res.data
      console.log(res)
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      localStorage.removeItem('mytoken')
      this.$router.push({name: '/login'})
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #989898;
  }
  .toggle-btn {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome, {
    color: white;
  }
}
</style>
