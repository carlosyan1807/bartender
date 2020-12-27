<template>
  <a-textarea v-model:value="strResult" placeholder="Basic usage" :rows="4" />
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
    const strResult = ref('')

    const getKey = async (name: string) => {
      const result = await getStringKey({ id: connectionId, name })
      return result
    }
    watchEffect(async () => strResult.value = await getKey(toRaw(keyName.value)))
    onMounted(() => {})

    const data = reactive({ strResult })

    return {
      ...toRefs(data),
      getKey,
    }
  },
})
</script>

<style></style>
