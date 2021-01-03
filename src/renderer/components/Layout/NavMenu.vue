<template>
  <div class="app-navmenu">
    <div class="navmenu-main">
      <el-menu class="navmenu" :collapse="true" :default-active="activedNavMenuItem">
        <el-menu-item
          v-for="item in navMenuItems"
          :index="item.name"
          :key="item.name"
          @click="handleMenuItemClick"
        >
          <iconfont :name="item.icon" />
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="navmenu-extra">
      <el-popover
        popper-class="app-popper-menu"
        placement="right-end"
        trigger="click"
        :width="160"
        v-model:visible="settingsMenuVisiable"
        :show-arrow="false"
        :offset="10"
      >
        <el-menu>
          <el-menu-item index="settings" @click="showSettings"><span>设置</span></el-menu-item>
          <el-menu-item index="checkUpdate" disabled><span>检查更新...</span></el-menu-item>
          <el-divider></el-divider>
          <el-menu-item index="about" @click="showAboutDialog"><span>关于</span></el-menu-item>
        </el-menu>
        <template #reference>
          <el-button class="navmenu-extra-button">
            <iconfont name="setting" />
          </el-button>
        </template>
      </el-popover>
    </div>
  </div>
  <!-- <div class="app-navmenu">
    <div class="navmenu-main"> -->
  <!-- antdv菜单的selectedKeys(v-model)必须是数组 string[] -->
  <!-- <a-menu :selected-keys="[activedNavMenuItem]" mode="inline" @click="handleMenuItemClick">
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
            <a-menu-item key="0" title="" @click="showSettings">
              <span>设置</span>
            </a-menu-item>
            <a-menu-item key="1" title="" disabled>
              <span>检查更新...</span>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3" title="" @click="showAboutDialog">
              <span>关于</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'NavMenu',
  setup(props) {
    const { state, commit } = useStore()
    const activedNavMenuItem = computed(() => state.app.activedNavMenuItem)

    const navMenuItems = reactive([
      { name: 'explorer', label: '资源管理器', icon: 'server' },
      { name: 'reserved', label: '预留项', icon: 'wrench' },
    ])
    const settingsMenuVisiable = ref(false)
    // 打开设置
    const showSettings = () => {
      commit('showHubSettings', true)
      settingsMenuVisiable.value = false
    }
    // 打开关于
    const showAboutDialog = () => {
      commit('updateAboutDialogVisiable', true)
      settingsMenuVisiable.value = false
    }

    const handleMenuItemClick = (menu: { index: string }) => {
      const { index } = menu // event: { key: string }
      if (index === activedNavMenuItem.value) commit('updateActivedNavMenuItem', '')
      else commit('updateActivedNavMenuItem', index)
    }
    const data = reactive({
      navMenuItems,
      activedNavMenuItem,
      settingsMenuVisiable,
    })

    return {
      ...toRefs(data),
      showAboutDialog,
      showSettings,
      handleMenuItemClick,
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

<style lang="scss">
// @import url('../../themes/variables.scss');

.app-navmenu {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  .navmenu.el-menu {
    min-width: $app-navmenu-width;
    max-width: $app-navmenu-width;

    .el-menu-item {
      height: $app-navmenu-width;
      line-height: $app-navmenu-width;
      width: $app-navmenu-width;
      padding: 0 !important;
      text-align: center;
      font-size: $font-size * 1.5;
      color: $text-color;

      &:hover {
        color: $text-color-highlight;
      }
      &.is-active {
        color: $text-color-highlight;
      }
    }
    .el-menu-item.is-active::before {
      position: absolute;
      content: '';
      width: $inkbar-width;
      height: $app-navmenu-width;
      display: block;
      background-color: $color-primary;
      transition: background-color 0.3s ease 0s;
    }
  }
  .navmenu-extra {
    text-align: center;
  }
  .navmenu-extra-button {
    width: $app-navmenu-width;
    height: $app-navmenu-width;
    line-height: $app-navmenu-width;
    font-size: $font-size * 1.5;
  }
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
      width: $inkbar-width;
      height: $app-navmenu-width;
      display: block;
      background-color: $color-primary;
      transition-property: background-color;
      transition-duration: 0ms;
      transition-delay: 0.1s;
    }
  }

  .navmenu-extra-button {
    border: 0;
    background-color: $component-background;
    height: $app-navmenu-width;
    font-size: $font-size * 1.5;
    width: $app-navmenu-width;
    color: $text-color;
    padding: 0;

    &:active,
    &:hover,
    &:focus {
      color: $text-color-highlight;
      background-color: $component-background;
    }
  }
}
.context-menu {
  .ant-dropdown-menu-item:not(.ant-dropdown-menu-item-disabled),
  .ant-dropdown-menu-submenu-title:not(.ant-dropdown-menu-item-disabled) {
    color: $text-color-highlight;
  }
  .ant-dropdown-menu-item-active {
    background-color: lighten($component-background, 8%) !important;
  }
}
</style>
