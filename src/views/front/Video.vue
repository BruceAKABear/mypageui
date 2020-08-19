<template>
  <el-container>
    <el-main>
      <div class="video-box"></div>
      <div class="video-message-box"></div>
    </el-main>
    <el-aside width="400px">
      <div class="video-item" v-for="video in videoList" :key="video.id">
        <el-image
          style="width: 100px; height: 100px"
          :src="video.headPic"
          fit="fit">
        </el-image>
        <div class="video-desc-box">

        </div>
      </div>
      侧边
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: 'Video',
  data () {
    return {
      videoList: [
        {
          id: '1',
          headPic: 'abc'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    .el-main {
      display: flex;
      flex-direction: column;
      align-items: center;

      .video-box {
        width: 100%;
        height: 400px;
        background-color: #757575;
      }

      .video-message-box {
        width: 100%;
        margin-top: 40px;
        background-color: aqua;
        height: 100px;
      }
    }
    .el-aside{

    }
  }

</style>
