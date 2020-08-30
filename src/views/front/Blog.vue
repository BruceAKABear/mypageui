<template>
  <el-container>
    <!--侧边-->
    <el-aside width="350px">
      <el-card shadow="hover" v-for="article in pageData.records " :key="article.id" :body-style="{ padding: '8px' }"
               @click.native="doShowDetail(article.id)">
        <div class="article-item-header">
          <span>{{ article.title }}</span>
        </div>
        <div class="article-item-detail">
          <span>{{ article.updateTime }}</span>
          <span>{{ article.author }}</span>
        </div>
      </el-card>
      <!--分页-->
      <div class="pagination-box" v-if="pageData.total>10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageData.total"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </el-aside>
    <el-main>
      <!--文章导航-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>博客</el-breadcrumb-item>
        <el-breadcrumb-item>{{ topArticle.title }}</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="article-box">
        <div class="article-title-box">
          <span>
            {{ topArticle.title }}
          </span>
          <div class="title-info-box">
            <span>{{ topArticle.author }}</span>
            <span>{{ topArticle.updateTime }}</span>
            <i class="el-icon-star-on" style="color: red">{{ topArticle.likeCount }}</i>
            <i class="el-icon-star-on" style="color: red">{{ topArticle.viewCount }}</i>
          </div>
        </div>
      </div>

    </el-main>
  </el-container>
</template>

<script>

import { page, getTop, getById } from '@/api/article'

export default {
  name: 'Blog',
  data () {
    return {
      pagequeryData: {
        pageNumber: 1,
        pageSize: 10
      },
      pageData: {},
      topArticle: {}
    }
  },
  methods: {
    pageQuery () {
      page(this.pagequeryData).then(res => {
        this.pageData = res.data
      })
    },
    pageChange (index) {
      this.pagequeryData.pageNumber = index
      this.pageQuery()
    },
    queryTopArticle () {
      getTop().then(res => {
        this.topArticle = res.data
      })
    },
    doShowDetail (articleId) {
      console.log('-----', articleId)
      getById({ id: articleId }).then(res => {
        this.topArticle = res.data
      })
    }

  },
  created () {
    this.pageQuery()
    // 查询top文章
    this.queryTopArticle()
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
    width: 330px;
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
