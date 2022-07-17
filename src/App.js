import "./index.css";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

function getPersonInfo() {
	let gender = faker.name.gender(true);
	let firstName = faker.name.firstName(gender);
	let secondName = faker.name
		.findName(firstName, "")
		.replace(firstName, "")
		.replace(/^.*\.|Miss/, "")
		.trim();
	let fullName = `${gender === "Male" ? "Mr." : "Mrs."} ${firstName} ${secondName}`;
	let email = faker.internet.email(firstName, secondName);
	let phoneNumber = faker.phone.number("+91 ### ### ####");

	console.log("New Personal Information Fetched");
	return { gender, firstName, secondName, email, fullName, phoneNumber };
}

function InfoLabel({ title, value }) {
	return (
		<div className="Field-Container">
			<label>{title}: </label>
			<input type="text" className="field" disabled={true} defaultValue={value} />
		</div>
	);
}

function ProfileCard() {
	let [person, setPerson] = useState({});

	useEffect(() => {
		setPerson(getPersonInfo());
	}, []);

	return (
		<div className="Card">
			<svg xmlns="http://www.w3.org/2000/svg" className="refresh" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={() => setPerson(getPersonInfo())}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
			</svg>
			<div className="Avatar">
				<img src={`https://i.pravatar.cc/300?u=${person.email}`} alt="avatar" />
			</div>
			<div className="Info">
				<h2>Personal Info</h2>
				<InfoLabel title="Full Name" value={person.fullName} />
				<InfoLabel title="First Name" value={person.firstName} />
				<InfoLabel title="Second Name" value={person.secondName} />
				<InfoLabel title="Gender" value={person.gender} />
				<h2>Email</h2>
				<InfoLabel title="Email" value={person.email} />
				<h3>Emails (0):</h3>

				<InfoLabel title="Phone Number" value={person.phoneNumber} />
				<h2>Credit Card Information</h2>
				<InfoLabel title="Credit Card Number" />
				<InfoLabel title="Credit Card CVV" />
				<InfoLabel title="Credit Card Expiry" />
			</div>
		</div>
	);
}

// https://10minutemail.com/ has an API, use that to generate temporary emails

function App() {
	return <>{<ProfileCard />}</>;
}

export default App;
