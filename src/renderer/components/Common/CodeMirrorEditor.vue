<template>
  <div ref="refEditor" class="code-mirror-editor" />
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  ref,
  markRaw,
  computed,
  watchEffect,
} from 'vue'
import { EditorView, EditorState, basicSetup } from '@codemirror/basic-setup'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
// import CodeMirror, { Editor } from 'codemirror'
// import 'codemirror/lib/codemirror.css'
// import '/@/assets/codemirror-onedark.css'
// import 'codemirror/addon/scroll/simplescrollbars'
// import 'codemirror/addon/scroll/simplescrollbars.css'

// const CodeMirror = window.CodeMirror || CodeMirror

export default defineComponent({
  name: 'CodeMirrorEditor',
  components: {},
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    let refEditor = ref(null)
    let cmView: EditorView
    const content = computed(() => props.content)

    let cmState = markRaw(
      EditorState.create({
        doc: content.value,
        extensions: [basicSetup, json(), oneDark],
      })
    )

    onMounted(() => {
      cmView = new EditorView({
        state: cmState,
        parent: (refEditor.value as unknown) as HTMLElement,
      })

      watchEffect(() => {
        const newContent = content.value
        cmView.dispatch({ changes: { from: 0, to: cmView.state.doc.length, insert: newContent } })
      })

      // editorInstance = markRaw(CodeMirror.fromTextArea(instance.refs.refTextarea, {
      //   theme: 'one-dark',
      //   lineNumbers: true,
      //   scrollbarStyle: 'simple'
      // }))
      // editorInstance = markRaw(
      //   codemirror(<HTMLElement>refEditor.value, {
      //     // value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      //     value: content.value,
      //     lineNumbers: true,
      //     theme: 'one-dark',
      //     // scrollbarStyle: 'simple',
      //   })
      // )
      // watchEffect(() => {
      //   const value = content.value
      //   if (editorInstance) editorInstance.setValue(value)
      // })
      // editorInstance.setSize('300px', '300px')
    })

    const data = reactive({
      content,
    })

    return {
      ...toRefs(data),
      refEditor,
    }
  },
})
</script>

<style lang="scss">
.code-mirror-editor {
  height: 100%;
  font-size: $font-size-medium;

  &:focus {
    outline: none !important;
  }
  .cm-wrap:focus {
    outline: none !important;
  }
  .cm-focused {
    outline: none !important;
  }
}
</style>
