<template>
  <v-window-item class="v-form-item" v-bind="$attrs">
    <div class="v-form-item__header">
      <img
        v-if="image"
        class="v-form-item__image"
        :src="require(`@/assets/images/${image}`)"
      />

      <h3 class="v-form-item__title">
        <slot name="title" />
      </h3>
    </div>

    <p v-if="hasDescription" class="v-form-item__description">
      <slot name="description" />
    </p>

    <div class="v-form-item__offer">
      <slot name="content" />
    </div>
  </v-window-item>
</template>

<script>
export default {
  name: "vFormItem",
  props: {
    image: {
      type: String,
      default: "",
    },
    hasDescription: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
.v-form-item {
  &__header {
    display: flex;
    align-items: center;
    grid-gap: 10px;
  }

  &__image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 30px;
    height: 30px;
  }

  &__title {
    color: var(--v-primary-text-3-base);
  }

  &__description {
    color: var(--v-primary-text-2-base);
    margin-top: 10px !important;
  }

  &__offer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    grid-gap: 10px;
    width: 95%;
    margin: 20px auto;
  }
}
</style>
