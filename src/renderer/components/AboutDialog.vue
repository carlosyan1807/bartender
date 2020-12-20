<template>
  <a-modal :visible="aboutDialogVisible" @cancel="handleHideAboutDialog" :footer="null" :closable="false">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AboutDialog',
  setup() {
    const store = useStore()

    const aboutDialogVisible = computed(() => store.state.app.aboutDialogVisible)

    const handleHideAboutDialog = () => {
      store.commit('UPDATE_ABOUT_DIALOG_VISIBLE', false)
    }
    const data = reactive({
      aboutDialogVisible,
    })

    return {
      ...toRefs(data),
      handleHideAboutDialog,
    }
  },
}
</script>

<style></style>
