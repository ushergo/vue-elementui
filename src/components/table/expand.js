export default {
  name: 'sc-table-cell',
  functional: true,
  props: {
    render: Function,
    text: [String, Number, Boolean, Function, Object, Array, Symbol],
    scope: {
      type: Object,
      default: null
    }
  },
  render(h, ctx) {
    const record = {
      record: ctx.props.scope,
      value: ctx.props.text
    };
    return ctx.props.render(h, record);
  }
};
