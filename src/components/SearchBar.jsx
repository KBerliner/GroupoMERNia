import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
	const [query, setQuery] = useState("");

	useEffect(() => {
		onSearch(query);
	}, [query]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
			}}
			className="flex"
		>
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
				onChange={({ target }) => setQuery(target.value)}
				value={query}
			/>
		</form>
	);
}
