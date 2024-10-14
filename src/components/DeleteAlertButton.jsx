import React, { useState } from "react";
import {
	Button,
	MenuItem,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deletePost } from "../features/posts/postsSlice";

export const DeleteAlertButton = ({ type, uid }) => {
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const dispatchDelete = () => {
		console.log("delete post: ", uid);
		dispatch(deletePost(uid));
	};

	const deleteAccount = () => {
		console.log("delete account: ", uid);
	};

	const onClickOpen = () => {
		setOpen(true);
	};

	const onClickClose = () => {
		type === "post" ? dispatchDelete() : null;
		setOpen(false);
	};

	if (type === "post") {
		return (
			<>
				<MenuItem onClick={onClickOpen}>Delete</MenuItem>
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you want to delete this post? It will be permanently
							removed from the database!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								onClickClose();
							}}
							variant="contained"
							color="primary"
						>
							Don't Delete
						</Button>
						<Button
							onClick={() => {
								onClickClose();
							}}
							variant="outlined"
							color="error"
						>
							Delete Permanently!
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	}

	if (type === "user") {
		return (
			<>
				<Button variant="contained" color="error" onClick={onClickOpen}>
					Delete
				</Button>
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you want to delete this post? It will be permanently
							removed from the database!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								onClickClose();
							}}
							variant="contained"
							color="primary"
						>
							Don't Delete
						</Button>
						<Button
							onClick={() => {
								onClickClose();
							}}
							variant="outlined"
							color="error"
						>
							Delete Permanently!
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	}
};
