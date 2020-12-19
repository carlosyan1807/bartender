<template>
  <a-layout class="explorer">
    <a-layout-header class="explorer-header">
      <span>资源管理器</span>
    </a-layout-header>
    <a-collapse class="explorer-collapse" v-model:activeKey="activeKey" :bordered="false">
      <a-collapse-panel key="1" header="收藏夹">
        <a-directory-tree
          :tree-data="treeNodes"
          v-model:expandedKeys="state.expandedKeys"
          v-model:selectedKeys="state.selectedKeys"
          v-model:checkedKeys="state.checkedKeys"
          @select="onSelect"
          @check="onCheck"
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
              <iconfont class="tree-icon-folder" name="folder" v-if="item.children?.length > 0 && !item.expanded" />
              <iconfont class="tree-icon-folder" name="folder-open" v-else-if="item.children?.length > 0 && item.expanded" />
              <iconfont class="tree-icon-redis" name="redis" v-else/>
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
import { reactive } from 'vue'
export default {
  name: 'Explorer',
  setup() {
    const treeNodes = [
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
    ]
    const state = reactive({
      expandedKeys: ['0-0-0', '0-0-1'],
      selectedKeys: ['0-0-0', '0-0-1'],
      checkedKeys: ['0-0-0', '0-0-1'],
    })
    return {
      treeNodes,
      state,
    }
  },
}
</script>
