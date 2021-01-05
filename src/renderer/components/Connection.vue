<template>
  <div class="connection-container">
    <div class="connection-header">
      <div class="connection-header-left">
        <el-space>
          <el-input v-model="keySearchPatterns" size="small" :clearable="true">
            <template #prefix><iconfont name="search" /></template>
            <template #append>
              <iconfont name="reload" @click="fetchKeys" />
            </template>
          </el-input>
          <el-button size="mini"><iconfont name="plus" /></el-button>
        </el-space>
      </div>
      <div class="connection-header-right">
        <el-space>
          <el-select v-model="dbSelected" style="width: 80px" size="small" @change="handleChangeDb">
            <template #prefix><iconfont name="redis-db" /></template>
            <el-option
              v-for="item in dbItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button size="small" class="icon-button" @click="showConsole = !showConsole">
            <iconfont name="console" />
          </el-button>
        </el-space>
      </div>
    </div>
    <div class="connection-main">
      <splitpanes horizontal :push-other-panes="false" @resize="handlePaneResize">
        <pane size="50">
          <splitpanes :push-other-panes="false" @resize="handlePaneResize">
            <pane size="20" min-size="20">
              <div ref="refKeyContainer" class="connection-key-container">
                <div ref="refKeyList" class="key-list-container">
                  <perfect-scrollbar
                    ref="refKeyListScrollbar"
                    class="key-list-scrollbar"
                    :options="{ suppressScrollX: true }"
                  >
                    <Tree
                      :tree-nodes="keysData"
                      :custom-icon="true"
                      :show-badge="showBadge"
                      class="key-list"
                      @change="handleShowKeyContent"
                    />
                  </perfect-scrollbar>
                </div>
              </div>
            </pane>
            <pane min-size="20">
              <div class="key-editor-container">
                <div ref="refKeyContent">
                  <KeyContent :item="keySelectedItem" />
                </div>
              </div>
            </pane>
          </splitpanes>
        </pane>
        <pane v-if="showConsole" ref="refConsolePane" size="50" min-size="10">
          <Console ref="refConsole" />
        </pane>
      </splitpanes>
    </div>
  </div>
</template>

<script lang="ts">
import {
  onMounted,
  reactive,
  toRefs,
  toRaw,
  ref,
  computed,
  defineComponent,
  watchEffect,
  provide,
  nextTick,
  onUnmounted,
} from 'vue'

import { Splitpanes, Pane } from 'splitpanes'
// import MonacoEditor from '/@/components/Common/MonacoEditor.vue'
// import CodeEditor from '/@/components/Common/CodeEditor.vue'
import Tree from '/@/components/Common/Tree.vue'
import KeyContent from '/@/components/KeyContent/KeyContent.vue'
import Console from '/@/components/Common/Console.vue'

import { useStore } from 'vuex'
import { useService } from '/@/hooks'

export default defineComponent({
  name: 'Connection',
  components: { Splitpanes, Pane, KeyContent, Tree, Console },
  props: {
    connectionId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { state, commit } = useStore()
    const { changeDb, getConfig, scanKeys } = useService('RedisService')

    const found = state.hub.connections.findIndex(
      (e: { id: string | undefined }) => e.id === props.connectionId
    )
    const connection = computed(() => state.hub.connections[found])
    provide('connectionId', connection.value.id)

    const isLoading = computed(() => connection.value.status !== 'ready')
    const showBadge = ref(true)

    const showConsole = ref(false)

    // 获取DB数量
    const dbCount = ref(0)
    const dbItems: { label: string; value: string }[] = reactive([])
    const dbSelected = ref('0')
    const fetchDatabaseCount = async () => {
      const result = await getConfig(toRaw(connection.value.id), 'databases')
      if (result[1]) {
        dbCount.value = Number(result[1])
      }
    }
    watchEffect(() => {
      for (let i = 0; i < dbCount.value; i++) {
        dbItems.push({ label: String(i), value: String(i) })
      }
    })
    // 改变选择的 Db
    const handleChangeDb = async (value: number) => {
      const result = await changeDb(toRaw(connection.value.id), value)
      if (result) fetchKeys()
    }
    const keySearchPatterns = ref('')
    // 获取键列表
    let keysData: { label: string; type: string; key: string }[] = reactive([])
    const fetchKeys = async () => {
      const [cursor, keys] = await scanKeys(toRaw(connection.value.id))
      const result: { label: string; type: string; key: string }[] = []
      if (keys && keys.length > 0)
        keys.forEach((e) => result.push({ label: e[0], type: e[1], key: e[0] }))
      keysData.splice(0, keysData.length, ...result)
      commit('updateConnectionKeysCount', { id: connection.value.id, count: keysData.length })
      if (result.length > 0 && !keySelectedItem.value)
        keySelectedItem.value = { name: result[0].label, type: result[0].type }
    }
    // 键列表选择
    const keySelectedItem = ref({})
    const handleShowKeyContent = (node: { label: string; type: string }) => {
      const { label, type } = node
      keySelectedItem.value = { name: label, type }
    }
    // 设置组件大小
    // TODO: 要控制高宽的地方很多，需改用ResizeObserver做全局
    const refKeyContainer = ref(null)
    const refKeyList = ref(null)
    const refKeyHeader = ref(null)
    const refKeyListScrollbar = ref(null)
    const refKeyContent = ref(null)
    const refConsolePane = ref(null)
    const refConsole = ref(null)
    const handlePaneResize = () => {
      // refKeyList.value.style.height = `${
      //   refKeyContainer.value.offsetHeight - refKeyHeader.value.offsetHeight
      // }px`
      // refKeyContent.value.style.height = `${
      //   refKeyContainer.value.offsetHeight - refKeyHeader.value.offsetHeight
      // }px`
      // if (refKeyListScrollbar.value.ps) refKeyListScrollbar.value.ps.update()
      // // console.log(refConsole)
      // if (refConsole.value) refConsole.value.handleResize()
    }
    onMounted(async () => {
      // const payload = {
      //   id: toRaw(connection.value.id),
      //   options: toRaw(connection.value.options),
      // }
      // const result = await createStandAloneConnection(payload.id, payload.options)
      // if (result) {
      fetchDatabaseCount()
      fetchKeys()
      // }

      nextTick(() => {
        handlePaneResize()
      })
    })

    onUnmounted(() => {
      if (refKeyListScrollbar.value?.ps) {
        refKeyListScrollbar.value.ps.destory()
        refKeyListScrollbar.value.ps = null
      }
    })
    const data = reactive({
      isLoading,
      connection,
      dbCount,
      dbItems,
      dbSelected,
      keysData,
      showBadge,
      showConsole,
      keySelectedItem,
      keySearchPatterns,
    })
    return {
      ...toRefs(data),
      fetchDatabaseCount,
      fetchKeys,
      handleShowKeyContent,
      refKeyContainer,
      refConsolePane,
      refConsole,
      refKeyListScrollbar,
      refKeyList,
      refKeyHeader,
      refKeyContent,
      handlePaneResize,
      handleChangeDb,
    }
  },
})
</script>

<style lang="scss">
.connection-container {
  height: 100%;

  .connection-header {
    padding: $space-small;
    display: flex;
    flex-flow: row nowrap;
    box-sizing: border-box;
    min-height: $connection-header-height;
    max-height: $connection-header-height;

    .connection-header-left {
      margin-right: auto;
    }
  }
}
.connection-key-container {
  // padding-top: $space-small;
  padding-left: $space-small;
  // padding-right: $space-extra-small;
  height: 100%;

  .key-list-container {
    box-sizing: border-box;
    height: 100%;
  }
  .key-list-header {
    padding: $space-small 0;
  }
  .key-list-scrollbar.ps {
    height: 100%;
    padding-bottom: $space-small;
  }
  .el-input__prefix {
    .iconfont {
      height: 100%;
    }
  }
  .key-list {
    background-color: $component-background;
    .iconfont {
      font-size: $font-size-medium !important;
    }
  }
  .el-input--prefix .el-input__inner {
    padding-left: $space-extra-large;
  }
  .el-input-group__append {
    padding: 0 $space-small;
  }
}
.key-editor-container {
  height: 100%;
  padding-left: $space-extra-small;
  // border-left: 1px solid $border-color-base;
  // border-image: -webkit-linear-gradient(to bottom, $component-background, $border-color-base) 1 100%;
  // border-image: -moz-linear-gradient(to bottom, $component-background, $border-color-base) 1 100%;
  // border-image: linear-gradient(to bottom, $component-background, $border-color-base) 1 100%;
  .key-editor-header {
    padding: $space-small 0;
  }
  .key-content {
    height: 100%;
  }
  .el-input__prefix {
    .iconfont {
      height: 100%;
    }
  }
  .el-input--prefix .el-input__inner {
    padding-left: $space-extra-large;
  }
  .el-input-group__append {
    padding: 0 $space-small;
  }
}
// .connection-container {
//   padding: 16px 16px 0 16px;
// }

// .console-header.ant-layout-header {
//   border-top: 1px solid @border-color-base;
//   width: inherit;
//   display: flex;
//   justify-content: space-between;

//   .icon-button {
//     color: @text-color-secondary;
//     &:hover,
//     &:focus,
//     &:active {
//       color: @text-color-secondary;
//     }
//   }
//   .console-header-left {
//     padding-left: 16px;
//     font-size: @font-size-sm;
//   }
// }
// .connection-key-container {
//   height: 100%;

//   .key-list-header {
//     padding: @padding-sm;
//   }
//   .key-list-container {
//     position: relative;
//     overflow: hidden;
//   }
//   .key-list-scrollbar {
//     height: 100%;
//     width: 100%;
//     padding-bottom: @padding-sm;
//   }
//   .key-list {
//     width: 100%;
//   }
// }
// .key-editor-container {
//   border-left: 1px solid @border-color-split;
//   border-image: -webkit-linear-gradient(to bottom, @app-component-background, @border-color-split) 1
//     100%;
//   border-image: -moz-linear-gradient(to bottom, @app-component-background, @border-color-split) 1
//     100%;
//   border-image: linear-gradient(to bottom, @app-component-background, @border-color-split) 1 100%;
//   // border-image: linear-gradient(to bottom, red , blue) 500 100%;
//   .key-editor-header {
//     padding: @padding-sm;
//   }
//   .key-editor-header-right {
//     padding-right: @padding-sm;
//   }
// }
</style>
