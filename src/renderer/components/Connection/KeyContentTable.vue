<template>
  <el-table
    class="key-content-table"
    size="mini"
    :data="keyData"
    highlight-current-row
    :current-row-key="selectedRow"
    :height="'100%'"
  >
    <el-table-column v-if="keyType === 'hash'" property="key" label="key"> </el-table-column>
    <el-table-column v-if="keyType === 'list'" property="index" label="index"> </el-table-column>
    <el-table-column v-if="keyType === 'list'" property="item" label="item"> </el-table-column>
    <el-table-column v-if="keyType === 'zset'" property="score" label="score"> </el-table-column>
    <el-table-column
      v-if="keyType === 'set' || keyType === 'zset'"
      property="member"
      label="member"
    >
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'KeyContentTable',
  components: {},
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
    type: {
      type: String,
      required: true,
      validator: (value: string) => {
        return ['list', 'set', 'zset', 'hash'].indexOf(value) !== -1
      },
    },
  },
  setup(props) {
    const keyType = computed(() => props.type)
    const keyData = computed(() => props.items)
    const selectedRow = computed(() => {
      if (props.items.length) return 1
      else return null
    })
    const data = reactive({
      keyType,
      keyData,
      selectedRow,
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="scss">
.key-content-table.el-table.el-table--mini {
  width: 100%;

  &::before {
    height: 0;
  }
  .cell {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-table__body-wrapper {
    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }
    &::-webkit-scrollbar {
      background-color: transparent;
      width: 14px;
      height: 14px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 14px;
      border: 4px solid rgba(0, 0, 0, 0);
      box-shadow: 10px 10px 0 $border-color-base inset;
    }
  }

  tr.current-row td:last-child::after {
    position: absolute;
    content: '';
    width: $inkbar-width;
    display: block;
    background-color: $color-primary;
    height: 100%;
    right: 0;
    top: 0;
    display: block;
    transition: background-color 0.3s ease 0s;
  }
  th,
  td {
    padding: 0;
  }
  th.is-leaf,
  td {
    border-bottom: 0;
  }
}
</style>
