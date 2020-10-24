<template>
  <div>
    <el-tabs type="border-card" class="tabs-box">
      <el-tab-pane label="基础设置">
        <!--tab头-->
        <div style="display: flex;justify-content: flex-end;margin-bottom: 20px">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="enableBasic"
            active-text="修改"
          >
          </el-switch>
        </div>
        <!--tab体-->
        <div class="tab-content-box">
          <el-form
            :model="basicFormData"
            class="demo-form-inline"
            label-width="100px"
          >
            <el-form-item label="测试">
              <el-input v-model="basicFormData.slogan" placeholder="请输入slogan" :disabled="!enableBasic"></el-input>
            </el-form-item>
            <el-form-item label="网站名称">
              <el-input v-model="basicFormData.siteName" placeholder="请输入网站名称" :disabled="!enableBasic"></el-input>
            </el-form-item>
            <el-form-item label="网站logo">
              <el-upload
                class="upload-demo"
                :action="picUploadUrl"
                :file-list="logoPicList"
                :on-success="logoPicUploadSuccess"
                :disabled="!enableBasic"
                list-type="picture"
                :limit="1"
              >
                <el-button size="small" type="primary" :disabled="!enableBasic">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
              </el-upload>
            </el-form-item>
            <el-form-item size="large" v-if="enableBasic">
              <el-button type="success" @click="saveBasicData">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户名密码设置">
        <!--tab头-->
        <div style="display: flex;justify-content: flex-end;margin-bottom: 20px">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="enablePassword"
            active-text="修改"
          >
          </el-switch>
        </div>
        <!--tab体-->
        <div class="tab-content-box">
          <el-form
            :model="passwordFormData"
            class="demo-form-inline"
            label-width="100px"
          >
            <el-form-item label="手机号">
              <el-input v-model="passwordFormData.phone" placeholder="请输入手机号" :disabled="!enablePassword"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="passwordFormData.pass" placeholder="请输入密码" :disabled="!enablePassword"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" v-if="enablePassword">
              <el-input v-model="repass" placeholder="请输入重复密码"></el-input>
            </el-form-item>
            <el-form-item size="large" v-if="enablePassword">
              <el-button type="primary" @click="savePhoneData">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="捐助设置">
        <!--tab头-->
        <div style="display: flex;justify-content: flex-end;margin-bottom: 20px">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="enablePassword"
            active-text="修改"
          >
          </el-switch>
        </div>
        <!--tab体-->
        <div class="tab-content-box">
          <el-form
            :model="passwordFormData"
            class="demo-form-inline"
            label-width="100px"
          >
            <el-form-item label="手机号">
              <el-input v-model="passwordFormData.user" placeholder="请输入手机号" :disabled="!enablePassword"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="passwordFormData.user" placeholder="请输入密码" :disabled="!enablePassword"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" v-if="enablePassword">
              <el-input v-model="passwordFormData.user" placeholder="请输入重复密码"></el-input>
            </el-form-item>
            <el-form-item size="large" v-if="enablePassword">
              <el-button type="primary" @click="saveBasicData">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="公众号设置">
        <!--tab头-->
        <div style="display: flex;justify-content: flex-end;margin-bottom: 20px">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="enablePassword"
            active-text="修改"
          >
          </el-switch>
        </div>
        <!--tab体-->
        <div class="tab-content-box">
          <el-form
            :model="passwordFormData"
            class="demo-form-inline"
            label-width="120px"
          >
            <el-form-item label="公众号APPID">
              <el-input v-model="passwordFormData.user" placeholder="请输入手机号" :disabled="!enablePassword"></el-input>
            </el-form-item>
            <el-form-item label="公众号Secret">
              <el-input v-model="passwordFormData.user" placeholder="请输入密码" :disabled="!enablePassword"></el-input>
            </el-form-item>
            <el-form-item label="MessageToken">
              <el-input v-model="passwordFormData.user" placeholder="请输入密码" :disabled="!enablePassword"></el-input>
            </el-form-item>
            <el-form-item label="EncodingAESKey">
              <el-input v-model="passwordFormData.user" placeholder="请输入密码" :disabled="!enablePassword"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { addOrUpdateBasicInfo, getBasicInfo } from '@/api/system'
import { addOrUpdatePhonePassword, getPhonePassword } from '@/api/phonepassword'

export default {
  name: 'SystemSetting',
  data () {
    return {
      picUploadUrl: 'http://127.0.0.1:9988/file/uploadImg',
      enableBasic: false,
      basicFormData: {
        slogan: '',
        siteName: ''
      },
      logoPicList: [],
      enablePassword: false,
      passwordFormData: {},
      repass: ''

    }
  },
  methods: {
    doGetBasicInfo () {
      getBasicInfo().then(res => {
        if (res.data) {
          this.basicFormData = res.data
          console.log(res.data)
          this.logoPicList = [{ url: res.data.logoUrl }]
        }
      })
    },
    saveBasicData () {
      console.log(this.logoPicList)
      this.basicFormData.logoUrl = this.logoPicList[0].url
      addOrUpdateBasicInfo(this.basicFormData).then(res => {
        if (res.status) {
          this.enableBasic = false
          // 新增成功
          this.$message.success('修改成功')
        }
      })
    },
    logoPicUploadSuccess (file) {
      this.logoPicList = [{ url: file.data }]
    },
    doGetPhonePassword () {
      getPhonePassword().then(res => {
        if (res.data) {
          this.passwordFormData = res.data
        }
      })
    },
    savePhoneData () {
      addOrUpdatePhonePassword(this.passwordFormData).then(res => {
        this.$message.success('修改成功')
        this.enablePassword = false
      })
    }
  },
  created () {
    this.doGetBasicInfo()
    this.doGetPhonePassword()
  }
}
</script>

<style lang="scss" scoped>

.tabs-box {
  margin-top: 30px;
  height: 600px;
}

.tab-content-box {
  display: flex;
  justify-content: center;
}

.demo-form-inline {
  width: 700px;
}

</style>
