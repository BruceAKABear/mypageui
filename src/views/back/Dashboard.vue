<template>
  <div>
    <!--日历box-->
    <div class="calender-box">
      <el-calendar v-model="value">
      </el-calendar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.calender-box {
  padding: 20px;
}

</style>
