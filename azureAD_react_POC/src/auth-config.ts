export const msalConfig = {
	auth: {
		clientId: "a7d78880-3cd0-46aa-8193-e5168f89aa32",
		// authority: "https://login.microsoftonline.com/common/", // For multi-tenant applications
		authority: "https://login.microsoftonline.com/shubhroPOC.onmicrosoft.com", // For single-tenant applications
		redirectUri: "http://localhost:5173", // Replace with your actual redirect URI
	},
	cache: {
		cacheLocation: "localStorage", // Or "sessionStorage" for session-based caching
		storeAuthStateInCookie: false, // Set to true if you want to store authentication state in a cookie
	},
	scope: ["User.Read"],
};