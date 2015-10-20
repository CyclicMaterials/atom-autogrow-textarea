import demo from './index';
import {makeDOMDriver} from '@cycle/dom';
import {run} from '@cycle/core';

const main = demo;

run(main, {
  DOM: makeDOMDriver(`.demo-container`),
});
