import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Post from "../components/Post";
import { getAll } from "../features/posts/postsSlice";
import { persist } from "../features/user/userSlice";
import { Fab } from "@mui/material";
import { Refresh } from "@mui/icons-material";

export default function HomePage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(persist());
		dispatch(getAll());
	}, []);

	const refresh = () => {
		dispatch(getAll());
	};

	const posts = useSelector((state) => state.posts.posts);

	return (
		<>
			<Header />
			<ul className="my-32 py-12 px-32 grid grid-cols-1 gap-8">
				<li className="flex justify-center">
					<Fab size="small" color="primary" onClick={refresh}>
						<Refresh fontSize="medium"></Refresh>
					</Fab>
				</li>
				{posts &&
					posts.map((post) => {
						return (
							<li key={post._id} className="flex justify-center">
								<Post post={post} />
							</li>
						);
					})}
			</ul>
		</>
	);
}
