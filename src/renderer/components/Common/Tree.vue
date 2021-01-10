<template>
  <el-tree
    class="app-tree"
    :data="treeNodes"
    node-key="key"
    :default-expand-all="true"
    :indent="12"
    :current-node-key="selectedKey"
    :highlight-current="true"
    @node-click="handleNodeClick"
  >
    <!-- @node-collapse="handleNodeCollapse" -->
    <!-- @node-click="handleNodeClick" -->
    <template #default="{ node, data }">
      <div style="height: 100%">
        <template v-if="data.type">
          <TreeKeyIcon :badge="!showIcon" :type="data.type" />
        </template>
        <template v-else>
          <iconfont v-if="data.children && node.expanded" name="folder-open" class="folder-color" />
          <iconfont
            v-else-if="data.children && !node.expanded"
            name="folder"
            class="folder-color"
          />
          <iconfont v-else name="redis" class="redis-color" />
        </template>
        <span>{{ data.label }}</span>
      </div>
    </template>
  </el-tree>
  <!-- :props="defaultProps" -->
  <!-- <a-directory-tree
    :tree-data="treeNodes"
    :block-node="true"
    :show-icon="!customIcon"
    :show-line="false"
    expand-action="dblclick"
    @select="handleNodeChange"
    :default-selected-keys="selectedKey"
    v-model:selectedKeys="selectedKey"
    @dblclick="handleDblClick"
  >
    <template #folder="{ expanded }">
      <iconfont v-if="expanded" name="folder-open" class="tree-icon folder-color" />
      <iconfont v-else name="folder" class="tree-icon folder-color" />
    </template>
    <template #redis><iconfont name="redis" class="tree-icon redis-color" /></template>
    <template #node="item">
      {{ item }}
    </template>
    <template #title="item">
      <TreeBadge v-if="customIcon" :badge="showBadge" :type="item.type" />
      <span>{{ item.title }} </span>
    </template>
  </a-directory-tree> -->
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref, watchEffect, computed, Ref } from 'vue'
import { useStore } from 'vuex'
import TreeKeyIcon from '/@/components/Common/TreeKeyIcon.vue'

export default defineComponent({
  name: 'Tree',
  components: { TreeKeyIcon },
  props: {
    treeNodes: {
      type: Array,
      default: () => {
        return []
      },
    },
    // customIcon: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { state } = useStore()
    const showIcon = computed(() => state.app.keyDisplayByIcon)
    const treeNodes: Ref<any[]> = computed(() => props.treeNodes)
    // const customIcon = computed(() => props.customIcon)
    // const showBadge = computed(() => props.showBadge)
    const selectedKey = ref('')
    const handleNodeClick = (data: { key: string }, node: any, ref: any) => {
      if (data.key !== selectedKey.value) {
        selectedKey.value = data.key
        emit('change', data)
      }
      // emit('change', key, e)
    }
    // const insertNodeIcon = (nodes: any[]) => {
    //   nodes.forEach((node) => {
    //     if (node.children) {
    //       node.icon = 'folder'
    //       insertNodeIcon(node.children)
    //     } else {
    //       node.icon = 'redis'
    //     }
    //   })
    // nodes.forEach((node) => {
    //   if (node.children) {
    //     node.slots = { icon: 'folder' }
    //     insertNodeIcon(node.children)
    //   } else {
    //     if (!customIcon.value) node.slots = { icon: 'redis-key' }
    //     else node.slots = { icon: 'redis' }
    //   }
    // })
    // }
    watchEffect(() => {
      // insertNodeIcon(treeNodes.value)
      if (!selectedKey.value && treeNodes.value.length > 0)
        selectedKey.value = treeNodes.value[0].key
    })

    onMounted(() => {})

    const data = reactive({
      treeNodes,
      showIcon,
      // customIcon,
      selectedKey,
    })
    return {
      ...toRefs(data),
      handleNodeClick,
    }
  },
})
</script>

<style lang="scss">
.app-tree.el-tree {
  height: 100%;
  width: 100%;

  .el-tree-node.is-current > .el-tree-node__content {
    background-color: lighten($component-background, 8%);
  }
  .el-tree-node {
    .iconfont {
      margin: 0 $space-small;
    }
    .el-tree-node__content {
      align-items: center;
      // justify-content: center;
      height: 22px;
      span {
        font-size: $font-size-small;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .el-tree-node__label {
      font-size: $font-size-small;
    }
    .el-tree-node__expand-icon {
      display: none;
    }
  }
}
// .ant-tree.ant-tree-directory {
//   font-size: 12px;

//   li:first-child {
//     padding-top: 0;
//     padding-bottom: 0;
//   }
//   li {
//     padding-top: 0;
//     padding-bottom: 0;
//   }
//   // .ant-tree-child-tree > li:first-child {
//   //   padding-top: 0;
//   //   padding-bottom: 0;
//   // }
//   li:last-child {
//     padding-bottom: 0;
//   }
//   .ant-tree-switcher.ant-tree-switcher-noop,
//   .ant-tree-switcher.ant-tree-switcher_close,
//   .ant-tree-switcher.ant-tree-switcher_open {
//     display: none !important;
//   }
//   li .ant-tree-node-content-wrapper {
//     width: 100%;
//     padding: 0 12px;
//     color: $text-color-highlight;
//   }
//   .ant-tree-node-selected {
//     color: $text-color-highlight !important;
//   }

//   .ant-tree-title {
//     span {
//       text-overflow: ellipsis;
//     }
//   }
//   .tree-icon {
//     font-size: 14px;
//     line-height: 22px;
//   }
// }
</style>
