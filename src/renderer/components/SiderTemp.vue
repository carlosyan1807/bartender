<template>
  <Sider>
    <template #header>new component</template>
  </Sider>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Sider from '/@/components/Layout/Sider.vue'

export default defineComponent({
  name: 'SiderTemp',
  components: { Sider },
  props: {},
  setup() {
    const data = reactive({})

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style></style>
