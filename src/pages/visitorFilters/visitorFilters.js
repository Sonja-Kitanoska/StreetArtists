import { updateHeader } from "../../utils/globals.js";

export function initVisitorFilters() {
	updateHeader("visitor");

	const offcanvasElement = document.getElementById("offcanvasExample");
	const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
	offcanvas.show();

	const closeIcon = document.querySelector(".close-icon");
	closeIcon.addEventListener("click", () => {
		document.body.style.overflow = "auto";
		location.hash = "visitorListing";
	});
}
