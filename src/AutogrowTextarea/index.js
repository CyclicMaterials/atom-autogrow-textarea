import cuid from 'cuid';
import intent from './intent';
import model from './model';
import props from './props';
import view from './view';
import {clone} from 'ramda';
import {predicateObjectOfObservable} from '@cyclic/util-predicate';

const COMPONENT_NAME = `atom-AutogrowTextarea`;

function AutogrowTextarea(sources) {
  const {DOM} = sources;
  const props$ = predicateObjectOfObservable(props)(sources.props$);
  const id = cuid();
  const actions = intent({DOM, id, componentName: COMPONENT_NAME});
  const state$ = model({props$, actions, componentName: COMPONENT_NAME});

  return {
    DOM: view({state$, id}),
    id,
    state$: state$.map((state) => clone(state)),
  };
}

export {COMPONENT_NAME};

export default AutogrowTextarea;
