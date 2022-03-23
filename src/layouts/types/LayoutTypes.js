import Default from "../default";
import Clear from "../clear";

export default class LayoutTypes {
  constructor() {
    this.types = [
      { type: "layout-default", view: Default },
      { type: "layout-clear", view: Clear },
    ];
  }

  getTypes() {
    return this.types;
  }
}
