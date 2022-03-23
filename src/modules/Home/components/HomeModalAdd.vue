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
        <vFormItem :value="1" image="basketball.png">
          <template #title> Решили добавить аккаунт? </template>

          <template #description>
            Выберите роль и заполните все необходимые поля!
          </template>

          <template #content>
            <vInputMix
              v-model="service.form.email"
              icon="bx bx-package bx-tada"
              placeholder="Введите Email"
              :invalid="$v.service.form.email.$invalid"
            />

            <vInputMix
              type="password"
              v-model="service.form.password"
              icon="bx bx-key bx-tada"
              placeholder="Введите пароль"
              :invalid="$v.service.form.password.$invalid"
            />

            <vInputMix
              v-model="service.form.name"
              icon="bx bx-user bx-tada"
              placeholder="Введите имя"
              :invalid="$v.service.form.name.$invalid"
            />

            <vInputMix
              v-if="service.form.role === 'PATIENT'"
              v-model="service.form.age"
              icon="bx bx-git-commit bx-tada"
              placeholder="Введите возраст"
              :invalid="$v.service.form.age.$invalid"
            />

            <vButtonRadio
              v-model="service.form.role"
              :items="service.roleItems"
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
import { required, email, minLength, numeric } from "vuelidate/lib/validators";

import vForm from "@/components/form/vForm";
import vFormItem from "@/components/form/vFormItem";
import vInputMix from "@/components/input/vInputMix";
import vButton from "@/components/button/vButton";
import vButtonRadio from "@/components/button/vButtonRadio";

import Service from "../service/ServiceAdd";

export default {
  name: "HomeModalAdd",
  components: { vForm, vFormItem, vInputMix, vButton, vButtonRadio },
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
    const { role } = this.service.form;
    const validations = {
      service: {
        form: {
          email: { required, email },
          password: { required, minLength: minLength(6) },
          name: { required, minLength: minLength(3) },
          role: { required },
        },
      },
    };

    if (role === "PATIENT")
      validations.service.form.age = {
        required,
        numeric,
        minLength: minLength(1),
      };

    return validations;
  },
};
</script>

<style lang="scss">
.home-modal-add {
  //
}
</style>
