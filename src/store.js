import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import postsReducer from "./features/posts/postsSlice";

export default configureStore({
	reducer: {
		users: userReducer,
		posts: postsReducer,
	},
});
