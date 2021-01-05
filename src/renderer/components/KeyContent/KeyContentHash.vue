<template>
  <splitpanes :push-other-panes="false">
    <pane size="30">
      <div class="key-memebers-table-wrapper">
        <el-table class="key-memebers-table" size="mini" :data="keyMembers" highlight-current-row>
          <el-table-column property="name" label="Key"> </el-table-column>
        </el-table>
      </div>
    </pane>
    <pane size="70">
      <CodeMirrorEditor content="123" />
    </pane>
  </splitpanes>
</template>

<script lang="ts">
import { computed, defineComponent, inject, reactive, toRefs, watchEffect } from 'vue'
import { useService } from '/@/hooks'
import { Splitpanes, Pane } from 'splitpanes'
import CodeMirrorEditor from '/@/components/Common/CodeMirrorEditor.vue'

export default defineComponent({
  name: 'KeyContentHash',
  components: { Splitpanes, Pane, CodeMirrorEditor },
  props: {
    keyName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { getHashKey } = useService('RedisService')
    const connectionId = inject('connectionId') as string
    const keyName = computed(() => props.keyName)
    const keyMembers: { name: string; value: string }[] = reactive([])

    const getKey = async (name: string) => {
      const id = connectionId
      const result = await getHashKey(id, name)
      return result
    }

    watchEffect(async () => {
      const _key = keyName.value
      const [cursor, members] = await getKey(_key)
      const result: { name: string; value: string }[] = []
      if (members && members.length > 0)
        members.forEach((e) => result.push({ name: e[0], value: e[1] }))
      keyMembers.splice(0, keyMembers.length, ...result)
    })

    const data = reactive({
      keyMembers,
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="scss">
.key-memebers-table-wrapper {
  border: 1px solid $border-color-base;
  margin-right: $space-extra-small;
}
</style>
