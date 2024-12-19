import { initArtistHomePage } from "./src/pages/artistHomePage/artistHomePage.js";
import { initLandingPage } from "./src/pages/landingPage/landingPage.js";
import { initVisitorHomePage } from "./src/pages/visitorHomePage/visitorHomePage.js";
import { initArtistItemsPage } from "./src/pages/artistItemsPage/artistItemsPage.js";
import { initArtistAddNewItemPage } from "./src/pages/artistAddNewItemPage/artistAddNewItemPage.js";
import { initVisitorListing } from "./src/pages/visitorListing/visitorListing.js";
import { initVisitorFilters } from "./src/pages/visitorFilters/visitorFilters.js";
import { initArtistMenu } from "./src/pages/artistMenu/artistMenu.js";
import { initArtistCaptureImagePopup } from "./src/pages/artistCaptureImagePopup/artistCaptureImagePopup.js";
import { initAuction } from "./src/pages/auction/auction.js";

function handleRouting() {
	const allPages = document.querySelectorAll(".page");
	allPages.forEach((page) => (page.style.display = "none"));

	let hash = location.hash || "#landingPage";

	document.querySelector(hash).style.display = "block";

	switch (hash) {
		case "#landingPage":
			initLandingPage();
			break;

		case "#visitorHomePage":
			initVisitorHomePage();
			break;

		case "#visitorListing":
			initVisitorListing();
			break;

		case "#visitorFilters":
			initVisitorFilters();
			break;

		case "#artistHomePage":
			initArtistHomePage();
			break;

		case "#artistMenu":
			initArtistMenu();
			break;

		case "#artistItemsPage":
			initArtistItemsPage();
			break;

		case "#artistAddNewItemPage":
			initArtistAddNewItemPage();
			break;

		case "#artistCaptureImagePopup":
			initArtistCaptureImagePopup();
			break;

		case "#auction":
			initAuction();
			break;

		default:
			break;
	}
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("load", handleRouting);
