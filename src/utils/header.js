import { getArtist } from "./globals.js";

export function updateHeader(type = "landingPage") {
	const logo = document.querySelector("#logo");
	const iconContainer = document.querySelector(".icon-container");
	const auctionIcon = document.querySelector("#auctionIcon");
	const menu = document.querySelector("#menu");
	const headerText = document.querySelector("#headerText");
	const headerTextArtist = document.querySelector("#headerTextArtist");

	function toggleVisibility(element, show) {
		element.classList.toggle("d-none", !show);
		element.classList.toggle("d-block", show);
	}

	if (type === "landingPage") {
		toggleVisibility(logo, false);
		toggleVisibility(iconContainer, false);
		toggleVisibility(headerText, true);
		toggleVisibility(headerTextArtist, false);
		return;
	}

	toggleVisibility(logo, true);
	toggleVisibility(iconContainer, true);

	if (type === "visitor") {
		toggleVisibility(auctionIcon, true);
		toggleVisibility(menu, false);
		toggleVisibility(headerText, true);
		toggleVisibility(headerTextArtist, false);

		auctionIcon.addEventListener("click", () => {
			location.hash = "auction";
		});
	} else if (type === "artist") {
		toggleVisibility(menu, true);
		toggleVisibility(auctionIcon, false);
		toggleVisibility(headerText, false);
		toggleVisibility(headerTextArtist, true);

		const currentArtist = getArtist();
		headerTextArtist.textContent = currentArtist;
	}
}

const menuLinks = document.querySelector("#menuLinks");

menu.addEventListener("click", () => {
	menuLinks.classList.toggle("d-none");
});

logo.addEventListener("click", () => {
	location.hash = "#landingPage";
});
