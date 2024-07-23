import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Post from "../components/Post";
import { getAll } from "../features/posts/postsSlice";
import { persist, sendFriendRequest } from "../features/user/userSlice";
import { Fab } from "@mui/material";
import { Refresh, Add } from "@mui/icons-material";
import { io } from "socket.io-client";

export default function HomePage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [socket, setSocket] = useState(null);

	const posts = useSelector((state) => state.posts.posts);
	const user = useSelector((state) => state.users.user);

	const apiUrl = import.meta.env.PROD
		? "https://groupomapi-04954ed60b77.herokuapp.com"
		: "http://localhost:3123";

	useEffect(() => {
		dispatch(persist());
		dispatch(getAll());
	}, []);

	const refresh = () => {
		dispatch(getAll());
	};

	useEffect(() => {
		if (user?._id) {
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

			socket.on("receivedFriendRequest", (request) => {
				console.log(request);
			});

			return () => {
				socket?.off("connect");
				socket?.off("connect_error");
			};
		}
	}, [socket, user]);

	const [query, setQuery] = useState("");

	const search = (value) => {
		setQuery(value);
	};

	const sendFR = (recipient) => {
		const requestBody = {
			senderId: user._id,
			recipientId: recipient,
			senderName: user.username,
			senderPfp: user.profilePictureUrl || "",
			date: Date.now(),
		};

		if (
			!user.sentRequests.find((request) => request.recipientId === recipient)
		) {
			dispatch(sendFriendRequest(requestBody));
			socket.emit("friendRequest", requestBody);
		} else {
			console.log("Friend request already sent");
		}
	};

	return (
		<>
			<Header onSearch={(value) => search(value)} />
			<ul className="my-32 py-12 px-32 flex flex-col-reverse">
				{posts &&
					posts.map((post) => {
						if (
							post.title.toLowerCase().includes(query.toLowerCase()) ||
							post.caption.toLowerCase().includes(query.toLowerCase()) ||
							post.author.toLowerCase().includes(query.toLowerCase())
						) {
							return (
								<li key={post._id} className="flex justify-center my-8">
									<Post post={post} sendFriendRequest={sendFR} />
								</li>
							);
						}
					})}
				<li className="flex justify-center">
					<Fab
						sx={{ zIndex: 10 }}
						size="small"
						color="primary"
						onClick={refresh}
					>
						<Refresh fontSize="medium"></Refresh>
					</Fab>
				</li>
			</ul>
			{user._id && (
				<Fab
					sx={{ position: "fixed" }}
					className="bottom-12 right-16"
					color="secondary"
					onClick={() => navigate("/post/create")}
				>
					<Add fontSize="large"></Add>
				</Fab>
			)}
		</>
	);
}
