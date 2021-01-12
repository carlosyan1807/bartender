<template>
  <div class="app-navmenu">
    <div class="navmenu-main">
      <el-menu class="navmenu" :collapse="true" :default-active="activedNavMenuItem">
        <el-menu-item
          v-for="item in navMenuItems"
          :key="item.name"
          :index="item.name"
          @click="handleMenuItemClick"
        >
          <iconfont :name="item.icon" />
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="navmenu-extra">
      <el-popover
        v-model:visible="settingsMenuVisiable"
        popper-class="app-popper-menu"
        placement="right-end"
        trigger="click"
        :width="160"
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
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'NavMenu',
  setup() {
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
})
</script>

<style lang="scss">
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
</style>
