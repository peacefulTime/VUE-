<template>
    <div class="right">
    <!-- 导航部分 -->
    <el-row>
      <el-col :span="24">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
            </el-breadcrumb>
      </el-col>
    </el-row>
     <!-- 添加角色按钮 -->
    <el-row>
      <el-button type="primary" plain @click="roleDialog=true">添加角色</el-button>
    </el-row>
       <!-- 角色列表 -->
    <div class="roleList">
     <el-table
     v-loading="loading"
    :data="rolesData"
    border
    style="width: 100%">
    <!-- 展开列表 -->
     <el-table-column type="expand">
      <template slot-scope="scop">
        <el-row v-for="firstChild in scop.row.children" :key="firstChild.id">
          <el-col :span="3">
            <el-tag closable @close="deleteRole(scop.row,firstChild.id)">{{firstChild.authName}}</el-tag>
            <i class="el-icon-arrow-right" v-if="firstChild.children.length !==0"></i>
            </el-col>
          <el-col :span="21">
            <el-row v-for="secondChild in firstChild.children" :key="secondChild.id">
              <el-col :span="4">
                <el-tag closable type="success" @close="deleteRole(scop.row,secondChild.id)">{{secondChild.authName}}</el-tag>
                <i class="el-icon-arrow-right" v-if="secondChild.children.length !==0"></i>
              </el-col>
              <el-col :span="17">
               <el-tag closable type="warning" v-for="thirdChild in secondChild.children" :key="thirdChild.id" @close="deleteRole(scop.row,thirdChild.id)">{{thirdChild.authName}}</el-tag>
              </el-col>
            </el-row>
           </el-col>
        </el-row>
        <el-row v-if="scop.row.children.length === 0">
          <el-col :span="24">该角色没有分配权限，请前往分配！</el-col>
        </el-row>
      </template>
    </el-table-column>
    <!-- 一级列表 -->
    <!-- <el-table-column
      type="index"
      width="80">
    </el-table-column> -->
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="170">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="描述"
      width="200">
    </el-table-column>
    <!-- 操作 -->
    <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="primary" plain icon="el-icon-edit" @click="queryUserDetail(scope.row)"></el-button>
            <el-button type="danger" plain icon="el-icon-delete" @click="deleteUser(scope.row)"></el-button>
            <el-button type="warning" plain icon="el-icon-check" @click="showRoleDialog(scope.row)"></el-button>
            </template>
    </el-table-column>
</el-table>
    </div>
    <!-- 角色授权对话框 -->
<el-dialog title="角色列表" :visible.sync="dialogTableVisible">
   <el-tree
     ref="tree"
    :data="selectedRolesData"
    show-checkbox
    node-key="id"
    :default-expand-all="true"
    :default-checked-keys="selectedRoles"
    :props="defaultProps">
   </el-tree>
   <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitRights()">确 定</el-button>
  </div>
</el-dialog>
    <!-- 添加角色对话框 -->
  <el-dialog title="添加角色" :visible.sync="roleDialog" style="width:1400px">
  <el-form :model="ruleForm" :rules="rules" ref="rulesForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="角色名称" prop="rolesName">
    <el-input v-model="ruleForm.rolesName"></el-input>
  </el-form-item>
  <el-form-item label="角色描述" prop="rolesDes">
    <el-input v-model="ruleForm.rolesDes"></el-input>
  </el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="roleDialog = false">取 消</el-button>
    <el-button type="primary" @click="addRole('rulesForm')">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
import {grantUserList, deleteRoles, allRightList, submitRight, addRoles} from '@/api'
export default {
  data () {
    return {
      rolesData: [],
      loading: true,
      dialogTableVisible: false,
      selectedRoles: [],
      selectedRolesData: [],
      currentRole: {},
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleDialog: false,
      ruleForm: {
        rolesName: '',
        rolesDes: ''
      },
      rules: {
        rolesName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
        rolesDes: [{required: true, message: '请输入角色描述', trigger: 'change'}]
      }
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      this.loading = true
      grantUserList().then(res => {
        this.rolesData = res.data
        console.log(res.data)
        this.loading = false
      })
    },
    // 删除角色指定权限
    deleteRole (row, rightId) {
      deleteRoles({roleId: row.id, rightId: rightId}).then(res => {
        if (res.meta.status === 200) {
          row.children = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
    },
    // 添加角色提交
    addRole (rForm) {
      console.log(rForm)
      this.$refs[rForm].validate(vali => {
        if (vali) {
          addRoles({roleName: this.ruleForm.rolesName, roleDesc: this.ruleForm.rolesDes}).then(res => {
            if (res.meta.status === 201) {
              this.roleDialog = false
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
            } else {
              this.$message({
                type: 'error',
                message: res.meta.msg
              })
            }
          })
        }
      })
      console.log(this.$refs[rForm].validate(valide => {
        console.log(valide)
      }))
    },
    // 角色授权对话框
    showRoleDialog (row) {
      this.dialogTableVisible = true
      this.currentRole = row
      console.log(row)
      allRightList({type: 'tree '}).then(res => {
        console.log(res)
        this.selectedRolesData = res.data
      })
      // 遍历之前先让数组清空
      this.selectedRoles.length = 0
      // 取出当前点击角色的所有权限， 然后遍历到它的第三个children，取出它里面的所有的项的id，让进selectedRights中
      this.currentRole.children.forEach(first => {
        if (first.children && first.children.length !== 0) {
          first.children.forEach(second => {
            if (second.children && second.children.length !== 0) {
              second.children.forEach(third => {
                this.selectedRoles.push(third.id)
                console.log(this.selectedRoles)
              })
            }
          })
        }
      })
    },
    // 编辑提交角色
    submitRights () {
      console.log(this.currentRole.id)
      let rids = this.$refs.tree.getCheckedKeys().join(',')
      console.log(rids)
      submitRight(this.currentRole.id, {rids: rids}).then(res => {
        this.dialogTableVisible = false
        console.log(res)
        this.initList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
