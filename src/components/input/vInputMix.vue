<template>
  <vInput
    class="v-input-mix"
    v-bind="$attrs"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event)"
    @send="$emit('send', $event)"
  >
    <template #before>
      <i class="v-input-mix__icon" :class="[icon]" />
    </template>

    <template v-if="value" #after>
      <i
        class="bx bx-check v-input-mix__icon v-input-mix__icon_status"
        :class="[`v-input-mix__icon_status_${statusInput}`]"
      />
    </template>
  </vInput>
</template>

<script>
import vInput from "@/components/input/vInput";

export default {
  name: "vInputMix",
  components: {
    vInput,
  },
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    statusInput() {
      return this.invalid ? "error" : "success";
    },
  },
};
</script>

<style lang="scss">
.v-input-mix {
  width: 100%;
  align-items: center !important;

  &__icon {
    font-size: 18px;
    color: var(--v-primary-text-1-base);

    &_loading {
      margin: 0;
    }

    &_status {
      margin: 0;

      &_success {
        color: var(--v-primary-green-1-base);
      }

      &_error {
        color: var(--v-primary-red-1-base);
      }
    }
  }
}
</style>
