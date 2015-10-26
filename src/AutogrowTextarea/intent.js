import Rx from 'rx';

function intent({DOM, id, componentName}) {
  const selector = `${id ? `.` + id + ` ` : ``}.${componentName}_textarea`;

  return {
    inputValue$: Rx.Observable.merge(
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
