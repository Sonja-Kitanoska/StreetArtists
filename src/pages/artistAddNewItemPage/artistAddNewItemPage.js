import {
	updateHeader,
	getArtist,
	getItems,
	setItems,
} from "../../utils/globals.js";

// Selectors
const artistAddNewItemPage = document.querySelector("#artistAddNewItemPage");
const addNewItemForm = document.querySelector("#addNewItemForm");
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
const cancelBtn = document.querySelector("#cancelBtn");

let editingItem = undefined;
let itemsList = getItems();

export function editItem(id) {
	const item = itemsList.find((item) => String(item.id) === id);

	titleInput.value = item.title;
	descriptionTextarea.value = item.description;
	typeInput.value = item.type;
	priceInput.value = item.price;
	imageUrlInput.value = item.image;
	isPublishedCheckbox.checked = item.isPublished;

	editingItem = item;
}

function resetValues() {
	titleInput.value = "";
	descriptionTextarea.value = "";
	typeInput.value = "";
	priceInput.value = "";
	imageUrlInput.value = "";
	isPublishedCheckbox.checked = true;
}

function addOrEditItem() {
	if (editingItem) {
		editingItem.title = titleInput.value;
		editingItem.description = descriptionTextarea.value;
		editingItem.type = typeInput.value;
		editingItem.image = imageUrlInput.value;
		editingItem.price = priceInput.value;
		editingItem.isPublished = isPublishedCheckbox.checked;

		itemsList = itemsList.map((item) =>
			item.id === editingItem.id ? editingItem : item
		);
	} else {
		const newItem = {
			id: crypto.randomUUID(),
			title: titleInput.value,
			description: descriptionTextarea.value,
			type: typeInput.value,
			image: imageUrlInput.value,
			price: priceInput.value,
			artist: getArtist(),
			isPublished: isPublishedCheckbox.checked,
			dateCreated: new Date().toISOString(),
		};
		itemsList.push(newItem);
	}
	setItems(itemsList);
	resetValues();
}

export function initArtistAddNewItemPage() {
	updateHeader("artist");

	addNewItemForm.addEventListener(
		"submit",
		(e) => {
			e.preventDefault();
			addOrEditItem();
			location.hash = "#artistItemsPage";
		},
		{ once: true }
	);

	cancelBtn.addEventListener(
		"click",
		() => {
			resetValues();
			location.hash = "#artistItemsPage";
		},
		{ once: true }
	);
}
