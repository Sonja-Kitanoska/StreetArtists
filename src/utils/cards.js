export function renderCards(items, mode = "visitor") {
	// Select the container based on the mode
	const sectionId = mode === "visitor" ? "#visitorListing" : "#artistItemsPage";
	const cardsContainer = document
		.querySelector(sectionId)
		?.querySelector(".cards-container");

	cardsContainer.innerHTML = "";

	// Filter items based on mode
	const filteredItems =
		mode === "visitor" ? items.filter((item) => item.isPublished) : items;

	if (filteredItems.length === 0) {
		cardsContainer.innerHTML = `
            <div class="no-results">
                <p>No items found.</p>
            </div>`;
		cardsContainer.classList.add("h-100");
		return;
	}

	filteredItems.forEach((item, index) => {
		const artistCard = document.createElement("div");
		artistCard.classList.add("artist-card", "mt-4");
		artistCard.setAttribute("id", `${item.id}`);

		const cardBodyClass =
			mode === "artist"
				? "odd-index-colors"
				: index % 2 === 0
				? "odd-index-colors"
				: "even-index-colors";

		const priceSpanClass =
			mode === "artist"
				? "even-index-colors"
				: index % 2 === 0
				? "even-index-colors"
				: "odd-index-colors";

		// Add additional content if mode is "artist"
		const additionalDiv =
			mode === "artist"
				? `<div
				class="card-buttons brown-bg gap-2 py-2 px-3"
			>
				<button
					class="auction-btn roboto-700 font-size-12 border-0 text-white px-2 py-1" data-id="${
						item.id
					}"
				${item.isAuctioning ? "disabled" : ""}
				>
				${item.isAuctioning ? "On Auction" : "Send to Auction"}
			
				</button>
				<button
					class="toggle-publish-btn ${
						item.isPublished ? "published" : "unpublished"
					} roboto-700 font-size-12 border-0 px-2 py-1" data-id="${item.id}"
				>
					 ${item.isPublished ? "Unpublish" : "Publish"}
				</button>
				<button
					class="remove-btn roboto-700 font-size-12 border-0 text-white px-2 py-1" data-id="${
						item.id
					}"
				>
					Remove
				</button>
				<button
					class="edit-btn roboto-700 font-size-12 border-0 brown-text sand-bg px-2 py-1" data-id="${
						item.id
					}"

				>
					Edit
				</button>
			</div>`
				: "";

		const formattedDate =
			mode === "artist"
				? (() => {
						const date = new Date(item.dateCreated);
						const day = String(date.getDate()).padStart(2, "0");
						const month = String(date.getMonth() + 1).padStart(2, "0");
						const year = date.getFullYear();
						return `${day}.${month}.${year}`;
				  })()
				: "";
		const headerContent =
			mode === "artist"
				? `<div>
						   <h3 class="roboto roboto-400 font-size-14 mb-0">${item.title}</h3>
						   <p class="formatted-date font-size-12 mb-0">${formattedDate}</p>
					   </div>`
				: `<div>
						   <h3 class="reenie-beanie">${item.artist}</h3>
						   <h6 class="font-size-14 roboto roboto-400">${item.title}</h6>
					   </div>`;

		artistCard.innerHTML = `
            <div class="img-container">
                <img
                    src="${item.image}"
                    alt="${item.artist}'s image"
                    class="w-100 h-100"
                />
            </div>
            <div class="py-2 px-3 ${cardBodyClass}">
                <div class="d-flex justify-content-between align-items-center mb-2">
                        ${headerContent}
                    <span class="price-span ${priceSpanClass} py-1 px-2 font-size-12">$${item.price}</span>
                </div>
                <p class="mb-0 font-size-11">
                    ${item.description}
                </p>
            </div>
            ${additionalDiv}`;
		cardsContainer.appendChild(artistCard);
	});
}
