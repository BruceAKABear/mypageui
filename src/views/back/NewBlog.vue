<template>
  <div class="main-box">
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="博客标题">
        <el-input v-model="formData.title" placeholder="博客标题" style="border: 0"></el-input>
      </el-form-item>
      <el-form-item label="主图">
        <el-upload
          class="upload-demo"
          :action="imageUploadUrl"
          name="file"
          :limit="1"
          :on-remove="handleRemovePic"
          :file-list="picList"
          :on-success="successUpload"
          list-type="picture"
          :before-upload="beforeUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="博客分类">
        <el-select v-model="formData.typeId" placeholder="请选博客分类">
          <el-option :label="typeItem.typeName" :value="typeItem.id" v-for="typeItem in typeList"
                     :key="typeItem.id"></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="博客标签">-->
<!--        <el-select v-model="formData.typeId" placeholder="请选博客分类">-->
<!--          <el-option :label="typeItem.typeName" :value="typeItem.id" v-for="typeItem in typeList"-->
<!--                     :key="typeItem.id"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="博客描述">
        <el-input type="textarea" v-model="formData.description" rows="3" maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="内容" style="height: 550px">
        <quill-editor v-model="formData.content" style="height: 400px" ref="myQuillEditor" :options="editorOption">
        </quill-editor>
        <!--隐藏域用户上传-->
        <form id="upload" style="display: none" enctype="multipart/form-data" method="post">
          <input type="file" name="file" id="selectImg" accept="image/gif, image/jpeg, image/png"
                 @change="inputChangeImg"/>
          <input type="button" value="提交" @click="uploadPic"/>
        </form>
      </el-form-item>
      <el-form-item>
        <div class="button-box">
          <el-button size="small" type="info" @click="doSaveDraft">保存草稿</el-button>
          <el-button size="small" type="primary" @click="doSave">保存并发布</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { typeList } from '@/api/blogType'
import axios from 'axios'
import { addOrUpdate } from '@/api/blog'
// vue-quill-edito的配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['link', 'image'],
  ['clean'] // remove formatting button
]
export default {
  name: 'NewBlog',
  data () {
    return {
      imageUploadUrl: 'http://127.0.0.1:9988/file/uploadImg',
      picList: [],
      formData: {},
      typeList: [],
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value) {
                if (value) {
                  document.getElementById('selectImg').click() // 调用选择图片
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    doGetTypeList () {
      typeList().then(res => {
        this.typeList = res.data
      })
    },
    handleRemovePic () {
      this.picList = []
    },
    successUpload (res) {
      this.picList = [{ url: res.data }]
    },
    beforeUpload () {
      console.log('上传前')
    },
    doSaveDraft () {
      this.formData.publish = false
      this.formData.headPic = this.picList[0].url
      addOrUpdate(this.formData).then(res => {
        if (res.status) {
          if (res.data) {
            this.formData.id = res.data
          }
        }
      })
    },
    doSave () {
      this.formData.publish = true
      this.formData.headPic = this.picList[0].url
      addOrUpdate(this.formData).then(res => {
        if (res.status) {
          // 新增成功
          this.$confirm('博客新增成功！', '提示', {
            confirmButtonText: '去博客列表',
            cancelButtonText: '再写一篇',
            type: 'success',
            showClose: false
          }
          ).then(() => {
            // 去列表
            this.$router.push('/admin/blogList')
          }).catch(() => {
            // 再写一篇
            this.formData = {}
            this.picList = []
          })
        }
      })
    },
    selectImg () { // 选择图片
      document.getElementById('selectImg').click()
    },
    inputChangeImg: function () { // input 选择图片时的操作
      const that = this
      const input = document.getElementById('selectImg')
      if (input.files && input.files[0]) {
        const item = input.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
          that.uploadPic().then(res => { // 上传图片到服务器
            console.log(res)
            that.handleSuccess(res)
          }).catch(err => {
            console.log(err)
          })
        }
        reader.readAsDataURL(item)
      }
    },
    handleSuccess (res) {
      const quill = this.$refs.myQuillEditor.quill
      const length = quill.getSelection().index // 获取光标所在位置
      quill.insertEmbed(length, 'image', res.data.data)
      quill.setSelection(length + 1) // 调整光标到最后
    },
    uploadPic: function () {
      const form = document.getElementById('upload')
      const formData = new FormData(form)
      const config = {}
      config.headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data'
      }
      return axios.post(this.imageUploadUrl, formData, config)
    }
  },
  components: {
    quillEditor
  },
  created () {
    this.doGetTypeList()
    if (JSON.stringify(this.$route.params) !== '{}') {
      // 修改
      this.formData = this.$route.params
      this.picList = [{ url: this.$route.params.headPic }]
    }
  }
}
</script>

<style lang="scss" scoped>
.main-box {
  margin-top: 20px;

}

.button-box {
  display: flex;
  justify-content: space-between;
}

</style>
