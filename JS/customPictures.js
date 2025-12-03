// Custom Pictures Module - Handles user-uploaded pictures
import { db, auth } from './firebaseConfig.js';
import { doc, setDoc, getDoc, deleteDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Cache for user's custom pictures
let customPicturesCache = {};
let myPicturesMode = false;

// Load all custom pictures for the current user
export async function loadCustomPictures() {
    const user = auth.currentUser;
    if (!user) {
        customPicturesCache = {};
        return {};
    }
    
    try {
        const customPicturesRef = collection(db, 'users', user.uid, 'customPictures');
        const snapshot = await getDocs(customPicturesRef);
        
        customPicturesCache = {};
        snapshot.forEach((docSnapshot) => {
            customPicturesCache[docSnapshot.id] = docSnapshot.data();
        });
        
        console.log('Loaded custom pictures:', Object.keys(customPicturesCache).length);
        return customPicturesCache;
    } catch (error) {
        // Suppress error - using hardcoded list for now, Firebase is optional
        console.warn('Could not load custom pictures from Firebase (using hardcoded list instead):', error.message);
        return {};
    }
}

// Save a custom picture
export async function saveCustomPicture(trailId, imageUrl, categories = ['misc'], position = null, isUploadedPicture = false) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to save custom pictures');
    }
    
    // Ensure categories is an array (backward compatible)
    if (typeof categories === 'string') {
        categories = [categories];
    }
    if (!Array.isArray(categories)) {
        categories = ['misc'];
    }
    // Normalize category names to lowercase
    categories = categories.map(cat => cat.toLowerCase());
    
    try {
        const pictureDocRef = doc(db, 'users', user.uid, 'customPictures', trailId);
        await setDoc(pictureDocRef, {
            imageUrl: imageUrl,
            pictureId: trailId,
            trailId: trailId,
            position: position, // Store position
            categories: categories, // Store as array
            fileName: isUploadedPicture ? trailId : null, // Store original file name for uploaded pictures
            createdAt: new Date().toISOString(),
            isUploadedPicture: isUploadedPicture // Flag to distinguish from hardcoded pictures
        });
        
        // Update cache
        customPicturesCache[trailId] = {
            imageUrl: imageUrl,
            pictureId: trailId,
            trailId: trailId,
            position: position,
            categories: categories,
            fileName: isUploadedPicture ? trailId : null,
            isUploadedPicture: isUploadedPicture
        };
        
        console.log('Saved custom picture for trail:', trailId, 'with categories:', categories, 'position:', position);
        return true;
    } catch (error) {
        console.error('Error saving custom picture:', error);
        throw error;
    }
}

// Delete a custom picture
export async function deleteCustomPicture(trailId) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to delete custom pictures');
    }
    
    try {
        const pictureDocRef = doc(db, 'users', user.uid, 'customPictures', trailId);
        await deleteDoc(pictureDocRef);
        
        // Update cache
        delete customPicturesCache[trailId];
        
        console.log('Deleted custom picture for trail:', trailId);
        return true;
    } catch (error) {
        console.error('Error deleting custom picture:', error);
        throw error;
    }
}

// Get custom picture for a specific trail
export function getCustomPicture(trailId) {
    return customPicturesCache[trailId] || null;
}

// Check if user has any custom pictures
export function hasCustomPictures() {
    return Object.keys(customPicturesCache).length > 0;
}

// Get all trail IDs that have custom pictures
export function getTrailsWithCustomPictures() {
    return Object.keys(customPicturesCache);
}

// Set My Pictures mode
export function setMyPicturesMode(enabled) {
    myPicturesMode = enabled;
}

// Get My Pictures mode
export function getMyPicturesMode() {
    return myPicturesMode;
}

// Make functions available globally
window.customPictures = {
    loadCustomPictures,
    saveCustomPicture,
    deleteCustomPicture,
    getCustomPicture,
    hasCustomPictures,
    getTrailsWithCustomPictures,
    setMyPicturesMode,
    getMyPicturesMode
};

