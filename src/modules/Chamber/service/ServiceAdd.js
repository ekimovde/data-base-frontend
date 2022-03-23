import _ from "lodash";

export default class ServiceAdd {
  constructor(context) {
    this.context = context;
    this.$store = context.$store;

    this.loading = false;
    this.form = { name: "", email: "" };
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

    this.form = { name: "", email: "" };
    $this.$emit("input", false);
  }

  async onSend() {
    this.loading = true;
    const { status } = await this.$store.dispatch(
      "chamber/ADD_CHAMBER",
      this.form
    );
    this.loading = false;

    if (status === "success") this.onReset();
  }
}
