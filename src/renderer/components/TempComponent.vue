<template>
  <Sider>
    <template #header>new component</template>
  </Sider>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import Sider from '/@/components/Layout/Sider.vue'

export default defineComponent({
  name: 'TempComponent',
  components: { Sider },
  props: {},
  setup(props) {
    onMounted(() => {})

    const data = reactive({})

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style></style>
