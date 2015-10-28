/** @jsx hJSX */

import {h} from '@cycle/dom'; // eslint-disable-line
import combineClassNames from "@cyclic/util-combine-class-names";

function view({state$, id}) {
  return state$.map(
    (state) => {
      const {className, componentName, mirrorTextValue, rows, value} = state;

      return h(`div`,
        {className: combineClassNames(id, componentName, className)}, [
          h(`div.${componentName}_mirrorText`, {
            attributes: {'aria-hidden': true},
            innerHTML: mirrorTextValue,
          }),
          h(`div.${componentName}_container.atom-Layout--fit`, [
            h(`textarea.${componentName}_textarea`, {
              rows,
              value,
            }),
          ]),
        ]);
    }
  );
}

export default view;
