/** @jsx hJSX */

import {hJSX} from '@cycle/dom'; // eslint-disable-line
import combineClassNames from "@cyclic/util-combine-class-names";
import {DIALOGUE_NAME} from '../atom-autogrow-textarea.js';

function view({state$, id}) {
  return state$.map(
    (state) => {
      const {className, mirrorTextValue, rows} = state;

      return (// eslint-disable-line
        <div className={combineClassNames(id, `${DIALOGUE_NAME}`, className)}>
          <div
            className={`${DIALOGUE_NAME}_mirrorText`}
            attributes={{'aria-hidden': true}}
            innerHTML={mirrorTextValue}></div>

          <div
            className={combineClassNames(
              `${DIALOGUE_NAME}_container`,
              `atom-Layout--fit`
              )}>
            <textarea
              className={`${DIALOGUE_NAME}_textarea`}
              rows={rows}></textarea>
          </div>
        </div>
      );
    }
  );
}

export default view;
