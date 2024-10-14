import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPost } from "../features/posts/postsSlice";
import { DeleteAlertButton } from "./DeleteAlertButton";

export const PostOwnerMenu = ({ postId }) => {
	const [open, setOpen] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const close = () => {
		setOpen(null);
	};

	const editPost = () => {
		close();
		dispatch(getPost(postId));
		navigate(`/post/edit/${postId}`);
	};

	const deletePost = () => {
		close();
		console.log("deletePost");
	};

	const handleClick = (e) => {
		setOpen(e.currentTarget);
	};

	return (
		<>
			<IconButton style={{ cursor: "pointer" }} onClick={handleClick}>
				<MoreVert />
			</IconButton>
			<Menu anchorEl={open} open={Boolean(open)} onClose={close}>
				<MenuItem onClick={editPost}>Edit Post</MenuItem>
				{/* <MenuItem onClick={deletePost}>Delete Post</MenuItem> */}
				<DeleteAlertButton type="post" uid={postId} />
			</Menu>
		</>
	);
};
