<template>
  <div class="profile-form-item">
    <div>
      <h4 class="profile-form-item__label">
        <slot name="label" />
      </h4>

      <div class="profile-form-item__description">
        <slot name="description" />
      </div>
    </div>

    <slot name="functional" />
  </div>
</template>

<script>
export default {
  name: 'ProfileFormItem',
}
</script>

<style lang="scss">
.profile-form-item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  align-items: center;
  text-align: left;
  margin-bottom: 15px;

  &__label {
    color: var(--v-primary-text-3-base);
    font-size: 14px;
    margin-bottom: 5px;
  }

  &__description {
    color: var(--v-primary-text-2-base);
    font-size: 13px;
    font-weight: 400;
  }
}
</style>
