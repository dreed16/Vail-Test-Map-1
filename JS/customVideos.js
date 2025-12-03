// Custom Videos Module - Handles user-uploaded YouTube videos for trails
import { db, auth } from './firebaseConfig.js';
import { doc, setDoc, getDoc, deleteDoc, collection, getDocs, updateDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

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
        // Suppress error - using hardcoded list for now, Firebase is optional
        console.warn('Could not load custom videos from Firebase (using hardcoded list instead):', error.message);
        return {};
    }
}

// Save a custom video for a trail
export async function saveCustomVideo(trailId, videoUrl, categories = ['misc']) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to save custom videos');
    }
    
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        throw new Error('Invalid YouTube URL. Please provide a valid YouTube link.');
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
        const videoDocRef = doc(db, 'users', user.uid, 'customVideos', trailId);
        await setDoc(videoDocRef, {
            videoUrl: videoUrl,
            videoId: videoId,
            trailId: trailId,
            categories: categories, // Store as array
            createdAt: new Date().toISOString()
        });
        
        // Update cache
        customVideosCache[trailId] = {
            videoUrl: videoUrl,
            videoId: videoId,
            trailId: trailId,
            categories: categories
        };
        
        console.log('Saved custom video for trail:', trailId, 'with categories:', categories);
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

// Pin a video (max 3 pinned videos)
export async function pinVideo(trailId) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to pin videos');
    }
    
    try {
        // Get all videos to check how many are pinned
        const customVideosRef = collection(db, 'users', user.uid, 'customVideos');
        const snapshot = await getDocs(customVideosRef);
        
        let pinnedCount = 0;
        snapshot.forEach((docSnapshot) => {
            const data = docSnapshot.data();
            if (data.pinned === true) {
                pinnedCount++;
            }
        });
        
        // Check if already pinned
        const currentVideo = customVideosCache[trailId];
        if (currentVideo && currentVideo.pinned === true) {
            throw new Error('Video is already pinned');
        }
        
        // Enforce 3-video limit
        if (pinnedCount >= 3) {
            throw new Error('You can only pin up to 3 videos. Please unpin another video first.');
        }
        
        // Update video document
        const videoDocRef = doc(db, 'users', user.uid, 'customVideos', trailId);
        await updateDoc(videoDocRef, { pinned: true });
        
        // Update cache
        if (customVideosCache[trailId]) {
            customVideosCache[trailId].pinned = true;
        }
        
        console.log('Pinned video:', trailId);
        return true;
    } catch (error) {
        console.error('Error pinning video:', error);
        throw error;
    }
}

// Unpin a video
export async function unpinVideo(trailId) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to unpin videos');
    }
    
    try {
        // Update video document
        const videoDocRef = doc(db, 'users', user.uid, 'customVideos', trailId);
        await updateDoc(videoDocRef, { pinned: false });
        
        // Update cache
        if (customVideosCache[trailId]) {
            customVideosCache[trailId].pinned = false;
        }
        
        console.log('Unpinned video:', trailId);
        return true;
    } catch (error) {
        console.error('Error unpinning video:', error);
        throw error;
    }
}

// Get all pinned videos
export async function getPinnedVideos() {
    const user = auth.currentUser;
    if (!user) {
        return [];
    }
    
    try {
        const customVideosRef = collection(db, 'users', user.uid, 'customVideos');
        const snapshot = await getDocs(customVideosRef);
        
        const pinnedVideos = [];
        snapshot.forEach((docSnapshot) => {
            const data = docSnapshot.data();
            if (data.pinned === true) {
                pinnedVideos.push({
                    trailId: docSnapshot.id,
                    ...data
                });
            }
        });
        
        // Sort by createdAt (newest first) or maintain order
        pinnedVideos.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
            return dateB - dateA;
        });
        
        return pinnedVideos;
    } catch (error) {
        console.error('Error getting pinned videos:', error);
        return [];
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

// TEST FUNCTION: Add fake video for testing (bypasses Firebase)
function addFakeVideo(trailId, videoUrl) {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        console.error('Invalid YouTube URL:', videoUrl);
        return false;
    }
    
    // Add to cache directly (bypasses Firebase)
    customVideosCache[trailId] = {
        videoUrl: videoUrl,
        videoId: videoId,
        trailId: trailId,
        createdAt: new Date().toISOString()
    };
    
    console.log('Added fake video for trail:', trailId, 'Video ID:', videoId);
    return true;
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
    extractVideoId,
    addFakeVideo,  // Add test function
    pinVideo,
    unpinVideo,
    getPinnedVideos
};

