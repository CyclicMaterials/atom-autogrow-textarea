import cuid from 'cuid';
import intent from './atom-autogrow-textarea/intent.js';
import model from './atom-autogrow-textarea/model.js';
import view from './atom-autogrow-textarea/view.js';

const DIALOGUE_NAME = `atom-AutogrowTextarea`;

function atomAutogrowTextarea({DOM, props$}) {
  const id = cuid();
  const actions = intent({DOM, id});
  const state$ = model({props$, actions});

  return {
    DOM: view({state$, id}),
    id,
    state$,
  };
}

export {DIALOGUE_NAME};

export default atomAutogrowTextarea;
