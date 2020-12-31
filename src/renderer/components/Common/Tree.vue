<template>
  <a-directory-tree
    :tree-data="treeNodes"
    :block-node="true"
    :show-icon="!customIcon"
    :show-line="false"
    expand-action="dblclick"
    @select="handleNodeChange"
    :defaultSelectedKeys="selectedKey"
    v-model:selectedKeys="selectedKey"
    @dblclick="handleDblClick"
  >
    <template #folder="{ expanded }">
      <iconfont v-if="expanded" name="folder-open" class="tree-icon folder-color" />
      <iconfont v-else name="folder" class="tree-icon folder-color" />
    </template>
    <template #redis><iconfont name="redis" class="tree-icon redis-color" /></template>
    <!-- <template #redis-key="item">
      <TreeBadge :badge="showBadge" :type="item.type" />
    </template> -->
    <template #node="item">
      {{ item }}
    </template>
    <template #title="item">
      <TreeBadge v-if="customIcon" :badge="showBadge" :type="item.type" />
      <span>{{ item.title }} </span>
    </template>
  </a-directory-tree>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  ref,
  watchEffect,
  watch,
  computed,
} from 'vue'

import TreeBadge from '/@/components/Common/TreeBadge.vue'
import ContextMenu from '/@/components/Common/ContextMenu.vue'

export default defineComponent({
  name: 'Tree',
  components: { TreeBadge, ContextMenu },
  props: {
    treeNodes: {
      type: Array,
      default: () => {
        return []
      },
    },
    customIcon: {
      type: Boolean,
      default: false,
    },
    showBadge: Boolean,
  },
  setup(props, { emit }) {
    const treeNodes = computed(() => props.treeNodes)
    const customIcon = computed(() => props.customIcon)
    const showBadge = computed(() => props.showBadge)
    const selectedKey: string[] = reactive([])
    const handleNodeChange = (key: string, e: any) => {
      emit('change', key, e)
    }
    const insertNodeIcon = (nodes: any[]) => {
      nodes.forEach((node) => {
        if (node.children) {
          node.slots = { icon: 'folder' }
          insertNodeIcon(node.children)
        } else {
          if (!customIcon) node.slots = { icon: 'redis-key' }
          else node.slots = { icon: 'redis' }
        }
      })
    }
    watchEffect(() => {
      insertNodeIcon(treeNodes.value)
      if (selectedKey.length === 0 && treeNodes.value.length > 0)
        selectedKey.push(treeNodes.value[0].key)
    })
    const handleDblClick = (a, b, c) => {
      console.log('dblclick',a, b, c)
    }
    onMounted(() => {})

    const data = reactive({
      treeNodes,
      showBadge,
      customIcon,
      selectedKey,
    })
    return {
      ...toRefs(data),
      handleNodeChange,
      handleDblClick
    }
  },
})
</script>

<style lang="less">
@import url('../../themes/variables');

.ant-tree.ant-tree-directory {
  font-size: 12px;

  li:first-child {
    padding-top: 0;
    padding-bottom: 0;
  }
  li {
    padding-top: 0;
    padding-bottom: 0;
  }
  // .ant-tree-child-tree > li:first-child {
  //   padding-top: 0;
  //   padding-bottom: 0;
  // }
  li:last-child {
    padding-bottom: 0;
  }
  .ant-tree-switcher.ant-tree-switcher-noop,
  .ant-tree-switcher.ant-tree-switcher_close,
  .ant-tree-switcher.ant-tree-switcher_open {
    display: none !important;
  }
  li .ant-tree-node-content-wrapper {
    width: 100%;
    padding: 0 12px;
    color: @text-color-secondary;
  }
  .ant-tree-node-selected {
    color: @text-color-secondary !important;
  }

  .ant-tree-title {
    span {
      text-overflow: ellipsis;
    }
  }
  .tree-icon {
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
