import { itemTypes } from "../../../data/db.js";
import { getArtist, getItems, setItems } from "../../utils/globals.js";
import { updateHeader } from "../../utils/header.js";

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
const addNewItemBtn = document.querySelector("#addNewItemBtn");

let editingItem = undefined;
let itemsList = getItems();
let artistItems;
let capturedImageUrl = getCapturedUrl();

export function initArtistAddNewItemPage() {
	updateHeader("artist");
	capturedImageUrl = getCapturedUrl();

	if (capturedImageUrl) {
		imageUrlInput.value = capturedImageUrl;
	}

	if (capturedImageUrl) {
		takeSnapshotDiv.innerHTML = `<img src="${capturedImageUrl}" alt="Captured Image" class="image-preview" />`;
	} else if (imageUrlInput.value) {
		takeSnapshotDiv.innerHTML = `<img src="${imageUrlInput.value}" alt="Captured Image" class="image-preview" />`;
	} else {
		takeSnapshotDiv.innerHTML = `	
				<img src="../../../src/assets/fa-solid_camera.png">
				<p class="roboto-300 mb-0">Take a snapshot</p>	
		`;
	}
	takeSnapshotDiv.addEventListener("click", () => {
		location.hash = "#artistCaptureImagePopup";
	});

	itemsList = getItems();
	artistItems = itemsList.filter((item) => item.artist === getArtist());

	if (!newItemTypeSelect.hasChildNodes()) {
		newItemTypeSelect.innerHTML =
			'<option value="" disabled selected></option>';

		itemTypes.forEach((type) => {
			const option = document.createElement("option");
			option.value = type.toLowerCase();
			option.textContent = type;
			newItemTypeSelect.appendChild(option);
		});
	}

	if (editingItem) {
		newItemTypeSelect.value = editingItem.type;
		addNewItemBtn.textContent = "Save";
	} else {
		addNewItemBtn.textContent = "Add New Item";
	}

	initRetakeSnapshot();

	addNewItemForm.removeEventListener("submit", handleFormSubmit);
	cancelBtn.removeEventListener("click", handleCancel);

	//  Add new event listeners
	addNewItemForm.addEventListener("submit", handleFormSubmit);
	cancelBtn.addEventListener("click", handleCancel);
}

function handleFormSubmit(e) {
	e.preventDefault();
	if (editingItem) {
		updateItem();
	} else {
		createNewItem();
	}
	location.hash = "#artistItemsPage";
}

function handleCancel() {
	resetValues();
	location.hash = "#artistItemsPage";
	setCapturedImageUrl("");
}

export function resetEditingItem() {
	editingItem = undefined;
}

// Read and populate item fields for editing
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

// Reset input fields
function resetValues() {
	titleInput.value = "";
	descriptionTextarea.value = "";
	newItemTypeSelect.value = "";
	priceInput.value = "";
	imageUrlInput.value = "";
	isPublishedCheckbox.checked = true;
}

// Create a new item
function createNewItem() {
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
	saveItems();
}

// Update an existing item
function updateItem() {
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
		saveItems();
	}
}

function saveItems() {
	setItems(itemsList);
	artistItems = itemsList.filter((item) => item.artist === getArtist());
	resetValues();
}

function initRetakeSnapshot() {
	const imagePreview = takeSnapshotDiv.querySelector("img");
	if (imagePreview) {
		imagePreview.addEventListener("click", () => {
			location.hash = "#artistCaptureImagePopup";
		});
	}
}
