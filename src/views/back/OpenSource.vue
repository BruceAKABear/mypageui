<template>
  <div class="main-box-wrapper">
    <!--表格头部-->
    <div class="btn-box">
      <el-button type="primary" size="small" @click="gotoNewProject">新增项目</el-button>
    </div>
    <el-table
      border
      :data="pageResponseData.records"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="projName"
        label="项目名"
        width="180">
      </el-table-column>
      <el-table-column
        label="进度">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.progress" :color="customColorMethod"></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="updateTime"
        label="更新时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { pageApi } from '@/api/opensource'

export default {
  name: 'OpenSource',
  data () {
    return {
      pageParam: {
        pageNumber: 1,
        pageSize: 10
      },
      pageResponseData: {}
    }
  },
  methods: {
    doPageQuery () {
      pageApi(this.pageParam).then(res => {
        if (res.data) {
          this.pageResponseData = res.data
        }
      })
    },
    gotoNewProject () {
      this.$router.push('newOpensource')
    },
    customColorMethod (percentage) {
      if (percentage < 30) {
        return '#909399'
      } else if (percentage < 70) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    }
  },
  created () {
    this.doPageQuery()
  }
}
</script>

<style lang="scss" scoped>
.main-box-wrapper {
  padding: 5px;
  background-color: white;
  height: 100%;
}

.btn-box {
  margin-top: 20px;
  margin-bottom: 10px;
}

</style>
