import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	Card,
	CardHeader,
	Avatar,
	CardMedia,
	CardContent,
	CardActions,
	IconButton,
	Chip,
	Typography,
} from "@mui/material";
import {
	ThumbDownAlt,
	ThumbDownOffAlt,
	ThumbUpOffAlt,
	ThumbUpAlt,
	MoreVert,
} from "@mui/icons-material";

export default function Post({
	authorPFP,
	title,
	caption,
	author,
	imageUrl,
	likesEnabled,
	type,
}) {
	// Checking if the user has liked (true) or disliked (false) the post, or neither (null)
	const [userLikedStatus, setUserLikedStatus] = useState(null);
	console.log(imageUrl);

	return (
		<Card className="w-96 mx-auto h-min mb-8">
			<CardHeader
				avatar={<Avatar src={authorPFP ? authorPFP : null}></Avatar>}
				title={title}
				subheader={author}
				action={
					<IconButton>
						<MoreVert></MoreVert>
					</IconButton>
				}
			/>
			{imageUrl && (
				<CardMedia
					component="img"
					height="100"
					alt={title}
					image={
						type === "edit" && typeof imageUrl === "string"
							? imageUrl
							: URL.createObjectURL(imageUrl)
					}
					className="max-h-96"
				/>
			)}
			<CardContent>
				<p className="max-w-80 text-pretty break-words">{caption}</p>
			</CardContent>
			<CardActions disableSpacing>
				{likesEnabled && (
					<>
						<IconButton aria-label="like">
							{userLikedStatus ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
						</IconButton>
						<p>0</p>
						<IconButton aria-label="dislike">
							{userLikedStatus === false ? (
								<ThumbDownAlt />
							) : (
								<ThumbDownOffAlt />
							)}
						</IconButton>
						<p>0</p>
					</>
				)}
			</CardActions>
		</Card>
	);
}
