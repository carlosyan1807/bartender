<template>
  <splitpanes
    class="splitpanes-theme"
    horizontal
    :push-other-panes="false"
    @resize="handlePaneResize"
  >
    <pane size="80">
      <splitpanes class="splitpanes-theme" :push-other-panes="false" @resize="handlePaneResize">
        <pane size="20" min-size="20">
          <div class="connection-key-container" ref="refKeyContainer">
            <a-row>
              <a-col :span="24">
                <div class="key-list-header" ref="refKeyHeader">
                  <a-input size="small" :allow-clear="true">
                    <template #prefix><iconfont name="search" /></template>
                    <template #addonAfter>
                      <iconfont name="reload" @click="fetchKeys" />
                    </template>
                  </a-input>
                </div>
              </a-col>
              <a-col :span="24">
                <div class="key-list-container" ref="refKeyList">
                  <perfect-scrollbar
                    class="key-list-scrollbar"
                    ref="refKeyListScrollbar"
                    :options="{ suppressScrollX: true }"
                  >
                    <Tree
                      :treeNodes="keysData"
                      :custom-icon="true"
                      :show-badge="showBadge"
                      @change="handleShowKeyContent"
                      class="key-list"
                    />
                  </perfect-scrollbar>
                </div>
              </a-col>
            </a-row>
          </div>
        </pane>
        <pane min-size="20">
          <div class="key-editor-container">
            <a-row class="key-editor-header" justify="space-between">
              <a-col class="key-editor-header-left">
                <a-select
                  size="small"
                  v-model:value="dbSelected"
                  :options="dbItems"
                  style="width: 100px"
                >
                </a-select>
                <!-- <MonacoEditor /> -->
                <!-- <CodeEditor /> -->
                <!-- <a-switch v-model:checked="showBadge" /> -->
              </a-col>
              <a-col class="key-editor-header-right">
                <a-button
                  size="small"
                  class="icon-button"
                  @click="showConsole = !showConsole"
                  type="link"
                >
                  <iconfont name="console" />
                </a-button>
              </a-col>
            </a-row>
            <KeyContent :item="keySelectedItem" />
          </div>
        </pane>
      </splitpanes>
    </pane>
    <pane size="20" min-size="10" v-if="showConsole" ref="refConsolePane">
      <a-layout>
        <a-layout-header class="console-header">
          <div class="console-header-left"><span>终端</span></div>
          <div class="console-header-right">
            <a-button class="icon-button" type="link">
              <template #icon><iconfont name="up" /></template>
            </a-button>
            <a-button class="icon-button" type="link" @click="showConsole = false">
              <template #icon><iconfont name="close" /></template>
            </a-button>
          </div>
        </a-layout-header>
        <Terminal />
      </a-layout>
    </pane>
  </splitpanes>
</template>

<script lang="ts">
import {
  onMounted,
  reactive,
  toRefs,
  toRaw,
  ref,
  computed,
  defineComponent,
  Ref,
  watchEffect,
  getCurrentInstance,
  provide,
  nextTick,
  onUnmounted,
} from 'vue'

import { Splitpanes, Pane } from 'splitpanes'
// import MonacoEditor from '/@/components/Common/MonacoEditor.vue'
// import CodeEditor from '/@/components/Common/CodeEditor.vue'
import Tree from '/@/components/Common/Tree.vue'
import TreeBadge from '/@/components/Common/TreeBadge.vue'
import KeyContent from '/@/components/KeyContent/KeyContent.vue'
import Terminal from '/@/components/Common/Terminal.vue'

import { useStore } from 'vuex'
import { useService } from '/@/hooks'

export default defineComponent({
  name: 'Connection',
  components: { Splitpanes, Pane, Tree, TreeBadge, KeyContent, Terminal },
  props: {
    connectionId: String,
  },
  setup(props) {
    const { state } = useStore()
    const { createStandAloneConnection, getConfig, scanKeys } = useService('RedisService')

    const found = state.hub.connections.findIndex(
      (e: { id: string | undefined }) => e.id === props.connectionId
    )
    const connection = computed(() => state.hub.connections[found])
    provide('connectionId', connection.value.id)

    const isLoading = computed(() => connection.value.status !== 'ready')
    const showBadge = ref(true)

    const showConsole = ref(true)

    // 获取DB数量
    const dbCount = ref(0)
    const dbItems: any[] = reactive([])
    const dbSelected = ref(0)
    const fetchDatabaseCount = async () => {
      const result = await getConfig(toRaw(connection.value.id), 'databases')
      if (result[1]) {
        dbCount.value = Number(result[1])
      }
    }
    watchEffect(() => {
      for (let i = 0; i < dbCount.value; i++) {
        dbItems.push({ label: i, value: i })
      }
    })
    // 获取键列表
    let keysData: any[] = reactive([])
    const fetchKeys = async () => {
      const keys = await scanKeys(toRaw(connection.value.id))
      const result: { title: string; type: string; key: string }[] = []
      if (keys && keys.length > 0) keys.forEach((e) => result.push({ title: e[0], type: e[1], key: e[0] }))
      keysData.splice(0, keysData.length, ...result)
      if (result.length > 0) keySelectedItem.value = { name: result[0].title, type: result[0].type }
    }
    // 键列表选择
    const keySelectedItem = ref({})
    const handleShowKeyContent = (key: any, e: any) => {
      const { title, type } = e.node.dataRef
      keySelectedItem.value = { name: title, type }
    }

    // 设置组件大小
    const refKeyContainer = ref(null)
    const refKeyList = ref(null)
    const refKeyHeader = ref(null)
    const refKeyListScrollbar = ref(null)
    const refConsolePane = ref(null)
    const handlePaneResize = () => {
      refKeyList.value.style.height = `${
        refKeyContainer.value.offsetHeight - refKeyHeader.value.offsetHeight
      }px`
      refKeyListScrollbar.value.ps.update()
    }

    onMounted(async () => {
      const payload = {
        id: toRaw(connection.value.id),
        options: toRaw(connection.value.options),
      }
      const result = await createStandAloneConnection(payload.id, payload.options)
      if (result) {
        fetchDatabaseCount()
        fetchKeys()
      }

      nextTick(() => {
        handlePaneResize()
      })
    })

    onUnmounted(() => {
      if (refKeyListScrollbar.value?.ps) {
        refKeyListScrollbar.value.ps.destory()
        refKeyListScrollbar.value.ps = null
      }
    })

    const data = reactive({
      isLoading,
      connection,
      dbCount,
      dbItems,
      dbSelected,
      keysData,
      showBadge,
      showConsole,
      keySelectedItem,
    })
    return {
      ...toRefs(data),
      fetchDatabaseCount,
      fetchKeys,
      handleShowKeyContent,
      refKeyContainer,
      refConsolePane,
      refKeyListScrollbar,
      refKeyList,
      refKeyHeader,
      handlePaneResize,
    }
  },
})
</script>

<style lang="less">
@import url('../themes/variables');

.connection-container {
  padding: 16px 16px 0 16px;
}

.console-header.ant-layout-header {
  border-top: 1px solid @border-color-base;
  width: inherit;
  display: flex;
  justify-content: space-between;

  .icon-button {
    color: @text-color-secondary;
    &:hover,
    &:focus,
    &:active {
      color: @text-color-secondary;
    }
  }
  .console-header-left {
    padding-left: 16px;
    font-size: @font-size-sm;
  }
}
.connection-key-container {
  height: 100%;

  .key-list-header {
    padding: @padding-sm;
  }
  .key-list-container {
    position: relative;
    overflow: hidden;
  }
  .key-list-scrollbar {
    height: 100%;
    width: 100%;
    padding-bottom: @padding-sm;
  }
  .key-list {
    width: 100%;
  }
}
.key-editor-container {
  border-left: 1px solid @border-color-split;
  border-image: -webkit-linear-gradient(to bottom, @app-component-background, @border-color-split) 1
    100%;
  border-image: -moz-linear-gradient(to bottom, @app-component-background, @border-color-split) 1
    100%;
  border-image: linear-gradient(to bottom, @app-component-background, @border-color-split) 1 100%;
  // border-image: linear-gradient(to bottom, red , blue) 500 100%;
  .key-editor-header {
    padding: @padding-sm;
  }
  .key-editor-header-right {
    padding-right: @padding-sm;
  }
}
</style>
