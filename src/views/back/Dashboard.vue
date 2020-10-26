<template>
  <div class="dashboard-wrapper">
    <div class="basic-info-wrapper">
      1212
    </div>
    <div class="calendar-wrapper">
      <el-calendar v-model="dataValue">
      </el-calendar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      dataValue: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-wrapper {
  .basic-info-wrapper {
    height: 100px;
    width: 100%;
    background-color: #ffffff;
  }

  .calendar-wrapper {
    margin-top: 20px;
  }

}

</style>
