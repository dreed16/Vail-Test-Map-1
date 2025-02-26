// Basic user authentication structure
class UserAuth {
    constructor() {
        this.currentUser = null;
        // Check if user is already logged in
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUIForLogin();
        }
    }

    // For development/testing
    createTestAccount(username, password) {
        // Store in localStorage for now (will be replaced with proper database later)
        const testUser = {
            username: username,
            password: password,  // Note: In production we'll use proper encryption
            created: new Date(),
            stats: {
                runsTracked: 0,
                verticalFeet: 0,
                favoriteDifficulty: null
            }
        };
        
        localStorage.setItem('testUser', JSON.stringify(testUser));
        this.currentUser = testUser;
        return testUser;
    }

    updateUIForLogin() {
        const loginForm = document.getElementById('loginForm');
        const userInfo = document.getElementById('userInfo');
        const displayUsername = document.getElementById('displayUsername');
        
        if (this.currentUser) {
            loginForm.style.display = 'none';
            userInfo.style.display = 'block';
            displayUsername.textContent = this.currentUser.username;
        }
    }

    updateUIForLogout() {
        const loginForm = document.getElementById('loginForm');
        const userInfo = document.getElementById('userInfo');
        
        loginForm.style.display = 'block';
        userInfo.style.display = 'none';
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    login(username, password) {
        const user = JSON.parse(localStorage.getItem('testUser'));
        if (user && user.username === username && user.password === password) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.updateUIForLogin();
            return true;
        }
        return false;
    }
}

// Create an instance of UserAuth
const userAuth = new UserAuth();

// Add event listeners when the document loads
document.addEventListener('DOMContentLoaded', () => {
    // Create Account handler
    document.getElementById('createAccount').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            const user = userAuth.createTestAccount(username, password);
            alert('Account created! You can now login.');
            console.log('Account created:', user);
        } else {
            alert('Please enter both username and password');
        }
    });

    // Updated login button listener
    document.getElementById('loginButton').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (userAuth.login(username, password)) {
            console.log('Logged in as:', userAuth.currentUser);
        } else {
            alert('Invalid username or password');
        }
    });

    // Add logout button listener
    document.getElementById('logoutButton').addEventListener('click', () => {
        userAuth.updateUIForLogout();
        alert('Logged out successfully');
    });
});
