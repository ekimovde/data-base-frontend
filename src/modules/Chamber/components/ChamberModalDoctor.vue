<template>
  <div class="chamber-modal-doctor">
    <v-dialog
      max-width="fit-content"
      :value="value"
      :overlay-color="$vuetify.theme.themes.light['primary-black-1']"
      :persistent="service.loading"
      @input="service.onCloseDialog()"
    >
      <vForm :has-steps="false">
        <vFormItem :value="1" image="football.png">
          <template #title> Решили добавить доктора? </template>

          <template #description> Заполните все необходимые поля! </template>

          <template #content>
            <vInputMix
              v-model="service.form.id"
              icon="bx bx-cube bx-tada"
              placeholder="Введите ID"
              :disabled="true"
            />

            <vInputMix
              v-model="service.form.email"
              icon="bx bx-envelope bx-tada"
              placeholder="Введите Email доктора"
              :invalid="$v.service.form.email.$invalid"
            />
          </template>
        </vFormItem>

        <template #buttons>
          <vButton
            background-color="primary-blue-1"
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
import { required, email } from "vuelidate/lib/validators";

import vForm from "@/components/form/vForm";
import vFormItem from "@/components/form/vFormItem";
import vInputMix from "@/components/input/vInputMix";
import vButton from "@/components/button/vButton";

import Service from "../service/ServiceDoctor";

export default {
  name: "ChamberModalDoctor",
  components: { vForm, vFormItem, vInputMix, vButton },
  mixins: [validationMixin],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    chamberId: {
      type: Number,
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
          email: { required, email },
        },
      },
    };
  },
  watch: {
    value(value) {
      if (value) this.service.form.id = this.chamberId;
    },
  },
};
</script>

<style lang="scss">
.chamber-modal-doctor {
  //
}
</style>
