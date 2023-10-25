import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import NxWelcome from './components/NxBase/nx-welcome';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <NxWelcome title="website" />
  </StrictMode>
);
