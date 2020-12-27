<template>
  <splitpanes class="splitpanes-theme" horizontal :push-other-panes="false">
    <pane size="80" class="connection-container">
      <a-spin :spinning="isLoading">
        <splitpanes class="splitpanes-theme" :push-other-panes="false">
          <pane size="20" min-size="20">
            <a-input-search placeholder="搜索键名" size="small" />
            <Tree
              :treeNodes="keysData"
              :custom-icon="true"
              :show-badge="showBadge"
              @change="handleShowKeyContent"
            />
          </pane>
          <pane min-size="20">
            <a-select size="small" v-model:value="selectedDB">
              <a-select-option value="jack"> 1 </a-select-option>
            </a-select>
            <!-- <MonacoEditor /> -->
            <!-- <CodeEditor /> -->
            <a-button @click="handleRefreshKeys" type="primary">刷新</a-button>
            <a-button @click="showConsole = !showConsole" type="primary">显示控制台</a-button>
            <a-switch v-model:checked="showBadge" />
            <KeyContent :item="selectedKeyItem" />
          </pane>
        </splitpanes>
      </a-spin>
    </pane>
    <pane size="20" min-size="10" v-if="showConsole">
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
  Component,
  provide,
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
    const { createConnection, scanKeys } = useService('RedisService')

    const found = state.hub.connections.findIndex(
      (e: { id: string | undefined }) => e.id === props.connectionId
    )
    const connection = computed(() => state.hub.connections[found])
    provide('connectionId', connection.value.id)

    const isLoading = computed(() => connection.value.status !== 'ready')
    const showBadge = ref(true)
    const selectedDB = ref(0)
    const showConsole = ref(true)
    let keysData: any[] = reactive([])

    const getAllKeys = async () => {
      return await scanKeys({ id: toRaw(connection.value.id) })
    }

    // const treeSelectedKey: string[] = reactive([])
    const handleRefreshKeys = async () => {
      const keys = await getAllKeys()
      const result: { title: string; type: string; key: string }[] = []
      keys.forEach((e) => result.push({ title: e[0], type: e[1], key: e[0] }))
      keysData = keysData.splice(0, keysData.length, ...result)
      if (result.length > 0) selectedKeyItem.value = { name: result[0].title, type: result[0].type }
    }

    const selectedKeyItem = ref({})
    const handleShowKeyContent = (key: any, e: any) => {
      const { title, type } = e.node.dataRef
      selectedKeyItem.value = { name: title, type }
    }

    onMounted(async () => {
      const payload = {
        id: toRaw(connection.value.id),
        options: toRaw(connection.value.options),
      }
      const result = await createConnection(payload)
      if (result) handleRefreshKeys()
    })

    const data = reactive({
      isLoading,
      connection,
      keysData,
      showBadge,
      selectedDB,
      showConsole,
      selectedKeyItem,
      // treeSelectedKey,
    })
    return {
      ...toRefs(data),
      handleRefreshKeys,
      handleShowKeyContent,
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
</style>
