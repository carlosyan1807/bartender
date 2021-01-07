<template>
  <splitpanes :push-other-panes="false">
    <pane size="30">
      <div class="key-content-table-wrapper">
        <slot name="keyTable"></slot>
      </div>
    </pane>
    <pane size="70">
      <slot></slot>
    </pane>
  </splitpanes>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'

export default defineComponent({
  name: 'KeyContentPane',
  components: { Splitpanes, Pane },
  props: {},
  setup() {
    const data = reactive({})

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style></style>
