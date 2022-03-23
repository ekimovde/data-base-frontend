<template>
  <popover v-bind="$attrs" class="v-popover"> {{ text }} </popover>
</template>

<script>
export default {
  name: 'vPopover',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.v-popover {
  &.vue-popover {
    background: var(--v-primary-background-2-base);
    color: var(--v-primary-text-3-base);
    font-size: 13px;
    padding: 6px 10px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.3));
    width: auto !important;

    &.dropdown-position-top {
      &::before {
        border-top-color: var(--v-primary-background-2-base);
      }
    }

    &.dropdown-position-bottom {
      &::before {
        border-bottom-color: var(--v-primary-background-2-base);
      }
    }

    &.dropdown-position-left {
      &::before {
        border-left-color: var(--v-primary-background-2-base);
      }
    }

    &.dropdown-position-right {
      &::before {
        border-right-color: var(--v-primary-background-2-base);
      }
    }
  }
}
</style>
