<template>
  <a-layout>
    <a-layout-header>
      <TitleBar :app-name="appName" />
    </a-layout-header>
    <a-layout class="app-container">
      <a-layout-sider collapsedWidth="48" :collapsed="true"><NavMenu /></a-layout-sider>
      <a-layout>
        <splitpanes class="splitpanes-theme">
          <Sider />
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

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'

import { Splitpanes, Pane } from 'splitpanes'

import TitleBar from '/@/components/Layout/TitleBar.vue'
import NavMenu from '/@/components/Layout/NavMenu.vue'
import Sider from '/@/components/Layout/Sider.vue'
import StatusBar from '/@/components/Layout/StatusBar.vue'
import Explorer from '/@/components/Layout/Explorer.vue'
import Hub from '/@/components/Layout/Hub.vue'
import AboutDialog from '/@/components/AboutDialog.vue'
// TODO: Hub更名为主容器，Explorer需更名为sider，其中tree提出来为公共组件
import { useIpc } from '/@/hooks'

export default defineComponent({
  name: 'App',
  components: {
    TitleBar,
    NavMenu,
    Sider,
    StatusBar,
    Explorer,
    Splitpanes,
    Pane,
    Hub,
    AboutDialog,
  },
  setup(props) {
    const { commit } = useStore()
    const appName = ref('Bartender')

    const data = reactive({
      appName,
    })
    useIpc().on('clientStatusUpdated', (event, result) => {
      console.log('%c clientStatusUpdated', 'color:cyan', result)
      commit('updateConnectionStatus', result)
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>
