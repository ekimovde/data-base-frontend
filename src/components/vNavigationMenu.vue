<template>
  <div class="v-navigation-menu">
    <ul class="v-navigation-menu__list">
      <li
        v-popover.top="{ name: item.name }"
        v-for="(item, index) in navigationItems"
        :key="index"
      >
        <router-link
          class="v-navigation-menu__link"
          exact
          :to="{ name: item.name, params: item.params }"
        >
          <vButton
            small
            icon-color="primary-text-3"
            :size="30"
            :icon="item.icon"
            :icon-size="18"
          />
        </router-link>

        <vPopover :name="item.name" :text="item.text" event="hover" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import vButton from "@/components/button/vButton";
import vPopover from "@/components/popover/vPopover";

export default {
  name: "vNavigationMenu",
  components: { vButton, vPopover },
  computed: {
    ...mapGetters("profile", ["GET_ROLE"]),

    navigationItems() {
      let routes = [
        { icon: "bx bx-compass", name: "home", text: "Главная" },
        { icon: "bx bx-accessibility", name: "chamber", text: "Палаты" },
      ];

      if (this.GET_ROLE === "ADMIN")
        routes.push({ icon: "bx bx-area", name: "audit", text: "Аудит" });

      return routes;
    },
  },
};
</script>

<style lang="scss">
.v-navigation-menu {
  position: fixed;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  left: 50%;
  right: 50%;
  bottom: 20px;

  &__list {
    display: flex;
    align-items: center;
    grid-gap: 10px;
    background: var(--v-primary-background-2-base);
    border: 1px solid var(--v-primary-background-3-base);
    border-radius: 6px;
    padding: 8px 12px !important;
    max-width: fit-content;
  }

  &__link {
    &.router-link-active {
      .v-button {
        background-color: var(--v-primary-blue-1-base) !important;
      }
    }
  }
}
</style>
