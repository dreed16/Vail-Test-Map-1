// Friend Map View UI Module - Handles the UI for viewing friend's maps
// friends.js and friendMapView.js export to window, so we use those
const friends = window.friends;
const friendMapView = window.friendMapView;

// Initialize friend map view UI
function initializeFriendMapViewUI() {
    const friendMapDropdown = document.getElementById('friendMapDropdown');
    const friendMapSelect = document.getElementById('friendMapSelect');
    const viewMyMapButton = document.getElementById('viewMyMapButton');
    
    if (!friendMapDropdown || !friendMapSelect || !viewMyMapButton) {
        console.error('Friend map view UI elements not found');
        return;
    }
    
    // Populate friend dropdown
    function populateFriendDropdown() {
        if (!friends) {
            console.warn('friends module not available');
            return;
        }
        
        const friendsList = friends.getFriends();
        friendMapSelect.innerHTML = '<option value="">Select a friend...</option>';
        
        friendsList.forEach(friend => {
            const option = document.createElement('option');
            option.value = friend.friendId;
            option.textContent = friend.friendEmail || 'Unknown';
            friendMapSelect.appendChild(option);
        });
        
        // Show/hide dropdown based on whether user has friends
        if (friendsList.length > 0) {
            friendMapDropdown.style.display = 'block';
        } else {
            friendMapDropdown.style.display = 'none';
        }
    }
    
    // Handle friend selection
    friendMapSelect.addEventListener('change', async (e) => {
        const friendId = e.target.value;
        
        if (!friendId) {
            // Return to my map
            await switchToMyMap();
            return;
        }
        
        // Load and display friend's map
        await switchToFriendMap(friendId);
    });
    
    // Handle "View My Map" button
    viewMyMapButton.addEventListener('click', async () => {
        await switchToMyMap();
    });
    
    // Switch to friend's map
    async function switchToFriendMap(friendId) {
        console.log('Switching to friend map:', friendId);
        
        if (!friendMapView) {
            console.error('friendMapView not available');
            alert('Friend map view not available. Please refresh the page.');
            return;
        }
        
        // Set global state
        window.viewingFriendMap = true;
        window.currentFriendId = friendId;
        
        // Load friend's videos and pictures
        try {
            await friendMapView.loadFriendVideos(friendId);
            await friendMapView.loadFriendPictures(friendId);
        } catch (error) {
            console.error('Error loading friend content:', error);
            alert('Error loading friend\'s map: ' + error.message);
            return;
        }
        
        // Update UI
        friendMapSelect.value = friendId;
        
        // Don't enable My Videos/My Pictures buttons - friend's content will show based on viewingFriendMap flag alone
        // This keeps the UI clean and prevents confusion
        
        // Update video and picture markers
        if (window.updateVideoMarkers) {
            window.updateVideoMarkers();
        }
        if (window.updatePictureMarkers) {
            window.updatePictureMarkers();
        }
        
        console.log('Switched to friend map');
    }
    
    // Switch back to my map
    async function switchToMyMap() {
        console.log('Switching to my map');
        
        // Clear global state
        window.viewingFriendMap = false;
        window.currentFriendId = null;
        
        // Clear friend cache
        if (friendMapView) {
            friendMapView.clearFriendCache();
        }
        
        // Update UI
        friendMapSelect.value = '';
        
        // Update video and picture markers
        if (window.updateVideoMarkers) {
            window.updateVideoMarkers();
        }
        if (window.updatePictureMarkers) {
            window.updatePictureMarkers();
        }
        
        console.log('Switched to my map');
    }
    
    // Expose functions globally
    window.switchToFriendMap = switchToFriendMap;
    window.switchToMyMap = switchToMyMap;
    
    // Initial population
    populateFriendDropdown();
    
    // Refresh when friends list changes (listen for custom event or poll)
    // For now, we'll refresh when the friends modal is opened/closed
    const friendsModal = document.getElementById('friendsModal');
    if (friendsModal) {
        // Use MutationObserver to detect when modal opens/closes
        const observer = new MutationObserver(() => {
            if (friendsModal.style.display === 'none') {
                // Modal closed, refresh friend list
                setTimeout(populateFriendDropdown, 500);
            }
        });
        observer.observe(friendsModal, { attributes: true, attributeFilter: ['style'] });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializeFriendMapViewUI, 200);
    });
} else {
    setTimeout(initializeFriendMapViewUI, 200);
}
