<template>
  <a-layout>
    <a-layout-header>
      <TitleBar :app-name="state.appName" />
    </a-layout-header>
    <a-layout class="app-container">
      <a-layout-sider collapsedWidth="48" :collapsed="true"><NavMenu /></a-layout-sider>
      <a-layout>
        <splitpanes class="splitpanes-theme">
          <pane size="20" min-size="20"><Explorer /></pane>
          <pane min-size="20">
            <a-layout-content class="app-content">
              <a-tabs
                class="app-hub"
                v-model:activeKey="state.activedTab"
                :animated="false"
                size="small"
                type="editable-card"
                :hide-add="true"
                @change="heiheihei"
              >
                <a-tab-pane v-for="item in state.tabsData" :key="item.name">
                  <template #tab>
                    <span>
                      <iconfont :class="item.iconClass" :name="item.icon" />
                      {{ item.label }}
                    </span>
                  </template>
                  <component :is="item.component" @new-connection="handleNewConnection" />
                </a-tab-pane>
              </a-tabs>
            </a-layout-content>
          </pane>
        </splitpanes>
      </a-layout>
    </a-layout>
    <a-layout-footer>
      <StatusBar />
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, markRaw, ref } from 'vue'

import { Splitpanes, Pane } from 'splitpanes'

import TitleBar from '/@/components/TitleBar.vue'
import NavMenu from '/@/components/NavMenu.vue'
import StatusBar from '/@/components/StatusBar.vue'
import Explorer from '/@/components/Explorer.vue'

import QuickConnect from '/@/components/QuickConnect.vue'
import Connection from '/@/components/Connection.vue'
import Settings from '/@/components/Settings.vue'

import { useIpc } from './hooks'

export interface IConnectionOptions {
  host: string
  port: number
}

import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  name: 'App',
  components: {
    TitleBar,
    NavMenu,
    StatusBar,
    Explorer,
    Splitpanes,
    Pane,
    QuickConnect,
    Settings,
    Connection,
  },
  setup() {
    const appName = 'Bartender'

    const tabQuickConnect = {
      name: 'quick-connect',
      label: '快速连接',
      icon: 'thunderbolt',
      component: markRaw(QuickConnect),
    }
    const tabSettings = {
      name: 'settings',
      label: '设置',
      icon: 'setting',
      component: markRaw(Settings),
    }
    const tabsData: object[] = reactive([])

    let activedTab = ref('quick-connect')

    const chooseIconClass = (array: any) => {
      for (let item of array) {
        if (item.name === 'quick-connect') item.iconClass = 'folder-color'
        else if (item.name === 'settings') item.iconClass = 'settings-color'
        else item.iconClass = 'redis-color'
      }
    }

    tabsData.push(tabQuickConnect)
    tabsData.push(tabSettings)
    chooseIconClass(tabsData)

    const handleNewConnection = (options: IConnectionOptions) => {
      const uuid = uuidv4()
      const newTab = {
        name: uuid,
        label: `${options.host}:${options.port}`,
        icon: 'redis',
        component: markRaw(Connection),
      }
      tabsData.push(newTab)
      chooseIconClass(tabsData)
      activedTab.value = newTab.name
    }
    const heiheihei = (a: any) => {
      console.log(a, activedTab)
    }
    let state = ref({
      appName,
      activedTab,
      tabsData,
    })
    return {
      state,
      handleNewConnection,
      heiheihei,
    }
  },
})
</script>

<style lang="less">
@import url('./themes/variables');

.app-content {
  height: 100%;
  background-color: @component-background;
}
.app-hub {
  .ant-tabs-card-bar {
    border-bottom: none;
    background-color: @body-background;
  }
  .ant-tabs-tab {
    font-size: @font-size-sm;
    padding: 0 8px !important;
    border: none !important;

    .ant-tabs-close-x {
      display: none;
    }
    .anticon.iconfont {
      font-size: 14px;
      margin-right: 4px;
    }
  }
  .ant-tabs-tab.ant-tabs-tab-active {
    font-weight: normal;
  }
  .ant-tabs-nav .ant-tabs-tab::before {
    border-radius: 0;
  }
  .ant-tabs-nav .ant-tabs-tab:hover {
    background: lighten(@component-background, 4%) !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active::before {
    position: absolute;
    content: '';
    top: 0px;
    left: 0px;
    height: 2px;
    width: 100%;
    display: block;
    background-color: @primary-color;
    transition-property: background-color;
    transition-duration: 0ms;
    transition-delay: 0.1s;
  }

  .ant-tabs-content {
    padding: 0 16px;
  }
}
</style>
