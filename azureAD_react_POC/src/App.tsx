import reactLogo from './assets/react.svg'
import './App.css'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './auth-config'
import { useEffect, useState } from 'react'

const msalInstance = new PublicClientApplication(msalConfig);
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const logout =async () => {
   await msalInstance.initialize()
		try {
			await msalInstance.loginRedirect();
			setLoggedIn(false);
		} catch (error) {
      console.error("Logout failed", error);
		}
	};
  
  const userData = getUserData();

  useEffect(() => {
		if (userData?.message) {
			setLoggedIn(true);
		}
	}, [userData]);

	function redirectToUserFlow() {
		// Replace the placeholder URL with your actual user flow URL
		const userFlowUrl =
			"https://shubhroPOC.b2clogin.com/shubhroPOC.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_HELLOWORLD_USERINPUT&client_id=b0c6526a-68c7-4b61-91df-aa057da8a63a&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F&scope=openid&response_type=id_token&prompt=login";

		window.location.href = userFlowUrl;
	}

	return (
		<>
			<div>
				{loggedIn ? <h2>{userData.message}</h2> : <></>}
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
				<button onClick={() => (loggedIn ? logout() : redirectToUserFlow())}>
					{!loggedIn ? <h2>Login using MSAL</h2> : <h2>Log out</h2>}
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
};

export default App

const getUserData = () => {
  const idToken = getIdTokenFromUrl();
  console.log("idToken", idToken);
  try {
    if (idToken) {
      const idTokenPayload = JSON.parse(atob(idToken.split('.')[1]));
      console.log("idTokenPayload", idTokenPayload);
      return idTokenPayload;
    }
  } catch {
    return null
  }
  function getIdTokenFromUrl() {
    const url = new URL(window.location.href);
    const idToken = url.hash.substring(1); // Remove the '#' from the hash
    return idToken;
  }
}