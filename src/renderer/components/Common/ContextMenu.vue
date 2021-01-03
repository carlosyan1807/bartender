<template>
  <a-menu class="context-menu">
    <template v-for="(item, index) in menuItems" :key="index">
      <a-menu-item title="" @click="item.func(itemId)">
        <span>{{ item.label }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'ContextMenu',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
    itemId: String,
  },
  setup(props) {
    const menuItems = computed(() => props.items)
    const itemId = computed(() => props.itemId)

    const data = reactive({
      menuItems,
      itemId,
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>

<style></style>
