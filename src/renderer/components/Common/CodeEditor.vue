<template>
  <div ref="editor" class="code-editor" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref, Ref, onBeforeUnmount } from 'vue'
import codemirror, { Editor } from 'codemirror'
import 'codemirror/lib/codemirror.css'
import '/@/assets/codemirror-onedark.css'
// import 'codemirror/addon/scroll/simplescrollbars'
// import 'codemirror/addon/scroll/simplescrollbars.css'

export default defineComponent({
  name: 'CodeEditor',
  components: {},
  props: {},
  setup(props, context) {
    let editor: Ref<Editor | null> = ref(null)

    onMounted(() => {
      codemirror((editor.value as unknown) as HTMLElement, {
        lineNumbers: true,
        theme: 'one-dark',
        // scrollbarStyle: 'simple',
      })
    })
    onBeforeUnmount(()=> {

    })
    const data = reactive({})

    return {
      ...toRefs(data),
      editor,
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
