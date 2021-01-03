<template>
  <el-tabs class="app-hub" type="card" :active-name="activedTab" @tab-click="handleChangeTab">
    <el-tab-pane v-for="(item, index) in connections" :key="index" :name="item.id">
      <template #label  @click.right="alert(1)">
        <iconfont v-if="item.id === 'quick-connect'" class="folder-color" name="thunderbolt" />
        <iconfont v-else-if="item.id === 'settings'" class="settings-color" name="setting" />
        <iconfont v-else class="redis-color" name="redis" />
        <span class="hub-header-label">{{ item.label }}</span>
      </template>
      <QuickConnect v-if="item.id === 'quick-connect'" />
      <Settings v-else-if="item.id === 'settings'" />
      <Connection v-else :connection-id="item.id" />
    </el-tab-pane>
  </el-tabs>
  <!-- <a-tabs
    class="app-hub"
    :active-key="activedTab"
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
            <ContextMenu :item-id="item.id" :items="contextMenuItems" />
          </template>
        </a-dropdown>
      </template>
      <QuickConnect v-if="item.id === 'quick-connect'" />
      <Settings v-else-if="item.id === 'settings'" />
      <Connection v-else :connection-id="item.id" />
    </a-tab-pane>
  </a-tabs> -->
</template>

<script lang="ts">
import { defineComponent, reactive, markRaw, ref, toRefs, computed, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'

import QuickConnect from '/@/components/QuickConnect.vue'
import Connection from '/@/components/Connection.vue'
import Settings from '/@/components/Settings.vue'
// import ContextMenu from '/@/components/Common/ContextMenu.vue'

import { useService } from '/@/hooks'

export default defineComponent({
  name: 'Hub',
  components: {
    QuickConnect,
    Settings,
    Connection,
    // ContextMenu,
  },
  setup() {
    const { state, commit } = useStore()
    const { createConnection, dropConnection } = useService('RedisService')
    const connections = computed(() => state.hub.connections.filter((e: any) => !e.isTrying))
    // 添加 快速连接 页并激活为默认页
    if (connections.value.findIndex((e: { id: string }) => e.id === 'quick-connect') === -1)
      commit('updateConnectionStatus', { id: 'quick-connect', label: '快速连接' })
    commit('updateHubActivedTab', 'quick-connect')
    const activedTab = computed(() => state.hub.activedTab)
    // 设置页显示状态
    const settingsVisiable = computed(() => state.hub.settingsVisiable)
    watch(settingsVisiable, (value) => {
      if (value) {
        if (connections.value.findIndex((e: { id: string }) => e.id === 'settings') === -1)
          commit('updateConnectionStatus', { id: 'settings', label: '设置' })
        commit('updateHubActivedTab', 'settings')
      } else {
        commit('removeHubItem', 'settings')
      }
    })
    // 切换页
    const handleChangeTab = (tab: any, event: Event) => {
      commit('updateHubActivedTab', tab.paneName)
    }
    // Tabs右键菜单 - 关闭
    const handleCloseTab = (targetId: string) => {
      const found = connections.value.findIndex((e: { id: string }) => e.id === targetId)
      let newIndex = 0
      if (found < connections.value.length - 1) newIndex = found + 1
      else newIndex = found - 1
      const newActived = connections.value[newIndex]
      dropConnection(targetId)
      commit('removeConnection', { id: targetId })
      if (targetId === activedTab.value) commit('updateHubActivedTab', newActived.id)
    }
    // tabs右键菜单 - 关闭全部
    const handleCloseAllTabs = () => {}
    // tabs右键菜单 - 关闭其他
    const handleCloseOtherTabs = () => {}
    const contextMenuItems = reactive([
      { label: '关闭', func: handleCloseTab },
      { label: '关闭其他', func: handleCloseAllTabs },
      { label: '关闭全部', func: handleCloseOtherTabs },
    ])
    // 关闭页
    // TODO: 关闭当前 tab 时, 先切换为 +1 或 -1 索引的 tab, 再进行 remove, 关闭非当前 tab 时, actived 不变

    const data = reactive({
      connections,
      activedTab,
      settingsVisiable,
      contextMenuItems,
    })
    return {
      ...toRefs(data),
      handleChangeTab,
    }
  },
})
</script>

<style lang="scss">
.app-hub.el-tabs {
  height: 100%;

  .el-tabs__header {
    background-color: $app-background;
    border-bottom: none;
    margin: 0;
  }
  .el-tabs__nav {
    border-radius: 0 !important;
    border: none !important;
  }
  .el-tabs__nav-wrap {
    margin-bottom: 0;
  }
  .el-tabs__item {
    font-size: $font-size-small;
    height: $app-hub-header-height;
    line-height: $app-hub-header-height;
    border: none !important;
    border-radius: 0;
    padding: 0 $space-small !important;
    color: $text-color;

    .iconfont {
      margin-right: $space-extra-small;
    }

    &:hover,
    &:focus {
      .hub-header-label {
        color: $text-color;
      }
    }
    &.is-active {
      background-color: $component-background;
      .hub-header-label {
        color: $text-color-highlight;
      }
      ::before {
        position: absolute;
        content: '';
        top: 0px;
        left: 0px;
        height: 2px;
        width: 100%;
        display: block;
        background-color: $--color-primary;
        transition: background-color 0.3s ease 0s;
      }
    }
  }
  .el-tabs__content {
    height: calc(100vh - #{$app-titlebar-height} - #{$app-statusbar-height} - #{$app-hub-header-height});

    .el-tab-pane {
      height: 100%;
    }
  }
}
// .app-hub {
//   height: 100%;
//   overflow: hidden;

//   .ant-tabs-bar.ant-tabs-card-bar {
//     border-bottom: none;
//     background-color: @body-background;
//   }
//   .ant-tabs-tab {
//     font-size: @font-size-sm;
//     padding: 0 !important;
//     border: none !important;

//     .contextmenu-region {
//       padding: 0 8px;
//     }
//     .ant-tabs-close-x {
//       display: none;
//     }
//     .anticon.iconfont {
//       font-size: 14px;
//       margin-right: 4px;
//     }
//   }
//   .ant-tabs-tab.ant-tabs-tab-active {
//     font-weight: normal;
//   }
//   .ant-tabs-nav .ant-tabs-tab::before {
//     border-radius: 0;
//   }
//   .ant-tabs-nav .ant-tabs-tab:hover {
//     background: lighten(@component-background, 4%) !important;
//   }
//   .ant-tabs-tab.ant-tabs-tab-active::before {
//     position: absolute;
//     content: '';
//     top: 0px;
//     left: 0px;
//     height: 2px;
//     width: 100%;
//     display: block;
//     background-color: @primary-color;
//     transition-property: background-color;
//     transition-duration: 0ms;
//     transition-delay: 0.1s;
//   }
//   .ant-tabs-content {
//     position: absolute;
//     top: @app-sider-header-height;
//     bottom: 0;
//     left: 0;
//     right: 0;

//     .ant-tabs-tabpane-active {
//       height: 100%;
//     }
//   }
// }
</style>
