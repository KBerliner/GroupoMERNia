import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../components/UserForm";

export default function HomePage() {
	const [onLogin, setOnLogin] = useState(false);
	const [onProfile, setOnProfile] = useState(false);
	return (
		<>
			{onLogin ? (
				<UserForm onExit={() => setOnLogin(false)} />
			) : (
				<button onClick={() => setOnLogin(true)}>Click here to login</button>
			)}
		</>
	);
}
