import cuid from 'cuid';
import intent from './intent';
import model from './model';
import view from './view';

const DIALOGUE_NAME = `atom-AutogrowTextarea`;

function atomAutogrowTextarea({DOM, props$}) {
  const id = cuid();
  const actions = intent({DOM, id, dialogueName: DIALOGUE_NAME});
  const state$ = model({props$, actions, dialogueName: DIALOGUE_NAME});

  return {
    DOM: view({state$, id}),
    id,
    state$,
  };
}

export {DIALOGUE_NAME};

export default atomAutogrowTextarea;
