/* eslint max-nested-callbacks: 0, max-len: 0 */
/* global describe, it */
import chai from 'chai';
const expect = chai.expect;
chai.use(require(`chai-virtual-dom`));
import AutogrowTextarea, {COMPONENT_NAME as AUTOGROW_TEXTAREA_CLASS}
  from './index';
import Rx from 'rx';
import {h, mockDOMResponse} from '@cycle/dom';

describe(`AutogrowTextarea`, () => {
  it(`should be a function`, () => {
    expect(AutogrowTextarea).to.be.a(`function`);
  });

  it(`should output DOM`, (done) => {
    const props = {};
    const props$ = Rx.Observable.just(props);
    const DOMSource = mockDOMResponse();
    const autogrowTextarea = AutogrowTextarea({DOM: DOMSource, id: ``, props$});
    autogrowTextarea.DOM.elementAt(0).subscribe((vtree) => {
      expect(vtree).to.look.exactly.like(
        h(`div.${AUTOGROW_TEXTAREA_CLASS}`, [
          h(`div.${AUTOGROW_TEXTAREA_CLASS}_mirrorText`, {
            attributes: {'aria-hidden': true},
            innerHTML: `&nbsp;`,
          }),
          h(`div.${AUTOGROW_TEXTAREA_CLASS}_container.atom-Layout--fit`,
            h(`textarea.${AUTOGROW_TEXTAREA_CLASS}_textarea`, {
              rows: 1,
              value: ``,
            })
          ),
        ])
      );
      done();
    });
  });

  it(`should output DOM with maxRows set`, (done) => {
    const props = {maxRows: 4};
    const props$ = Rx.Observable.just(props);
    const DOMSource = mockDOMResponse();
    const autogrowTextarea = AutogrowTextarea({DOM: DOMSource, id: ``, props$});
    autogrowTextarea.DOM.elementAt(0).subscribe((vtree) => {
      expect(vtree).to.look.exactly.like(
        h(`div.${AUTOGROW_TEXTAREA_CLASS}`, [
          h(`div.${AUTOGROW_TEXTAREA_CLASS}_mirrorText`, {
            attributes: {'aria-hidden': true},
            innerHTML: `&nbsp;`,
          }),
          h(`div.${AUTOGROW_TEXTAREA_CLASS}_container.atom-Layout--fit`,
            h(`textarea.${AUTOGROW_TEXTAREA_CLASS}_textarea`, {
              rows: 1,
              value: ``,
            })
          ),
        ])
      );
      done();
    });
  });

  it(`should output DOM with rows set`, (done) => {
    const props = {rows: 4};
    const props$ = Rx.Observable.just(props);
    const DOMSource = mockDOMResponse();
    const autogrowTextarea = AutogrowTextarea({DOM: DOMSource, id: ``, props$});
    autogrowTextarea.DOM.elementAt(0).subscribe((vtree) => {
      expect(vtree).to.look.exactly.like(
        h(`div.${AUTOGROW_TEXTAREA_CLASS}`, [
          h(`div.${AUTOGROW_TEXTAREA_CLASS}_mirrorText`, {
            attributes: {'aria-hidden': true},
            innerHTML: `<br><br><br>&nbsp;`,
          }),
          h(`div.${AUTOGROW_TEXTAREA_CLASS}_container.atom-Layout--fit`,
            h(`textarea.${AUTOGROW_TEXTAREA_CLASS}_textarea`, {
              rows: 4,
              value: ``,
            })
          ),
        ])
      );
      done();
    });
  });

  it(`should output DOM with value set`, (done) => {
    const props = {value: `some text`};
    const props$ = Rx.Observable.just(props);
    const DOMSource = mockDOMResponse();
    const autogrowTextarea = AutogrowTextarea({DOM: DOMSource, id: ``, props$});
    autogrowTextarea.DOM.elementAt(0).subscribe((vtree) => {
      expect(vtree).to.look.exactly.like(
        h(`div.${AUTOGROW_TEXTAREA_CLASS}`, [
          h(`div.${AUTOGROW_TEXTAREA_CLASS}_mirrorText`, {
            attributes: {'aria-hidden': true},
            innerHTML: `&nbsp;`,
          }),
          h(`div.${AUTOGROW_TEXTAREA_CLASS}_container.atom-Layout--fit`,
            h(`textarea.${AUTOGROW_TEXTAREA_CLASS}_textarea`, {
              rows: 1,
              value: `some text`,
            })
          ),
        ])
      );
      done();
    });
  });
});
