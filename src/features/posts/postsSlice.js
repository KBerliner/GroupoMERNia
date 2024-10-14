import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persist } from "../../utils/persist";

const apiUrl = import.meta.env.PROD
	? "https://groupomapi-04954ed60b77.herokuapp.com"
	: "http://localhost:3123";

export const likePost = createAsyncThunk("posts/like", async (id) => {
	const request = () => {
		return fetch(`${apiUrl}/api/posts/like/${id}`, {
			method: "PUT",
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
	return data;
});

export const dislikePost = createAsyncThunk("posts/dislike", async (id) => {
	const request = () => {
		return fetch(`${apiUrl}/api/posts/dislike/${id}`, {
			method: "PUT",
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
	return data;
});

export const getAll = createAsyncThunk("posts/getAll", async () => {
	const response = await fetch(`${apiUrl}/api/posts`);
	const data = await response.json();
	return data;
});

export const getPost = createAsyncThunk("posts/getPost", async (postId) => {
	const response = await fetch(`${apiUrl}/api/posts/${postId}`);
	const data = await response.json();
	return data;
});

export const create = createAsyncThunk("posts/create", async (body) => {
	const formData = new FormData();

	if (body.imageUrl) {
		formData.append("file", body.image);
	}
	formData.append("title", body.title);
	formData.append("caption", body.caption);
	formData.append("likesEnabled", body.likesEnabled);

	const request = () => {
		return fetch(`${apiUrl}/api/posts`, {
			method: "POST",
			credentials: "include",
			body: formData,
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
	return data.post;
});

export const edit = createAsyncThunk("posts/edit", async (body) => {
	const formData = new FormData();

	if (body.image) {
		formData.append("file", body.image);
	}
	formData.append("title", body.title);
	formData.append("caption", body.caption);
	formData.append("likesEnabled", body.likesEnabled);

	const request = () => {
		return fetch(`${apiUrl}/api/posts/update/${body._id}`, {
			method: "PUT",
			credentials: "include",
			body: formData,
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
});

export const postsSlice = createSlice({
	name: "posts",
	initialState: {
		posts: [],
		currentPost: null,
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
		builder.addCase(getPost.pending, (state, action) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(getPost.fulfilled, (state, action) => {
			state.error = false;
			state.loading = false;
			state.currentPost = action.payload;
		});
		builder.addCase(getPost.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
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
		builder.addCase(edit.pending, (state, action) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(edit.fulfilled, (state, action) => {
			state.error = false;
			state.loading = false;
			const editedPostIndex = state.posts.findIndex((post) => {
				return post._id === action.payload._id;
			});

			state.posts[editedPostIndex] = action.payload;
		});
		builder.addCase(edit.rejected, (state, action) => {
			state.error = true;
			state.loading = false;
		});
	},
});

export default postsSlice.reducer;
