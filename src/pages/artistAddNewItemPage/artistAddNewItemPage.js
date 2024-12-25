import {
	updateHeader,
	getArtist,
	getItems,
	setItems,
} from "../../utils/globals.js";

// Select the section container
const artistAddNewItemPage = document.querySelector("#artistAddNewItemPage");

// Select all inputs within the section
const isPublishedCheckbox = artistAddNewItemPage.querySelector(
	"#isPublishedCheckbox"
);

const titleInput = artistAddNewItemPage.querySelector("#newItemTitle");
const descriptionTextarea = artistAddNewItemPage.querySelector(
	"#newItemDescription"
);
const typeInput = artistAddNewItemPage.querySelectorAll("#newItemType");
const priceInput = artistAddNewItemPage.querySelectorAll("#newItemPrice");
const imageUrlInput = artistAddNewItemPage.querySelectorAll("#newItemImageUrl");
const addNewItemBtn = document.querySelector("#addNewItemBtn");
const cancelBtn = document.querySelector("#cancelBtn");

export function initArtistAddNewItemPage() {
	const currentArtist = getArtist();
	updateHeader("artist");

	let itemsList = getItems();

	addNewItemBtn.addEventListener("click", () => {
		const item = {
			id: crypto.randomUUID(),
			title: titleInput.value,
			description: descriptionTextarea.value,
			type: typeInput.value,
			image: imageUrlInput.value,
			price: priceInput.value,
			artist: currentArtist,
			isPublished: isPublishedCheckbox.value === "on" ? true : false,
			dateCreated: new Date().toISOString(),
		};
		itemsList.push(item);
		setItems(itemsList);

		console.log("Item added successfully:", item);
		console.log("Redirecting to artistItemsPage...");

		location.hash = "#artistItemsPage";
	});
}
