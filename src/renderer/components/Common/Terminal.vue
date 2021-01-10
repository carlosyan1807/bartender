<template>
  <div ref="refTerminalWrapper" class="terminal-wrapper">
      <div ref="refTerminal"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref, markRaw, onBeforeUnmount } from 'vue'

import { Terminal, ITerminalOptions } from 'xterm'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
// import 'xterm/css/xterm.css'

export default defineComponent({
  name: 'Terminal',
  components: {},
  props: {},
  setup() {
    const terminalOptions: ITerminalOptions = {
      cursorBlink: true,
      cursorStyle: 'bar',
      cursorWidth: 4,
      fontSize: 14,
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

    // const terminalSocket = new WebSocket('ws://127.0.0.1:6379')
    // const xtermAttachAddon = new AttachAddon(terminalSocket)

    // xterm.loadAddon(xtermAttachAddon)
    xterm.loadAddon(xtermWebLinksAddon)
    xterm.loadAddon(xtermFitAddon)

    const refTerminalWrapper = ref(null)
    const refTerminal = ref(null)
    const handleResize = () => {
      refTerminal.value.style.height = `${refTerminalWrapper.value.offsetHeight}px`
      xtermFitAddon.fit()
    }
    onMounted(() => {
      xterm.open((refTerminal.value as unknown) as HTMLElement)
      xterm.writeln('Hello world.')
      for (let i = 0; i < 100; i++) {
        xterm.writeln('Hello world.' + i)
      }
      handleResize()
      // xterm.focus()
    })

    onBeforeUnmount(() => {
      xterm.dispose()
    })
    const data = reactive({})

    return {
      ...toRefs(data),
      xterm,
      xtermFitAddon,
      refTerminalWrapper,
      refTerminal,
      handleResize,
    }
  },
})
</script>

<style lang="scss">
.terminal-wrapper {
  height: 100%;
  position: relative;
  padding-left: $space-medium;
}
</style>
