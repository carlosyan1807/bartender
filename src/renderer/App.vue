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
              <Hub />
            </a-layout-content>
          </pane>
        </splitpanes>
      </a-layout>
    </a-layout>
    <a-layout-footer>
      <StatusBar />
    </a-layout-footer>
    <AboutDialog />
  </a-layout>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'

import { Splitpanes, Pane } from 'splitpanes'

import TitleBar from '/@/components/TitleBar.vue'
import NavMenu from '/@/components/NavMenu.vue'
import StatusBar from '/@/components/StatusBar.vue'
import Explorer from '/@/components/Explorer.vue'
import Hub from '/@/components/Hub'
import AboutDialog from '/@/components/AboutDialog.vue'

export default {
  name: 'App',
  components: {
    TitleBar,
    NavMenu,
    StatusBar,
    Explorer,
    Splitpanes,
    Pane,
    Hub,
    AboutDialog,
  },
  setup(props) {
    const store = useStore()

    const appName = ref('Bartender')

    const data = reactive({
      appName,
    })

    return {
      ...toRefs(data),
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
