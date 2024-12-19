let currentArtist;

export function getArtist() {
	return currentArtist;
}

export function setArtist(selectedArtist) {
	currentArtist = selectedArtist;
}

export function updateHeader(type = "landingPage") {
	const logo = document.querySelector("#logo");
	const iconContainer = document.querySelector(".icon-container");
	const auctionIcon = document.querySelector("#auctionIcon");
	const menu = document.querySelector("#menu");

	const hash = location.hash;

	if (type === "landingPage" || hash === "#landingPage") {
		logo.classList.add("d-none");
		iconContainer.classList.add("d-none");
		return;
	}

	logo.classList.remove("d-none");
	logo.classList.add("d-block");

	iconContainer.classList.remove("d-none");
	iconContainer.classList.add("d-block");

	if (type === "visitor") {
		auctionIcon.classList.remove("d-none");
		auctionIcon.classList.add("d-block");

		menu.classList.add("d-none");
	} else if (type === "artist") {
		menu.classList.remove("d-none");
		menu.classList.remove("d-block");

		auctionIcon.classList.add("d-none");
	}
}
