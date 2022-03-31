<template>
  <div class="home-page">
    <div class="home-page__top">
      <h2 class="home-page__title">Главная</h2>

      <vButton
        v-if="service.hasAdminRole()"
        background-color="primary-green-1"
        text-color="primary-white-1"
        @click="service.showModalAdd = true"
      >
        Добавить пользователя
      </vButton>
    </div>

    <div class="home-page__wrapper">
      <vLoader
        v-if="service.loading"
        :is-loading="service.loading"
        :is-error="false"
      />

      <vTable v-else :rows="service.getUsersCorrect()">
        <vTableColumn prop="id" title="ID">
          <template slot-scope="{ row }">
            <div>{{ row.id }}</div>
          </template>
        </vTableColumn>

        <vTableColumn
          v-if="service.hasAdminRole()"
          prop="email"
          title="Email"
        />

        <vTableColumn prop="role" title="Роль">
          <template slot-scope="{ row }">
            {{ row.role }}
          </template>
        </vTableColumn>

        <vTableColumn
          v-if="service.hasAdminDoctorRole()"
          prop="age"
          title="Возраст"
        >
          <template slot-scope="{ row }">
            <div>{{ row.user_patient ? row.user_patient.age : "---" }}</div>
          </template>
        </vTableColumn>

        <vTableColumn
          v-if="service.hasDoctorRole()"
          prop="disease"
          title="Болезнь"
        >
          <template slot-scope="{ row }">
            <div v-if="row.user_patient">
              {{
                row.user_patient.disease
                  ? row.user_patient.disease
                  : "Нет болезни"
              }}
            </div>

            <div v-else>---</div>
          </template>
        </vTableColumn>

        <vTableColumn prop="createdAt" title="Дата создания" />

        <vTableColumn prop="updatedAt" title="Дата обновления" />

        <vTableColumn
          v-if="service.hasAdminDoctorRole()"
          prop=""
          title="Действия"
        >
          <template slot-scope="{ row }">
            <div v-if="row.role === 'PATIENT'">
              <vButton
                v-if="service.hasDoctorRole()"
                small
                icon="bx bx-pencil"
                :icon-size="14"
                :size="25"
                @click="service.onEdit(row)"
              />

              <vButton
                v-if="service.hasAdminRole()"
                small
                icon="bx bx-trash"
                icon-color="primary-red-1"
                text-color="primary-red-1"
                :icon-size="14"
                :size="25"
                @click="service.onRemove(row.id)"
              />
            </div>

            <div v-else>---</div>
          </template>
        </vTableColumn>
      </vTable>
    </div>

    <HomeModalAdd v-model="service.showModalAdd" />
    <HomeModalEdit
      v-model="service.showModalEdit"
      :user="service.user"
      @input="service.onCloseEdit()"
    />
  </div>
</template>

<script>
import vTable from "@/components/table/vTable";
import vTableColumn from "@/components/table/vTableColumn";
import vButton from "@/components/button/vButton";
import vLoader from "@/components/vLoader";
import HomeModalAdd from "../components/HomeModalAdd";
import HomeModalEdit from "../components/HomeModalEdit";

import Service from "../service/Service";

export default {
  name: "HomePage",
  components: {
    vTable,
    vTableColumn,
    vButton,
    vLoader,
    HomeModalAdd,
    HomeModalEdit,
  },
  data() {
    return {
      service: new Service(this),
    };
  },
  async mounted() {
    await this.service.fetchUsers();
  },
};
</script>

<style lang="scss">
.home-page {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    width: 100%;
  }

  &__title {
    color: var(--v-primary-text-3-base);
    margin-right: auto;
  }

  &__wrapper {
    width: 100%;
    max-width: 80%;
  }

  &__button {
    margin-right: 5px;
  }
}
</style>
