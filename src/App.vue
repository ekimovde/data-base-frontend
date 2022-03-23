<template>
  <v-app id="app">
    <component v-if="layout" :is="layout"></component>
    <vAlerts />
  </v-app>
</template>

<script>
import vAlerts from "@/components/alerts/components/vAlerts";

import LayoutTypes from "@/layouts/types/LayoutTypes";

const layoutTypes = new LayoutTypes();
const components = {};

layoutTypes.getTypes().forEach((type) => {
  components[type.type] = type.view;
});

export default {
  name: "App",
  components: { ...components, vAlerts },
  computed: {
    layout() {
      if (this.$route.meta.layout) return `layout-${this.$route.meta.layout}`;
    },
  },
};
</script>
