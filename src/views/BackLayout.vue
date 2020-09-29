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
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <el-menu-item index="dashboard" @click="handleSelect('dashboard')">
          <i class="el-icon-menu"></i>
          <span slot="title">工作台</span>
        </el-menu-item>

        <el-menu-item index="write" @click="handleSelect('write')">
          <i class="el-icon-edit"></i>
          <span slot="title">写作</span>
        </el-menu-item>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <!--系统设置-->
        <el-menu-item index="system">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </el-menu-item>
        <!--系统设置-->
        <el-submenu index="sysconfig">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item index="basicConfig">基础设置</el-menu-item>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
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
      console.log(routeName, '-----------')
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
    background-color: #545c64;

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
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 30px;
      color: #999999;
      justify-content: space-between;
    }

    .main-real-box {
      margin: 10px;

      .el-breadcrumb {
        margin-bottom: 10px;
      }
    }

  }

}

</style>
