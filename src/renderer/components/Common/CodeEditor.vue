<template>
  <div ref="codemirror">new component</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import createEdit, { Editor } from 'codemirror'

export default defineComponent({
  name: '',
  components: {},
  props: {},
  setup(props) {
    onMounted(()=> {})

    const data = reactive({})

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style>

</style>