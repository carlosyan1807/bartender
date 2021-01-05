<template>
  <el-container class="console-container">
    <el-header class="console-header">
      <el-row type="flex" justify="space-between">
        <el-col :span="20" class="console-header-left">
          <span>控制台</span>
        </el-col>
        <el-col :span="4" class="console-header-right">
          <el-button class="icon-button"><iconfont name="close" /></el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="console-main">
      <Terminal ref="refTerminal" />
    </el-main>
  </el-container>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted, ref, Ref } from 'vue'
import Terminal from '/@/components/Common/Terminal.vue'

export default defineComponent({
  name: 'Console',
  components: { Terminal },
  props: {},
  setup(props) {
    const data = reactive({})

    const refTerminal: Ref<any> = ref(null)
    const handleResize = () => {
      refTerminal.value.handleResize()
    }

    onMounted(() => {})

    return {
      ...toRefs(data),
      refTerminal,
      handleResize,
    }
  },
})
</script>

<style lang="scss">
.console-container {
  border-top: 1px solid $border-color-light;
  height: 100%;
  overflow: hidden;

  .console-header {
    min-height: $console-header-height;
    max-height: $console-header-height;
    font-size: $font-size-small;
    padding-left: $space-medium;
    line-height: $console-header-height;
  }
  .icon-button.el-button:hover,
  .icon-button.el-button:focus,
  .icon-button.el-button:active {
    background-color: $component-background;
  }
  .console-header-left {
    text-align: left;
  }
  .console-header-right {
    text-align: right;
  }
  .console-main {
    overflow: hidden;
    height: 100%;
  }
}
</style>
