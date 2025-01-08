import { setCapturedImageUrl } from "../../utils/globals.js";
import { updateHeader } from "../../utils/header.js";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const camera = document.getElementById("camera");

export function initArtistCaptureImagePopup() {
	updateHeader("artist");

	startStream();

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

async function startStream() {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true });
		handleCamera(stream);
	} catch (err) {
		console.error("Error accessing camera: ", err);
	}
}

function handleCamera(stream) {
	window.stream = stream;
	video.srcObject = stream;
	video.onloadedmetadata = () => {
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
	};
}

function stopCamera() {
	const stream = video.srcObject;
	if (stream) {
		const tracks = stream.getTracks();
		tracks.forEach((track) => track.stop());
		video.srcObject = null;
	}
}
