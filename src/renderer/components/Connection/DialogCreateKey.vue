<template>
  <el-dialog
    custom-class="dialog-createkey"
    :model-value="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :show-close="false"
    width="500px"
    @close="handleCloseDialog"
  >
    <el-form
      :model="formCreateKey"
      layout="horizontal"
      label-position="right"
      label-width="auto"
      label-suffix=":"
      size="mini"
    >
      <el-form-item label="键名">
        <el-input v-model="formCreateKey.keyName" />
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="formCreateKey.keyType">
          <el-radio-button v-for="item in keyTypeList" :key="item.value" :label="item.value">
            <iconfont
              :name="`redis-${item.value}`"
              :class="`icon-redis icon-redis-${item.value}`"
            />
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCreateKey">添加</el-button>
        <el-button plain @click="handleCloseDialog">取消</el-button>
        <el-button plain>添加100个</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref, toRefs, watchEffect } from 'vue'
import { useService } from '/@/hooks'

export default defineComponent({
  name: 'DialogCreateKey',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    // show/hide
    const dialogVisible = ref(props.show)
    watchEffect(() => (dialogVisible.value = props.show))
    const handleCloseDialog = () => {
      emit('close')
    }

    const keyTypeList = [
      { label: 'Hash', value: 'hash' },
      { label: 'List', value: 'list' },
      { label: 'Set', value: 'set' },
      { label: 'String', value: 'string' },
      { label: 'ZSet', value: 'zset' },
    ]

    const formCreateKey = reactive({
      keyName: '',
      keyType: 'hash',
    })
    const connectionId = inject('connectionId') as string
    const { existsKey, createKey } = useService('RedisService')
    const handleCreateKey = async () => {
      const found = await existsKey(connectionId, formCreateKey.keyName)
      if (found) console.log('already exists.')
      else {
        const res = await createKey(connectionId, formCreateKey.keyName, formCreateKey.keyType)
        console.log(res)
      }
    }

    const data = reactive({
      dialogVisible,
      keyTypeList,
      formCreateKey,
    })

    return {
      ...toRefs(data),
      handleCloseDialog,
      handleCreateKey,
    }
  },
})
</script>

<style lang="scss">
.dialog-createkey {
  .icon-redis {
    padding-right: $space-extra-small;
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding-bottom: $space-small;
  }
}
</style>
