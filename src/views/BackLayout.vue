<template>
  <el-container>
    <!--左侧菜单-->
    <el-aside :width="collapse?'70px':'200px'">
      <div class="meub-header">
        <el-image
          style="width: 50px; height: 50px"
          :src="logoUrl"
          fit="scale-down">
        </el-image>
      </div>
      <el-menu
        :default-active="activePath"
        class="el-menu-vertical-demo"
        background-color="#000000"
        text-color="#909399"
        active-text-color="#ffffff"
        unique-opened
        router
        :collapse="collapse"
        :collapse-transition="false"
      >
        <el-menu-item index="dashboard" @click="handleSelect('dashboard')">
          <i class="el-icon-menu"></i>
          <span slot="title">工作台</span>
        </el-menu-item>
        <!--博客管理-->
        <el-submenu index="blogSetting">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>博客管理</span>
          </template>
          <el-menu-item index="blogType" @click="handleSelect('blogType')">
            <i class="el-icon-s-grid"></i>
            <span slot="title">博客分类</span>
          </el-menu-item>
          <el-menu-item index="blogTag" @click="handleSelect('blogTag')">
            <i class="el-icon-collection-tag"></i>
            <span slot="title">博客标签</span>
          </el-menu-item>
          <el-menu-item index="blogList" @click="handleSelect('blogList')">
            <i class="el-icon-document-copy"></i>
            <span slot="title">博客列表</span>
          </el-menu-item>
        </el-submenu>
        <!--视频管理-->
        <el-submenu index="videoSetting">
          <template slot="title">
            <i class="el-icon-video-camera-solid"></i>
            <span>视频管理</span>
          </template>
          <el-menu-item index="system">
            <i class="el-icon-video-camera"></i>
            <span slot="title">视频列表</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="opensourceSetting">
          <template slot="title">
            <i class="el-icon-data-analysis"></i>
            <span>开源项目管理</span>
          </template>
          <el-menu-item index="openSource" @click="handleSelect('openSource')">
            <i class="el-icon-data-analysis"></i>
            <span slot="title">项目列表</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="systemSetting" @click="handleSelect('systemSetting')">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!--main-->
    <el-main>
      <!--主头-->
      <div class="main-head-wrapper">
        <!--左边-->
        <div><i :class="collapse?'el-icon-s-unfold':'el-icon-s-fold'" style="cursor: pointer"
                @click="collapse=!collapse"></i></div>
        <div style="display: flex;justify-content: space-between;align-items: center;width: 80px">
          <i class="el-icon-bell" style="font-size: 20px"></i>
          <el-dropdown>
            <el-avatar :size="30" :src="avatarUrl"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/">
                  <i class="el-icon-s-home" style="font-size: 16px;color: #409EFF"><span
                    style="font-size: 14px;margin-left: 5px">去前端</span></i>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <i class="el-icon-s-home" style="font-size: 16px;color: #F56C6C" @click="doLogout"><span
                  style="font-size: 14px;margin-left: 5px">退出</span></i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--          <el-avatar :size="30" :src="avatarUrl"></el-avatar>-->
        </div>
      </div>
      <!--主导航-->
      <div class="navigation-wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>管理后台</el-breadcrumb-item>
          <el-breadcrumb-item>{{ activeName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--主体-->
      <div class="main-body-wrapper">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { clearAdminToken } from '@/utils/auth'

export default {
  name: 'FrontLayout',
  data () {
    return {
      activePath: '',
      logoUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      collapse: false,
      avatarUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    handleSelect (ac) {
      this.activePath = ac
      window.sessionStorage.setItem('activePath', ac)
    },
    doLogout () {
      // 退出系统，本系统中退出系统，只需要删除token和跳转到后台登录页即可
      clearAdminToken()
      // 跳转
      this.$router.push('/backendLogin')
    }
  },
  computed: {
    activeName () {
      const routeName = this.$route.name
      let realName
      switch (routeName) {
        case 'Dashboard':
          realName = '控制台'
          break
        case 'Write':
          realName = '写作'
          break
        case 'System':
          realName = '系统设置'
          break
        case 'BasicConfig':
          realName = '基础设置'
          break
        default:
          return '控制台'
      }
      return realName
    }
  },
  created () {
    const x = window.sessionStorage.getItem('activePath')
    console.log(x)
    this.activePath = (x == null ? 'dashboard' : x)
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;

  .el-aside {
    background-color: #000000;

    .meub-header {
      height: 50px;
      display: flex;
      text-align: center;
      justify-content: center;
    }

    .el-menu {
      border: none;
    }
  }

  .el-main {
    background-color: #EEEEEE;
    padding: 0;

    .main-head-wrapper {
      height: 6vh;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 10px;
      padding-left: 10px;
    }

    .navigation-wrapper {
      height: 5vh;
      display: flex;
      padding-left: 10px;
      align-items: center;
    }

    .main-body-wrapper {
      background-color: #EEEEEE;
      height: 89vh;
      padding-left: 8px;
      padding-right: 8px;
    }
  }

}

</style>
