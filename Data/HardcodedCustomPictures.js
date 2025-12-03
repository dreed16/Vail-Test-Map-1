// Hardcoded Custom Pictures Data
// This file contains hardcoded custom picture data for testing (bypasses Firebase)
// All picture data in one place - just add entries here!
//
// SINGLE PICTURE FORMAT:
// 'PictureName': {
//     imageUrl: 'https://drive.google.com/uc?export=view&id=IMAGE_ID',
//     position: [-106.xxx, 39.xxx],  // Icon location [lng, lat]
//     category: ['powder', 'favorites']  // Categories: 'powder', 'park', 'groomers', 'steeps', 'lifts', 'misc', 'favorites'
// },
//
// MULTIPLE PICTURES FORMAT (for one icon):
// 'PictureName': {
//     images: [
//         { imageUrl: 'https://drive.google.com/uc?export=view&id=IMAGE_ID1' },
//         { imageUrl: 'https://drive.google.com/uc?export=view&id=IMAGE_ID2' }
//     ],
//     position: [-106.xxx, 39.xxx],  // Icon location [lng, lat]
//     category: ['powder']  // Categories: 'powder', 'park', 'groomers', 'steeps', 'lifts', 'misc', 'favorites'
// },

const hardcodedCustomPicturesData = {
    // All hardcoded pictures removed - using only user-uploaded pictures now
};

// Extract arrays/objects for backward compatibility (auto-generated from hardcodedCustomPicturesData)
const picturesWithImagesHardcoded = Object.keys(hardcodedCustomPicturesData);
const hardcodedCustomPictures = {};
const hardcodedPicturePositions = {};

Object.keys(hardcodedCustomPicturesData).forEach(pictureId => {
    const data = hardcodedCustomPicturesData[pictureId];
    
    // Support both single picture (backward compatible) and multiple pictures format
    if (data.images && Array.isArray(data.images)) {
        // Multiple pictures format - use first picture for backward compatibility
        hardcodedCustomPictures[pictureId] = {
            images: data.images,
            imageUrl: data.images[0]?.imageUrl // For backward compatibility
        };
    } else {
        // Single picture format (backward compatible)
        hardcodedCustomPictures[pictureId] = {
            imageUrl: data.imageUrl
        };
    }
    
    hardcodedPicturePositions[pictureId] = data.position;
});

