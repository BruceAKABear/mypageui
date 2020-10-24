<template>
  <div>
    <el-row>
      <el-col :span="4" class="hidden-sm-and-down">
        <div style="height: 100px"></div>
      </el-col>
      <!--文章主体-->
      <el-col :lg="16" :xl="16" style="box-shadow: #9E9E9E">
        <div class="backTop">
          <el-backtop target=".backTop " style="background-color: #FF8C00;box-shadow: 0 0 5px #888888;">
            <i class="el-icon-caret-top" style="color: #ffffff"></i>
          </el-backtop>
          <!--主图盒子-->
          <div style="margin-top: 5px">
            <el-image :src="blogData.headPic" fit="contain"></el-image>
          </div>
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
            <div v-html="blogData.content"></div>
          </div>
          <!--评论盒子-->
          <div class="comment-box">
            <div class="comment-header-box">{{ blogData.allowComment ? '精彩评论' : '未开启评论' }}</div>
            <!--评论体-->
            <comment :comments="commentList" v-if="blogData.allowComment" @commitComment="doCommitComment"></comment>
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
import comment from '../../components/Comment'
import { addComment, commentList } from '@/api/comment'

export default {
  name: 'BlogDetail',
  data () {
    return {
      blogData: {},
      blogId: '',
      commentList: [],
      commentData: [
        {
          id: 'comment0001', // 主键id
          date: '2018-07-05 08:30', // 评论时间
          ownerId: 'talents100020', // 文章的id
          fromId: 'errhefe232213', // 评论者id
          fromName: '犀利的评论家', // 评论者昵称
          fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', // 评论者头像
          likeNum: 3, // 点赞人数
          content: '非常靠谱的程序员', // 评论内容
          reply: [ // 回复，或子评论
            {
              id: '34523244545', // 主键id
              commentId: 'comment0001', // 父评论id，即父亲的id
              fromId: 'observer223432', // 评论者id
              fromName: '夕阳红', // 评论者昵称
              fromAvatar: 'https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg', // 评论者头像
              toId: 'errhefe232213', // 被评论者id
              toName: '犀利的评论家', // 被评论者昵称
              toAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', // 被评论者头像
              content: '赞同，很靠谱，水平很高', // 评论内容
              date: '2018-07-05 08:35' // 评论时间
            },
            {
              id: '34523244545',
              commentId: 'comment0001',
              fromId: 'observer567422',
              fromName: '清晨一缕阳光',
              fromAvatar: 'http://imgsrc.baidu.com/imgad/pic/item/c2fdfc039245d688fcba1b80aec27d1ed21b245d.jpg',
              toId: 'observer223432',
              toName: '夕阳红',
              toAvatar: 'https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg',
              content: '大神一个！',
              date: '2018-07-05 08:50'
            }
          ]
        },
        {
          id: 'comment0002',
          date: '2018-07-05 08:30',
          ownerId: 'talents100020',
          fromId: 'errhefe232213',
          fromName: '毒蛇郭德纲',
          fromAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
          likeNum: 0,
          content: '从没见过这么优秀的人',
          reply: []
        }
      ]
    }
  },
  components: { comment },
  methods: {
    doGetDetail () {
      getById({ blogId: this.$route.params.blogId }).then(res => {
        this.blogData = res.data
        this.doGetComments(res.data.id)
      })
    },
    doLikeBlog () {
      this.blogData.likeCount = this.blogData.likeCount + 1
      likeBlog({ blogId: this.blogData.id }).then(res => {
        console.log(res)
      })
    },
    doGetComments (bId) {
      commentList({ blogId: bId }).then(res => {
        if (res.status) {
          console.log(res.data, '------------>')
          this.commentList = res.data
        }
      })
    },
    doCommitComment (args) {
      const commentObj = {}
      commentObj.blogId = this.blogData.id
      commentObj.fromUserId = '2'
      commentObj.content = args.content
      commentObj.parentId = args.parentId
      commentObj.toUserId = args.toUserId
      addComment(commentObj).then(res => {
        if (res.status) {
          // 新增成功后 重新加载
          this.doGetComments(this.blogData.id)
        }
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
  margin-top: 20px;
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

.comment-box {
  margin-top: 30px;
  border-top: solid 1px #EEEEEE;
  padding-top: 10px;

  .comment-header-box {
    font-size: 15px;
    font-weight: bold;
    color: #9E9E9E;
    margin-bottom: 20px;

  }

}

.backTop {
  height: 90vh;
  overflow-y: scroll;
}

.blog-content-box img, p, span {
  width: 100%;
}
</style>
