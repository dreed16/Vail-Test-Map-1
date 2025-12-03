// Video Upload Module - Handles video file uploads to Firebase Storage
import { storage, auth, db } from './firebaseConfig.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// File size limit: 200MB
const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB in bytes

// Allowed video formats
const ALLOWED_VIDEO_TYPES = [
    'video/mp4',
    'video/quicktime', // MOV files
    'video/x-msvideo', // AVI files
    'video/webm'
];

// Initialize upload modal and handlers
export function initializeVideoUpload() {
    const uploadVideoButton = document.getElementById('uploadVideoButton');
    const uploadVideoModal = document.getElementById('uploadVideoModal');
    const closeUploadModal = document.getElementById('closeUploadModal');
    const cancelUploadVideo = document.getElementById('cancelUploadVideo');
    const videoFileInput = document.getElementById('videoFileInput');
    const uploadVideoButtonConfirm = document.getElementById('uploadVideoButtonConfirm');
    
    if (!uploadVideoButton || !uploadVideoModal) {
        console.error('Upload video elements not found');
        return;
    }
    
    // Open modal when Upload Video button is clicked
    uploadVideoButton.addEventListener('click', () => {
        uploadVideoModal.style.display = 'block';
        resetUploadModal();
    });
    
    // Close modal handlers
    if (closeUploadModal) {
        closeUploadModal.addEventListener('click', () => {
            uploadVideoModal.style.display = 'none';
            resetUploadModal();
        });
    }
    
    if (cancelUploadVideo) {
        cancelUploadVideo.addEventListener('click', () => {
            uploadVideoModal.style.display = 'none';
            resetUploadModal();
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === uploadVideoModal) {
            uploadVideoModal.style.display = 'none';
            resetUploadModal();
        }
    });
    
    // Handle file selection
    if (videoFileInput) {
        videoFileInput.addEventListener('change', (event) => {
            handleFileSelection(event.target.files[0]);
        });
    }
    
    // Handle upload button click
    if (uploadVideoButtonConfirm) {
        uploadVideoButtonConfirm.addEventListener('click', () => {
            const file = videoFileInput?.files[0];
            if (file) {
                handleVideoUpload(file);
            }
        });
    }
}

// Reset upload modal to initial state
function resetUploadModal() {
    const videoFileInput = document.getElementById('videoFileInput');
    const fileInfo = document.getElementById('fileInfo');
    const fileError = document.getElementById('fileError');
    const uploadProgressSection = document.getElementById('uploadProgressSection');
    const uploadVideoButtonConfirm = document.getElementById('uploadVideoButtonConfirm');
    
    if (videoFileInput) videoFileInput.value = '';
    if (fileInfo) fileInfo.style.display = 'none';
    if (fileError) {
        fileError.style.display = 'none';
        fileError.textContent = '';
    }
    if (uploadProgressSection) uploadProgressSection.style.display = 'none';
    if (uploadVideoButtonConfirm) uploadVideoButtonConfirm.disabled = true;
}

// Handle file selection and validation
function handleFileSelection(file) {
    const fileInfo = document.getElementById('fileInfo');
    const fileError = document.getElementById('fileError');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const fileType = document.getElementById('fileType');
    const uploadVideoButtonConfirm = document.getElementById('uploadVideoButtonConfirm');
    
    // Hide previous errors
    if (fileError) {
        fileError.style.display = 'none';
        fileError.textContent = '';
    }
    
    if (!file) {
        if (fileInfo) fileInfo.style.display = 'none';
        if (uploadVideoButtonConfirm) uploadVideoButtonConfirm.disabled = true;
        return;
    }
    
    // Validate file type
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
        if (fileError) {
            fileError.textContent = `Invalid file type. Please select a video file (MP4, MOV, AVI, or WebM).`;
            fileError.style.display = 'block';
        }
        if (fileInfo) fileInfo.style.display = 'none';
        if (uploadVideoButtonConfirm) uploadVideoButtonConfirm.disabled = true;
        return;
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        if (fileError) {
            const maxSizeMB = (MAX_FILE_SIZE / 1024 / 1024).toFixed(0);
            const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
            fileError.textContent = `File too large. Maximum size is ${maxSizeMB}MB. Your file is ${fileSizeMB}MB.`;
            fileError.style.display = 'block';
        }
        if (fileInfo) fileInfo.style.display = 'none';
        if (uploadVideoButtonConfirm) uploadVideoButtonConfirm.disabled = true;
        return;
    }
    
    // Show file info
    if (fileInfo) {
        if (fileName) fileName.textContent = file.name;
        if (fileSize) fileSize.textContent = formatFileSize(file.size);
        if (fileType) fileType.textContent = file.type || 'Unknown';
        fileInfo.style.display = 'block';
    }
    
    // Enable upload button
    if (uploadVideoButtonConfirm) {
        uploadVideoButtonConfirm.disabled = false;
    }
}

// Format file size for display
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

// Handle video upload to Firebase Storage
async function handleVideoUpload(file) {
    if (!auth.currentUser) {
        alert('You must be logged in to upload videos.');
        return;
    }
    
    const userId = auth.currentUser.uid;
    const fileName = `${Date.now()}-${file.name}`;
    const fileRef = ref(storage, `videos/${userId}/${fileName}`);
    
    // Show upload progress
    const uploadProgressSection = document.getElementById('uploadProgressSection');
    const uploadProgressBar = document.getElementById('uploadProgressBar');
    const uploadProgressText = document.getElementById('uploadProgressText');
    const uploadVideoButtonConfirm = document.getElementById('uploadVideoButtonConfirm');
    
    if (uploadProgressSection) uploadProgressSection.style.display = 'block';
    if (uploadVideoButtonConfirm) uploadVideoButtonConfirm.disabled = true;
    
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
                if (fileError) {
                    fileError.textContent = `Upload failed: ${error.message}`;
                    fileError.style.display = 'block';
                }
                if (uploadProgressSection) uploadProgressSection.style.display = 'none';
                if (uploadVideoButtonConfirm) uploadVideoButtonConfirm.disabled = false;
            },
            async () => {
                // Success
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('✅ Video uploaded successfully! URL:', downloadURL);
                
                // Hide progress
                if (uploadProgressSection) uploadProgressSection.style.display = 'none';
                
                // Close upload modal
                const uploadVideoModal = document.getElementById('uploadVideoModal');
                if (uploadVideoModal) uploadVideoModal.style.display = 'none';
                resetUploadModal();
                
                // Now ask user to click on map to place the video
                await promptForMapPosition(downloadURL, file.name);
            }
        );
    } catch (error) {
        console.error('Error starting upload:', error);
        if (fileError) {
            fileError.textContent = `Upload failed: ${error.message}`;
            fileError.style.display = 'block';
        }
        if (uploadProgressSection) uploadProgressSection.style.display = 'none';
        if (uploadVideoButtonConfirm) uploadVideoButtonConfirm.disabled = false;
    }
}

// Ask user to click on map to place video
async function promptForMapPosition(videoUrl, fileName) {
    // Show message asking user to click on map
    const message = 'Video uploaded! Click on the map to place this video.';
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
        
        // Show category selection modal before saving
        await promptForCategorySelection(videoUrl, fileName, position);
    };
    
    map.on('click', clickHandler);
}

// Show category selection modal for uploaded videos
async function promptForCategorySelection(videoUrl, fileName, position) {
    const categoryModal = document.getElementById('videoCategoryModal');
    if (!categoryModal) {
        // Fallback: save with default category if modal doesn't exist
        console.warn('Category modal not found, using default category');
        await saveVideoToFirestore(videoUrl, fileName, position, ['misc']);
        return;
    }
    
    // Reset checkboxes (default to misc checked)
    document.querySelectorAll('#categoryCheckboxes input[type="checkbox"]').forEach(cb => {
        cb.checked = cb.value === 'misc';
    });
    
    // Show modal
    categoryModal.style.display = 'block';
    
    // Set up modal handlers (one-time use for this upload)
    const closeModal = () => {
        categoryModal.style.display = 'none';
        // Remove event listeners
        if (confirmBtn) {
            confirmBtn.replaceWith(confirmBtn.cloneNode(true));
        }
        if (cancelBtn) {
            cancelBtn.replaceWith(cancelBtn.cloneNode(true));
        }
        if (closeBtn) {
            closeBtn.replaceWith(closeBtn.cloneNode(true));
        }
    };
    
    const confirmBtn = document.getElementById('confirmCategorySelection');
    const cancelBtn = document.getElementById('cancelCategorySelection');
    const closeBtn = document.getElementById('closeCategoryModal');
    
    // Handle confirm button
    if (confirmBtn) {
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.replaceWith(newConfirmBtn);
        
        newConfirmBtn.addEventListener('click', async () => {
            // Get selected categories
            const selectedCategories = [];
            document.querySelectorAll('#categoryCheckboxes input[type="checkbox"]:checked').forEach(cb => {
                selectedCategories.push(cb.value);
            });
            
            // Ensure at least one category is selected
            if (selectedCategories.length === 0) {
                alert('Please select at least one category.');
                return;
            }
            
            closeModal();
            
            // Save video with selected categories
            await saveVideoToFirestore(videoUrl, fileName, position, selectedCategories);
        });
    }
    
    // Handle cancel/close buttons
    if (cancelBtn) {
        const newCancelBtn = cancelBtn.cloneNode(true);
        cancelBtn.replaceWith(newCancelBtn);
        newCancelBtn.addEventListener('click', () => {
            closeModal();
            alert('Video upload cancelled. The video file was uploaded but not saved to the map.');
        });
    }
    
    if (closeBtn) {
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.replaceWith(newCloseBtn);
        newCloseBtn.addEventListener('click', () => {
            closeModal();
            alert('Video upload cancelled. The video file was uploaded but not saved to the map.');
        });
    }
}

// Save video info to Firestore
async function saveVideoToFirestore(videoUrl, fileName, position, categories = ['misc']) {
    if (!auth.currentUser) {
        alert('You must be logged in to save videos.');
        return;
    }
    
    const userId = auth.currentUser.uid;
    const videoId = `uploaded-${Date.now()}`;
    
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
        const videoDocRef = doc(db, 'users', userId, 'customVideos', videoId);
        await setDoc(videoDocRef, {
            videoUrl: videoUrl,
            videoId: videoId,
            trailId: videoId, // Use videoId as trailId for uploaded videos
            position: position, // [lng, lat]
            categories: categories, // Selected categories
            fileName: fileName,
            createdAt: new Date().toISOString(),
            isUploadedVideo: true // Flag to distinguish from YouTube videos
        });
        
        console.log('✅ Video saved to Firestore:', videoId);
        
        // Reload custom videos cache to include the new video
        if (window.customVideos && window.customVideos.loadCustomVideos) {
            await window.customVideos.loadCustomVideos();
        }
        
        // Refresh the video markers on the map
        if (window.updateVideoMarkers) {
            window.updateVideoMarkers();
        }
        
        alert('Video placed on map! You can see it in "My Videos".');
    } catch (error) {
        console.error('Error saving video to Firestore:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('User ID:', userId);
        console.error('Video ID:', videoId);
        console.error('Is user authenticated?', !!auth.currentUser);
        alert('Error saving video: ' + error.message + '\n\nCheck console for details.');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVideoUpload);
} else {
    initializeVideoUpload();
}

