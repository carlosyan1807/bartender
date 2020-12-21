<template>
  <a-modal
    wraplClassName="about-dialog"
    :visible="aboutDialogVisible"
    @cancel="handleHideAboutDialog"
  >
    <a-list
      class="about-list"
      :split="false"
      size="small"
      item-layout="horizontal"
      :data-source="sysInfoArray"
    >
      <template #renderItem="{ item }">
        <a-list-item :title="item.title"> <iconfont :name="item.icon" /> {{ item.content }} </a-list-item>
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

<script>
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

import { useService, useShell } from '/@/hooks'

export default {
  name: 'AboutDialog',
  setup() {
    const store = useStore()
    const { openExternal } = useShell()
    const aboutDialogVisible = computed(() => store.state.app.aboutDialogVisible)

    const handleHideAboutDialog = () => {
      store.commit('UPDATE_ABOUT_DIALOG_VISIBLE', false)
    }
    const { getBasicInformation } = useService('BaseService')

    const sysInfoArray = reactive([])
    getBasicInformation().then(({ electron, os, chrome, nodejs }) => {
      sysInfoArray.push({
        title: '操作系统',
        icon: os.type === 'Linux' ? 'linux' : os.type === 'Darwin' ? 'apple' : 'windows',
        content: `${os.type}-${os.arch} ${os.release}`,
      })
      sysInfoArray.push({ title: 'Electron', icon: 'electron', content: electron })
      sysInfoArray.push({ title: 'NodeJS', icon: 'nodejs', content: nodejs.version })
      sysInfoArray.push({ title: 'Chrome', icon: 'chrome', content: chrome })
    })

    const handleOpenGithub = () => {
      openExternal('http://github.com/unclecarlos/bartender')
    }
    const data = reactive({
      aboutDialogVisible,
      sysInfoArray,
    })

    return {
      ...toRefs(data),
      handleHideAboutDialog,
      handleOpenGithub,
    }
  },
}
</script>

<style lang="less">
.about-dialog {
  padding: 0;
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
