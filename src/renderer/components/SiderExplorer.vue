<template>
  <Sider>
    <template #header>
      <span>资源管理器</span>
    </template>
    <el-collapse v-model="expandedKeys" class="explorer-collapse">
      <el-collapse-item name="1">
        <template #title><iconfont name="right" />收藏夹</template>
        <Tree :tree-nodes="favNodes" />
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title><iconfont name="right" />This is panel header 2</template>
        <Tree :tree-nodes="favNodes" />
      </el-collapse-item>
      <el-collapse-item name="3">
        <template #title><iconfont name="right" />This is panel header 3</template>
        <Tree :tree-nodes="favNodes" />
      </el-collapse-item>
    </el-collapse>
  </Sider>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import Sider from '/@/components/Layout/Sider.vue'
import Tree from '/@/components/Common/Tree.vue'

export default defineComponent({
  name: 'SiderExplorer',
  components: {
    Sider,
    Tree,
  },
  setup() {
    const favNodes = reactive([
      { label: 'server1', key: '1' },
      { label: 'server2', key: '2' },
      {
        label: '公司',
        key: '3',
        // slots: { icon: 'folder' },
        children: [
          { label: '官网', key: '4' },
          { label: 'dev', key: '5' },
          {
            label: '苏州xx项目',
            key: '6',
            children: [
              { label: 'prod', key: '7' },
              { label: 'sit', key: '8' },
            ],
          },
        ],
      },
      {
        label: '个人',
        key: '9',
        children: [
          { label: '本地', key: '10' },
          { label: 'WSL', key: '11' },
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

<style lang="scss">
.explorer-collapse.el-collapse {
  background-color: $app-background;
  width: 100%;
  border-top: 1px solid $component-background;
  border-bottom: 1px solid $app-background;

  .el-collapse-item__wrap {
    border-bottom: 1px solid $app-background;
  }
  .el-collapse-item__header {
    border-bottom: 1px solid $component-background;
    white-space: nowrap;
    text-overflow: ellipsis;

    .iconfont {
      margin: 0 $space-extra-small;
      transition: transform 0.3s ease 0s;
    }
    &.is-active {
      .iconfont {
        transform: rotate(90deg);
      }
    }
  }
  .el-collapse-item__arrow {
    display: none;
  }
  .el-collapse-item__content {
    padding-bottom: 0;
  }
}
</style>
