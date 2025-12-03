// Picture Upload Module - Handles picture file uploads to Firebase Storage
import { storage, auth, db } from './firebaseConfig.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// File size limit: 10MB (pictures are smaller than videos)
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// Allowed image formats
const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp'
];

// Initialize UI elements and event listeners for picture upload
function initializePictureUpload() {
    const uploadPictureButton = document.getElementById('uploadPictureButton');
    const uploadPictureModal = document.getElementById('uploadPictureModal');
    const closeUploadModal = document.getElementById('closeUploadPictureModal');
    const cancelUploadButton = document.getElementById('cancelUploadPictureButton');
    const pictureFileInput = document.getElementById('pictureFileInput');
    const uploadPictureButtonConfirm = document.getElementById('uploadPictureButtonConfirm');
    
    if (!uploadPictureButton || !uploadPictureModal) {
        console.error('Upload picture elements not found');
        return;
    }
    
    // Open modal
    uploadPictureButton.addEventListener('click', () => {
        if (!auth.currentUser) {
            alert('You must be logged in to upload pictures.');
            return;
        }
        uploadPictureModal.style.display = 'block';
        resetUploadModal();
    });
    
    // Close modal
    closeUploadModal.addEventListener('click', () => {
        uploadPictureModal.style.display = 'none';
        resetUploadModal();
    });
    cancelUploadButton.addEventListener('click', () => {
        uploadPictureModal.style.display = 'none';
        resetUploadModal();
    });
    
    // Handle file selection
    pictureFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileSelection(file);
        } else {
            resetUploadModal();
        }
    });
    
    // Handle upload confirmation
    if (uploadPictureButtonConfirm) {
        uploadPictureButtonConfirm.addEventListener('click', () => {
            const file = pictureFileInput?.files[0];
            if (file) {
                handlePictureUpload(file);
            }
        });
    }
}

// Reset the upload modal to its initial state
function resetUploadModal() {
    const pictureFileInput = document.getElementById('pictureFileInput');
    const fileInfo = document.getElementById('pictureFileInfo');
    const fileError = document.getElementById('pictureFileError');
    const uploadProgressSection = document.getElementById('pictureUploadProgressSection');
    const uploadProgressBar = document.getElementById('pictureUploadProgressBar');
    const uploadProgressText = document.getElementById('pictureUploadProgressText');
    const uploadPictureButtonConfirm = document.getElementById('uploadPictureButtonConfirm');
    
    if (pictureFileInput) pictureFileInput.value = '';
    if (fileInfo) fileInfo.style.display = 'none';
    if (fileError) {
        fileError.style.display = 'none';
        fileError.textContent = '';
    }
    if (uploadProgressSection) uploadProgressSection.style.display = 'none';
    if (uploadProgressBar) uploadProgressBar.style.width = '0%';
    if (uploadProgressText) uploadProgressText.textContent = '0%';
    if (uploadPictureButtonConfirm) uploadPictureButtonConfirm.disabled = true;
}

// Handle file selection and validation
function handleFileSelection(file) {
    const fileInfo = document.getElementById('pictureFileInfo');
    const fileNameSpan = document.getElementById('pictureFileName');
    const fileSizeSpan = document.getElementById('pictureFileSize');
    const fileTypeSpan = document.getElementById('pictureFileType');
    const fileError = document.getElementById('pictureFileError');
    const uploadPictureButtonConfirm = document.getElementById('uploadPictureButtonConfirm');
    
    // Hide previous errors
    if (fileError) {
        fileError.style.display = 'none';
        fileError.textContent = '';
    }
    
    if (!file) {
        if (uploadPictureButtonConfirm) uploadPictureButtonConfirm.disabled = true;
        return;
    }
    
    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        if (fileError) {
            fileError.textContent = 'Invalid file type. Please upload an image (JPEG, PNG, GIF, or WebP).';
            fileError.style.display = 'block';
        }
        if (uploadPictureButtonConfirm) uploadPictureButtonConfirm.disabled = true;
        return;
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        if (fileError) {
            fileError.textContent = `File is too large. Max size is ${formatFileSize(MAX_FILE_SIZE)}.`;
            fileError.style.display = 'block';
        }
        if (uploadPictureButtonConfirm) uploadPictureButtonConfirm.disabled = true;
        return;
    }
    
    // Show file info
    if (fileInfo) {
        fileNameSpan.textContent = file.name;
        fileSizeSpan.textContent = formatFileSize(file.size);
        fileTypeSpan.textContent = file.type;
        fileInfo.style.display = 'block';
    }
    
    if (uploadPictureButtonConfirm) {
        uploadPictureButtonConfirm.disabled = false;
    }
}

// Format file size for display
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Handle picture upload to Firebase Storage
async function handlePictureUpload(file) {
    if (!auth.currentUser) {
        alert('You must be logged in to upload pictures.');
        return;
    }
    
    const userId = auth.currentUser.uid;
    const fileName = `${Date.now()}-${file.name}`;
    const fileRef = ref(storage, `pictures/${userId}/${fileName}`);
    
    // Show upload progress
    const uploadProgressSection = document.getElementById('pictureUploadProgressSection');
    const uploadProgressBar = document.getElementById('pictureUploadProgressBar');
    const uploadProgressText = document.getElementById('pictureUploadProgressText');
    const uploadPictureButtonConfirm = document.getElementById('uploadPictureButtonConfirm');
    
    if (uploadProgressSection) uploadProgressSection.style.display = 'block';
    if (uploadPictureButtonConfirm) uploadPictureButtonConfirm.disabled = true;
    
    try {
        // Create upload task
        const uploadTask = uploadBytesResumable(fileRef, file);
        
        // Monitor upload progress
        uploadTask.on('state_changed',
            (snapshot) => {
                // Progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (uploadProgressBar) {
                    uploadProgressBar.style.width = progress + '%';
                }
                if (uploadProgressText) {
                    uploadProgressText.textContent = `${Math.round(progress)}%`;
                }
            },
            (error) => {
                // Error
                console.error('Upload error:', error);
                const fileError = document.getElementById('pictureFileError');
                if (fileError) {
                    fileError.textContent = `Upload failed: ${error.message}`;
                    fileError.style.display = 'block';
                }
                if (uploadProgressSection) uploadProgressSection.style.display = 'none';
                if (uploadPictureButtonConfirm) uploadPictureButtonConfirm.disabled = false;
            },
            async () => {
                // Success
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('✅ Picture uploaded successfully! URL:', downloadURL);
                
                // Hide progress, show success
                if (uploadProgressSection) uploadProgressSection.style.display = 'none';
                
                // Close upload modal
                const uploadPictureModal = document.getElementById('uploadPictureModal');
                if (uploadPictureModal) uploadPictureModal.style.display = 'none';
                resetUploadModal();
                
                // Prompt user to click on map to place picture
                await promptForMapPosition(downloadURL, file.name);
            }
        );
    } catch (error) {
        console.error('Error starting upload:', error);
        const fileError = document.getElementById('pictureFileError');
        if (fileError) {
            fileError.textContent = `Upload failed: ${error.message}`;
            fileError.style.display = 'block';
        }
        if (uploadProgressSection) uploadProgressSection.style.display = 'none';
        if (uploadPictureButtonConfirm) uploadPictureButtonConfirm.disabled = false;
    }
}

// Ask user to click on map to place picture
async function promptForMapPosition(imageUrl, fileName) {
    // Show message asking user to click on map
    const message = 'Picture uploaded! Click on the map to place this picture.';
    alert(message);
    
    // Wait for map to be available (map is global in main.js)
    if (typeof window.map === 'undefined' || !window.map) {
        console.error('Map not available');
        alert('Map is not ready. Please wait a moment and try again.');
        return;
    }
    
    const map = window.map;
    
    // Check if map is properly initialized - check for essential methods
    if (!map || typeof map.getContainer !== 'function' || typeof map.on !== 'function') {
        console.error('Map not properly initialized');
        console.log('Map object:', map);
        console.log('Has getContainer?', typeof map.getContainer);
        console.log('Has on?', typeof map.on);
        alert('Map is not properly initialized. Please refresh the page and try again.');
        return;
    }
    
    // Change cursor to indicate clicking is needed
    let mapContainer;
    try {
        mapContainer = map.getContainer();
    } catch (error) {
        console.error('Error getting map container:', error);
        alert('Could not access map. Please try again.');
        return;
    }
    
    if (mapContainer) {
        mapContainer.style.cursor = 'crosshair';
    } else {
        console.error('Could not get map container');
        alert('Could not access map. Please try again.');
        return;
    }
    
    // Create a one-time click listener
    const clickHandler = async (e) => {
        // Remove the click listener (one-time use)
        map.off('click', clickHandler);
        if (mapContainer) {
            mapContainer.style.cursor = '';
        }
        
        const position = [e.lngLat.lng, e.lngLat.lat];
        console.log('Selected position:', position);
        
        // Save picture to Firestore with default category (pictures don't have categories for now)
        await savePictureToFirestore(imageUrl, fileName, position, ['misc']);
    };
    
    map.on('click', clickHandler);
}

// Save picture info to Firestore
async function savePictureToFirestore(imageUrl, fileName, position, categories = ['misc']) {
    if (!auth.currentUser) {
        alert('You must be logged in to save pictures.');
        return;
    }
    
    const userId = auth.currentUser.uid;
    const pictureId = `uploaded-${Date.now()}`; // Unique ID for the picture document
    
    // Ensure categories is an array
    if (typeof categories === 'string') {
        categories = [categories];
    }
    if (!Array.isArray(categories)) {
        categories = ['misc'];
    }
    // Normalize category names to lowercase
    categories = categories.map(cat => cat.toLowerCase());
    
    try {
        // Save to Firestore
        const pictureDocRef = doc(db, 'users', userId, 'customPictures', pictureId);
        await setDoc(pictureDocRef, {
            imageUrl: imageUrl,
            pictureId: pictureId, // Use pictureId as trailId for uploaded pictures
            trailId: pictureId, // Use pictureId as trailId for uploaded pictures
            position: position, // [lng, lat]
            categories: categories, // Selected categories
            fileName: fileName,
            createdAt: new Date().toISOString(),
            isUploadedPicture: true // Flag to distinguish from hardcoded pictures
        });
        
        console.log('✅ Picture saved to Firestore:', pictureId, 'with categories:', categories);
        
        // Reload custom pictures cache to include the new picture
        if (window.customPictures && window.customPictures.loadCustomPictures) {
            await window.customPictures.loadCustomPictures();
        }
        
        // Refresh the picture markers on the map
        if (window.updatePictureMarkers) {
            window.updatePictureMarkers();
        }
        
        alert('Picture placed on map! You can see it in "My Pictures".');
    } catch (error) {
        console.error('Error saving picture to Firestore:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('User ID:', userId);
        console.error('Picture ID:', pictureId);
        console.error('Is user authenticated?', !!auth.currentUser);
        alert('Error saving picture: ' + error.message + '\n\nCheck console for details.');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePictureUpload);
} else {
    initializePictureUpload();
}

