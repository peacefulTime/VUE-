<template>
    <div class="user">
    <!-- 导航部分 -->
    <el-row>
      <el-col :span="24">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 查询部分 -->
    <el-row>
     <el-col :span="24">
      <el-input placeholder="请输入内容" class="cxuser" v-model="query" @keydown.native.enter='initList'>
        <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
      </el-input>
      <el-button type="success" plain @click="addUserDialog = true">添加用户</el-button>
     </el-col>
    </el-row>
    <!-- 添加用户 -->
  <el-dialog title="添加用户" :visible.sync="addUserDialog">
  <el-form :model="userForm" ref="userForm" :rules="rules">
  <el-form-item label="用户名称" prop="username" >
    <el-input v-model="userForm.username"  auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="用户密码" prop="password">
    <el-input v-model="userForm.password"  auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="userForm.email"  auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="手机号" prop="mobile">
    <el-input v-model="userForm.mobile"  auto-complete="off"></el-input>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
  <el-button @click="addUserDialog = false">取 消</el-button>
  <el-button type="primary" @click="addUserSubmite('userForm')">确 定</el-button>
  </div>
</el-dialog>
    <!-- 用户列表 -->
    <div class="userList">
     <el-table
    :data="userData"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <!-- 自定义列模板 -->
    <el-table-column label="用户状态">
      <template slot-scope="scope">
        <el-switch  v-model="scope.row.mg_state" @change="changeSwitch(scope.row, scope)">
        </el-switch>
      </template>
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" plain icon="el-icon-edit" @click="queryUserDetail(scope.row)"></el-button>
        <el-button type="danger" plain icon="el-icon-delete" @click="deleteUser(scope.row)"></el-button>
        <el-button type="warning" plain icon="el-icon-check" @click="grantUser(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
    <!-- 修改用户 -->
  <el-dialog title="修改用户" :visible.sync="editeUserDialog">
  <el-form :model="editUserForm" ref="editUserForm" :rules="rules">
  <el-form-item label="用户名称" prop="username"  >
    <el-input v-model="editUserForm.username"  auto-complete="off" :disabled="true"></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="editUserForm.email"  auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="手机号" prop="mobile">
    <el-input v-model="editUserForm.mobile"  auto-complete="off"></el-input>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
  <el-button @click="editeUserDialog = false">取 消</el-button>
  <el-button type="primary" @click="editeUserSubmite('editUserForm')">确 定</el-button>
  </div>
</el-dialog>
    <!-- 获取权限列表 -->
  <el-dialog title="分配角色" :visible.sync="grantUserDialog">
  <el-form :model="grantUserForm"  >
  <el-form-item label="当前的用户" prop="username"  >
    <!-- <el-input v-model="grantUserForm.username"  auto-complete="off" :disabled="true" ></el-input> -->
    <el-tag type="info">{{grantUserForm.username}}</el-tag>
  </el-form-item>
  <el-form-item label="请选择角色">
    <el-select v-model="roleI" placeholder="请选择角色">
      <el-option :label="role.roleName" :value="role.id" v-for="(role ,index) in grantUserList " :key="index" ></el-option>
    </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
  <el-button @click="grantUserDialog = false">取 消</el-button>
  <el-button type="primary" @click="UserRoleSubmite()">确 定</el-button>
  {{roleI}}
  </div>
</el-dialog>
    <!-- 分页 -->
 <div class="page">
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="1"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="10"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
 </div>
</div>
</template>
<script>
import {userList, changeStatus, addUser, queryUser, editeUserData, deleteSingleUser, grantUserList, grantUserRole} from '@/api'
export default {
  data () {
    return {
      userData: [],
      query: '',
      total: 1,
      pagesize: 10,
      pagenum: 1,
      addUserDialog: false,
      editeUserDialog: false,
      grantUserDialog: false,
      grantUserList: [],
      grantUserForm: {},
      roleI: '',
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
        ],
        mobile: [
          {required: true, message: '电话不能为空'}
        ]
      }
    }
  },
  created () {
    this.initList()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.initList()
    },
    initList () {
      userList(
        {params: {query: this.query, pagenum: this.pagenum, pagesize: this.pagesize}}
      ).then(res => {
        console.log(res)
        this.userData = res.data.users
        this.total = res.data.total
      })
    },
    changeSwitch (row, scope) {
      console.log(scope)
      changeStatus({uId: row.id, type: row.mg_state}).then(
        res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.meta.msg
            })
          }
        }
      )
    },
    //  添加用户
    addUserSubmite (formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          addUser(this.userForm).then(res => {
            if (res.meta.status === 201) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              this.addUserDialog = false
              this.initList()
            } else {
              this.$message({
                type: 'warning',
                message: res.meta.msg
              })
            }
          })
        }
      })
    },
    // 修改用户信息
    // 1.获取用户信息
    queryUserDetail (row) {
      console.log(row.id)
      this.editeUserDialog = true
      queryUser({id: row.id}).then(res => {
        if (res.meta.status === 200) {
          console.log(res)
          this.editUserForm.username = res.data.username
          this.editUserForm.mobile = res.data.mobile
          this.editUserForm.email = res.data.email
          this.editUserForm.id = res.data.id
        }
      })
    },
    // 2.提交修改的用户数据
    editeUserSubmite (editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          editeUserData(this.editUserForm).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              this.editeUserDialog = false
              this.initList()
            }
          })
        }
      })
    },
    // 删除用户
    deleteUser (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSingleUser(row.id).then(res => {
          console.log(res)
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.initList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取角色列表
    grantUser (row) {
      this.grantUserDialog = true
      this.grantUserForm = row
      console.log(this.grantUserForm)
      grantUserList().then(res => {
        // console.log(res)
        this.grantUserList = res.data
        // console.log(this.grantUserList)
      })
    },
    //  分配用户角色
    UserRoleSubmite () {
      // console.log(this.grantUserForm)
      if (!this.roleI) {
        this.$message({
          type: 'warning',
          message: '没有选择角色'
        })
      } else {
        grantUserRole({id: this.grantUserForm.id, rid: this.roleI}).then(res => {
          console.log(res)
          if (res.meta.status === 200) {
            this.grantUserDialog = false
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
    }
  }
}
</script>
<style lang="scss" scoped>
.user {
  .cxuser {
 width: 300px;
}
.userList {
    margin: 10px auto;
  }
}
</style>
