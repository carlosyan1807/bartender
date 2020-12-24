<template>
  <a-spin :spinning="isLoading">
    <splitpanes class="splitpanes-theme" horizontal :push-other-panes="false">
      <pane>
        <splitpanes class="splitpanes-theme">
          <pane size="20" min-size="20">
            <a-input-search placeholder="搜索键名" size="small" />
            <Tree :treeNodes="keysData">
              <template #icon="{ item }">
                <TreeBadge :badge="showBadge" :type="item.type" />
              </template>
            </Tree>
          </pane>
          <pane min-size="20">
            <a-select size="small" v-model:value="selectedDB" style="width: 120px">
              <a-select-option value="jack"> 1 </a-select-option>
            </a-select>
            <!-- <MonacoEditor /> -->
            <CodeEditor />
            <a-button @click="handleRefreshKeys" type="primary">刷新</a-button>
            <a-switch v-model:checked="showBadge" />
          </pane>
        </splitpanes>
      </pane>
      <pane>console</pane>
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
  </a-spin>
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
} from 'vue'

import { Splitpanes, Pane } from 'splitpanes'
// import MonacoEditor from '/@/components/Common/MonacoEditor.vue'
import CodeEditor from '/@/components/Common/CodeEditor.vue'
import Tree from '/@/components/Common/Tree.vue'
import TreeBadge from '/@/components/Common/TreeBadge.vue'

import { useStore } from 'vuex'
import { useService } from '/@/hooks'

export default defineComponent({
  name: 'Connection',
  components: { Splitpanes, Pane, Tree, TreeBadge, CodeEditor },
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
    const keysData: any = reactive([])
    const selectedDB = ref(0)
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
    const data = reactive({ isLoading, connection, keysData, showBadge, selectedDB })
    return {
      ...toRefs(data),
      handleRefreshKeys,
    }
  },
})
</script>

<style></style>
