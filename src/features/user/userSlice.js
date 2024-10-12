import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persist } from "../../utils/persist";

const apiUrl = import.meta.env.PROD
	? "https://groupomapi-04954ed60b77.herokuapp.com"
	: "http://localhost:3123";

export const signup = createAsyncThunk("user/signup", async (body) => {
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

		const request = () => {
			return fetch(`${apiUrl}/api/users/`, {
				method: "PUT",
				body: formData,
				credentials: "include",
			});
		};

		let response = await request();

		if (!response.ok) {
			response = await persist(request);
			if (!response.ok) {
				throw new Error(response.error);
			}
		}

		const data = await response.json();
		return data.user;
	}
);

export const deleteAccount = createAsyncThunk(
	"user/delete_account",
	async () => {
		console.log("DELETE");
	}
);

export const initialPersist = createAsyncThunk("users/persist", async () => {
	try {
		const response = await fetch(`${apiUrl}/api/users/persist`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (
			!response.ok &&
			response.status === 401 &&
			response.statusText === "Unauthorized"
		) {
			throw new Error("You must login again!");
		} else {
			const data = await response.json();
			return data.user;
		}
	} catch (e) {
		console.error("Error persisting user: ", e);
	}
});

export const sendFriendRequest = createAsyncThunk(
	"users/sendFriendRequest",
	async (body) => {
		const request = () => {
			return fetch(`${apiUrl}/api/users/sendFriendRequest`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(body),
			});
		};

		let response = await request();

		if (!response.ok) {
			response = await persist(request);
			if (!response.ok) {
				throw new Error(response.error);
			}
		}

		const data = await response.json();
		return data;
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: {},
		newPosts: false,
		error: false,
		loading: false,
	},
	reducers: {
		getNewPostUpdate(state) {
			state.newPosts = true;
		},
		reloadForNewPost(state) {
			state.newPosts = false;
		},
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
		builder.addCase(initialPersist.fulfilled, (state, action) => {
			state.user = action.payload;
			state.error = false;
			state.loading = false;
		});
		builder.addCase(initialPersist.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
		});
		builder.addCase(initialPersist.pending, (state, action) => {
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

export const { getNewPostUpdate, reloadForNewPost } = userSlice.actions;
export default userSlice.reducer;
