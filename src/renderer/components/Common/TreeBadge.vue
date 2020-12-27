<template>
  <a-badge v-if="showBadge" class="badge-redis" :class="className" :count="label" />
  <iconfont v-else class="icon-redis" :class="className" :name="iconName" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed, ref } from 'vue'

export default defineComponent({
  name: 'TreeBadge',
  components: {},
  props: {
    type: {
      type: String,
      default: '',
      validator: (value: string) => {
        return ['list', 'set', 'zset', 'hash', 'string'].indexOf(value) !== -1
      },
    },
    badge: Boolean,
  },
  setup(props) {
    const label = computed(() => {
      if (props.type === 'string') return props.type.substr(0, 3).toUpperCase()
      return props.type.substr(0, 4).toUpperCase()
    })
    const className = computed(() => {
      if (props.badge) return `badge-redis-${props.type}`
      else return `icon-redis-${props.type}`
    })
    const iconName = computed(() => `redis-${props.type}`)
    const showBadge = computed(() => props.badge)

    onMounted(() => {})

    const data = reactive({ label, className, iconName, showBadge })

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="less">
.ant-badge-not-a-wrapper:not(.ant-badge-status) {
  vertical-align: text-top !important;
}
</style>
