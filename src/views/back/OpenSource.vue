<template>
  <div>
    <el-table
      border
      :data="pageParam"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="progress"
        label="进度">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'OpenSource',
  data () {
    return {
      pageParam: {}
    }
  }
}
</script>

<style scoped>

</style>
