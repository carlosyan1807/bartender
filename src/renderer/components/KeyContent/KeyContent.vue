<template>
  <div class="key-content">
    <component :is="contentComponent" :key-name="keyName" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import ContentString from '/@/components/KeyContent/KeyContentString.vue'
import ContentHash from '/@/components/KeyContent/KeyContentHash.vue'
import ContentList from '/@/components/KeyContent/KeyContentList.vue'
import ContentSet from '/@/components/KeyContent/KeyContentSet.vue'
import ContentZset from '/@/components/KeyContent/KeyContentZset.vue'

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
