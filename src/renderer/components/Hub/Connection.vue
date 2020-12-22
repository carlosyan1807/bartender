<template>
  <a-spin :spinning="isLoading">
    <div>connection {{ connection }}</div>
    {{ keysData }}
    <a-directory-tree :tree-data="keysData" :block-node="true" :show-icon="false">
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
          {{ item.name }}
        </span>
      </template>
    </a-directory-tree>
    <JsonEditor />
  </a-spin>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, toRaw, ref, computed, defineComponent, Ref } from 'vue'
import { useStore } from 'vuex'
import { useService } from '/@/hooks'

import JsonEditor from '/@/components/Connection/JsonEditor.vue'

export default defineComponent({
  name: 'Connection',
  components: { JsonEditor },
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

    const keysData: Ref<{ name: string; type: string }[]> = ref([])

    const getAllKeys = async () => {
      const result = await scanKeys({ id: toRaw(connection.value.id) })
      const payload: { name: string; type: string }[] = []
      result.forEach((e) => payload.push({ name: e[0], type: e[1] }))
      keysData.value = payload
    }

    onMounted(async () => {
      const payload = {
        id: toRaw(connection.value.id),
        options: toRaw(connection.value.options),
      }
      const result = await createConnection(payload)
      if (result) getAllKeys()
    })

    const data = reactive({ isLoading, connection, keysData })
    return {
      ...toRefs(data),
    }
  },
})
</script>

<style></style>
