<template>
  <div class="main-box">
    <div class="button-box">
      <el-button type="primary" size="small" @click="showAddDialog">新增标签</el-button>
    </div>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="pageData.records"
      border
      size="small"
      style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="标签名">
      </el-table-column>
      <el-table-column
        align="center"
        label="标签样式">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tagClassName">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="包含文章数">
        <template slot-scope="scope">
          {{ scope.row.blogCount ? scope.row.blogCount : 0 }}
        </template>
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
        width="150"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="small" type="info">修改</el-button>
          <el-button size="small" type="danger" @click="handDel(scope.row.id)">删除</el-button>
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
            <el-input v-model="formData.name" placeholder="请输入分类名"></el-input>
          </el-form-item>
          <el-form-item label="分类样式">
            <el-select v-model="formData.tagClassName" placeholder="请选择分类样式">
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

import { addOrUpdate, deleteById, page } from '@/api/blogTag'

export default {
  name: 'BlogTag',
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
    showAddDialog () {
      this.dialogVisible = true
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
    handDel (typeId) {
      deleteById({
        typeId: typeId
      }).then(res => {
        if (res.status) {
          // 删除成功
          this.doPageQuery()
        } else {
          this.$message.error(res.message)
        }
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
