import { updateHeader } from "../../utils/globals.js";
import { itemTypes, items } from "../../../data/db.js";

export function initVisitorListing() {
	updateHeader();

	items.forEach((item, index) => {
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

		const visitorListingSection = document.querySelector("#visitorListing");
		visitorListingSection.appendChild(artistCard);
	});
}
