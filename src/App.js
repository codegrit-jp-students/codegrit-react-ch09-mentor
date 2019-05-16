import React from 'react';
import Chat from './components/Chat';
import Auth from './Auth';
import LoginPage from './components/LoginPage';
import LoginForm from './components/LoginForm';
import LogoutLink from './components/LogoutLink';

function App() {
  // 分かりやすいように'margin: 50px'を適用しています。
  return (
    <div className="App" style={{ margin: 50 }}>
      <Auth>
        {(authProps) => {
          if (authProps.isLoggedIn) {
            const { me, logout } = authProps;
            return (
              <>
                <LogoutLink me={me} logout={logout} />
                <Chat />
              </>
            );
          } else {
            return <LoginForm login={authProps.login} />
          }
        }}
      </Auth>
    </div>
  );
}

export default App;
