import _ from "lodash";

export default class Service {
  constructor(context) {
    this.context = context;

    this.statuses = {
      success: {
        image: "images/check-mark.png",
      },

      warning: {
        image: "images/barrier.png",
      },

      error: {
        image: "images/petard.png",
      },
    };
  }

  isAlertsEmpty() {
    return _.isEmpty(this.getAlerts());
  }

  getAlerts() {
    const $this = this.context;
    return $this.$store.getters["alerts/GET_ALERTS"];
  }

  getImage(status) {
    return this.statuses[status].image;
  }

  onClose(id) {
    const $this = this.context;
    $this.$store.dispatch("alerts/REMOVE_ALERT", id);
  }
}
