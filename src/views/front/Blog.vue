<template>
  <el-container>
    <el-aside width="300px">
      <el-card class="card-box">

      </el-card>

    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Blog',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .el-aside {
    display: flex;
    justify-content: center;
    .card-box {
      margin-top: 30px;
      width: 250px;
     height: 90%;
    }
  }

</style>
