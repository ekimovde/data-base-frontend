<template>
  <ul class="v-button-quiz pa-0">
    <li v-for="(item, index) in items" :key="index">
      <vButton
        v-bind="$attrs"
        class="v-button-quiz__button"
        background-color="primary-background-3"
        :width="230"
        :text-color="color(item.value, 'primary-text-2')"
        :icon-color="color(item.value, 'primary-text-3')"
        :icon="item.icon"
        @click="$emit('click', item.value)"
      >
        <div class="v-button-quiz__wrapper">
          <p class="v-button-quiz__text">
            {{ item.text }}
          </p>

          <i
            class="v-button-quiz__icon bx bx-chevron-right"
            :class="{ 'v-button-quiz__icon_active': item.value === value }"
          />
        </div>
      </vButton>
    </li>
  </ul>
</template>

<script>
import vButton from '@/components/button/vButton'

export default {
  name: 'vButtonQuiz',
  components: { vButton },
  props: {
    items: {
      type: Array,
      required: false,
    },
    value: {
      type: [String, Boolean],
      required: true,
    },
  },
  methods: {
    color(currentValue, color) {
      return currentValue === this.value ? 'primary-green-1' : color
    },
  },
}
</script>

<style lang="scss">
.v-button-quiz {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;

  &__button {
    width: 100%;
    border: 1px solid var(--v-primary-background-4-base);

    .v-btn__content {
      justify-content: start;
      grid-gap: 10px;
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__text {
    font-size: 13px;
    max-width: 135px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  &__icon {
    font-size: 20px;
    color: var(--v-primary-text-2-base);
    margin-left: 10px;

    &_active {
      color: var(--v-primary-green-1-base);
    }
  }
}
</style>
