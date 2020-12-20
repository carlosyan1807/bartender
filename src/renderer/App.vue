<template>
  <a-layout>
    <a-layout-header>
      <TitleBar :app-name="appName" />
    </a-layout-header>
    <a-layout class="app-container">
      <a-layout-sider collapsedWidth="48" :collapsed="true"><NavMenu /></a-layout-sider>
      <a-layout>
        <splitpanes class="splitpanes-theme">
          <pane size="20" min-size="20"><Explorer /></pane>
          <pane min-size="20">
            <a-layout-content class="app-content">
              <ConnectionPool />
            </a-layout-content>
          </pane>
        </splitpanes>
      </a-layout>
    </a-layout>
    <a-layout-footer>
      <StatusBar />
    </a-layout-footer>
  </a-layout>
  <a-modal v-model:visible="aboutVisible" title="Basic Modal">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'

import TitleBar from '/@/components/TitleBar.vue'
import NavMenu from '/@/components/NavMenu.vue'
import StatusBar from '/@/components/StatusBar.vue'
import Explorer from '/@/components/Explorer.vue'
import ConnectionPool from '/@/components/ConnectionPool.vue'

export default {
  name: 'App',
  components: {
    TitleBar,
    NavMenu,
    StatusBar,
    Explorer,
    Splitpanes,
    Pane,
    ConnectionPool,
  },
  setup() {
    const appName = 'Bartender'
    const aboutVisible = reactive(false)

    const state = reactive({
      appName,
      aboutVisible,
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="less">
@import url('./themes/variables');

.app-content {
  height: 100%;
  background-color: @component-background;
}
</style>
