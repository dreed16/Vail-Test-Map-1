// Test file to verify Firebase Storage is accessible and can upload files
// This is a temporary test file - we'll remove it after testing

import { storage, auth } from './firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';

// Test function to verify Storage access
export function testStorageAccess() {
    try {
        console.log('Testing Firebase Storage access...');
        
        if (!storage) {
            console.error('❌ Storage is not initialized');
            return false;
        }
        
        // Create a test reference
        const testRef = ref(storage, 'test/test-file.txt');
        console.log('Storage reference created successfully');
        console.log('Storage object:', storage);
        console.log('Test reference:', testRef);
        
        console.log('✅ Firebase Storage is accessible!');
        console.log('You can now proceed to test uploading files.');
        return true;
    } catch (error) {
        console.error('❌ Error accessing Firebase Storage:', error);
        return false;
    }
}

// Test function to upload a file (manual test - call from console)
export async function testUploadFile(file) {
    try {
        console.log('Testing file upload...');
        
        if (!auth.currentUser) {
            console.error('❌ User must be logged in to upload files');
            return null;
        }
        
        if (!file) {
            console.error('❌ No file provided');
            return null;
        }
        
        const userId = auth.currentUser.uid;
        const fileName = `test-${Date.now()}-${file.name}`;
        const fileRef = ref(storage, `test/${userId}/${fileName}`);
        
        console.log('Uploading file:', file.name);
        console.log('File size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
        console.log('Upload path:', fileRef.fullPath);
        
        // Upload the file
        const snapshot = await uploadBytes(fileRef, file);
        console.log('✅ Upload successful!', snapshot);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('✅ Download URL:', downloadURL);
        
        return downloadURL;
    } catch (error) {
        console.error('❌ Error uploading file:', error);
        return null;
    }
}

// Auto-run test when module loads (for quick testing)
// This will run automatically when the page loads
window.addEventListener('DOMContentLoaded', () => {
    console.log('Running Firebase Storage test...');
    testStorageAccess();
    console.log('\n📝 To test file upload, open console and run:');
    console.log('   import("./JS/testStorage.js").then(m => {');
    console.log('     // Create a test file or select one');
    console.log('     const file = new File(["test content"], "test.txt", {type: "text/plain"});');
    console.log('     m.testUploadFile(file);');
    console.log('   });');
});

