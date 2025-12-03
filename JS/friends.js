// Friends Module - Handles friend requests and friendships
import { db, auth } from './firebaseConfig.js';
import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    query, 
    where, 
    updateDoc,
    deleteDoc,
    Timestamp
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Cache for friends and friend requests
let friendsCache = [];
let friendRequestsCache = {
    sent: [],
    received: []
};

// Send a friend request
export async function sendFriendRequest(targetEmailOrUsername) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to send friend requests');
    }
    
    if (!targetEmailOrUsername) {
        throw new Error('Please enter an email address or username');
    }
    
    try {
        // Find user by email or username
        const usersRef = collection(db, 'users');
        let q;
        
        // Check if input is an email (contains @) or username
        if (targetEmailOrUsername.includes('@')) {
            q = query(usersRef, where('email', '==', targetEmailOrUsername.toLowerCase()));
        } else {
            q = query(usersRef, where('username', '==', targetEmailOrUsername.toLowerCase()));
        }
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            throw new Error('User not found. Make sure they have created an account.');
        }
        
        const targetUserDoc = querySnapshot.docs[0];
        const targetUserId = targetUserDoc.id;
        const targetUserData = targetUserDoc.data();
        
        // Don't allow sending request to yourself
        if (targetUserId === user.uid) {
            throw new Error('You cannot send a friend request to yourself');
        }
        
        // Check if already friends
        const friendDoc = await getDoc(doc(db, 'users', user.uid, 'friends', targetUserId));
        if (friendDoc.exists()) {
            throw new Error('You are already friends with this user');
        }
        
        // Check if request already exists
        const existingRequestQuery = query(
            collection(db, 'friendRequests'),
            where('fromUserId', '==', user.uid),
            where('toUserId', '==', targetUserId),
            where('status', '==', 'pending')
        );
        const existingRequests = await getDocs(existingRequestQuery);
        
        if (!existingRequests.empty) {
            throw new Error('Friend request already sent');
        }
        
        // Check for reverse request (they sent to you)
        const reverseRequestQuery = query(
            collection(db, 'friendRequests'),
            where('fromUserId', '==', targetUserId),
            where('toUserId', '==', user.uid),
            where('status', '==', 'pending')
        );
        const reverseRequests = await getDocs(reverseRequestQuery);
        
        if (!reverseRequests.empty) {
            throw new Error('This user has already sent you a friend request. Check your inbox!');
        }
        
        // Create friend request
        const requestId = `${user.uid}_${targetUserId}_${Date.now()}`;
        const requestRef = doc(db, 'friendRequests', requestId);
        
        await setDoc(requestRef, {
            fromUserId: user.uid,
            fromUserEmail: user.email,
            toUserId: targetUserId,
            toUserEmail: targetUserData.email,
            status: 'pending',
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });
        
        console.log('Friend request sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending friend request:', error);
        throw error;
    }
}

// Accept a friend request
export async function acceptFriendRequest(requestId) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to accept friend requests');
    }
    
    try {
        // Get the request
        const requestRef = doc(db, 'friendRequests', requestId);
        const requestDoc = await getDoc(requestRef);
        
        if (!requestDoc.exists()) {
            throw new Error('Friend request not found');
        }
        
        const requestData = requestDoc.data();
        
        // Verify this request is for the current user
        if (requestData.toUserId !== user.uid) {
            throw new Error('You cannot accept this friend request');
        }
        
        if (requestData.status !== 'pending') {
            throw new Error('This friend request has already been processed');
        }
        
        // Update request status
        await updateDoc(requestRef, {
            status: 'accepted',
            updatedAt: Timestamp.now()
        });
        
        // Create friendship in both directions
        const fromUserId = requestData.fromUserId;
        const toUserId = requestData.toUserId;
        
        // Add friend to current user's friends list
        await setDoc(doc(db, 'users', toUserId, 'friends', fromUserId), {
            friendId: fromUserId,
            friendEmail: requestData.fromUserEmail,
            addedAt: Timestamp.now()
        });
        
        // Add current user to requester's friends list
        await setDoc(doc(db, 'users', fromUserId, 'friends', toUserId), {
            friendId: toUserId,
            friendEmail: requestData.toUserEmail,
            addedAt: Timestamp.now()
        });
        
        // Update cache
        await loadFriends();
        await loadFriendRequests();
        
        console.log('Friend request accepted successfully');
        return true;
    } catch (error) {
        console.error('Error accepting friend request:', error);
        throw error;
    }
}

// Reject a friend request
export async function rejectFriendRequest(requestId) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to reject friend requests');
    }
    
    try {
        const requestRef = doc(db, 'friendRequests', requestId);
        const requestDoc = await getDoc(requestRef);
        
        if (!requestDoc.exists()) {
            throw new Error('Friend request not found');
        }
        
        const requestData = requestDoc.data();
        
        if (requestData.toUserId !== user.uid) {
            throw new Error('You cannot reject this friend request');
        }
        
        // Update status to rejected
        await updateDoc(requestRef, {
            status: 'rejected',
            updatedAt: Timestamp.now()
        });
        
        // Update cache
        await loadFriendRequests();
        
        console.log('Friend request rejected');
        return true;
    } catch (error) {
        console.error('Error rejecting friend request:', error);
        throw error;
    }
}

// Load friend requests (sent and received)
export async function loadFriendRequests() {
    const user = auth.currentUser;
    if (!user) {
        friendRequestsCache = { sent: [], received: [] };
        return friendRequestsCache;
    }
    
    try {
        // Get sent requests
        const sentQuery = query(
            collection(db, 'friendRequests'),
            where('fromUserId', '==', user.uid),
            where('status', '==', 'pending')
        );
        const sentSnapshot = await getDocs(sentQuery);
        const sentRequests = [];
        sentSnapshot.forEach(doc => {
            sentRequests.push({ id: doc.id, ...doc.data() });
        });
        
        // Get received requests
        const receivedQuery = query(
            collection(db, 'friendRequests'),
            where('toUserId', '==', user.uid),
            where('status', '==', 'pending')
        );
        const receivedSnapshot = await getDocs(receivedQuery);
        const receivedRequests = [];
        receivedSnapshot.forEach(doc => {
            receivedRequests.push({ id: doc.id, ...doc.data() });
        });
        
        friendRequestsCache = {
            sent: sentRequests,
            received: receivedRequests
        };
        
        console.log('Loaded friend requests:', friendRequestsCache);
        return friendRequestsCache;
    } catch (error) {
        console.error('Error loading friend requests:', error);
        friendRequestsCache = { sent: [], received: [] };
        return friendRequestsCache;
    }
}

// Load friends list
export async function loadFriends() {
    const user = auth.currentUser;
    if (!user) {
        friendsCache = [];
        return [];
    }
    
    try {
        const friendsRef = collection(db, 'users', user.uid, 'friends');
        const snapshot = await getDocs(friendsRef);
        
        friendsCache = [];
        snapshot.forEach(doc => {
            friendsCache.push({ id: doc.id, ...doc.data() });
        });
        
        console.log('Loaded friends:', friendsCache);
        return friendsCache;
    } catch (error) {
        console.error('Error loading friends:', error);
        friendsCache = [];
        return [];
    }
}

// Get friends list (from cache)
export function getFriends() {
    return friendsCache;
}

// Get friend requests (from cache)
export function getFriendRequests() {
    return friendRequestsCache;
}

// Remove a friend
export async function removeFriend(friendId) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User must be logged in to remove friends');
    }
    
    try {
        // Remove from current user's friends list
        await deleteDoc(doc(db, 'users', user.uid, 'friends', friendId));
        
        // Remove current user from friend's friends list
        await deleteDoc(doc(db, 'users', friendId, 'friends', user.uid));
        
        // Update cache
        await loadFriends();
        
        console.log('Friend removed successfully');
        return true;
    } catch (error) {
        console.error('Error removing friend:', error);
        throw error;
    }
}

// Make functions available globally
window.friends = {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    loadFriendRequests,
    loadFriends,
    getFriends,
    getFriendRequests,
    removeFriend
};

