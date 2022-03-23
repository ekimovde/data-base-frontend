<template>
  <img :src="require('@/assets/images/logo.png')" :style="style" alt="" />
</template>

<script>
export default {
  name: "vLogo",
  props: {
    size: {
      type: Number,
      required: true,
    },
  },
  computed: {
    style() {
      return {
        width: this.size + "px",
        height: this.size + "px",
      };
    },
  },
};
</script>
