<template>
  <div>KeyContentSet</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'KeyContentSet',
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
