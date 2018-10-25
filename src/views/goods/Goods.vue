<template>
    <div class="goods">
      <el-row>
        <el-button type="success" @click="addGs">添加商品</el-button>
      </el-row>
    </div>
</template>
<script>
export default {
  methods: {
    addGs () {
      this.$router.push({name: 'addGoods'})
    }
  }
}
</script>
