const apiUrl = import.meta.env.PROD
	? "https://groupomapi-04954ed60b77.herokuapp.com"
	: "http://localhost:3123";

export const persist = async (originalRequest) => {
	const persistRequest = await fetch(`${apiUrl}/api/users/persist`, {
		method: "GET",
		credentials: "include",
	});

	// Checking if the refresh token is valid
	if (!persistRequest.ok) {
		console.log(persistRequest);
		return false;
	}

	// Resending original request with new access token
	const result = await originalRequest();

	// Returning original request's response
	return result;
};
