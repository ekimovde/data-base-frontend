import _ from "lodash";
import moment from "moment";

export default class Service {
  constructor(context) {
    this.context = context;
    this.$store = context.$store;

    this.loading = false;
  }

  isAuditsEmpty() {
    return _.isEmpty(this.getAudits());
  }

  getAudits() {
    return this.$store.state.audit.audits;
  }

  getAuditsCorrect() {
    return this.getAudits().map((item) => ({
      ...item,
      createdAt: moment(item.createdAt).format("DD.MM.YYYY HH:mm"),
      updatedAt: moment(item.updatedAt).format("DD.MM.YYYY HH:mm"),
    }));
  }

  async fetchAudits() {
    if (this.isAuditsEmpty()) {
      this.loading = true;
      await this.$store.dispatch("audit/GET_AUDITS");
      this.loading = false;
    }
  }
}
