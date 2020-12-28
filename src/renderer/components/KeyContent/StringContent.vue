<template>
  <a-textarea
    v-model:value="strResult"
    placeholder="Basic usage"
    :rows="4"
    class="string-content"
  />
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

export default defineComponent({
  name: 'StringContent',
  components: {},
  props: {
    keyName: String,
  },
  setup(props, { attrs }) {
    const { getStringKey } = useService('RedisService')
    const connectionId = inject('connectionId')
    const keyName = computed(() => props.keyName)
    const strResult = ref<string | null>('')

    const getKey = async (name: string) => {
      const id = <string>connectionId
      const result = await getStringKey(id, name)
      return result
    }
    watchEffect(async () => {
      const name = <string>toRaw(keyName.value)
      strResult.value = await getKey(name)
    })
    onMounted(() => {})

    const data = reactive({ strResult })

    return {
      ...toRefs(data),
      getKey,
    }
  },
})
</script>

<style lang="less">
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
