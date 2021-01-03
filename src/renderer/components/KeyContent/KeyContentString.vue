<template>
  <!-- <el-input
    type="textarea"
    v-model="stringContent"
    placeholder="<空>"
    class="string-content"
  /> -->
  <MonacoEditor :content="stringContent" />
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
import MonacoEditor from '/@/components/Common/MonacoEditor.vue'

export default defineComponent({
  name: 'StringContent',
  components: { MonacoEditor },
  props: {
    keyName: {
      type: String,
      required: true,
    },
  },
  setup(props, { attrs }) {
    const { getStringKey } = useService('RedisService')
    const connectionId = inject('connectionId')
    const keyName = computed(() => props.keyName)
    const stringContent: Ref<string | null> = ref('')

    const getKey = async (name: string) => {
      const id = <string>connectionId
      const result = await getStringKey(id, name)
      return result
    }

    watchEffect(async () => {
      stringContent.value = await getKey(keyName.value)
    })
    onMounted(() => {})

    const data = reactive({ stringContent })

    return {
      ...toRefs(data),
      getKey,
    }
  },
})
</script>

<style lang="scss">
.string-content.ant-input {
  border: 0;
  height: 100% !important;

  &:hover,
  &:focus {
    border: 0;
    box-shadow: none;
  }
}
</style>
