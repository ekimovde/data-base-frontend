<template>
  <div class="v-brand">
    <vLogo class="v-brand__logo" :size="30" />

    <h2 class="v-brand__title">Medical</h2>
  </div>
</template>

<script>
import vLogo from "@/components/vLogo";

export default {
  name: "vBrand",
  components: { vLogo },
};
</script>

<style lang="scss">
.v-brand {
  display: flex;
  align-items: center;

  &__logo {
    margin-right: 15px;
  }

  &__title {
    color: var(--v-primary-text-3-base);
  }
}
</style>
