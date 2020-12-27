<template>
  <a-modal
    wrap-class-name="about-dialog"
    :visible="aboutDialogVisible"
    @cancel="handleHideAboutDialog"
  >
    <h2>
      Bartender <span class="app-version">{{ appVersion }}</span>
    </h2>
    <a-list
      class="about-list"
      :split="false"
      size="small"
      item-layout="horizontal"
      :data-source="sysInfoArray"
    >
      <template #renderItem="{ item }">
        <a-list-item :title="item.title">
          <iconfont :name="item.icon" /> {{ item.content }}
        </a-list-item>
      </template>
    </a-list>
    <template #footer>
      <a-row type="flex" justify="space-between">
        <a-col
          >© Coded & Designed with <iconfont class="heartbeating" name="heart-fill" /> by Carlos.
        </a-col>
        <a-col>
          <a @click.prevent="handleOpenGithub">
            <iconfont name="github" />
          </a>
        </a-col>
      </a-row>
    </template>
  </a-modal>
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

<style lang="less">
.about-dialog {
  padding: 0;
  .app-version {
    font-size: 12px;
  }
}
.about-list {
  .ant-list-item {
    padding: 0 !important;
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
