<template>
  <pane size="20" min-size="20" v-if="siderVisiable">
    <a-layout class="app-sider">123 </a-layout>
  </pane>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed, watchEffect } from 'vue'
import { Pane } from 'splitpanes'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Sider',
  components: { Pane },
  props: {},
  setup(props) {
    const { state } = useStore()
    const siderVisiable = computed(() => !!state.app.activedNavMenuItem)
    
    onMounted(() => {})

    const data = reactive({
      siderVisiable,
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style></style>
