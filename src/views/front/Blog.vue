<template>
  <el-container>
    <!--侧边-->
    <el-aside width="350px">
      <el-card shadow="hover" v-for="article in articleList " :key="article.id" :body-style="{ padding: '8px' }">
        <div class="article-item-header">
          <span>{{ article.title }}</span>
        </div>
        <div class="article-item-detail">
          <span>{{ article.updateTime }}</span>
          <span>{{ article.author }}</span>
        </div>
      </el-card>
      <!--分页-->
      <div class="pagination-box">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
    </el-aside>
    <el-main>
      <!--文章导航-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>博客</el-breadcrumb-item>
        <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="article-box">
        <div class="article-title-box">
          <span>
            {{ article.title }}
          </span>
          <div class="title-info-box">
            <span>{{ article.author }}</span>
            <span>{{ article.updateTime }}</span>
            <i class="el-icon-star-on" style="color: red">{{ article.favorite }}</i>
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
    return {
      article: {
        title: 'Spring中bean的生命周期是什么',
        author: '邓艺',
        updateTime: '2020-10-10 10:10',
        favorite: 1000
      },
      articleList: [
        {
          title: 'Spring中bean的生命周期是什么',
          author: '大熊',
          updateTime: '2020-10-10 10:10',
          favorite: 1000
        }, {
          title: 'Spring中bean的生命周期是什么',
          author: '邓艺',
          updateTime: '2020-10-10 10:10',
          favorite: 1000
        }, {
          title: 'Spring中bean的生命周期是什么',
          author: '邓艺',
          updateTime: '2020-10-10 10:10',
          favorite: 1000
        }, {
          title: 'Spring中bean的生命周期是什么',
          author: '邓艺',
          updateTime: '2020-10-10 10:10',
          favorite: 1000
        }, {
          title: 'Spring中bean的生命周期是什么',
          author: '邓艺',
          updateTime: '2020-10-10 10:10',
          favorite: 1000
        },
        {
          title: 'Spring中bean的生命周期是什么',
          author: '大熊',
          updateTime: '2020-10-10 10:10',
          favorite: 1000
        }, {
          title: 'Spring中bean的生命周期是什么',
          author: '邓艺',
          updateTime: '2020-10-10 10:10',
          favorite: 1000
        }, {
          title: 'Spring中bean的生命周期是什么',
          author: '邓艺',
          updateTime: '2020-10-10 10:10',
          favorite: 1000
        }, {
          title: 'Spring中bean的生命周期是什么',
          author: '邓艺',
          updateTime: '2020-10-10 10:10',
          favorite: 1000
        }, {
          title: 'Spring中bean的生命周期是什么',
          author: '邓艺',
          updateTime: '2020-10-10 10:10',
          favorite: 1000
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  padding: 10px;
  border-right: solid 1px #EEEEEE;

  .el-card {
    margin-bottom: 10px;
    font-size: 15px;

    .article-item-detail {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #9E9E9E;
    }
  }

  .pagination-box {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 30px;
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

      .title-info-box {
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        padding: 20px;
      }
    }

  }
}

</style>
