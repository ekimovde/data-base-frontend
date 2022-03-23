<template>
  <div class="profile-edit">
    <vHeader icon="bx bx-hash" title="Данные пользователя" />

    <ProfileForm :min-height="238" :is-loading="service.loading">
      <ProfileFormItem>
        <template #label>Имя пользователя</template>

        <template #description>Ваше имя в приложении.</template>

        <template #functional>
          <vInputMix
            v-model="service.profile.name"
            icon="bx bx-face bx-tada"
            placeholder="Имя пользователя"
            :disabled="true"
          />
        </template>
      </ProfileFormItem>

      <ProfileFormItem>
        <template #label>Email</template>

        <template #description>
          Ваш Email, на который поступают уведомления.
        </template>

        <template #functional>
          <vInputMix
            v-model="service.profile.email"
            icon="bx bxl-mailchimp bx-tada"
            placeholder="Email"
            :disabled="true"
          />
        </template>
      </ProfileFormItem>

      <ProfileFormItem>
        <template #label>ID</template>

        <template #description> Это Ваш уникальный идентификатор. </template>

        <template #functional>
          <vInputMix
            v-model="service.profile.id"
            icon="bx bx-map-pin bx-tada"
            placeholder="ID"
            :disabled="true"
          />
        </template>
      </ProfileFormItem>

      <ProfileFormItem v-if="service.profile.role === 'PATIENT'">
        <template #label>Возраст</template>

        <template #description> Ваш полный возраст. </template>

        <template #functional>
          <vInputMix
            v-model="service.profile.age"
            icon="bx bx-bug-alt bx-tada"
            placeholder="Возраст"
            :disabled="true"
          />
        </template>
      </ProfileFormItem>

      <ProfileFormItem v-if="service.profile.role === 'PATIENT'">
        <template #label>Болезнь</template>

        <template #description>
          Этот диагноз прописывает Ваш лачащий врач.
        </template>

        <template #functional>
          <vInputMix
            v-model="service.profile.disease"
            icon="bx bxs-virus bx-tada"
            placeholder="Название болезни"
            :disabled="true"
          />
        </template>
      </ProfileFormItem>

      <ProfileFormItem>
        <template #label>Роль</template>

        <template #description>
          Роль даёт Вам определенные права и действия в приложении.
        </template>

        <template #functional>
          <vButtonRadio
            :value="service.profile.role"
            :items="service.getRoleItems()"
          />
        </template>
      </ProfileFormItem>

      <template #buttons>
        <div class="profile-edit__bottom">
          <vButton background-color="primary-red-1" @click="service.onLogout()">
            Выйти
          </vButton>
        </div>
      </template>
    </ProfileForm>
  </div>
</template>

<script>
import Service from "../service/Service";

import vHeader from "@/components/vHeader";
import vInputMix from "@/components/input/vInputMix";
import vButton from "@/components/button/vButton";
import vButtonRadio from "@/components/button/vButtonRadio";

import ProfileForm from "./ProfileForm";
import ProfileFormItem from "./ProfileFormItem";

export default {
  name: "ProfileEdit",
  fetchOnServer: false,
  components: {
    vHeader,
    vInputMix,
    vButton,
    vButtonRadio,
    ProfileForm,
    ProfileFormItem,
  },
  data() {
    return {
      service: new Service(this),
    };
  },
  async mounted() {
    await this.service.onFetch();
  },
};
</script>

<style lang="scss">
.profile-edit {
  width: 100%;

  &__bottom {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
