import renderApp from './render-app';
import App from '../app';

let appContainer: HTMLElement | null;

function handleDOMContentLoaded() {
  appContainer = document.getElementById('app');
  renderApp(appContainer, App);
}

if (module.hot) {
  module.hot.accept('./index.ts');
  module.hot.accept('../app', () => {
    const NewApp = require('../app').default;
    renderApp(appContainer, NewApp);
  });
}

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
