<template>
  <el-container>
    <!--侧边-->
    <el-aside width="280px">
      <div class="new-blog-box">
        <div class="new-blog-header-box">
          <span>最新文章</span>
        </div>
        <div class="new-blog-content-box" v-for=" newBlog in newBlogList" :key="newBlog.id">
          <div class="item-head">
            {{ newBlog.title }}
          </div>
          <div class="item-body">
            <div>
              <i class="el-icon-view" style="margin-right: 2px"></i>{{ newBlog.viewCount }}
            </div>
            <div>
              <i class="el-icon-time" style="margin-right: 2px"></i>{{ newBlog.createTime }}
            </div>
          </div>
        </div>
      </div>
      <div class="tag-clod-box">
        <div class="tag-clod-header-box">
          <span>所有标签</span>
        </div>
        <tag-cloud style="width: 250px;height: 250px" :config="tagCloudConfig" :data="hotTag"
                   @clickTag="clickTagItem"></tag-cloud>
      </div>
    </el-aside>
    <!--文章主体-->
    <el-main>
      <!--精选博客轮播图-->
      <div class="top-blogs-box">
        <div class="top-blogs-header">精选博客</div>
        <el-carousel :interval="8000" type="card" height="180px">
          <el-carousel-item v-for="topBlog in topBlogs" :key="topBlog.id" @click.native="goDetail(topBlog.id)">
            <div style="position: absolute;top: 40%;left: 50%;transform: translate(-50%,-40%);width: 500px;">
              <el-badge value="spring" type="success" class="badge-class">
                <div
                  style="font-size: 25px;font-weight: bold;color: #FFFFFF;overflow-wrap: break-spaces;overflow-x: hidden;text-overflow: ellipsis">
                  <span>{{ topBlog.title }}</span>
                </div>
              </el-badge>
              <div style="margin-top: 15px;font-size: 15px;color: #EEEEEE">
                <span>{{ topBlog.description }}</span>
              </div>
            </div>
            <el-image :src="topBlog.headPic" fit="contain" style="z-index: -1"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--文章类型tabs-->
      <div style="color: #c8c9cc;margin-bottom: 5px;font-weight:bold">博客分类</div>
      <el-tabs @tab-click="handleTabsClick" v-model="pageParam.typeId">
        <el-tab-pane :label="blogType.typeName" :name="blogType.id" v-for="blogType in typeList" :key="blogType.id">
          <el-card :body-style="{ padding: '0px' }" shadow="always" style="margin-bottom: 10px;cursor: pointer"
                   v-for="blogItem in pageData.records" :key="blogItem.id" @click.native="goDetail(blogItem.id)">
            <div class="card-body">
              <div class="body-text-box">
                <div class="text-header">
                  <span>{{ blogItem.title }}</span>
                </div>
                <div class="text-body">
                  <span>{{ blogItem.description }}</span>
                </div>
                <div class="text-tag-box">
                  <el-tag type="success">spring</el-tag>
                </div>
              </div>
              <div class="body-img-box">
                <img :src="blogItem.headPic"
                     style="height: 185px;width: 185px">
              </div>
            </div>
          </el-card>
          <div class="page-box">
            <el-pagination v-if="pageData.total>10"
                           @current-change="pageChange"
                           background
                           layout="prev, pager, next"
                           :total="pageData.total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>

import { typeList } from '@/api/blogType'
import { tagList } from '@/api/blogTag'
import { new10, page, top10 } from '@/api/blog'

export default {
  name: 'Blog',
  data () {
    return {
      windowHeight: 0,
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        typeId: ''
      },
      pageData: {},
      topArticle: {},
      newBlogList: [],
      topBlogs: [],
      typeList: [],
      hotTag: [],
      tagCloudConfig: {
        radius: 80,
        maxFont: 18,
        rotateAngleXbase: 500
      }
    }
  },
  methods: {
    doGetTagList () {
      tagList().then(res => {
        this.hotTag = res.data
      })
    },
    doGetNew10 () {
      new10().then(res => {
        if (res.status) {
          this.newBlogList = res.data
        }
      })
    },
    doGetTop () {
      top10().then(res => {
        if (res.status) {
          this.topBlogs = res.data
        }
      })
    },
    doGetTypeList () {
      typeList().then(res => {
        this.typeList = res.data
        this.pageParam.typeId = res.data[0].id
        this.doPage()
      })
    },
    doPage () {
      page(this.pageParam).then(res => {
        this.pageData = res.data
        console.log(res)
      })
    },
    pageChange (index) {
      this.pageParam.pageNumber = index
      this.doPage()
    },
    handleTabsClick (tabObj) {
      this.pageParam.typeId = tabObj.name
      this.doPage()
    },
    clickTagItem (tag) {
      console.log(tag)
    },
    goDetail (blogId) {
      this.$router.push({
        name: 'BlogDetail',
        params: {
          blogId: blogId
        }

      })
    }

  },
  created (parm) {
    // 查询标签列表
    this.doGetTagList()
    //
    this.doGetNew10()
    this.doGetTop()
    // 查询博客类型集合
    this.doGetTypeList()
    this.windowHeight = window.innerHeight - 60
    console.log(parm, '--------->')
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;

  .el-aside {
    width: 30%;
    padding: 10px;
    border-right: solid 1px #EEEEEE;

    .new-blog-box {
      margin-bottom: 15px;
      height: 48vh;
      overflow: hidden;

      .new-blog-header-box {
        font-size: 14px;
        font-weight: bold;
        color: #c8c9cc;
      }

      .new-blog-content-box {
        margin-top: 10px;
        font-size: 12px;
        margin-left: 5px;
        margin-right: 5px;
        color: black;
        cursor: pointer;

        .item-head {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .item-body {
          font-size: 10px;
          margin-top: 3px;
          display: flex;
          justify-content: space-between;
          color: #9E9E9E;
        }
      }
    }

    .tag-clod-box {
      .tag-clod-header-box {
        font-size: 14px;
        font-weight: bold;
        color: #c8c9cc;
      }
    }

  }

  .el-main {
    width: 70%;
    padding: 10px;

    .top-blogs-box {
      .top-blogs-header {
        color: #c8c9cc;
        font-weight: bold;
      }

    }

    .card-body {
      display: flex;
      flex-direction: row;

      .body-text-box {
        width: 80%;
        padding: 15px;

        .text-header {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .text-body {
          color: #9E9E9E;
        }

        .text-tag-box {
          margin-top: 5px;
        }
      }

      .body-img-box {
        height: 140px;
        overflow: hidden;
      }

    }

    .page-box {
      margin-top: 20px;
      margin-bottom: 30px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

</style>
