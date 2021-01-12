<template>
  <KeyContentPane>
    <template #keyTable>
      <KeyContentTable :items="keyItems" type="list" />
    </template>
    <CodeMirrorEditor />
  </KeyContentPane>
</template>

<script lang="ts">
import { computed, defineComponent, inject, reactive, toRefs, watchEffect } from 'vue'
import { useService } from '/@/hooks'
import KeyContentPane from '/@/components/Connection/KeyContentPane.vue'
import KeyContentTable from '/@/components/Connection/KeyContentTable.vue'
import CodeMirrorEditor from '/@/components/Common/CodeMirrorEditor.vue'

export default defineComponent({
  name: 'KeyContentList',
  components: { KeyContentPane, KeyContentTable, CodeMirrorEditor },
  props: {
    keyName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { getListKey } = useService('RedisService')
    const connectionId = inject('connectionId') as string
    const keyName = computed(() => props.keyName)
    const keyItems: { index: number; item: string }[] = reactive([])

    const getKey = async (name: string) => {
      const id = connectionId
      const res = await getListKey(id, name)
      const result: { index: number; item: string }[] = []
      if (res && res.length > 0) res.forEach((e, i) => result.push({ index: i, item: e }))
      return result
    }
    watchEffect(async () => {
      const _key = keyName.value
      const result = await getKey(_key)
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

<style></style>
