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
        <el-menu-item index="index" @click="handleSelect('index')">主页</el-menu-item>
        <el-menu-item index="blog" @click="handleSelect('blog')">博客</el-menu-item>
        <el-menu-item index="video" @click="handleSelect('video')">视频</el-menu-item>
        <el-menu-item index="opensource" @click="handleSelect('opensource')">开源项目</el-menu-item>
        <el-menu-item index="donate" @click="handleSelect('donate')">捐助</el-menu-item>
      </el-menu>
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
      activePath: ''
    }
  },
  methods: {
    handleSelect (ac) {
      console.log(ac)
      this.activePath = ac
      window.sessionStorage.setItem('activePath', ac)
    }
  },
  created () {
    const x = window.sessionStorage.getItem('activePath')
    this.activePath = x === '' ? 'index' : x
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    height: 100%;

    .el-header {
      padding: 0;

      .el-menu {
        border-bottom: 0;
      }

    }

    .el-main {
      padding: 0;
    }

  }

</style>
