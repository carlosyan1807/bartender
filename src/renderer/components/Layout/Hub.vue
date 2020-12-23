<template>
  <a-tabs
    class="app-hub"
    :activeKey="activedTab"
    size="small"
    type="editable-card"
    :hide-add="true"
    @change="handleChangeTab"
  >
    <a-tab-pane v-for="item in connections" :key="item.id">
      <template #tab>
        <a-dropdown
          :trigger="['contextmenu']"
          placement="bottomLeft"
          :disabled="item.id === 'quick-connect'"
        >
          <div class="contextmenu-region">
            <iconfont v-if="item.id === 'quick-connect'" class="folder-color" name="thunderbolt" />
            <iconfont v-else-if="item.id === 'settings'" class="settings-color" name="setting" />
            <iconfont v-else class="redis-color" name="redis" />
            {{ item.label }}
          </div>
          <template #overlay>
            <ContextMenu :item-id="item.id" />
          </template>
        </a-dropdown>
      </template>
      <QuickConnect v-if="item.id === 'quick-connect'" @new-connection="handleNewTab" />
      <Settings v-else-if="item.id === 'settings'" />
      <Connection v-else :connection-id="item.id" />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, markRaw, ref, toRefs, computed, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'

import QuickConnect from '/@/components/QuickConnect.vue'
import Connection from '/@/components/Connection.vue'
import Settings from '/@/components/Settings.vue'
import ContextMenu from '/@/components/Common/ContextMenu.vue'

import { v4 as uuidv4 } from 'uuid'

export interface IConnectionOptions {
  host?: string
  port?: number | string
}

export default defineComponent({
  name: 'Hub',
  components: {
    QuickConnect,
    Settings,
    Connection,
    ContextMenu,
  },
  setup() {
    const { state, commit } = useStore()

    const connections = computed(() => state.hub.connections)
    // 添加 快速连接 页并激活
    if (connections.value.findIndex((e: { id: string }) => e.id === 'quick-connect') === -1)
      commit('createHubItem', { id: 'quick-connect', label: '快速连接' })
    commit('updateHubActivedTab', 'quick-connect')
    const activedTab = computed(() => state.hub.activedTab)

    const settingsVisiable = computed(() => state.hub.settingsVisiable)
    watch(settingsVisiable, (value) => {
      if (value) {
        if (connections.value.findIndex((e: { id: string }) => e.id === 'settings') === -1)
          commit('createHubItem', { id: 'settings', label: '设置' })
        commit('updateHubActivedTab', 'settings')
      } else {
        commit('removeHubItem', 'settings')
      }
    })
    // 切换页
    const handleChangeTab = (actived: string) => {
      commit('updateHubActivedTab', actived)
    }
    // 新建页
    const handleNewTab = async (options: IConnectionOptions) => {
      const uuid = uuidv4()
      const newItem = {
        id: uuid,
        label: `${options.host}:${options.port}`,
        options: options,
      }
      commit('createHubItem', newItem)
      commit('updateHubActivedTab', newItem.id)
    }
    // 关闭页
    // TODO: 关闭当前 tab 时, 先切换为 +1 或 -1 索引的 tab, 再进行 remove, 关闭非当前 tab 时, actived 不变
    const handleCloseTab = () => {}

    const data = reactive({
      connections,
      activedTab,
      settingsVisiable,
    })
    return {
      ...toRefs(data),
      handleNewTab,
      handleChangeTab,
    }
  },
})
</script>

<style lang="less">
@import url('../../themes/variables');

.app-hub {
  .ant-tabs-card-bar {
    border-bottom: none;
    background-color: @body-background;
  }
  .ant-tabs-tab {
    font-size: @font-size-sm;
    padding: 0 !important;
    border: none !important;

    .contextmenu-region {
      padding: 0 8px;
    }
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