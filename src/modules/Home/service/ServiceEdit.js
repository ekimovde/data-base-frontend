export default class ServiceEdit {
  constructor(context) {
    this.context = context;
    this.$store = context.$store;

    this.loading = false;
    this.form = { id: "", age: "", disease: "" };
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

    this.form = { id: "", age: null, disease: "" };
    $this.$emit("input", false);
  }

  async onSend() {
    this.loading = true;
    const { status } = await this.$store.dispatch("users/EDIT_USER", this.form);
    this.loading = false;

    if (status === "success") this.onReset();
  }
}
