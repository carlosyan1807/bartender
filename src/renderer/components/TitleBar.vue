<template>
  <div class="app-title-bar">
    <div class="drag-region">
      <div class="window-appicon" />
      <div class="window-title">
        <span>{{ state.appName }}</span>
      </div>
      <div class="window-actions">
        <div class="min-button" @click="handleWindowAction('min')">
          <iconfont name="win-minimize" />
        </div>
        <div class="max-button" @click="handleWindowAction('max')">
          <iconfont name="win-maximize" />
        </div>
        <div class="restore-button" @click="handleWindowAction('max')">
          <iconfont name="win-restore" />
        </div>
        <div class="close-button" @click="handleWindowAction('close')">
          <iconfont name="win-close" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

// TODO: 失去焦点时的背景色和字体颜色变更

export default defineComponent({
  name: 'TitleBar',
  props: {
    appName: String,
  },
  setup(props, { emit }) {
    const appName = props.appName

    const state = reactive({
      appName,
    })
    // 窗口控制
    const handleWindowAction = (action) => {
      emit('window-action', action)
    }

    return {
      state,
      handleWindowAction,
    }
  },
})
</script>
