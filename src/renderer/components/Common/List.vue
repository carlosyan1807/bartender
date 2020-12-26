<template>
  <a-list :data-source="listData" :height="50">
    <template #renderItem="{ item }">
      <a-list-item>
        {{ item.title }}
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'

export default defineComponent({
  name: 'List',
  components: {},
  props: {
    listData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props) {
    const listData = reactive(props.listData)
    console.log(listData)
    onMounted(() => {})

    const data = reactive({
      listData
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style></style>
