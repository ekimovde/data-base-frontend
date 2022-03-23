<template>
  <div class="v-loader">
    <i v-if="isLoading" class="bx bx-loader-circle bx-spin v-loader__icon" />

    <i
      v-else-if="isError"
      class="bx bx-error bx-tada v-loader__icon v-loader__icon-error"
    />
  </div>
</template>

<script>
export default {
  name: "vLoader",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    isError: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.v-loader {
  width: 100%;
  text-align: center;

  &__icon {
    font-size: 36px;
    color: var(--v-primary-blue-1-base);

    &-error {
      color: var(--v-primary-red-1-base);
    }
  }
}
</style>
