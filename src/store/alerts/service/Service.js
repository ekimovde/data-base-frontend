import uniqid from "uniqid";

const STATUSES = ["success", "warning", "error"];

export default class AlertService {
  constructor(data) {
    if (STATUSES.indexOf(data.status) === -1) {
      throw new Error(
        `Unsupported alert status: ${
          data.status
        }. Supported statuses: ${STATUSES.join(", ")}`
      );
    }

    this.id = uniqid();
    this.status = data.status;
    this.title = data.title;
    this.text = data.text;
  }
}
