// Profile Module - Handles user profile data
import { db, auth, storage } from './firebaseConfig.js';
import { doc, getDoc, setDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';

// Cache for current user's profile
let profileCache = null;

// Load profile for a user
export async function loadProfile(userId) {
    if (!userId) {
        return null;
    }
    
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const profileData = {
                userId: userId,
                email: userData.email || '',
                username: userData.username || '',
                displayName: userData.displayName || userData.email?.split('@')[0] || 'User',
                bio: userData.bio || '',
                profilePictureUrl: userData.profilePictureUrl || null,
                createdAt: userData.createdAt || null
            };
            
            // Cache if it's the current user
            if (userId === auth.currentUser?.uid) {
                profileCache = profileData;
            }
            
            return profileData;
        }
        
        return null;
    } catch (error) {
        console.error('Error loading profile:', error);
        return null;
    }
}

// Get current user's profile
export async function getCurrentUserProfile() {
    const user = auth.currentUser;
    if (!user) {
        return null;
    }
    
    // Return cache if available
    if (profileCache && profileCache.userId === user.uid) {
        return profileCache;
    }
    
    return await loadProfile(user.uid);
}

// Update profile
export async function updateProfile(updates) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to update profile');
    }
    
    try {
        const userDocRef = doc(db, 'users', user.uid);
        
        // Use updateDoc to only update specified fields
        await updateDoc(userDocRef, {
            ...updates,
            updatedAt: new Date().toISOString()
        });
        
        // Update cache
        if (profileCache) {
            profileCache = { ...profileCache, ...updates };
        }
        
        return true;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}

// Upload profile picture
export async function uploadProfilePicture(file) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to upload profile picture');
    }
    
    // Validate file
    if (!file || !file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Image must be less than 5MB');
    }
    
    try {
        // Delete old profile picture if exists
        const currentProfile = await getCurrentUserProfile();
        if (currentProfile?.profilePictureUrl) {
            try {
                // Extract path from URL
                const oldUrl = currentProfile.profilePictureUrl;
                if (oldUrl.includes('firebasestorage.googleapis.com')) {
                    // Extract the path from the URL
                    const pathMatch = oldUrl.match(/\/o\/(.+?)\?/);
                    if (pathMatch) {
                        const decodedPath = decodeURIComponent(pathMatch[1]);
                        const oldRef = ref(storage, decodedPath);
                        await deleteObject(oldRef);
                    }
                }
            } catch (deleteError) {
                console.warn('Could not delete old profile picture:', deleteError);
                // Continue anyway
            }
        }
        
        // Upload new picture
        const fileName = `profilePictures/${user.uid}/${Date.now()}_${file.name}`;
        const storageRef = ref(storage, fileName);
        
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Progress tracking (optional)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload progress:', progress + '%');
                },
                (error) => {
                    console.error('Upload error:', error);
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        
                        // Update profile with new picture URL
                        await updateProfile({ profilePictureUrl: downloadURL });
                        
                        resolve(downloadURL);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        throw error;
    }
}

// Get profile stats (videos, pictures, friends count)
export async function getProfileStats(userId) {
    if (!userId) {
        return { videos: 0, pictures: 0, friends: 0 };
    }
    
    try {
        const currentUserId = auth.currentUser?.uid;
        
        // If viewing own profile, use cached data
        if (userId === currentUserId) {
            // Get videos count
            let videosCount = 0;
            if (window.customVideos && window.customVideos.getTrailsWithCustomVideos) {
                const videoIds = window.customVideos.getTrailsWithCustomVideos();
                videosCount = videoIds ? videoIds.length : 0;
            }
            
            // Get pictures count
            let picturesCount = 0;
            if (window.customPictures && window.customPictures.getTrailsWithCustomPictures) {
                const pictureIds = window.customPictures.getTrailsWithCustomPictures();
                picturesCount = pictureIds ? pictureIds.length : 0;
            }
            
            // Get friends count
            let friendsCount = 0;
            if (window.friends && window.friends.getFriends) {
                const friends = window.friends.getFriends();
                friendsCount = friends ? friends.length : 0;
            }
            
            return {
                videos: videosCount,
                pictures: picturesCount,
                friends: friendsCount
            };
        } else {
            // For friend's profile, query their data from Firestore
            const { collection, getDocs } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
            
            // Get videos count
            let videosCount = 0;
            try {
                const videosRef = collection(db, 'users', userId, 'customVideos');
                const videosSnapshot = await getDocs(videosRef);
                videosCount = videosSnapshot.size;
            } catch (error) {
                console.warn('Could not get friend videos count:', error);
            }
            
            // Get pictures count
            let picturesCount = 0;
            try {
                const picturesRef = collection(db, 'users', userId, 'customPictures');
                const picturesSnapshot = await getDocs(picturesRef);
                picturesCount = picturesSnapshot.size;
            } catch (error) {
                console.warn('Could not get friend pictures count:', error);
            }
            
            // Get friends count
            let friendsCount = 0;
            try {
                const friendsRef = collection(db, 'users', userId, 'friends');
                const friendsSnapshot = await getDocs(friendsRef);
                friendsCount = friendsSnapshot.size;
            } catch (error) {
                console.warn('Could not get friend friends count:', error);
            }
            
            return {
                videos: videosCount,
                pictures: picturesCount,
                friends: friendsCount
            };
        }
    } catch (error) {
        console.error('Error getting profile stats:', error);
        return { videos: 0, pictures: 0, friends: 0 };
    }
}

// Clear profile cache (on logout)
export function clearProfileCache() {
    profileCache = null;
}

// Make functions available globally
window.profile = {
    loadProfile,
    getCurrentUserProfile,
    updateProfile,
    uploadProfilePicture,
    getProfileStats,
    clearProfileCache
};

