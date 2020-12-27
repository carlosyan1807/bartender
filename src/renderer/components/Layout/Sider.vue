<template>
  <a-layout class="app-sider">
    <a-layout-header class="sider-header">
      <slot name="header"></slot>
    </a-layout-header>
    <a-layout-content class="sider-content">
      <slot></slot>
    </a-layout-content>
  </a-layout>
  <!-- <component :is="activedComponent" /> -->
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed, watchEffect } from 'vue'
// import Explorer from '/@/components/Explorer.vue'
// import TempComponent from '/@/components/TempComponent.vue'

import { useStore } from 'vuex'

export default defineComponent({
  name: 'Sider',
  components: {},
  props: {},
  setup(props) {
    const { state } = useStore()

    // const activedComponent = computed(() =>
    //   state.app.activedNavMenuItem === 'explorer' ? Explorer : TempComponent
    // )
    onMounted(() => {})

    const data = reactive({
      // siderVisiable,
      // activedComponent
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="less">
@import url('../../themes/variables');

.app-sider {
  height: calc(100vh - @app-titlebar-height - @app-statusbar-height);
  overflow: hidden;

  .sider-header.ant-layout-header {
    color: @text-color-secondary;
    height: @app-sider-header-height;
    font-size: 12px;
    line-height: @app-sider-header-height;
    padding: 0 20px;
    background-color: @body-background;
  }
  .sider-content {
    overflow: hidden;
    height: calc(100vh - @app-titlebar-height - @app-statusbar-height - @app-sider-header-height);
  }
}
</style>
