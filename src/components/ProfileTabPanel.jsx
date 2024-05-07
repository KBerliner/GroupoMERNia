import React from "react";

export default function ProfileTabPanel({ children, value, index, ...other }) {
	return <div>{value === index && <div>{children}</div>}</div>;
}
