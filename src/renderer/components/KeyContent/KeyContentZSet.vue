<template>
  <div>KeyContentZSet</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'KeyContentZSet',
  components: {},
  props: {},
  setup(props) {
    const data = reactive({})

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style></style>
