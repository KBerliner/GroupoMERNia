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
	return data;
});

export const login = createAsyncThunk("user/login", async (body) => {
	const response = await fetch("http://localhost:3123/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const data = await response.json();
	return data;
});

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
	},
});

export default userSlice.reducer;
