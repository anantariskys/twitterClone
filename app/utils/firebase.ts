import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseConfig from "~/config/firebase";

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * Uploads an image file to Firebase Storage and returns the download URL.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - A promise that resolves with the image download URL.
 */
export const uploadImageToFirebase = async (file: File): Promise<string> => {
  // Create a storage reference with a unique path for the file
  const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);

  try {
    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);

    // Get and return the download URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};
