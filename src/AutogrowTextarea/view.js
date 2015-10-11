/** @jsx hJSX */

import {hJSX} from '@cycle/dom'; // eslint-disable-line
import combineClassNames from "@cyclic/util-combine-class-names";

function view({state$, id}) {
  return state$.map(
    (state) => {
      const {className, componentName, mirrorTextValue, rows, value} = state;

      return (// eslint-disable-line
        <div className={combineClassNames(id, `${componentName}`, className)}>
          <div
            className={`${componentName}_mirrorText`}
            attributes={{'aria-hidden': true}}
            innerHTML={mirrorTextValue}></div>

          <div
            className={combineClassNames(
              `${componentName}_container`,
              `atom-Layout--fit`
              )}>
            <textarea
              className={`${componentName}_textarea`}
              rows={rows}
              value={value}></textarea>
          </div>
        </div>
      );
    }
  );
}

export default view;
