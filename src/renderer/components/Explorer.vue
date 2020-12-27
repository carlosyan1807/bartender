<template>
  <!-- <a-layout class="app-explorer">
    <a-layout-header class="explorer-header"> -->
  <Sider>
    <template #header>
      <span>资源管理器</span>
    </template>
    <!-- </a-layout-header> -->
    <a-collapse
      class="explorer-collapse"
      v-model:activeKey="expandedKeys"
      :bordered="false"
      ref="collapse"
      :open-animation="{ onEnter: null }"
    >
      <a-collapse-panel key="1" header="收藏夹">
        <Tree :tree-nodes="favNodes" />
      </a-collapse-panel>
      <a-collapse-panel key="2" header="This is panel header 2">
        <Tree :tree-nodes="favNodes" />
      </a-collapse-panel>
      <a-collapse-panel key="3" header="This is panel header 3">
        <Tree :tree-nodes="favNodes" />
      </a-collapse-panel>
    </a-collapse>
    <!-- </a-layout> -->
  </Sider>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRaw, toRefs, watchEffect } from 'vue'
import Sider from '/@/components/Layout/Sider.vue'
import Tree from '/@/components/Common/Tree.vue'
import TempComponent from './TempComponent.vue'

export default defineComponent({
  name: 'Explorer',
  components: {
    Sider,
    Tree,
  },
  setup() {
    const favNodes = reactive([
      { title: 'server1', key: '1' },
      { title: 'server2', key: '2' },
      {
        title: '公司',
        key: '3',
        // slots: { icon: 'folder' },
        children: [
          { title: '官网', key: '4' },
          { title: 'dev', key: '5' },
          {
            title: '苏州xx项目',
            key: '6',
            children: [
              { title: 'prod', key: '7' },
              { title: 'sit', key: '8' },
            ],
          },
        ],
      },
      {
        title: '个人',
        key: '9',
        children: [
          { title: '本地', key: '10' },
          { title: 'WSL', key: '11' },
        ],
      },
    ])
    const expandedKeys = reactive(['1'])

    // 节点图标
    // const insertNodeIcon = (nodes: any[]) => {
    //   nodes.forEach((node) => {
    //     if (node.children) {
    //       node.slots = { icon: 'folder' }
    //       insertNodeIcon(node.children)
    //     } else {
    //       node.slots = { icon: 'redis' }
    //     }
    //   })
    // }
    // watchEffect(() => insertNodeIcon(favNodes))

    onMounted(() => {
      // console.log('collapse', collapse.value.$el.offsetHeight)
      // console.log('collapsePanel1', collapsePanel1)
      // tree1Style.height = `${collapse.value.$el.offsetHeight - 44}px`
      // console.log(tree1Style)
    })

    const data = reactive({
      favNodes,
      expandedKeys,
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="less">
@import url('../themes/variables');

.explorer-collapse.ant-collapse-borderless {
  height: calc(100vh - @app-titlebar-height - @app-statusbar-height - @app-sider-header-height);
  background-color: @body-background;

  .ant-collapse-header {
    background-color: @component-background;
    color: @text-color-secondary;
    font-size: 11px;
    font-weight: 600;

    .ant-collapse-arrow {
      left: 2px !important;
      margin: 0 2px;
    }
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  // .ant-collapse-content {
  //   overflow: auto;
  // }

  .ant-collapse-item {
    border-bottom: none !important;
  }

  .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
    padding-top: 0 !important;
  }
}
</style>
