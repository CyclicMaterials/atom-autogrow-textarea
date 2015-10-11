import {merge} from 'ramda';

function htmlEncode(value) {
  return value.replace(/&/gm, `&amp;`)
    .replace(/"/gm, `&quot;`)
    .replace(/'/gm, `&#39;`)
    .replace(/</gm, `&lt;`)
    .replace(/>/gm, `&gt;`)
    .split(`\n`);
}

function computeMirrorTextValue(value, maxRows, rows) {
  const tokens = htmlEncode(value);

  const adjustedTokens = maxRows > 0 && tokens.length > maxRows ?
    tokens.slice(0, maxRows) :
    tokens.slice(0);

  while (rows > 0 && adjustedTokens.length < rows) {
    adjustedTokens.push(``);
  }

  return adjustedTokens.join(`<br>`) + `&nbsp;`;
}

function model({actions, componentName, props$}) {
  return props$.combineLatest(
    actions.inputValue$,
    (props, inputValue) => {
      let {maxRows, rows, value} = props;

      //maxRows = maxRows || 0;
      //rows = rows || 1;

      const mirrorTextValue = computeMirrorTextValue(inputValue, maxRows, rows);

      return merge(props,
        {
          componentName,
          maxRows,
          mirrorTextValue,
          rows,
          value,
        });
    }
  );
}

export default model;
