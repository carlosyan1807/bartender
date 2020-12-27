<template>
  <component :is="contentComponent" :key-name="keyName" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref, computed, h, watchEffect } from 'vue'
import StringContent from '/@/components/KeyContent/StringContent.vue'

export default defineComponent({
  name: 'KeyContent',
  components: { StringContent },
  props: {
    item: Object,
    default: () => {
      return {}
    },
  },
  setup(props) {
    const contentComponent = computed(() => {
      switch (props.item?.type) {
        case 'string':
          return StringContent
          break
        default:
          return undefined
      }
    })
    const keyName = computed(() => props.item.name)

    onMounted(() => {})
    const data = reactive({ keyName })
    return {
      ...toRefs(data),
      contentComponent,
    }
  },
})
</script>

<style></style>
