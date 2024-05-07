import React from "react";

import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	Button,
	Avatar,
} from "@mui/material";

export default function FriendsTable({ data, type }) {
	let button = "";
	if (type === "sent") {
		button = "Recind Request";
	} else if (type === "received") {
		button = "Accept Request";
	} else if (type === "friends") {
		button = "Unfriend";
	} else if (type === "blocked") {
		button = "Unblock";
	}

	return (
		<TableContainer>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Date</TableCell>
						<TableCell>{button}</TableCell>
						{type === "friends" && <TableCell>Block</TableCell>}
					</TableRow>
				</TableHead>
				{data &&
					data.map((row) => {
						return (
							<TableRow key={row.senderId}>
								<TableCell>{row.senderName}</TableCell>
								<TableCell>{row.date}</TableCell>
								<TableCell>
									<Button>{button}</Button>
								</TableCell>
								{type === "friends" && (
									<TableCell>
										<Button>Block</Button>
									</TableCell>
								)}
							</TableRow>
						);
					})}
			</Table>
		</TableContainer>
	);
}
