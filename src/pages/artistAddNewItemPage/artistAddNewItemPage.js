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
const typeInput = artistAddNewItemPage.querySelector("#newItemType");
const priceInput = artistAddNewItemPage.querySelector("#newItemPrice");
const imageUrlInput = artistAddNewItemPage.querySelector("#newItemImageUrl");
const addNewItemBtn = document.querySelector("#addNewItemBtn");
const cancelBtn = document.querySelector("#cancelBtn");

function resetValues() {
	titleInput.value = "";
	descriptionTextarea.value = "";
	typeInput.value = "";
	priceInput.value = "";
	imageUrlInput.value = "";
	isPublishedCheckbox.checked = true;
}

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

		resetValues();

		location.hash = "#artistItemsPage";
	});

	cancelBtn.addEventListener("click", () => {
		resetValues();
		location.hash = "#artistItemsPage";
	});
}
