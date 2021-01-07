<template>
  <KeyContentPane>
    <template #keyTable>
      <KeyContentTable :items="keyItems" type="hash" />
    </template>
    <CodeMirrorEditor />
  </KeyContentPane>
</template>

<script lang="ts">
import { computed, defineComponent, inject, reactive, toRefs, watchEffect } from 'vue'
import { useService } from '/@/hooks'
import KeyContentPane from '/@/components/KeyContent/KeyContentPane.vue'
import KeyContentTable from '/@/components/KeyContent/KeyContentTable.vue'
import CodeMirrorEditor from '/@/components/Common/CodeMirrorEditor.vue'

export default defineComponent({
  name: 'KeyContentHash',
  components: { KeyContentPane, KeyContentTable, CodeMirrorEditor },
  props: {
    keyName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { getHashKey } = useService('RedisService')
    const connectionId = inject('connectionId') as string
    const keyName = computed(() => props.keyName)
    const keyItems: { key: string; value: string }[] = reactive([])

    const getKey = async (name: string): Promise<[string, { key: string; value: string }[]]> => {
      const id = connectionId
      const [cursor, res] = await getHashKey(id, name)
      const result: { key: string; value: string }[] = []
      if (res.length) {
        for (let i = 0; i < res.length - 1; i += 2) {
          result.push({ key: res[i].toString(), value: res[i + 1].toString() })
        }
      }
      return [cursor, result]
    }

    watchEffect(async () => {
      const _key = keyName.value
      const [cursor, result] = await getKey(_key)
      keyItems.splice(0, keyItems.length, ...result)
    })

    const data = reactive({
      keyItems,
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="scss">
.key-content-table-wrapper {
  border: 1px solid $border-color-base;
  margin-right: $space-extra-small;
}
</style>
