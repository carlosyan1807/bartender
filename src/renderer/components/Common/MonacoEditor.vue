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

import {
  defineComponent,
  onMounted,
  reactive,
  Ref,
  ref,
  toRefs,
  onUnmounted,
  markRaw,
  computed,
  watchEffect,
  inject,
} from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MonacoEditor',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const refMonaco: Ref<HTMLElement | null> = ref(null)
    let monacoInstance: monaco.editor.IStandaloneCodeEditor

    const content = computed(() => props.content)
    const { commit } = useStore()
    const connectionId = inject('connectionId')
    watchEffect(() => {
      const value = content.value
      if (monacoInstance) monacoInstance.setValue(value)
    })
    onMounted(() => {
      monacoInstance = markRaw(
        monaco.editor.create(<HTMLElement>refMonaco.value, {
          // model: null,
          value: content.value,
          language: 'json',
          theme: 'vs-dark',
        })
      )
      monacoInstance.onDidChangeCursorPosition((e) => {
        commit('updateConnectionEditorCursorPosition', {
          id: connectionId,
          cursorPosition: { column: e.position.column, lineNumber: e.position.lineNumber },
        })
      })
    })

    onUnmounted(() => {
      monacoInstance.dispose()
    })
    const data = reactive({
      content,
    })
    return {
      ...toRefs(data),
      refMonaco,
    }
  },
})
</script>

<style></style>
