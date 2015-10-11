# atom-autogrow-textarea

> Textarea that grows in height as more lines of input are entered.

## Installation

[![npm version](https://badge.fury.io/js/%40cyclic%2Fatom-autogrow-textarea.svg)](http://badge.fury.io/js/%40cyclic%2Fatom-autogrow-textarea)

```shell
$ npm install @cyclic/atom-autogrow-textarea
```

## Examples

The examples assume basic knowledge of [CycleJS].

```js
var textarea = AutogrowTextarea({DOM, props$: Rx.Observable.just({
  rows: 4,
)});
```

This will render a textarea with an initial height of four rows.

For more examples, see the demo source code, and make sure to check out 
the [API documentation].

### Demo

Clone the repository and run from the command line:

```shell
$ npm start
```

Then open *demo/index.html* in your browser.

You can also see a [live demo here].

### Usage

After you have installed the package, you can start using the components.

#### CommonJS

First, you need to require the component you want to use.

```js
var AutogrowTextarea = require('@cyclic/atom-autogrow-textarea').AutogrowTextarea;
```

Here, we have required the `AutogrowTextarea` component from the package.
Next, we will actually use it.

```js
var textarea = AutogrowTextarea({DOM, props$: Rx.Observable.just({
  rows: 4
})});
```

#### The ES6 Way

First, you need to import the component you want to use.

```js
import {AutogrowTextarea} from '@cyclic/atom-autogrow-textarea';
```

Here, we have imported the `AutogrowTextarea` component from the package.
Next, we will actually use it.

```js
var textarea = AutogrowTextarea({DOM, props$: Rx.Observable.just({
  rows: 4
})});
```

#### Styling Components

The components come with styles in two flavors: transformed styles
and raw styles.

Check out the [API documentation] for available CSS classes and variables.

##### Using Transformed Styles

The transformed styles are ready-to-go styles, which you can use directly in
the browser. The common way is to simply copy the stylesheets from
the library. You’ll find the transformed stylesheets in the *lib* directory.
 
If you don’t want all the styles for all the components, which is in 
*lib/index.css*, you can find specific stylesheets in the component 
subdirectories. However, using stylesheets from different components can lead
to style declaration duplication.

Style declaration duplication can also occur if you use components in 
orchestration with other Cyclic Materials packages. We’ll see next how using
raw styles avoids this.

##### Using Raw Styles

Cyclic Materials have been built with a certain amount of flexibility in mind.
The raw styles are written for [cssnext], which uses the latest CSS syntax. 

Using raw styles is *the recommended way*, as it avoids unnecessary duplication 
of style declarations. It does, however, require a little bit more setup 
in your project.
 
To use the raw styles, your project needs to use the cssnext transpiler.

The raw styles are found in the *src* directory. In your CSS stylesheet, 
you simply import the raw styles you need, for example:

```css
@import '@cyclic/atom-autogrow-textarea/src/AutogrowTextare
```

You then need to have a process that transpiles your CSS. You can [use cssnext] 
using CLI, as a JavaScript library, as a PostCSS plugin, or through other tools.

Take a look at this package’s *package.json* file scripts to see how 
Cyclic Materials use cssnext as a PostCSS plugin.

## License

MIT © [Cyclic Materials](http://github.com/CyclicMaterials)

- - -

[![Build Status](https://travis-ci.org/CyclicMaterials/atom-autogrow-textarea.svg)](https://travis-ci.org/CyclicMaterials/atom-autogrow-textarea)
[![Code Climate](https://codeclimate.com/github/CyclicMaterials/atom-autogrow-textarea/badges/gpa.svg)](https://codeclimate.com/github/CyclicMaterials/atom-autogrow-textarea)
[![Dependency Status](https://david-dm.org/CyclicMaterials/atom-autogrow-textarea.svg)](https://david-dm.org/CyclicMaterials/atom-autogrow-textarea)
[![devDependency Status](https://david-dm.org/CyclicMaterials/atom-autogrow-textarea/dev-status.svg)](https://david-dm.org/CyclicMaterials/atom-autogrow-textarea#info=devDependencies)

[CycleJS]: http://cycle.js.org/
[live demo here]: http://dev.glaciersoft.com/cyclic/atom-autogrow-textarea/
[API documentation]: ./doc/api.md
[cssnext]: http://cssnext.io/
[use cssnext]: http://cssnext.io/setup/#usage
