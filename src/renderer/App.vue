<template>
  <a-layout>
    <a-layout-header>
      <TitleBar :app-name="appName" />
    </a-layout-header>
    <a-layout class="app-container">
      <a-layout-sider collapsedWidth="48" :collapsed="true"><NavMenu /></a-layout-sider>
      <a-layout>
        <a-layout-sider><Explorer /></a-layout-sider>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TitleBar from '/@/components/TitleBar.vue'
import NavMenu from '/@/components/NavMenu.vue'
import Explorer from '/@/components/Explorer.vue'

export default defineComponent({
  name: 'App',
  components: {
    TitleBar,
    NavMenu,
    Explorer,
  },
  setup() {
    const appName = 'Bartender'
    return {
      appName,
    }
  },
})
</script>

<style></style>
