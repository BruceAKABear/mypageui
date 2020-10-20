<template>
  <div class="main-box">
    <div class="button-box">
      <el-button type="primary" size="small" @click="addNewBlog">新增博客</el-button>
    </div>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="pageData.records"
      border
      size="mini"
      style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="博客标题">
      </el-table-column>
      <el-table-column
        show-tooltip-when-overflow
        align="center"
        prop="description"
        label="博客描述">
      </el-table-column>
      <el-table-column
        prop="viewCount"
        align="center"
        label="浏览数">
      </el-table-column>
      <el-table-column
        prop="likeCount"
        align="center"
        label="点赞数">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        width="240"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="是否置顶" placement="top">
            <el-switch
              @change="topChange(scope.row)"
              class="switchStyle"
              style="margin-right: 8px;color: #FFFFFF"
              v-model="scope.row.top"
              active-color="#13ce66"
              active-text="置顶"
              inactive-text="取消"
              inactive-color="#ff4949">
            </el-switch>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="启停发布" placement="top">
            <el-switch
              @change="publishChange(scope.row)"
              class="switchStyle"
              style="margin-right: 8px;color: #FFFFFF"
              v-model="scope.row.publish"
              active-color="#13ce66"
              active-text="发布"
              inactive-text="停止"
              inactive-color="#ff4949">
            </el-switch>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="gotoEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button size="mini" type="danger" icon="el-icon-delete" circle
                       @click="handDel(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pagination-box" v-if="pageData.total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageNumberChange"
        :total="pageData.total">
      </el-pagination>
    </div>

    <el-dialog
      title="新增分类"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleDialogClose">
      <div>
        <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="分类名">
            <el-input v-model="formData.typeName" placeholder="请输入分类名"></el-input>
          </el-form-item>
          <el-form-item label="分类样式">
            <el-select v-model="formData.typeStyle" placeholder="请选择分类样式">
              <el-option label="success" value="success"></el-option>
              <el-option label="info" value="info"></el-option>
              <el-option label="warning" value="warning"></el-option>
              <el-option label="danger" value="danger"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { addOrUpdate, changePublish, changeTop, deleteById, page } from '@/api/blog'

export default {
  name: 'BlogList',
  data () {
    return {
      pageData: {},
      pageParam: {
        pageNumber: 1,
        pageSize: 10
      },
      dialogVisible: false,
      formData: {}

    }
  },
  methods: {
    doPageQuery () {
      page(this.pageParam).then(res => {
        this.pageData = res.data
      })
    },
    pageNumberChange (pagen) {
      this.pageParam.pageNumber = pagen
      this.doPageQuery()
    },
    addNewBlog () {
      this.$router.push('newBlog')
    },
    handleDialogClose () {
      this.dialogVisible = false
    },
    save () {
      addOrUpdate(this.formData).then(res => {
        if (res.status) {
          // 新增成功
          this.formData = {}
          this.dialogVisible = false
          this.doPageQuery()
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    publishChange (rowdata) {
      this.$confirm('是否修改发布状态？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        changePublish({
          blogId: rowdata.id,
          publish: rowdata.publish
        }).then(res => {
          if (res.status) {
            this.$message.success('发布状态修改成功')
          }
        })
      })
    },
    topChange (rowdata) {
      this.$confirm('是否修改置顶？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        changeTop({
          blogId: rowdata.id,
          top: rowdata.top
        }).then(res => {
          if (res.status) {
            this.$message.success('发布状态修改成功')
          }
        })
      })
    },
    handDel (blogId) {
      this.$confirm('确定删除博客？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById({ blogId: blogId }).then(res => {
          if (res.status) {
            this.$message.success('删除成功')
            this.doPageQuery()
          }
        })
      })
    },
    gotoEdit (rowData) {
      this.$router.push({
        name: 'NewBlog',
        params: rowData
      })
    }
  },
  created () {
    this.doPageQuery()
  }
}
</script>

<style lang="scss" scoped>
.main-box {
  margin-top: 20px;

  .button-box {
    margin-bottom: 10px;
  }

  .pagination-box {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}

</style>
<style>
.switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}

/*打开时文字位置设置*/
.switchStyle .el-switch__label--right {
  z-index: 1;
  right: 6px;
}

/*关闭时文字位置设置*/
.switchStyle .el-switch__label--left {
  z-index: 1;
  left: 7px;
}

/*显示文字*/
.switchStyle .el-switch__label.is-active {
  display: block;
  color: #ffffff;
}

/*字体大小*/
.switchStyle .el-switch__label.is-active span {
  font-size: 14px;
}

.switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 60px !important;
}
</style>
