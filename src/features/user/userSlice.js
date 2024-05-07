import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk("user/signup", async (body) => {
	console.log(body);
	const response = await fetch("http://localhost:3123/api/users/signup", {
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
	const response = await fetch("http://localhost:3123/api/users/login", {
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

export const editAccount = createAsyncThunk(
	"user/edit_account",
	async (body) => {
		console.log(body);
	}
);

export const deleteAccount = createAsyncThunk(
	"user/delete_account",
	async () => {
		console.log("DELETE");
	}
);

export const persist = createAsyncThunk("users/persist", async () => {
	const response = await fetch("http://localhost:3123/api/users/persist", {
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
		const response = await fetch(
			"http://localhost:3123/api/users/sendFriendRequest",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(body),
			}
		);

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
	},
});

export default userSlice.reducer;
