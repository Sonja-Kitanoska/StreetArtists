import { formatDate } from "../../utils/dates.js";
import { setArtist, updateHeader } from "../../utils/globals.js";

const usersSelect = document.querySelector("#artists");

export function initLandingPage() {
	updateHeader();
	const formattedDate = formatDate(new Date());
	console.log(formattedDate);

	fetch("https://jsonplaceholder.typicode.com/users")
		.then((res) => res.json())
		.then((users) => {
			console.log(users);

			usersSelect.innerHTML = "";

			users.forEach((user) => {
				const option = document.createElement("option");

				option.textContent = user.name;
				option.value = user.name;

				usersSelect.appendChild(option);
			});

			usersSelect.addEventListener("change", function (e) {
				const artist = e.target.value;
				setArtist(artist);

				location.hash = "#artistHomePage";
			});
		});
}
