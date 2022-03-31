<template>
  <v-btn
    class="v-button"
    elevation="0"
    :outlined="outlined"
    :style="{
      color: vuetifyTextColor,
      background: vuetifyBackgroundColor,
      'border-color': vuetifyBorderColor,
    }"
    :class="{ 'v-button_primary': backgroundColor === 'primary-blue-1' }"
    v-bind="bindedAttrs"
    v-on="$listeners"
  >
    <i
      v-if="icon"
      :class="[icon]"
      :style="{
        'font-size': iconSize + 'px',
        color: vuetifyIconColor,
      }"
    />

    <slot />
  </v-btn>
</template>

<script>
export default {
  name: "vButton",
  props: {
    textColor: {
      type: String,
      default: "primary-text-3",
    },
    backgroundColor: {
      type: String,
      default: "primary-transparent",
    },
    borderColor: {
      type: String,
      default: "",
    },
    iconColor: {
      type: String,
      default: "primary-text-3",
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    iconSize: {
      type: Number,
      default: 16,
    },
    size: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    vuetifyTextColor() {
      return this.$vuetify.theme.themes.light[this.textColor];
    },
    vuetifyBackgroundColor() {
      if (this.backgroundColor === "primary-transparent")
        return "hsla(0, 0%, 0%, 0)";

      return this.$vuetify.theme.themes.light[this.backgroundColor];
    },
    vuetifyBorderColor() {
      return this.$vuetify.theme.themes.light[this.borderColor];
    },
    vuetifyIconColor() {
      return this.$vuetify.theme.themes.light[this.iconColor];
    },
    sizeAttrs() {
      if (this.size)
        return {
          "min-width": this.size,
          "min-height": this.size,
          height: this.size,
          width: this.size,
        };

      return {};
    },
    bindedAttrs() {
      return {
        ...this.$attrs,
        ...this.sizeAttrs,
      };
    },
  },
};
</script>

<style lang="scss">
.v-button {
  .v-progress-circular {
    width: 18px !important;
    height: 18px !important;
  }

  &.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn-outlined) {
    background-color: var(--v-primary-background-3-base) !important;
    color: var(--v-primary-red-1-base) !important;
  }

  &_primary {
    &.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn-outlined) {
      background-color: var(--v-primary-blue-1-base) !important;
      color: var(--v-primary-white-1-base) !important;
      opacity: 0.6;
    }
  }
}
</style>
