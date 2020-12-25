<template>
  <a-layout>
    <a-layout-header>
      <TitleBar :app-name="appName" />
    </a-layout-header>
    <a-layout class="app-container">
      <a-layout-sider collapsedWidth="48" :collapsed="true"><NavMenu /></a-layout-sider>
      <a-layout>
        <splitpanes class="splitpanes-theme" :dbl-click-splitter="false">
          <pane :size="siderSize" min-size="20" v-show="siderVisiable">
            <keep-alive>
              <component :is="activedComponent" />
            </keep-alive>
          </pane>
          <pane :size="mainContainerSize">
            <a-layout-content class="app-content">
              <MainContainer />
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
import { computed, defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'

import { Splitpanes, Pane } from 'splitpanes'

import TitleBar from '/@/components/Layout/TitleBar.vue'
import NavMenu from '/@/components/Layout/NavMenu.vue'
import Sider from '/@/components/Layout/Sider.vue'
import StatusBar from '/@/components/Layout/StatusBar.vue'
import MainContainer from '/@/components/Layout/MainContainer.vue'
import AboutDialog from '/@/components/AboutDialog.vue'

import Explorer from '/@/components/Explorer.vue'
import TempComponent from '/@/components/TempComponent.vue'

// TODO: Hub更名为主容器，Explorer需更名为sider，其中tree提出来为公共组件
import { useIpc } from '/@/hooks'

export default defineComponent({
  name: 'App',
  components: {
    TitleBar,
    NavMenu,
    Sider,
    StatusBar,
    Splitpanes,
    Pane,
    MainContainer,
    AboutDialog,
    Explorer,
    TempComponent,
  },
  setup(props) {
    const { state, commit } = useStore()
    const appName = ref('Bartender')
    const siderVisiable = computed(() => !!state.app.activedNavMenuItem)
    const activedComponent = computed(() =>
      state.app.activedNavMenuItem === 'explorer' ? Explorer : TempComponent
    )

    useIpc().on('connectionStatusUpdated', (event, result) => {
      console.log('%c connectionStatusUpdated', 'color:cyan', result)
      commit('updateConnectionStatus', result)
    })

    // 容器大小
    const siderSize = ref(20)
    const mainContainerSize = ref(80)
    const handleToggleSider = (value: string) => {
      if (!value) mainContainerSize.value = 100
    }
    watchEffect(() => handleToggleSider(state.app.activedNavMenuItem))

    const data = reactive({
      appName,
      activedComponent,
      siderVisiable,
      siderSize,
      mainContainerSize,
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>
