import { getItems } from "../../utils/globals.js";
import { renderCards } from "../../utils/cards.js";
import { updateHeader } from "../../utils/header.js";

const checkContainer = document.querySelector(".check-container");
const offcanvasElement = document.querySelector("#offcanvasExample");
const toTopButton = document.querySelector(".to-the-top");

export function initVisitorListing() {
	updateHeader("visitor");

	let itemsList = getItems();

	const filteredItems = filterItems();
	if (filteredItems) {
		itemsList = filteredItems;
		renderCards(itemsList);
		location.hash = "#visitorListing";
	}

	let offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
	if (!offcanvasInstance) {
		offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
	}
	offcanvasInstance.show();

	offcanvasElement.addEventListener("shown.bs.offcanvas", () => {
		document.body.style.overflow = "scroll";
	});

	const filtersImage = document.querySelector(".filters-image");
	filtersImage.addEventListener("click", () => {
		location.hash = "#visitorFilters";
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

		return filteredItems;
	}

	checkContainer.addEventListener("click", () => {
		location.hash = "#visitorListing";
	});
	
	window.addEventListener("scroll", () => {
		if (window.scrollY > window.innerHeight) {
			toTopButton.style.opacity = 1;
			toTopButton.style.visibility = "visible";
		} else {
			toTopButton.style.opacity = 0;
			toTopButton.style.visibility = "hidden";
		}
	});

	toTopButton.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
}
