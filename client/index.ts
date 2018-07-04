import {showPage} from '@shopify/react-html';
import App from '../app';
import renderApp from './render-app';

const appContainer: HTMLElement | null = document.getElementById('app');

if (module.hot) {
  module.hot.accept('./index.ts');
  module.hot.accept('../app', () => {
    const NewApp = require('../app').default;
    renderApp(appContainer, NewApp);
  });
}

renderApp(appContainer, App);
showPage();
