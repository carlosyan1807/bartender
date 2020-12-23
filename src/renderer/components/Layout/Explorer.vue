<template>
  <a-layout class="app-explorer">
    <a-layout-header class="explorer-header">
      <span>资源管理器</span>
    </a-layout-header>
    <a-collapse class="explorer-collapse" v-model:activeKey="activeKey" :bordered="false">
      <a-collapse-panel key="1" header="收藏夹">
        <Tree :tree-nodes="favNodes">
          <template #icon="{ item }">
            <iconfont
              v-if="item.children?.length > 0 && !item.expanded"
              name="folder"
              class="tree-icon folder-color"
            />
            <iconfont
              v-else-if="item.children?.length > 0 && item.expanded"
              name="folder-open"
              class="tree-icon folder-color"
            />
            <iconfont v-else name="redis" class="tree-icon redis-color" />
          </template>
        </Tree>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="This is panel header 2" :disabled="false">
        123
      </a-collapse-panel>
      <a-collapse-panel key="3" header="This is panel header 3">
        <p>345</p>
      </a-collapse-panel>
    </a-collapse>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRaw, toRefs } from 'vue'
import Tree from '/@/components/Common/Tree.vue'

// TODO: 侧边栏可收起
export default defineComponent({
  name: 'Explorer',
  components: {
    Tree,
  },
  setup() {
    const favNodes = reactive([
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

    onMounted(() => {
      favNodes.push({ title: 'aaa', key: '111' })
    })

    const data = reactive({
      favNodes,
      expandedKeys: ['0-0-0', '0-0-1'],
      selectedKeys: ['0-0-0', '0-0-1'],
      checkedKeys: ['0-0-0', '0-0-1'],
      activeKey: '1',
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="less">
@import url('../../themes/variables');

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
}
</style>
