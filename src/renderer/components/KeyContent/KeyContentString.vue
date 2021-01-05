<template>
  <!-- <el-input
    type="textarea"
    v-model="stringContent"
    placeholder="<空>"
    class="string-content"
  /> -->
  <!-- <MonacoEditor :content="stringContent" /> -->
  <CodeMirrorEditor :content="contentValue" />
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
  toRaw,
  watchEffect,
  Ref,
} from 'vue'

import { useService } from '/@/hooks'
// import MonacoEditor from '/@/components/Common/MonacoEditor.vue'
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
    const contentValue: Ref<string | null> = ref('')

    const getKey = async (name: string) => {
      const id = connectionId
      const result = await getStringKey(id, name)
      return result
    }

    watchEffect(async () => {
      contentValue.value = await getKey(keyName.value)
    })
    onMounted(() => {})

    const data = reactive({ contentValue })

    return {
      ...toRefs(data),
      getKey,
    }
  },
})
</script>

<style></style>
