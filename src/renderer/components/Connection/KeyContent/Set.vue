<template>
  <KeyContentPane>
    <template #keyTable>
      <KeyContentTable :items="keyItems" type="set" />
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
  name: 'KeyContentSet',
  components: { KeyContentPane, KeyContentTable, CodeMirrorEditor },
  props: {
    keyName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { getSetKey } = useService('RedisService')
    const connectionId = inject('connectionId') as string
    const keyName = computed(() => props.keyName)
    const keyItems: { member: string }[] = reactive([])

    const getKey = async (name: string) => {
      const id = connectionId
      const result = await getSetKey(id, name)
      return result
    }
    watchEffect(async () => {
      const _key = keyName.value
      const [cursor, result] = await getKey(_key)
      const payload: { member: string }[] = []
      if (result && result.length > 0) result.forEach((e) => payload.push({ member: e }))
      keyItems.splice(0, keyItems.length, ...payload)
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
