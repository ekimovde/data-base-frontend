export default class ServiceAdd {
  constructor(context) {
    this.context = context;
    this.$store = context.$store;

    this.loading = false;
    this.form = { doctor: "", doctorPosition: '', workingDays: '', workingHours: '' };
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

    this.form = { doctor: "", doctorPosition: '', workingDays: '', workingHours: '' };
    $this.$emit("input", false);
  }

  async onSend() {
    this.loading = true;
    const { status } = await this.$store.dispatch(
      "schedule/ADD_SCHEDULE",
      this.form
    );
    this.loading = false;

    if (status === "success") this.onReset();
  }
}