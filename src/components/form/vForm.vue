<template>
  <div class="v-form" :style="{ width: width + 'px' }">
    <v-window :value="step">
      <slot />
    </v-window>

    <vCircleStep v-if="hasSteps" :step="step" :steps="steps" />

    <div v-if="hasButtons" class="v-form__buttons">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script>
import vCircleStep from "@/components/vCircleStep";

export default {
  name: "vForm",
  components: { vCircleStep },
  props: {
    step: {
      type: Number,
      default: 1,
    },
    steps: {
      type: Number,
      default: 1,
    },
    hasSteps: {
      type: Boolean,
      default: true,
    },
    hasButtons: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
      default: 360,
    },
  },
};
</script>

<style lang="scss">
.v-form {
  background: var(--v-primary-background-2-base);
  border-radius: 10px;
  padding: 20px;

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
