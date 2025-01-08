import { setCapturedImageUrl } from "../../utils/globals.js";
import { updateHeader } from "../../utils/header.js";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snapshotImg = document.getElementById("snapshotBtn");

const constraints = {
	video: {
		facingMode: {
			ideal: "environment",
		},
	},
};

export function initArtistCaptureImagePopup() {
	updateHeader("artist");

	startStream();

	const context = canvas.getContext("2d");
	snapshotBtn.addEventListener("click", () => {
		context.drawImage(video, 0, 0);
		canvas.style.display = "block";
		setCapturedImageUrl(canvas.toDataURL("image/png"));

		canvas.style.display = "none";

		stopCamera();

		location.hash = "#artistAddNewItemPage";
	});
}

async function startStream() {
	try {
		const stream = await navigator.mediaDevices.getUserMedia(constraints);
		video.srcObject = stream;
		video.onloadedmetadata = () => {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
		};
	} catch (err) {
		if (err.name === "NotAllowedError") {
			alert("You need to allow camera access to proceed.");
		} else if (err.name === "NotFoundError") {
			alert("No camera found. Please connect a camera and try again.");
		} else {
			alert("An unexpected error occurred while trying to access the camera.");
		}
	}
}

function stopCamera() {
	const stream = video.srcObject;
	if (stream) {
		const tracks = stream.getTracks();
		tracks.forEach((track) => track.stop());
		video.srcObject = null;
	}
}
