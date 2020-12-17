<template>
  <div class="app-navmenu">
    <div class="navmenu-main">
      <a-menu v-model:selectedKeys="state.selectedMenu" mode="inline">
        <a-menu-item v-for="item in navMenuItems" :key="item.name">
          <icon-font :type="item.icon" />
          <span>{{ item.label }}</span>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="navmenu-extra">
      <a-dropdown :align="{offset: [56, 40]}" :trigger="['click']" placement="topLeft">
        <a-button class="navmenu-extra-button" type="link" ghost @click="e => e.preventDefault()">
          <icon-font type="icon-setting" />
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0" title="">
              <span>设置</span>
            </a-menu-item>
            <a-menu-item key="1" title="">
              <span>检查更新...</span>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3" title="">
              <span>关于</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'NavMenu',
  setup(props) {
    const navMenuItems = [
      { name: 'explorer', label: '资源管理器', icon: 'icon-sever' },
      { name: 'reserved', label: '预留项', icon: 'icon-wrench' },
    ]
    const state = reactive({
      selectedMenu: ['explorer'],
    })
    return {
      state,
      navMenuItems,
    }
  },
  // data() {
  //   return {
  //     collapsed: false,
  //     selectedKeys: ['1'],
  //     openKeys: ['sub1'],
  //     preOpenKeys: ['sub1'],
  //   }
  // },
  // setup() {
  //   let collapsed = true
  //   let selectedKeys = ['1']
  //   let openKeys = []
  //   return {
  //     // collapsed,
  //     selectedKeys,
  //     openKeys,
  //   }
  // },
})
</script>
