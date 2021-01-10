<template>
  <el-badge v-if="showBadge" class="badge-redis" :class="className" :value="label" />
  <iconfont v-else class="icon-redis" :class="className" :name="iconName" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue'

export default defineComponent({
  name: 'TreeKeyIcon',
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
      if (props.badge) return `redis-${props.type}`
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

<style lang="scss">
.badge-redis.el-badge {
  margin: 0 $space-extra-small;
  height: 22px;
  margin-top: 3px;

  .el-badge__content {
    border-radius: 2px;
    padding: 0;
    width: 32px;
    font-size: $font-size-extra-small;
    font-weight: bold;
    height: 14px;
    line-height: 14px;
    // height: 22px;
  }
  &.redis-list .el-badge__content {
    background-color: $redis-list-color;
  }
  &.redis-set .el-badge__content {
    background-color: $redis-set-color;
  }
  &.redis-zset .el-badge__content {
    background-color: $redis-zset-color;
  }
  &.redis-string .el-badge__content {
    background-color: $redis-string-color;
  }
  &.redis-hash .el-badge__content {
    background-color: $redis-hash-color;
  }
}
</style>
