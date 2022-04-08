import _ from "lodash";
import moment from "moment";

export default class Service {
  constructor(context) {
    this.context = context
    this.$store = context.$store;

    this.loading = false
    this.showModalAdd = false
  }

  isSchedulesEmpty() {
    return _.isEmpty(this.getSchedules());
  }

  getSchedules() {
    return this.$store.state.schedule.schedules;
  }

  getSchedulesCorrect() {
    return this.getSchedules().map((item) => ({
      ...item,
      updatedAt: moment(item.updatedAt).format("DD.MM.YYYY HH:mm"),
    }));
  }

  hasDoctorRole() {
    return this.$store.getters["profile/GET_ROLE"] === "DOCTOR";
  }

  async fetchSchedules() {
    if (this.isSchedulesEmpty()) {
      this.loading = true;
      await this.$store.dispatch("schedule/GET_SCHEDULES");
      this.loading = false;
    }
  }
}