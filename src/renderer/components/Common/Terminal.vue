<template>
  <div ref="terminalContainer" class="terminal-container"></div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref, toRaw, Ref, markRaw } from 'vue'

import { Terminal } from 'xterm'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

export default defineComponent({
  name: 'Terminal',
  components: {},
  props: {},
  setup(props, context) {
    const terminalContainer: Ref<HTMLElement | null> = ref(null)
    const terminalOptions = {
      theme: {
        foreground: '#dcdfe4',
        background: '#282c34',
        cursor: '#a3b3cc',

        black: '#282c34',
        brightBlack: '#282c34',

        red: '#e06c75',
        brightRed: '#e06c75',

        green: '#98c379',
        brightGreen: '#98c379',

        yellow: '#e5c07b',
        brightYellow: '#e5c07b',

        blue: '#61afef',
        brightBlue: '#61afef',

        magenta: '#c678dd',
        brightMagenta: '#c678dd',

        cyan: '#56b6c2',
        brightCyan: '#56b6c2',

        white: '#dcdfe4',
        brightWhite: '#dcdfe4',
      },
    }
    const xterm = markRaw(new Terminal(terminalOptions))
    const xtermWebLinksAddon = new WebLinksAddon()
    const xtermFitAddon = new FitAddon()

    xterm.loadAddon(xtermWebLinksAddon)
    xterm.loadAddon(xtermFitAddon)

    onMounted(() => {
      xterm.open(terminalContainer.value as HTMLElement)
      xterm.write('Hello world.\n')
      // xterm.focus()
      xtermFitAddon.fit()
    })

    const data = reactive({
      terminalContainer,
    })

    return {
      ...toRefs(data),
      xterm,
      xtermFitAddon,
    }
  },
})
</script>

<style lang="less">
@import url('../../themes/variables');
.terminal-container {
  background-color: @app-component-background;
  // padding-left: 8px;
}
</style>
