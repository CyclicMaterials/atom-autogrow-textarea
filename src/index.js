import AutogrowTextarea from './AutogrowTextarea/index';

module.exports = {
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
   * ### Styling
   *
   * The following variables and classes are available for styling:
   *
   * Variable/class | Description | Default
   * ---------------|-------------|---------
   * `.atom-AutogrowTextarea` | AutogrowTextarea component. |
   * `.atom-AutogrowTextarea_container` | Styles the textarea container. |
   * `.atom-AutogrowTextarea_textarea` | Styles the textarea. |
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
  AutogrowTextarea,
};
