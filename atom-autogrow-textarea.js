/** @jsx hJSX */

import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom'; // eslint-disable-line
import cuid from 'cuid';
import combineClassNames from "@cyclic/util-combine-class-names";

const DIALOGUE_NAME = `atom-AutogrowTextarea`;

function intent({DOM, id}) {
  const selector = `.${id} .${DIALOGUE_NAME}_textarea`;

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
      let {className, maxRows, rows} = props;

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
        className,
        value,
        mirrorTextValue: adjustedTokens.join(`<br>`) + `&nbsp;`,
        rows,
      };
    }
  );
}

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

function atomAutogrowTextarea({DOM, props$}) {
  const id = cuid();
  const actions = intent({DOM, id});
  const state$ = model({props$, actions});

  return {
    DOM: view({state$, id}),
    id,
    state$,
  };
}

export {DIALOGUE_NAME};

export default atomAutogrowTextarea;
