<template>
  <div class="chamber-page">
    <div class="chamber-page__top">
      <h2 class="chamber-page__title">Палаты</h2>

      <vButton
        v-if="service.hasAdminRole()"
        background-color="primary-violet-1"
        @click="service.showModalAdd = true"
      >
        Добавить палату
      </vButton>
    </div>

    <div class="chamber-page__wrapper">
      <vLoader
        v-if="service.loading"
        :is-loading="service.loading"
        :is-error="false"
      />

      <vTable v-else :rows="service.getChambersCorrect()">
        <vTableColumn prop="id" title="ID">
          <template slot-scope="{ row }">
            <i class="chamber-page__icon bx bx-cube" />

            <div>{{ row.id }}</div>
          </template>
        </vTableColumn>

        <vTableColumn prop="name" title="Название палаты" />

        <vTableColumn
          v-if="service.hasAdminDoctorRole()"
          prop="user_patient"
          title="Пациент"
        >
          <template slot-scope="{ row }">
            <div>{{ row.user_patient ? row.user_patient.name : "---" }}</div>
          </template>
        </vTableColumn>

        <vTableColumn
          v-if="service.hasAdminDoctorRole()"
          prop="user_patient"
          title="Возвраст"
        >
          <template slot-scope="{ row }">
            <div>{{ row.user_patient ? row.user_patient.age : "---" }}</div>
          </template>
        </vTableColumn>

        <vTableColumn
          v-if="service.hasDoctorRole()"
          prop="user_patient"
          title="Болезнь"
        >
          <template slot-scope="{ row }">
            <div>
              {{
                row.user_patient
                  ? row.user_patient.disease
                    ? row.user_patient.disease
                    : "---"
                  : "---"
              }}
            </div>
          </template>
        </vTableColumn>

        <vTableColumn prop="user_doctor" title="Доктор">
          <template slot-scope="{ row }">
            <div>{{ row.user_doctor ? row.user_doctor.name : "---" }}</div>
          </template>
        </vTableColumn>

        <vTableColumn prop="user" title="Дата приема">
          <template slot-scope="{ row }">
            <div>{{ row.updatedAt }}</div>
          </template>
        </vTableColumn>

        <vTableColumn v-if="service.hasAdminRole()" prop="" title="Действия">
          <template slot-scope="{ row }">
            <vButton
              small
              icon="bx bx-pencil"
              :icon-size="14"
              :size="25"
              @click="service.onEdited(row)"
            />

            <vButton
              small
              icon="bx bx-star"
              :icon-size="14"
              :size="25"
              @click="service.onAddDoctor(row.id)"
            />

            <vButton
              small
              icon="bx bx-trash"
              icon-color="primary-red-1"
              text-color="primary-red-1"
              :icon-size="14"
              :size="25"
              @click="service.onRemove(row.id)"
            />
          </template>
        </vTableColumn>
      </vTable>
    </div>

    <ChamberModalAdd v-model="service.showModalAdd" />
    <ChamberModalEdit
      v-model="service.showModalEdit"
      :chamber="service.chamber"
      @input="service.onCloseEdit()"
    />
    <ChamberModalDoctor
      v-model="service.showModalDoctor"
      :chamber-id="service.chamberId"
    />
  </div>
</template>

<script>
import vLoader from "@/components/vLoader";
import vTable from "@/components/table/vTable";
import vTableColumn from "@/components/table/vTableColumn";
import vButton from "@/components/button/vButton";
import ChamberModalAdd from "../components/ChamberModalAdd";
import ChamberModalEdit from "../components/ChamberModalEdit";
import ChamberModalDoctor from "../components/ChamberModalDoctor";

import Service from "../service/Service";

export default {
  name: "ChamberPage",
  components: {
    vLoader,
    vTable,
    vTableColumn,
    vButton,
    ChamberModalAdd,
    ChamberModalEdit,
    ChamberModalDoctor,
  },
  data() {
    return {
      service: new Service(this),
    };
  },
  async mounted() {
    await this.service.fetchChambers();
  },
};
</script>

<style lang="scss">
.chamber-page {
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

  &__icon {
    color: var(--v-primary-text-1-base);
    margin-right: 5px;
    font-size: 16px;
  }
}
</style>
