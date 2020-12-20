<template>
  <div class="app-navmenu">
    <div class="navmenu-main">
      <a-menu v-model:selectedKeys="selectedMenu" mode="inline">
        <a-menu-item v-for="item in navMenuItems" :key="item.name">
          <iconfont :name="item.icon" />
          <span>{{ item.label }}</span>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="navmenu-extra">
      <a-dropdown :align="{ offset: [56, 40] }" :trigger="['click']" placement="topLeft">
        <a-button class="navmenu-extra-button" type="link" ghost @click="(e) => e.preventDefault()">
          <iconfont name="setting" />
        </a-button>
        <template #overlay>
          <a-menu class="context-menu">
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
import { reactive, toRefs } from 'vue'

export default {
  name: 'NavMenu',
  setup(props) {
    const navMenuItems = reactive([
      { name: 'explorer', label: '资源管理器', icon: 'server' },
      { name: 'reserved', label: '预留项', icon: 'wrench' },
    ])
    const data = reactive({
      navMenuItems,
      selectedMenu: ['explorer'],
    })
    return {
      ...toRefs(data),
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
}
</script>

<style lang="less">
@import url('../themes/variables');

.app-navmenu {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  .navmenu-main {
    .ant-menu-inline,
    .ant-menu-vertical,
    .ant-menu-vertical-left {
      border-right: none;
    }

    .ant-menu-inline-collapsed > .ant-menu-item,
    .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item,
    .ant-menu-inline-collapsed
      > .ant-menu-item-group
      > .ant-menu-item-group-list
      > .ant-menu-submenu
      > .ant-menu-submenu-title,
    .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
      padding: 0 !important;
      text-align: center;
    }
    .ant-menu-item.ant-menu-item-selected::before {
      position: absolute;
      content: '';
      width: @menu-item-active-border-width;
      height: 48px;
      display: block;
      background-color: @primary-color;
      transition-property: background-color;
      transition-duration: 0ms;
      transition-delay: 0.1s;
    }
  }

  .navmenu-extra-button.ant-btn {
    height: 48px;
    font-size: 24px;
    width: 48px;
    color: @text-color;
    padding: 0;

    &:active,
    &:hover,
    &:focus {
      color: @text-color-secondary;
    }
  }
}
.context-menu {
  .ant-dropdown-menu-item-active {
    background-color: lighten(@component-background, 8%) !important;
  }
}
</style>
