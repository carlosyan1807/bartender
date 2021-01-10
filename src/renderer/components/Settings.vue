<template>
  <el-row type="flex" justify="center" class="settings-container">
    <el-col :xs="24" :sm="16" :md="12" :lg="8">
      <el-form
        ref="formSettings"
        layout="horizontal"
        label-position="right"
        label-width="auto"
        label-suffix=":"
        size="small"
      >
        <el-form-item label="键类型显示方式">
          <el-radio-group v-model="keyDisplayByIcon">
            <el-radio :label="true">图标</el-radio>
            <el-radio :label="false">标签</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="handleSaveSettings">保存并应用</el-button>
        </el-form-item>
      </el-form>
      <ul>
        <li>跟随系统启动</li>
        <li>切换主题</li>
        <li>连接后自动隐藏explorer</li>
        <li>关闭时自动最小化到tray</li>
      </ul>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { useStore } from 'vuex'
import { useService } from '/@/hooks'

export default defineComponent({
  name: 'Settings',
  components: {},
  props: {},
  setup() {
    const { state, commit } = useStore()
    const { setConfig } = useService('ConfigService')
    const keyDisplayByIcon = state.app.keyDisplayByIcon ? ref(true) : ref(false)
    // const formSettings = reactive({
    //   keyDisplayByIcon: state.app.keyDisplayByIcon ? ref(true) : ref(false),
    // })
    // console.log(formSettings)
    const handleSaveSettings = () => {
      commit('updateKeyDisplayByIcon', keyDisplayByIcon.value)
      setConfig('keyDisplayByIcon', keyDisplayByIcon.value)
    }
    const data = reactive({
      // formSettings,
      keyDisplayByIcon,
    })

    return {
      ...toRefs(data),
      handleSaveSettings,
    }
  },
})
</script>

<style lang="scss">
.settings-container {
  padding-top: $space-extra-large;
}
</style>
