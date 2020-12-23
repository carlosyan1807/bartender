<template>
  <div class="app-statusbar">
    <div class="footer-left">
      <a-button type="link" class="footer-button" @click="handleReload">
        <template #icon><iconfont name="reload" /></template>
      </a-button>
    </div>
    <div class="footer-right"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useIpc } from '/@/hooks'

export default defineComponent({
  name: 'StatusBar',
  setup() {
    const handleReload = () => {
      useIpc().send('renderer2main', 'reload')
    }

    return {
      handleReload,
    }
  },
})
</script>

<style lang="less">
@import url('../../themes/variables');

.app-statusbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 22px;
  display: flex;
  justify-content: space-between;

  .footer-button {
    border: 0;
    border-radius: 0;
    padding: 0;
    line-height: 22px;
    height: 22px;
    font-size: 14px;
    color: @text-color;

    &:hover,
    &:focus,
    &:active {
      color: @text-color;
      background-color: @component-background;
    }
  }
  // .footer-button.reload {
  //   color: @text-color-secondary;
  //   width: 34px;
  //   background-color: @primary-color;
  // }
}
</style>
