import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
	const [query, setQuery] = useState("");

	return (
		<form className="flex" onSubmit={onSearch(query)}>
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
