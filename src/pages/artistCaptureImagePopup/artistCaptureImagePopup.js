import { updateHeader, getItems } from "../../utils/globals.js";

export let capturedImageUrl = "";

export function initArtistCaptureImagePopup() {
	updateHeader("artist");

	const video = document.getElementById("video");
	const canvas = document.getElementById("canvas");
	const camera = document.getElementById("camera");

	const constraints = {
		video: true,
	};

	async function init() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			handleSuccess(stream);
		} catch (e) {
			console.log("error ");
		}
	}
	function handleSuccess(stream) {
		window.stream = stream;
		video.srcObject = stream;
		video.onloadedmetadata = () => {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
		};
	}
	init();

	const context = canvas.getContext("2d");
	camera.addEventListener("click", () => {
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		canvas.style.display = "block";
		capturedImageUrl = canvas.toDataURL("image/png");

		canvas.style.display = "none";

		location.hash = "#artistAddNewItemPage";
	});
}
