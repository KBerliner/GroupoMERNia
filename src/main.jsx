import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
	createBrowserRouter,
	RouterProvider,
	useNavigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import UserForm from "./components/UserForm.jsx";
import ProfilePage from "./routes/ProfilePage.jsx";
import PostPage from "./routes/PostPage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/login",
		element: <UserForm loggingIn={true} />,
	},
	{
		path: "/signup",
		element: <UserForm loggingIn={false} />,
	},
	{
		path: "/profile",
		element: <ProfilePage />,
	},
	{
		path: "/post/:type/:_id?",
		element: <PostPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
