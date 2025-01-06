import { itemTypes } from "../../../data/db.js";
import {
	updateHeader,
	getArtist,
	getItems,
	setItems,
} from "../../utils/globals.js";

import { getCapturedUrl, setCapturedImageUrl } from "../../utils/globals.js";

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
const priceInput = artistAddNewItemPage.querySelector("#newItemPrice");
const imageUrlInput = artistAddNewItemPage.querySelector("#newItemImageUrl");
const cancelBtn = document.querySelector("#cancelBtn");
const newItemTypeSelect = document.querySelector("#newItemTypeSelect");
const takeSnapshotDiv = document.querySelector(".take-snapshot");

let editingItem = undefined;
let itemsList = getItems();
let artistItems;
let capturedImageUrl = getCapturedUrl();

export function editItem(id) {
	editingItem = undefined;
	itemsList = getItems();
	const item = itemsList.find((item) => String(item.id) === id);
	artistItems = itemsList.filter((item) => item.artist === getArtist());

	titleInput.value = item.title;
	descriptionTextarea.value = item.description;
	newItemTypeSelect.value = item.type;
	priceInput.value = item.price;
	imageUrlInput.value = item.image || "";
	isPublishedCheckbox.checked = item.isPublished;

	editingItem = item;
}

function resetValues() {
	titleInput.value = "";
	descriptionTextarea.value = "";
	newItemTypeSelect.value = "";
	priceInput.value = "";
	imageUrlInput.value = "";
	isPublishedCheckbox.checked = true;
}

function addOrEditItem() {
	if (editingItem) {
		editingItem.title = titleInput.value;
		editingItem.description = descriptionTextarea.value;
		editingItem.type = newItemTypeSelect.value;
		editingItem.image = imageUrlInput.value;
		editingItem.price = priceInput.value;
		editingItem.isPublished = isPublishedCheckbox.checked;

		itemsList = itemsList.map((item) =>
			item.id === editingItem.id ? editingItem : item
		);
	} else if (editingItem === undefined) {
		const newItem = {
			id: crypto.randomUUID(),
			title: titleInput.value,
			description: descriptionTextarea.value,
			type: newItemTypeSelect.value,
			image: imageUrlInput.value,
			price: priceInput.value,
			artist: getArtist(),
			isPublished: isPublishedCheckbox.checked,
			dateCreated: new Date().toISOString(),
		};
		itemsList.push(newItem);
	}
	artistItems = itemsList.filter((item) => item.artist === getArtist());
	setItems(itemsList);
	resetValues();
}

function initRetakeSnapshot() {
	const imagePreview = takeSnapshotDiv.querySelector("img");
	imagePreview.addEventListener("click", () => {
		location.hash = "#artistCaptureImagePopup";
	});
}

export function initArtistAddNewItemPage() {
	updateHeader("artist");
	capturedImageUrl = getCapturedUrl();

	if (capturedImageUrl) {
		imageUrlInput.value = capturedImageUrl;
	}

	takeSnapshotDiv.innerHTML = `<img src="${
		capturedImageUrl ||
		imageUrlInput.value ||
		"../../src/assets/fa-solid_camera.png"
	}" alt="Captured Image" class="image-preview" />`;

	itemsList = getItems();
	artistItems = itemsList.filter((item) => item.artist === getArtist());

	if (!newItemTypeSelect.hasChildNodes()) {
		newItemTypeSelect.innerHTML =
			'<option value="" disabled selected>Choose</option>';

		itemTypes.forEach((type) => {
			const option = document.createElement("option");
			option.value = type.toLowerCase();
			option.textContent = type;
			newItemTypeSelect.appendChild(option);
		});
	}

	if (editingItem) {
		newItemTypeSelect.value = editingItem.type;
	}

	initRetakeSnapshot();

	addNewItemForm.removeEventListener("submit", handleFormSubmit);
	cancelBtn.removeEventListener("click", handleCancel);

	// Add new event listeners
	addNewItemForm.addEventListener("submit", handleFormSubmit);
	cancelBtn.addEventListener("click", handleCancel);
}

function handleFormSubmit(e) {
	console.log("Add New Item button clicked");
	e.preventDefault();
	addOrEditItem();
	location.hash = "#artistItemsPage";
}

function handleCancel() {
	resetValues();
	location.hash = "#artistItemsPage";

	// addNewItemForm.addEventListener(
	// 	"submit",
	// 	(e) => {
	// 		console.log("clicked button");
	// 		e.preventDefault();
	// 		addOrEditItem();
	// 		location.hash = "#artistItemsPage";
	// 	},
	// 	{ once: true }
	// );

	// cancelBtn.addEventListener(
	// 	"click",
	// 	() => {
	// 		resetValues();
	// 		location.hash = "#artistItemsPage";
	// 	},
	// 	{ once: true }
	// );
	setCapturedImageUrl("");
}

export function resetEditingItem() {
	editingItem = undefined;
}
