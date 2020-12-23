<template>
  <div>settings</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'

export default defineComponent({
  name: 'Settings',
  components: {},
  props: {},
  setup(props) {
    const data = reactive({})

    onMounted(()=> {})
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style>

</style>