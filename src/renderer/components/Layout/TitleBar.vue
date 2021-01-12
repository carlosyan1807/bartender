<template>
  <div class="app-title-bar" :class="isFocus ? 'is-focus' : 'is-blur'">
    <div class="drag-region">
      <div class="window-appicon" />
      <div class="window-title">
        <span>{{ `${appName} ${appVersion}` }}</span>
      </div>
      <div class="window-actions">
        <div class="min-button" @click="handleWindowAction('window-min')">
          <iconfont name="win-minimize" />
        </div>
        <div v-if="!isMaximized" class="max-button" @click="handleWindowAction('window-max')">
          <iconfont name="win-maximize" />
        </div>
        <div v-if="isMaximized" class="restore-button" @click="handleWindowAction('window-max')">
          <iconfont name="win-restore" />
        </div>
        <div class="close-button" @click="handleWindowAction('app-exit')">
          <iconfont name="win-close" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useIpc, useService } from '/@/hooks'

// TODO: 失去焦点时的背景色和字体颜色变更

export default defineComponent({
  name: 'TitleBar',
  setup() {
    const { getBasicInformation } = useService('BaseService')
    const appName = ref('Bartender')
    const appVersion = ref('')
    const exitConfirmVisiable = ref(false)
    const isFocus = ref(true)
    const isMaximized = ref(false)

    // 获取版本信息
    const fetchAppVersion = async () => {
      const { app } = await getBasicInformation()
      appVersion.value = 'v' + app
    }
    if (process.env.NODE_ENV === 'production') fetchAppVersion()

    // 窗口控制
    const handleWindowAction = (action: string) => {
      useIpc().send('renderer2main', action)
    }

    useIpc().on('updateWindowStatus', (event, result) => {
      if (result.isFocus !== undefined) isFocus.value = result.isFocus
      if (result.isMaximized !== undefined) isMaximized.value = result.isMaximized
    })

    const data = reactive({
      appName,
      appVersion,
      exitConfirmVisiable,
      isFocus,
      isMaximized,
    })

    return {
      ...toRefs(data),
      handleWindowAction,
    }
  },
})
</script>

<style lang="scss">
.app-title-bar {
  // display: block;
  // position: fixed;
  width: 100%;
  height: $app-titlebar-height;
  // overflow: hidden;

  &.is-blur {
    background-color: $app-background;
  }
  &.is-focus {
    background-color: $component-background;
  }

  .drag-region {
    width: 100%;
    height: 100%;
    -webkit-app-region: drag;
    display: grid;
    grid-template-columns: 35px auto 138px;
  }

  .window-appicon {
    grid-column: 1;
    width: 35px;
    // height: 100%;
    // height: @app-titlebar-height;
    position: relative;
    z-index: 1000;
    background-image: url('../../assets/app-icon.png');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: $font-size-base;
    flex-shrink: 0;
  }

  .window-title {
    grid-column: 2;
    display: flex;
    justify-content: center;
    overflow: hidden;
    font-size: $font-size-small;
    color: $text-color;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: $app-titlebar-height;
    }
  }

  .window-actions {
    user-select: none;
    -webkit-app-region: no-drag;
    display: grid;
    grid-template-columns: repeat(3, 46px);
    position: absolute;
    top: 0;
    right: 0;
    // height: 100%;
    height: $app-titlebar-height;

    .min-button,
    .max-button,
    .restore-button,
    .close-button {
      grid-row: 1 / span 1;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .min-button {
      grid-column: 1;
    }
    .max-button,
    .restore-button {
      grid-column: 2;
    }
    .close-button {
      grid-column: 3;
    }

    .min-button:hover,
    .max-button:hover,
    .restore-button:hover {
      background: lighten($component-background, 4%);
    }
    .min-button:active,
    .max-button:active,
    .restore-button:hover {
      background: lighten($component-background, 8%);
    }

    .close-button:hover {
      background: $app-close-button-hover;
      .iconfont {
        color: $text-color-highlight;
      }
    }
    .close-button:active {
      background: $app-close-button-active;
      .iconfont {
        color: $text-color-highlight;
        filter: invert(1);
      }
    }
    .iconfont {
      color: $text-color;
      font-size: $font-size;
    }
  }

  // @media (-webkit-device-pixel-ratio: 1.5),
  //   (device-pixel-ratio: 1.5),
  //   (-webkit-device-pixel-ratio: 2),
  //   (device-pixel-ratio: 2),
  //   (-webkit-device-pixel-ratio: 3),
  //   (device-pixel-ratio: 3) {
  //   .window-actions .icon {
  //     width: 10px;
  //     height: 10px;
  //   }
  // }
}

// .restore-button {
//   display: none !important;
// }
// .maximized {
//   .restore-button {
//     display: flex !important;
//   }
//   .max-button {
//     display: none;
//   }
// }
</style>
