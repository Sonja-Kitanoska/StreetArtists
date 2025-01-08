import { getItems } from "../../utils/globals.js";
import { itemTypes } from "../../../data/db.js";
import { renderCards } from "../../utils/cards.js";
import { updateHeader } from "../../utils/header.js";

const checkContainer = document.querySelector(".check-container");
const artistSelect = document.querySelector("#artist");
const typeSelect = document.querySelector("#type");

export function resetFilters() {
	artistSelect.innerHTML = '<option value="">Choose</option>';
	typeSelect.innerHTML = '<option value="">Choose</option>';
	document.querySelector("#itemTitle").value = "";
	document.querySelector("#minPrice").value = "";
	document.querySelector("#maxPrice").value = "";
}

export function initVisitorListing() {
	updateHeader("visitor");

	let itemsList = getItems();

	const filteredItems = filterItems();
	if (filteredItems) {
		itemsList = filteredItems;
		renderCards(itemsList);
		location.hash = "#visitorListing";
	}

	resetFilters();

	document.body.style.overflow = "auto";

	const filtersImage = document.querySelector(".filters-image");
	filtersImage.addEventListener("click", () => {
		location.hash = "#visitorFilters";
	});

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

	function filterItems() {
		const titleFilter = document
			.querySelector("#itemTitle")
			.value.trim()
			.toLowerCase();
		const artistFilter = document
			.querySelector("#artist")
			.value.trim()
			.toLowerCase();
		const minPrice = parseFloat(document.querySelector("#minPrice").value) || 0;
		const maxPrice =
			parseFloat(document.querySelector("#maxPrice").value) || Infinity;
		const typeFilter = document
			.querySelector("#type")
			.value.trim()
			.toLowerCase();

		// Filter logic
		const filteredItems = itemsList.filter((item) => {
			const matchedTitle = item.title.toLowerCase().includes(titleFilter);
			const matchedArtist = artistFilter
				? item.artist.toLowerCase() === artistFilter
				: true;
			const matchedPrice = item.price >= minPrice && item.price <= maxPrice;
			const matchedType = typeFilter.toLowerCase()
				? item.type.toLowerCase() === typeFilter
				: true;
			return matchedTitle && matchedArtist && matchedPrice && matchedType;
		});
		console.log("Filtered Items:", filteredItems);

		return filteredItems;
	}

	checkContainer.addEventListener("click", () => {
		location.hash = "#visitorListing";
	});
}
