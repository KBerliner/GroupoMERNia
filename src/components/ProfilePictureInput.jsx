import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";

export default function ProfilePictureInput({ pfp, change }) {
	return (
		<div className="col-span-full">
			<label
				htmlFor="profilePicture"
				className="block text-md font-medium leading-6 text-gray-800"
			>
				Profile Picture
			</label>
			<div className="mt-2 flex items-center gap-x-3">
				{!pfp && <AccountCircleIcon sx={{ fontSize: 40, color: "white" }} />}
				{pfp && (
					<Avatar
						src={typeof pfp === "string" ? pfp : URL.createObjectURL(pfp)}
						width={50}
						className="rounded-full h-12 w-12 object-cover"
					/>
				)}
				<input
					type="file"
					className="rounded-md bg-gray-100/10 px-2.5 py-1.5 text-sm font-semibold text-gray-800/75 shadow-sm ring-1 ring-inset ring-teal-100/20 hover:bg-gray-50/20 file:py-2 file:px-4 file:bg-violet-50/75 file:rounded-full hover:file:bg-violet-100 file:border-none file:text-violet-700 cursor-pointer file:cursor-pointer"
					onChange={({ target: { files } }) => files[0] && change(files[0])}
				></input>
			</div>
		</div>
	);
}
