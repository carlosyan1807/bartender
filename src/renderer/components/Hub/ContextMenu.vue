<template>
  <a-menu class="context-menu">
    <a-menu-item key="0" title="" @click="handleClose">
      <span>关闭</span>
    </a-menu-item>
    <a-menu-item key="1" title="">
      <span>关闭其他</span>
    </a-menu-item>
    <a-menu-item key="3" title="">
      <span>全部关闭</span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ContextMenu',
  props: {
    itemId: String,
  },
  setup(props) {
    const { commit } = useStore()

    const handleClose = () => {
      if (props.itemId === 'settings') commit('showHubSettings', false)
      commit('removeHubItem', { id: props.itemId })
    }

    const data = reactive({})
    return {
      ...toRefs(data),
      handleClose,
    }
  },
})
</script>

<style></style>
