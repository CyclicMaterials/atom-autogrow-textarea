/** @jsx hJSX */

import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom'; // eslint-disable-line
import combineClassNames from "@cyclic/util-combine-class-names";

const DIALOGUE_NAME = `atom-AutogrowTextarea`;

let idSuffix = 0;

function makeCycleId() {
  return `${DIALOGUE_NAME}-${idSuffix++}`;
}

function intent({DOM, cycleId}) {
  const selector = `TEXTAREA.${cycleId}`;

  return {
    value$: Rx.Observable.merge(
      DOM.select(selector).observable
        .filter(elements => elements.length > 0)
        .map(elements => elements[0].value)
        .first(),
      DOM.select(selector).events(`input`)
        .map(e => e.target.value)
    ).startWith(``),
  };
}

function htmlEncode(value) {
  return value.replace(/&/gm, `&amp;`)
    .replace(/"/gm, `&quot;`)
    .replace(/'/gm, `&#39;`)
    .replace(/</gm, `&lt;`)
    .replace(/>/gm, `&gt;`)
    .split(`\n`);
}

function model({props$, actions}) {
  return props$.combineLatest(
    actions.value$,
    (props, value) => {
      let {maxRows, rows} = props;

      maxRows = maxRows || 0;
      rows = rows || 1;

      const tokens = htmlEncode(value);

      const adjustedTokens = maxRows > 0 && tokens.length > maxRows ?
        tokens.slice(0, maxRows) :
        tokens.slice(0);

      while (rows > 0 && adjustedTokens.length < rows) {
        adjustedTokens.push(``);
      }

      return {
        value,
        mirrorTextValue: adjustedTokens.join(`<br/>`) + `&nbsp;`,
        rows,
      };
    }
  );
}

function view({state$, cycleId}) {
  return state$.map(
    (state) => {
      return (// eslint-disable-line
        <div className={`${cycleId} ${DIALOGUE_NAME}`}>
          <div
            className={combineClassNames(
              cycleId,
              `${DIALOGUE_NAME}_mirrorText`
              )}
            attributes={{'aria-hidden': true}}
            innerHTML={state.mirrorTextValue}></div>

          <div
            className={combineClassNames(
              cycleId,
              `${DIALOGUE_NAME}_container`,
              `atom-Layout--fit`
              )}>
            <textarea
              className={combineClassNames(
              cycleId,
              `${DIALOGUE_NAME}_textarea`
              )}
              rows={state.rows}></textarea>
          </div>
        </div>
      );
    }
  );
}

function atomAutogrowTextarea({DOM, props$, optCycleId = makeCycleId()}) {
  const cycleId = optCycleId.trim();
  const actions = intent({DOM, cycleId});
  const state$ = model({props$, actions});

  return {
    DOM: view({state$, cycleId}),
    cycleId,
    state$,
  };
}

export default atomAutogrowTextarea;
