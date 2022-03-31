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
            <div>{{ row.id }}</div>
          </template>
        </vTableColumn>

        <vTableColumn prop="table" title="Таблица">
          <template slot-scope="{ row }">
            {{ row.table }}
          </template>
        </vTableColumn>

        <vTableColumn prop="user" title="Пользователь">
          <template slot-scope="{ row }">
            {{ row.user }}
          </template>
        </vTableColumn>

        <vTableColumn prop="action" title="Действие">
          <template slot-scope="{ row }">
            {{ row.action }}
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

import Service from "../service/Service";

export default {
  name: "AuditPage",
  components: { vLoader, vTable, vTableColumn },
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
}
</style>
