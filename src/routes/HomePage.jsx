import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Post from "../components/Post";
import { getAll } from "../features/posts/postsSlice";
import { persist } from "../features/user/userSlice";
import { Fab } from "@mui/material";
import { Refresh, Add } from "@mui/icons-material";

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
	const user = useSelector((state) => state.users.user);

	const [query, setQuery] = useState("");

	const search = (value) => {
		setQuery(value);
	};

	return (
		<>
			<Header onSearch={(value) => search(value)} />
			<ul className="my-32 py-12 px-32 flex flex-col-reverse">
				{posts &&
					posts.map((post) => {
						if (
							post.title.toLowerCase().includes(query.toLowerCase()) ||
							post.caption.toLowerCase().includes(query.toLowerCase()) ||
							post.author.toLowerCase().includes(query.toLowerCase())
						) {
							return (
								<li key={post._id} className="flex justify-center my-8">
									<Post post={post} />
								</li>
							);
						}
					})}
				<li className="flex justify-center">
					<Fab
						sx={{ zIndex: 10 }}
						size="small"
						color="primary"
						onClick={refresh}
					>
						<Refresh fontSize="medium"></Refresh>
					</Fab>
				</li>
			</ul>
			{user._id && (
				<Fab
					sx={{ position: "fixed" }}
					className="bottom-12 right-16"
					color="secondary"
					onClick={() => navigate("/post/create")}
				>
					<Add fontSize="large"></Add>
				</Fab>
			)}
		</>
	);
}
