<template>
  <div class="main-box-wrapper">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick" class="tabs-class">
      <!--基本信息-->
      <el-tab-pane label="基本信息" name="basicInfo">
        <el-form ref="form" :model="basicInfoData" label-width="100px">
          <el-form-item label="项目名称">
            <el-input v-model="basicInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="主图">
            <el-input v-model="basicInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-select v-model="basicInfoData.region" placeholder="请选择项目类型">
              <el-option label="硬件" value="shanghai"></el-option>
              <el-option label="软件" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片集">
            <el-select v-model="basicInfoData.region" placeholder="请选择项目类型">
              <el-option label="硬件" value="shanghai"></el-option>
              <el-option label="软件" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="项目详细描述" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="项目文件" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
export default {
  name: 'NewOpensource',
  data () {
    return {
      activeName: 'basicInfo',
      basicInfoData: {}
    }
  },
  methods: {
    tabClick () {
      console.log('tab点击')
    }
  }
}
</script>

<style lang="scss" scoped>
.main-box-wrapper {
  height: 97%;
  padding: 5px;
  background-color: white;
}

.tabs-class {
  margin-top: 20px;
}

</style>
