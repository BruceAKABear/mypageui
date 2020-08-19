<template>
  <el-container>
    <el-main>
      <div class="video-box"></div>
      <div class="video-message-box"></div>
    </el-main>
    <el-aside width="400px">
      <el-card shadow="always">
        <div class="list-header">
          <span>视频列表</span>
        </div>

        <div class="video-item" v-for="video in videoList" :key="video.id">
          <el-image
            style="width: 80px; height: 80px"
            :src="video.headPic"
            fit="fit">
          </el-image>
          <div class="video-desc-box">
            <div>{{video.title}}</div>
            <div class="desc-time">{{video.createTime}}</div>
          </div>
        </div>
      </el-card>

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
          headPic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '测试视频标题122121212',
          createTime: '2020-10-10 12:11'
        },
        {
          id: '1',
          headPic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '测试视频标题122121212',
          createTime: '2020-10-10 12:11'
        },
        {
          id: '1',
          headPic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '测试视频标题122121212',
          createTime: '2020-10-10 12:11'
        },
        {
          id: '1',
          headPic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '测试视频标题122121212',
          createTime: '2020-10-10 12:11'
        },
        {
          id: '1',
          headPic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '测试视频标题122121212',
          createTime: '2020-10-10 12:11'
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

    .el-aside {
      padding-top: 20px;
      display: flex;
      justify-content: center;

      .el-card {
        .list-header {
          font-size: 20px;
          font-weight: bold;
          color: #9E9E9E;
          margin-bottom: 20px;
        }

        .video-item {
          height: 80px;
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          .video-desc-box {
            margin-left: 10px;
            font-size: 20px;
            font-weight: bold;
            color: #757575;

            .desc-time {
              font-size: 14px;
              color: #999999;
              margin-top: 20px;
            }

          }

        }
      }

    }
  }

</style>
