<template>
  <div class="monaco-editor" ref="monacoEditor" style="min-height: 300px" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, RendererElement, ref, toRefs, h } from 'vue'
import * as monaco from 'monaco-editor'

export default defineComponent({
  name: 'MonacoEditor',
  setup(props) {
    const monacoEditor = ref(null)
    
    onMounted(() => {
      monaco.editor.create(monacoEditor.value, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
        language: 'typescript',
        theme: 'vs-dark',
      })
    })

    const data = reactive({})
    return {
      ...toRefs(data),
      monacoEditor,
    }
  },
})
</script>

<style></style>
