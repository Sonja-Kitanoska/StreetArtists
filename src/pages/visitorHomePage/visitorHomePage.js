import { updateHeader } from "../../utils/header.js";

export function initVisitorHomePage() {
	console.log("visitorHomePage");
	updateHeader("visitor");

	const infiniteSlider = document.querySelector(".infinite-slider");

	infiniteSlider.addEventListener("click", () => {
		location.hash = "visitorListing";
	});
}
