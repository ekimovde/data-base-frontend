<template>
  <div class="schedule-modal-add">
    <v-dialog
      max-width="fit-content"
      :value="value"
      :overlay-color="$vuetify.theme.themes.light['primary-black-1']"
      :persistent="service.loading"
      @input="service.onCloseDialog()"
    >
      <vForm :has-steps="false">
        <vFormItem :value="1">
          <template #title> Добавление расписания </template>

          <template #description> Заполните все необходимые поля! </template>

          <template #content>
            <vInputMix
              v-model="service.form.doctor"
              icon="bx bx-user bx-tada"
              placeholder="Введите имя доктора"
              :invalid="$v.service.form.doctor.$invalid"
            />

            <vInputMix
              v-model="service.form.doctorPosition"
              icon="bx bxl-docker bx-tada"
              placeholder="Введите должность врача"
              :invalid="$v.service.form.doctorPosition.$invalid"
            />

            <vInputMix
              v-model="service.form.workingDays"
              icon="bx bx-data bx-tada"
              placeholder="Введите рабочие дни (пн-пт)"
              :invalid="$v.service.form.workingDays.$invalid"
            />

            <vInputMix
              v-model="service.form.workingHours"
              icon="bx bx-time bx-tada"
              placeholder="Введите рабочее время (8:00-18:00)"
              :invalid="$v.service.form.workingHours.$invalid"
            />
          </template>
        </vFormItem>

        <template #buttons>
          <vButton
            background-color="primary-blue-1"
            text-color="primary-white-1"
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
import { required } from "vuelidate/lib/validators";

import vForm from "@/components/form/vForm";
import vFormItem from "@/components/form/vFormItem";
import vInputMix from "@/components/input/vInputMix";
import vButton from "@/components/button/vButton";

import Service from "../service/ServiceAdd";

export default {
  name: 'ScheduleModalAdd',
  components: { vForm, vFormItem, vInputMix, vButton },
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
    return {
      service: {
        form: {
          doctor: { required },
          doctorPosition: { required },
          workingDays: { required },
          workingHours: { required },
        },
      },
    };
  },
}
</script>

<style lang="scss">
.schedule-modal-add {
  //
}
</style>