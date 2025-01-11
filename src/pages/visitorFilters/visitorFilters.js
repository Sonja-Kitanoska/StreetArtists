import { itemTypes } from "../../../data/db.js";
import { updateHeader } from "../../utils/header.js";

const checkContainer = document.querySelector(".check-container");
const artistSelect = document.querySelector("#artist");
const typeSelect = document.querySelector("#type");
const offcanvasElement = document.querySelector("#offcanvasFilter");

export function initVisitorFilters() {
	updateHeader("visitor");

	resetFilters();

	populateSelectOptions();

	let offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
	if (!offcanvasInstance) {
		offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
	}
	offcanvasInstance.show();

	const closeIcon = document.querySelector(".close-icon");
	closeIcon.addEventListener("click", () => {
		setTimeout(() => {
			location.hash = "visitorListing";
		}, 400);
	});

	checkContainer.addEventListener("click", () => {
		location.hash = "#visitorListing";
	});
}

function populateSelectOptions() {
	fetch("https://jsonplaceholder.typicode.com/users")
		.then((response) => response.json())
		.then((users) => {
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
}

function resetFilters() {
	artistSelect.innerHTML = '<option value="">Choose</option>';
	typeSelect.innerHTML = '<option value="">Choose</option>';
	document.querySelector("#itemTitle").value = "";
	document.querySelector("#minPrice").value = "";
	document.querySelector("#maxPrice").value = "";
}
