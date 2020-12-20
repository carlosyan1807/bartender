<template>
  <a-layout class="app-explorer">
    <a-layout-header class="explorer-header">
      <span>资源管理器</span>
    </a-layout-header>
    <a-collapse class="explorer-collapse" v-model:activeKey="activeKey" :bordered="false">
      <a-collapse-panel key="1" header="收藏夹">
        <a-directory-tree
          :tree-data="treeNodes"
          v-model:expandedKeys="expandedKeys"
          v-model:selectedKeys="selectedKeys"
          v-model:checkedKeys="checkedKeys"
          :block-node="true"
          :show-icon="false"
        >
          <!-- <template #title0010><span style="color: #1890ff">sss</span></template> -->
          <!-- <template #title0010></template> -->
          <template #switcherIcon>
            <span></span>
          </template>
          <template #title="item">
            <span>
              <iconfont
                class="tree-icon folder-color"
                name="folder"
                v-if="item.children?.length > 0 && !item.expanded"
              />
              <iconfont
                class="tree-icon folder-color"
                name="folder-open"
                v-else-if="item.children?.length > 0 && item.expanded"
              />
              <iconfont class="tree-icon redis-color" name="redis" v-else />
              {{ item.title }}
            </span>
          </template>
        </a-directory-tree>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="This is panel header 2" :disabled="false">
        <p>234</p>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="This is panel header 3">
        <p>345</p>
      </a-collapse-panel>
    </a-collapse>
  </a-layout>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'Explorer',
  setup() {
    const treeNodes = reactive([
      { title: 'server1', key: '1' },
      { title: 'server2', key: '2' },
      {
        title: '公司',
        key: '3',
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
    const data = reactive({
      treeNodes,
      expandedKeys: ['0-0-0', '0-0-1'],
      selectedKeys: ['0-0-0', '0-0-1'],
      checkedKeys: ['0-0-0', '0-0-1'],
      activeKey: '1',
    })
    return {
      ...toRefs(data),
    }
  },
}
</script>

<style lang="less">
@import url('../themes/variables');

.app-explorer {
  overflow: hidden;

  .explorer-header.ant-layout-header {
    color: @text-color-secondary;
    height: 35px;
    font-size: 12px;
    line-height: 35px;
    padding: 0 20px;
    background-color: @body-background;
  }
  .explorer-collapse.ant-collapse {
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
  }

  .ant-collapse-borderless > .ant-collapse-item {
    border-bottom: none;
  }

  .ant-collapse-borderless
    > .ant-collapse-item
    > .ant-collapse-content
    > .ant-collapse-content-box {
    padding-top: 0;
  }

  .ant-tree {
    font-size: 12px;
  }
  .ant-tree > li:first-child {
    padding-top: 0;
    padding-bottom: 0;
  }
  .ant-tree li {
    padding-top: 0;
    padding-bottom: 0;
  }
  .ant-tree-child-tree > li:first-child {
    padding-top: 0;
    padding-bottom: 0;
  }
  .ant-tree > li:last-child {
    padding-bottom: 0;
  }
  .ant-tree-switcher.ant-tree-switcher-noop,
  .ant-tree-switcher.ant-tree-switcher_close,
  .ant-tree-switcher.ant-tree-switcher_open {
    display: none !important;
  }
  .ant-tree.ant-tree-block-node li .ant-tree-node-content-wrapper {
    width: 100%;
    padding: 0 12px;
    color: @text-color-secondary;
  }
  .ant-tree-node-selected {
    color: @text-color-secondary !important;
  }

  .tree-icon {
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
