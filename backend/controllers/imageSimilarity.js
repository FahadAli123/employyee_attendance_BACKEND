const faceapi = require("face-api.js");
const fs = require("fs");

// Load models and weights
async function loadModels() {
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromDisk("models"),
    faceapi.nets.faceRecognitionNet.loadFromDisk("models"),
    faceapi.nets.faceLandmark68Net.loadFromDisk("models"),
  ]);
}

// Compare faces in two images
async function compareFaces(imagePath1, imagePath2) {
  try {
    // Load face recognition models
    await loadModels();

    // Read image files as buffers
    const imageBuffer1 = fs.readFileSync(imagePath1);
    const imageBuffer2 = fs.readFileSync(imagePath2);

    // Create faceapi image objects from buffers
    const image1 = await faceapi.bufferToImage(imageBuffer1);
    const image2 = await faceapi.bufferToImage(imageBuffer2);

    // Detect faces in the images
    const detections1 = await faceapi
      .detectAllFaces(image1)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const detections2 = await faceapi
      .detectAllFaces(image2)
      .withFaceLandmarks()
      .withFaceDescriptors();

    // Compare faces
    const faceMatcher = new faceapi.FaceMatcher(detections1);
    const results = detections2.map((detection) =>
      faceMatcher.findBestMatch(detection.descriptor),
    );

    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  compareFaces,
};
