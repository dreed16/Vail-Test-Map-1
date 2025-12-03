// Hardcoded Custom Videos Data
// This file contains hardcoded custom video data for testing (bypasses Firebase)
// All video data in one place - just add entries here!
//
// SINGLE VIDEO FORMAT:
// 'VideoName': {
//     videoUrl: 'https://www.youtube.com/shorts/VIDEO_ID',
//     startTime: 0,  // Start time in seconds
//     position: [-106.xxx, 39.xxx],  // Icon location [lng, lat]
//     category: 'powder'  // Category: 'powder', 'park', 'groomers', 'steeps', 'lifts', 'misc'
// },
//
// MULTIPLE VIDEOS FORMAT (for one icon):
// 'VideoName': {
//     videos: [
//         { videoUrl: 'https://www.youtube.com/shorts/VIDEO_ID1', startTime: 0 },
//         { videoUrl: 'https://www.youtube.com/shorts/VIDEO_ID2', startTime: 0 }
//     ],
//     position: [-106.xxx, 39.xxx],  // Icon location [lng, lat]
//     category: 'powder'  // Category: 'powder', 'park', 'groomers', 'steeps', 'lifts', 'misc'
// },

const hardcodedCustomVideosData = {
    // All hardcoded videos have been removed
    // Firebase-uploaded videos are stored separately and will still appear
    // Add new hardcoded videos here if needed for testing
};

// Extract arrays/objects for backward compatibility (auto-generated from hardcodedCustomVideosData)
const trailsWithVideosHardcoded = Object.keys(hardcodedCustomVideosData);
const hardcodedCustomVideos = {};
const hardcodedIconPositions = {};

Object.keys(hardcodedCustomVideosData).forEach(trailId => {
    const data = hardcodedCustomVideosData[trailId];
    
    // Support both single video (backward compatible) and multiple videos format
    if (data.videos && Array.isArray(data.videos)) {
        // Multiple videos format - use first video for backward compatibility
        hardcodedCustomVideos[trailId] = {
            videos: data.videos,
            videoUrl: data.videos[0]?.videoUrl, // For backward compatibility
            startTime: data.videos[0]?.startTime || 0
        };
    } else {
        // Single video format (backward compatible)
        hardcodedCustomVideos[trailId] = {
            videoUrl: data.videoUrl,
            startTime: data.startTime || 0
        };
    }
    
    hardcodedIconPositions[trailId] = data.position;
});
