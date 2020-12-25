<template>
  <div id="terminalContainer" class="Terminal" ref="terminalContainer" />
</template>

<script lang="ts">
import 'xterm/css/xterm.css'
import { defineComponent, reactive, toRefs, onMounted, ref, toRaw } from 'vue'

import { Terminal } from 'xterm'

export default defineComponent({
  name: 'Terminal',
  components: {},
  props: {},
  setup(props, context) {
    const terminalContainer = ref(null)
    console.log(context)
    const data = reactive({})

    onMounted(() => {
      const xterm = new Terminal()
      let ttt = document.getElementById('terminalContainer')
      xterm.open(ttt)
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>

<style></style>
