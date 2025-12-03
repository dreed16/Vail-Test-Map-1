import { auth, db } from './firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Basic user authentication structure
class UserAuth {
    constructor() {
        this.currentUser = null;
        console.log('Initializing UserAuth...');
        
        // Check if Firebase Auth is available
        if (!auth) {
            console.error('Firebase Auth not initialized');
            return;
        }
        console.log('Firebase Auth is initialized');
        
        // Listen for auth state changes
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log('User is signed in:', user.email);
                this.currentUser = user;
                
                // Ensure user email is stored in Firestore (for friend requests)
                // Also check if username exists, if not, prompt user to set one
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    const userData = userDoc.exists() ? userDoc.data() : {};
                    
                    await setDoc(userDocRef, {
                        email: user.email.toLowerCase()
                    }, { merge: true });
                    
                    // If no username exists, we'll prompt later (after UI loads)
                    if (!userData.username) {
                        // Store flag to show username prompt
                        window.needsUsername = true;
                    }
                } catch (error) {
                    console.warn('Could not store user email:', error);
                }
                
                this.updateUIForLogin();
                // Load custom videos when user logs in (with error handling)
                try {
                    if (window.customVideos && window.customVideos.loadCustomVideos) {
                        await window.customVideos.loadCustomVideos();
                        // Update trail opacity if My Videos mode is on
                        if (window.updateTrailOpacity) {
                            window.updateTrailOpacity();
                        }
                    }
                } catch (error) {
                    console.warn('Could not load custom videos (module may not be loaded yet):', error);
                }
                
                // Load custom pictures when user logs in
                try {
                    if (window.customPictures && window.customPictures.loadCustomPictures) {
                        await window.customPictures.loadCustomPictures();
                    }
                } catch (error) {
                    console.warn('Could not load custom pictures (module may not be loaded yet):', error);
                }
                
                // Load friends and friend requests when user logs in
                try {
                    if (window.friends && window.friends.loadFriends) {
                        await window.friends.loadFriends();
                    }
                    if (window.friends && window.friends.loadFriendRequests) {
                        await window.friends.loadFriendRequests();
                    }
                } catch (error) {
                    console.warn('Could not load friends (module may not be loaded yet):', error);
                }
            } else {
                console.log('User is signed out');
                this.currentUser = null;
                this.updateUIForLogout();
                // Clear custom videos cache when user logs out (with error handling)
                try {
                    if (window.customVideos && window.customVideos.loadCustomVideos) {
                        await window.customVideos.loadCustomVideos(); // This will clear the cache
                    }
                    // Reset trail opacity
                    if (window.updateTrailOpacity) {
                        window.updateTrailOpacity();
                    }
                } catch (error) {
                    console.warn('Could not clear custom videos (module may not be loaded yet):', error);
                }
                
                // Clear custom pictures cache when user logs out
                try {
                    if (window.customPictures && window.customPictures.loadCustomPictures) {
                        await window.customPictures.loadCustomPictures(); // This will clear the cache
                    }
                } catch (error) {
                    console.warn('Could not clear custom pictures (module may not be loaded yet):', error);
                }
            }
        });
    }

    // Validate username format
    validateUsername(username) {
        if (!username || username.length < 3 || username.length > 20) {
            return { valid: false, error: 'Username must be 3-20 characters long' };
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return { valid: false, error: 'Username can only contain letters, numbers, and underscores' };
        }
        return { valid: true };
    }

    // Check if username is available
    async isUsernameAvailable(username) {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('username', '==', username.toLowerCase()));
            const querySnapshot = await getDocs(q);
            return querySnapshot.empty;
        } catch (error) {
            console.error('Error checking username availability:', error);
            return false;
        }
    }

    // Set username for current user
    async setUsername(username) {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('User must be logged in to set username');
        }
        
        const validation = this.validateUsername(username);
        if (!validation.valid) {
            throw new Error(validation.error);
        }
        
        const isAvailable = await this.isUsernameAvailable(username);
        if (!isAvailable) {
            throw new Error('Username is already taken');
        }
        
        try {
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                username: username.toLowerCase()
            }, { merge: true });
            
            // Update display
            const displayUsername = document.getElementById('displayUsername');
            if (displayUsername) {
                displayUsername.textContent = username;
            }
            
            return true;
        } catch (error) {
            console.error('Error setting username:', error);
            throw error;
        }
    }

    async createAccount(email, password, username = null) {
        console.log('Starting account creation process...');
        
        // Store user email in Firestore for friend requests
        const storeUserEmail = async (userId, userEmail) => {
            try {
                const userDocRef = doc(db, 'users', userId);
                await setDoc(userDocRef, {
                    email: userEmail.toLowerCase(),
                    createdAt: new Date().toISOString()
                }, { merge: true });
            } catch (error) {
                console.warn('Could not store user email:', error);
            }
        };
        
        // Validate inputs
        if (!email || !password) {
            console.error('Email and password are required');
            throw new Error('Email and password are required');
        }

        // Validate Firebase initialization
        if (!auth) {
            console.error('Firebase Auth is not initialized!');
            throw new Error('Firebase Auth not initialized');
        }
        if (!db) {
            console.error('Firestore is not initialized!');
            throw new Error('Firestore not initialized');
        }
        
        try {
            console.log('Attempting to create account with email:', email);
            
            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User credential received:', userCredential);
            
            const user = userCredential.user;
            console.log('User created successfully:', user.uid);

            // Create user document in Firestore
            try {
                const userData = {
                    email: email.toLowerCase(),
                    createdAt: new Date().toISOString()
                };
                
                // Add username if provided and valid
                if (username) {
                    const validation = this.validateUsername(username);
                    if (validation.valid) {
                        const isAvailable = await this.isUsernameAvailable(username);
                        if (isAvailable) {
                            userData.username = username.toLowerCase();
                        } else {
                            console.warn('Username not available, creating account without username');
                        }
                    } else {
                        console.warn('Invalid username format, creating account without username');
                    }
                }
                
                await setDoc(doc(db, "users", user.uid), userData);
                console.log('User document created in Firestore');
            } catch (firestoreError) {
                console.error('Error creating user document:', firestoreError);
                // Continue even if Firestore fails - user is still authenticated
            }

            return user;
        } catch (error) {
            console.error('Error in createAccount:', error.code, error.message);
            throw error;
        }
    }

    async updateUIForLogin() {
        const loginForm = document.getElementById('loginForm');
        const userInfo = document.getElementById('userInfo');
        const displayUsername = document.getElementById('displayUsername');
        const loginToggleButton = document.getElementById('loginToggleButton');
        const myVideosButton = document.getElementById('myVideosButton');
        const myPicturesButton = document.getElementById('myPicturesButton');
        const trackingButton = document.getElementById('trackingButton');
        const uploadVideoButton = document.getElementById('uploadVideoButton');
        const uploadPictureButton = document.getElementById('uploadPictureButton');
        const friendsButton = document.getElementById('friendsButton');
        
        if (this.currentUser) {
            loginForm.style.display = 'none';
            userInfo.style.display = 'block';
            
            // Get username from Firestore, fallback to email
            try {
                const userDocRef = doc(db, 'users', this.currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    displayUsername.textContent = userData.username || this.currentUser.email;
                } else {
                    displayUsername.textContent = this.currentUser.email;
                }
            } catch (error) {
                console.warn('Could not load username:', error);
                displayUsername.textContent = this.currentUser.email;
            }
            if (loginToggleButton) {
                loginToggleButton.textContent = 'Account';
            }
            // Show My Videos, My Pictures, Upload Video, Upload Picture, and Tracking buttons when logged in
            if (myVideosButton) {
                myVideosButton.style.display = 'block';
            }
            if (myPicturesButton) {
                myPicturesButton.style.display = 'block';
            }
            if (uploadVideoButton) {
                uploadVideoButton.style.display = 'block';
            }
            if (uploadPictureButton) {
                uploadPictureButton.style.display = 'block';
            }
            if (friendsButton) {
                friendsButton.style.display = 'block';
            }
            if (trackingButton) {
                trackingButton.style.display = 'block';
            }
        }
    }

    updateUIForLogout() {
        const loginForm = document.getElementById('loginForm');
        const userInfo = document.getElementById('userInfo');
        const loginToggleButton = document.getElementById('loginToggleButton');
        const myVideosButton = document.getElementById('myVideosButton');
        const myPicturesButton = document.getElementById('myPicturesButton');
        const trackingButton = document.getElementById('trackingButton');
        const trackingOptions = document.getElementById('trackingOptions');
        
        loginForm.style.display = 'block';
        userInfo.style.display = 'none';
        if (loginToggleButton) {
            loginToggleButton.textContent = 'Login';
        }
        // Hide My Videos, My Pictures, and Tracking buttons when logged out
        if (myVideosButton) {
            myVideosButton.style.display = 'none';
            myVideosButton.classList.remove('active');
            myVideosButton.textContent = 'My Videos';
        }
        if (myPicturesButton) {
            myPicturesButton.style.display = 'none';
            myPicturesButton.classList.remove('active');
            myPicturesButton.textContent = 'My Pictures';
        }
        const uploadVideoButton = document.getElementById('uploadVideoButton');
        if (uploadVideoButton) {
            uploadVideoButton.style.display = 'none';
        }
        // Hide video category dropdown when logged out
        const videoCategoryDropdown = document.getElementById('videoCategoryDropdown');
        if (videoCategoryDropdown) {
            videoCategoryDropdown.style.display = 'none';
        }
        if (trackingButton) {
            trackingButton.style.display = 'none';
        }
        if (trackingOptions) {
            trackingOptions.style.display = 'none';
        }
    }

    async login(emailOrUsername, password) {
        try {
            let email = emailOrUsername;
            
            // Check if input is a username (no @ symbol) or email
            if (!emailOrUsername.includes('@')) {
                // It's a username - look up the email
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('username', '==', emailOrUsername.toLowerCase()));
                const querySnapshot = await getDocs(q);
                
                if (querySnapshot.empty) {
                    throw new Error('Invalid username or password');
                }
                
                const userDoc = querySnapshot.docs[0];
                email = userDoc.data().email;
            }
            
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async logout() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
}

// Create an instance of UserAuth
const userAuth = new UserAuth();

// Make userAuth available globally
window.userAuth = userAuth;

// Add event listeners when the document loads
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, setting up auth listeners');
    const createAccountModal = document.getElementById('createAccountModal');
    const createAccountBtn = document.getElementById('createAccount');
    
    if (!createAccountBtn) {
        console.error('Create Account button not found');
        return;
    }

    // Show create account modal
    createAccountBtn.addEventListener('click', () => {
        console.log('Create Account button clicked');
        createAccountModal.style.display = 'block';
    });

    // Handle create account confirmation
    document.getElementById('createAccountConfirm').addEventListener('click', async () => {
        console.log('Attempting to create account');
        const email = document.getElementById('newEmail').value;
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const username = document.getElementById('newUsername') ? document.getElementById('newUsername').value : null;
        
        if (!email || !password || !confirmPassword) {
            alert('Please fill in all required fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Validate username if provided
        if (username) {
            const validation = userAuth.validateUsername(username);
            if (!validation.valid) {
                alert(validation.error);
                return;
            }
            const isAvailable = await userAuth.isUsernameAvailable(username);
            if (!isAvailable) {
                alert('Username is already taken');
                return;
            }
        }

        try {
            await userAuth.createAccount(email, password, username);
            alert('Account created successfully! You can now login.');
            createAccountModal.style.display = 'none';
            
            // Clear the form
            document.getElementById('newEmail').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            if (document.getElementById('newUsername')) {
                document.getElementById('newUsername').value = '';
            }
        } catch (error) {
            console.error('Error creating account:', error);
            if (error.code === 'auth/email-already-in-use') {
                alert('An account with this email already exists');
            } else if (error.code === 'auth/weak-password') {
                alert('Password should be at least 6 characters');
            } else {
                alert('Error creating account: ' + error.message);
            }
        }
    });

    // Handle create account cancellation
    document.getElementById('createAccountCancel').addEventListener('click', () => {
        createAccountModal.style.display = 'none';
        // Clear the form
        document.getElementById('newEmail').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === createAccountModal) {
            createAccountModal.style.display = 'none';
            // Clear the form
            document.getElementById('newEmail').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            if (document.getElementById('newUsername')) {
                document.getElementById('newUsername').value = '';
            }
        }
    });

    // Updated login button listener
    document.getElementById('loginButton').addEventListener('click', async () => {
        const emailOrUsername = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            await userAuth.login(emailOrUsername, password);
            // UI will be updated by the auth state observer
        } catch (error) {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.message === 'Invalid username or password') {
                alert('Invalid email/username or password');
            } else {
                alert('Error logging in: ' + error.message);
            }
        }
    });

    // Add toggle button listener
    const loginToggleButton = document.getElementById('loginToggleButton');
    const loginContainer = document.getElementById('loginContainer');
    
    // Initialize button text based on current login state
    if (userAuth.currentUser) {
        loginToggleButton.textContent = 'Account';
    } else {
        loginToggleButton.textContent = 'Login';
    }
    
    loginToggleButton.addEventListener('click', function() {
        if (loginContainer.style.display === 'none' || loginContainer.style.display === '') {
            loginContainer.style.display = 'block';
            loginToggleButton.style.display = 'none';
        } else {
            loginContainer.style.display = 'none';
            loginToggleButton.style.display = 'block';
        }
    });
    
    // Update toggle button text based on login state
    function updateToggleButtonText() {
        if (userAuth.currentUser) {
            loginToggleButton.textContent = 'Account';
        } else {
            loginToggleButton.textContent = 'Login';
        }
    }
    
    // Update button text when login state changes
    // Check if we already wrapped this function
    if (!userAuth._updateUIForLoginWrappedForToggle) {
        const originalUpdateUIForLoginToggle = userAuth.updateUIForLogin.bind(userAuth);
        userAuth.updateUIForLogin = async function() {
            await originalUpdateUIForLoginToggle();
            updateToggleButtonText();
        };
        userAuth._updateUIForLoginWrappedForToggle = true;
    }
    
    const originalUpdateUIForLogout = userAuth.updateUIForLogout.bind(userAuth);
    userAuth.updateUIForLogout = function() {
        originalUpdateUIForLogout();
        updateToggleButtonText();
    };
    
    // Close login container when clicking outside
    document.addEventListener('click', function(event) {
        if (loginContainer.style.display === 'block' && 
            !loginContainer.contains(event.target) && 
            !loginToggleButton.contains(event.target)) {
            loginContainer.style.display = 'none';
            loginToggleButton.style.display = 'block';
        }
    });
    
    // Add logout button listener
    document.getElementById('logoutButton').addEventListener('click', async () => {
        try {
            await userAuth.logout();
            // UI will be updated by the auth state observer
        } catch (error) {
            alert('Error logging out: ' + error.message);
        }
    });
    
    // Add view my profile button listener
    // Use a function that checks for the button and sets up listener
    function setupViewProfileButton() {
        const viewMyProfileButton = document.getElementById('viewMyProfileButton');
        if (viewMyProfileButton) {
            // Remove any existing listeners by cloning
            const newButton = viewMyProfileButton.cloneNode(true);
            viewMyProfileButton.parentNode.replaceChild(newButton, viewMyProfileButton);
            
            newButton.addEventListener('click', () => {
                const user = auth.currentUser;
                if (user) {
                    console.log('View My Profile clicked, user:', user.uid);
                    if (window.showProfile) {
                        window.showProfile(user.uid);
                    } else {
                        console.error('showProfile function not available');
                        // Try again after a short delay
                        setTimeout(() => {
                            if (window.showProfile) {
                                window.showProfile(user.uid);
                            } else {
                                alert('Profile page is still loading. Please try again in a moment.');
                            }
                        }, 1000);
                    }
                } else {
                    alert('Please log in to view your profile.');
                }
            });
        }
    }
    
    // Set up immediately
    setupViewProfileButton();
    
    // Also set up when UI updates for login (button might be recreated)
    // Check if we already wrapped this function
    if (!userAuth._updateUIForLoginWrapped) {
        const originalUpdateUIForLogin = userAuth.updateUIForLogin.bind(userAuth);
        userAuth.updateUIForLogin = async function() {
            await originalUpdateUIForLogin();
            // Wait a bit for DOM to update
            setTimeout(setupViewProfileButton, 100);
        };
        userAuth._updateUIForLoginWrapped = true;
    }
    
    // Handle username setup modal for existing users
    const setUsernameModal = document.getElementById('setUsernameModal');
    const usernameInput = document.getElementById('usernameInput');
    const usernameError = document.getElementById('usernameError');
    const setUsernameConfirm = document.getElementById('setUsernameConfirm');
    const skipUsernameButton = document.getElementById('skipUsernameButton');
    
    // Show username modal if user doesn't have a username
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // Wait a bit for UI to load
            setTimeout(async () => {
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        if (!userData.username && setUsernameModal && setUsernameModal.style.display === 'none') {
                            setUsernameModal.style.display = 'block';
                        }
                    }
                } catch (error) {
                    console.warn('Could not check username:', error);
                }
            }, 1000);
        }
    });
    
    if (setUsernameConfirm) {
        setUsernameConfirm.addEventListener('click', async () => {
            const username = usernameInput.value.trim();
            if (!username) {
                usernameError.textContent = 'Please enter a username';
                usernameError.style.display = 'block';
                return;
            }
            
            try {
                await userAuth.setUsername(username);
                setUsernameModal.style.display = 'none';
                usernameInput.value = '';
                usernameError.style.display = 'none';
                alert('Username set successfully!');
            } catch (error) {
                usernameError.textContent = error.message;
                usernameError.style.display = 'block';
            }
        });
    }
    
    if (skipUsernameButton) {
        skipUsernameButton.addEventListener('click', () => {
            setUsernameModal.style.display = 'none';
            usernameInput.value = '';
            usernameError.style.display = 'none';
        });
    }
});
