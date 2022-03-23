<template>
  <div class="profile-form" :style="{ 'min-height': minHeight + 'px' }">
    <vLoader v-if="hasLoading" :is-loading="isLoading" :is-error="isError" />

    <div v-if="!isLoading">
      <slot />

      <slot name="buttons" />
    </div>
  </div>
</template>

<script>
import vLoader from '@/components/vLoader'

export default {
  name: 'ProfileForm',
  components: { vLoader },
  props: {
    minHeight: {
      type: Number,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    hasLoading: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss">
.profile-form {
  background: var(--v-primary-background-2-base);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 100%;
}
</style>
