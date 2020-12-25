<template>
  <div>settings</div>
  <ul>
    <li>跟随系统启动</li>
    <li>切换主题</li>
    <li>连接后自动隐藏explorer</li>
    <li>关闭时自动最小化到tray</li>
  </ul>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'

export default defineComponent({
  name: 'Settings',
  components: {},
  props: {},
  setup(props) {
    const data = reactive({})

    onMounted(()=> {})
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style>

</style>