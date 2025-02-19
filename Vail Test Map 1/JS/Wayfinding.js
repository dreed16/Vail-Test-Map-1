// Navigation point data
var navigationPoints = {
    "HighNoonTop": {
        name: "Top of High Noon Express",
        coordinates: [-106.35612823167436, 39.60426118330605],
        marker: "🔵"
    },
    "SunUpBottom": {
        name: "Bottom of Sun Up Express",
        coordinates: [-106.34850290417495, 39.59721081422188],
        marker: "🔵"
    },
    "SunUpTop": {
        name: "Top of Sun Up Express",
        coordinates: [-106.33653799931282, 39.60203751975274],
        marker: "🔵"
    },
    "OrientExpressBottom": {
        name: "Bottom of Orient Express",
        coordinates: [-106.33215374536216, 39.58595261897972],
        marker: "🔵"
    },
    "SkylineExpressTop": {
        name: "Top of Skyline Express",
        coordinates: [-106.32886495418725, 39.56374129044079],
        marker: "🔵"
    },
    "SkylineExpressBottom": {
        name: "Bottom of Skyline Express",
        coordinates: [-106.34068977962873, 39.58411808744441],
        marker: "🔵"
    },
    "OrientExpressTop": {
        name: "Top of Orient Express",
        coordinates: [-106.3219955176766, 39.605131093015274],
        marker: "🔵"
    },
    "PetesExpressTop": {
        name: "Top of Pete's Express",
        coordinates: [-106.30807029045621, 39.57306194205927],
        marker: "🔵"
    },
    "PetesExpressBottom": {
        name: "Bottom of Pete's Express",
        coordinates: [-106.32854173371445, 39.58099707319917],
        marker: "🔵"
    },
    "TeaCupBottom": {
        name: "Bottom of Tea Cup Express",
        coordinates: [-106.34008654524948, 39.58448160226101],
        marker: "🔵"
    }
};

// Define all possible routes between points
var routeDefinitions = {
    "HighNoonTop-SunUpBottom": {
        routeNumber: 1,
        name: "High Noon to Sun Up Bottom",
        trails: ["TheSlot", "MiltsFace", "Campbells", "Headwall", "YonderGully", "Yonder", "OverYonder", "SleepyTimeRoad", "SleepyTimeRoadRightFork"],
        lifts: []
    },
    "HighNoonTop-SunUpTop": {
        routeNumber: 2,
        name: "High Noon to Sun Up Top",
        trails: [],  // Add trail IDs
        lifts: []    // Add lift IDs
    },
    "HighNoonTop-TeaCupBottom": {
        routeNumber: 3,
        name: "High Noon to Tea Cup Bottom",
        trails: ["TheSlot", "Poppyfields", "Chinabowlrunout", "DragonsTeeth", "JadeGlade", "GenghisKhan", "Sweetnsour", "MiltsFace", "Campbells", "TeaCupGlades", "Headwall", "YonderGully", "Yonder", "OverYonder", "RedZinger", "SleepyTimeRoadLeftFork","SleepyTimeRoadRightFork","EmperorsChoice", "MorningThunder", "SleepyTimeRoad", "MarmotValley"],
        lifts: ["SunUpExpress"]
    },
    "SunUpBottom-SunUpTop": {
        routeNumber: 4,
        name: "Sun Up Bottom to Top",
        trails: [],
        lifts: []
    },
    "SunUpBottom-TeaCupBottom": {
        routeNumber: 5,
        name: "Sun Up Bottom to Tea Cup",
        trails: [],
        lifts: []
    },
    "SunUpTop-TeaCupBottom": {
        routeNumber: 6,
        name: "Sun Up Top to Tea Cup",
        trails: [],
        lifts: []
    },
    "PetesExpressTop-SkylineExpressBottom": {
        routeNumber: 7,
        name: "Pete's Express Top to Skyline Express Bottom",
        trails: ["GrandReview", "TheStar", "Hornsilver", "Resolution"],
        lifts: []
    },
    "HighNoonTop-OrientExpressBottom": {
        routeNumber: 8,
        name: "High Noon Top to Orient Express Bottom",
        trails: [],
        lifts: []
    }
};

// Add this function to handle point selection
var selectedPoints = [];

function handlePointClick(pointId) {
    console.log('Point clicked:', pointId);
    
    if (selectedPoints.length < 2) {
        selectedPoints.push(pointId);
    }
    
    if (selectedPoints.length === 2) {
        // Create route key
        const routeKey = `${selectedPoints[0]}-${selectedPoints[1]}`;
        console.log('Route key:', routeKey);
        
        // Get route definition
        const route = routeDefinitions[routeKey];
        if (route) {
            console.log('Found route:', route);
            
            // Hide all trails first
            hideAllTrails();
            
            // Show only the trails for this route
            route.trails.forEach(trailId => {
                toggleTrail(trailId, true);  // Set to true to show the trail
            });
        }
        
        // Reset selection
        selectedPoints = [];
    }
}

// Modify your marker creation to add click handlers
function displayNavigationPoints() {
    console.log('Displaying navigation points...');
    
    // Create custom HTML element for marker
    Object.keys(navigationPoints).forEach(pointId => {
        const point = navigationPoints[pointId];
        console.log(`Adding marker for ${point.name}`);
        
        // Create a custom marker element
        const el = document.createElement('div');
        el.className = 'navigation-marker';
        el.style.backgroundColor = '#0066cc';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.cursor = 'pointer';  // Add pointer cursor
        
        // Add the marker to the map
        const marker = new mapboxgl.Marker(el)
            .setLngLat(point.coordinates)
            .setPopup(new mapboxgl.Popup().setText(point.name))
            .addTo(map);
            
        // Add click handler
        el.addEventListener('click', () => handlePointClick(pointId));
    });
}

// Wait for both DOM and map to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, waiting for map...');
    
    // Wait for map to be loaded
    if (map) {
        map.on('load', function() {
            console.log('Map loaded, initializing navigation...');
            setTimeout(initializeNavigationControls, 500); // Give more time for elements to load
        });
    }
});

// Add this function at the top level
function toggleNavigation() {
    const navigationMenu = document.getElementById('navigationMenu');
    
    if (navigationMenu.style.display === 'block') {
        // Hide the navigation menu
        navigationMenu.style.display = 'none';
        
        // Reset all trails to original properties
        Object.keys(trailData).forEach(trailId => {
            const layerId = `${trailId}-layer`;
            if (map.getLayer(layerId)) {
                map.setPaintProperty(layerId, 'line-opacity', 1);
                map.setPaintProperty(layerId, 'line-width', 6); // Reset to original width
            }
        });
        
        // Reset all lifts to original properties
        Object.keys(liftData).forEach(liftId => {
            const layerId = `${liftId}-layer`;
            if (map.getLayer(layerId)) {
                map.setPaintProperty(layerId, 'line-opacity', 1);
                map.setPaintProperty(layerId, 'line-width', 2); // Reset to original width
            }
        });
        
        // Clear any selected route options
        const startPoint = document.getElementById('startPoint');
        const endPoint = document.getElementById('endPoint');
        if (startPoint) startPoint.value = '';
        if (endPoint) endPoint.value = '';
        
    } else {
        // Show the navigation menu
        navigationMenu.style.display = 'block';
    }
}

// Update initializeNavigationControls to remove the click handler since we're using onclick
function initializeNavigationControls() {
    console.log('Attempting to initialize navigation controls...');
    
    const elements = {
        navigationBtn: document.getElementById('navigationBtn'),
        navigationMenu: document.getElementById('navigationMenu'),
        startPoint: document.getElementById('startPoint'),
        endPoint: document.getElementById('endPoint')
    };

    // Log what we found
    Object.entries(elements).forEach(([name, element]) => {
        console.log(`${name} found:`, !!element);
    });

    // Add route selection handlers
    if (elements.startPoint && elements.endPoint) {
        elements.startPoint.addEventListener('change', handleRouteSelection);
        elements.endPoint.addEventListener('change', handleRouteSelection);
        console.log('Route selection handlers added');
    }
}

// Function to hide all trails
function hideAllTrails() {
    // Get all trail layers and set them to invisible
    Object.keys(trailData).forEach(trailId => {
        try {
            if (map.getLayer(trailId)) {
                map.setLayoutProperty(trailId, 'visibility', 'none');
                console.log('Hiding trail:', trailId);
            }
        } catch (e) {
            console.log('Error hiding trail:', trailId, e);
        }
    });
}

// Store the current navigation state
var isNavigationActive = false;

// Function to handle route selection
function handleRouteSelection() {
    const startPoint = document.getElementById('startPoint').value;
    const endPoint = document.getElementById('endPoint').value;
    const routeKey = `${startPoint}-${endPoint}`;

    console.log('Handling route selection:', routeKey);

    // First, dim ALL trails and lifts
    Object.keys(trailData).forEach(trailId => {
        const layerId = `${trailId}-layer`;
        if (map.getLayer(layerId)) {
            console.log('Dimming trail:', trailId);
            map.setLayoutProperty(layerId, 'visibility', 'visible');
            map.setPaintProperty(layerId, 'line-opacity', 0.25);
            map.setPaintProperty(layerId, 'line-width', 3);
        }
    });

    // Dim all lifts
    Object.keys(liftData).forEach(liftId => {
        const layerId = `${liftId}-layer`;
        if (map.getLayer(layerId)) {
            console.log('Dimming lift:', liftId);
            map.setLayoutProperty(layerId, 'visibility', 'visible');
            map.setPaintProperty(layerId, 'line-opacity', 0.2);
        }
    });

    // Then highlight the specific trails and lifts for this route
    if (routeDefinitions[routeKey]) {
        const route = routeDefinitions[routeKey];
        console.log('Highlighting route trails:', route.trails);
        
        // Highlight route trails
        route.trails.forEach(trailId => {
            const layerId = `${trailId}-layer`;
            if (map.getLayer(layerId)) {
                console.log('Highlighting trail:', trailId);
                map.setPaintProperty(layerId, 'line-opacity', 1);
                map.setPaintProperty(layerId, 'line-width', 6);
            }
        });

        // Highlight route lifts
        if (route.lifts) {
            route.lifts.forEach(liftId => {
                const layerId = `${liftId}-layer`;
                if (map.getLayer(layerId)) {
                    console.log('Highlighting lift:', liftId);
                    map.setPaintProperty(layerId, 'line-opacity', 1);
                }
            });
        }
    }
}

// Modify the existing toggle function in main.js to respect navigation
function toggleTrails() {
    if (!isNavigationActive) {  // Only toggle if navigation is not active
        // Your existing toggle code
    }
}

const recommendedRoutes = {
    "HighNoonTop-SunUpBottom": {
        easy: {
            name: "Gentle Route",
            description: "A smooth descent via The Slot",
            trails: ["TheSlot"]
        },
        quick: {
            name: "Direct Route",
            description: "Fastest way down via The Slot",
            trails: ["TheSlot"]
        },
        adventure: {
            name: "Expert's Choice",
            description: "Challenging terrain via Campbells",
            trails: ["Campbells"]
        }
    },
    "HighNoonTop-TeaCupBottom": {
        easy: {
            name: "Gentle Route",
            description: "A smooth descent via Emperors Choice",
            trails: ["SleepyTimeRoad", "SleepyTimeRoadLeftFork", "Chinabowlrunout"],
            lifts: []  
        },
        quick: {
            name: "Direct Route",
            description: "Quick route using Sun Up Express",
            trails: ["TheSlot", "RedZinger"],
            lifts: ["SunUpExpress"]  // Include the lift explicitly
        },
        adventure: {
            name: "Expert's Choice",
            description: "Challenging terrain with lift access",
            trails: ["Campbells", "EmperorsChoice", "MarmotValley"],
            lifts: ["SunUpExpress"]  // Include the lift explicitly
        }
    }
};

// Make sure this function is globally available
window.showRecommendedRoute = function(type) {
    console.log('Showing recommended route:', type);
    
    const startPoint = document.getElementById('startPoint').value;
    const endPoint = document.getElementById('endPoint').value;
    const routeKey = `${startPoint}-${endPoint}`;

    if (recommendedRoutes[routeKey]) {
        // First, dim ALL trails and lifts
        Object.keys(trailData).forEach(trailId => {
            try {
                console.log('Processing trail for dimming:', trailId);
                if (trailData[trailId].coordinates.main) {
                    // Handle split trails
                    console.log('Found split trail:', trailId);
                    ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                        const splitLayerId = `${trailId}-${pathType}-layer`;
                        if (map.getLayer(splitLayerId)) {
                            console.log(`Dimming split trail: ${trailId} (${pathType})`);
                            map.setPaintProperty(splitLayerId, 'line-opacity', 0.5);
                            map.setPaintProperty(splitLayerId, 'line-width', 3);
                        }
                    });
                } else {
                    // Handle regular trails
                    const layerId = `${trailId}-layer`;
                    if (map.getLayer(layerId)) {
                        console.log('Dimming regular trail:', trailId);
                        map.setPaintProperty(layerId, 'line-opacity', 0.5);
                        map.setPaintProperty(layerId, 'line-width', 3);
                    }
                }
            } catch (error) {
                console.error('Error processing trail:', trailId, error);
            }
        });

        // Dim all lifts
        Object.keys(liftData).forEach(liftId => {
            try {
                const liftLayerId = `${liftId}-layer`;
                if (map.getLayer(liftLayerId)) {
                    console.log('Dimming lift:', liftId);
                    map.setPaintProperty(liftLayerId, 'line-opacity', 0.5);
                    map.setPaintProperty(liftLayerId, 'line-width', 3);
                }
            } catch (error) {
                console.error('Error dimming lift:', liftId, error);
            }
        });

        // Get the recommended route
        const route = recommendedRoutes[routeKey][type];
        console.log('Route to highlight:', route);
        
        // Highlight specified trails
        route.trails.forEach(trailId => {
            try {
                console.log('Processing trail for highlighting:', trailId);
                if (trailData[trailId].coordinates.main) {
                    // Handle split trails
                    console.log('Found split trail to highlight:', trailId);
                    ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                        const splitLayerId = `${trailId}-${pathType}-layer`;
                        if (map.getLayer(splitLayerId)) {
                            console.log(`Highlighting split trail: ${trailId} (${pathType})`);
                            map.setPaintProperty(splitLayerId, 'line-opacity', 1);
                            map.setPaintProperty(splitLayerId, 'line-width', 6);
                        }
                    });
                } else {
                    // Handle regular trails
                    const layerId = `${trailId}-layer`;
                    if (map.getLayer(layerId)) {
                        console.log('Highlighting regular trail:', trailId);
                        map.setPaintProperty(layerId, 'line-opacity', 1);
                        map.setPaintProperty(layerId, 'line-width', 6);
                    }
                }
            } catch (error) {
                console.error('Error highlighting trail:', trailId, error);
            }
        });

        // Highlight specified lifts
        if (route.lifts) {
            route.lifts.forEach(liftId => {
                try {
                    const liftLayerId = `${liftId}-layer`;
                    if (map.getLayer(liftLayerId)) {
                        console.log('Highlighting lift:', liftId);
                        map.setPaintProperty(liftLayerId, 'line-opacity', 1);
                        map.setPaintProperty(liftLayerId, 'line-width', 6);
                    }
                } catch (error) {
                    console.error('Error highlighting lift:', liftId, error);
                }
            });
        }
    }
};
