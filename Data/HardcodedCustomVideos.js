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
    'GeorgesThumbPowder': {
        videoUrl: 'https://www.youtube.com/shorts/xCVH4_6nltQ',
        startTime: 2,  // Start at 2 seconds
        position: [-106.1010843113806, 39.47321803379282],  // Icon location [lng, lat]
        category: 'powder'
    },
    'TopofBreck': {
        videoUrl: 'https://www.youtube.com/shorts/D_6zU5gyg2A',
        startTime: 0,  // Start at beginning
        position: [-106.11367848849203, 39.49857533815259],  // Icon location [lng, lat]
        category: 'misc'
    },
    'ImperialRidge1': {
        videoUrl: 'https://www.youtube.com/shorts/ZenvGsQIxys',
        startTime: 0,  // Start at beginning
        position: [-106.09944709649986, 39.47300949874284],  // Icon location [lng, lat]
        category: 'groomers'
    },
    'ImperialRidge2': {
        videoUrl: 'https://www.youtube.com/shorts/xthhA5CP2Aw',
        startTime: 0,  // Start at beginning
        position: [-106.09831313038715, 39.473020583727475],  // Icon location [lng, lat]
        category: 'groomers'
    },
    'DannyLiftFall': {
        videoUrl: 'https://www.youtube.com/shorts/_jp96gUqm68',
        startTime: 0,  // Start at beginning
        position: [-106.0941870692969, 39.481633888374006],  // Icon location [lng, lat]
        category: 'misc'
    },
    'DannyRoll': {
        videoUrl: 'https://www.youtube.com/shorts/VxQeI19LQgA',
        startTime: 0,  // Start at beginning
        position: [-106.08333843191703, 39.47082272381735],  // Icon location [lng, lat]
        category: 'misc'
    },
    'Peak10Bottom': {
        videos: [
            { 
                videoUrl: 'https://www.youtube.com/shorts/LdCbx4dMLy8', 
                startTime: 0
            },
            { 
                videoUrl: 'https://www.youtube.com/shorts/bO6Q1O_wdbU', 
                startTime: 0
            }
        ],
        startTime: 0,  // Start at beginning
        position: [-106.06303436603511, 39.45831381986932],  // Icon location [lng, lat]
        category: 'groomers'
    },
    'Peak10Top': {
        videoUrl: 'https://www.youtube.com/shorts/OZaU-DiYZ7k',
        startTime: 0,  // Start at beginning
        position: [-106.07210159302169, 39.45470621787055],  // Icon location [lng, lat]
        category: 'groomers'
    },
    'TailGrab': {
        videoUrl: 'https://www.youtube.com/shorts/cvX1mu310lo',
        startTime: 1,  // Start at beginning
        position: [-106.07377515724819, 39.45804957945916],  // Icon location [lng, lat]
        category: 'misc'
    },
    'KelseyGroomer2': {
        videoUrl: 'https://www.youtube.com/shorts/arFW4fxH0m0',
        startTime: 1,  // Start at beginning
        position: [-106.06643903377912, 39.4569369023059],  // Icon location [lng, lat]
        category: 'groomers'
    },
    'BreckTrees': {
        videoUrl: 'https://www.youtube.com/shorts/3R5aS-Pldrs',
        startTime: 0,  // Start at beginning
        position: [-106.07918154804833, 39.469912529791515],  // Icon location [lng, lat]
        category: 'misc'
    },
    'DannyPeak10Carving': {
        videoUrl: 'https://www.youtube.com/shorts/mhSIhlWMLDI',
        startTime: 0,  // Start at beginning
        position: [-106.06496860659657, 39.45658674431465],  // Icon location [lng, lat]
        category: 'groomers'
    },
    'BreckSundevil': {
        videoUrl: 'https://www.youtube.com/shorts/Q0GF179mkTw',
        startTime: 0,  // Start at beginning
        position: [-106.09440980367555, 39.47419374009203],  // Icon location [lng, lat]
        category: 'misc'
    },
    'BreckSundevi2': {
        videoUrl: 'https://www.youtube.com/shorts/kANXw82hlnI',
        startTime: 0,  // Start at beginning
        position: [-106.0917298626279, 39.47597914812465],  // Icon location [lng, lat]
        category: 'misc'
    },
    'BreckSundevi3': {
        videoUrl: 'https://www.youtube.com/shorts/xSJuDXA1a10',
        startTime: 0,  // Start at beginning
        position: [-106.09682763092587, 39.47272558123936],  // Icon location [lng, lat]
        category: 'misc'
    },
    'BreckMushroom': {
        videoUrl: 'https://www.youtube.com/shorts/tHgp2wjhVro',
        startTime: 0,  // Start at beginning
        position: [-106.0699415407209, 39.47570860874703],  // Icon location [lng, lat]
        category: 'park'
    },
    'BreckRainbowBox': {
        videoUrl: 'https://www.youtube.com/shorts/3bJhHNIeRo8',
        startTime: 0,  // Start at beginning
        position: [-106.06532809198565, 39.46628278603225],  // Icon location [lng, lat]
        category: 'park'
    },
    'BreckPeak7Pow': {
        videoUrl: 'https://www.youtube.com/shorts/PIbRsuqsALM',
        startTime: 0,  // Start at beginning
        position: [-106.10412580917298, 39.478257389815695],  // Icon location [lng, lat]
        category: 'powder'
    },
    'BreckImperialPow': {
        videoUrl: 'https://www.youtube.com/shorts/EWV4wvB1hOc',
        startTime: 0,  // Start at beginning
        position: [-106.09947711839389, 39.47153352396384],  // Icon location [lng, lat]
        category: 'powder'
    },
    'BreckHorseShowPow': {
        videoUrl: 'https://www.youtube.com/shorts/cXSA8i-qMvQ',
        startTime: 0,  // Start at beginning
        position: [-106.08711397889216, 39.471834110007904],  // Icon location [lng, lat]
        category: 'powder'
    },
    'BreckPeak9Pow': {
        videoUrl: 'https://www.youtube.com/shorts/GLNCIu_svug',
        startTime: 0,  // Start at beginning
        position: [-106.07446327774694, 39.46272361564121],  // Icon location [lng, lat]
        category: 'powder'
    },
    'Vailtop': {
        videoUrl: 'https://www.youtube.com/shorts/OuJptDOHDUk',
        startTime: 6,  // Start at beginning
        position: [-106.37685816430488, 39.59912747870251],  // Icon location [lng, lat]
        category: 'powder'
    },
    'KeystoneDumm1': {
        videoUrl: 'https://www.youtube.com/shorts/OuJptDOHDUk',
        startTime: 0,  // Start at beginning
        position: [-105.9404358815065, 39.587391576544604],  // Icon location [lng, lat]
        category: 'powder'
    },
    'KeystoneDumm2': {
        videoUrl: 'https://www.youtube.com/shorts/OuJptDOHDUk',
        startTime: 0,  // Start at beginning
        position: [-105.94056857870251, 39.56260280949664],  // Icon location [lng, lat]
        category: 'powder'
    },
    'KeystoneDumm3': {
        videoUrl: 'https://www.youtube.com/shorts/OuJptDOHDUk',
        startTime: 0,  // Start at beginning
        position: [-105.9178370178634, 39.5608821553333],  // Icon location [lng, lat]
        category: 'powder'
    },
    'KeystoneDumm4': {
        videoUrl: 'https://www.youtube.com/shorts/OuJptDOHDUk',
        startTime: 0,  // Start at beginning
        position: [-105.9436241265798, 39.56514750639076],  // Icon location [lng, lat]
        category: 'powder'
    },
    'ArapahoeBasinDummy1': {
        videoUrl: 'https://www.youtube.com/shorts/OuJptDOHDUk',
        startTime: 0,  // Start at beginning
        position: [-105.87144823672783, 39.63530891460738],  // Icon location [lng, lat]
        category: 'powder'
    },
    'ArapahoeBasinDummy2': {
        videoUrl: 'https://www.youtube.com/shorts/OuJptDOHDUk',
        startTime: 0,  // Start at beginning
        position: [-105.87873081024395, 39.62715899743617],  // Icon location [lng, lat]
        category: 'powder'
    },
    'ArapahoeBasinDummy3': {
        videoUrl: 'https://www.youtube.com/shorts/OuJptDOHDUk',
        startTime: 0,  // Start at beginning
        position: [-105.86779771890667, 39.625595257849454],  // Icon location [lng, lat]
        category: 'powder'
    },
    'BreckLakeChutesView': {
        videoUrl: 'https://www.youtube.com/shorts/VNK5FPFQMl8',
        startTime: 0,  // Start at beginning
        position: [-106.10372585692684, 39.47036298987189],  // Icon location [lng, lat]
        category: ['steeps', 'favorites']
    },
    'VailBackBowlsTest': {
        videoUrl: 'https://www.youtube.com/shorts/PHzW-iFlWSc',
        startTime: 0,  // Start at beginning
        position: [-106.33094786263236, 39.60139217404094],  // Icon location [lng, lat]
        category: 'powder'
    },
    'LiftPow': {
        videoUrl: 'https://www.youtube.com/shorts/L4iF14BC7C0',
        startTime: 0,  // Start at beginning
        position: [-106.08018284965486, 39.473983470830206],  // Icon location [lng, lat]
        category: 'powder'
    },
    'Tbar': {
        videoUrl: 'https://www.youtube.com/shorts/sdL0kk9HcPY',
        startTime: 0,  // Start at beginning
        position: [-106.09272584713847, 39.4746882276616],  // Icon location [lng, lat]
        category: 'lifts'   
    },
    'ImerpialChairViewOn': {
        videoUrl: 'https://www.youtube.com/shorts/oHk40BFT1tI',
        startTime: 0,  // Start at beginning
        position: [-106.097580168651, 39.47108489835898],  // Icon location [lng, lat]
        category: 'lifts'
    },
    'ImerpialChairViewTop': {
        videoUrl: 'https://www.youtube.com/shorts/K_6saHVJiG8',
        startTime: 0,  // Start at beginning
        position: [-106.10100178440926, 39.472823493879446],  // Icon location [lng, lat]
        category: 'lifts'
    },
    'ImerpialJump': {
        videoUrl: 'https://www.youtube.com/shorts/C-JPo6YN2TQ',
        startTime: 0,  // Start at beginning
        position: [-106.0952693567323, 39.47184776563998],  // Icon location [lng, lat]
        category: 'powder'
    },
    'BreckTroll': {
        videoUrl: 'https://www.youtube.com/shorts/ki8s06FAzUA',
        startTime: 0,  // Start at beginning
        position: [-106.03644202711202, 39.47144710625244],  // Icon location [lng, lat]
        category: 'misc'
    },
    'ZootChuteTop': {
        videoUrl: 'https://www.youtube.com/shorts/894vhPRpQQs',
        startTime: 0,  // Start at beginning
        position: [-106.10305248393972, 39.46797002312502],  // Icon location [lng, lat]
        category: 'steeps'
    }, 
    'ZootChuteInner': {
        videoUrl: 'https://www.youtube.com/shorts/J1QtwoRGp4g',
        startTime: 0,  // Start at beginning
        position: [-106.10272267055026, 39.46776469270719],  // Icon location [lng, lat]
        category: 'steeps'
    },
    'BankedSlalom': {
        videos: [
            { 
                videoUrl: 'https://www.youtube.com/shorts/4a4Wz-tTFKg', 
                startTime: 0
            },
            { 
                videoUrl: 'https://www.youtube.com/shorts/JxuiGzD4Ae0', 
                startTime: 0
            }
        ],
        position: [-106.07217977705547, 39.475559537346385],  // Icon location [lng, lat]
        category: 'park'
    },
    'DannyFall': {
        videoUrl: 'https://www.youtube.com/shorts/Gvn_uY5KJto',
        startTime: 0,  // Start at beginning
        position: [-106.09601601306262, 39.472735164691926],  // Icon location [lng, lat]
        category: 'misc'
    },
    // Add more videos here - just copy/paste and update!
    // Example:
    // 'MyVideoName': {
    //     videoUrl: 'https://www.youtube.com/shorts/VIDEO_ID',
    //     startTime: 0,
    //     position: [-106.xxx, 39.xxx]
    // },
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
