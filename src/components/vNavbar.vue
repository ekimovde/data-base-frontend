<template>
  <div class="v-navbar">
    <vBrand />

    <router-link to="/profile">
      <vButton background-color="primary-background-3"> Профиль </vButton>
    </router-link>
  </div>
</template>

<script>
import vBrand from "@/components/vBrand";
import vButton from "@/components/button/vButton";

export default {
  name: "vNavbar",
  components: { vBrand, vButton },
};
</script>

<style lang="scss">
.v-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--v-primary-background-2-base);
  padding: 15px 30px;
}
</style>
