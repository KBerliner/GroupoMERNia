import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/user/userSlice";
import ProfilePictureInput from "./ProfilePictureInput";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Image from "../../public/icon-left-font-monochrome-black.svg";
import xss from "xss";

export default function UserForm({ onExit }) {
	const loading = useSelector((state) => state.users.loading);
	const dispatch = useDispatch();

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const generalRegex = /^[a-zA-Z0-9\s.,'-]+$/;

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [pfp, setPfp] = useState("");
	const [valid, setValid] = useState(false);
	const [login, setLogin] = useState(false);

	const handleChange = (input, value) => {
		switch (input) {
			case "username":
				if (generalRegex.test(value) || !value) setUsername(xss(value));
				break;
			case "email":
				setEmail(xss(value));
				break;
			case "password":
				if (generalRegex.test(value) || !value) setPassword(xss(value));
				break;
		}
	};

	useEffect(() => {
		if (
			generalRegex.test(username) &&
			emailRegex.test(email) &&
			generalRegex.test(password) &&
			username &&
			email &&
			password
		) {
			setValid(true);
		} else {
			setValid(false);
		}
	}, [username, email, password]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({
			username,
			password,
			email,
			pfp,
		});
		dispatch(
			signup({
				username,
				password,
				email,
				pfp,
			})
		);
	};

	return (
		<div className="grid place-items-center border h-screen">
			<div className="bg-[url('../../public/FormImage.webp')] bg-cover w-screen h-screen z-0 absolute"></div>
			<form className="flex flex-col px-24 py-20 space-y-6 bg-purple-400/25 rounded-lg backdrop-filter backdrop-blur-2xl z-10 shadow-md">
				<CloseIcon
					sx={{ fontSize: 40 }}
					className="z-10 absolute top-8 right-8 cursor-pointer"
					onClick={onExit}
				/>
				<img src={Image} className="mb-8 w-80 self-center" />
				<h2 className="self-center text-xl leading-3 font-semibold tracking-wide">
					{login ? "Login Below" : "Signup Below"}
				</h2>
				{!login && (
					<TextField
						label="Username"
						variant="standard"
						onChange={({ target }) => handleChange("username", target.value)}
						value={username}
					/>
				)}
				<TextField
					label="Email"
					variant="standard"
					error={false}
					onChange={({ target }) => handleChange("email", target.value)}
					value={email}
				/>
				<TextField
					label="Password"
					variant="standard"
					type="password"
					onChange={({ target }) => handleChange("password", target.value)}
					value={password}
				/>
				{!login && (
					<ProfilePictureInput pfp={pfp} change={(data) => setPfp(data)} />
				)}
				<Button variant="contained" onClick={handleSubmit} disabled={!valid}>
					Submit
				</Button>
				{!login ? (
					<p>
						Already have an account?{" "}
						<strong className="cursor-pointer" onClick={() => setLogin(!login)}>
							Login Here
						</strong>
					</p>
				) : (
					<p>
						Don't have an account yet?{" "}
						<strong className="cursor-pointer" onClick={() => setLogin(!login)}>
							Signup Here
						</strong>
					</p>
				)}
			</form>
		</div>
	);
}
