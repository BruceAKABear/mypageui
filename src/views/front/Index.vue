<template>
  <div class="content">
    <div class="background-img" :style="{'backgroundImage': 'url(' + backgroundImage + ')'}"></div>
    <div class="index-box">
      <div class="index-slogan">
        <span>{{slogan}}</span>
      </div>
      <div class="index-time">
        <span>{{date}}</span>
        <span class="index-time-time">{{time}}</span>
      </div>
      <div class="index-search-box">
        <el-input v-model="keyword" placeholder="请输入内容" clearable></el-input>
        <el-button slot="append" type="primary" @click="doSearch">搜索</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      backgroundImage: 'https://cn.bing.com/th?id=OHR.BurrowingOwl_ZH-CN7730300251_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
      slogan: '生命是一场没有目的地的旅行',
      date: '',
      time: '',
      keyword: ''
    }
  },
  methods: {
    doSearch () {
      if (this.keyword.trim() !== '') {
        this.$message.success('嗯？')
      }
    },
    getDate () {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      this.date = currentdate
    },
    getTime () {
      const date = new Date()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const realH = hours < 10 ? '0' + hours : hours
      const realM = minutes < 10 ? '0' + minutes : minutes
      this.time = realH + ':' + realM
      var that = this
      this.timmer = setInterval(() => {
        const date = new Date()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const realH = hours < 10 ? '0' + hours : hours
        const realM = minutes < 10 ? '0' + minutes : minutes
        that.time = realH + ':' + realM
      }, 1000)
    }
  },
  created () {
    // 获取时间
    this.getDate()
    // 获取时间
    this.getTime()
  },
  beforeDestroy () {
    if (this.timmer) {
      clearInterval(this.timmer)
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    height: 100%;
    width: 100%;
    overflow: hidden;

    .background-img {
      height: 100%;
      width: 100%;
      background-size: 100% auto;
      background-repeat: no-repeat;
      filter: blur(5px);
      transform: scale(1.1);
    }

  }

  .index-box {
    width: 550px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    .index-slogan {
      font-size: 40px;
      font-weight: bold;
      color: #FFFFFF;
    }

    .index-time {
      margin-top: 60px;
      display: flex;
      flex-direction: column;
      font-weight: bold;
      font-size: 40px;
      color: #EEEEEE;

      .index-time-time {
        font-size: 100px;
        padding: 0;
        color: #FFFFFF;
      }
    }

    .index-search-box {
      margin-top: 60px;
      display: flex;
      justify-content: center;
      text-align: center;
    }
  }

</style>
