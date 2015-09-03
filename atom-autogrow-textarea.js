/** @jsx hJSX */

import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom'; // eslint-disable-line
import combineClassNames from "util-combine-class-names";

const DIALOGUE_NAME = `atom-AutogrowTextarea`;

function intent(DOM, optNamespace) {
  const namespace = optNamespace ? `.${optNamespace}` : ``;

  return {
    value$: DOM.select(`TEXTAREA${namespace}`).events(`input`)
      .map(e => e.target.value)
      .startWith(``),
  };
}

function model(props$, actions) {
  return Rx.Observable.combineLatest(
    props$,
    actions.value$,
    (props, value) => {
      let {maxRows, rows} = props;

      maxRows = maxRows || 0;
      rows = rows || 1;

      const tokens = value.replace(/&/gm, `&amp;`)
        .replace(/"/gm, `&quot;`)
        .replace(/'/gm, `&#39;`)
        .replace(/</gm, `&lt;`)
        .replace(/>/gm, `&gt;`)
        .split(`\n`);

      let adjustedTokens;

      if (maxRows > 0 && tokens.length > maxRows) {
        adjustedTokens = tokens.slice(0, maxRows);
      } else {
        adjustedTokens = tokens.slice(0);
      }

      while (rows > 0 && adjustedTokens.length < rows) {
        adjustedTokens.push(``);
      }

      const mirrorTextValue = adjustedTokens.join(`<br/>`) + `&nbsp;`;

      return {
        value,
        mirrorTextValue,
      };
    }
  );
}

function view({namespace, props$, state$}) {
  return Rx.Observable.combineLatest(
    props$,
    state$,
    (props, state) => {
      const rows = props.rows || 1;

      return (// eslint-disable-line
        <div
          className={combineClassNames(namespace, DIALOGUE_NAME)}>
          <div
            className={combineClassNames(
              namespace,
              `${DIALOGUE_NAME}_mirrorText`
              )}
            attributes={{'aria-hidden': true}}
            innerHTML={state.mirrorTextValue}></div>

          <div
            className={combineClassNames(
              namespace,
              `${DIALOGUE_NAME}_container`,
              `atom-Layout--fit`
              )}>
            <textarea
              className={combineClassNames(
              namespace,
              `${DIALOGUE_NAME}_textarea`
              )}
              rows={rows}></textarea>
          </div>
        </div>
      );
    }
  );
}

function atomAutogrowTextarea({DOM, props$}, optNamespace = ``) {
  const namespace = optNamespace.trim();

  const actions = intent(DOM, namespace);
  const state$ = model(props$, actions);

  return {
    DOM: view({namespace, props$, state$}),
  };
}

export default atomAutogrowTextarea;
