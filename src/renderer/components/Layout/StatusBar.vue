<template>
  <div class="app-statusbar">
    <div class="footer-left">
      <a-button type="link" class="icon-button" @click="handleReload">
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
  width: inherit;
  justify-content: space-between;

  .icon-button {
    line-height: @app-statusbar-height;
    height: @app-statusbar-height;
  }
}
</style>
