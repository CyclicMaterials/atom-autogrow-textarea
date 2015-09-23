/** @jsx hJSX */

import {hJSX} from '@cycle/dom'; // eslint-disable-line
import combineClassNames from "@cyclic/util-combine-class-names";

function view({state$, id}) {
  return state$.map(
    (state) => {
      const {dialogueName, className, mirrorTextValue, rows} = state;

      return (// eslint-disable-line
        <div className={combineClassNames(id, `${dialogueName}`, className)}>
          <div
            className={`${dialogueName}_mirrorText`}
            attributes={{'aria-hidden': true}}
            innerHTML={mirrorTextValue}></div>

          <div
            className={combineClassNames(
              `${dialogueName}_container`,
              `atom-Layout--fit`
              )}>
            <textarea
              className={`${dialogueName}_textarea`}
              rows={rows}></textarea>
          </div>
        </div>
      );
    }
  );
}

export default view;
