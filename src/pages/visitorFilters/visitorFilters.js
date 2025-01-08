import { itemTypes } from "../../../data/db.js";
import { resetFilters } from "../visitorListing/visitorListing.js";
import { updateHeader } from "../../utils/header.js";

const checkContainer = document.querySelector(".check-container");
const artistSelect = document.querySelector("#artist");
const typeSelect = document.querySelector("#type");
const offcanvasElement = document.getElementById("offcanvasExample");

export function initVisitorFilters() {
	updateHeader("visitor");

	resetFilters();

	fetch("https://jsonplaceholder.typicode.com/users")
		.then((response) => response.json())
		.then((users) => {
			console.log(users);
			users.forEach((user) => {
				const option = document.createElement("option");
				option.value = user.name.toLowerCase();
				option.textContent = user.name;
				artistSelect.appendChild(option);
			});
		});

	itemTypes.forEach((type) => {
		const option = document.createElement("option");
		option.value = type.toLowerCase();
		option.textContent = type;
		typeSelect.appendChild(option);
	});

	let offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
	if (!offcanvasInstance) {
		offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
	}
	console.log("Offcanvas instance:", offcanvasInstance);
	offcanvasInstance.show();

	const closeIcon = document.querySelector(".close-icon");
	closeIcon.addEventListener("click", () => {
		document.body.style.overflow = "auto";
		location.hash = "visitorListing";
	});

	checkContainer.addEventListener("click", () => {
		location.hash = "#visitorListing";
	});
}
