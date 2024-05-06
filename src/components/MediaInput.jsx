import React from "react";

export default function MediaInput({ media, change }) {
	return (
		<div className="col-span-full">
			<label
				htmlFor="mediaInput"
				className="block text-md font-medium leading-6 text-gray-800"
			>
				Media
			</label>
			<div className="mt-2 flex items-center gap-x-3">
				<input
					type="file"
					className="rounded-md bg-gray-100/10 px-2.5 py-1.5 text-sm font-semibold text-gray-800/75 shadow-sm ring-1 ring-inset ring-teal-100/20 hover:bg-gray-50/20 file:py-2 file:px-4 file:bg-violet-50/75 file:rounded-full hover:file:bg-violet-100 file:border-none file:text-violet-700"
					onChange={({ target: { files } }) => files[0] && change(files[0])}
				></input>
			</div>
		</div>
	);
}
