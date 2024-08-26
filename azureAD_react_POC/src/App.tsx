import reactLogo from './assets/react.svg'
import './App.css'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './auth-config'
import { useState } from 'react'

const msalInstance = new PublicClientApplication(msalConfig);
const App = () => {
  const [userName, setUserName] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    try {
      setIsLoggingIn(true);
      await msalInstance.initialize();
      const loginResult = await msalInstance.loginPopup({
        scopes: msalConfig.scope,
        prompt: 'select_account' //
      });
      setUserName(loginResult.account.name || '');
      setLoggedIn(true);
      console.log(loginResult);
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoggingIn(false);
    }

  }   

  const logout = async () => {
    try {
      await msalInstance.logout();
      setUserName('');
      setLoggedIn(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  return (
		<>
			<div>
				{loggedIn ? <h2>Hey, {userName}</h2> : <></>}
				<a
					href="https://learn.microsoft.com/en-us/azure/active-directory-b2c/"
					target="_blank"
				>
					<img
						src={"https://swimburger.net/media/0zcpmk1b/azure.jpg"}
						className="logo"
						alt="Vite logo"
					/>
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Exploring Azure AD</h1>
			<div className="card">
				<button onClick={() => (!loggedIn ? login() : logout())}>
					{isLoggingIn ? <h2>Logging in...</h2> : <></>}
					{!loggedIn && !isLoggingIn ? (
						<h2>Login using MSAL</h2>
					) : !isLoggingIn ? (
						<h2>Log out</h2>
					) : (
						<></>
					)}
				</button>
				{/* <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}
			</div>
			{/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
		</>
	);
}

export default App
