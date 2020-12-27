<template>
  <div class="monaco-editor" ref="refMonaco" style="min-height: 300px" />
</template>

<script lang="ts">
// const monacoDir = new URL('monaco/', import.meta.url);
// // @ts-ignore
// self.MonacoEnvironment = {
//   getWorkerUrl: function (moduleId, label) {
//     if (label === 'json') {
//       return `${monacoDir}json.worker.js`
//     }
//     if (label === 'css') {
//       return `${monacoDir}css.worker.js`
//     }
//     if (label === 'html') {
//       return `${monacoDir}html.worker.js`
//     }
//     if (label === 'typescript' || label === 'javascript') {
//       return `${monacoDir}ts.worker.js`
//     }
//     return `${monacoDir}editor.worker.js`
//   },
// }

import { defineComponent, onMounted, reactive, Ref, ref, toRefs, onUnmounted, markRaw } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

export default defineComponent({
  name: 'MonacoEditor',
  setup(props) {
    const refMonaco: Ref<HTMLElement | null> = ref(null)
    let monacoInstance: monaco.editor.IStandaloneCodeEditor
    onMounted(() => {
      monacoInstance = markRaw(
        monaco.editor.create(<HTMLElement>refMonaco.value, {
          value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
          language: 'json',
          theme: 'vs-dark',
        })
      )
      console.log(monacoInstance)

    })

    onUnmounted(() => {
      monacoInstance.dispose()
    })
    const data = reactive({})
    return {
      ...toRefs(data),
      refMonaco,
    }
  },
})
</script>

<style></style>
