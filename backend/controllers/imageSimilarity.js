const fs = require("fs");
const faceapi = require("face-api.js");
const { createCanvas, loadImage, Image } = require("canvas");

// Load face recognition models
const MODEL_PATH = "models";
const MODELS = [
  faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH),
  faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH),
  faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH),
];

// Load models on server start
Promise.all(MODELS)
  .then(() => {
    console.log("Face recognition models loaded successfully.");
  })
  .catch((error) => {
    console.error("Failed to load face recognition models:", error);
  });

// Compare the similarity between two face images
async function compareFaces(image1Base64, image2Base64) {
  try {
    // Convert base64 images to image elements
    const image1 = await loadImageFromBase64(image1Base64);
    const image2 = await loadImageFromBase64(image2Base64);

    // Create canvases for face-api.js
    const faceCanvas1 = createCanvas(image1.width, image1.height);
    const faceCanvas2 = createCanvas(image2.width, image2.height);
    const faceCtx1 = faceCanvas1.getContext("2d");
    const faceCtx2 = faceCanvas2.getContext("2d");
    faceCtx1.drawImage(image1, 0, 0);
    faceCtx2.drawImage(image2, 0, 0);

    // Detect faces in the images
    const faceDetections1 = await faceapi
      .detectAllFaces(faceCanvas1)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const faceDetections2 = await faceapi
      .detectAllFaces(faceCanvas2)
      .withFaceLandmarks()
      .withFaceDescriptors();

    // Check if a face was detected in both images
    if (faceDetections1.length === 0 || faceDetections2.length === 0) {
      throw new Error("No faces detected in one or both images.");
    }

    // Get the face descriptors
    const faceDescriptor1 = faceDetections1[0].descriptor;
    const faceDescriptor2 = faceDetections2[0].descriptor;

    // Calculate the similarity using face-api.js
    const faceDistance = faceapi.euclideanDistance(
      faceDescriptor1,
      faceDescriptor2,
    );
    const similarity = 1 - faceDistance;

    return similarity;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Helper function to load image from base64
function loadImageFromBase64(base64) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = base64;
  });
}

module.exports = {
  compareFaces,
};
