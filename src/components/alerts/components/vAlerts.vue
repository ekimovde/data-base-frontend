<template>
  <div class="v-alerts">
    <ul class="v-alerts__list" v-if="!service.isAlertsEmpty()">
      <li
        class="v-alerts__item"
        v-for="alert in service.getAlerts()"
        :key="alert.id"
      >
        <div class="v-alerts__wrapper">
          <img
            class="v-alerts__image"
            :src="require(`@/assets/${service.getImage(alert.status)}`)"
          />

          <div>
            <h5
              class="v-alerts__title"
              :class="[`v-alerts__title_${alert.status}`]"
            >
              {{ alert.title }}
            </h5>

            <p class="v-alerts__text">{{ alert.text }}</p>
          </div>
        </div>

        <vButton
          small
          icon="bx bx-x"
          icon-color="primary-text-2"
          :size="26"
          :icon-size="20"
          @click="service.onClose(alert.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import vButton from "@/components/button/vButton";

import Service from "../service/Service";

export default {
  name: "vAlerts",
  components: {
    vButton,
  },
  data() {
    return {
      service: new Service(this),
    };
  },
};
</script>

<style lang="scss">
.v-alerts {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  min-width: 300px;

  &__list {
    display: grid;
    grid-row-gap: 10px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--v-primary-background-2-base);
    border: 1px solid var(--v-primary-background-3-base);
    border-radius: 5px;
    padding: 10px 15px;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  &__image {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  &__title {
    font-size: 14px;
    margin-bottom: 5px;

    &_success {
      color: var(--v-primary-green-1-base);
    }

    &_warning {
      color: var(--v-primary-yellow-1-base);
    }

    &_error {
      color: var(--v-primary-red-1-base);
    }
  }

  &__text {
    font-size: 13px;
    color: var(--v-primary-text-2-base);
  }
}
</style>
