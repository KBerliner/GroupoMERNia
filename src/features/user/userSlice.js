import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.PROD
	? "https://groupomapi-04954ed60b77.herokuapp.com"
	: "http://localhost:3123";

export const signup = createAsyncThunk("user/signup", async (body) => {
	console.log(body);
	const response = await fetch(`${apiUrl}/api/users/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return data.user;
});

export const login = createAsyncThunk("user/login", async (body) => {
	const response = await fetch(`${apiUrl}/api/users/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
		credentials: "include",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error);
	} else {
		return data.user;
	}
});

export const logout = createAsyncThunk("user/logout", async () => {
	const response = await fetch(`${apiUrl}/api/users/logout`, {
		method: "POST",
		credentials: "include",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error);
	} else {
		return data.success;
	}
});

export const editAccount = createAsyncThunk(
	"user/edit_account",
	async (body) => {
		const formData = new FormData();
		if (body.pfp) {
			formData.append("file", body.pfp);
		}

		formData.append("email", body.email);

		const response = await fetch(`${apiUrl}/api/users/`, {
			method: "PUT",
			body: formData,
			credentials: "include",
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error);
		} else {
			return data.user;
		}
	}
);

export const deleteAccount = createAsyncThunk(
	"user/delete_account",
	async () => {
		console.log("DELETE");
	}
);

export const persist = createAsyncThunk("users/persist", async () => {
	const response = await fetch(`${apiUrl}/api/users/persist`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error);
	} else {
		return data.user;
	}
});

export const sendFriendRequest = createAsyncThunk(
	"users/sendFriendRequest",
	async (body) => {
		console.log("Sending friend request", body);
		const response = await fetch(`${apiUrl}/api/users/sendFriendRequest`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(body),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error);
		} else {
			return data;
		}
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: {},
		error: false,
		loading: false,
	},
	extraReducers: (builder) => {
		builder.addCase(signup.fulfilled, (state, action) => {
			state.user = action.payload;
			state.error = false;
			state.loading = false;
		});
		builder.addCase(signup.rejected, (state, action) => {
			state.user = action.payload;
			state.error = true;
		});
		builder.addCase(signup.pending, (state, action) => {
			state.user = action.payload;
			state.error = false;
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload;
			state.error = false;
			state.loading = false;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
		});
		builder.addCase(login.pending, (state, action) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			state.user = {};
			state.error = false;
			state.loading = false;
		});
		builder.addCase(logout.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
		});
		builder.addCase(logout.pending, (state, action) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(editAccount.fulfilled, (state, action) => {
			state.user = action.payload;
			state.error = false;
			state.loading = false;
		});
		builder.addCase(editAccount.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
		});
		builder.addCase(editAccount.pending, (state, action) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(deleteAccount.fulfilled, (state, action) => {
			state.user = {};
			state.error = false;
			state.loading = false;
		});
		builder.addCase(deleteAccount.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
		});
		builder.addCase(deleteAccount.pending, (state, action) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(persist.fulfilled, (state, action) => {
			state.user = action.payload;
			state.error = false;
			state.loading = false;
		});
		builder.addCase(persist.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
		});
		builder.addCase(persist.pending, (state, action) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
			if (action.payload.type === "friend") {
				state.user.friends.push(action.payload.request);
			} else {
				state.user.sentRequests.push(action.payload.request);
			}
			state.error = false;
			state.loading = false;
		});
		builder.addCase(sendFriendRequest.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
		});
		builder.addCase(sendFriendRequest.pending, (state, action) => {
			state.error = false;
			state.loading = true;
		});
	},
});

export default userSlice.reducer;
