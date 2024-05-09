import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../public/icon-left-font-monochrome-black.svg";
import SearchBar from "./SearchBar";
import {
	ButtonGroup,
	Button,
	TextField,
	InputAdornment,
	Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Header({ onSearch }) {
	const navigate = useNavigate();
	const user = useSelector((state) => state.users.user);

	return (
		<>
			<header className="shadow grid grid-cols-3 py-8 px-12 bg-yellow-100/40 backdrop-filter backdrop-blur-xl bg-center fixed top-0 right-0 left-0 z-20 h-32">
				<img src={Logo} className="w-64 self-center" />
				<SearchBar className="my-auto" onSearch={onSearch} />
				{!user._id ? (
					<ButtonGroup className="flex justify-end">
						<Button variant="outlined" onClick={() => navigate("/login")}>
							Log In
						</Button>
						<Button variant="contained" onClick={() => navigate("/signup")}>
							Sign Up
						</Button>
					</ButtonGroup>
				) : (
					<Avatar
						src={user?.profilePictureUrl}
						className="justify-self-end cursor-pointer"
						onClick={() => navigate("/profile")}
						sx={{ width: "4rem", height: "4rem", fontSize: "2rem" }}
					>
						{user.username[0].toUpperCase()}
					</Avatar>
				)}
			</header>
		</>
	);
}
