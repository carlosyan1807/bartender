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

<script>
import { useStore } from 'vuex'

export default {
  name: 'ContextMenu',
  props: {
    itemId: String,
  },
  setup(props) {
    const store = useStore()

    const handleClose = () => {
      if(props.itemId === 'settings') store.commit('showHubSettings', false)
      store.commit('removeHubItem', { id: props.itemId })
    }
    return {
      handleClose,
    }
  },
}
</script>

<style></style>
