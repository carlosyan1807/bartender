<template>
  <a-directory-tree
    :tree-data="treeNodes"
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
    v-model:checkedKeys="checkedKeys"
    :block-node="true"
    :show-icon="false"
    :show-line="false"
  >
    <!-- <template #switcherIcon><span></span></template> -->
    <template #title="item">
      <slot name="icon" :item="item">
        <iconfont :name="item.icon" class="tree-icon" />
      </slot>
      <span>{{ item.title }} </span>
    </template>
  </a-directory-tree>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'Tree',
  components: {},
  props: {
    treeNodes: {
      type: Array,
      default: () => {
        return []
      },
    },
    leafIcon: String,
    activedKey: String,
  },
  setup(props) {
    const treeNodes = reactive(props.treeNodes)
    const activedKey = ref(props.activedKey)

    const expandedKeys = ref([])
    const selectedKeys = ref([])
    const checkedKeys = ref([])

    onMounted(() => {})

    const updateExpandedNodeIcon = () => {}
    const data = reactive({
      activedKey,
      expandedKeys,
      selectedKeys,
      checkedKeys,
      treeNodes,
    })
    return {
      ...toRefs(data),
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
      margin-left: 4px;
      text-overflow: ellipsis;
    }
  }
  .tree-icon {
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
