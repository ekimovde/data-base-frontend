<template>
  <div class="clear-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "ClearLayout",
};
</script>

<style lang="scss">
.clear-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
