<template>
  <div>
    <a-button @click="connectRedis({ port: 6379 })" type="primary">连接6379</a-button>
    <a-button @click="connectRedis({ port: 6380 })">连接6380</a-button>
  </div>
</template>

<script>
export default {
  name: 'QuickConnect',
  setup(props, { emit }) {
    const connectRedis = (options) => {
      emit('newConnection', options)
    }

    return {
      connectRedis,
    }
  },
}
</script>

<style></style>
