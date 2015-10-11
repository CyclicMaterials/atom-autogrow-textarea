/** @jsx hJSX */

import AutogrowTextarea from './../src/AutogrowTextarea/index';
import {hJSX} from '@cycle/dom'; // eslint-disable-line
import {Rx} from '@cycle/core';

function slice(vtrees, counter, length) {
  return vtrees.slice(counter.count, counter.count += length);
}

function demo({DOM}) {
  const vtree$s = [
    AutogrowTextarea({
      DOM, props$: Rx.Observable.just({}),
    }).DOM,
    AutogrowTextarea({
      DOM, props$: Rx.Observable.just({
        maxRows: 4,
      }),
    }).DOM,
    AutogrowTextarea({
      DOM, props$: Rx.Observable.just({
        rows: 4,
      }),
    }).DOM,
    AutogrowTextarea({
      DOM, props$: Rx.Observable.just({
        value: `Hi,

I am filled with some forgettable text.

Regards,
The Author`,
      }),
    }).DOM,
  ];

  return {
    DOM: Rx.Observable.combineLatest(
      ...vtree$s,
      (...vtrees) => {
        const counter = {count: 0};
        return ( // eslint-disable-line
          <div className=
                 {`template-DemoPages_sectionContainer isVertical isCentered`}>
            <h4>Default</h4>
            <section className={`template-DemoPages_verticalSection`}>
              {slice(vtrees, counter, 1)}
            </section>

            <h4>Custom</h4>
            <section className={`template-DemoPages_verticalSection`}>
              <p>Scrolls after 4 rows:</p>
              {slice(vtrees, counter, 1)}
              <p>Initial height of 4 rows:</p>
              {slice(vtrees, counter, 1)}
              <p>Initial value:</p>
              {slice(vtrees, counter, 1)}
            </section>
          </div>
        );
      }
    ),
  };
}

export default demo;
