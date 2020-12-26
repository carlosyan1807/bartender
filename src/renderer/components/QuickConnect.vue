<template>
  <div class="quick-connect-container">
    <a-button @click="connectRedis({ port: 6379 })" type="primary">连接6379</a-button>
    <a-button @click="connectRedis({ port: 6380 })">连接6380</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'QuickConnect',

  setup(props, { emit }) {
    let redisClients = reactive({})

    const connectRedis = (options: { host?: string; port?: number | string }) => {
      emit('newConnection', options)
    }
    const data = reactive({})
    return {
      ...toRefs(data),
      connectRedis,
    }
  },
})
</script>

<style>
.quick-connect-container {
  padding: 16px;
}
</style>
