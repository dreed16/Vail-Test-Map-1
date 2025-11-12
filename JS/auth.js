import { auth, db } from './firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

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
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('User is signed in:', user.email);
                this.currentUser = user;
                this.updateUIForLogin();
            } else {
                console.log('User is signed out');
                this.currentUser = null;
                this.updateUIForLogout();
            }
        });
    }

    async createAccount(email, password) {
        console.log('Starting account creation process...');
        
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
                await setDoc(doc(db, "users", user.uid), {
                    email: email,
                    createdAt: new Date().toISOString()
                });
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

    updateUIForLogin() {
        const loginForm = document.getElementById('loginForm');
        const userInfo = document.getElementById('userInfo');
        const displayUsername = document.getElementById('displayUsername');
        const loginToggleButton = document.getElementById('loginToggleButton');
        
        if (this.currentUser) {
            loginForm.style.display = 'none';
            userInfo.style.display = 'block';
            displayUsername.textContent = this.currentUser.email;
            if (loginToggleButton) {
                loginToggleButton.textContent = 'Account';
            }
        }
    }

    updateUIForLogout() {
        const loginForm = document.getElementById('loginForm');
        const userInfo = document.getElementById('userInfo');
        const loginToggleButton = document.getElementById('loginToggleButton');
        
        loginForm.style.display = 'block';
        userInfo.style.display = 'none';
        if (loginToggleButton) {
            loginToggleButton.textContent = 'Login';
        }
    }

    async login(email, password) {
        try {
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
        
        if (!email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await userAuth.createAccount(email, password);
            alert('Account created successfully! You can now login.');
            createAccountModal.style.display = 'none';
            
            // Clear the form
            document.getElementById('newEmail').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
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
        }
    });

    // Updated login button listener
    document.getElementById('loginButton').addEventListener('click', async () => {
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            await userAuth.login(email, password);
            // UI will be updated by the auth state observer
        } catch (error) {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                alert('Invalid email or password');
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
    const originalUpdateUIForLogin = userAuth.updateUIForLogin.bind(userAuth);
    userAuth.updateUIForLogin = function() {
        originalUpdateUIForLogin();
        updateToggleButtonText();
    };
    
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
});
