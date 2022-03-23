import _ from "lodash";
import moment from "moment";

export default class Service {
  constructor(context) {
    this.context = context;
    this.$store = context.$store;

    this.loading = false;
    this.showModalAdd = false;
    this.showModalEdit = false;
    this.showModalDoctor = false;

    this.chamber = { name: "", email: "" };
    this.chamberId = 0;
  }

  isChambersEmpty() {
    return _.isEmpty(this.getChambers());
  }

  hasAdminRole() {
    return this.$store.getters["profile/GET_ROLE"] === "ADMIN";
  }

  hasDoctorRole() {
    return this.$store.getters["profile/GET_ROLE"] === "DOCTOR";
  }

  hasAdminDoctorRole() {
    return (
      this.hasAdminRole() ||
      this.$store.getters["profile/GET_ROLE"] === "DOCTOR"
    );
  }

  getChambers() {
    return this.$store.state.chamber.chambers;
  }

  getChambersCorrect() {
    return this.getChambers().map((item) => ({
      ...item,
      updatedAt: moment(item.updatedAt).format("DD.MM.YYYY HH:mm"),
    }));
  }

  async fetchChambers() {
    if (this.isChambersEmpty()) {
      this.loading = true;
      await this.$store.dispatch("chamber/GET_CHAMBERS");
      this.loading = false;
    }
  }

  onEdited(row) {
    this.showModalEdit = true;

    const id = _.get(row, "id");
    const name = _.get(row, "name");
    const email = _.isEmpty(_.get(row, "user.email"))
      ? ""
      : _.get(row, "user.email");
    this.chamber = { id, name, email };
  }

  async onRemove(id) {
    await this.$store.dispatch("chamber/REMOVE_CHAMBER", id);
  }

  onCloseEdit() {
    this.showModalEdit = false;
    this.chamber = { name: "", email: "" };
  }

  onAddDoctor(id) {
    this.chamberId = id;
    this.showModalDoctor = true;
  }
}
