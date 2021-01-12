<template>
  <el-dialog
    custom-class="about-dialog"
    :model-value="aboutDialogVisible"
    :append-to-body="true"
    @close="handleHideAboutDialog"
  >
    <template #title>
      Bartender <span class="app-version">{{ appVersion }}</span>
    </template>
    <el-space class="about-version" direction="vertical" alignment="left">
      <span v-for="(item, index) in sysInfoArray" :key="index" :title="item.title">
        <iconfont :name="item.icon" /> {{ item.content }}
      </span>
    </el-space>
    <template #footer>
      <el-row type="flex" justify="space-between">
        <el-col :span="20" class="about-copyright">
          <span
            >© Coded & Designed with <iconfont class="heartbeating" name="heart-fill" /> by
            Carlos.</span
          >
        </el-col>
        <el-col :span="4" class="about-github">
          <el-link :underline="false" @click.prevent="handleOpenGithub">
            <iconfont name="github" />
          </el-link>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, toRefs, Ref, ref } from 'vue'
import { useStore } from 'vuex'

import { useService, useShell } from '/@/hooks'

export default defineComponent({
  name: 'AboutDialog',
  setup() {
    const { state, commit } = useStore()
    const { openExternal } = useShell()
    const { getBasicInformation } = useService('BaseService')

    const aboutDialogVisible = computed(() => state.app.aboutDialogVisible)
    const sysInfoArray: Ref<{ title: string; icon?: string; content: string }[]> = ref([])
    const appVersion = ref('')
    const handleHideAboutDialog = () => {
      console.log('close')
      commit('updateAboutDialogVisiable', false)
    }

    const handleOpenGithub = () => {
      openExternal('http://github.com/unclecarlos/bartender')
    }

    const getSysInfo = async () => {
      const { app, electron, os, chrome, nodejs, v8 } = await getBasicInformation()
      sysInfoArray.value.push({
        title: '操作系统',
        icon: os.type === 'Linux' ? 'linux' : os.type === 'Darwin' ? 'apple' : 'windows',
        content: `${os.type}-${os.arch} ${os.release}`,
      })
      sysInfoArray.value.push({ title: 'Electron', icon: 'electron', content: electron })
      sysInfoArray.value.push({ title: 'NodeJS', icon: 'nodejs', content: nodejs })
      sysInfoArray.value.push({ title: 'V8', icon: 'v8', content: v8 })
      sysInfoArray.value.push({ title: 'Chrome', icon: 'chrome', content: chrome })
      if (process.env.NODE_ENV === 'production') appVersion.value = 'v' + app
    }

    onMounted(getSysInfo)

    const data = reactive({
      aboutDialogVisible,
      sysInfoArray,
      appVersion,
    })

    return {
      ...toRefs(data),
      handleHideAboutDialog,
      handleOpenGithub,
    }
  },
})
</script>

<style lang="scss">
.about-dialog {
  .el-dialog__header {
    color: $text-color-highlight;
    font-size: $font-size-large;
  }
  .app-version {
    font-size: $font-size-small;
  }
  .about-version {
    font-size: $font-size-small;
    padding-left: $space-extra-large;
  }
  .el-dialog__footer {
    font-size: $font-size-small;
    line-height: $font-size-small;

    .about-copyright {
      text-align: left;
      line-height: $font-size-large;
    }
    .about-github {
      text-align: right;
      .iconfont {
        font-size: $font-size-large;
      }
    }
  }
}

.heartbeating {
  color: #e06c75 !important;
  -webkit-animation: heartbeating 2s ease infinite;
  animation: heartbeating 2s ease infinite;
}
@keyframes heartbeating {
  0% {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }
  20% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  40% {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }
  60% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  80% {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }
  100% {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }
}
</style>
