<template>
  <ul class="v-circle-step pa-0">
    <li
      class="v-circle-step__item"
      v-for="item in steps"
      :key="item"
      :class="{ 'v-circle-step__item_active': item === step }"
    />
  </ul>
</template>

<script>
export default {
  name: 'vCircleStep',
  props: {
    steps: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.v-circle-step {
  display: flex;
  align-items: center;
  justify-content: center;

  &__item {
    width: 8px;
    height: 8px;
    background-color: var(--v-primary-background-3-base);
    border-radius: 50px;
    margin-right: 10px;

    &_active {
      background-color: var(--v-primary-blue-1-base);
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
