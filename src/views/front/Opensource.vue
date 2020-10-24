<template>
  <el-row :gutter="20">
    <el-col :span="6">
      2333
    </el-col>
    <el-col :span="6">
      122
    </el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Opensource',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    .el-aside {
      height: 100%;

      .el-menu {
        height: 100%;
      }
    }
  }

</style>
