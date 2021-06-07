import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PublicPage from './components/PublicPage';
import AuthProvider from './components/AuthProvider';
import Todos from './components/Todos';


function Wrapper(props) {
  const [isLogged, setIsLogged] = React.useState(false);
  return (
    <>
      <div>{`Is logged: ${isLogged}`}</div>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
