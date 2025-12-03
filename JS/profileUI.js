// Profile UI Module - Handles profile page UI and navigation
import { auth } from './firebaseConfig.js';

// Use window.profile instead of importing (profile.js exports to window)
const profile = window.profile;

let currentProfileUserId = null;

// Initialize profile UI
export function initializeProfileUI() {
    const profilePage = document.getElementById('profilePage');
    const backToMapButton = document.getElementById('backToMapButton');
    const editProfileButton = document.getElementById('editProfileButton');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeEditProfileModal = document.getElementById('closeEditProfileModal');
    const cancelEditProfileButton = document.getElementById('cancelEditProfileButton');
    const saveProfileButton = document.getElementById('saveProfileButton');
    const editProfilePictureButton = document.getElementById('editProfilePictureButton');
    const profilePictureInput = document.getElementById('profilePictureInput');
    
    if (!profilePage || !backToMapButton) {
        console.error('Profile UI elements not found');
        return;
    }
    
    // Back to map button
    backToMapButton.addEventListener('click', () => {
        showMapView();
    });
    
    // Edit profile button
    if (editProfileButton) {
        editProfileButton.addEventListener('click', () => {
            openEditProfileModal();
        });
    }
    
    // Close edit modal
    if (closeEditProfileModal) {
        closeEditProfileModal.addEventListener('click', () => {
            closeEditProfileModalFunc();
        });
    }
    
    if (cancelEditProfileButton) {
        cancelEditProfileButton.addEventListener('click', () => {
            closeEditProfileModalFunc();
        });
    }
    
    // Save profile
    if (saveProfileButton) {
        saveProfileButton.addEventListener('click', async () => {
            await saveProfile();
        });
    }
    
    // Edit profile picture
    if (editProfilePictureButton && profilePictureInput) {
        editProfilePictureButton.addEventListener('click', () => {
            profilePictureInput.click();
        });
        
        profilePictureInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                await uploadProfilePicture(file);
            }
        });
    }
    
    // Handle hash routing
    window.addEventListener('hashchange', handleHashRoute);
    handleHashRoute(); // Check on page load
}

// Handle hash routing (#profile/userId)
function handleHashRoute() {
    const hash = window.location.hash;
    if (hash.startsWith('#profile/')) {
        const userId = hash.substring(9); // Remove '#profile/'
        if (userId) {
            showProfile(userId);
        } else {
            showMapView();
        }
    } else {
        showMapView();
    }
}

// Show profile page
export async function showProfile(userId) {
    console.log('showProfile called with userId:', userId);
    const profilePage = document.getElementById('profilePage');
    const mapContainer = document.getElementById('map');
    
    if (!profilePage) {
        console.error('Profile page not found');
        alert('Profile page not found. Please refresh the page.');
        return;
    }
    
    // Hide map and show profile
    if (mapContainer) {
        mapContainer.style.display = 'none';
    }
    
    // Hide all buttons/UI elements on map
    hideMapUI();
    
    profilePage.style.display = 'block';
    currentProfileUserId = userId;
    
    // Update URL hash
    window.location.hash = `profile/${userId}`;
    
    // Load and display profile
    await loadAndDisplayProfile(userId);
}

// Show map view
export function showMapView() {
    const profilePage = document.getElementById('profilePage');
    const mapContainer = document.getElementById('map');
    
    if (profilePage) {
        profilePage.style.display = 'none';
    }
    
    if (mapContainer) {
        mapContainer.style.display = 'block';
    }
    
    // Show all buttons/UI elements on map
    showMapUI();
    
    // Clear hash or set to empty
    window.location.hash = '';
    currentProfileUserId = null;
}

// Hide map UI elements
function hideMapUI() {
    const elementsToHide = [
        'loginToggleButton',
        'myPicturesButton',
        'myVideosButton',
        'uploadVideoButton',
        'uploadPictureButton',
        'friendsButton',
        'friendMapDropdown',
        'videoCategoryDropdown'
    ];
    
    elementsToHide.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });
}

// Show map UI elements (restore based on login state)
function showMapUI() {
    const user = auth.currentUser;
    
    if (user) {
        const elementsToShow = [
            'myPicturesButton',
            'myVideosButton',
            'uploadVideoButton',
            'uploadPictureButton',
            'friendsButton'
        ];
        
        elementsToShow.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'block';
            }
        });
    }
    
    // Always show login button
    const loginButton = document.getElementById('loginToggleButton');
    if (loginButton) {
        loginButton.style.display = 'block';
    }
}

// Load and display profile
async function loadAndDisplayProfile(userId) {
    const user = auth.currentUser;
    const isOwnProfile = user && userId === user.uid;
    
    try {
        // Load profile data - use window.profile
        const profileModule = window.profile;
        if (!profileModule || !profileModule.loadProfile) {
            console.error('Profile module not available');
            alert('Profile module not loaded. Please refresh the page.');
            return;
        }
        const profileData = await profileModule.loadProfile(userId);
        
        if (!profileData) {
            alert('Profile not found');
            showMapView();
            return;
        }
        
        // Update UI elements
        const profileDisplayName = document.getElementById('profileDisplayName');
        const profileUsername = document.getElementById('profileUsername');
        const profileBio = document.getElementById('profileBio');
        const profilePicture = document.getElementById('profilePicture');
        const profilePageTitle = document.getElementById('profilePageTitle');
        const editProfileButton = document.getElementById('editProfileButton');
        const editProfilePictureButton = document.getElementById('editProfilePictureButton');
        
        if (profileDisplayName) {
            profileDisplayName.textContent = profileData.displayName;
        }
        
        if (profileUsername) {
            profileUsername.textContent = profileData.username ? `@${profileData.username}` : profileData.email;
        }
        
        if (profileBio) {
            profileBio.textContent = profileData.bio || 'No bio yet.';
        }
        
        if (profilePicture) {
            if (profileData.profilePictureUrl) {
                profilePicture.src = profileData.profilePictureUrl;
            } else {
                // Default avatar
                profilePicture.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150"><circle cx="75" cy="75" r="75" fill="%23e0e0e0"/><text x="75" y="90" font-size="60" text-anchor="middle" fill="%23999">👤</text></svg>';
            }
        }
        
        if (profilePageTitle) {
            profilePageTitle.textContent = isOwnProfile ? 'My Profile' : `${profileData.displayName}'s Profile`;
        }
        
        // Show/hide edit buttons based on ownership
        if (editProfileButton) {
            editProfileButton.style.display = isOwnProfile ? 'block' : 'none';
        }
        
        if (editProfilePictureButton) {
            editProfilePictureButton.style.display = isOwnProfile ? 'block' : 'none';
        }
        
        // Load stats
        await loadProfileStats(userId, profileModule);
        
        // Load pinned videos
        await loadPinnedVideos(userId);
        
    } catch (error) {
        console.error('Error loading profile:', error);
        alert('Error loading profile: ' + error.message);
    }
}

// Load and display pinned videos (exported for use in main.js)
export async function loadPinnedVideos(userId) {
    try {
        const pinnedVideosSection = document.getElementById('pinnedVideosSection');
        const pinnedVideosGrid = document.getElementById('pinnedVideosGrid');
        
        if (!pinnedVideosSection || !pinnedVideosGrid) {
            console.warn('Pinned videos section not found');
            return;
        }
        
        // Check if viewing own profile or friend's profile
        const user = auth.currentUser;
        const isOwnProfile = user && userId === user.uid;
        
        // Get pinned videos
        let pinnedVideos = [];
        if (isOwnProfile && window.customVideos && window.customVideos.getPinnedVideos) {
            pinnedVideos = await window.customVideos.getPinnedVideos();
        } else if (!isOwnProfile) {
            // For friend's profile, we need to load from their collection
            // For now, we'll only show pinned videos for own profile
            // TODO: Add friend pinned videos support
            pinnedVideos = [];
        }
        
        console.log('Loaded pinned videos:', pinnedVideos.length);
        
        if (pinnedVideos.length === 0) {
            pinnedVideosSection.style.display = 'none';
            return;
        }
        
        // Show section and display videos
        pinnedVideosSection.style.display = 'block';
        pinnedVideosGrid.innerHTML = '';
        
        // Limit to 3 videos (should already be limited, but just in case)
        const videosToShow = pinnedVideos.slice(0, 3);
        
        videosToShow.forEach((videoData) => {
            const videoCard = document.createElement('div');
            videoCard.className = 'pinned-video-card';
            
            const videoUrl = videoData.videoUrl;
            const isUploadedVideo = videoData.isUploadedVideo || (videoUrl && videoUrl.includes('firebasestorage.googleapis.com'));
            
            let videoHTML = '';
            if (isUploadedVideo) {
                // Uploaded video - use thumbnail or video element
                videoHTML = `
                    <video class="pinned-video-thumbnail" controls style="width: 100%; height: auto; border-radius: 5px;">
                        <source src="${videoUrl}" type="video/mp4">
                    </video>
                `;
            } else {
                // YouTube video - extract video ID and use thumbnail
                const videoId = videoData.videoId || extractYouTubeId(videoUrl);
                if (videoId) {
                    videoHTML = `
                        <img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" alt="Video thumbnail" class="pinned-video-thumbnail" style="width: 100%; height: auto; border-radius: 5px; cursor: pointer;" onclick="window.open('${videoUrl}', '_blank')">
                    `;
                } else {
                    videoHTML = `<div class="pinned-video-placeholder">Video</div>`;
                }
            }
            
            videoCard.innerHTML = `
                ${videoHTML}
                <div class="pinned-video-info">
                    <p class="pinned-video-categories">${(videoData.categories || ['misc']).join(', ')}</p>
                </div>
            `;
            
            pinnedVideosGrid.appendChild(videoCard);
        });
        
    } catch (error) {
        console.error('Error loading pinned videos:', error);
    }
}

// Helper function to extract YouTube video ID
function extractYouTubeId(url) {
    if (!url) return null;
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
    return null;
}

// Load profile stats
async function loadProfileStats(userId, profileModule = null) {
    try {
        const profileMod = profileModule || window.profile;
        if (!profileMod || !profileMod.getProfileStats) {
            console.error('Profile stats function not available');
            return;
        }
        const stats = await profileMod.getProfileStats(userId);
        
        const videosCount = document.getElementById('profileVideosCount');
        const picturesCount = document.getElementById('profilePicturesCount');
        const friendsCount = document.getElementById('profileFriendsCount');
        
        if (videosCount) videosCount.textContent = stats.videos;
        if (picturesCount) picturesCount.textContent = stats.pictures;
        if (friendsCount) friendsCount.textContent = stats.friends;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Open edit profile modal
function openEditProfileModal() {
    const editProfileModal = document.getElementById('editProfileModal');
    const editDisplayName = document.getElementById('editDisplayName');
    const editBio = document.getElementById('editBio');
    
    if (!editProfileModal) return;
    
    // Load current profile data
    const profileModule = window.profile;
    if (!profileModule || !profileModule.getCurrentUserProfile) {
        console.error('Profile module not available');
        return;
    }
    
    profileModule.getCurrentUserProfile().then(profileData => {
        if (profileData) {
            if (editDisplayName) {
                editDisplayName.value = profileData.displayName || '';
            }
            if (editBio) {
                editBio.value = profileData.bio || '';
            }
        }
        
        editProfileModal.style.display = 'block';
    });
}

// Close edit profile modal
function closeEditProfileModalFunc() {
    const editProfileModal = document.getElementById('editProfileModal');
    if (editProfileModal) {
        editProfileModal.style.display = 'none';
    }
}

// Save profile
async function saveProfile() {
    const editDisplayName = document.getElementById('editDisplayName');
    const editBio = document.getElementById('editBio');
    
    if (!editDisplayName || !editBio) {
        return;
    }
    
    const displayName = editDisplayName.value.trim();
    const bio = editBio.value.trim();
    
    const profileModule = window.profile;
    if (!profileModule || !profileModule.updateProfile) {
        console.error('Profile module not available');
        alert('Profile module not loaded. Please refresh the page.');
        return;
    }
    
    try {
        await profileModule.updateProfile({
            displayName: displayName || null,
            bio: bio || null
        });
        
        closeEditProfileModalFunc();
        
        // Reload profile to show updates
        const user = auth.currentUser;
        if (user) {
            await loadAndDisplayProfile(user.uid);
        }
        
        alert('Profile updated successfully!');
    } catch (error) {
        console.error('Error saving profile:', error);
        alert('Error saving profile: ' + error.message);
    }
}

// Upload profile picture
async function uploadProfilePicture(file) {
    const profileModule = window.profile;
    if (!profileModule || !profileModule.uploadProfilePicture) {
        console.error('Profile module not available');
        alert('Profile module not loaded. Please refresh the page.');
        return;
    }
    
    try {
        const editProfilePictureButton = document.getElementById('editProfilePictureButton');
        if (editProfilePictureButton) {
            editProfilePictureButton.disabled = true;
            editProfilePictureButton.textContent = 'Uploading...';
        }
        
        const downloadURL = await profileModule.uploadProfilePicture(file);
        
        // Reload profile to show new picture
        const user = auth.currentUser;
        if (user) {
            await loadAndDisplayProfile(user.uid);
        }
        
        if (editProfilePictureButton) {
            editProfilePictureButton.disabled = false;
            editProfilePictureButton.textContent = 'Change Picture';
        }
        
        alert('Profile picture updated successfully!');
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        alert('Error uploading picture: ' + error.message);
        
        const editProfilePictureButton = document.getElementById('editProfilePictureButton');
        if (editProfilePictureButton) {
            editProfilePictureButton.disabled = false;
            editProfilePictureButton.textContent = 'Change Picture';
        }
    }
}

// Make functions available globally IMMEDIATELY (before initialization)
// This ensures they're available when other modules try to use them
window.showProfile = showProfile;
window.showMapView = showMapView;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializeProfileUI, 500);
    });
} else {
    setTimeout(initializeProfileUI, 500);
}

