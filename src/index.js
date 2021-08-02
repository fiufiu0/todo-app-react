import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PublicPage from './components/PublicPage';
import AuthProvider from './components/AuthProvider';
import Todos from './components/Todos';
import { DataContext } from './context/Context';


function Wrapper(props) {
  const [isLogged, setIsLogged] = React.useState(false);
  return (
    <>
      <div>{`Is logged: ${isLogged}`}</div>
      <DataContext>
        <Switch>
          <Route path="/todo">
            <AuthProvider>
              <App isLogged={isLogged} setIsLogged={setIsLogged} />
            </AuthProvider>
          </Route>
          <Route path="/todos/:id">
            <Todos />
          </Route>
          <Route path="/">
            <PublicPage isLogged={isLogged} setIsLogged={setIsLogged} />
          </Route>
        </Switch>
      </DataContext>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Wrapper>
      </Wrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);