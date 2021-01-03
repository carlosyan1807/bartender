<template>
  <div ref="editor" class="code-editor" />
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  ref,
  Ref,
  onBeforeUnmount,
  markRaw,
} from 'vue'
import codemirror, { Editor } from 'codemirror'
import 'codemirror/lib/codemirror.css'
import '/@/assets/codemirror-onedark.css'
// import 'codemirror/addon/scroll/simplescrollbars'
// import 'codemirror/addon/scroll/simplescrollbars.css'
const CodeMirror = window.CodeMirror || codemirror

export default defineComponent({
  name: 'CodeEditor',
  components: {},
  props: {},
  setup(props, context) {
    let refEditor: Ref<HTMLElement | null> = ref(null)
    let editor
    onMounted(() => {
      editor = markRaw(
        codemirror(<HTMLElement>refEditor.value, {
          value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
          lineNumbers: true,
          theme: 'one-dark',
          // scrollbarStyle: 'simple',
        })
      )
      editor.setSize('300px', '300px')
    })

    const data = reactive({})

    return {
      ...toRefs(data),
      refEditor,
    }
  },
})
</script>

<style lang="less">
@import url('../../themes/variables');

.code-editor {
  border: 1px solid @border-color-split;
}
</style>
