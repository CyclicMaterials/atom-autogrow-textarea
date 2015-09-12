import {Rx} from '@cycle/core';
import {DIALOGUE_NAME} from '../atom-autogrow-textarea.js';

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

export default intent;
