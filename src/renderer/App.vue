<template>
  <el-container class="app-layout">
    <el-header class="app-layout-header">
      <TitleBar :app-name="appName" />
    </el-header>
    <el-container class="app-layout-content">
      <el-aside class="app-layout-navmenu">
        <NavMenu />
      </el-aside>
      <el-main class="app-layout-main">
        <splitpanes :dbl-click-splitter="false">
          <pane v-show="siderVisiable" :size="siderSize">
            <keep-alive>
              <component :is="activedComponent" />
            </keep-alive>
          </pane>
          <pane :size="100 - siderSize">
            <Hub />
          </pane>
        </splitpanes>
      </el-main>
    </el-container>
    <el-footer class="app-layout-footer">
      <StatusBar />
    </el-footer>
    <AboutDialog />
  </el-container>
  <!-- <a-layout>
    <TitleBar :app-name="appName" />
    <a-layout>
      <a-layout-sider collapsed-width="48" :collapsed="true">
        <NavMenu />
      </a-layout-sider>
      <a-layout>
        <splitpanes class="splitpanes-theme" :dbl-click-splitter="false">
          <pane :size="siderSize" v-show="siderVisiable">
            <keep-alive>
              <component :is="activedComponent" />
            </keep-alive>
          </pane>
          <pane :size="100 - siderSize">
            <Hub />
          </pane>
        </splitpanes>
      </a-layout>
    </a-layout>
    <a-layout-footer>
      <StatusBar />
    </a-layout-footer>
    <AboutDialog />
  </a-layout> -->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'

import { Splitpanes, Pane } from 'splitpanes'

import TitleBar from '/@/components/Layout/TitleBar.vue'
import NavMenu from '/@/components/Layout/NavMenu.vue'
import Sider from '/@/components/Layout/Sider.vue'
import StatusBar from '/@/components/Layout/StatusBar.vue'
import Hub from '/@/components/Layout/Hub.vue'
import AboutDialog from '/@/components/AboutDialog.vue'

import Explorer from '/@/components/Explorer.vue'
import TempComponent from '/@/components/TempComponent.vue'

import { useIpc, useService } from '/@/hooks'

export default defineComponent({
  name: 'App',
  components: {
    TitleBar,
    NavMenu,
    Sider,
    StatusBar,
    Splitpanes,
    Pane,
    Hub,
    AboutDialog,
    Explorer,
    TempComponent,
  },
  setup() {
    const { state, commit } = useStore()
    const { getKeyDisplayByIcon } = useService('ConfigService')
    const appName = ref('Bartender')
    const siderVisiable = computed(() => !!state.app.activedNavMenuItem)
    const activedComponent = computed(() =>
      state.app.activedNavMenuItem === 'explorer' ? Explorer : TempComponent
    )
    useIpc().on('connectionStatusUpdated', (event, res) => {
      console.log('%c connectionStatusUpdated', 'color:cyan', res)
      commit('updateConnectionStatus', res)
    })
    useIpc().on('connectionLogUpdated', (event, res) => {
      commit('updateConnectionLog', res)
    })
    // 容器大小
    const siderSize = ref(20)
    // const hubSize = ref(80)
    const handleToggleSider = (value: number) => {
      if (!value) siderSize.value = 0
      else siderSize.value = 20
    }
    watchEffect(() => handleToggleSider(state.app.activedNavMenuItem))

    onMounted(async () => {
      const keyDisplayByIcon = await getKeyDisplayByIcon()
      commit('updateKeyDisplayByIcon', keyDisplayByIcon)
    })
    const data = reactive({
      appName,
      activedComponent,
      siderVisiable,
      siderSize,
      // hubSize,
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>
