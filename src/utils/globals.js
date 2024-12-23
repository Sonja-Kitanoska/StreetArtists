// import { items } from "../../data/db.js";

let currentArtist;

// let itemsList = localStorage.getItem
// 	? JSON.parse(localStorage.getItem("items"))
// 	: items;

export function getArtist() {
	return currentArtist;
}

export function setArtist(selectedArtist) {
	currentArtist = selectedArtist;
}

// export function getItems() {
// 	return itemsList;
// }

// export function setItems(items) {
// 	localStorage.setItem("items", JSON.stringify(items));
// }

export function updateHeader(type = "landingPage") {
	const logo = document.querySelector("#logo");
	const iconContainer = document.querySelector(".icon-container");
	const auctionIcon = document.querySelector("#auctionIcon");
	const menu = document.querySelector("#menu");
	const headerText = document.querySelector("#headerText");
	const headerTextArtist = document.querySelector("#headerTextArtist");

	if (type === "landingPage") {
		logo.classList.remove("d-block");
		logo.classList.add("d-none");

		iconContainer.classList.remove("d-block");
		iconContainer.classList.add("d-none");

		headerText.classList.remove("d-none");
		headerText.classList.add("d-block");

		headerTextArtist.classList.remove("d-block");
		headerTextArtist.classList.add("d-none");
		return;
	}

	logo.classList.remove("d-none");
	logo.classList.add("d-block");

	iconContainer.classList.remove("d-none");
	iconContainer.classList.add("d-block");

	if (type === "visitor") {
		auctionIcon.classList.remove("d-none");
		auctionIcon.classList.add("d-block");

		auctionIcon.addEventListener("click", () => {
			location.hash = "auction";
		});

		menu.classList.remove("d-block");
		menu.classList.add("d-none");

		headerText.classList.remove("d-none");
		headerText.classList.add("d-block");

		headerTextArtist.classList.remove("d-block");
		headerTextArtist.classList.add("d-none");
	} else if (type === "artist") {
		console.log(location.hash, headerTextArtist);
		menu.classList.remove("d-none");
		menu.classList.add("d-block");

		auctionIcon.classList.remove("d-block");
		auctionIcon.classList.add("d-none");

		headerText.classList.remove("d-block");
		headerText.classList.add("d-none");

		headerTextArtist.classList.remove("d-none");
		headerTextArtist.classList.add("d-block");

		const currentArtist = getArtist();
		headerTextArtist.textContent = currentArtist;
	}
}

const menuLinks = document.querySelector("#menuLinks");

menu.addEventListener("click", () => {
	menuLinks.classList.toggle("d-none");
});
