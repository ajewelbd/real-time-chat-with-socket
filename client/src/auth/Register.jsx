import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { isAutenticated, saveToStorage } from "../utils/common";
import { API_URL, EMAIL_CHECK_REGEX } from "../utils/constants";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

export default function Register() {
	const navigate = useNavigate();

	if (isAutenticated()) {
		navigate("/");
	}

	const [details, setDetails] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [isWrongName, setIsWrongName] = useState(false);
	const [isWrongEmail, setIsWrongEmail] = useState(false);
	const [isWrongPassword, setIsWrongPassword] = useState(false);

	const [isWrongDetails, setIsWrongDetails] = useState(false);

	const handleCredentials = (e) => {
		setDetails((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const register = async (event) => {
		event.preventDefault();
		setIsWrongDetails(false);

		const { name, email, password } = details;

		if (name.length < 4) {
			setIsWrongName(true)
			return;
		}

		if (!EMAIL_CHECK_REGEX.test(email)) {
			setIsWrongEmail(true)
			return;
		}

		if (password.length < 6) {
			setIsWrongPassword(true)
			return;
		}

		setIsWrongName(false)
		setIsWrongEmail(false)
		setIsWrongPassword(false)

		try {
			const { data } = await axios.post(`${API_URL}auth/register`, {
				name,
				email,
				password
			})
			saveToStorage("token", data.data.token)
			navigate("/")
		} catch (error) {
			if (error.response.data.code === 400) {
				setIsWrongDetails(true)
			}
		}
	};

	return (
		<>
			<div className="grid place-items-center h-screen bg-white">
				<div className="flex flex-col gap-y-3 items-center justify-center">
					<form onSubmit={register}>
						<div className="flex flex-col w-80">
							<div className="mb-11">
								<h3 className="mb-5 text-4xl font-extrabold text-dark-grey-900 text-center">
									Register
								</h3>
								<hr className="h-0 border-b border-solid border-grey-500 grow" />
							</div>
							{isWrongDetails ? (
								<div className="flex gap-x-2 items-center p-1 pl-3 rounded-3xl bg-red-100">
									<InformationCircleIcon className="w-4 h-4 text-red-500" />
									<p className="text-red-500 text-sm">User already exist!</p>
								</div>
							) : null}

							<div className="mt-1 mb-5">
								<input
									type="text"
									name="name"
									id="name"
									className="h-5 px-4 py-5 w-full flex items-center text-sm font-medium bg-blue-100 rounded-2xl focus:bg-blue-200 outline-none text-gray-700"
									placeholder="Enter name..."
									onChange={handleCredentials}
								/>
								{isWrongName ? (
									<div className="flex gap-x-2 items-center p-1 pl-3 rounded-3xl bg-red-100 mt-1">
										<InformationCircleIcon className="w-4 h-4 text-red-500" />
										<p className="text-red-500 text-sm">Name is required!</p>
									</div>
								) : null}
							</div>

							<div className="mb-5">
								<input
									type="email"
									name="email"
									id="email"
									className="h-5 px-4 py-5 w-full flex items-center text-sm font-medium bg-blue-100 rounded-2xl focus:bg-blue-200 outline-none text-gray-700"
									placeholder="Enter email..."
									onChange={handleCredentials}
								/>
								{isWrongEmail ? (
									<div className="flex gap-x-2 items-center p-1 pl-3 rounded-3xl bg-red-100 mt-1">
										<InformationCircleIcon className="w-4 h-4 text-red-500" />
										<p className="text-red-500 text-sm">Invalid email!</p>
									</div>
								) : null}
							</div>

							<div className="mb-7">
								<input
									type="password"
									name="password"
									id="password"
									className="h-5 px-4 py-5 w-full flex items-center text-sm font-medium bg-blue-100 rounded-2xl focus:bg-blue-200 outline-none text-gray-700"
									placeholder="Enter password..."
									onChange={handleCredentials}
								/>
								{isWrongPassword ? (
									<div className="flex gap-x-2 items-center p-1 pl-3 rounded-3xl bg-red-100 mt-1">
										<InformationCircleIcon className="w-4 h-4 text-red-500" />
										<p className="text-red-500 text-sm">Password must be atleast 6 characters!</p>
									</div>
								) : null}
							</div>

							<button
								type="submit"
								className="w-full py-2 text-white bg-blue-500 rounded-2xl text-sm font-medium"
							>
								Submit
							</button>
						</div>
					</form>

					<p className="text-sm text-stone-700">Already registered? <Link to="/login" className="text-blue-500 font-medium">Please sign in</Link></p>

				</div>
			</div>
		</>
	);
}
