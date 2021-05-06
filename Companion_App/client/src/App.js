import logo from './logo.svg';
import './App.css';
import { Router } from 'react-router-dom'
import { UserProfileProvider } from "./Providers/UserProfileProvider"
import Header from "./Header/Header";
import ApplicationViews from "./ApplicationViews/ApplicationViews";
import { createBrowserHistory } from 'history';

function App() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <UserProfileProvider>
        <Header />
        <ApplicationViews />
      </UserProfileProvider>
    </Router>
  );
}

export default App;
