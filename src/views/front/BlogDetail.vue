<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4" class="hidden-sm-and-down">
        <div style="height: 100px"></div>
      </el-col>
      <!--文章主体-->
      <el-col :lg="16" :xl="16" style="box-shadow: #9E9E9E">
        <div>
          <!--头部盒子-->
          <div class="head-box">
            <div class="title-box">{{ blogData.title }}</div>
            <div class="info-box">
              <!--更新时间-->
              <div>
                <i class="el-icon-alarm-clock" style="margin-right: 5px"></i>
                {{ blogData.updateTime }}
              </div>
              <div style="margin-left: 40px">
                <i class="el-icon-view" style="margin-right: 2px"></i>
                {{ blogData.viewCount }}
                <i :class="blogData.likeCount==0?'el-icon-star-off':'el-icon-star-on'"
                   style="margin-right: 2px;margin-left: 10px;color: darkorange;cursor: pointer;font-size: 15px"
                   @click="doLikeBlog"></i>
                {{ blogData.likeCount }}
              </div>
            </div>
          </div>
          <!--描述盒子-->
          <div class="description-box">
            <span>{{ blogData.description }}</span>
          </div>
          <!--内容盒子-->
          <div class="blog-content-box">
            <span v-html="blogData.content"></span>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="hidden-sm-and-down">
        <div style="height: 100px"></div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { getById, likeBlog } from '@/api/blog'
import 'element-ui/lib/theme-chalk/display.css'

export default {
  name: 'BlogDetail',
  data () {
    return {
      blogData: {},
      blogId: ''
    }
  },
  methods: {
    doGetDetail () {
      getById({ blogId: this.$route.params.blogId }).then(res => {
        this.blogData = res.data
        console.log(res)
      })
    },
    doLikeBlog () {
      this.blogData.likeCount = this.blogData.likeCount + 1
      likeBlog({ blogId: this.blogData.id }).then(res => {
        console.log(res)
      })
    }
  },
  created () {
    this.doGetDetail()
  }
}
</script>

<style lang="scss" scoped>
.head-box {
  margin-top: 30px;
  text-align: center;
  font-weight: bold;
  color: #696969;

  .title-box {
    font-size: 30px;
  }

  .info-box {
    margin-top: 10px;
    font-size: 14px;
    font-weight: lighter;
    color: #D3D3D3;
    display: flex;
    justify-content: center;
  }
}

.description-box {
  background-color: #c8c9cc;
  padding: 10px;
  margin-top: 40px;
  font-weight: inherit;
  color: white;
  text-indent: 2em;
}

.blog-content-box {
  font-size: 15px;
}

</style>
