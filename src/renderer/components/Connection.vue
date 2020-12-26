<template>
  <splitpanes class="splitpanes-theme" horizontal :push-other-panes="false">
    <pane :size="100 - consoleSize">
      <div class="connection-container">
        <a-spin :spinning="isLoading">
          <splitpanes class="splitpanes-theme" :push-other-panes="false">
            <pane size="20" min-size="20">
              <a-input-search placeholder="搜索键名" size="small" />
              <Tree :treeNodes="keysData">
                <template #icon="{ item }">
                  <TreeBadge :badge="showBadge" :type="item.type" />
                </template>
              </Tree>
            </pane>
            <pane min-size="20">
              <a-select size="small" v-model:value="selectedDB">
                <a-select-option value="jack"> 1 </a-select-option>
              </a-select>
              <List :listData="keysData"></List>
              <!-- <MonacoEditor /> -->
              <!-- <CodeEditor /> -->
              <a-button @click="handleRefreshKeys" type="primary">刷新</a-button>
              <a-button @click="showConsole = !showConsole" type="primary">显示控制台</a-button>
              <a-switch v-model:checked="showBadge" />
            </pane>
          </splitpanes>
        </a-spin>
      </div>
    </pane>

    <pane :size="consoleSize" v-if="showConsole">
      <a-layout class="console-container">
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
        <Terminal ref="refTerminal" />
      </a-layout>
    </pane>
  </splitpanes>

  <!-- <a-directory-tree :tree-data="keysData" :block-node="true" :show-icon="false">
      <template #switcherIcon>
        <span></span>
      </template>
      <template #title="item">
        <span>
          <iconfont
            class="icon-redis icon-redis-list"
            v-if="item.type === 'list'"
            name="redis-list"
          />
          <iconfont class="icon-redis icon-redis-set" v-if="item.type === 'set'" name="redis-set" />
          <iconfont
            class="icon-redis icon-redis-zset"
            v-if="item.type === 'zset'"
            name="redis-zset"
          />
          <iconfont
            class="icon-redis icon-redis-hash"
            v-if="item.type === 'hash'"
            name="redis-hash"
          />
          <iconfont
            class="icon-redis icon-redis-string"
            v-if="item.type === 'string'"
            name="redis-string"
          />
          <a-badge class="badge-redis badge-redis-list" v-if="item.type === 'list'" count="LIST" />
          <a-badge class="badge-redis badge-redis-set" v-if="item.type === 'set'" count="SET" />
          <a-badge class="badge-redis badge-redis-zset" v-if="item.type === 'zset'" count="ZSET" />
          <a-badge class="badge-redis badge-redis-hash" v-if="item.type === 'hash'" count="HASH" />
          <a-badge
            class="badge-redis badge-redis-string"
            v-if="item.type === 'string'"
            count="STR"
          />
          {{ item.title }}
        </span>
      </template>
    </a-directory-tree> -->
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
} from 'vue'

import { Splitpanes, Pane } from 'splitpanes'
// import MonacoEditor from '/@/components/Common/MonacoEditor.vue'
// import CodeEditor from '/@/components/Common/CodeEditor.vue'
import Tree from '/@/components/Common/Tree.vue'
import TreeBadge from '/@/components/Common/TreeBadge.vue'
import List from '/@/components/Common/List.vue'
import Terminal from '/@/components/Common/Terminal.vue'

import { useStore } from 'vuex'
import { useService } from '/@/hooks'

export default defineComponent({
  name: 'Connection',
  components: { Splitpanes, Pane, Tree, TreeBadge, List, Terminal },
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
    const isLoading = computed(() => connection.value.status !== 'ready')
    const showBadge = ref(true)
    const selectedDB = ref(0)
    const showConsole = ref(false)
    const consoleSize = ref(20)
    const keysData: any = reactive([])

    const getAllKeys = async () => {
      const result = await scanKeys({ id: toRaw(connection.value.id) })
      const payload: { title: string; type: string }[] = []
      result.forEach((e) => payload.push({ title: e[0], type: e[1] }))
      return payload
    }

    onMounted(async () => {
      const payload = {
        id: toRaw(connection.value.id),
        options: toRaw(connection.value.options),
      }
      const result = await createConnection(payload)
      if (result) keysData.value = keysData.splice(0, keysData.length, ...(await getAllKeys()))
    })

    const handleRefreshKeys = async () => {
      keysData.value = keysData.splice(0, keysData.length, ...(await getAllKeys()))
    }
    const data = reactive({
      isLoading,
      connection,
      keysData,
      showBadge,
      selectedDB,
      showConsole,
      consoleSize,
    })
    return {
      ...toRefs(data),
      handleRefreshKeys,
    }
  },
})
</script>

<style lang="less">
@import url('../themes/variables');

.connection-container {
  padding: 16px 16px 0 16px;
}
.console-container {
  height: 100%;
  border-top: 1px solid @border-color-base;
}

.console-header.ant-layout-header {
  width: 100%;
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
