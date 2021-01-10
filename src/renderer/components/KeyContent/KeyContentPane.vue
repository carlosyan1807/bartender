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

<style lang="scss">
.key-content-table-wrapper {
  height: 100%;
  // border: 1px solid $border-color-base;
  margin-right: $space-extra-small;
}
</style>
