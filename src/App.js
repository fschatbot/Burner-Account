import "./index.css";
import { faker } from "@faker-js/faker";

function ProfileCard() {
	let gender = faker.name.gender(true);
	let firstName = faker.name.firstName(gender);
	let secondName = faker.name.findName(firstName, undefined).replace(firstName, "").trim();
	let email = faker.internet.email(firstName, secondName);
	return (
		<div className="Card">
			<div className="Avatar">
				<img src={`https://i.pravatar.cc/300?u=${email}`} alt="avatar" />
			</div>
			{faker.name.prefix(gender)} {faker.name.findName(firstName, secondName, gender)}
		</div>
	);
}

function App() {
	return <>{<ProfileCard />}</>;
}

export default App;
