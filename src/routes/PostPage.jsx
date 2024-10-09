import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	TextField,
	Switch,
	FormGroup,
	FormControlLabel,
	Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import xss from "xss";
import { io } from "socket.io-client";

import { create } from "../features/posts/postsSlice";

// import Image from '../../public/'

import MediaInput from "../components/MediaInput";
import PostPreview from "../components/PostPreview";

export default function PostPage() {
	const { type } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users.user);
	const [socket, setSocket] = useState(null);

	const [title, setTitle] = useState("");
	const [caption, setCaption] = useState("");
	const [image, setImage] = useState(null);
	const [likesEnabled, setLikesEnabled] = useState(true);

	const [valid, setValid] = useState(false);

	const apiUrl = import.meta.env.PROD
		? "https://groupomapi-04954ed60b77.herokuapp.com"
		: "http://localhost:3123";

	useEffect(() => {
		if (!user._id) {
			navigate("/login");
		} else if (user?._id) {
			const newSocket = io(`${apiUrl}`);
			setSocket(newSocket);

			return () => newSocket.disconnect();
		}
	}, [user]);

	useEffect(() => {
		if (socket && user?._id) {
			socket.on("connect_error", (err) => {
				console.error("Connection error due to: ", err);
			});

			socket.on("connect", () => {
				console.log("Connected!");
			});

			socket.emit("addUser", user._id);

			return () => {
				socket?.off("connect");
				socket?.off("connect_error");
			};
		}
	}, [socket, user]);

	useEffect(() => {
		setValid(title === xss(title) && caption === xss(caption) && title);
	}, [title, caption]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (type === "create") {
			dispatch(create({ title, caption, image, likesEnabled }));
			socket.emit("post");
		}

		navigate("/");
	};

	return (
		<>
			<div className="bg-[url('/PostFormBackground.webp')] bg-cover w-screen h-screen z-0 absolute top-0"></div>
			<div className="my-12 mx-auto w-10/12 shadow rounded-md backdrop-filter backdrop-blur-xl">
				<CloseIcon
					sx={{ fontSize: 40 }}
					className="z-10 absolute top-8 right-8 cursor-pointer"
					onClick={() => navigate("/")}
				/>
				<h1 className="font-semibold text-lg py-8 text-center">
					{type.charAt(0).toUpperCase() + type.slice(1)} your post here!
				</h1>
				<div className="grid grid-cols-2">
					<form
						className="space-y-6 mx-auto pb-8 flex flex-col w-64"
						onSubmit={handleSubmit}
					>
						<TextField
							variant="outlined"
							label="Title"
							value={title}
							onChange={({ target }) => setTitle(xss(target.value))}
						/>
						<TextField
							variant="outlined"
							label="Caption"
							value={caption}
							onChange={({ target }) => setCaption(xss(target.value))}
						/>
						<MediaInput media={image} change={(data) => setImage(data)} />
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										checked={likesEnabled}
										onChange={() => setLikesEnabled(!likesEnabled)}
									/>
								}
								label="Likes Enabled"
							/>
						</FormGroup>
						<Button
							type="submit"
							color="secondary"
							variant="contained"
							className="bg-purple-500 text-white py-2 px-4 rounded-md"
							disabled={!valid}
						>
							{type.charAt(0).toUpperCase() + type.slice(1)} your post!
						</Button>
					</form>
					<PostPreview
						title={title}
						caption={caption}
						likesEnabled={likesEnabled}
						author={user.username}
						authorPFP={user.profilePictureUrl}
						imageUrl={image}
					/>
				</div>
			</div>
		</>
	);
}
