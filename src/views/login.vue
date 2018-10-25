<template>
<div class="login">
  <el-form ref="form" :model="form" :rules="rules" class="container">
    <div class="avatar">
      <img src="../assets/avatar.jpg" alt="">
    </div>
    <el-form-item prop="username">
      <el-input  v-model="form.username"  placeholder="登录" prefix-icon="myicon myicon-user"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password"  type="password" placeholder="密码" prefix-icon="myicon myicon-key" @keydown.native.enter="addSubmit('form')"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login-btn" @click="addSubmit('form')">登录</el-button>
    </el-form-item>
    <el-form-item></el-form-item>
  </el-form>
</div>
</template>
<script>
import {checkUser} from '@/api'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    addSubmit (formData) {
      console.log(this.$refs[formData].validate(valid => console.log(valid)))
      this.$refs[formData].validate((valid) => {
        if (valid) {
          // 验证通过
          console.log(valid)
          checkUser(this.form).then(res => {
            if (res.meta.status === 200) {
              this.$store.commit('getUsername', res.data.username)
              localStorage.setItem('mytoken', res.data.token)
              this.$router.push({name: 'home'})
            } else {
              this.$message(
                {
                  message: res.meta.msg,
                  type: 'error'
                }
              )
            }
          })
        } else {
          console.log('登录失败')
        }
      })
    }
  }
}
</script>
import {checkUser} from '@/api/index.js'
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container{
    position: relative;
    margin: 200px auto;
    width: 450px;
    padding: 0px 40px 15px 40px;
    background: white;
    .avatar{
     position: relative;
      width: 120px;
      height: 120px;
      margin: 35px auto;
      box-sizing: border-box;
      border-radius: 5055%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn{
      width: 100%;
    }

  }
}
</style>
