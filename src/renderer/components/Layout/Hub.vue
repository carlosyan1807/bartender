<template>
  <el-tabs class="app-hub" type="card" :active-name="activedTab" @tab-click="handleChangeTab">
    <el-tab-pane v-for="(item, index) in connections" :key="index" :name="item.id">
      <template #label>
        <div class="hub-tab-header" @click.middle.stop="handleCloseTab(item.id, $event)">
          <iconfont v-if="item.id === 'quick-connect'" class="folder-color" name="thunderbolt" />
          <iconfont v-else-if="item.id === 'settings'" class="settings-color" name="setting" />
          <iconfont v-else class="redis-color" name="redis" />
          <span class="hub-header-label">{{ item.label }}</span>
        </div>
      </template>
      <QuickConnect v-if="item.id === 'quick-connect'" />
      <Settings v-else-if="item.id === 'settings'" />
      <Connection v-else :connection-id="item.id" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, computed, watch } from 'vue'
import { useStore } from 'vuex'

import QuickConnect from '/@/components/QuickConnect.vue'
import Connection from '/@/components/Connection/Connection.vue'
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
    const { dropConnection } = useService('RedisService')
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
    const handleCloseTab = (targetId: string, event?: MouseEvent) => {
      if (event?.button === 1) event.preventDefault()
      if (targetId !== 'quick-connect' && targetId !== 'settings') {
        const found = connections.value.findIndex((e: { id: string }) => e.id === targetId)
        let newIndex = 0
        if (found < connections.value.length - 1) newIndex = found + 1
        else newIndex = found - 1
        const newActived = connections.value[newIndex]
        dropConnection(targetId)
        commit('removeConnection', { id: targetId })
        if (targetId === activedTab.value) commit('updateHubActivedTab', newActived.id)
      }
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
    const tabContextMenuVisiable = ref(false)
    const handleTabContextMenu = (id: string, event: Event) => {
      console.log(event, id)
      tabContextMenuVisiable.value = true
    }
    const data = reactive({
      connections,
      activedTab,
      settingsVisiable,
      contextMenuItems,
      tabContextMenuVisiable,
    })
    return {
      ...toRefs(data),
      handleChangeTab,
      handleCloseTab,
      handleTabContextMenu,
    }
  },
})
</script>

<style lang="scss">
.app-hub.el-tabs {
  height: 100%;

  .hub-tab-header {
    padding: 0 $space-small;
  }
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
    padding: 0 !important;
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
        background-color: $color-primary;
        transition: background-color 0.3s ease 0s;
      }
    }
  }
  .el-tabs__item:focus.is-active.is-focus:not(:active) {
    box-shadow: none;
  }
  .el-tabs__content {
    height: calc(
      100vh - #{$app-titlebar-height} - #{$app-statusbar-height} - #{$app-hub-header-height}
    );

    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
