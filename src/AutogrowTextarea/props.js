import {nonnegativeInteger, string} from 'categories-js';

const props = {
  maxRows: {
    type: nonnegativeInteger,
    default: 0,
  },

  rows: {
    type: nonnegativeInteger,
    default: 1,
  },

  value: {
    type: string,
    default: ``,
  },
};

export default props;
