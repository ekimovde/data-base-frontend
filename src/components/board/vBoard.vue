<template>
  <div class="v-board">
    <v-window :value="step">
      <slot />
    </v-window>

    <vCircleStep v-if="hasSteps" :steps="steps" :step="step" />

    <div class="v-board__buttons">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script>
import vCircleStep from '@/components/vCircleStep'
import vButton from '@/components/button/vButton'

export default {
  name: 'vBoard',
  components: {
    vCircleStep,
    vButton,
  },
  props: {
    step: {
      type: Number,
      required: true,
    },
    steps: {
      type: Number,
      required: true,
    },
    hasSteps: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss">
.v-board {
  background: var(--v-primary-background-2-base);
  border-radius: 10px;
  width: 500px;
  padding-bottom: 20px;

  &__button {
    margin-right: 10px;
  }

  &__buttons {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
