export default class ServiceAdd {
  constructor(context) {
    this.context = context;
    this.$store = context.$store;

    this.loading = false;
    this.form = {
      email: "",
      password: "",
      role: "DOCTOR",
      name: "",
      age: null,
    };
    this.roleItems = [
      {
        icon: "bx bx-capsule bx-tada",
        label: "Доктор",
        value: "DOCTOR",
      },
      {
        icon: "bx bx-confused bx-tada",
        label: "Пациент",
        value: "PATIENT",
      },
    ];
  }

  isDisabled() {
    const $this = this.context;
    return $this.$v.service.form.$invalid || this.loading;
  }

  onCloseDialog() {
    if (!this.loading) this.onReset();
  }

  onReset() {
    const $this = this.context;

    this.form = {
      email: "",
      password: "",
      role: "DOCTOR",
      name: "",
      age: null,
    };
    $this.$emit("input", false);
  }

  async onSend() {
    this.loading = true;
    const { status } = await this.$store.dispatch("users/ADD_USER", this.form);
    this.loading = false;

    if (status === "success") this.onReset();
  }
}
