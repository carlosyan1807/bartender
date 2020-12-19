<template>
  <svg class="anticon icon" aria-hidden="true">
    <use :xlink:href="state.iconName" />
  </svg>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'Iconfont',
  props: {
    name: String,
  },
  setup(props) {
    const state = reactive({
      iconName: `#icon-${props.name}`,
    })
    return {
      state,
    }
  },
})
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.2em;
  fill: currentColor;
  overflow: hidden;
}
</style>
