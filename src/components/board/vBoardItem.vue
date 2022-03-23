<template>
  <v-window-item class="v-board-item" v-bind="$attrs">
    <div v-if="hasHeader" class="v-board-item__header" />

    <div class="v-board-item__offer">
      <h4 class="v-board-item__subtitle">
        <slot name="subtitle" />
      </h4>

      <h2 class="v-board-item__title">
        <slot name="title" />
      </h2>

      <p class="v-board-item__description">
        <slot name="description" />
      </p>

      <slot name="content" />
    </div>
  </v-window-item>
</template>

<script>
export default {
  name: "vBoardItem",
  props: {
    hasHeader: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
.v-board-item {
  &__header {
    background-image: url("@/assets/images/board-header.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 145px;
    border-radius: 10px 10px 0 0;
  }

  &__offer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0;
  }

  &__subtitle {
    font-size: 14px;
    color: var(--v-primary-green-1-base);
    text-transform: uppercase;
  }

  &__title {
    font-size: 18px;
    color: var(--v-primary-text-3-base);
    margin: 10px 0;
  }

  &__description {
    color: var(--v-primary-text-2-base);
    text-align: center;
    max-width: 80%;
  }
}
</style>
