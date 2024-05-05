import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePost, dislikePost } from "../features/posts/postsSlice";
import {
	Card,
	CardHeader,
	Avatar,
	CardMedia,
	CardContent,
	CardActions,
	IconButton,
	Chip,
} from "@mui/material";
import {
	ThumbDownAlt,
	ThumbDownOffAlt,
	ThumbUpOffAlt,
	ThumbUpAlt,
	MoreVert,
} from "@mui/icons-material";

export default function Post({ post }) {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.users.user);
	const loading = useSelector((state) => state.posts.loading);
	let likes = post.likes;
	let dislikes = post.dislikes;
	// Checking if the user has liked (true) or disliked (false) the post, or neither (null)
	const [userLikedStatus, setUserLikedStatus] = useState(null);

	const onShowMore = () => {
		console.log("show more of post: ", post._id);
	};

	const onLike = () => {
		if (!loading) {
			if (userLikedStatus === null) {
				console.log("ONE");
				setUserLikedStatus(true);
				dispatch(likePost(post._id));
				likes++;
			} else if (userLikedStatus === false) {
				console.log("TWO");
				setUserLikedStatus(true);
				dispatch(likePost(post._id));
				dislikes--;
				likes++;
			} else {
				console.log("THREE");
				setUserLikedStatus(null);
				likes--;
			}
			dispatch(likePost(post._id));
		}
	};

	const onDislike = () => {
		if (!loading) {
			if (userLikedStatus === null) {
				setUserLikedStatus(false);
				!loading ? dispatch(likePost(post._id)) : console.log("Almost!");
			} else if (userLikedStatus) {
				setUserLikedStatus(false);
			} else {
				setUserLikedStatus(null);
			}

			dispatch(dislikePost(post._id));
		}
	};

	useEffect(() => {
		if (user?._id) {
			if (post.usersLiked.includes(user?._id)) {
				setUserLikedStatus(true);
			} else if (post.usersDisliked.includes(user?._id)) {
				setUserLikedStatus(false);
			} else {
				setUserLikedStatus(null);
			}
		}
	}, []);

	return (
		<Card className="w-96">
			<CardHeader
				avatar={<Avatar src={post.authorPFP ? post.authorPFP : null}></Avatar>}
				title={post.title}
				subheader={post.author}
				action={
					post.authorId === user?._id ? (
						<IconButton>
							<MoreVert></MoreVert>
						</IconButton>
					) : null
				}
			/>
			{post.imageUrl && (
				<CardMedia
					component="img"
					height="100"
					alt={post.title}
					image={post.imageUrl}
					className="max-h-96"
				/>
			)}
			<CardContent>
				<p>{post.caption}</p>
			</CardContent>
			<CardActions disableSpacing>
				{user?._id && post.likesEnabled && !loading ? (
					<>
						<IconButton aria-label="like" onClick={onLike}>
							{userLikedStatus ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
						</IconButton>
						<p>{likes}</p>
						<IconButton aria-label="dislike" onClick={onDislike}>
							{userLikedStatus === false ? (
								<ThumbDownAlt />
							) : (
								<ThumbDownOffAlt />
							)}
						</IconButton>
						<p>{dislikes}</p>
						<IconButton aria-label="share">{/* <ShareIcon /> */}</IconButton>
						<IconButton aria-label="comment">
							{/* <CommentIcon /> */}
						</IconButton>
					</>
				) : loading ? (
					<p>Loading...</p>
				) : (
					<p>Login to interact with this post!</p>
				)}
				<Chip
					variant="outlined"
					color="info"
					size="small"
					label="Show More"
					sx={{ marginLeft: "auto" }}
					onClick={onShowMore}
				/>
			</CardActions>
		</Card>
	);
}
