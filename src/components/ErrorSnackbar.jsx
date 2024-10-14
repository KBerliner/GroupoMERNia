import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";

export const ErrorSnackbar = ({ errorMessage }) => {
	const usersError = useSelector((state) => state.users.error);
	const postsError = useSelector((state) => state.posts.error);
	const [open, setOpen] = useState(usersError || postsError);

	useEffect(() => {
		setOpen(usersError || postsError);
		// Reset error on component unmount
		return () => {
			setOpen(false);
		};
	}, [usersError, postsError]);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert severity="error">{errorMessage}</Alert>
			</Snackbar>
		</>
	);
};
