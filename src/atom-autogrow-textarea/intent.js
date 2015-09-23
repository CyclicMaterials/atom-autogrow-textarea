import {Rx} from '@cycle/core';

function intent({DOM, id, dialogueName}) {
  const selector = `.${id} .${dialogueName}_textarea`;

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
