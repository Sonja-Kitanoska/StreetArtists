import { setArtist, updateHeader, setRole } from "../../utils/globals.js";

const artistsSelect = document.querySelector("#artists");
const artistDiv = document.querySelector(".artist-div");
const header = document.querySelector(".header");

export function initLandingPage() {
	updateHeader();

	artistDiv.addEventListener("mouseenter", () => {
		header.style.backgroundColor = "#f5e3cb";
	});

	artistDiv.addEventListener("mouseleave", () => {
		header.style.backgroundColor = "#fcebd5";
	});

	fetch("https://jsonplaceholder.typicode.com/users")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Failed to fetch users");
			}
			return response.json();
		})
		.then((users) => {
			artistsSelect.innerHTML =
				"<option class='default-option'>Choose</option>";

			users.forEach((user) => {
				const option = document.createElement("option");
				option.textContent = user.name;
				option.value = user.name;
				artistsSelect.appendChild(option);
			});

			artistsSelect.addEventListener("change", function (e) {
				const artist = e.target.value;
				setArtist(artist);
				setRole("artist");
				location.hash = "#artistHomePage";
			});
		})
		.catch((error) => {
			console.log(error);
		});

	const visitorDiv = document.querySelector(".visitor-div");
	visitorDiv.addEventListener("click", () => {
		setRole("visitor");
		location.hash = "visitorHomePage";
	});
}
