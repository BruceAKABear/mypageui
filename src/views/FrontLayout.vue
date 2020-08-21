<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activePath"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-menu-item class="logo-box">
          <el-avatar shape="square" :size="50" :src="logoUrl"></el-avatar>
        </el-menu-item>
        <el-menu-item index="index" @click="handleSelect('index')">主页</el-menu-item>
        <el-menu-item index="blog" @click="handleSelect('blog')">博客</el-menu-item>
        <el-menu-item index="video" @click="handleSelect('video')">视频</el-menu-item>
        <el-menu-item index="opensource" @click="handleSelect('opensource')">开源项目</el-menu-item>
        <el-menu-item index="donate" @click="handleSelect('donate')">捐助</el-menu-item>
      </el-menu>
      <div class="header-search-box" v-show="activePath!=='index'&&activePath!=='donate'">
        <el-input placeholder="请输入内容" v-model="seachKey"></el-input>
        <el-button type="primary" @click="doSeach">搜索</el-button>
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'FrontLayout',
  data () {
    return {
      activePath: '',
      logoUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      seachKey: ''
    }
  },
  methods: {
    handleSelect (ac) {
      console.log(ac)
      this.activePath = ac
      window.sessionStorage.setItem('activePath', ac)
    },
    doSeach () {
      this.$message.info('en?')
    }
  },
  created () {
    const x = window.sessionStorage.getItem('activePath')
    this.activePath = (x == null ? 'index' : x)
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    height: 100%;

    .el-header {
      padding: 0;
      background-color: #545c64;
      display: flex;
      justify-content: space-between;

      .el-menu {
        border-bottom: 0;

        .logo-box {
          margin-right: 20px;
        }

        .el-menu {
          border-right: none;

        }
      }

      .header-search-box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 20px;

        .el-button {
          margin-left: 5px;
        }
      }
    }

    .el-main {
      padding: 0;
    }

  }

</style>
