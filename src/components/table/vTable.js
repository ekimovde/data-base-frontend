import "./style.scss";
import { get } from "lodash";

export default {
  name: "vu-table",
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  methods: {
    renderColumns(h, row, columnsOptions) {
      return columnsOptions.map((column, index) => {
        return h("td", { class: "vu-table__tbody-td" }, [
          column.scopedSlot
            ? column.scopedSlot({ row, items: this.rows })
            : row[column.prop],
        ]);
      });
    },
  },
  render(h) {
    const columnsOptions = this.$slots.default
      .filter((item) => {
        return (
          item.componentOptions && item.componentOptions.tag === "vTableColumn"
        );
      })
      .map((column) => {
        return Object.assign({}, column.componentOptions.propsData, {
          scopedSlot: get(column, "data.scopedSlots.default"),
        });
      });

    const columnsHead = columnsOptions.map((column, index) => {
      return h("th", { class: "vu-table__thead-th", key: index }, column.title);
    });

    const style = {
      "grid-template-columns": `repeat(${columnsHead.length}, 1fr)`,
    };

    const rows = this.rows.map((row, index) => {
      return h("tr", { key: index, style }, [
        this.renderColumns(h, row, columnsOptions),
      ]);
    });

    return h("table", { class: "vu-table" }, [
      h("thead", { class: "vu-table__thead" }, [
        h("tr", { style }, [columnsHead]),
      ]),
      h("tbody", { class: "vu-table__tbody" }, [rows]),
    ]);
  },
};
