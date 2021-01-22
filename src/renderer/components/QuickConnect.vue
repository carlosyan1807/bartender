<template>
  <div class="quick-connect-container">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="16" :md="12" :lg="8">
        <el-form
          :model="formQuickConnect"
          layout="horizontal"
          label-position="right"
          label-width="auto"
          label-suffix=":"
          size="small"
        >
          <el-form-item label="Host">
            <el-input v-model:value="formQuickConnect.host" />
          </el-form-item>
          <el-form-item label="Port">
            <el-input v-model:value="formQuickConnect.port" />
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model:value="formQuickConnect.password" />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="handleSubmitConnect" :loading="isLoading">
              连接
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    test
    <el-button @click="handleSubmitConnect({ port: 6379 })">6379</el-button>
    <el-button @click="handleSubmitConnect({ port: 6380 })">6380</el-button>
    <el-button @click="handleSubmitConnect({ port: 6381 })">连接错误提示6381</el-button>
    <el-button @click="consoleListConnections">listConnections</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useIpc, useService } from '/@/hooks'
export default defineComponent({
  name: 'QuickConnect',

  setup() {
    const { createConnection, listConnections } = useService('RedisService')
    // const $notification: any = inject('$notification')
    const formQuickConnect = reactive({
      host: '',
      port: '',
      password: '',
    })
    const isLoading = ref(false)
    const handleSubmitConnect = async (options: {
      host?: string
      port?: number | string
      password?: string
    }) => {
      isLoading.value = true
      const payload = {
        host: options.host || formQuickConnect.host || 'localhost',
        port: options.port || formQuickConnect.port || 6379,
        password: options.password || formQuickConnect.password || null,
      }
      const res = await createConnection(payload)
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
        const found = state.hub.connections.find((e: { id: string }) => e.id === watchId.value)
        if (found && found.status === 'end') {
          const description = found.log.slice(-1)[0]
          // $notification.error({
          //   key: id,
          //   message: 'Connect Failed.',
          //   description: String(description.content.message),
          //   placement: 'bottomRight',
          // })
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
    const consoleListConnections = () => {
      listConnections()
    }

    const data = reactive({
      formQuickConnect,
      isLoading,
    })
    return {
      ...toRefs(data),
      handleSubmitConnect,
      consoleListConnections,
    }
  },
})
</script>

<style lang="scss">
.quick-connect-container {
  padding: $space-large;
}
</style>
