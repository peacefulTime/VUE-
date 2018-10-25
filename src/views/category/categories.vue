<template>
    <div class="category">
   <!-- 导航部分 -->
    <el-row>
      <el-col :span="24">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 添加分类 -->
    <el-row>
        <el-button type="success" plain @click="addCat">添加分类</el-button>
    </el-row>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="cat_dialog">
  <el-form :model="catForm" label-width="100px" ref="catrules" :rules="rules">
    <el-form-item label="分类名称" prop="cat_name">
      <el-input v-model="catForm.cat_name" auto-complete="off"></el-input>
    </el-form-item>
  <el-form-item label="父级名称" >
  <el-cascader
    :options="options"
    v-model="selectedOptions"
    :props="props"
    @change="handleChange()">
  </el-cascader>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cat_dialog = false">取 消</el-button>
    <el-button type="primary" @click="addSubmitCate('catrules')">确 定</el-button>
  </div>
</el-dialog>
    <!-- 树结构 -->
    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>
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
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import {getCategories, addCategories} from '@/api'
export default {
  data () {
    return {
      dataSource: [],
      cat_dialog: false,
      catForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      rules: {
        cat_name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'}
        ]
      },
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }],
      options: [],
      selectedOptions: [],
      props: {
        value: 'cat_id',
        label: 'cat_name'
      },
      total: 1,
      pagesize: 10,
      pagenum: 1
    }
  },
  components: {
    TreeGrid
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
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
    // 获取所有商品分类列表
    initList () {
      getCategories({type: 3, pagenum: this.pagenum, pagesize: this.pagesize}).then(res => {
        console.log(res.data)
        this.dataSource = res.data.result
        this.total = res.data.total
        console.log(res)
      })
    },
    // 查询分类
    handleChange (value) {
      console.log(value)
    },
    addCat () {
      getCategories({type: 2}).then(res => {
        this.cat_dialog = true
        this.options = res.data
      })
    },
    addSubmitCate (catrules1) {
      this.$refs[catrules1].validate(vas => {
        if (this.selectedOptions.length === 0) {
          this.catForm.cat_pid = 0
          this.catForm.cat_level = 0
          console.log(this.catForm)
        } else if (this.selectedOptions.length === 1) {
          this.catForm.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
          this.catForm.cat_level = 1
        } else if (this.selectedOptions.length === 2) {
          this.catForm.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
          this.catForm.cat_level = 2
        }
        addCategories(this.catForm).then(res => {
          console.log(res)
          if (res.meta.status === 201) {
            this.cat_dialog = false
            this.initList()
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
          }
        })
      })
    }
  }
}
</script>
