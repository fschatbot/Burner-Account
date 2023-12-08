import "./index.css";
import { faker } from "@faker-js/faker/locale/en";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CopyText(text) {
	return () => {
		navigator.clipboard.writeText(text);
		toast.success("Copied to Clipboard");
		console.log("Copied to Clipboard");
	};
}

function getPersonInfo() {
	let sex = faker.person.sex();
	let firstName = faker.person.firstName(sex);
	let secondName = faker.person.lastName(sex);
	let fullName = faker.person.fullName({ firstName, secondName, sex });
	let email = faker.internet.email({ firstName, lastName: secondName });
	let phoneNumber = faker.phone.number("+91 ### ### ####");
	let SuggPass = faker.internet.password({ length: 20, memorable: true });

	let cardIssuer = faker.finance.creditCardIssuer();
	let cardNumber = faker.finance.creditCardNumber(cardIssuer);
	let cardCVV = faker.finance.creditCardCVV();
	const CurrYear = new Date().getFullYear() % 100;
	let cardExpiry = `${String(faker.number.int({ min: 1, max: 12 })).padStart(2, "0")}/${String(faker.number.int({ min: CurrYear + 1, max: CurrYear + 5 })).padStart(2, "0")}`;

	return { sex, firstName, secondName, email, fullName, phoneNumber, SuggPass, cardIssuer, cardNumber, cardCVV, cardExpiry };
}

function InfoLabel({ title, value }) {
	return (
		<div className="Field-Container">
			<label>{title}: </label>
			<span onClick={CopyText(value)} className="field">
				{value}
			</span>
		</div>
	);
}

function Link({ link, text, ...props }) {
	return (
		<a href={link} target="_blank" rel="noreferrer" className="links" {...props}>
			{text}
		</a>
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
				<div className="avatar group relative">
					<img src={`https://i.pravatar.cc/300?u=${person.email}`} alt="avatar" />
					<div className="utils group-hover:opacity-100">
						<div onClick={CopyText(`https://i.pravatar.cc/300?u=${person.email}`)}>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
								/>
							</svg>
						</div>
						<Link
							link={`https://i.pravatar.cc/300?u=${person.email}`}
							text={
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
								</svg>
							}
							{...{ className: "no-custom", download: "Profile_Picture.png" }}
						/>
					</div>
				</div>
			</div>
			<div className="Info">
				<h2>Personal Info</h2>
				<InfoLabel title="Full Name" value={person.fullName} />
				<InfoLabel title="First Name" value={person.firstName} />
				<InfoLabel title="Second Name" value={person.secondName} />
				<InfoLabel title="Gender" value={person.sex} />
				<h2>Email</h2>
				<InfoLabel title="Email" value={person.email} />
				<InfoLabel title="Suggested Password" value={person.SuggPass} />
				<h4 className="italic text-gray-700">
					* For a working email, please visit any one site:
					<Link text="Site 1" link="https://mail.gw/en/" />,
					<Link text="Site 2" link="https://temp-mail.org/en/10minutemail" />,
					<Link text="Site 3" link="https://10minutesemail.net/" />
					<Link text="Site 4" link="https://www.minuteinbox.com/" />,
					<Link text="Site 5" link="https://10minutemail.com/" />*
				</h4>

				<InfoLabel title="Phone Number" value={person.phoneNumber} />
				<h2>Credit Card Information</h2>
				<InfoLabel title="Credit Card Issuer" value={person.cardIssuer} />
				<InfoLabel title="Credit Card Number" value={person.cardNumber} />
				<InfoLabel title="Credit Card CVV" value={person.cardCVV} />
				<InfoLabel title="Credit Card Expiry" value={person.cardExpiry} />
			</div>
			<a signature="" href="https://github.com/fschatbot" target="_blank" rel="noreferrer">
				Made by FSChatBot
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
					<path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
				</svg>
			</a>
		</div>
	);
}

function App() {
	return <>{<ProfileCard />}</>;
}

export default App;
