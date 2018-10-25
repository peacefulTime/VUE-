<template>
  <div class="addGoods">
    <!-- 导航部分 -->
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-light aligns el-row2">添加商品信息</div></el-col>
    </el-row>
    <!-- 步骤导航 -->
    <el-row>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    </el-row>
    <!-- table页签 -->
   <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
    <el-tab-pane label="基本信息" name="first">
      <el-form  label-width="80px">
        <el-form-item label="活动名称">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="商品参数" name="second">商品参数</el-tab-pane>
    <el-tab-pane label="商品属性" name="third">商品属性</el-tab-pane>
    <el-tab-pane label="商品图片" name="fourth">商品图片展示
    <el-upload
      class="upload-demo"
      action="http://localhost:8888/api/private/v1/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :headers="setHeaders()"
      :multiple="true"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    </el-tab-pane>
    <el-tab-pane label="商品内容" name="five">商品内容</el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0,
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      switch (tab.name) {
        case 'first': this.active = 0
          break
        case 'second': this.active = 1
          break
        case 'third': this.active = 2
          break
        case 'fourth': this.active = 3
          break
        case 'five': this.active = 4
          break
        default: this.active = 0
          break
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    setHeaders () {
      let token = localStorage.getItem('mytoken')
      return {Authorization: token}
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
    margin-bottom: 8px;
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
    // padding: 10px 0;
    background-color: #f9fafc;
  }
  .aligns {
    align-items: center;
    display: flex;
    padding-left: 18px;
  }
  .el-row2 {
    margin-top: -22px;
  }
</style>
