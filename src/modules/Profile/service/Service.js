import _ from "lodash";

export default class Service {
  constructor(context) {
    this.context = context;
    this.$store = context.$store;

    this.loading = false;
    this.profile = {
      name: "",
      email: "",
      id: null,
      role: "",
    };
  }

  getProfile() {
    const profile = this.$store.state.profile.profile;

    if (profile.role === "ADMIN") {
      profile.name = "Администратор";
    }

    if (profile.role === "DOCTOR" && Boolean(_.get(profile, "user_doctor"))) {
      profile.name = profile.user_doctor.name;
      delete profile.user_doctor;
    }

    if (profile.role === "PATIENT" && Boolean(_.get(profile, "user_patient"))) {
      profile.name = profile.user_patient.name;
      profile.age = profile.user_patient.age;
      profile.disease = profile.user_patient.disease;

      delete profile.user_patient;
    }

    this.profile = _.cloneDeep(profile);
    return profile;
  }

  getRoleItems() {
    const { role } = this.profile;

    if (role === "DOCTOR")
      return [
        { icon: "bx bx-capsule bx-tada", label: "Доктор", value: "DOCTOR" },
      ];

    if (role === "PATIENT")
      return [
        { icon: "bx bx-confused bx-tada", label: "Пациент", value: "PATIENT" },
      ];

    return [{ icon: "bx bx-crown bx-tada", label: "Админ", value: "ADMIN" }];
  }

  isProfileEmpty() {
    return _.isEmpty(this.getProfile());
  }

  async onFetch() {
    if (this.isProfileEmpty()) {
      this.loading = true;

      await this.$store.dispatch("profile/GET_PROFILE");
      this.getProfile();

      this.loading = false;
    }
  }

  onLogout() {
    this.$store.dispatch("auth/LOGOUT");
  }
}
