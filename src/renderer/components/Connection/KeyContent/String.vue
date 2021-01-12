<template>
  <CodeMirrorEditor :content="keyValue" />
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  inject,
  ref,
  watchEffect,
  Ref,
} from 'vue'

import { useService } from '/@/hooks'
import CodeMirrorEditor from '/@/components/Common/CodeMirrorEditor.vue'

export default defineComponent({
  name: 'StringContent',
  components: { CodeMirrorEditor },
  props: {
    keyName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { getStringKey } = useService('RedisService')
    const connectionId = inject('connectionId') as string
    const keyName = computed(() => props.keyName)
    const keyValue: Ref<string | null> = ref('')

    const getKey = async (name: string) => {
      const id = connectionId
      const result = await getStringKey(id, name)
      return result
    }

    watchEffect(async () => {
      keyValue.value = await getKey(keyName.value)
    })
    onMounted(() => {})

    const data = reactive({ keyValue })

    return {
      ...toRefs(data),
      getKey,
    }
  },
})
</script>

<style></style>
