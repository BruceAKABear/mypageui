<template>
  <div>
    <mavon-editor
      v-model="content"
      ref="md"
      @change="change"
      style="min-height: 600px"
    />
  </div>
</template>

<script>
// 导入组件 及 组件样式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'Dashboard',
  data () {
    return {}
  },
  // 注册
  components: {
    mavonEditor
  }
}
</script>

<style lang="scss" scoped>

</style>
