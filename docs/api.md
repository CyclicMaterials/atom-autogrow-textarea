
# Cyclic Materials atom-autogrow-textarea API

- [`atomAutogrowTextarea`](#atomAutogrowTextarea)

### <a id="atomAutogrowTextarea"></a> `atomAutogrowTextarea({DOM, props$})`

`atomAutogrowTextarea` is a component containing a TEXTAREA that grows
in height as more lines of input are entered. Unless an explicit height
or the `maxRows` property is set, it will never scroll.

Example:

    atomAutogrowTextarea({DOM, props$: Rx.Observable.just({
      maxRows: 4
    })});

### Properties

The following properties is available:

Property | Description | Default
---------------|-------------|---------
`maxRows` | The maximum rows the TEXTAREA can occupy before scrolling | 0
`rows` | The initial rows of the TEXTAREA | 1

#### Arguments:

- `{DOM, props$} :: Object` A specification of: 
    - {Function} DOM The DOM driver function.
    - {Observable} props$ An Observable of object of properties.

#### Return:

*(Object)* The atomAutogrowTextarea object. The object has the following structure:

    {
      DOM: Observable,
      id: String,
      state$: Observable
    }

- - -

