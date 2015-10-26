import Rx from 'rx';

function intent({DOM, id, componentName}) {
  const textareaSelector =
    `${id ? `.` + id + ` ` : ``}.${componentName}_textarea`;

  return {
    inputValue$: Rx.Observable.merge(
      DOM.select(textareaSelector).observable
        .filter(elements => elements.length > 0)
        .map(elements => elements[0].value)
        .take(1),
      DOM.select(textareaSelector).events(`input`)
        .map(e => e.target.value)
    ).startWith(``),
  };
}

export default intent;
