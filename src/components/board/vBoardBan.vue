<template>
  <div class="v-modal-welcome">
    <v-dialog
      persistent
      max-width="400"
      :value="value"
      :overlay-opacity="1"
      :overlay-color="$vuetify.theme.themes.light['primary-white-1']"
    >
      <vBoard :step="1" :steps="1">
        <vBoardItem :value="1" :has-header="false">
          <template #subtitle> Проверка доступа </template>

          <template #title> Добро пожаловать в Медицину! </template>

          <template #description>
            Мы рады видеть Вас! <br />
            Ваш профиль заблокирован, обратитесь к Администратору!
          </template>
        </vBoardItem>

        <template #buttons>
          <vButton
            background-color="primary-red-1"
            text-color="primary-white-1"
            @click="onLogout"
          >
            Выйти
          </vButton>
        </template>
      </vBoard>
    </v-dialog>
  </div>
</template>

<script>
import vBoard from "./vBoard";
import vBoardItem from "./vBoardItem";
import vButton from "@/components/button/vButton";

export default {
  name: "vModalWelcome",
  components: {
    vBoard,
    vBoardItem,
    vButton,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async onLogout() {
      this.$store.dispatch("auth/LOGOUT");
    },
  },
};
</script>

<style lang="scss">
.v-modal-welcome {
  //
}
</style>
