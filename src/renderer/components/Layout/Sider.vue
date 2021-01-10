<template>
  <el-container class="app-sider">
    <el-header class="sider-header">
      <slot name="header"></slot>
    </el-header>
    <el-container class="sider-content">
      <slot></slot>
    </el-container>
  </el-container>
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

<style lang="scss">
// @import url('../../themes/variables');

.app-sider {
  // height: calc(100vh - $app-titlebar-height - $app-statusbar-height);
  overflow: hidden;

  .sider-header {
    color: $text-color-highlight;
    min-height: $app-sider-header-height;
    max-height: $app-sider-header-height;
    font-size: $font-size-small;
    line-height: $app-sider-header-height;
    padding: 0 $space-extra-large;
    background-color: $app-background;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .sider-content {
    height: calc(
      100vh - #{$app-titlebar-height} - #{$app-statusbar-height} - #{$app-sider-header-height}
    );
  }
}
</style>
