<template>
  <svg class="iconfont" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'Iconfont',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const data = reactive({
      iconName: `#icon-${props.name}`,
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style>
.iconfont {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
