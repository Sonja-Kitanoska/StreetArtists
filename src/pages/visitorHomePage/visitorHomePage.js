import { updateHeader } from "../../utils/header.js";

export function initVisitorHomePage() {
	updateHeader("visitor");

	const infiniteSlider = document.querySelector(".infinite-slider");

	infiniteSlider.addEventListener("click", () => {
		location.hash = "visitorListing";
	});
}
