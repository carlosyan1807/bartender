<template>
  <el-row class="app-statusbar" type="flex" justify="space-between">
    <el-col class="statusbar-left">
      <el-space size="small">
        <el-button class="icon-button" @click="handleReload" title="重载">
          <iconfont name="reload" />
        </el-button>
        <span class="statusbar-chunk" title="当前连接数">
          <iconfont name="redis" />{{ connectionsCount }}
        </span>
      </el-space>
    </el-col>
    <el-col class="statusbar-right">
      <span v-if="keysCount !== false" class="statusbar-chunk" title="匹配数量/键总数">
        <iconfont name="key" />{{ keysCount }}
      </span>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useIpc } from '/@/hooks'

export default defineComponent({
  name: 'StatusBar',
  setup() {
    const { state } = useStore()
    const connectionsCount = computed(
      () =>
        state.hub.connections.filter(
          (e: { id: string; isTrying: boolean }) =>
            e.id !== 'quick-connect' && e.id !== 'settings' && !e.isTrying
        ).length
    )
    const keysCount = computed(() => {
      const found = state.hub.connections.find(
        (e: { id: string }) =>
          e.id === state.hub.activedTab && e.id !== 'quick-connect' && e.id !== 'settings'
      )
      if (found) return found.keysCount
      else return false
    })
    const handleReload = () => {
      useIpc().send('renderer2main', 'reload')
    }
    const data = reactive({
      connectionsCount,
      keysCount,
    })
    return {
      ...toRefs(data),
      handleReload,
    }
  },
})
</script>

<style lang="scss">
// @import url('../../themes/variables');

.app-statusbar {
  height: $app-statusbar-height;
  font-size: $font-size-small;
  line-height: $app-statusbar-height;
  color: $text-color;

  .statusbar-chunk {
    .iconfont {
      font-size: $font-size-medium;
      margin-right: $space-extra-small;
    }
  }
  // .statusbar-label > span::before {
  //   content: ':';
  //   position: relative;
  //   margin: 0 2px 0 0;
  // }
  .statusbar-right {
    margin: 0 $space-small;
  }
  .icon-button.el-button {
    line-height: $app-statusbar-height;
    height: $app-statusbar-height;
    background-color: $app-background;
  }
}
</style>
