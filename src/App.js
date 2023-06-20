import React, { useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './Context/AuthContext';

function App() {
  const ctx = useContext(AuthContext);

  
  return (
    
      <React.Fragment>
      <MainHeader isAuthenticated={ctx.isLoggedIn} onLogout={ctx.onLogout} />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
      </React.Fragment>
  );
}

export default App;
