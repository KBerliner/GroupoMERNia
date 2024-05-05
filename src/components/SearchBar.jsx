import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
	return (
		<div className="flex">
			<TextField
				id="standard-basic"
				variant="outlined"
				placeholder="Search"
				className="w-full self-center"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
		</div>
	);
}
