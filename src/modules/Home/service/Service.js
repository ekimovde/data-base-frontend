import _ from "lodash";
import moment from "moment";

export default class Service {
  constructor(context) {
    this.context = context;
    this.$store = context.$store;

    this.loading = false;
    this.showModalAdd = false;
    this.showModalEdit = false;

    this.user = { id: "", age: "", disease: "" };
  }

  isUsersEmpty() {
    return _.isEmpty(this.getUsers());
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

  getUsers() {
    return this.$store.state.users.users;
  }

  getUsersCorrect() {
    return this.getUsers().map((item) => {
      let name = "";

      if (item.role === "DOCTOR") {
        name = item.user_doctor.name;
      }

      if (item.role === "PATIENT") {
        name = item.user_patient.name;
      }

      return {
        id: item.id,
        email: item.email,
        role: item.role,
        name,
        user_doctor: item.user_doctor,
        user_patient: item.user_patient,
        createdAt: moment(item.createdAt).format("DD.MM.YYYY HH:mm"),
        updatedAt: moment(item.updatedAt).format("DD.MM.YYYY HH:mm"),
      };
    });
  }

  async fetchUsers() {
    if (this.isUsersEmpty()) {
      this.loading = true;
      await this.$store.dispatch("users/GET_USERS");
      this.loading = false;
    }
  }

  onEdit(item) {
    this.user = {
      id: item.id,
      age: item.user_patient.age,
      disease: item.user_patient.disease,
    };
    this.showModalEdit = true;
  }

  async onRemove(id) {
    await this.$store.dispatch("users/REMOVE_USER", id);
  }

  onCloseEdit() {
    this.showModalEdit = false;
    this.user = { id: "", age: "", disease: "" };
  }
}
