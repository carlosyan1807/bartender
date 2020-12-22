<template>
  <div class="json-editor" ref="jsonEditor" style="min-height: 300px; "/>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, Ref, ref, toRefs } from 'vue'
import * as monacoEditor from 'monaco-editor'

export default defineComponent({
  name: 'JsonEditor',
  setup(props) {
    const jsonEditor: Ref<any> = ref(null)
    onMounted(() => {
      monacoEditor.editor.create(jsonEditor.value, {
        value: 'aaa',
        language: 'json',
        theme: 'vs-dark'
      })
    })

    const data = reactive({})
    return {
      ...toRefs(data),
      jsonEditor
    }
  },
})
</script>

<style></style>
