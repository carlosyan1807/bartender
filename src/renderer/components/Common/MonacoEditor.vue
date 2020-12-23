<template>
  <div class="monaco-editor" ref="monacoEditor" style="min-height: 300px" />
</template>

<script lang="ts">
// @ts-ignore
window.MonacoEnvironment = {
  getWorkerUrl: function (moduleId: any, label: string) {
    if (label === 'json') {
      return '/node_modules/monaco-editor/esm/vs/language/json/json.worker.js'
    }
  },
}
import { defineComponent, onMounted, reactive, Ref, ref, toRefs, onUnmounted } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
// import 'monaco-editor/esm/vs/editor/'
import 'monaco-editor/esm/vs/language/json/monaco.contribution'
// import 'monaco-editor/esm/vs/language/json/json.worker'

export default defineComponent({
  name: 'MonacoEditor',
  setup(props) {
    const monacoEditor = ref(null)
    let monacoInstance: monaco.editor.IStandaloneCodeEditor

    onMounted(() => {
      monacoInstance = monaco.editor.create(<any>monacoEditor.value, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
        language: 'json',
        theme: 'vs-dark',
      })
      console.log(monacoEditor)
    })

    onUnmounted(() => {
      monacoInstance.dispose()
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
