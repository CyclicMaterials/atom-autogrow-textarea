/** @jsx hJSX */

import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom'; // eslint-disable-line
import atomAutogrowTextarea from './../src/atom-autogrow-textarea/index.js';

function demo({DOM}) {
  const autogrowTextarea = atomAutogrowTextarea(
    {DOM, props$: Rx.Observable.just({})});

  const autogrowTextareaMaxRows = atomAutogrowTextarea(
    {DOM, props$: Rx.Observable.just({
      maxRows: 4,
    })});

  const autogrowTextareaRows = atomAutogrowTextarea(
    {DOM, props$: Rx.Observable.just({
      rows: 4,
    })});

  const autogrowTextareaValue = atomAutogrowTextarea(
    {DOM, props$: Rx.Observable.just({
      value: `some text...`,
    })});

  return {
    DOM: Rx.Observable.combineLatest(
      autogrowTextarea.DOM,
      autogrowTextareaMaxRows.DOM,
      autogrowTextareaRows.DOM,
      autogrowTextareaValue.DOM,
      (
        autogrowTextareaVTree,
        autogrowTextareaMaxRowsVTree,
        autogrowTextareaRowsVTree,
        autogrowTextareaValueVTree
      ) => ( // eslint-disable-line
        <div className=
               {`template-DemoPages_sectionContainer isVertical isCentered`}>
          <h4>Default</h4>
          <section className={`template-DemoPages_verticalSection`}>
            {autogrowTextareaVTree}
          </section>

          <h4>Custom</h4>
          <section className={`template-DemoPages_verticalSection`}>
            <p>Scrolls after 4 rows:</p>
            {autogrowTextareaMaxRowsVTree}
            <p>Initial height of 4 rows:</p>
            {autogrowTextareaRowsVTree}
            <p>Initial value:</p>
            {autogrowTextareaValueVTree}
          </section>
        </div>
      )
    ),
  };
}

export default demo;
