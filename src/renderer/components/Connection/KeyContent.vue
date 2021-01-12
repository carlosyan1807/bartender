<template>
  <div class="key-content">
    <component :is="contentComponent" :key-name="keyName" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import ContentString from '/@/components/Connection/KeyContent/String.vue'
import ContentHash from '/@/components/Connection/KeyContent/Hash.vue'
import ContentList from '/@/components/Connection/KeyContent/List.vue'
import ContentSet from '/@/components/Connection/KeyContent/Set.vue'
import ContentZset from '/@/components/Connection/KeyContent/ZSet.vue'

export default defineComponent({
  name: 'KeyContent',
  components: { ContentString, ContentHash, ContentList, ContentSet, ContentZset },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(props) {
    const contentComponent = computed(() => {
      switch (props.item?.type) {
        case 'string':
          return ContentString
        case 'hash':
          return ContentHash
        case 'list':
          return ContentList
        case 'set':
          return ContentSet
        case 'zset':
          return ContentZset
        default:
          return undefined
      }
    })
    const keyName = computed(() => props.item.name)

    const data = reactive({ keyName })
    return {
      ...toRefs(data),
      contentComponent,
    }
  },
})
</script>

<style lang="scss">
.key-content {
  height: 100%;
}
</style>
