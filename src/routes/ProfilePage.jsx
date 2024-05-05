import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	Avatar,
	Button,
	Container,
	CssBaseline,
	TextField,
	Typography,
} from "@mui/material";

import { deleteAccount, editAccount } from "../features/user/userSlice";

export default function ProfilePage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.users.user);
	const loading = useSelector((state) => state.users.loading);
	let initial = "";

	useEffect(() => {
		if (!user._id) {
			navigate("/login");
		} else {
			initial = user?.username[0].toUpperCase();
			console.log(initial);
		}
	}, [user]);

	const [username, setUsername] = useState(user?.username || "");
	const [email, setEmail] = useState(user?.email || "");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("SUBMIT");
		// navigate("/");
	};

	const handleDelete = (e) => {
		e.preventDefault();
		console.log("DELETE");
		// navigate("/");
	};

	console.log("INFO HERE: ", user, loading);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className="mt-8 flex flex-col content-center">
				<Avatar src={user.profilePictureUrl || ""} className="m-1"></Avatar>
				<Typography component="h1" variant="h5">
					{user.username}
				</Typography>
				<form className="w-full mt-3" noValidate onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						value={username}
						onChange={({ target }) => setUsername(target.value)}
						disabled
					/>

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
					<Button variant="contained" color="secondary" onClick={handleDelete}>
						Delete
					</Button>
				</form>
			</div>
		</Container>
	);
}
