import {
	getItems,
	getCapturedUrl,
	setCapturedImageUrl,
} from "../../utils/globals.js";
import { updateHeader } from "../../utils/header.js";

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
		setCapturedImageUrl(canvas.toDataURL("image/png"));

		canvas.style.display = "none";

		stopCamera();

		location.hash = "#artistAddNewItemPage";
	});
}

function stopCamera() {
	const stream = video.srcObject;
	if (stream) {
		const tracks = stream.getTracks();
		tracks.forEach((track) => track.stop());
		video.srcObject = null;
	}
}
