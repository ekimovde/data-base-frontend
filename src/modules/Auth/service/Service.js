export default class Service {
  constructor(context) {
    this.context = context;

    this.step = 1;
    this.steps = 2;
    this.loading = false;

    this.login = { email: "", password: "" };
    this.registration = {
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

  isLogin() {
    return this.step === 1;
  }

  isDisabled() {
    const $this = this.context;

    if (this.isLogin()) return $this.$v.service.login.$invalid || this.loading;
    return $this.$v.service.registration.$invalid || this.loading;
  }

  onChangeStep(step) {
    if (this.loading === false) {
      this.step = step;
    }
  }

  onReset() {
    this.step = 1;
    this.steps = 2;
    this.login = { email: "", password: "" };
    this.registration = {
      email: "",
      password: "",
      role: "DOCTOR",
      name: "",
      age: null,
    };
  }

  async onSend() {
    if (this.isLogin()) this.signIn();
    else this.signUp();
  }

  async signIn() {
    const $this = this.context;
    const { login } = this;

    login.age = parseInt(login.age);

    this.loading = true;
    await $this.$store.dispatch("auth/LOGIN", login);
    this.loading = false;
  }

  async signUp() {
    const $this = this.context;
    const { registration } = this;

    this.loading = true;
    await $this.$store.dispatch("auth/REGISTRATION", registration);
    this.loading = false;
  }
}
