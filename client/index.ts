import renderApp from './render-app';

function handleDOMContentLoaded() {
  const appContainer: HTMLElement | null = document.querySelector('#app');
  if (appContainer) {
    renderApp(appContainer);
  }
}
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
