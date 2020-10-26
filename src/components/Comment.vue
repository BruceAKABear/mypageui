<!--评论模块-->
<template>
  <div class="container">
    <!--评论头部-->
    <div class="header-box">
      <el-input
        v-model="headerCommentContent"
        type="textarea"
        :rows="3"
        autofocus
        placeholder="写下你的评论"
        :maxlength="maxWords"
        show-word-limit
        @focus="headerInputFocus"
      >
      </el-input>
      <div class="header-btn-transition-box">
        <transition name="el-fade-in">
          <div class="btn-group-box" v-show="allowCommentFlag">
            <span @click="headerCommentCancel">取消</span>
            <el-button type="success" @click="commitComment" size="small">确定</el-button>
          </div>
        </transition>
      </div>
    </div>
    <!--评论体-->
    <div class="comment" v-for="(item,index) in comments" :key="index">
      <div class="info">
        <img class="avatar" :src="item.fromUserAvatar" width="36" height="36" alt="用户头像"/>
        <div class="right">
          <div class="name">{{ item.fromUserName }}</div>
          <div class="date">{{ item.createTime }}</div>
        </div>
      </div>
      <div class="content">{{ item.content }}</div>
      <div class="control">
        <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
          <i class="iconfont icon-like"></i>
          <span class="like-num">{{ item.likeCount > 0 ? item.likeCount + '人赞' : '赞' }}</span>
        </span>
        <span class="comment-reply" @click="showCommentInput(item)">
          <i class="iconfont icon-comment"></i>
          <span>回复</span>
        </span>
      </div>
      <div class="reply">
        <div class="item" v-for="(reply,index) in item.replies" :key="index">
          <div class="reply-content">
            <span class="from-name">{{ reply.fromUserName }}</span><span>: </span>
            <span class="to-name">@{{ reply.toUserName }}</span>
            <span>{{ reply.content }}</span>
          </div>
          <div class="reply-bottom">
            <span>{{ reply.date }}</span>
            <span class="reply-text" @click="showCommentInput(item, reply)">
              <i class="iconfont icon-comment"></i>
              <span>回复</span>
            </span>
          </div>
        </div>
        <div class="write-reply" v-if="item.replies.length > 0" @click="showCommentInput(item)">
          <i class="el-icon-edit"></i>
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="el-fade-in">
          <div class="input-wrapper" v-if="showItemId === item.id">
            <el-input
              v-model="inputComment"
              type="textarea"
              :rows="3"
              autofocus
              placeholder="写下你的评论"
              :maxlength="maxWords"
              show-word-limit
            >
            </el-input>
            <div class="btn-group-box">
              <span>取消</span>
              <el-button type="success" @click="commitComment(item)" size="small">确定</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    comments: {
      type: Array,
      required: true
    },
    maxWords: {
      type: [Number, String],
      required: false,
      default: 200
    }
  },
  watch: {
    allowComment (newV, oldV) {
      console.warn(newV)
      this.allowCommentFlag = newV
    }
  },
  components: {},
  data () {
    return {
      inputComment: '',
      showItemId: '',
      replyUser: '',
      headerButtonShow: false,
      headerCommentContent: '',
      allowCommentFlag: this.allowComment
    }
  },
  computed: {},
  methods: {

    /**
     * 头部评论点击取消
     */
    headerCommentCancel () {
      this.allowCommentFlag = false
      this.headerCommentContent = ''
    },
    /**
     * 点赞
     */
    likeClick (item) {
      if (item.isLike === null) {
        Vue.$set(item, 'isLike', true)
        item.likeCount++
      } else {
        if (item.isLike) {
          item.likeCount--
        } else {
          item.likeCount++
        }
        item.isLike = !item.isLike
      }
    },
    /**
     * 提交评论
     */
    commitComment (item) {
      this.$emit('commitComment', {
        content: this.inputComment,
        parentId: this.showItemId,
        toUserId: item.fromUserId
      })
      // 清除信息，关闭框
      this.this.inputComment = ''
    },

    /**
     * 点击评论按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showCommentInput (item, reply) {
      if (reply) {
        this.replyUser = '回复 ' + reply.fromUserName
      } else {
        this.inputComment = ''
      }
      this.showItemId = item.id
    },
    /**
     * 头部输入框获取到焦点，此时去显示按钮
     */
    headerInputFocus () {
      this.$emit('commentTriggered')
    }
  },
  created () {
    console.log(this.comments)
  }
}
</script>

<style scoped lang="scss">

@import "../../public/conment";

.btn-group-box {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  span {
    color: #9E9E9E;
    cursor: pointer;
  }

  .el-button {
    margin-left: 20px;
  }
}

.container {
  box-sizing: border-box;

  .header-box {
    margin-bottom: 5px;

    .header-btn-transition-box {

    }

    //.btn-group-box {
    //
    //  display: flex;
    //  justify-content: flex-end;
    //  align-items: center;
    //
    //  .cancel {
    //    font-size: 16px;
    //    color: $text-normal;
    //    margin-right: 20px;
    //    cursor: pointer;
    //
    //    &:hover {
    //      color: $text-333;
    //    }
    //  }
    //
    //  .confirm {
    //    font-size: 16px;
    //  }
    //}

  }

  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid $border-fourth;

    .info {
      display: flex;
      align-items: center;

      .avatar {
        border-radius: 50%;
      }

      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        .name {
          font-size: 16px;
          color: $text-main;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .date {
          font-size: 12px;
          color: $text-minor;
        }
      }
    }

    .content {
      font-size: 16px;
      color: $text-main;
      line-height: 20px;
      padding: 10px 0;
    }

    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $text-minor;

      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;

        &.active, &:hover {
          color: $color-main;
        }

        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }

      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          color: $text-333;
        }

        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }

    }

    .reply {
      margin: 10px 0;
      border-left: 2px solid $border-first;

      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed $border-third;

        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-main;

          .from-name {
            color: $color-main;
          }

          .to-name {
            color: $color-main;
            margin-left: 5px;
            margin-right: 5px;
          }
        }

        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: $text-minor;

          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;

            &:hover {
              color: $text-333;
            }

            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }

      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-minor;
        padding: 10px;
        cursor: pointer;

        &:hover {
          color: $text-main;
        }

        .el-icon-edit {
          margin-right: 5px;
        }
      }

      .fade-enter-active, fade-leave-active {
        transition: opacity 0.5s;
      }

      .fade-enter, .fade-leave-to {
        opacity: 0;
      }

      .input-wrapper {
        padding: 10px;

        .gray-bg-input, .el-input__inner {
          /*background-color: #67C23A;*/
        }

        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;

          .cancel {
            font-size: 16px;
            color: $text-normal;
            margin-right: 20px;
            cursor: pointer;

            &:hover {
              color: $text-333;
            }
          }

          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
