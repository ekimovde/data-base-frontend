<template>
  <div class="default-layout">
    <vNavbar />
    <router-view />
    <vNavigationMenu />
    <vBoardBan :value="isShowBoard" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import vNavbar from "@/components/vNavbar";
import vNavigationMenu from "@/components/vNavigationMenu";
import vBoardBan from "@/components/board/vBoardBan";

export default {
  name: "DefaultLayout",
  components: { vNavbar, vNavigationMenu, vBoardBan },
  computed: {
    ...mapState("profile", ["profile"]),

    isShowBoard() {
      return this.profile.active === false;
    },
  },
};
</script>

<style lang="scss">
.default-layout {
  height: 100vh;
}
</style>
