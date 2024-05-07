import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
	Avatar,
	Button,
	Container,
	CssBaseline,
	TextField,
	Typography,
	Tabs,
	Tab,
} from "@mui/material";

import ProfileTabPanel from "../components/ProfileTabPanel";
import FriendsTable from "../components/FriendsTable";

import { deleteAccount, editAccount } from "../features/user/userSlice";

export default function ProfilePage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.users.user);
	const [sentRequests, setSentRequests] = useState(user.sentRequests || []);
	const [receivedRequests, setReceivedRequests] = useState(
		user.receivedRequests || []
	);
	const [friends, setFriends] = useState(user.friends || []);
	const [blocked, setBlocked] = useState(user.blocked || []);
	const loading = useSelector((state) => state.users.loading);
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		if (!user._id) {
			navigate("/login");
		} else {
			const newSocket = io("http://localhost:3123");
			setSocket(newSocket);

			return () => newSocket.disconnect();
		}
	}, [user]);

	useEffect(() => {
		if (socket) {
			socket.on("connect_error", (err) => {
				console.error("Connection error due to: ", err);
			});

			socket.on("connect", () => {
				console.log("Connected");
			});

			socket.emit("addUser", user._id);

			socket.on("receivedFriendRequest", (request) => {
				console.log(receivedRequests, request);
				setReceivedRequests((prevRequests) => [...prevRequests, request]);
			});

			socket.on("deniedFriendRequest", (request) => {
				setSentRequests((prevRequests) =>
					prevRequests.filter((req) => req.recipient._id === request.senderId)
				);
			});

			socket.on("friendRequestAccept", (request) => {
				setFriends((prevFriends) => [...prevFriends, request]);
			});

			return () => {
				socket?.off("conect");
				socket?.off("connect_error");
				socket?.off("receivedFriendRequest");
				socket?.off("deniedFriendRequest");
				socket?.off("friendRequestAccept");
			};
		}
	}, [socket, user]);

	const [username, setUsername] = useState(user?.username || "");
	const [email, setEmail] = useState(user?.email || "");

	const [currentTab, setCurrentTab] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("SUBMIT");
		// navigate("/");
	};

	const handleDelete = (e) => {
		e.preventDefault();
		console.log("DELETE");
		// navigate("/");
		socket.emit("friendRequest", {
			senderId: user._id,
			recipientId: "66395210c06309a8bb5a1c3d",
			senderName: user.username,
			senderPfp: user.profilePictureUrl || "",
		});
	};

	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div className="mt-8 flex flex-col content-center">
				<Avatar src={user.profilePictureUrl || ""} className="m-1"></Avatar>
				<Typography component="h1" variant="h5">
					{user.username}
				</Typography>
				<Tabs
					value={currentTab}
					onChange={(e, v) => setCurrentTab(v)}
					variant="scrollable"
				>
					<Tab label="Profile" />
					<Tab label="Sent Friend Requests" />
					<Tab label="Received Friend Requests" />
					<Tab label="Friends" />
					<Tab label="Blocked Users" />
					<Tab label="Messages" />
				</Tabs>
				<ProfileTabPanel value={currentTab} index={0}>
					<form className="w-full mt-3" noValidate onSubmit={handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="email"
							label="Email Address"
							type="email"
							id="email"
							value={email}
							autoComplete="email"
						/>
						<Button
							variant="contained"
							color="primary"
							className="m-3"
							onClick={handleSubmit}
						>
							Save
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={handleDelete}
						>
							Delete
						</Button>
					</form>
				</ProfileTabPanel>
				<ProfileTabPanel value={currentTab} index={1}>
					<FriendsTable
						data={[
							{
								_id: 1234,
								username: "test",
								date: "2024-12-25",
							},
						]}
						type="sent"
					/>
				</ProfileTabPanel>
				<ProfileTabPanel value={currentTab} index={2}>
					<FriendsTable data={receivedRequests} type="received" />
				</ProfileTabPanel>
				<ProfileTabPanel value={currentTab} index={3}>
					<FriendsTable data="" type="friends" />
				</ProfileTabPanel>
				<ProfileTabPanel value={currentTab} index={4}>
					<FriendsTable data="" type="blocked" />
				</ProfileTabPanel>
				<ProfileTabPanel value={currentTab} index={5}>
					<h1>Messages</h1>
				</ProfileTabPanel>
			</div>
		</Container>
	);
}
