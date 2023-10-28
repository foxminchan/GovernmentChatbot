import { Route, Switch, BrowserRouter } from 'react-router-dom';
import NxWelcome from './components/NxBase/nx-welcome';
import { NotFound } from './components/NotFound/not-found';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={NxWelcome} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
