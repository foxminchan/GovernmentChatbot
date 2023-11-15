import App from './app';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './common/utils/store';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root') as HTMLElement
);
