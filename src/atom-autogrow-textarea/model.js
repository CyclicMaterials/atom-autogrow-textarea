function htmlEncode(value) {
  return value.replace(/&/gm, `&amp;`)
    .replace(/"/gm, `&quot;`)
    .replace(/'/gm, `&#39;`)
    .replace(/</gm, `&lt;`)
    .replace(/>/gm, `&gt;`)
    .split(`\n`);
}

function model({props$, actions, dialogueName}) {
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
        dialogueName,
        className,
        value,
        mirrorTextValue: adjustedTokens.join(`<br>`) + `&nbsp;`,
        rows,
      };
    }
  );
}

export default model;
