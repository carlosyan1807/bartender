<template>
  <div class="app-title-bar">
    <div class="drag-region">
      <div class="window-appicon" />
      <div class="window-title">
        <span>{{ appName }}</span>
      </div>
      <div class="window-actions">
        <div class="min-button" @click="handleWindowAction('min')">
          <img
            class="icon"
            srcset="
              /assets/window-actions/min-w-10.png 1x,
              /assets/window-actions/min-w-12.png 1.25x,
              /assets/window-actions/min-w-15.png 1.5x,
              /assets/window-actions/min-w-15.png 1.75x,
              /assets/window-actions/min-w-20.png 2x,
              /assets/window-actions/min-w-20.png 2.25x,
              /assets/window-actions/min-w-24.png 2.5x,
              /assets/window-actions/min-w-30.png 3x,
              /assets/window-actions/min-w-30.png 3.5x
            "
            draggable="false"
          />
        </div>
        <div class="max-button" @click="handleWindowAction('max')">
          <img
            class="icon"
            srcset="
              /assets/window-actions/max-w-10.png 1x,
              /assets/window-actions/max-w-12.png 1.25x,
              /assets/window-actions/max-w-15.png 1.5x,
              /assets/window-actions/max-w-15.png 1.75x,
              /assets/window-actions/max-w-20.png 2x,
              /assets/window-actions/max-w-20.png 2.25x,
              /assets/window-actions/max-w-24.png 2.5x,
              /assets/window-actions/max-w-30.png 3x,
              /assets/window-actions/max-w-30.png 3.5x
            "
            draggable="false"
          />
        </div>
        <div class="restore-button" @click="handleWindowAction('max')">
          <img
            class="icon"
            srcset="
              /assets/window-actions/restore-w-10.png 1x,
              /assets/window-actions/restore-w-12.png 1.25x,
              /assets/window-actions/restore-w-15.png 1.5x,
              /assets/window-actions/restore-w-15.png 1.75x,
              /assets/window-actions/restore-w-20.png 2x,
              /assets/window-actions/restore-w-20.png 2.25x,
              /assets/window-actions/restore-w-24.png 2.5x,
              /assets/window-actions/restore-w-30.png 3x,
              /assets/window-actions/restore-w-30.png 3.5x
            "
            draggable="false"
          />
        </div>
        <div class="close-button" @click="handleWindowAction('close')">
          <img
            class="icon"
            srcset="
              /assets/window-actions/close-w-10.png 1x,
              /assets/window-actions/close-w-12.png 1.25x,
              /assets/window-actions/close-w-15.png 1.5x,
              /assets/window-actions/close-w-15.png 1.75x,
              /assets/window-actions/close-w-20.png 2x,
              /assets/window-actions/close-w-20.png 2.25x,
              /assets/window-actions/close-w-24.png 2.5x,
              /assets/window-actions/close-w-30.png 3x,
              /assets/window-actions/close-w-30.png 3.5x
            "
            draggable="false"
          />
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

    // 窗口控制
    const handleWindowAction = (action) => {
      emit('window-action', action)
    }

    return {
      appName,
      handleWindowAction,
    }
  },
})
</script>
