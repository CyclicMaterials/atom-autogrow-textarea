import cuid from 'cuid';
import assign from 'fast.js/object/assign';
import intent from './intent';
import model from './model';
import view from './view';

const DIALOGUE_NAME = `atom-AutogrowTextarea`;

/**
 * `atomAutogrowTextarea` is a component containing a TEXTAREA that grows
 * in height as more lines of input are entered. Unless an explicit height
 * or the `maxRows` property is set, it will never scroll.
 *
 * Example:
 *
 *     atomAutogrowTextarea({DOM, props$: Rx.Observable.just({
 *       maxRows: 4
 *     })});
 *
 * ### Properties
 *
 * The following properties is available:
 *
 * Property | Description | Default
 * ---------------|-------------|---------
 * `maxRows` | {Number} The maximum rows the textarea can occupy before scrolling. | `0`
 * `rows` | {Number} The initial rows of the textarea. | `1`
 * `value` | {String} The value of the textarea. | ``
 *
 * @param {Object} {DOM, props$} A specification of:
 *
 *     - {Function} DOM The DOM driver function.
 *     - {Observable} props$ An Observable of object of properties.
 *
 * @returns {Object} The atomAutogrowTextarea object. The object has the
 * following structure:
 *
 *     {
 *       DOM: Observable,
 *       id: String,
 *       state$: Observable
 *     }
 */
function atomAutogrowTextarea({DOM, props$}) {
  const id = cuid();
  const actions = intent({DOM, id, dialogueName: DIALOGUE_NAME});
  const state$ = model({props$, actions, dialogueName: DIALOGUE_NAME});

  return {
    DOM: view({state$, id}),
    id,
    state$: state$.map((state) => assign({}, state)),
  };
}

export {DIALOGUE_NAME};

export default atomAutogrowTextarea;
