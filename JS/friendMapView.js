// Friend Map View Module - Handles viewing friend's videos and pictures
import { db, auth } from './firebaseConfig.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Cache for friend's content
let friendVideosCache = {};
let friendPicturesCache = {};

// Load friend's videos
export async function loadFriendVideos(friendId) {
    if (!auth.currentUser || !friendId) {
        friendVideosCache = {};
        return {};
    }
    
    try {
        const friendVideosRef = collection(db, 'users', friendId, 'customVideos');
        const snapshot = await getDocs(friendVideosRef);
        
        friendVideosCache = {};
        snapshot.forEach((docSnapshot) => {
            friendVideosCache[docSnapshot.id] = docSnapshot.data();
        });
        
        console.log('Loaded friend videos:', Object.keys(friendVideosCache).length);
        return friendVideosCache;
    } catch (error) {
        console.error('Error loading friend videos:', error);
        friendVideosCache = {};
        return {};
    }
}

// Load friend's pictures
export async function loadFriendPictures(friendId) {
    if (!auth.currentUser || !friendId) {
        friendPicturesCache = {};
        return {};
    }
    
    try {
        const friendPicturesRef = collection(db, 'users', friendId, 'customPictures');
        const snapshot = await getDocs(friendPicturesRef);
        
        friendPicturesCache = {};
        snapshot.forEach((docSnapshot) => {
            friendPicturesCache[docSnapshot.id] = docSnapshot.data();
        });
        
        console.log('Loaded friend pictures:', Object.keys(friendPicturesCache).length);
        return friendPicturesCache;
    } catch (error) {
        console.error('Error loading friend pictures:', error);
        friendPicturesCache = {};
        return {};
    }
}

// Get friend's videos (from cache)
export function getFriendVideos() {
    return friendVideosCache;
}

// Get friend's pictures (from cache)
export function getFriendPictures() {
    return friendPicturesCache;
}

// Get all friend video IDs
export function getFriendVideoIds() {
    return Object.keys(friendVideosCache);
}

// Get all friend picture IDs
export function getFriendPictureIds() {
    return Object.keys(friendPicturesCache);
}

// Clear friend content cache
export function clearFriendCache() {
    friendVideosCache = {};
    friendPicturesCache = {};
}

// Make functions available globally
window.friendMapView = {
    loadFriendVideos,
    loadFriendPictures,
    getFriendVideos,
    getFriendPictures,
    getFriendVideoIds,
    getFriendPictureIds,
    clearFriendCache
};

