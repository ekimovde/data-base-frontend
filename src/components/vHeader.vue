<template>
  <div class="v-header">
    <i class="v-header__icon" :class="[icon]" />

    <h3 class="v-header__title">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: "vHeader",
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.v-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &__icon {
    font-size: 20px;
    color: var(--v-primary-text-3-base);
    margin-right: 10px;
  }

  &__title {
    color: var(--v-primary-text-3-base);
  }
}
</style>
