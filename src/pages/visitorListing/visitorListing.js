import { updateHeader } from "../../utils/globals.js";
import { itemTypes, items } from "../../../data/db.js";

const visitorListingSection = document.querySelector("#visitorListing");
const checkContainer = document.querySelector(".check-container");
const artistSelect = document.querySelector("#artist");
const typeSelect = document.querySelector("#type");
const cardsContainer = visitorListingSection.querySelector(".cards-container");

export function resetFilters() {
	artistSelect.innerHTML = '<option value="">Choose</option>';
	typeSelect.innerHTML = '<option value="">Choose</option>';
	document.querySelector("#itemTitle").value = "";
	document.querySelector("#minPrice").value = "";
	document.querySelector("#maxPrice").value = "";
}

export function initVisitorListing() {
	updateHeader("visitor");

	let itemsList = [...items];

	const filteredItems = filterItems();
	itemsList = filteredItems;
	renderCards(itemsList);
	if (filteredItems) {
		itemsList = filteredItems;
		renderCards(itemsList);
		location.hash = "#visitorListing";
	}

	resetFilters();
	document.body.style.overflow = "auto";

	function renderCards(items) {
		cardsContainer.innerHTML = "";
		items.forEach((item, index) => {
			if (item.isPublished) {
				const artistCard = document.createElement("div");
				artistCard.classList.add("artist-card", "mt-4");
				artistCard.setAttribute("id", `${item.id}`);

				const cardBodyClass =
					index % 2 === 0 ? "odd-index-colors" : "even-index-colors";

				const priceSpanClass =
					index % 2 === 0 ? "even-index-colors" : "odd-index-colors";

				artistCard.innerHTML = `
				<div class="img-container">
					<img
						src="${item.image}"
						alt="${item.artist}'s image"
						class="w-100 h-100"
					/>
				</div>
				<div class="py-2 px-3 ${cardBodyClass}">
					<div class="d-flex justify-content-between align-items-center">
						<h3 class="reenie-beanie">${item.artist}</h3>
						<span class="price-span ${priceSpanClass} py-1 px-2 font-size-12">$${item.price}</span>
					</div>

					<h6 class="font-size-14">${item.title}</h6>
					<p class="mb-0 font-size-11">
						${item.description}
					</p>
				</div>`;
				cardsContainer.appendChild(artistCard);
			}
		});
	}

	renderCards(itemsList);

	const filtersImage = document.querySelector(".filters-image");
	filtersImage.addEventListener("click", () => {
		location.hash = "#visitorFilters";
	});

	// artistSelect.innerHTML = '<option value="">Choose</option>';
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

	// typeSelect.innerHTML = '<option value="">Choose</option>';
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

		console.log("Filters Applied:");
		console.log("Title:", titleFilter || "Any");
		console.log("Artist:", artistFilter || "Any");
		console.log("Min Price:", minPrice);
		console.log("Max Price:", maxPrice);
		console.log("Type:", typeFilter || "Any");

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

			console.log(`Checking item: ${item.title}`);
			console.log(`Title Matched: ${matchedTitle}`);
			console.log(`Artist Matched: ${matchedArtist}`);
			console.log(`Price Matched: ${matchedPrice}`);
			console.log(`Type Matched: ${matchedType}`);
			return matchedTitle && matchedArtist && matchedPrice && matchedType;
		});
		console.log("Filtered Items:", filteredItems);
		return filteredItems;
	}

	checkContainer.addEventListener("click", () => {
		location.hash = "#visitorListing";
	});
}
