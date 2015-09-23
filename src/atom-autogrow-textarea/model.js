import assign from 'fast.js/object/assign';

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

function model({props$, actions, dialogueName}) {
  return props$.combineLatest(
    actions.value$,
    (props, value) => {
      let {maxRows, rows} = props;

      maxRows = maxRows || 0;
      rows = rows || 1;

      const mirrorTextValue = computeMirrorTextValue(value, maxRows, rows);

      return assign({},
        props,
        {
          dialogueName,
          value,
          mirrorTextValue,
          maxRows,
          rows,
        });
    }
  );
}

export default model;
