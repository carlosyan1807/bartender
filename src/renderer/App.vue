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
            <a-tabs @change="callback" :animated="false" size="small">
              <a-tab-pane key="quick-connect">
                <template #tab>
                  <span>
                    <iconfont name="thunderbolt" />
                    快速连接
                  </span>
                </template>
                <iconfont style="color: red" name="win-minimize" />
                <iconfont style="color: red" name="win-maximize" />
                <iconfont style="color: red" name="win-restore" />
                <iconfont style="color: red" name="win-close" />
                123
              </a-tab-pane>
              <a-tab-pane key="2" tab="Tab 2" force-render> Content of Tab Pane 2 </a-tab-pane>
              <a-tab-pane key="3" tab="Tab 3"> Content of Tab Pane 3 </a-tab-pane>
            </a-tabs>
          </pane>
        </splitpanes>

        <!-- <a-layout-content>
          
        </a-layout-content> -->
        <a-button @click="handleReload">
          <template #icon><iconfont name="reload" /></template>
          重载
        </a-button>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Splitpanes, Pane } from 'splitpanes'

import TitleBar from '/@/components/TitleBar.vue'
import NavMenu from '/@/components/NavMenu.vue'
import Explorer from '/@/components/Explorer.vue'

import { useIpc } from './hooks'

export default defineComponent({
  name: 'App',
  components: {
    TitleBar,
    NavMenu,
    Explorer,
    Splitpanes,
    Pane,
  },
  setup() {
    const appName = 'Bartender'

    // 重载页面
    const handleReload = () => {
      console.log('Reload!')
      useIpc().send('renderer2main', 'reload')
    }

    return {
      appName,
      handleReload,
    }
  },
})
</script>

<style></style>
