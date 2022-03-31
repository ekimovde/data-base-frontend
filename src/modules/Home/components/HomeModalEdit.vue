<template>
  <div class="home-modal-add">
    <v-dialog
      max-width="fit-content"
      :value="value"
      :overlay-color="$vuetify.theme.themes.light['primary-black-1']"
      :persistent="service.loading"
      @input="service.onCloseDialog()"
    >
      <vForm :has-steps="false">
        <vFormItem :value="1">
          <template #title> Редактирование аккаунта </template>

          <template #description> Измените все необходимые поля! </template>

          <template #content>
            <vInputMix
              v-model="service.form.age"
              icon="bx bx-user bx-tada"
              placeholder="Введите возраст"
              :invalid="$v.service.form.age.$invalid"
            />

            <vInputMix
              v-model="service.form.disease"
              icon="bx bx-git-commit bx-tada"
              placeholder="Введите болезнь"
            />
          </template>
        </vFormItem>

        <template #buttons>
          <vButton
            background-color="primary-blue-1"
            text-color="primary-white-1"
            :loading="service.loading"
            :disabled="service.isDisabled()"
            @click="service.onSend()"
          >
            Изменить
          </vButton>
        </template>
      </vForm>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";

import vForm from "@/components/form/vForm";
import vFormItem from "@/components/form/vFormItem";
import vInputMix from "@/components/input/vInputMix";
import vButton from "@/components/button/vButton";
import vButtonRadio from "@/components/button/vButtonRadio";

import Service from "../service/ServiceEdit";

export default {
  name: "HomeModalAdd",
  components: { vForm, vFormItem, vInputMix, vButton, vButtonRadio },
  mixins: [validationMixin],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      service: new Service(this),
    };
  },
  validations: {
    service: {
      form: {
        age: { required, numeric },
      },
    },
  },
  watch: {
    value(value) {
      if (value) this.service.form = { ...this.user };
    },
  },
};
</script>

<style lang="scss">
.home-modal-add {
  //
}
</style>
