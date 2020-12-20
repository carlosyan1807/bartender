<template>
  <a-tabs
    class="app-connection-pool"
    v-model:activeKey="activedTab"
    :animated="false"
    size="small"
    type="editable-card"
    :hide-add="true"
  >
    <a-tab-pane v-for="item in tabsData" :key="item.name">
      <template #tab>
        <span>
          <iconfont :class="item.iconClass" :name="item.icon" />
          {{ item.label }}
        </span>
      </template>
      <component :is="item.component" @new-connection="handleNewConnection" />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { reactive, markRaw, ref, toRefs } from 'vue'
import QuickConnect from '/@/components/QuickConnect.vue'
import Connection from '/@/components/Connection.vue'
import Settings from '/@/components/Settings.vue'

import { v4 as uuidv4 } from 'uuid'

export interface IConnectionOptions {
  host: string
  port: number
}

export default {
  name: 'ConnectionPool',
  components: {
    QuickConnect,
    Settings,
    Connection,
  },
  setup() {
    const tabQuickConnect = {
      name: 'quick-connect',
      label: '快速连接',
      icon: 'thunderbolt',
      component: markRaw(QuickConnect),
    }
    const tabSettings = {
      name: 'settings',
      label: '设置',
      icon: 'setting',
      component: markRaw(Settings),
    }
    const tabsData: object[] = reactive([])

    let activedTab = ref('quick-connect')

    const chooseIconClass = (array: any) => {
      for (let item of array) {
        if (item.name === 'quick-connect') item.iconClass = 'folder-color'
        else if (item.name === 'settings') item.iconClass = 'settings-color'
        else item.iconClass = 'redis-color'
      }
    }

    tabsData.push(tabQuickConnect)
    chooseIconClass(tabsData)

    const handleNewConnection = (options: IConnectionOptions) => {
      const uuid = uuidv4()
      const newTab = {
        name: uuid,
        label: `${options.host}:${options.port}`,
        icon: 'redis',
        component: markRaw(Connection),
      }
      tabsData.push(newTab)
      chooseIconClass(tabsData)
      activedTab.value = newTab.name
    }

    const data = ref({
      tabsData,
      activedTab,
    })
    return {
      ...toRefs(data),
      handleNewConnection,
    }
  },
}
</script>

<style lang="less">
@import url('../themes/variables');

.app-connection-pool {
  .ant-tabs-card-bar {
    border-bottom: none;
    background-color: @body-background;
  }
  .ant-tabs-tab {
    font-size: @font-size-sm;
    padding: 0 8px !important;
    border: none !important;

    .ant-tabs-close-x {
      display: none;
    }
    .anticon.iconfont {
      font-size: 14px;
      margin-right: 4px;
    }
  }
  .ant-tabs-tab.ant-tabs-tab-active {
    font-weight: normal;
  }
  .ant-tabs-nav .ant-tabs-tab::before {
    border-radius: 0;
  }
  .ant-tabs-nav .ant-tabs-tab:hover {
    background: lighten(@component-background, 4%) !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active::before {
    position: absolute;
    content: '';
    top: 0px;
    left: 0px;
    height: 2px;
    width: 100%;
    display: block;
    background-color: @primary-color;
    transition-property: background-color;
    transition-duration: 0ms;
    transition-delay: 0.1s;
  }

  .ant-tabs-content {
    padding: 0 16px;
  }
}
</style>
