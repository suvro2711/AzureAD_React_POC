export const msalConfig = {
	auth: {
		clientId: "09f8a17f-5f64-4367-b50c-53f6cd6fafcb",
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