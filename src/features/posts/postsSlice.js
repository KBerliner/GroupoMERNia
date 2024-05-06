import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const signup = createAsyncThunk("user/signup", async (body) => {
// 	console.log(body);
// 	const response = await fetch("http://localhost:3123/api/users/signup", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(body),
// 	});

// 	const data = await response.json();
// 	return data.user;
// });

// export const login = createAsyncThunk("user/login", async (body) => {
// 	const response = await fetch("http://localhost:3123/api/users/login", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(body),
// 	});

// 	const data = await response.json();

// 	if (!response.ok) {
// 		throw new Error(data.error);
// 	} else {
// 		return data.user;
// 	}
// });

export const likePost = createAsyncThunk("posts/like", async (id) => {
	const response = await fetch(`http://localhost:3123/api/posts/like/${id}`, {
		method: "PUT",
		credentials: "include",
	});

	const data = await response.json();
	return data;
});

export const dislikePost = createAsyncThunk("posts/dislike", async (id) => {
	const response = await fetch(
		`http://localhost:3123/api/posts/dislike/${id}`,
		{
			method: "PUT",
			credentials: "include",
		}
	);

	const data = await response.json();
	return data;
});

export const getAll = createAsyncThunk("posts/getAll", async () => {
	const response = await fetch("http://localhost:3123/api/posts");
	const data = await response.json();
	return data;
});

export const create = createAsyncThunk("posts/create", async (body) => {
	console.log("HERES THE BODY", body);
	const response = await fetch("http://localhost:3123/api/posts", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return data.post;
});

export const postsSlice = createSlice({
	name: "posts",
	initialState: {
		posts: [],
		error: false,
		loading: false,
	},
	extraReducers: (builder) => {
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.posts = action.payload;
			state.error = false;
			state.loading = false;
		});
		builder.addCase(getAll.rejected, (state, action) => {
			state.loading = false;
			state.error = true;
		});
		builder.addCase(getAll.pending, (state, action) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(likePost.fulfilled, (state, action) => {
			state.posts.find((post) => post._id === action.payload.id).likes =
				action.payload.likes;
			state.posts.find((post) => post._id === action.payload.id).dislikes =
				action.payload.dislikes;
			state.error = false;
			state.loading = false;
		});
		builder.addCase(likePost.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
		});
		builder.addCase(likePost.pending, (state, action) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(dislikePost.fulfilled, (state, action) => {
			state.posts.find((post) => post._id === action.payload.id).likes =
				action.payload.likes;
			state.posts.find((post) => post._id === action.payload.id).dislikes =
				action.payload.dislikes;
			state.error = false;
			state.loading = false;
		});
		builder.addCase(dislikePost.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
		});
		builder.addCase(dislikePost.pending, (state, action) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(create.fulfilled, (state, action) => {
			console.log(action.payload);
			state.posts.push(action.payload);
			state.error = false;
			state.loading = false;
		});
		builder.addCase(create.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
		});
		builder.addCase(create.pending, (state, action) => {
			state.error = false;
			state.loading = true;
		});
	},
});

export default postsSlice.reducer;
