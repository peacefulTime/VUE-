<template>
  <div>
      当前值为: <el-tag>{{$store.state.count}}</el-tag><el-button @click="add1">+1</el-button>
  </div>
</template>
<script>
import {mapMutations} from 'vuex' 
export default {
  methods: {
  add1 () {
    this.$store.commit('add')
   }
 }
}
</script>

