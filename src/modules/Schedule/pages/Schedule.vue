<template>
  <div class="schedule-page">
    <div class="schedule-page__top">
      <h2 class="schedule-page__title">Расписание</h2>

      <vButton
        v-if="service.hasDoctorRole()"
        background-color="primary-green-1"
        text-color="primary-white-1"
        @click="service.showModalAdd = true"
      >
        Добавить расписание
      </vButton>
    </div>

    <div class="schedule-page__wrapper">
      <vLoader
        v-if="service.loading"
        :is-loading="service.loading"
        :is-error="false"
      />

      <vTable v-else :rows="service.getSchedulesCorrect()">
        <vTableColumn prop="id" title="ID">
          <template slot-scope="{ row }">
            <div>{{ row.id }}</div>
          </template>
        </vTableColumn>

        <vTableColumn prop="doctor" title="Имя доктора" />

        <vTableColumn prop="doctorPosition" title="Должность врача" />

        <vTableColumn prop="workingDays" title="Рабочие дни" />

        <vTableColumn prop="workingHours" title="Рабочее время" />
      </vTable>
    </div>

    <ScheduleModalAdd v-model="service.showModalAdd" />
  </div>
</template>

<script>
import vLoader from "@/components/vLoader";
import vTable from "@/components/table/vTable";
import vTableColumn from "@/components/table/vTableColumn";
import vButton from "@/components/button/vButton";
import ScheduleModalAdd from '../components/ScheduleModalAdd'

import Service from '../service/Service'

export default {
  name: 'SchedulePage',
  components: {
    vLoader,
    vTable,
    vTableColumn,
    vButton,
    ScheduleModalAdd
  },
  data() {
    return {
      service: new Service(this)
    }
  },
  async mounted() {
    await this.service.fetchSchedules();
  },
}
</script>

<style lang="scss">
.schedule-page {
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
}
</style>