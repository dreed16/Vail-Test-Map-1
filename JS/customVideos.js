// Custom Videos Module - Handles user-uploaded YouTube videos for trails
import { db, auth } from './firebaseConfig.js';
import { doc, setDoc, getDoc, deleteDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Cache for user's custom videos
let customVideosCache = {};
let myVideosMode = false;

// Extract video ID from various YouTube URL formats
function extractVideoId(url) {
    if (!url) return null;
    
    // Remove whitespace
    url = url.trim();
    
    // Handle various YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    // If it's already just an ID (11 characters, alphanumeric)
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
        return url;
    }
    
    return null;
}

// Load all custom videos for the current user
export async function loadCustomVideos() {
    const user = auth.currentUser;
    if (!user) {
        customVideosCache = {};
        return {};
    }
    
    try {
        const customVideosRef = collection(db, 'users', user.uid, 'customVideos');
        const snapshot = await getDocs(customVideosRef);
        
        customVideosCache = {};
        snapshot.forEach((docSnapshot) => {
            customVideosCache[docSnapshot.id] = docSnapshot.data();
        });
        
        console.log('Loaded custom videos:', Object.keys(customVideosCache).length);
        return customVideosCache;
    } catch (error) {
        console.error('Error loading custom videos:', error);
        return {};
    }
}

// Save a custom video for a trail
export async function saveCustomVideo(trailId, videoUrl) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to save custom videos');
    }
    
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        throw new Error('Invalid YouTube URL. Please provide a valid YouTube link.');
    }
    
    try {
        const videoDocRef = doc(db, 'users', user.uid, 'customVideos', trailId);
        await setDoc(videoDocRef, {
            videoUrl: videoUrl,
            videoId: videoId,
            trailId: trailId,
            createdAt: new Date().toISOString()
        });
        
        // Update cache
        customVideosCache[trailId] = {
            videoUrl: videoUrl,
            videoId: videoId,
            trailId: trailId
        };
        
        console.log('Saved custom video for trail:', trailId);
        return true;
    } catch (error) {
        console.error('Error saving custom video:', error);
        throw error;
    }
}

// Delete a custom video for a trail
export async function deleteCustomVideo(trailId) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to delete custom videos');
    }
    
    try {
        const videoDocRef = doc(db, 'users', user.uid, 'customVideos', trailId);
        await deleteDoc(videoDocRef);
        
        // Update cache
        delete customVideosCache[trailId];
        
        console.log('Deleted custom video for trail:', trailId);
        return true;
    } catch (error) {
        console.error('Error deleting custom video:', error);
        throw error;
    }
}

// Get custom video for a specific trail
export function getCustomVideo(trailId) {
    return customVideosCache[trailId] || null;
}

// Check if user has any custom videos
export function hasCustomVideos() {
    return Object.keys(customVideosCache).length > 0;
}

// Get all trail IDs that have custom videos
export function getTrailsWithCustomVideos() {
    return Object.keys(customVideosCache);
}

// Set My Videos mode
export function setMyVideosMode(enabled) {
    myVideosMode = enabled;
}

// Get My Videos mode
export function getMyVideosMode() {
    return myVideosMode;
}

// Check if a trail should be dimmed (when My Videos mode is on)
export function shouldDimTrail(trailId) {
    if (!myVideosMode) {
        return false; // Don't dim when mode is off
    }
    
    // Dim if trail doesn't have a custom video
    return !customVideosCache[trailId];
}

// Make functions available globally
window.customVideos = {
    loadCustomVideos,
    saveCustomVideo,
    deleteCustomVideo,
    getCustomVideo,
    hasCustomVideos,
    getTrailsWithCustomVideos,
    setMyVideosMode,
    getMyVideosMode,
    shouldDimTrail,
    extractVideoId
};

