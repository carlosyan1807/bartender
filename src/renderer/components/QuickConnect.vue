<template>
  <div class="quick-connect-container">
    <a-row type="flex" justify="center">
      <a-col>
        <a-form
          :model="formQuickConnect"
          layout="horizontal"
          label-align="right"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-form-item label="Host">
            <a-input v-model:value="formQuickConnect.host" />
          </a-form-item>
          <a-form-item label="Port">
            <a-input v-model:value="formQuickConnect.port" />
          </a-form-item>
          <a-form-item label="Password">
            <a-input v-model:value="formQuickConnect.password" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 16, offset: 8 }">
            <a-button type="primary" @click="handleSubmitConnect" :loading="isLoading"
              >连接</a-button
            >
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    test
    <a-button @click="handleSubmitConnect({ port: 6379 })">6379</a-button>
    <a-button @click="handleSubmitConnect({ port: 6380 })">6380</a-button>
    <a-button @click="handleSubmitConnect({ port: 6381 })">连接错误提示6381</a-button>
    <a-button @click="consoleListConnections">listConnections</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive, ref, toRaw, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useIpc, useService } from '/@/hooks'

export default defineComponent({
  name: 'QuickConnect',

  setup(props, { emit }) {
    const { createConnection, listConnections } = useService('RedisService')
    const $notification: any = inject('$notification')
    const formQuickConnect = reactive({
      host: '',
      port: '',
      password: '',
    })

    const isLoading = ref(false)
    const handleSubmitConnect = async (options: {
      host?: string
      port?: number | string
      password: string
    }) => {
      isLoading.value = true
      const payload = {
        host: options.host || formQuickConnect.host || 'localhost',
        port: options.port || formQuickConnect.port || '6379',
        password: options.password || formQuickConnect.password || '',
      }
      const res = await createConnection(<any>payload)
      // emit('newConnection', payload)
    }
    const { state, commit } = useStore()
    let watchId = ref('')
    let stopWatchConnection = watchEffect(() => {})

    useIpc().on('trying2Connect', (event, connection) => {
      const { id, options } = connection
      watchId.value = id
      commit('updateConnectionStatus', { id, options, isTrying: true })
      stopWatchConnection = watchEffect(() => {
        const found = state.hub.connections.find((e: any) => e.id === watchId.value)
        if (found && found.status === 'end') {
          const description = found.log.slice(-1)[0]
          $notification.error({
            key: id,
            message: 'Connect Failed.',
            description: String(description.content.message),
            placement: 'bottomRight',
          })
          commit('removeConnection', { id })
          isLoading.value = false
        } else if (found && found.status === 'ready') {
          // isLoading.value = false
          commit('updateConnectionStatus', { id, options, status: 'ready' })
          commit('updateHubActivedTab', connection.id)
          // emit('newConnection', { id, options })
          isLoading.value = false
        }

        stopWatchConnection()
      })
    })
    const consoleListConnections = () =>{
      listConnections()
    }
    const data = reactive({
      formQuickConnect,
      isLoading,
    })
    return {
      ...toRefs(data),
      handleSubmitConnect,
      consoleListConnections
    }
  },
})
</script>

<style>
.quick-connect-container {
  padding: 16px;
}
</style>
