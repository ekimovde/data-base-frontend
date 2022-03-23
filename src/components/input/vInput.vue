<template>
  <div class="v-input">
    <div v-if="hasBeforeIcon" class="v-input__icon v-input__icon_before">
      <slot name="before" />
    </div>

    <input
      class="v-input__field"
      :class="{ 'v-input__field_disabled': $attrs.disabled }"
      :value="value"
      :placeholder="placeholder"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="onSend"
    />

    <div v-if="hasAfterIcon" class="v-input__icon v-input__icon_after">
      <slot name="after" />
    </div>
  </div>
</template>

<script>
import vButton from "@/components/button/vButton";

export default {
  name: "vInput",
  components: {
    vButton,
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
    hasBeforeIcon: {
      type: Boolean,
      default: true,
    },
    hasAfterIcon: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onSend() {
      if (this.value) this.$emit("send", this.value);
    },
  },
};
</script>

<style lang="scss">
.v-input {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  &__icon {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    &_before {
      left: 10px;
    }

    &_after {
      right: 10px;
    }
  }

  &__field {
    width: 100%;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 13px;
    padding: 11px 40px;
    background-color: var(--v-primary-background-3-base);
    border: 1px solid var(--v-primary-background-4-base);
    color: var(--v-primary-text-3-base);
    border-radius: 5px;

    height: 100%;
    max-height: 39px !important;
    transition: all 0.35s ease;
    cursor: pointer;

    &_disabled {
      color: var(--v-primary-text-2-base);
      cursor: default;
    }

    &:focus {
      border-color: var(--v-primary-blue-1-base);
      box-shadow: 0px 0px 4px rgba(0, 132, 255, 0.6);
    }

    &::placeholder {
      color: var(--v-primary-text-2-base);
      font-weight: 500;
    }
  }
}
</style>
