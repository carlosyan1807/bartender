<template>
  <KeyContentPane>
    <template #keyTable>
      <KeyContentTable :items="keyItems" type="zset" />
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
  name: 'KeyContentZSet',
  components: { KeyContentPane, KeyContentTable, CodeMirrorEditor },
  props: {
    keyName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { getZSetKey } = useService('RedisService')
    const connectionId = inject('connectionId') as string
    const keyName = computed(() => props.keyName)
    const keyItems: { member: string }[] = reactive([])

    const getKey = async (name: string) => {
      const id = connectionId
      const res = await getZSetKey(id, name)
      const payload: { member: string; score: number }[] = []
      if (res && res.length) {
        for (let i = 0; i < res.length - 1; i += 2) {
          payload.push({ member: res[i], score: Number(res[i + 1]) })
        }
      }
      return payload
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
