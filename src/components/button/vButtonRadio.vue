<template>
  <div class="v-button-radio">
    <vButton
      class="v-button-radio__button"
      background-color="primary-background-3"
      v-for="(item, index) in items"
      :class="{ 'v-button-radio__button_active': item.value === value }"
      :key="index"
      :size="40"
      :text-color="item.value === value ? 'primary-green-1' : 'primary-text-1'"
      @click="$emit('input', item.value)"
    >
      <div class="v-button-radio__wrapper">
        <i class="v-button-radio__icon" :class="[item.icon]" />

        <p class="v-button-radio__label">{{ item.label }}</p>
      </div>

      <i
        class="v-button-radio__icon-radio bx bx-radio-circle"
        :class="{
          'bx bx-radio-circle-marked': item.value === value,
        }"
      />
    </vButton>
  </div>
</template>

<script>
import vButton from "@/components/button/vButton";

export default {
  name: "vButtonRadio",
  components: { vButton },
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>

<style lang="scss">
.v-button-radio {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  width: 100%;

  &__button {
    justify-content: space-between;
    width: 100% !important;
    border: 1px solid var(--v-primary-background-4-base);

    &_active {
      i,
      p {
        color: var(--v-primary-green-1-base);
      }
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__icon {
    margin-right: 5px;
    font-size: 18px;

    &-radio {
      font-size: 26px;
    }
  }

  &__label {
    font-size: 13px;
    font-weight: 500;
  }
}
</style>
