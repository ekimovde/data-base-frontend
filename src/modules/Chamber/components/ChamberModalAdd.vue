<template>
  <div class="chamber-modal-add">
    <v-dialog
      max-width="fit-content"
      :value="value"
      :overlay-color="$vuetify.theme.themes.light['primary-black-1']"
      :persistent="service.loading"
      @input="service.onCloseDialog()"
    >
      <vForm :has-steps="false">
        <vFormItem :value="1">
          <template #title> Редактирование палаты </template>

          <template #description> Заполните все необходимые поля! </template>

          <template #content>
            <vInputMix
              v-model="service.form.name"
              icon="bx bx-bold bx-tada"
              placeholder="Введите название"
              :invalid="$v.service.form.name.$invalid"
            />

            <vInputMix
              v-model="service.form.email"
              icon="bx bx-envelope bx-tada"
              placeholder="Введите Email пациента"
              :invalid="$v.service.form.email.$invalid"
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
            Добавить
          </vButton>
        </template>
      </vForm>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

import vForm from "@/components/form/vForm";
import vFormItem from "@/components/form/vFormItem";
import vInputMix from "@/components/input/vInputMix";
import vButton from "@/components/button/vButton";

import Service from "../service/ServiceAdd";

export default {
  name: "ChamberModalAdd",
  components: { vForm, vFormItem, vInputMix, vButton },
  mixins: [validationMixin],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      service: new Service(this),
    };
  },
  validations() {
    return {
      service: {
        form: {
          name: { required, minLength: minLength(1) },
          email: { email },
        },
      },
    };
  },
};
</script>

<style lang="scss">
.chamber-modal-add {
  //
}
</style>
