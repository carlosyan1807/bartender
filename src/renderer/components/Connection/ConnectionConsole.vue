<template>
  <div ref="refConsoleContainer" class="console-container">
    <div ref="refConsoleHeader" class="console-header">
      <el-row type="flex" justify="space-between">
        <el-col :span="20" class="console-header-left">
          <span>控制台</span>
        </el-col>
        <el-col :span="4" class="console-header-right">
          <el-button class="icon-button"><iconfont name="close" /></el-button>
        </el-col>
      </el-row>
    </div>
    <div ref="refConsoleMain" class="console-main">
      <Terminal ref="refTerminal" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import Terminal from '/@/components/Common/Terminal.vue'

export default defineComponent({
  name: 'Console',
  components: { Terminal },
  props: {},
  setup() {
    const data = reactive({})

    const refConsoleContainer = ref(null)
    const refConsoleHeader = ref(null)
    const refConsoleMain = ref(null)
    const refTerminal = ref(null)
    const handleResize = () => {
      // console.log(refConsoleContainer.value.offsetHeight)
      refConsoleMain.value.style.height = `${
        refConsoleContainer.value.offsetHeight - refConsoleHeader.value.offsetHeight
      }px`
      // console.log('resize', refConsoleMain.value.style.height)
      refTerminal.value.handleResize()
    }

    return {
      ...toRefs(data),
      refConsoleContainer,
      refConsoleHeader,
      refConsoleMain,
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
    height: 100%;
    // position: relative;
    // background-color: red;
    // box-sizing: border-box;
    // height: calc(100% - #{$console-header-height});
  }
}
</style>
