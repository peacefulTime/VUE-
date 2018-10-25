<template>
   <div class="right">
    <!-- 导航部分 -->
    <el-row>
      <el-col :span="24">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
            </el-breadcrumb>
      </el-col>
    </el-row>
       <!-- 权限列表 -->
    <div class="userList">
     <el-table
     v-loading="loading"
    :data="rightsData"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      width="80">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="200">
    </el-table-column>
    <el-table-column
      label="层级"
      width="200">
      <template slot-scope="scope">
         <!-- <span>{{scope.row.level | fmtLevel}}</span> -->
         <span>{{scope.row.level | fmtLevel}}</span>
      </template>
    </el-table-column>
</el-table>
    </div>
    </div>
</template>
<script>
import {allRightList} from '@/api'
export default {
  data () {
    return {
      rightsData: [],
      loading: true
    }
  },
  filters: {
    fmtLevel (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else {
        return '三级'
      }
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      this.loading = true
      allRightList({type: 'list'}).then(res => {
        this.rightsData = res.data
        console.log(res.data)
        this.loading = false
      })
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
