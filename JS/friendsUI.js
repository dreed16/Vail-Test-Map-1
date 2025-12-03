// Friends UI Module - Handles the friends modal and UI interactions
// friends.js exports to window.friends, so we use that
const friends = window.friends;

// Initialize friends UI
function initializeFriendsUI() {
    const friendsButton = document.getElementById('friendsButton');
    const friendsModal = document.getElementById('friendsModal');
    const closeFriendsModal = document.getElementById('closeFriendsModal');
    
    // Tab buttons
    const friendsTab = document.getElementById('friendsTab');
    const requestsTab = document.getElementById('requestsTab');
    const addFriendTab = document.getElementById('addFriendTab');
    
    // Tab contents
    const friendsListContent = document.getElementById('friendsListContent');
    const requestsListContent = document.getElementById('requestsListContent');
    const addFriendContent = document.getElementById('addFriendContent');
    
    // Add friend elements
    const friendEmailInput = document.getElementById('friendEmailInput');
    const sendFriendRequestButton = document.getElementById('sendFriendRequestButton');
    const addFriendError = document.getElementById('addFriendError');
    
    if (!friendsButton || !friendsModal) {
        console.error('Friends UI elements not found');
        return;
    }
    
    // Open friends modal
    friendsButton.addEventListener('click', async () => {
        friendsModal.style.display = 'block';
        // Load fresh data
        await refreshFriendsData();
        // Show friends tab by default
        showTab('friends');
    });
    
    // Close modal
    if (closeFriendsModal) {
        closeFriendsModal.addEventListener('click', () => {
            friendsModal.style.display = 'none';
        });
    }
    
    // Tab switching
    if (friendsTab) {
        friendsTab.addEventListener('click', () => showTab('friends'));
    }
    if (requestsTab) {
        requestsTab.addEventListener('click', () => showTab('requests'));
    }
    if (addFriendTab) {
        addFriendTab.addEventListener('click', () => showTab('addFriend'));
    }
    
    // Send friend request
    if (sendFriendRequestButton) {
        sendFriendRequestButton.addEventListener('click', async () => {
            const email = friendEmailInput?.value?.trim();
            if (!email) {
                showAddFriendError('Please enter an email address');
                return;
            }
            
            try {
                sendFriendRequestButton.disabled = true;
                sendFriendRequestButton.textContent = 'Sending...';
                addFriendError.style.display = 'none';
                
                await friends.sendFriendRequest(email);
                
                // Success
                friendEmailInput.value = '';
                showAddFriendError('', false); // Clear error
                sendFriendRequestButton.textContent = 'Sent!';
                
                // Refresh requests
                await refreshFriendsData();
                
                // Switch to requests tab to see the sent request
                setTimeout(() => {
                    showTab('requests');
                    sendFriendRequestButton.textContent = 'Send Friend Request';
                    sendFriendRequestButton.disabled = false;
                }, 1000);
            } catch (error) {
                showAddFriendError(error.message);
                sendFriendRequestButton.textContent = 'Send Friend Request';
                sendFriendRequestButton.disabled = false;
            }
        });
    }
    
    // Allow Enter key to send friend request
    if (friendEmailInput) {
        friendEmailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && sendFriendRequestButton) {
                sendFriendRequestButton.click();
            }
        });
    }
}

// Show a specific tab
function showTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show selected tab
    if (tabName === 'friends') {
        const friendsTab = document.getElementById('friendsTab');
        const friendsListContent = document.getElementById('friendsListContent');
        if (friendsTab) friendsTab.classList.add('active');
        if (friendsListContent) friendsListContent.style.display = 'block';
        renderFriendsList();
    } else if (tabName === 'requests') {
        const requestsTab = document.getElementById('requestsTab');
        const requestsListContent = document.getElementById('requestsListContent');
        if (requestsTab) requestsTab.classList.add('active');
        if (requestsListContent) requestsListContent.style.display = 'block';
        renderFriendRequests();
    } else if (tabName === 'addFriend') {
        const addFriendTab = document.getElementById('addFriendTab');
        const addFriendContent = document.getElementById('addFriendContent');
        if (addFriendTab) addFriendTab.classList.add('active');
        if (addFriendContent) addFriendContent.style.display = 'block';
    }
}

// Render friends list
function renderFriendsList() {
    const friendsList = document.getElementById('friendsList');
    if (!friendsList) return;
    
    const friendsData = friends.getFriends();
    
    if (friendsData.length === 0) {
        friendsList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No friends yet. Add friends to see their maps!</p>';
        return;
    }
    
    let html = '';
    friendsData.forEach(friend => {
        html += `
            <div class="friend-item">
                <div>
                    <strong>${friend.friendEmail || 'Unknown'}</strong>
                </div>
                <div style="display: flex; gap: 5px;">
                    <button class="view-profile-button" data-friend-id="${friend.friendId}" style="background-color: #007bff; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        View Profile
                    </button>
                    <button class="remove-friend-button" data-friend-id="${friend.friendId}" style="background-color: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });
    
    friendsList.innerHTML = html;
    
    // Add event listeners for view profile buttons
    friendsList.querySelectorAll('.view-profile-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const friendId = e.target.getAttribute('data-friend-id');
            if (friendId && window.showProfile) {
                // Close friends modal
                const friendsModal = document.getElementById('friendsModal');
                if (friendsModal) {
                    friendsModal.style.display = 'none';
                }
                // Show profile
                window.showProfile(friendId);
            }
        });
    });
    
    // Add event listeners for remove buttons
    friendsList.querySelectorAll('.remove-friend-button').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const friendId = e.target.getAttribute('data-friend-id');
            if (confirm(`Remove ${friendsData.find(f => f.friendId === friendId)?.friendEmail || 'this friend'}?`)) {
                try {
                    await friends.removeFriend(friendId);
                    await refreshFriendsData();
                    renderFriendsList();
                } catch (error) {
                    alert('Error removing friend: ' + error.message);
                }
            }
        });
    });
}

// Render friend requests
function renderFriendRequests() {
    const receivedRequestsList = document.getElementById('receivedRequestsList');
    const sentRequestsList = document.getElementById('sentRequestsList');
    const requestsBadge = document.getElementById('requestsBadge');
    
    const requestsData = friends.getFriendRequests();
    
    // Update badge
    if (requestsBadge) {
        const pendingCount = requestsData.received.length;
        if (pendingCount > 0) {
            requestsBadge.textContent = pendingCount;
            requestsBadge.style.display = 'inline';
        } else {
            requestsBadge.style.display = 'none';
        }
    }
    
    // Render received requests
    if (receivedRequestsList) {
        if (requestsData.received.length === 0) {
            receivedRequestsList.innerHTML = '<p style="text-align: center; color: #666; padding: 10px;">No pending requests</p>';
        } else {
            let html = '';
            requestsData.received.forEach(request => {
                html += `
                    <div class="friend-request-item">
                        <div>
                            <strong>${request.fromUserEmail || 'Unknown'}</strong>
                            <p style="margin: 5px 0; color: #666; font-size: 0.9em;">wants to be your friend</p>
                        </div>
                        <div style="display: flex; gap: 5px; align-items: center;">
                            <button class="view-profile-button" data-user-id="${request.fromUserId}" style="background-color: #007bff; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                                View Profile
                            </button>
                            <button class="accept-request-button" data-request-id="${request.id}" style="background-color: #28a745; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                                Accept
                            </button>
                            <button class="reject-request-button" data-request-id="${request.id}" style="background-color: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                                Reject
                            </button>
                        </div>
                    </div>
                `;
            });
            receivedRequestsList.innerHTML = html;
            
            // Add event listeners for view profile buttons
            receivedRequestsList.querySelectorAll('.view-profile-button').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const userId = e.target.getAttribute('data-user-id');
                    if (userId && window.showProfile) {
                        // Close friends modal
                        const friendsModal = document.getElementById('friendsModal');
                        if (friendsModal) {
                            friendsModal.style.display = 'none';
                        }
                        // Show profile
                        window.showProfile(userId);
                    }
                });
            });
            
            // Add event listeners
            receivedRequestsList.querySelectorAll('.accept-request-button').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const requestId = e.target.getAttribute('data-request-id');
                    try {
                        await friends.acceptFriendRequest(requestId);
                        await refreshFriendsData();
                        renderFriendRequests();
                        renderFriendsList();
                    } catch (error) {
                        alert('Error accepting request: ' + error.message);
                    }
                });
            });
            
            receivedRequestsList.querySelectorAll('.reject-request-button').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const requestId = e.target.getAttribute('data-request-id');
                    try {
                        await friends.rejectFriendRequest(requestId);
                        await refreshFriendsData();
                        renderFriendRequests();
                    } catch (error) {
                        alert('Error rejecting request: ' + error.message);
                    }
                });
            });
        }
    }
    
    // Render sent requests
    if (sentRequestsList) {
        if (requestsData.sent.length === 0) {
            sentRequestsList.innerHTML = '<p style="text-align: center; color: #666; padding: 10px;">No pending requests</p>';
        } else {
            let html = '';
            requestsData.sent.forEach(request => {
                html += `
                    <div class="friend-request-item">
                        <div>
                            <strong>${request.toUserEmail || 'Unknown'}</strong>
                            <p style="margin: 5px 0; color: #666; font-size: 0.9em;">Pending...</p>
                        </div>
                    </div>
                `;
            });
            sentRequestsList.innerHTML = html;
        }
    }
}

// Refresh friends data
async function refreshFriendsData() {
    try {
        await friends.loadFriends();
        await friends.loadFriendRequests();
    } catch (error) {
        console.error('Error refreshing friends data:', error);
    }
}

// Show/hide add friend error
function showAddFriendError(message, isError = true) {
    const addFriendError = document.getElementById('addFriendError');
    if (addFriendError) {
        if (message) {
            addFriendError.textContent = message;
            addFriendError.style.display = 'block';
            addFriendError.style.color = isError ? 'red' : 'green';
        } else {
            addFriendError.style.display = 'none';
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait a bit for friends.js to initialize
        setTimeout(initializeFriendsUI, 100);
    });
} else {
    setTimeout(initializeFriendsUI, 100);
}

// Also make it available globally
window.initializeFriendsUI = initializeFriendsUI;

