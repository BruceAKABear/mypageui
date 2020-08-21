<template>
  <el-container>
    <el-aside width="350px">
      <el-card class="card-box">
        <div class="content-box"></div>
        <div class="pagination-box">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
      </el-card>
    </el-aside>
    <el-main>
      <!--文章导航-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>博客</el-breadcrumb-item>
        <el-breadcrumb-item>Spring中bean的生命周期是什么</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="article-box">
        <div class="article-title-box">
          <span>
            Spring中bean的生命周期是什么
          </span>
          <div class="title-info-box">
            <span>邓艺</span>
            <span>2020-10-10 10:10</span>
          </div>
        </div>
      </div>

    </el-main>
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
      margin-top: 20px;
      width: 300px;
      height: 95%;

      .pagination-box {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
  }

  .el-main {
    .article-box {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 20px;

      .article-title-box {
        font-size: 30px;
        color: #999999;
        text-align: center;

        .title-info-box{
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          padding: 20px;
        }
      }

    }
  }

</style>
