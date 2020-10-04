<template>
  <el-container>
    <!--左侧菜单-->
    <el-aside width="200px">
      <div class="meub-header">
        <el-image
          style="width: 50px; height: 50px"
          :src="logoUrl"
          fit="fill">
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
          <el-menu-item index="articleList" @click="handleSelect('articleList')">
            <i class="el-icon-document-copy"></i>
            <span slot="title">文章列表</span>
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
      <el-card class="main-header">
        <div>
          <i class="el-icon-s-fold"></i>
          <div>

          </div>
        </div>
      </el-card>
      <el-card class="main-real-box">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>管理后台</el-breadcrumb-item>
          <el-breadcrumb-item>{{ activeName }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'FrontLayout',
  data () {
    return {
      activePath: '',
      logoUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    handleSelect (ac) {
      this.activePath = ac
      window.sessionStorage.setItem('activePath', ac)
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
    }

    .el-menu {
      border: none;
    }
  }

  .el-main {
    padding: 0;

    .main-header {
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 30px;
      color: #999999;
      justify-content: space-between;
    }

    .main-real-box {
      margin: 10px;
      height: 93%;

      .el-breadcrumb {
        margin-bottom: 10px;
      }
    }

  }

}

</style>
