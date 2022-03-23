<template>
  <div class="audit-page">
    <h2 class="audit-page__title">Аудит</h2>

    <div class="audit-page__wrapper">
      <vLoader
        v-if="service.loading"
        :is-loading="service.loading"
        :is-error="false"
      />

      <vTable v-else :rows="service.getAuditsCorrect()">
        <vTableColumn prop="id" title="ID">
          <template slot-scope="{ row }">
            <i class="audit-page__icon bx bx-cube" />

            <div>{{ row.id }}</div>
          </template>
        </vTableColumn>

        <vTableColumn prop="table" title="Таблица">
          <template slot-scope="{ row }">
            <vButton
              small
              background-color="primary-yellow-2"
              text-color="primary-yellow-1"
            >
              {{ row.table }}
            </vButton>
          </template>
        </vTableColumn>

        <vTableColumn prop="user" title="Пользователь">
          <template slot-scope="{ row }">
            <vButton
              small
              background-color="primary-green-4"
              text-color="primary-green-1"
            >
              {{ row.user }}
            </vButton>
          </template>
        </vTableColumn>

        <vTableColumn prop="action" title="Действие">
          <template slot-scope="{ row }">
            <vButton
              small
              background-color="primary-blue-4"
              text-color="primary-blue-1"
            >
              {{ row.action }}
            </vButton>
          </template>
        </vTableColumn>

        <vTableColumn prop="description" title="Описание">
          <template slot-scope="{ row }">
            <div class="text-center">{{ row.description }}</div>
          </template>
        </vTableColumn>

        <vTableColumn prop="createdAt" title="Дата создания">
          <template slot-scope="{ row }">
            <div>{{ row.createdAt }}</div>
          </template>
        </vTableColumn>

        <vTableColumn prop="createdAt" title="Дата обновления">
          <template slot-scope="{ row }">
            <div>{{ row.updatedAt }}</div>
          </template>
        </vTableColumn>
      </vTable>
    </div>
  </div>
</template>

<script>
import vLoader from "@/components/vLoader";
import vTable from "@/components/table/vTable";
import vTableColumn from "@/components/table/vTableColumn";
import vButton from "@/components/button/vButton";

import Service from "../service/Service";

export default {
  name: "AuditPage",
  components: { vLoader, vTable, vTableColumn, vButton },
  data() {
    return {
      service: new Service(this),
    };
  },
  async mounted() {
    await this.service.fetchAudits();
  },
};
</script>

<style lang="scss">
.audit-page {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__title {
    color: var(--v-primary-text-3-base);
    margin-bottom: 30px;
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
