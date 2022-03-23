<template>
  <div class="auth-page">
    <vForm :width="400" :step="service.step" :steps="service.steps">
      <vFormItem :value="1" image="hi.png">
        <template #title> Добро пожаловать! </template>

        <template #description>
          Мы рады видеть Вас на борту! Теперь Вам осталось войти в свою учетную
          запись!
        </template>

        <template #content>
          <vInputMix
            v-model="service.login.email"
            icon="bx bx-package bx-tada"
            placeholder="Введите Email"
            :invalid="$v.service.login.email.$invalid"
          />

          <vInputMix
            type="password"
            v-model="service.login.password"
            icon="bx bx-key bx-tada"
            placeholder="Введите пароль"
            :invalid="$v.service.login.password.$invalid"
          />
        </template>
      </vFormItem>

      <vFormItem :value="2" image="bag-money.png">
        <template #title> Решили создать аккаунт? </template>

        <template #description>
          Выберите роль и заполните все необходимые поля!
        </template>

        <template #content>
          <vInputMix
            v-model="service.registration.email"
            icon="bx bx-package bx-tada"
            placeholder="Введите Email"
            :invalid="$v.service.registration.email.$invalid"
          />

          <vInputMix
            type="password"
            v-model="service.registration.password"
            icon="bx bx-key bx-tada"
            placeholder="Введите пароль"
            :invalid="$v.service.registration.password.$invalid"
          />

          <vInputMix
            v-model="service.registration.name"
            icon="bx bx-user bx-tada"
            placeholder="Введите имя"
            :invalid="$v.service.registration.name.$invalid"
          />

          <vInputMix
            v-if="service.registration.role === 'PATIENT'"
            v-model="service.registration.age"
            icon="bx bx-git-commit bx-tada"
            placeholder="Введите возраст"
            :invalid="$v.service.registration.age.$invalid"
          />

          <vButtonRadio
            v-model="service.registration.role"
            :items="service.roleItems"
          />
        </template>
      </vFormItem>

      <template #buttons>
        <div class="auth-page__bottom">
          <vButton
            class="text-uppercase"
            block
            background-color="primary-blue-1"
            :loading="service.loading"
            :disabled="service.isDisabled()"
            @click="service.onSend()"
          >
            {{ service.step === 1 ? "Войти" : "Зарегистрироваться" }}
          </vButton>

          <div v-if="service.step === 1" class="auth-page__link">
            Нет аккаунта?
            <span @click="service.onChangeStep(2)">Зарегистрироваться.</span>
          </div>

          <div v-else class="auth-page__link">
            Есть аккаунт?
            <span @click="service.onChangeStep(1)">Авторизоваться.</span>
          </div>
        </div>
      </template>
    </vForm>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength, numeric } from "vuelidate/lib/validators";

import Service from "../service/Service";

import vForm from "@/components/form/vForm";
import vFormItem from "@/components/form/vFormItem";
import vInputMix from "@/components/input/vInputMix";
import vButton from "@/components/button/vButton";
import vButtonRadio from "@/components/button/vButtonRadio";

export default {
  name: "AuthPage",
  components: { vForm, vFormItem, vInputMix, vButton, vButtonRadio },
  mixins: [validationMixin],
  data() {
    return {
      service: new Service(this),
    };
  },
  validations() {
    const { role } = this.service.registration;
    const validations = {
      service: {
        login: {
          email: { required, email },
          password: { required },
        },
        registration: {
          email: { required, email },
          password: { required, minLength: minLength(6) },
          name: { required, minLength: minLength(3) },
          role: { required },
        },
      },
    };

    if (role === "PATIENT")
      validations.service.registration.age = {
        required,
        numeric,
        minLength: minLength(1),
      };

    return validations;
  },
};
</script>

<style lang="scss">
.auth-page {
  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  &__link {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: var(--v-primary-text-3-base);
    margin-top: 10px;

    span {
      display: block;
      cursor: pointer;
      color: var(--v-primary-blue-1-base);
      margin-left: 5px;
      font-size: 13px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
