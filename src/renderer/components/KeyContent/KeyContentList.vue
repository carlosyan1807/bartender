<template>
  <div>KeyContentList{{ keyMembers }}</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, reactive, toRefs, watchEffect } from 'vue'
import { useService } from '/@/hooks'

export default defineComponent({
  name: 'KeyContentList',
  components: {},
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
    const keyMembers: string[] = reactive([])

    const getKey = async (name: string) => {
      const id = connectionId
      const result = await getListKey(id, name)
      return result
    }
    watchEffect(async () => {
      const _key = keyName.value
      const result = await getKey(_key)
      if (result && result.length > 0) keyMembers.splice(0, keyMembers.length, ...result)
    })

    const data = reactive({
      keyMembers,
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>

<style></style>
