// Function to calculate parallel line coordinates for double black trails
// Using a larger offset to maintain visible separation at all zoom levels
// Offset is in degrees: ~0.0001 = ~11 meters, ~0.0002 = ~22 meters
function createParallelLines(coordinates, offsetDistance = 0.0002) {
    if (coordinates.length < 2) return { left: coordinates, right: coordinates };
    
    const leftCoords = [];
    const rightCoords = [];
    
    for (let i = 0; i < coordinates.length; i++) {
        let prevPoint, nextPoint, angle;
        
        if (i === 0) {
            // First point: use direction to next point
            nextPoint = coordinates[i + 1];
            angle = Math.atan2(nextPoint[1] - coordinates[i][1], nextPoint[0] - coordinates[i][0]);
        } else if (i === coordinates.length - 1) {
            // Last point: use direction from previous point
            prevPoint = coordinates[i - 1];
            angle = Math.atan2(coordinates[i][1] - prevPoint[1], coordinates[i][0] - prevPoint[0]);
        } else {
            // Middle point: use average direction
            prevPoint = coordinates[i - 1];
            nextPoint = coordinates[i + 1];
            const angle1 = Math.atan2(coordinates[i][1] - prevPoint[1], coordinates[i][0] - prevPoint[0]);
            const angle2 = Math.atan2(nextPoint[1] - coordinates[i][1], nextPoint[0] - coordinates[i][0]);
            angle = (angle1 + angle2) / 2;
        }
        
        // Perpendicular angle (90 degrees)
        const perpAngle = angle + Math.PI / 2;
        
        // Calculate offset
        const offsetX = Math.cos(perpAngle) * offsetDistance;
        const offsetY = Math.sin(perpAngle) * offsetDistance;
        
        // Create left and right parallel points
        leftCoords.push([coordinates[i][0] - offsetX, coordinates[i][1] - offsetY]);
        rightCoords.push([coordinates[i][0] + offsetX, coordinates[i][1] + offsetY]);
    }
    
    return { left: leftCoords, right: rightCoords };
}

// Function to simplify trail coordinates by taking every Nth point
function simplifyCoordinates(coordinates, step = 1) {
    if (coordinates.length < 2) return coordinates;
    if (step <= 1) return coordinates;
    
    const simplified = [];
    for (let i = 0; i < coordinates.length; i += step) {
        simplified.push(coordinates[i]);
    }
    // Always include the last point
    if (simplified[simplified.length - 1] !== coordinates[coordinates.length - 1]) {
        simplified.push(coordinates[coordinates.length - 1]);
    }
    return simplified;
}

// Function to smooth trail coordinates using Catmull-Rom spline interpolation
function smoothCoordinates(coordinates, tension = 0.5) {
    if (coordinates.length < 2) return coordinates;
    if (coordinates.length === 2) return coordinates;
    
    const smoothed = [coordinates[0]]; // Keep first point
    
    for (let i = 0; i < coordinates.length - 1; i++) {
        const p0 = coordinates[Math.max(0, i - 1)];
        const p1 = coordinates[i];
        const p2 = coordinates[i + 1];
        const p3 = coordinates[Math.min(coordinates.length - 1, i + 2)];
        
        // Add interpolated points between p1 and p2
        for (let t = 0.25; t < 1; t += 0.25) {
            const t2 = t * t;
            const t3 = t2 * t;
            
            const x = 0.5 * (
                (2 * p1[0]) +
                (-p0[0] + p2[0]) * t +
                (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
                (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3
            );
            
            const y = 0.5 * (
                (2 * p1[1]) +
                (-p0[1] + p2[1]) * t +
                (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
                (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3
            );
            
            smoothed.push([x, y]);
        }
    }
    
    smoothed.push(coordinates[coordinates.length - 1]); // Keep last point
    return smoothed;
}

// Function to process trail coordinates based on zoom level for performance
function processTrailCoordinates(coordinates, currentZoom) {
    let processed = coordinates;
    
    // Simplify coordinates at low zoom levels
    if (currentZoom < 10) {
        // Zoom < 10: Only first and last coordinate (straight line)
        if (coordinates.length >= 2) {
            processed = [coordinates[0], coordinates[coordinates.length - 1]];
        } else {
            processed = coordinates;
        }
    } else if (currentZoom < 11.5) {
        // Zoom 10-11.5: Use every 3rd point (reduces by ~67%)
        processed = simplifyCoordinates(processed, 3);
    } else if (currentZoom < 12) {
        // Zoom 11.5-12: Use every 2nd point (reduces by ~50%)
        processed = simplifyCoordinates(processed, 2);
    }
    // Zoom 12+: Use all points (no simplification, no smoothing)
    
    return processed;
}

// Custom marker creator - at the very top of main.js
const createCustomMarker = (color) => {
    const element = document.createElement('div');
    element.className = 'custom-marker';
    
    // Create the marker SVG
    element.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 32 32">
            <image href="./Images/cliff-drop.png" width="32" height="32"/>
            <circle cx="16" cy="16" r="15" fill="none" stroke="${color}" stroke-width="2"/>
        </svg>
    `;
    
    return element;
};

// Create video icon marker (play button style)
const createVideoMarker = () => {
    const element = document.createElement('div');
    element.className = 'video-marker';
    
    // Create play button icon SVG
    element.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" style="background: rgba(0, 0, 0, 0.6); border-radius: 50%; padding: 4px;">
            <circle cx="12" cy="12" r="10" fill="#00FF00" stroke="#FFFFFF" stroke-width="2"/>
            <path d="M9 7 L9 17 L17 12 Z" fill="#000000"/>
        </svg>
    `;
    
    // Make marker sit on top and capture clicks
    // Note: Don't set position - Mapbox handles that
    element.style.zIndex = '1000';
    element.style.pointerEvents = 'auto';
    element.style.cursor = 'pointer';
    
    return element;
};

// Create picture icon marker (camera icon style)
const createPictureMarker = () => {
    const element = document.createElement('div');
    element.className = 'picture-marker';
    
    // Create camera icon SVG
    element.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" style="background: rgba(0, 0, 0, 0.6); border-radius: 50%; padding: 4px;">
            <circle cx="12" cy="12" r="10" fill="#FF6B35" stroke="#FFFFFF" stroke-width="2"/>
            <rect x="8" y="9" width="8" height="6" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
            <circle cx="12" cy="12" r="2" fill="#FFFFFF"/>
        </svg>
    `;
    
    // Make marker sit on top and capture clicks
    element.style.zIndex = '1000';
    element.style.pointerEvents = 'auto';
    element.style.cursor = 'pointer';
    
    return element;
};

// Calculate midpoint of a trail (or use first point if only one)
function getTrailMidpoint(trailId) {
    if (!trailData[trailId]) return null;
    
    let coordinates = [];
    
    // Handle split trails
    if (trailData[trailId].coordinates.main) {
        coordinates = trailData[trailId].coordinates.main;
    } else if (trailData[trailId].coordinates) {
        coordinates = trailData[trailId].coordinates;
    } else {
        return null;
    }
    
    if (!coordinates || coordinates.length === 0) return null;
    
    // If only one point, use it
    if (coordinates.length === 1) {
        return coordinates[0];
    }
    
    // Calculate midpoint (use middle coordinate)
    const midIndex = Math.floor(coordinates.length / 2);
    return coordinates[midIndex];
}

// Then your mountainFeatureData.


// Initialize your variables
const mountainMarkers = [];
const videoMarkers = [];  // Markers for trails with custom videos
const pictureMarkers = [];  // Markers for custom pictures
var trailsVisible = true;
var liftsVisible = true;
let myPicturesMode = false;  // Track My Pictures toggle state
let viewingFriendMap = false;  // Track if viewing friend's map
let currentFriendId = null;  // Current friend being viewed

// Make these globally accessible and keep in sync
window.viewingFriendMap = viewingFriendMap;
window.currentFriendId = currentFriendId;
window.myVideosMode = myVideosMode;
window.myPicturesMode = myPicturesMode;
window.myVideosMode = myVideosMode;
window.myPicturesMode = myPicturesMode;

// Sync function to update both local and global variables
function syncFriendMapState() {
    if (window.viewingFriendMap !== undefined) {
        viewingFriendMap = window.viewingFriendMap;
    }
    if (window.currentFriendId !== undefined) {
        currentFriendId = window.currentFriendId;
    }
}
var mountainCamsVisible = false;  // Start with cams hidden for better performance
var currentPopup = null;
var liveFeedMarkers = [];
var myVideosMode = false;  // Track My Videos toggle state (default: OFF)
let navigationActive = false;

// Hardcoded custom videos data is loaded from Data/HardcodedCustomVideos.js
// This keeps main.js cleaner and follows the same pattern as other data files

// Debug checks
if (typeof mountainFeatureData === 'undefined') {
    console.error('mountainFeatureData is not defined! Check if VailMountainFeatures.js is loaded correctly');
} else {
    console.log('mountainFeatureData is loaded:', Object.keys(mountainFeatureData).length, 'features found');
}

// Use the mountainFeatureData from your VailMountainFeatures.js file
console.log('Mountain Feature Data:', mountainFeatureData); // Debug log

console.log('Script starting');
console.log('mountainFeatureData loaded:', {
    data: mountainFeatureData,
    count: Object.keys(mountainFeatureData).length
});
mapboxgl.accessToken = 'pk.eyJ1IjoiZHJlZWR2YWlsIiwiYSI6ImNtNzFpZm1vZDBjamwyaW9iNXB4d2Y3MXMifQ.SX00x_QQAbJWREWA2j_C8Q';
console.log('Token set');

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-106.08341101274623, 39.47262655904069],  // Centered on Breckenridge
    zoom: 14,  // Zoomed in on Breckenridge
    bearing: -80,  // North at top
    pitch: 45  // 45 degree angle view
});
console.log('Map initialized');

// Make map globally accessible
window.map = map;

// Denver coordinates (slightly north ~500 feet)
const denverCoords = [-104.9903, 39.7406]; // ~500 feet north of downtown Denver

// Create custom marker element for Denver
function createDenverMarker() {
    const element = document.createElement('div');
    element.className = 'denver-marker';
    element.innerHTML = `
        <div style="
            background-color: rgba(255, 255, 255, 0.95);
            padding: 6px 12px;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
            color: #333;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            white-space: nowrap;
        ">Denver</div>
    `;
    return element;
}

// Create and add Denver marker
let denverMarker = null;

// Wait for map to load before adding layers
// Helper function to check if coordinates intersect viewport bounds (with buffer)
// Optimized: First checks bounding box, then individual coordinates if needed
function isInViewport(coordinates, bounds, bufferPercent = 0.15) {
    if (!coordinates || coordinates.length === 0) return false;
    
    // Expand bounds by buffer percentage
    const latRange = bounds.getNorth() - bounds.getSouth();
    const lngRange = bounds.getEast() - bounds.getWest();
    const latBuffer = latRange * bufferPercent;
    const lngBuffer = lngRange * bufferPercent;
    
    const expandedBounds = {
        north: bounds.getNorth() + latBuffer,
        south: bounds.getSouth() - latBuffer,
        east: bounds.getEast() + lngBuffer,
        west: bounds.getWest() - lngBuffer
    };
    
    // OPTIMIZATION: First calculate bounding box of the trail (much faster than checking every point)
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;
    
    for (let i = 0; i < coordinates.length; i++) {
        const coord = coordinates[i];
        if (Array.isArray(coord) && coord.length >= 2) {
            const [lng, lat] = coord;
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
            if (lng < minLng) minLng = lng;
            if (lng > maxLng) maxLng = lng;
        }
    }
    
    // Quick rejection: If the trail's bounding box doesn't intersect viewport, trail is not visible
    if (maxLat < expandedBounds.south || minLat > expandedBounds.north ||
        maxLng < expandedBounds.west || minLng > expandedBounds.east) {
        return false; // Trail is completely outside viewport
    }
    
    // Quick acceptance: If the trail's bounding box is completely inside viewport, trail is visible
    if (minLat >= expandedBounds.south && maxLat <= expandedBounds.north &&
        minLng >= expandedBounds.west && maxLng <= expandedBounds.east) {
        return true; // Trail is completely inside viewport
    }
    
    // Partial overlap: Check individual coordinates (only needed for trails that partially overlap)
    // This is rare, so we only do the expensive check when necessary
    for (let i = 0; i < coordinates.length; i++) {
        const coord = coordinates[i];
        if (Array.isArray(coord) && coord.length >= 2) {
            const [lng, lat] = coord;
            if (lat >= expandedBounds.south && lat <= expandedBounds.north &&
                lng >= expandedBounds.west && lng <= expandedBounds.east) {
                return true;
            }
        }
    }
    return false;
}

map.on('load', function() {
    console.log('Map loaded');
    
    // Add Denver marker
    const denverElement = createDenverMarker();
    denverMarker = new mapboxgl.Marker(denverElement)
        .setLngLat(denverCoords)
        .addTo(map);

    // Add terrain source
    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
    });

    // Add 3D terrain
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

    // Add sky layer
    map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 90.0],
            'sky-atmosphere-sun-intensity': 15
        }
    });

    // Add the new slope analysis layer
    map.addLayer({
        'id': 'slopes',
        'type': 'fill',
        'source': 'mapbox-dem',
        'paint': {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['number', ['get', 'slope'], 0],
                0, '#88cc88',   // < 35°
                35, '#4444ff',  // 35-40°
                40, '#000000',  // 40-45°
                45, '#cc0000',  // 45-50°
                50, '#ff0000'   // > 50°
            ],
            'fill-opacity': 0.7
        },
        'layout': {
            'visibility': 'none'
        }
    });

    // Then verify feature data
    console.log('Map loaded - mountainFeatureData:', mountainFeatureData);
    console.log('mountainFeatureData type:', typeof mountainFeatureData);
    console.log('Keys:', Object.keys(mountainFeatureData));

    try {
        // Create markers for each feature
        Object.entries(mountainFeatureData).forEach(([id, feature]) => {
            const color = feature.difficulty === 'green' ? '#228B22' : 
                         feature.difficulty === 'blue' ? '#0022AA' : '#000000';
            
            // Create the custom element first
            const customElement = createCustomMarker(color);
            
            // Create marker directly with the element (but don't add to map initially - starts hidden)
            const marker = new mapboxgl.Marker(customElement)
                .setLngLat(feature.coordinates)
                .setPopup(new mapboxgl.Popup().setHTML(feature.content));
            // Don't add to map initially - will be added when checkbox is checked
            
            marker.difficulty = feature.difficulty;
            marker.featureId = id;
            mountainMarkers.push(marker);
            console.log('Created marker with ID:', id, marker);
        });

        console.log('Created markers:', mountainMarkers.length);
    } catch (error) {
        console.error('Error in feature creation:', error);
    }

    // Function to load a single trail (used for initial load and dynamic loading)
    function loadTrail(trail) {
        if (trailData[trail].coordinates.main) {
            // For split trails, add three separate sources and layers
            ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                const sourceId = `${trail}-${pathType}`;
                if (!map.getSource(sourceId)) {
                    // Process coordinates based on current zoom level (simplify + conditional smoothing)
                    const currentZoom = map.getZoom();
                    const processedCoords = processTrailCoordinates(trailData[trail].coordinates[pathType], currentZoom);
                    map.addSource(sourceId, {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {
                                trailColor: trailData[trail].color  // Store color for GPU-accelerated expressions
                            },
                            geometry: {
                                type: 'LineString',
                                coordinates: processedCoords
                            }
                        }
                    });

                    // For all trails, use a border/highlight effect
                    // Extreme trails get red border, double black trails get yellow border, others get white border
                    // Catwalks don't get a border - just dashed colored line
                    const isExtreme = trailData[trail].difficulty === 'extreme' || trailData[trail].isExtreme === true;
                    const isDoubleBlack = trailData[trail].difficulty === 'doubleBlack' || trailData[trail].isDoubleBlack === true;
                    const isBlack = trailData[trail].difficulty === 'black';
                    const isCatwalk = trailData[trail].isCatwalk === true || trailData[trail].type === 'catwalk';
                    const borderColor = isExtreme ? '#FF0000' : (isDoubleBlack ? '#FFB84D' : (isBlack ? '#FFFACD' : '#FFFFFF'));  // Red for extreme, yellow-orange for double black, light yellow for black, white for others
                    
                    // Only add border layer for non-catwalk trails
                    if (!isCatwalk) {
                        // Build paint properties for border layer
                        const borderPaint = {
                            'line-color': borderColor,
                            'line-width': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                10, 1.2,   // Wider border (20% thinner)
                                12, 2.0,
                                14, 3.6,
                                16, 5.2
                            ],
                            'line-translate': [0, 0]  // Ensure no offset
                        };
                        
                        // Full opacity (no dimming)
                        borderPaint['line-opacity'] = 1.0;
                        
                        // Bottom layer: border/highlight (wider)
                        // Hide border at low zoom for performance (zoom < 12)
                        // Also check if trail should be visible based on difficulty checkbox
                        const currentZoomForBorder = map.getZoom();
                        const trailShouldBeVisible = shouldTrailBeVisible(trail);
                        const borderVisibility = (currentZoomForBorder >= 12 && trailShouldBeVisible) ? 'visible' : 'none';
                        
                        map.addLayer({
                            'id': `${trail}-${pathType}-layer-border`,
                            'type': 'line',
                            'source': sourceId,
                            'layout': {
                                'line-join': 'round',
                                'line-cap': 'square',  // Use 'square' for better alignment
                                'visibility': borderVisibility
                            },
                            'paint': borderPaint
                        });
                    }
                    
                    // Build paint properties for main layer
                    // Use GPU-accelerated expression for color (reads from feature properties)
                    const mainPaint = {
                        'line-color': ['get', 'trailColor'],  // GPU-accelerated: reads from GeoJSON properties
                        'line-width': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            10, 0.72,  // 20% thinner
                            12, 1.44,
                            14, 2.88,
                            16, 4.32
                        ],
                        'line-translate': [0, 0]  // Ensure no offset
                    };
                    // Add dash array for catwalks
                    if (isCatwalk) {
                        mainPaint['line-dasharray'] = [4, 3];
                    }
                    
                    // Full opacity (no dimming)
                    mainPaint['line-opacity'] = 1.0;
                    
                    // Top layer: colored line (narrower, centered on white for non-catwalks)
                    // Check if trail should be visible based on difficulty checkbox
                    const trailShouldBeVisible = shouldTrailBeVisible(trail);
                    map.addLayer({
                        'id': `${trail}-${pathType}-layer`,
                        'type': 'line',
                        'source': sourceId,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': isCatwalk ? 'round' : 'square',  // Round caps for catwalks look better
                            'visibility': trailShouldBeVisible ? 'visible' : 'none'
                        },
                        'paint': mainPaint
                    });
                }
            });
        } else {
            // Original code for regular trails
            if (!map.getSource(trail)) {
                // Process coordinates based on current zoom level (simplify + conditional smoothing)
                const currentZoom = map.getZoom();
                const processedCoords = processTrailCoordinates(trailData[trail].coordinates, currentZoom);
                map.addSource(trail, {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {
                            trailColor: trailData[trail].color  // Store color for GPU-accelerated expressions
                        },
                        geometry: {
                            type: 'LineString',
                            coordinates: processedCoords
                        }
                    }
                });
                // For all trails, use a border/highlight effect
                // Extreme trails get red border, double black trails get yellow border, black trails get light yellow border, others get white border
                // Catwalks don't get a border - just dashed colored line
                const isExtreme = trailData[trail].difficulty === 'extreme' || trailData[trail].isExtreme === true;
                const isDoubleBlack = trailData[trail].difficulty === 'doubleBlack' || trailData[trail].isDoubleBlack === true;
                const isBlack = trailData[trail].difficulty === 'black';
                const isCatwalk = trailData[trail].isCatwalk === true || trailData[trail].type === 'catwalk';
                const borderColor = isExtreme ? '#FF0000' : (isDoubleBlack ? '#FFB84D' : (isBlack ? '#FFFACD' : '#FFFFFF'));  // Red for extreme, yellow-orange for double black, light yellow for black, white for others
                
                // Only add border layer for non-catwalk trails
                if (!isCatwalk) {
                    // Build paint properties for border layer
                    const borderPaint = {
                        'line-color': borderColor,
                        'line-width': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            10, 1.2,   // Wider border (20% thinner)
                            12, 2.0,
                            14, 3.6,
                            16, 5.2
                        ],
                        'line-translate': [0, 0]  // Ensure no offset
                    };
                    
                    // Full opacity (no dimming)
                    borderPaint['line-opacity'] = 1.0;
                    
                    // Bottom layer: border/highlight (wider)
                    // Hide border at low zoom for performance (zoom < 12)
                    // Also check if trail should be visible based on difficulty checkbox
                    const currentZoomForBorder = map.getZoom();
                    const trailShouldBeVisible = shouldTrailBeVisible(trail);
                    const borderVisibility = (currentZoomForBorder >= 12 && trailShouldBeVisible) ? 'visible' : 'none';
                    
                    map.addLayer({
                        'id': `${trail}-layer-border`,
                        'type': 'line',
                        'source': trail,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'square',  // Use 'square' for better alignment
                            'visibility': borderVisibility
                        },
                        'paint': borderPaint
                    });
                }
                
                // Build paint properties for main layer
                // Use GPU-accelerated expression for color (reads from feature properties)
                const mainPaint = {
                    'line-color': ['get', 'trailColor'],  // GPU-accelerated: reads from GeoJSON properties
                    'line-width': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        10, 0.72,  // 20% thinner
                        12, 1.44,
                        14, 2.88,
                        16, 4.32
                    ],
                    'line-translate': [0, 0]  // Ensure no offset
                };
                // Add dash array for catwalks
                if (isCatwalk) {
                    mainPaint['line-dasharray'] = [4, 3];
                }
                
                // Full opacity (no dimming)
                mainPaint['line-opacity'] = 1.0;
                
                // Top layer: colored line (narrower, centered on white for non-catwalks)
                // Check if trail should be visible based on difficulty checkbox
                const trailShouldBeVisible = shouldTrailBeVisible(trail);
                map.addLayer({
                    'id': `${trail}-layer`,
                    'type': 'line',
                    'source': trail,
                    'layout': {
                        'line-join': 'round',
                        'line-cap': isCatwalk ? 'round' : 'square',  // Round caps for catwalks look better
                        'visibility': trailShouldBeVisible ? 'visible' : 'none'
                    },
                    'paint': mainPaint
                });
            }
        }
    }
    
    // Track which trails are loaded (accessible globally for optimization)
    window.loadedTrails = new Set();
    const loadedTrails = window.loadedTrails;
    
    // Function to unload a trail (remove from map)
    // IMPORTANT: Must remove layers BEFORE removing sources (Mapbox requirement)
    function unloadTrail(trail) {
        if (trailData[trail].coordinates.main) {
            // Handle split trails
            ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                const sourceId = `${trail}-${pathType}`;
                const borderLayerId = `${trail}-${pathType}-layer-border`;
                const mainLayerId = `${trail}-${pathType}-layer`;
                const highlightLayerId = `${trail}-${pathType}-video-highlight`;
                
                // Remove ALL layers FIRST (before removing source)
                if (map.getLayer(highlightLayerId)) map.removeLayer(highlightLayerId);
                if (map.getLayer(borderLayerId)) map.removeLayer(borderLayerId);
                if (map.getLayer(mainLayerId)) map.removeLayer(mainLayerId);
                
                // Remove source AFTER all layers are removed
                if (map.getSource(sourceId)) map.removeSource(sourceId);
            });
        } else {
            // Handle regular trails
            const borderLayerId = `${trail}-layer-border`;
            const mainLayerId = `${trail}-layer`;
            const highlightLayerId = `${trail}-video-highlight`;
            
            // Remove ALL layers FIRST (before removing source)
            if (map.getLayer(highlightLayerId)) map.removeLayer(highlightLayerId);
            if (map.getLayer(borderLayerId)) map.removeLayer(borderLayerId);
            if (map.getLayer(mainLayerId)) map.removeLayer(mainLayerId);
            
            // Remove source AFTER all layers are removed
            if (map.getSource(trail)) map.removeSource(trail);
        }
        
        loadedTrails.delete(trail);
    }
    
    // Pre-compute bounding boxes for all trails (one-time cost, huge performance win)
    // MUST be done before loadTrailsInViewport() is called
    const trailBoundingBoxes = {};
    Object.keys(trailData).forEach(function(trail) {
        let trailCoords = null;
        if (trailData[trail].coordinates.main) {
            trailCoords = trailData[trail].coordinates.main;
        } else {
            trailCoords = trailData[trail].coordinates;
        }
        
        if (trailCoords && trailCoords.length > 0) {
            let minLat = Infinity, maxLat = -Infinity;
            let minLng = Infinity, maxLng = -Infinity;
            
            for (let i = 0; i < trailCoords.length; i++) {
                const coord = trailCoords[i];
                if (Array.isArray(coord) && coord.length >= 2) {
                    const [lng, lat] = coord;
                    if (lat < minLat) minLat = lat;
                    if (lat > maxLat) maxLat = lat;
                    if (lng < minLng) minLng = lng;
                    if (lng > maxLng) maxLng = lng;
                }
            }
            
            trailBoundingBoxes[trail] = {
                minLat: minLat,
                maxLat: maxLat,
                minLng: minLng,
                maxLng: maxLng
            };
        }
    });
    
    // Optimized viewport check using pre-computed bounding boxes
    function quickViewportCheck(trail, bounds, bufferPercent = 0.15) {
        const bbox = trailBoundingBoxes[trail];
        if (!bbox) return false;
        
        // Expand bounds by buffer
        const latRange = bounds.getNorth() - bounds.getSouth();
        const lngRange = bounds.getEast() - bounds.getWest();
        const latBuffer = latRange * bufferPercent;
        const lngBuffer = lngRange * bufferPercent;
        
        const expandedBounds = {
            north: bounds.getNorth() + latBuffer,
            south: bounds.getSouth() - latBuffer,
            east: bounds.getEast() + lngBuffer,
            west: bounds.getWest() - lngBuffer
        };
        
        // Quick bounding box intersection check (much faster than checking all coordinates)
        const isInViewport = !(bbox.maxLat < expandedBounds.south || bbox.minLat > expandedBounds.north ||
                 bbox.maxLng < expandedBounds.west || bbox.minLng > expandedBounds.east);
        
        // ADDITIONAL CHECK: If viewport is focused on Breck (around -106.04 to -106.11), 
        // don't load Vail trails (around -106.34). And vice versa.
        // This prevents loading trails from the wrong mountain when zoomed in
        const viewportCenterLng = (bounds.getEast() + bounds.getWest()) / 2;
        const trailCenterLng = (bbox.minLng + bbox.maxLng) / 2;
        const lngDistance = Math.abs(viewportCenterLng - trailCenterLng);
        
        // If viewport and trail are more than 0.15 degrees apart (roughly 10+ miles), don't load
        // This prevents Vail trails from loading when zoomed into Breck and vice versa
        if (lngDistance > 0.15) {
            return false;
        }
        
        return isInViewport;
    }
    
    // Load trails that are in viewport, unload ones that aren't
    function loadTrailsInViewport() {
        const bounds = map.getBounds();
        const trailsToKeep = new Set();
        
        // OPTIMIZED: Use pre-computed bounding boxes for fast checks
        // First, check currently loaded trails (they're most likely to still be visible)
        loadedTrails.forEach(function(trail) {
            if (quickViewportCheck(trail, bounds, 0.15)) {
                trailsToKeep.add(trail);
            }
        });
        
        // Then check unloaded trails (but only if we have capacity)
        // Limit to checking max 50 unloaded trails per frame to avoid blocking
        const unloadedTrails = Object.keys(trailData).filter(t => !loadedTrails.has(t));
        let checkedCount = 0;
        const MAX_CHECKS_PER_FRAME = 50;
        
        for (let i = 0; i < unloadedTrails.length && checkedCount < MAX_CHECKS_PER_FRAME; i++) {
            const trail = unloadedTrails[i];
            if (quickViewportCheck(trail, bounds, 0.15)) {
                trailsToKeep.add(trail);
                
                // Load if not already loaded
                if (!loadedTrails.has(trail)) {
                    loadTrail(trail);
                    loadedTrails.add(trail);
                }
            }
            checkedCount++;
        }
        
        // If we didn't check all trails, schedule another check
        if (checkedCount < unloadedTrails.length) {
            setTimeout(function() {
                // Check remaining trails
                for (let i = checkedCount; i < unloadedTrails.length; i++) {
                    const trail = unloadedTrails[i];
                    if (quickViewportCheck(trail, bounds, 0.15)) {
                        if (!loadedTrails.has(trail)) {
                            loadTrail(trail);
                            loadedTrails.add(trail);
                        }
                        trailsToKeep.add(trail);
                    }
                }
                // Update video markers after loading trails
                if (myVideosMode) {
                    updateVideoMarkers();
                }
            }, 100);
        }
        
        // Unload trails that are no longer in viewport
        loadedTrails.forEach(function(trail) {
            if (!trailsToKeep.has(trail)) {
                unloadTrail(trail);
            }
        });
    }
    
    // Initial load - only load trails in viewport
    loadTrailsInViewport();
    
    // Update video markers after initial load (if My Videos mode is on)
    if (myVideosMode) {
        setTimeout(() => updateVideoMarkers(), 500);
    }
    
    // Update picture markers after initial load (if My Pictures mode is on)
    if (myPicturesMode) {
        setTimeout(() => updatePictureMarkers(), 500);
    }
    
    // Load trails and lifts as map moves (when viewport changes)
    // Optimized for smooth panning: longer debounce + deferred execution + pre-computed bboxes
    let moveEndTimeout;
    let lastBounds = null;
    const BOUNDS_CHANGE_THRESHOLD = 0.1; // Only update if viewport changed by 10% or more (increased from 5%)
    
    map.on('moveend', function() {
        clearTimeout(moveEndTimeout);
        moveEndTimeout = setTimeout(function() {
            const currentBounds = map.getBounds();
            
            // Skip update if viewport hasn't changed significantly
            if (lastBounds) {
                const latChange = Math.abs(currentBounds.getNorth() - lastBounds.getNorth()) + 
                                 Math.abs(currentBounds.getSouth() - lastBounds.getSouth());
                const lngChange = Math.abs(currentBounds.getEast() - lastBounds.getEast()) + 
                                 Math.abs(currentBounds.getWest() - lastBounds.getWest());
                const latRange = currentBounds.getNorth() - currentBounds.getSouth();
                const lngRange = currentBounds.getEast() - currentBounds.getWest();
                
                // If change is less than threshold, skip update
                if (latChange / latRange < BOUNDS_CHANGE_THRESHOLD && 
                    lngChange / lngRange < BOUNDS_CHANGE_THRESHOLD) {
                    return; // Viewport hasn't changed enough
                }
            }
            
            lastBounds = currentBounds;
            
            // Defer expensive operations until browser is idle
            if (window.requestIdleCallback) {
                requestIdleCallback(function() {
                    loadTrailsInViewport();
                    loadLiftsInViewport();
                }, { timeout: 1500 }); // Increased timeout
            } else {
                // Fallback: use requestAnimationFrame with delay
                requestAnimationFrame(function() {
                    setTimeout(function() {
                        loadTrailsInViewport();
                        loadLiftsInViewport();
                        // Update video markers after viewport changes
                        if (myVideosMode) {
                            updateVideoMarkers();
                        }
                        // Update picture markers after viewport changes
                        if (myPicturesMode) {
                            updatePictureMarkers();
                        }
                    }, 200); // Increased delay
                });
            }
        }, 800); // Increased from 500ms to 800ms for even smoother panning
    });

    // Add click handlers for all trails (these work even if trail isn't loaded yet)
    Object.keys(trailData).forEach(function(trail) {
        const isDoubleBlack = trailData[trail].difficulty === 'doubleBlack' || trailData[trail].isDoubleBlack === true;
        
        if (trailData[trail].coordinates.main) {
            // Handle split trails
            ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                // All trails now have border and main layers
                const layerIds = [`${trail}-${pathType}-layer`, `${trail}-${pathType}-layer-border`];
                
                layerIds.forEach(layerId => {
                    map.on('click', layerId, function(e) {
                        // Check if click was on a video marker - if so, don't show trail popup
                        const clickedElement = e.originalEvent.target;
                        if (clickedElement && clickedElement.closest('.video-marker')) {
                            return; // Don't show trail popup if video marker was clicked
                        }
                        
                        currentTrailForPopup = trail;
                        const popupContent = generatePopupContent(trail);
                        
                        const popup = new mapboxgl.Popup({ 
                            offset: 25,
                            anchor: 'bottom'  // Position above click point, but auto-adjusts if off-screen
                        })
                            .setLngLat(e.lngLat)
                            .setHTML(popupContent)
                            .addTo(map);
                        
                        // Add event listeners for custom video buttons after popup is added
                        setTimeout(() => {
                            setupCustomVideoButtons(trail, popup);
                        }, 100);
                    });

                    // Hover effects for split trails
                    map.on('mouseenter', layerId, function() {
                        map.getCanvas().style.cursor = 'pointer';
                    });
                    map.on('mouseleave', layerId, function() {
                        map.getCanvas().style.cursor = '';
                    });
                });
            });
        } else {
            // Handle regular trails
            // All trails now have border and main layers
            const layerIds = [`${trail}-layer`, `${trail}-layer-border`];
            
            layerIds.forEach(layerId => {
                map.on('click', layerId, function(e) {
                    // Check if click was on a video marker - if so, don't show trail popup
                    // Only check for video markers specifically, not all markers
                    const clickedElement = e.originalEvent.target;
                    if (clickedElement && clickedElement.closest('.video-marker')) {
                        return; // Don't show trail popup if video marker was clicked
                    }
                    
                    currentTrailForPopup = trail;
                    const popupContent = generatePopupContent(trail);
                    
                    const popup = new mapboxgl.Popup({ 
                        offset: 25,
                        anchor: 'bottom'  // Position above click point, but auto-adjusts if off-screen
                    })
                        .setLngLat(e.lngLat)
                        .setHTML(popupContent)
                        .addTo(map);
                    
                    // Add event listeners for custom video buttons after popup is added
                    setTimeout(() => {
                        setupCustomVideoButtons(trail, popup);
                    }, 100);
                });

                // Hover effects for regular trails
                map.on('mouseenter', layerId, function() {
                    map.getCanvas().style.cursor = 'pointer';
                });
                map.on('mouseleave', layerId, function() {
                    map.getCanvas().style.cursor = '';
                });
            });
        }
    });

    // Function to load a single lift
    function loadLift(lift) {
        if (!map.getSource(lift)) {
            const isHikeTo = liftData[lift].isHikeTo === true || liftData[lift].type === 'hikeTo';
            const lineColor = isHikeTo ? '#000000' : (liftData[lift].color || '#FF0000');  // Black for hike-to, red for regular lifts
            const dashArray = isHikeTo ? [2, 2] : [4, 3];  // Smaller dashes for hike-to
            // Thinner line width for hike-to terrain
            const lineWidth = isHikeTo ? [
                'interpolate',
                ['linear'],
                ['zoom'],
                10, 1.0,   // Thinner when zoomed out
                12, 1.5,
                14, 2.0,
                16, 2.5   // Thinner when zoomed in
            ] : [
                'interpolate',
                ['linear'],
                ['zoom'],
                10, 1.5,   // Thinner when zoomed out
                12, 2.5,
                14, 3.5,
                16, 4.5   // Slightly thicker when zoomed in
            ];
            
            map.addSource(lift, {
                type: 'geojson',
                data: { type: 'Feature', geometry: { type: 'LineString', coordinates: liftData[lift].coordinates } }
            });
            map.addLayer({
                id: `${lift}-layer`,
                type: 'line',
                source: lift,
                paint: {
                    'line-color': lineColor,
                    'line-width': lineWidth,
                    'line-dasharray': dashArray
                },
                layout: { 'visibility': 'visible' }
            });
        }
    }
    
    // Track which lifts are loaded
    const loadedLifts = new Set();
    
    // Function to unload a lift (remove from map)
    function unloadLift(lift) {
        const layerId = `${lift}-layer`;
        
        // Remove layer
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        
        // Remove source
        if (map.getSource(lift)) map.removeSource(lift);
        
        loadedLifts.delete(lift);
    }
    
    // Load lifts that are in viewport, unload ones that aren't
    function loadLiftsInViewport() {
        const bounds = map.getBounds();
        const liftsToKeep = new Set();
        
        // First, check which lifts should be loaded
        Object.keys(liftData).forEach(function(lift) {
            // Check if lift is in viewport
            const liftCoords = liftData[lift].coordinates;
            if (isInViewport(liftCoords, bounds, 0.15)) {
                liftsToKeep.add(lift);
                
                // Load if not already loaded
                if (!loadedLifts.has(lift)) {
                    loadLift(lift);
                    loadedLifts.add(lift);
                }
            }
        });
        
        // Unload lifts that are no longer in viewport
        loadedLifts.forEach(function(lift) {
            if (!liftsToKeep.has(lift)) {
                unloadLift(lift);
            }
        });
    }
    
    // Initial load - only load lifts in viewport
    loadLiftsInViewport();

    // Slope toggle removed - feature no longer available

    // Create mountain cam markers but don't add to map initially (starts hidden for better performance)
    liveFeedLocations.forEach(function(location) {
        var liveFeedMarker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat(location.coords)
            .setPopup(new mapboxgl.Popup().setHTML(
                `<strong>Live Cam</strong><br><a href='${location.url}' target='_blank'>View Mountain Cams - Official Vail Site</a>`
            ));
        // Don't add to map initially - will be added when checkbox is checked
        liveFeedMarkers.push(liveFeedMarker);
    });

    // Add click handlers for all parts of SleepyTimeRoad
    ['main', 'leftFork', 'rightFork'].forEach(pathType => {
        map.on('click', `SleepyTimeRoad-${pathType}-layer`, function(e) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(trailPopups['SleepyTimeRoad'].content)
                .addTo(map);
        });

        // Change cursor to pointer when hovering over any part of the trail
        map.on('mouseenter', `SleepyTimeRoad-${pathType}-layer`, function() {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', `SleepyTimeRoad-${pathType}-layer`, function() {
            map.getCanvas().style.cursor = '';
        });
    });

    // Add click handlers for all parts of BolshoiBallroom
    ['main', 'leftFork', 'rightFork'].forEach(pathType => {
        map.on('click', `BolshoiBallroom-${pathType}-layer`, function(e) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(trailPopups['BolshoiBallroom'].content)
                .addTo(map);
        });

        // Change cursor to pointer when hovering over any part of the trail
        map.on('mouseenter', `BolshoiBallroom-${pathType}-layer`, function() {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', `BolshoiBallroom-${pathType}-layer`, function() {
            map.getCanvas().style.cursor = '';
        });
    });
    
        // Add click event for coordinates
    map.on('click', function(e) {
        console.log('Clicked coordinates:', [e.lngLat.lng, e.lngLat.lat]);
    });

    // Initialize features after map is loaded
    try {
        console.log('Creating feature markers with:', mountainFeatureData);
        createFeatureMarkers(mountainFeatureData);
        console.log('Feature markers created');
    } catch (error) {
        console.error('Error initializing features:', error);
    }

    // Function to update border visibility based on zoom (hide at low zoom for performance)
    function updateBorderVisibility() {
        const currentZoom = map.getZoom();
        // Hide borders below zoom 12 (they're not visible anyway and reduce rendering by ~50%)
        const showBorders = currentZoom >= 12;
        
        // Update borders for all loaded trails
        if (window.loadedTrails) {
            window.loadedTrails.forEach(function(trail) {
                // Check if trail should be visible based on difficulty checkboxes
                const isTrailVisible = shouldTrailBeVisible(trail);
                // Border is visible only if: zoom >= 12 AND trail should be visible
                const visibility = (showBorders && isTrailVisible) ? 'visible' : 'none';
                
                if (trailData[trail].coordinates.main) {
                    // Handle split trails
                    ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                        const borderLayerId = `${trail}-${pathType}-layer-border`;
                        if (map.getLayer(borderLayerId)) {
                            map.setLayoutProperty(borderLayerId, 'visibility', visibility);
                        }
                    });
                } else {
                    // Handle regular trails
                    const borderLayerId = `${trail}-layer-border`;
                    if (map.getLayer(borderLayerId)) {
                        map.setLayoutProperty(borderLayerId, 'visibility', visibility);
                    }
                }
            });
        }
    }
    
    // Function to update all trail coordinates based on current zoom level
    // OPTIMIZED: Only update loaded trails (not all trails)
    function updateTrailCoordinatesForZoom() {
        const currentZoom = map.getZoom();
        
        // Only update trails that are currently loaded (much faster!)
        if (!window.loadedTrails || window.loadedTrails.size === 0) {
            return; // No trails loaded, nothing to update
        }
        
        window.loadedTrails.forEach(function(trail) {
            // Skip if trail data doesn't exist
            if (!trailData[trail]) return;
            
            // Trail is visible, proceed with update
            if (trailData[trail].coordinates.main) {
                // Handle split trails
                ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                    const sourceId = `${trail}-${pathType}`;
                    const source = map.getSource(sourceId);
                    if (source) {
                    // Get original coordinates and re-process them
                    const originalCoords = trailData[trail].coordinates[pathType];
                    const processedCoords = processTrailCoordinates(originalCoords, currentZoom);
                    
                    // IMPORTANT: Preserve properties (trailColor) when updating coordinates
                    const currentData = source._data;
                    const existingProperties = currentData && currentData.properties ? currentData.properties : {};
                    
                    // Ensure trailColor is preserved (or set if missing)
                    const trailColor = existingProperties.trailColor || trailData[trail].color;
                    
                    // Update the source data (preserve properties!)
                    source.setData({
                        type: 'Feature',
                        properties: {
                            trailColor: trailColor
                        },
                        geometry: {
                            type: 'LineString',
                            coordinates: processedCoords
                        }
                    });
                    }
                });
            } else {
                // Handle regular trails
                const source = map.getSource(trail);
                if (source) {
                    // Get original coordinates and re-process them
                    const originalCoords = trailData[trail].coordinates;
                    const processedCoords = processTrailCoordinates(originalCoords, currentZoom);
                    
                    // IMPORTANT: Preserve properties (trailColor) when updating coordinates
                    const currentData = source._data;
                    const existingProperties = currentData && currentData.properties ? currentData.properties : {};
                    
                    // Ensure trailColor is preserved (or set if missing)
                    const trailColor = existingProperties.trailColor || trailData[trail].color;
                    
                    // Update the source data (preserve properties!)
                    source.setData({
                        type: 'Feature',
                        properties: {
                            trailColor: trailColor
                        },
                        geometry: {
                            type: 'LineString',
                            coordinates: processedCoords
                        }
                    });
                }
            }
        });
    }
    
    // Track the last zoom level to only update when crossing thresholds
    let lastZoomLevel = map.getZoom();
    let isZooming = false;
    
    // Function to determine which simplification level based on zoom
    function getSimplificationLevel(zoom) {
        if (zoom < 10) return 'straight';
        if (zoom < 11.5) return 'third';
        if (zoom < 12) return 'half';
        return 'full';
    }
    
    // Mark when zoom starts - don't update during zoom animation
    map.on('zoomstart', function() {
        isZooming = true;
    });
    
    // Only update when zoom completely stops - this prevents lag during scrolling
    let zoomEndTimeout;
    map.on('zoomend', function() {
        isZooming = false;
        const currentZoom = map.getZoom();
        
        // Clear any pending updates
        clearTimeout(zoomEndTimeout);
        
        // Add delay to avoid updating during tilt/pan animations
        zoomEndTimeout = setTimeout(function() {
            const currentLevel = getSimplificationLevel(currentZoom);
            const lastLevel = getSimplificationLevel(lastZoomLevel);
            
            // Update border visibility based on zoom (quick operation)
            updateBorderVisibility();
            
            // Only update if we crossed a threshold or zoomed significantly (0.5 for less frequent updates)
            if (currentLevel !== lastLevel || Math.abs(currentZoom - lastZoomLevel) > 0.5) {
                // Use requestIdleCallback if available, otherwise requestAnimationFrame with delay
                if (window.requestIdleCallback) {
                    requestIdleCallback(function() {
                        updateTrailCoordinatesForZoom();
                        lastZoomLevel = currentZoom;
                    }, { timeout: 2500 }); // Longer timeout to wait for idle
                } else {
                    // Use setTimeout to delay even requestAnimationFrame
                    setTimeout(function() {
                        requestAnimationFrame(function() {
                            updateTrailCoordinatesForZoom();
                            lastZoomLevel = currentZoom;
                        });
                    }, 400); // Increased delay to let tilt/pan finish
                }
            } else {
                lastZoomLevel = currentZoom;
            }
        }, 900); // Increased to 900ms to reduce update frequency during fast scrolling
    });

    // Update trail colors and border visibility on initial load
    // Delay to ensure all layers are fully created
    setTimeout(function() {
        updateTrailColors();
        updateBorderVisibility(); // Set initial border visibility based on zoom
    }, 500);

    // Initialize checkboxes to match visible state (everything is visible by default)
    const trailsCheckbox = document.getElementById('toggleTrails');
    if (trailsCheckbox && trailsCheckbox.checked) {
        const difficultyDropdown = trailsCheckbox.parentElement.querySelector('.difficulty-dropdown');
        if (difficultyDropdown) {
            difficultyDropdown.style.display = 'block';
        }
    }

    // Initialize Mountain Features dropdown
    const featuresCheckbox = document.getElementById('toggleFeatures');
    if (featuresCheckbox && featuresCheckbox.checked) {
        const difficultyDropdown = featuresCheckbox.parentElement.querySelector('.difficulty-dropdown');
        if (difficultyDropdown) {
            difficultyDropdown.style.display = 'block';
        }
    }

    // Set up Toggle Menu button event listener
    const mainToggle = document.getElementById('mainToggle');
    if (mainToggle) {
        mainToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleDropdown();
        });
    }
});

// Toggle functions
function toggleTrails() {
    if (navigationActive) {
        console.log('Navigation is active, toggle disabled');
        return; // Don't do anything if navigation is active
    }
    trailsVisible = !trailsVisible;
    console.log('Toggling trails:', trailsVisible);
    
    // Update the checkbox state to keep it in sync
    const trailsCheckbox = document.getElementById('toggleTrails');
    if (trailsCheckbox) {
        trailsCheckbox.checked = trailsVisible;
        // Show/hide difficulty dropdown based on checkbox state
        const difficultyDropdown = trailsCheckbox.parentElement.querySelector('.difficulty-dropdown');
        if (difficultyDropdown) {
            difficultyDropdown.style.display = trailsVisible ? 'block' : 'none';
        }
    }
    
    // Use the helper function to determine visibility for each trail
    // This ensures borders and main layers respect both main toggle and difficulty checkboxes
    const trailsToCheck = window.loadedTrails ? Array.from(window.loadedTrails) : Object.keys(trailData);
    
    trailsToCheck.forEach(trail => {
        if (!trailData[trail]) return;
        
        const isVisible = shouldTrailBeVisible(trail);
        
        if (trailData[trail].coordinates.main) {
            // Handle split trails - all trails now have border and main layers
            ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                const borderLayerId = `${trail}-${pathType}-layer-border`;
                const mainLayerId = `${trail}-${pathType}-layer`;
                if (map.getLayer(borderLayerId)) {
                    map.setLayoutProperty(borderLayerId, 'visibility', isVisible ? 'visible' : 'none');
                }
                if (map.getLayer(mainLayerId)) {
                    map.setLayoutProperty(mainLayerId, 'visibility', isVisible ? 'visible' : 'none');
                }
            });
        } else {
            // Handle regular trails - all trails now have border and main layers
            const borderLayerId = `${trail}-layer-border`;
            const mainLayerId = `${trail}-layer`;
            if (map.getLayer(borderLayerId)) {
                map.setLayoutProperty(borderLayerId, 'visibility', isVisible ? 'visible' : 'none');
            }
            if (map.getLayer(mainLayerId)) {
                map.setLayoutProperty(mainLayerId, 'visibility', isVisible ? 'visible' : 'none');
            }
        }
    });
}


function toggleLifts() {
    const liftsCheckbox = document.getElementById('toggleLifts');
    liftsVisible = liftsCheckbox ? liftsCheckbox.checked : true;
    Object.keys(liftData).forEach(function(lift) {
        map.setLayoutProperty(`${lift}-layer`, 'visibility', liftsVisible ? 'visible' : 'none');
    });
}

function toggleMountainCams() {
    const camsCheckbox = document.getElementById('toggleCams');
    mountainCamsVisible = camsCheckbox ? camsCheckbox.checked : false;
    liveFeedMarkers.forEach(function(marker) {
        if (mountainCamsVisible) {
            // Add marker to map if it's not already there
            if (!marker._map) {
                marker.addTo(map);
            }
            marker.getElement().style.display = 'block';
        } else {
            // Remove marker from map
            marker.remove();
            marker.getElement().style.display = 'none';
        }
    });
}

// Add this near your other toggle functions
function toggleTrailAdjustment() {
    const trailMarkers = [];
    
    Object.keys(trailData).forEach(function(trail) {
        const trailInfo = trailData[trail];
        
        // Filter: Only pink trails (trails you're currently working on)
        // Check if trail color is pink (common pink/magenta color codes)
        const trailColor = trailInfo.color ? trailInfo.color.toLowerCase() : '';
        // Common pink colors: #FF00FF (magenta), #FF69B4 (hot pink), #FFC0CB (pink), #FF1493 (deep pink)
        const isPink = trailColor === '#ff00ff' || 
                      trailColor === '#ff69b4' || 
                      trailColor === '#ffc0cb' ||
                      trailColor === '#ff1493' ||
                      trailColor === 'pink' ||
                      (trailColor.startsWith('#ff') && (trailColor.includes('c0') || trailColor.includes('69') || trailColor.includes('00ff')));
        
        if (!isPink) {
            return; // Skip non-pink trails
        }
        
        // Check if trail has split paths
        if (trailInfo.coordinates.main) {
            // Handle split trail
            ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                let points = trailInfo.coordinates[pathType];
                
                // Create markers for all points
                const markers = points.map((point, index) => {
                    // Green for start, blue for mids, red for end
                    const color = index === 0 ? '#00ff00' : 
                                 index === points.length - 1 ? '#ff0000' : '#0000ff';
                    
                    return new mapboxgl.Marker({ draggable: true, color: color })
                        .setLngLat(point)
                        .addTo(map);
                });
                
                trailMarkers.push(...markers);

                // Update coordinates when any marker is dragged
                function updateTrail() {
                    const newCoords = markers.map(marker => marker.getLngLat().toArray());
                    trailData[trail].coordinates[pathType] = newCoords;
                    
                    const sourceName = `${trail}-${pathType}`;
                    console.log("Attempting to update source:", sourceName);
                    
                    const source = map.getSource(sourceName);
                    if (source) {
                        // Preserve existing properties (trailColor, hasVideo) if they exist
                        const currentData = source._data;
                        const existingProperties = currentData && currentData.properties ? currentData.properties : {};
                        const trailColor = existingProperties.trailColor || trailData[trail].color;
                        const hasVideo = existingProperties.hasVideo || false;
                        
                        source.setData({
                            type: 'Feature',
                            properties: {
                                trailColor: trailColor,
                                hasVideo: hasVideo
                            },
                            geometry: {
                                type: 'LineString',
                                coordinates: newCoords
                            }
                        });
                        // Format coordinates with each pair on its own line
                        const formattedCoords = newCoords.map(coord => `        [${coord[0]}, ${coord[1]}]`).join(',\n');
                        console.log(`${trail} ${pathType} new coordinates:\n    [\n${formattedCoords}\n    ]`);
                    } else {
                        console.warn(`Source not found: ${sourceName} - trail may not be loaded in viewport. Loading trail now...`);
                        // Load the trail if it's not already loaded
                        if (typeof loadTrail === 'function') {
                            loadTrail(trail);
                            if (!window.loadedTrails) window.loadedTrails = new Set();
                            window.loadedTrails.add(trail);
                            // Try updating again after a short delay
                            setTimeout(() => {
                                const source = map.getSource(sourceName);
                                if (source) {
                                    const trailColor = trailData[trail].color;
                                    source.setData({
                                        type: 'Feature',
                                        properties: {
                                            trailColor: trailColor
                                        },
                                        geometry: {
                                            type: 'LineString',
                                            coordinates: newCoords
                                        }
                                    });
                                }
                            }, 100);
                        }
                    }
                }

                markers.forEach(marker => marker.on('dragend', updateTrail));
            });
        } else {
            // Handle regular trail (existing code)
            let points = [...trailInfo.coordinates];
            
            const markers = points.map((point, index) => {
                const color = index === 0 ? '#00ff00' : 
                             index === points.length - 1 ? '#ff0000' : '#0000ff';
                
                return new mapboxgl.Marker({ draggable: true, color: color })
                    .setLngLat(point)
                    .addTo(map);
            });
            
            trailMarkers.push(...markers);

            function updateTrail() {
                const newCoords = markers.map(marker => marker.getLngLat().toArray());
                trailData[trail].coordinates = newCoords;
                
                // Check if source exists before updating (might not be loaded due to viewport-based loading)
                const source = map.getSource(trail);
                if (source) {
                    // Preserve existing properties (trailColor, hasVideo) if they exist
                    const currentData = source._data;
                    const existingProperties = currentData && currentData.properties ? currentData.properties : {};
                    const trailColor = existingProperties.trailColor || trailData[trail].color;
                    const hasVideo = existingProperties.hasVideo || false;
                    
                    source.setData({
                        type: 'Feature',
                        properties: {
                            trailColor: trailColor,
                            hasVideo: hasVideo
                        },
                        geometry: {
                            type: 'LineString',
                            coordinates: newCoords
                        }
                    });
                    // Format coordinates with each pair on its own line
                    const formattedCoords = newCoords.map(coord => `        [${coord[0]}, ${coord[1]}]`).join(',\n');
                    console.log(`${trail} new coordinates:\n    [\n${formattedCoords}\n    ]`);
                } else {
                    console.warn(`Source not found for ${trail} - trail may not be loaded in viewport. Loading trail now...`);
                    // Load the trail if it's not already loaded
                    if (typeof loadTrail === 'function') {
                        loadTrail(trail);
                        if (!window.loadedTrails) window.loadedTrails = new Set();
                        window.loadedTrails.add(trail);
                        // Try updating again after a short delay
                        setTimeout(() => {
                            const source = map.getSource(trail);
                            if (source) {
                                const trailColor = trailData[trail].color;
                                source.setData({
                                    type: 'Feature',
                                    properties: {
                                        trailColor: trailColor
                                    },
                                    geometry: {
                                        type: 'LineString',
                                        coordinates: newCoords
                                    }
                                });
                            }
                        }, 100);
                    }
                }
            }

            markers.forEach(marker => marker.on('dragend', updateTrail));
        }
    });

}

function toggleDropdown() {
    const dropdown = document.getElementById('mainDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close dropdown if user clicks outside
window.onclick = function(event) {
    const mainToggle = document.getElementById('mainToggle');
    const mainDropdown = document.getElementById('mainDropdown');
    
    // Don't close if clicking on the toggle button or inside the dropdown
    if (mainToggle && (event.target === mainToggle || mainToggle.contains(event.target))) {
        return;
    }
    if (mainDropdown && (event.target === mainDropdown || mainDropdown.contains(event.target))) {
        return;
    }
    
    // Close all dropdowns if clicking outside
    const dropdowns = document.getElementsByClassName('dropdown-content');
    for (let dropdown of dropdowns) {
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
}

// Function to setup custom video button event listeners
function setupCustomVideoButtons(trailId, popup) {
    // Wait a bit longer for the popup DOM to be ready
    setTimeout(() => {
        // Upload button - use event delegation on the popup container
        const popupContainer = popup._container || popup._content || document.querySelector('.mapboxgl-popup-content');
        if (popupContainer) {
            // Remove any existing listeners by cloning
            const uploadBtn = popupContainer.querySelector('#uploadCustomVideoBtn');
            if (uploadBtn) {
                // Remove old listener and add new one
                const newUploadBtn = uploadBtn.cloneNode(true);
                uploadBtn.parentNode.replaceChild(newUploadBtn, uploadBtn);
                
                newUploadBtn.addEventListener('click', async function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Upload button clicked for trail:', trailId);
                    
                    // First, get the video URL
                    const videoUrl = prompt('Paste your YouTube video URL:');
                    if (!videoUrl) {
                        return; // User cancelled
                    }
                    
                    // Show category selection modal
                    const categoryModal = document.getElementById('videoCategoryModal');
                    if (!categoryModal) {
                        // Fallback to old behavior if modal doesn't exist
                        if (window.customVideos && window.customVideos.saveCustomVideo) {
                            try {
                                await window.customVideos.saveCustomVideo(trailId, videoUrl);
                                alert('Video saved successfully!');
                                const newContent = generatePopupContent(trailId);
                                popup.setHTML(newContent);
                                setTimeout(() => {
                                    setupCustomVideoButtons(trailId, popup);
                                }, 100);
                                updateVideoMarkers();
                            } catch (error) {
                                alert('Error saving video: ' + error.message);
                                console.error('Error saving video:', error);
                            }
                        }
                        return;
                    }
                    
                    // Reset checkboxes (default to misc checked)
                    document.querySelectorAll('#categoryCheckboxes input[type="checkbox"]').forEach(cb => {
                        cb.checked = cb.value === 'misc';
                    });
                    
                    // Show modal
                    categoryModal.style.display = 'block';
                    
                    // Set up modal handlers
                    const closeModal = () => {
                        categoryModal.style.display = 'none';
                    };
                    
                    const confirmBtn = document.getElementById('confirmCategorySelection');
                    const cancelBtn = document.getElementById('cancelCategorySelection');
                    const closeBtn = document.getElementById('closeCategoryModal');
                    
                    if (!confirmBtn || !cancelBtn || !closeBtn) {
                        console.error('Modal buttons not found, using fallback');
                        // Fallback to old behavior
                        if (window.customVideos && window.customVideos.saveCustomVideo) {
                            try {
                                await window.customVideos.saveCustomVideo(trailId, videoUrl);
                                alert('Video saved successfully!');
                                const newContent = generatePopupContent(trailId);
                                popup.setHTML(newContent);
                                setTimeout(() => {
                                    setupCustomVideoButtons(trailId, popup);
                                }, 100);
                                updateVideoMarkers();
                            } catch (error) {
                                alert('Error saving video: ' + error.message);
                                console.error('Error saving video:', error);
                            }
                        }
                        return;
                    }
                    
                    // Remove old listeners by cloning
                    const newConfirmBtn = confirmBtn.cloneNode(true);
                    const newCancelBtn = cancelBtn.cloneNode(true);
                    const newCloseBtn = closeBtn.cloneNode(true);
                    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
                    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
                    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
                    
                    // Confirm button handler
                    newConfirmBtn.addEventListener('click', async function() {
                        // Get selected categories
                        const selectedCategories = [];
                        document.querySelectorAll('#categoryCheckboxes input[type="checkbox"]:checked').forEach(cb => {
                            selectedCategories.push(cb.value);
                        });
                        
                        // Ensure at least one category is selected
                        if (selectedCategories.length === 0) {
                            alert('Please select at least one category.');
                            return;
                        }
                        
                        closeModal();
                        
                        if (window.customVideos && window.customVideos.saveCustomVideo) {
                            try {
                                await window.customVideos.saveCustomVideo(trailId, videoUrl, selectedCategories);
                                alert('Video saved successfully with categories: ' + selectedCategories.join(', '));
                                // Refresh popup content
                                const newContent = generatePopupContent(trailId);
                                popup.setHTML(newContent);
                                setTimeout(() => {
                                    setupCustomVideoButtons(trailId, popup);
                                }, 100);
                                // Update video markers when video is added
                                updateVideoMarkers();
                            } catch (error) {
                                alert('Error saving video: ' + error.message);
                                console.error('Error saving video:', error);
                            }
                        }
                    });
                    
                    // Cancel/close handlers
                    newCancelBtn.addEventListener('click', closeModal);
                    newCloseBtn.addEventListener('click', closeModal);
                    
                    // Close on outside click
                    categoryModal.addEventListener('click', function(e) {
                        if (e.target === categoryModal) {
                            closeModal();
                        }
                    });
                });
            }
            
            // Remove button
            const removeBtn = popupContainer.querySelector('#removeCustomVideoBtn');
            if (removeBtn) {
                // Remove old listener and add new one
                const newRemoveBtn = removeBtn.cloneNode(true);
                removeBtn.parentNode.replaceChild(newRemoveBtn, removeBtn);
                
                newRemoveBtn.addEventListener('click', async function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Remove button clicked for trail:', trailId);
                    if (confirm('Are you sure you want to remove your custom video?')) {
                        try {
                            await window.customVideos.deleteCustomVideo(trailId);
                            alert('Video removed successfully!');
                            // Refresh popup content
                            const newContent = generatePopupContent(trailId);
                            popup.setHTML(newContent);
                            setTimeout(() => {
                                setupCustomVideoButtons(trailId, popup);
                            }, 100);
                            // Update video markers when video is removed
                            updateVideoMarkers();
                        } catch (error) {
                            alert('Error removing video: ' + error.message);
                            console.error('Error removing video:', error);
                        }
                    }
                });
            }
        } else {
            console.warn('Popup container not found for setting up buttons');
        }
    }, 200); // Increased delay to ensure DOM is ready
}

// Function to generate popup content with custom video support
function generatePopupContent(trailId) {
    // Check if user has a custom video for this trail (from Firebase)
    const customVideo = window.customVideos && window.customVideos.getCustomVideo ? window.customVideos.getCustomVideo(trailId) : null;
    const userAuth = window.userAuth;
    const isLoggedIn = userAuth && userAuth.currentUser;
    
    // Get base popup content (generic video) - ALWAYS use generic video for trail popups
    // Custom videos only appear when clicking the icon, not when clicking the trail
    let content = trailPopups[trailId] ? trailPopups[trailId].content : 
                  `<strong>${trailId}</strong><br>Difficulty: ${trailData[trailId] ? trailData[trailId].difficulty : 'Unknown'}`;
    
    // Only use Firebase custom videos (not hardcoded ones - those are for icon clicks only)
    // Hardcoded custom videos are shown via icon popups, not trail popups
    let videoToUse = null;
    if (customVideo && customVideo.videoId) {
        // Use Firebase custom video (if available)
        videoToUse = customVideo;
    }
    
    // If we have a Firebase custom video to use, replace the iframe
    if (videoToUse) {
        // Find and replace the iframe in the content
        const iframeRegex = /<iframe[^>]*>.*?<\/iframe>/gi;
        
        // Extract video ID from URL
        let videoId = null;
        let startTime = 0;
        
        if (videoToUse.videoUrl) {
            // Extract video ID from various YouTube URL formats
            const url = videoToUse.videoUrl;
            const patterns = [
                /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
                /youtube\.com\/shorts\/([^&\n?#]+)/,
            ];
            for (const pattern of patterns) {
                const match = url.match(pattern);
                if (match && match[1]) {
                    videoId = match[1];
                    break;
                }
            }
            startTime = videoToUse.startTime || 0;
        } else if (videoToUse.videoId) {
            videoId = videoToUse.videoId;
            startTime = videoToUse.startTime || 0;
        }
        
        if (videoId) {
            // Check if it's a Shorts video (vertical) - use vertical dimensions, otherwise use standard
            const isShorts = videoToUse.videoUrl && videoToUse.videoUrl.includes('/shorts/');
            const iframeWidth = isShorts ? '240' : '480';
            const iframeHeight = isShorts ? '427' : '270';
            const startParam = startTime > 0 ? `&start=${startTime}` : '';
            const newIframe = `<iframe width='${iframeWidth}' height='${iframeHeight}' src='https://www.youtube.com/embed/${videoId}?enablejsapi=1&hd=1${startParam}' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>`;
            content = content.replace(iframeRegex, newIframe);
        }
    }
    
    // Add custom video buttons if user is logged in
    if (isLoggedIn) {
        let buttonsHtml = '<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ccc;">';
        
        if (customVideo) {
            // Show remove button
            buttonsHtml += `<button id="removeCustomVideoBtn" style="background-color: #dc3545; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px; margin-right: 5px;">Remove Video</button>`;
        } else {
            // Show upload button
            buttonsHtml += `<button id="uploadCustomVideoBtn" style="background-color: #28a745; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">Upload Custom Video</button>`;
        }
        
        buttonsHtml += '</div>';
        content += buttonsHtml;
    }
    
    return content;
}

// Function to update trail colors using GPU-accelerated source updates
// Instead of updating each layer individually, we update the SOURCE data (much faster!)
// The GPU expression ['get', 'trailColor'] automatically reads the new color
function updateTrailColors() {
    console.log('Updating trail colors (GPU-accelerated via source updates)...');
    
    // Only update trails that are currently loaded
    const trailsToUpdate = window.loadedTrails ? Array.from(window.loadedTrails) : Object.keys(trailData);
    let updatedCount = 0;
    
    trailsToUpdate.forEach(function(trail) {
        const trailColor = trailData[trail].color;
        const hasVideo = window.customVideos && window.customVideos.getCustomVideo ? 
            (window.customVideos.getCustomVideo(trail) !== null) : false;
        
        try {
            if (trailData[trail].coordinates.main) {
                // Handle split trails - update all 3 sources
                ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                    const sourceId = `${trail}-${pathType}`;
                    const source = map.getSource(sourceId);
                    if (source) {
                        // Update source data - GPU expression automatically picks up new color!
                        const currentData = source._data;
                        if (currentData && currentData.geometry) {
                            source.setData({
                                type: 'Feature',
                                properties: {
                                    hasVideo: hasVideo,
                                    trailColor: trailColor  // Update color in properties
                                },
                                geometry: currentData.geometry
                            });
                            updatedCount++;
                        }
                    }
                });
            } else {
                // Handle regular trails - update source
                const source = map.getSource(trail);
                if (source) {
                    const currentData = source._data;
                    if (currentData && currentData.geometry) {
                        source.setData({
                            type: 'Feature',
                            properties: {
                                hasVideo: hasVideo,
                                trailColor: trailColor  // Update color in properties
                            },
                            geometry: currentData.geometry
                        });
                        updatedCount++;
                    }
                }
            }
        } catch (e) {
            console.warn(`Error updating color for ${trail}:`, e);
        }
    });
    console.log(`Trail colors updated (GPU-accelerated): ${updatedCount} sources updated`);
}

// Helper function to determine if a trail should be visible based on its difficulty checkbox
function shouldTrailBeVisible(trail) {
    if (!trailData[trail]) return false;
    
    // First check if the main "Trails" checkbox is checked
    const mainTrailsCheckbox = document.getElementById('toggleTrails');
    if (!mainTrailsCheckbox || !mainTrailsCheckbox.checked) {
        return false; // Main trails toggle is off, so no trails should be visible
    }
    
    const trailDifficulty = trailData[trail].difficulty;
    const isExtreme = trailDifficulty === 'extreme' || trailData[trail].isExtreme === true;
    const isDoubleBlack = trailDifficulty === 'doubleBlack' || trailData[trail].isDoubleBlack === true;
    const isTerrainPark = trailDifficulty === 'terrainPark' || trailData[trail].isTerrainPark === true;
    
    // Get the checkbox that controls this trail's visibility
    let checkbox = null;
    if (isExtreme) {
        checkbox = document.getElementById('toggleExtremeTrails');
    } else if (isDoubleBlack) {
        checkbox = document.getElementById('toggleDoubleBlackTrails');
    } else if (isTerrainPark) {
        checkbox = document.getElementById('toggleTerrainParkTrails');
    } else {
        const checkboxId = `toggle${trailDifficulty.charAt(0).toUpperCase() + trailDifficulty.slice(1)}Trails`;
        checkbox = document.getElementById(checkboxId);
    }
    
    // Only show if the specific difficulty checkbox is checked
    return checkbox ? checkbox.checked : false;
}

function toggleTrailsByDifficulty(difficulty) {
    // OPTIMIZED: Only update loaded trails (not all 200+ trails)
    const trailsToCheck = window.loadedTrails ? Array.from(window.loadedTrails) : Object.keys(trailData);
    
    trailsToCheck.forEach(trail => {
        if (!trailData[trail]) return;
        
        // Use helper function to determine visibility
        const isVisible = shouldTrailBeVisible(trail);
        
        // Update visibility for both main and border layers
        if (trailData[trail].coordinates.main) {
            // Handle split trail visibility
            ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                const borderLayerId = `${trail}-${pathType}-layer-border`;
                const mainLayerId = `${trail}-${pathType}-layer`;
                if (map.getLayer(borderLayerId)) {
                    map.setLayoutProperty(borderLayerId, 'visibility', isVisible ? 'visible' : 'none');
                }
                if (map.getLayer(mainLayerId)) {
                    map.setLayoutProperty(mainLayerId, 'visibility', isVisible ? 'visible' : 'none');
                }
            });
        } else {
            // Handle regular trail visibility
            const borderLayerId = `${trail}-layer-border`;
            const mainLayerId = `${trail}-layer`;
            if (map.getLayer(borderLayerId)) {
                map.setLayoutProperty(borderLayerId, 'visibility', isVisible ? 'visible' : 'none');
            }
            if (map.getLayer(mainLayerId)) {
                map.setLayoutProperty(mainLayerId, 'visibility', isVisible ? 'visible' : 'none');
            }
        }
    });
}

function toggleLiftAdjustment() {
    console.log("Lift adjustment clicked");
    
    // Look specifically for lift layers
    const liftLayers = [
        'Orient-layer',
        'Wapiti-layer',
        'Test1-layer',
        'Mongolia-layer',
        'HighNoonExpress-layer',
        'SunUpExpress-layer',
        'Teacupexpress-layer'
    ];
    
    liftLayers.forEach(function(liftId) {
        if (map.getLayer(liftId)) {
            const source = map.getSource(liftId.replace('-layer', ''));
            if (source && source._data) {
                console.log(`Processing lift: ${liftId}`);
                const coordinates = source._data.geometry.coordinates;
                
                // Create start marker (green)
                const startMarker = new mapboxgl.Marker({
                    draggable: true,
                    color: '#00ff00'
                })
                    .setLngLat(coordinates[0])
                    .addTo(map);
                
                // Create end marker (red)
                const endMarker = new mapboxgl.Marker({
                    draggable: true,
                    color: '#ff0000'
                })
                    .setLngLat(coordinates[coordinates.length - 1])
                    .addTo(map);
                
                // Update lift position when markers are dragged
                function updateLift() {
                    const newCoords = [
                        startMarker.getLngLat().toArray(),
                        endMarker.getLngLat().toArray()
                    ];
                    source.setData({
                        type: 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates: newCoords
                        }
                    });
                    // Format coordinates with each pair on its own line
                    const formattedCoords = newCoords.map(coord => `        [${coord[0]}, ${coord[1]}]`).join(',\n');
                    console.log(`${liftId} new coordinates:\n    [\n${formattedCoords}\n    ]`);
                }
                
                startMarker.on('dragend', updateLift);
                endMarker.on('dragend', updateLift);
            }
        }
    });
    

}

// Add these event listeners after your map initialization code
document.getElementById('mainToggle').addEventListener('click', function() {
    const dropdown = document.getElementById('mainDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
});

// Handle Trails toggle
document.getElementById('toggleTrails').addEventListener('change', function() {
    const difficultyDropdown = this.parentElement.querySelector('.difficulty-dropdown');
    difficultyDropdown.style.display = this.checked ? 'block' : 'none';
    
    // If unchecked, uncheck all difficulty options (including "All")
    if (!this.checked) {
        const allTrailsCheckbox = document.getElementById('toggleAllTrails');
        if (allTrailsCheckbox) {
            allTrailsCheckbox.checked = false;
        }
        difficultyDropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            if (cb.id === 'toggleAllTrails') return; // Skip "All" checkbox (already handled above)
            cb.checked = false;
            // Handle camelCase for DoubleBlack, Extreme, and TerrainPark
            let difficulty = cb.id.replace('toggle', '').replace('Trails', '');
            if (difficulty === 'DoubleBlack') {
                difficulty = 'doubleBlack';
            } else if (difficulty === 'Extreme') {
                difficulty = 'extreme';
            } else if (difficulty === 'TerrainPark') {
                difficulty = 'terrainPark';
            } else {
                difficulty = difficulty.toLowerCase();
            }
            toggleTrailsByDifficulty(difficulty);
        });
    } else {
        // If checked, ensure "All" checkbox reflects the state of individual checkboxes
        const allTrailsCheckbox = document.getElementById('toggleAllTrails');
        if (allTrailsCheckbox) {
            const allDifficulties = ['Green', 'Blue', 'Black', 'DoubleBlack', 'Extreme', 'TerrainPark'];
            const allChecked = allDifficulties.every(diff => {
                const cb = document.getElementById(`toggle${diff}Trails`);
                return cb && cb.checked;
            });
            allTrailsCheckbox.checked = allChecked;
        }
    }
});

// Add event listener for "All" checkbox (master toggle for all trail difficulties)
const allTrailsCheckbox = document.getElementById('toggleAllTrails');
if (allTrailsCheckbox) {
    allTrailsCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        // Toggle all difficulty checkboxes
        ['Green', 'Blue', 'Black', 'DoubleBlack', 'Extreme', 'TerrainPark'].forEach(difficulty => {
            const checkbox = document.getElementById(`toggle${difficulty}Trails`);
            if (checkbox) {
                checkbox.checked = isChecked;
                // Trigger change event to update trails
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    });
}

// Add event listeners for individual difficulty checkboxes
// When any difficulty checkbox changes, update ALL loaded trails to respect current checkbox states
['Green', 'Blue', 'Black', 'DoubleBlack', 'Extreme', 'TerrainPark'].forEach(difficulty => {
    const checkbox = document.getElementById(`toggle${difficulty}Trails`);
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            // Update all loaded trails to respect current checkbox states
            const trailsToCheck = window.loadedTrails ? Array.from(window.loadedTrails) : Object.keys(trailData);
            trailsToCheck.forEach(trail => {
                if (!trailData[trail]) return;
                const isVisible = shouldTrailBeVisible(trail);
                const currentZoom = map.getZoom();
                
                if (trailData[trail].coordinates.main) {
                    ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                        const borderLayerId = `${trail}-${pathType}-layer-border`;
                        const mainLayerId = `${trail}-${pathType}-layer`;
                        if (map.getLayer(borderLayerId)) {
                            // Border visible only if zoom >= 12 AND trail should be visible
                            const borderVisible = (currentZoom >= 12 && isVisible) ? 'visible' : 'none';
                            map.setLayoutProperty(borderLayerId, 'visibility', borderVisible);
                        }
                        if (map.getLayer(mainLayerId)) {
                            map.setLayoutProperty(mainLayerId, 'visibility', isVisible ? 'visible' : 'none');
                        }
                    });
                } else {
                    const borderLayerId = `${trail}-layer-border`;
                    const mainLayerId = `${trail}-layer`;
                    if (map.getLayer(borderLayerId)) {
                        // Border visible only if zoom >= 12 AND trail should be visible
                        const borderVisible = (currentZoom >= 12 && isVisible) ? 'visible' : 'none';
                        map.setLayoutProperty(borderLayerId, 'visibility', borderVisible);
                    }
                    if (map.getLayer(mainLayerId)) {
                        map.setLayoutProperty(mainLayerId, 'visibility', isVisible ? 'visible' : 'none');
                    }
                }
            });
            
            // Update "All" checkbox based on individual checkboxes
            const allTrailsCheckbox = document.getElementById('toggleAllTrails');
            if (allTrailsCheckbox) {
                // Check if all individual checkboxes are checked
                const allDifficulties = ['Green', 'Blue', 'Black', 'DoubleBlack', 'Extreme', 'TerrainPark'];
                const allChecked = allDifficulties.every(diff => {
                    const cb = document.getElementById(`toggle${diff}Trails`);
                    return cb && cb.checked;
                });
                allTrailsCheckbox.checked = allChecked;
            }
        });
    }
});

// Main toggle for the Mountain Features section
document.getElementById('toggleFeatures').addEventListener('change', function() {
    console.log("Main features toggle clicked!");
    const difficultyDropdown = this.parentElement.querySelector('.difficulty-dropdown');
    difficultyDropdown.style.display = this.checked ? 'block' : 'none';
    
    // If unchecking main toggle, hide all features
    if (!this.checked) {
        ['green', 'blue', 'black'].forEach(difficulty => {
            const checkbox = document.getElementById(`toggle${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}Features`);
            if (checkbox) {
                checkbox.checked = false;
                hideFeatureMarkers(difficulty);
            }
        });
    }
});

// Individual difficulty toggles for mountain features
['Green', 'Blue', 'Black'].forEach(difficulty => {
    const checkbox = document.getElementById(`toggle${difficulty}Features`);
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            console.log(`${difficulty} features checkbox clicked! Checked:`, this.checked);
            toggleFeaturesByDifficulty(difficulty.toLowerCase(), this.checked);
        });
    }
});

function showFeatureMarkers(difficulty) {
    console.log(`Showing ${difficulty} markers`);
    mountainMarkers.filter(marker => marker.difficulty === difficulty)
        .forEach(marker => marker.addTo(map));
}

function hideFeatureMarkers(difficulty) {
    console.log(`Hiding ${difficulty} markers`);
    mountainMarkers.filter(marker => marker.difficulty === difficulty)
        .forEach(marker => marker.remove());
}

// Handle lifts toggle
document.getElementById('toggleLifts').addEventListener('change', function() {
    toggleLifts();
});

// Add this with your other toggle event listeners
document.getElementById('toggleCams').addEventListener('change', function() {
    // Add your mountain cams toggle logic here
    toggleMountainCams();
});

// My Videos: Update video markers (icons) for trails with custom videos
function updateVideoMarkers() {
    console.log('=== updateVideoMarkers called ===');
    console.log('myVideosMode:', myVideosMode);
    console.log('window.customVideos:', window.customVideos);
    console.log('window.loadedTrails:', window.loadedTrails);
    
    // Sync friend map state from window variables
    syncFriendMapState();
    
    if (!window.customVideos) {
        console.warn('customVideos not available');
        return;
    }
    
    // Remove all existing video markers (but preserve any open popups)
    const markersToKeep = [];
    videoMarkers.forEach(marker => {
        // Don't remove the marker if its popup is open (preserve open popups)
        const popup = marker.getPopup();
        if (popup && popup.isOpen()) {
            // Keep marker if popup is open (whether fullscreen or not)
            console.log('Skipping marker removal - popup is open');
            markersToKeep.push(marker);
            return;
        }
        marker.remove();
    });
    // Keep markers that are in fullscreen
    videoMarkers.length = 0;
    videoMarkers.push(...markersToKeep);
    console.log('Cleared existing video markers');
    
    // Only show markers if My Videos mode is ON OR viewing friend's map
    if (!myVideosMode && !viewingFriendMap) {
        console.log('My Videos mode is OFF and not viewing friend map, not showing markers');
        return;
    }
    
    // Get all trails with custom videos
    let trailsWithVideos = trailsWithVideosHardcoded;
    
    // Check if viewing friend's map
    console.log('Checking friend map state:', { viewingFriendMap, currentFriendId, friendMapView: !!window.friendMapView });
    if (viewingFriendMap && currentFriendId && window.friendMapView) {
        // Load friend's videos
        const friendVideoIds = window.friendMapView.getFriendVideoIds() || [];
        console.log('Friend video IDs:', friendVideoIds);
        console.log('Friend videos cache:', window.friendMapView.getFriendVideos());
        trailsWithVideos = friendVideoIds; // Use only friend's videos when viewing friend map
    } else {
        // If customVideos module is available, merge with hardcoded list (user's own videos)
        if (window.customVideos && window.customVideos.getTrailsWithCustomVideos) {
            const firebaseTrails = window.customVideos.getTrailsWithCustomVideos() || [];
            // Combine and remove duplicates
            trailsWithVideos = [...new Set([...trailsWithVideos, ...firebaseTrails])];
        }
    }
    
    console.log('Trails with custom videos:', trailsWithVideos);
    
    if (!trailsWithVideos || trailsWithVideos.length === 0) {
        console.log('No trails with custom videos found');
        return;
    }
    
    // Create markers - if custom position provided, works standalone (like mountain features)
    // If no custom position, requires trail to exist and be loaded
    let markersCreated = 0;
    let skippedNotLoaded = 0;
    let skippedNoMidpoint = 0;
    
    trailsWithVideos.forEach(trailId => {
        // Check if this video's category is selected
        // First check hardcoded videos, then Firebase videos (user's or friend's)
        let videoData = hardcodedCustomVideosData[trailId];
        let videoCategories = null;
        
        if (videoData) {
            // Hardcoded video - get categories from videoData
            videoCategories = videoData.category || ['misc'];
        } else if (viewingFriendMap && currentFriendId && window.friendMapView) {
            // Friend's Firebase video - get from friend cache
            const friendVideo = window.friendMapView.getFriendVideos()[trailId];
            if (friendVideo) {
                videoData = friendVideo;
                videoCategories = friendVideo.categories || ['misc'];
            }
        } else if (window.customVideos && window.customVideos.getCustomVideo) {
            // User's own Firebase video - get from cache
            const firebaseVideo = window.customVideos.getCustomVideo(trailId);
            if (firebaseVideo) {
                videoData = firebaseVideo;
                // Firebase videos store categories as an array
                videoCategories = firebaseVideo.categories || ['misc'];
            }
        }
        
        if (!videoData || !videoCategories) {
            return; // Skip if no data
        }
        
        // Support both single category (string) and multiple categories (array) - backward compatible
        // Convert single string to array for consistent handling
        if (typeof videoCategories === 'string') {
            videoCategories = [videoCategories];
        }
        // Ensure it's an array
        if (!Array.isArray(videoCategories)) {
            videoCategories = ['misc'];
        }
        
        // Check if ANY of the video's categories match a selected checkbox
        let shouldShow = false;
        for (const category of videoCategories) {
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
            const categoryCheckboxId = `toggle${categoryName}Videos`;
            const categoryCheckbox = document.getElementById(categoryCheckboxId);
            
            if (categoryCheckbox && categoryCheckbox.checked) {
                shouldShow = true;
                break; // Found a matching category, no need to check others
            }
        }
        
        // Only show marker if at least one category checkbox is checked
        if (!shouldShow) {
            return; // Skip this video - no matching category selected
        }
        
        // Get icon position (use custom position if specified, otherwise try trail midpoint)
        let iconPosition = null;
        
        // First check if video has a position field (for uploaded videos - user's or friend's)
        // videoData should already be set above for friend videos
        if (videoData && videoData.position && Array.isArray(videoData.position)) {
            iconPosition = videoData.position;
            console.log('Using video position from videoData:', iconPosition);
        } else if (hardcodedIconPositions[trailId]) {
            // Use custom position (standalone, like mountain features - no trail required!)
            // You can use any name you want (e.g., "Test123", "RockDrop1", etc.)
            iconPosition = hardcodedIconPositions[trailId];
        } else {
            // Fallback: try to get trail midpoint (requires trail to exist and be loaded)
            if (!window.loadedTrails || !window.loadedTrails.has(trailId)) {
                skippedNotLoaded++;
                return;
            }
            if (trailData[trailId]) {
                iconPosition = getTrailMidpoint(trailId);
            } else {
                skippedNoMidpoint++;
                return;
            }
        }
        
        if (!iconPosition) {
            skippedNoMidpoint++;
            return;
        }
        
        // Create video marker
        const videoIcon = createVideoMarker();
        const marker = new mapboxgl.Marker(videoIcon)
            .setLngLat(iconPosition);
        
        // Store trail ID for reference
        marker.trailId = trailId;
        
        // Add click handler to show custom video popup (no text, just video)
               // Check hardcoded, user's Firebase, or friend's Firebase videos
               let customVideo = hardcodedCustomVideos[trailId];
               let videosToShow = [];
               
               if (customVideo) {
                   // Hardcoded video - Support both single video (backward compatible) and multiple videos
                   if (customVideo.videos && Array.isArray(customVideo.videos)) {
                       // Multiple videos format
                       videosToShow = customVideo.videos;
                   } else if (customVideo.videoUrl) {
                       // Single video format (backward compatible)
                       videosToShow = [{
                           videoUrl: customVideo.videoUrl,
                           startTime: customVideo.startTime || 0
                       }];
                   }
               } else if (viewingFriendMap && currentFriendId && window.friendMapView) {
                   // Friend's Firebase video
                   const friendVideo = window.friendMapView.getFriendVideos()[trailId];
                   if (friendVideo && friendVideo.videoUrl) {
                       videosToShow = [{
                           videoUrl: friendVideo.videoUrl,
                           startTime: friendVideo.startTime || 0,
                           isUploadedVideo: friendVideo.isUploadedVideo || false,
                           isFriendVideo: true // Flag to indicate this is a friend's video
                       }];
                   }
               } else if (window.customVideos && window.customVideos.getCustomVideo) {
                   // User's own Firebase video
                   const firebaseVideo = window.customVideos.getCustomVideo(trailId);
                   if (firebaseVideo && firebaseVideo.videoUrl) {
                       videosToShow = [{
                           videoUrl: firebaseVideo.videoUrl,
                           startTime: firebaseVideo.startTime || 0,
                           isUploadedVideo: firebaseVideo.isUploadedVideo || false // Pass this flag
                       }];
                   }
               }
        
        if (videosToShow.length > 0) {
            // Build HTML for all videos
            let videosHTML = '';
            
            // Get video data for delete button check
            let currentVideoData = null;
            if (window.customVideos && window.customVideos.getCustomVideo) {
                currentVideoData = window.customVideos.getCustomVideo(trailId);
            }
            
            videosToShow.forEach((videoData, index) => {
                    const url = videoData.videoUrl;
                    const startTime = videoData.startTime || 0;
                    const isUploadedVideo = videoData.isUploadedVideo || url.includes('firebasestorage.googleapis.com');
                    
                    // Check if this is an uploaded video (Firebase Storage) or YouTube video
                    if (isUploadedVideo) {
                        // Uploaded video - use HTML5 video player (larger size for better viewing)
                        const videoWidth = '400';
                        const videoHeight = '225';
                        videosHTML += `<div style="margin-bottom: ${index < videosToShow.length - 1 ? '16px' : '0'};">
                            <video id="video-player-${trailId}-${index}" width='${videoWidth}' height='${videoHeight}' controls autoplay muted style="width: 100%; max-width: 100%; max-height: 360px; height: auto; border-radius: 5px; display: block;" data-start-time="${startTime}">
                                <source src="${url}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>`;
                    } else {
                        // YouTube video - extract video ID and use iframe
                        let videoId = null;
                        const patterns = [
                            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
                            /youtube\.com\/shorts\/([^&\n?#]+)/,
                        ];
                        for (const pattern of patterns) {
                            const match = url.match(pattern);
                            if (match && match[1]) {
                                videoId = match[1];
                                break;
                            }
                        }
                        
                        if (videoId) {
                            // Check if it's a Shorts video (vertical)
                            const isShorts = url.includes('/shorts/');
                            const iframeWidth = isShorts ? '240' : '400';
                            const iframeHeight = isShorts ? '427' : '225';
                            const startParam = startTime > 0 ? `&start=${startTime}` : '';
                            
                            // Only autoplay if there's a single video (not multiple)
                            const autoplayParam = videosToShow.length === 1 ? '&autoplay=1&mute=1' : '';
                            
                            // Add video iframe
                            videosHTML += `<div style="margin-bottom: ${index < videosToShow.length - 1 ? '16px' : '0'};">
                                <iframe id="video-iframe-${trailId}-${index}" width='${iframeWidth}' height='${iframeHeight}' src='https://www.youtube.com/embed/${videoId}?enablejsapi=1&hd=1${autoplayParam}${startParam}' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen style="width: 100%; max-width: 100%; max-height: 360px; height: auto; display: block;"></iframe>
                            </div>`;
                        }
                    }
                });
                
                // Add delete and pin buttons if this is a user's video (from Firebase)
                if (currentVideoData) {
                    const isPinned = currentVideoData.pinned === true;
                    videosHTML += `<div style="margin-top: 10px; text-align: center; padding-top: 10px; border-top: 1px solid #eee; display: flex; gap: 8px; justify-content: center;">
                        <button id="pinVideoBtn-${trailId}" class="pin-video-button" style="background-color: ${isPinned ? '#ffc107' : '#6c757d'}; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                            ${isPinned ? '📌 Pinned' : '📌 Pin'}
                        </button>
                        <button id="deleteVideoBtn-${trailId}" class="delete-video-button" style="background-color: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                            Delete Video
                        </button>
                    </div>`;
                }
                
                if (videosHTML) {
                    // Simple approach: determine anchor based on icon position
                    const point = map.project(iconPosition);
                    const viewportHeight = map.getCanvas().height;
                    const viewportWidth = map.getCanvas().width;
                    
                    // Determine anchor: if icon in bottom half, popup goes above (anchor: 'bottom')
                    // If icon in top half, popup goes below (anchor: 'top')
                    let anchor = 'bottom'; // Default: popup above icon
                    
                    if (point.y > viewportHeight / 2) {
                        // Icon in bottom half → popup above
                        anchor = 'bottom';
                    } else {
                        // Icon in top half → popup below
                        anchor = 'top';
                    }
                    
                    // Also check horizontal position for edge cases
                    if (point.x > viewportWidth * 0.9) {
                        anchor = 'left';  // Icon far right → popup to left
                    } else if (point.x < viewportWidth * 0.1) {
                        anchor = 'right'; // Icon far left → popup to right
                    }
                    
                    // Create popup with calculated anchor
                    const videoPopup = new mapboxgl.Popup({ 
                        offset: 25,
                        anchor: anchor,      // Position based on icon location
                        closeOnClick: true,   // Close when clicking outside (normal behavior)
                        closeButton: true     // Keep close button so user can still close it
                    })
                        .setHTML(videosHTML);
                    
                    // Prevent popup from closing when clicking inside the popup content
                    videoPopup.on('open', () => {
                        const popupContent = videoPopup._content;
                        if (popupContent) {
                            popupContent.addEventListener('click', (e) => {
                                // Don't stop propagation for buttons - let them handle their own clicks
                                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                                    return; // Let button handle its own click
                                }
                                e.stopPropagation();
                            });
                            
                            // Setup autoplay for uploaded videos
                            const videoElements = popupContent.querySelectorAll('video[data-start-time]');
                            videoElements.forEach((video) => {
                                const startTime = parseFloat(video.getAttribute('data-start-time')) || 0;
                                
                                // Set start time when video metadata is loaded
                                video.addEventListener('loadedmetadata', () => {
                                    if (startTime > 0) {
                                        video.currentTime = startTime;
                                    }
                                });
                                
                                // Ensure autoplay works (some browsers require user interaction first)
                                video.addEventListener('canplay', () => {
                                    video.play().catch(err => {
                                        console.log('Autoplay prevented:', err);
                                        // If autoplay fails, user can still click play
                                    });
                                });
                            });
                        }
                    });
                    
                    // Attach popup to marker
                    marker.setPopup(videoPopup);
                    
                    // Store trailId and videoData on popup for delete button
                    videoPopup.trailId = trailId;
                    videoPopup.videoData = currentVideoData;
                    
                    // Setup delete and pin button handlers if this is a user's video
                    if (currentVideoData) {
                        // Wait for popup to be fully rendered
                        videoPopup.on('open', () => {
                            // Use setTimeout to ensure DOM is ready
                            setTimeout(() => {
                                setupDeleteVideoButton(trailId, videoPopup, currentVideoData);
                                setupPinVideoButton(trailId, videoPopup, currentVideoData);
                            }, 100);
                        });
                        
                        // Also try immediately if popup is already open
                        if (videoPopup.isOpen()) {
                            setTimeout(() => {
                                setupDeleteVideoButton(trailId, videoPopup, currentVideoData);
                                setupPinVideoButton(trailId, videoPopup, currentVideoData);
                            }, 200);
                        }
                    }
                    
                    // Prevent popup from closing when video is in fullscreen
                    // Store a flag to track fullscreen state
                    videoPopup._isFullscreen = false;
                    
                    // Override the remove method to check fullscreen state
                    const originalRemove = videoPopup.remove.bind(videoPopup);
                    videoPopup.remove = function() {
                        // Check if we're in fullscreen (check both document and iframe)
                        const isDocFullscreen = document.fullscreenElement || 
                                               document.webkitFullscreenElement || 
                                               document.mozFullScreenElement || 
                                               document.msFullscreenElement;
                        
                        // Also check if the popup's iframe or any element inside it is fullscreen
                        const popupContainer = this._container;
                        const isPopupFullscreen = popupContainer && (
                            popupContainer === document.fullscreenElement ||
                            popupContainer === document.webkitFullscreenElement ||
                            popupContainer === document.mozFullScreenElement ||
                            popupContainer === document.msFullscreenElement ||
                            popupContainer.contains(document.fullscreenElement) ||
                            popupContainer.contains(document.webkitFullscreenElement) ||
                            popupContainer.contains(document.mozFullScreenElement) ||
                            popupContainer.contains(document.msFullscreenElement)
                        );
                        
                        // Use stored flag or current check
                        const isFullscreen = this._isFullscreen || isDocFullscreen || isPopupFullscreen;
                        
                        // If in fullscreen, don't close the popup
                        if (isFullscreen) {
                            console.log('Preventing popup close - video is in fullscreen');
                            return this; // Return popup instance to maintain chainability
                        }
                        
                        // Not in fullscreen - close normally
                        return originalRemove();
                    };
                    
                    // Listen for fullscreen changes on document (catches iframe fullscreen too)
                    const handleFullscreenChange = () => {
                        const isFullscreen = document.fullscreenElement || 
                                            document.webkitFullscreenElement || 
                                            document.mozFullScreenElement || 
                                            document.msFullscreenElement;
                        
                        // Check if the fullscreen element is inside our popup
                        if (isFullscreen && videoPopup._container) {
                            const isInPopup = videoPopup._container.contains(isFullscreen) || 
                                             isFullscreen === videoPopup._container;
                            videoPopup._isFullscreen = isInPopup;
                        } else {
                            videoPopup._isFullscreen = false;
                        }
                    };
                    
                    // Listen for all fullscreen events
                    document.addEventListener('fullscreenchange', handleFullscreenChange);
                    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
                    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
                    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
                }
            }
        
        // Add to map and array
        marker.addTo(map);
        videoMarkers.push(marker);
        markersCreated++;
    });
    
    console.log(`Created ${markersCreated} video markers`);
    console.log(`Skipped ${skippedNotLoaded} (not loaded), ${skippedNoMidpoint} (no midpoint)`);
    console.log('=== updateVideoMarkers complete ===');
}

// My Pictures: Update picture markers (icons) for custom pictures
function updatePictureMarkers() {
    console.log('=== updatePictureMarkers called ===');
    
    // Sync friend map state from window
    syncFriendMapState();
    console.log('Friend map state synced:', { viewingFriendMap, currentFriendId });
    
    console.log('=== updatePictureMarkers called ===');
    console.log('myPicturesMode:', myPicturesMode);
    console.log('viewingFriendMap:', viewingFriendMap);
    console.log('currentFriendId:', currentFriendId);
    console.log('window.customPictures:', window.customPictures);
    
    if (!window.customPictures && !viewingFriendMap) {
        console.warn('customPictures not available and not viewing friend map');
        return;
    }
    
    // Remove all existing picture markers (but preserve any open popups)
    const markersToKeep = [];
    pictureMarkers.forEach(marker => {
        const popup = marker.getPopup();
        if (popup && popup.isOpen()) {
            console.log('Skipping picture marker removal - popup is open');
            markersToKeep.push(marker);
            return;
        }
        marker.remove();
    });
    pictureMarkers.length = 0;
    pictureMarkers.push(...markersToKeep);
    console.log('Cleared existing picture markers');
    
    // Only show markers if My Pictures mode is ON OR viewing friend's map
    if (!myPicturesMode && !viewingFriendMap) {
        console.log('My Pictures mode is OFF and not viewing friend map, not showing markers');
        return;
    }
    
    // Get all pictures - combine hardcoded and Firebase
    let trailsWithPictures = picturesWithImagesHardcoded || [];
    
    // Check if viewing friend's map
    if (viewingFriendMap && currentFriendId && window.friendMapView) {
        // Load friend's pictures
        const friendPictureIds = window.friendMapView.getFriendPictureIds() || [];
        console.log('Friend picture IDs:', friendPictureIds);
        console.log('Friend pictures cache:', window.friendMapView.getFriendPictures());
        trailsWithPictures = friendPictureIds; // Use only friend's pictures when viewing friend map
    } else {
        // If customPictures module is available, merge with hardcoded list (user's own pictures)
        if (window.customPictures && window.customPictures.getTrailsWithCustomPictures) {
            const firebasePictures = window.customPictures.getTrailsWithCustomPictures() || [];
            trailsWithPictures = [...new Set([...trailsWithPictures, ...firebasePictures])];
        }
    }
    
    console.log('Pictures to display:', trailsWithPictures);
    
    if (!trailsWithPictures || trailsWithPictures.length === 0) {
        console.log('No pictures found');
        return;
    }
    
    let markersCreated = 0;
    let skippedNoPosition = 0;
    
    trailsWithPictures.forEach(pictureId => {
        // Get picture data - check hardcoded first, then Firebase (user's or friend's)
        let pictureData = hardcodedCustomPicturesData[pictureId];
        let iconPosition = null;
        
        if (pictureData) {
            // Hardcoded picture
            iconPosition = hardcodedPicturePositions[pictureId];
        } else if (viewingFriendMap && currentFriendId && window.friendMapView) {
            // Friend's Firebase picture
            const friendPicture = window.friendMapView.getFriendPictures()[pictureId];
            if (friendPicture) {
                pictureData = friendPicture;
                // Friend's pictures have position stored
                if (friendPicture.position && Array.isArray(friendPicture.position)) {
                    iconPosition = friendPicture.position;
                }
            }
        } else if (window.customPictures && window.customPictures.getCustomPicture) {
            // User's own Firebase picture
            const firebasePicture = window.customPictures.getCustomPicture(pictureId);
            if (firebasePicture) {
                pictureData = firebasePicture;
                // Firebase pictures have position stored
                if (firebasePicture.position && Array.isArray(firebasePicture.position)) {
                    iconPosition = firebasePicture.position;
                }
            }
        }
        
        if (!pictureData || !iconPosition) {
            skippedNoPosition++;
            return;
        }
        
        // Create picture marker
        const pictureIcon = createPictureMarker();
        const marker = new mapboxgl.Marker(pictureIcon)
            .setLngLat(iconPosition);
        
        // Store picture ID for reference
        marker.pictureId = pictureId;
        
        // Build popup HTML with image(s)
        let imagesHTML = '';
        
        // Support both single image and multiple images
        if (pictureData.images && Array.isArray(pictureData.images)) {
            // Multiple images
            pictureData.images.forEach((imgData, index) => {
                const imgUrl = imgData.imageUrl || imgData;
                imagesHTML += `<div style="margin-bottom: ${index < pictureData.images.length - 1 ? '16px' : '0'};">
                    <img src="${imgUrl}" alt="Picture ${index + 1}" style="max-width: 400px; max-height: 400px; width: auto; height: auto; border-radius: 5px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <p style="display: none; color: red;">Failed to load image</p>
                </div>`;
            });
        } else {
            // Single image
            const imgUrl = pictureData.imageUrl;
            imagesHTML += `<div>
                <img src="${imgUrl}" alt="Picture" style="max-width: 400px; max-height: 400px; width: auto; height: auto; border-radius: 5px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <p style="display: none; color: red;">Failed to load image</p>
            </div>`;
        }
        
        // Add delete button if this is a user's picture (from Firebase) - not friend's pictures
        const isUserPicture = !viewingFriendMap && window.customPictures && window.customPictures.getCustomPicture && window.customPictures.getCustomPicture(pictureId);
        if (isUserPicture) {
            imagesHTML += `<div style="margin-top: 10px; text-align: center; padding-top: 10px; border-top: 1px solid #eee;">
                <button id="deletePictureBtn-${pictureId}" class="delete-picture-button" style="background-color: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                    Delete Picture
                </button>
            </div>`;
        }
        
        // Create popup
        const point = map.project(iconPosition);
        const viewportHeight = map.getCanvas().height;
        const viewportWidth = map.getCanvas().width;
        
        let anchor = 'bottom';
        if (point.y > viewportHeight / 2) {
            anchor = 'bottom';
        } else {
            anchor = 'top';
        }
        
        if (point.x > viewportWidth * 0.9) {
            anchor = 'left';
        } else if (point.x < viewportWidth * 0.1) {
            anchor = 'right';
        }
        
        const picturePopup = new mapboxgl.Popup({
            offset: 25,
            anchor: anchor,
            closeOnClick: true,
            closeButton: true
        })
            .setHTML(imagesHTML);
        
        // Attach popup to marker
        marker.setPopup(picturePopup);
        
        // Store pictureId and pictureData on popup for delete button
        picturePopup.pictureId = pictureId;
        picturePopup.pictureData = pictureData;
        
        // Setup delete button handler if this is a user's picture
        if (isUserPicture) {
            picturePopup.on('open', () => {
                setTimeout(() => {
                    setupDeletePictureButton(pictureId, picturePopup, pictureData);
                }, 100);
            });
            
            if (picturePopup.isOpen()) {
                setTimeout(() => {
                    setupDeletePictureButton(pictureId, picturePopup, pictureData);
                }, 200);
            }
        }
        
        // Add to map and array
        marker.addTo(map);
        pictureMarkers.push(marker);
        markersCreated++;
    });
    
    console.log(`Created ${markersCreated} picture markers`);
    console.log(`Skipped ${skippedNoPosition} (no position)`);
    console.log('=== updatePictureMarkers complete ===');
}

// Make updatePictureMarkers globally accessible
window.updatePictureMarkers = updatePictureMarkers;

// Setup delete picture button handler
function setupDeletePictureButton(pictureId, popup, pictureData) {
    // Try to find button in popup container first, then fall back to document
    let deleteBtn = null;
    if (popup && popup._content) {
        deleteBtn = popup._content.querySelector(`#deletePictureBtn-${pictureId}`);
    }
    if (!deleteBtn) {
        deleteBtn = document.getElementById(`deletePictureBtn-${pictureId}`);
    }
    
    if (!deleteBtn) {
        console.warn('Delete picture button not found for pictureId:', pictureId);
        return;
    }
    
    console.log('Setting up delete picture button for pictureId:', pictureId);
    
    // Remove any existing listeners to avoid duplicates
    const newDeleteBtn = deleteBtn.cloneNode(true);
    deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);
    
    newDeleteBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('Delete picture button clicked for pictureId:', pictureId);
        
        try {
            await showDeletePictureModal(pictureId, popup, pictureData);
        } catch (error) {
            console.error('Error showing delete modal:', error);
            alert('Error: ' + error.message);
        }
    });
}

// Show delete picture modal with confirmation
async function showDeletePictureModal(pictureId, popup, pictureData) {
    console.log('showDeletePictureModal called for pictureId:', pictureId);
    const deleteModal = document.getElementById('deletePictureModal');
    if (!deleteModal) {
        console.warn('Delete picture modal not found, using fallback confirm');
        if (confirm('Are you sure you want to delete this picture? This cannot be undone.')) {
            await deletePicture(pictureId, popup, pictureData);
        }
        return;
    }
    
    console.log('Delete picture modal found, showing...');
    
    // Get modal elements
    const deleteConfirmBtn = document.getElementById('deletePictureConfirm');
    const cancelBtn = document.getElementById('cancelDeletePicture');
    const closeBtn = document.getElementById('closeDeletePictureModal');
    
    // Show modal
    deleteModal.style.display = 'block';
    
    // Handle confirm button
    if (deleteConfirmBtn) {
        const newConfirmBtn = deleteConfirmBtn.cloneNode(true);
        deleteConfirmBtn.replaceWith(newConfirmBtn);
        
        newConfirmBtn.addEventListener('click', async () => {
            deleteModal.style.display = 'none';
            await deletePicture(pictureId, popup, pictureData);
        });
    }
    
    // Handle cancel/close
    const closeModal = () => {
        deleteModal.style.display = 'none';
    };
    
    if (cancelBtn) {
        const newCancelBtn = cancelBtn.cloneNode(true);
        cancelBtn.replaceWith(newCancelBtn);
        newCancelBtn.addEventListener('click', closeModal);
    }
    
    if (closeBtn) {
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.replaceWith(newCloseBtn);
        newCloseBtn.addEventListener('click', closeModal);
    }
}

// Delete picture (from both Firestore and Storage if uploaded)
async function deletePicture(pictureId, popup, pictureData) {
    try {
        // Check if this is an uploaded picture (needs Storage deletion)
        const isUploadedPicture = pictureData && (pictureData.isUploadedPicture || (pictureData.imageUrl && pictureData.imageUrl.includes('firebasestorage.googleapis.com')));
        
        if (isUploadedPicture && pictureData.imageUrl) {
            // Delete from Firebase Storage
            await deletePictureFromStorage(pictureData.imageUrl);
        }
        
        // Delete from Firestore
        if (window.customPictures && window.customPictures.deleteCustomPicture) {
            await window.customPictures.deleteCustomPicture(pictureId);
        }
        
        // Close popup
        if (popup) {
            popup.remove();
        }
        
        // Remove marker from map
        const marker = pictureMarkers.find(m => m.pictureId === pictureId);
        if (marker) {
            marker.remove();
            const index = pictureMarkers.indexOf(marker);
            if (index > -1) {
                pictureMarkers.splice(index, 1);
            }
        }
        
        // Refresh picture markers
        if (window.updatePictureMarkers) {
            window.updatePictureMarkers();
        }
        
        alert('Picture deleted successfully!');
    } catch (error) {
        console.error('Error deleting picture:', error);
        alert('Error deleting picture: ' + error.message);
    }
}

// Delete picture file from Firebase Storage
async function deletePictureFromStorage(imageUrl) {
    try {
        // Import Storage delete function
        const { ref, deleteObject } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js');
        const { storage } = await import('./firebaseConfig.js');
        
        // Extract file path from URL
        const urlMatch = imageUrl.match(/\/o\/(.+?)\?/);
        if (urlMatch) {
            const filePath = decodeURIComponent(urlMatch[1]);
            const fileRef = ref(storage, filePath);
            await deleteObject(fileRef);
            console.log('✅ Picture file deleted from Storage');
        }
    } catch (error) {
        console.error('Error deleting picture from Storage:', error);
        // Don't throw - Firestore deletion should still proceed
    }
}

// Setup delete video button handler
function setupDeleteVideoButton(trailId, popup, videoData) {
    // Try to find button in popup container first, then fall back to document
    let deleteBtn = null;
    if (popup && popup._content) {
        deleteBtn = popup._content.querySelector(`#deleteVideoBtn-${trailId}`);
    }
    if (!deleteBtn) {
        deleteBtn = document.getElementById(`deleteVideoBtn-${trailId}`);
    }
    
    if (!deleteBtn) {
        console.warn('Delete button not found for trailId:', trailId);
        console.log('Searched in popup._content:', popup?._content);
        console.log('Searched in document for ID:', `deleteVideoBtn-${trailId}`);
        return;
    }
    
    console.log('Setting up delete button for trailId:', trailId, 'Button:', deleteBtn);
    
    // Remove any existing listeners to avoid duplicates
    const newDeleteBtn = deleteBtn.cloneNode(true);
    deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);
    
    newDeleteBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation(); // Prevent any other handlers
        console.log('Delete button clicked for trailId:', trailId);
        
        // Show delete confirmation modal with double confirmation
        try {
            await showDeleteVideoModal(trailId, popup, videoData);
        } catch (error) {
            console.error('Error showing delete modal:', error);
            alert('Error: ' + error.message);
        }
    });
    
    console.log('Delete button handler attached successfully');
}

// Setup pin/unpin video button
function setupPinVideoButton(trailId, popup, videoData) {
    // Try to find button in popup container first, then fall back to document
    let pinBtn = null;
    if (popup && popup._content) {
        pinBtn = popup._content.querySelector(`#pinVideoBtn-${trailId}`);
    }
    if (!pinBtn) {
        pinBtn = document.getElementById(`pinVideoBtn-${trailId}`);
    }
    
    if (!pinBtn) {
        console.warn('Pin button not found for trailId:', trailId);
        return;
    }
    
    // Remove any existing listeners to avoid duplicates
    const newPinBtn = pinBtn.cloneNode(true);
    pinBtn.parentNode.replaceChild(newPinBtn, pinBtn);
    
    // Add click handler
    newPinBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation(); // Prevent popup from closing
        
        console.log('Pin button clicked for trailId:', trailId);
        console.log('Current videoData:', videoData);
        
        const isPinned = videoData.pinned === true;
        
        try {
            if (isPinned) {
                // Unpin video
                console.log('Unpinning video...');
                if (window.customVideos && window.customVideos.unpinVideo) {
                    await window.customVideos.unpinVideo(trailId);
                    console.log('Video unpinned successfully');
                    alert('Video unpinned');
                } else {
                    console.error('unpinVideo function not available');
                    alert('Error: Pin/unpin feature not available');
                    return;
                }
            } else {
                // Pin video
                console.log('Pinning video...');
                if (window.customVideos && window.customVideos.pinVideo) {
                    await window.customVideos.pinVideo(trailId);
                    console.log('Video pinned successfully');
                    alert('Video pinned!');
                } else {
                    console.error('pinVideo function not available');
                    alert('Error: Pin/unpin feature not available');
                    return;
                }
            }
            
            // Reload custom videos to update cache
            if (window.customVideos && window.customVideos.loadCustomVideos) {
                await window.customVideos.loadCustomVideos();
            }
            
            // Update button text immediately
            const updatedVideoData = window.customVideos.getCustomVideo(trailId);
            if (updatedVideoData) {
                const newIsPinned = updatedVideoData.pinned === true;
                newPinBtn.textContent = newIsPinned ? '📌 Pinned' : '📌 Pin';
                newPinBtn.style.backgroundColor = newIsPinned ? '#ffc107' : '#6c757d';
            }
            
            // Refresh video markers to update popup content (but keep popup open)
            // Don't close the popup - just update the button state
            // The popup will show the updated button state on next open
            
            // If viewing profile, refresh pinned videos
            const profilePage = document.getElementById('profilePage');
            if (profilePage && profilePage.style.display !== 'none') {
                // Trigger profile reload
                const currentHash = window.location.hash;
                if (currentHash && currentHash.startsWith('#profile/')) {
                    const userId = currentHash.split('/')[1];
                    if (window.showProfile) {
                        await window.showProfile(userId);
                    }
                }
            }
        } catch (error) {
            console.error('Error pinning/unpinning video:', error);
            console.error('Error details:', error.message, error.stack);
            alert('Error: ' + error.message);
        }
    });
}

// Show delete video modal with confirmation
async function showDeleteVideoModal(trailId, popup, videoData) {
    console.log('showDeleteVideoModal called for trailId:', trailId);
    const deleteModal = document.getElementById('deleteVideoModal');
    if (!deleteModal) {
        console.warn('Delete modal not found, using fallback confirm');
        // Fallback to simple confirm
        if (confirm('Are you sure you want to delete this video? This cannot be undone.')) {
            await deleteVideo(trailId, popup, videoData);
        }
        return;
    }
    
    console.log('Delete modal found, showing...');
    
    // Get modal elements
    const deleteConfirmBtn = document.getElementById('deleteVideoConfirm');
    const cancelBtn = document.getElementById('cancelDeleteVideo');
    const closeBtn = document.getElementById('closeDeleteVideoModal');
    
    // Show modal
    deleteModal.style.display = 'block';
    
    // Handle confirm button
    if (deleteConfirmBtn) {
        const newConfirmBtn = deleteConfirmBtn.cloneNode(true);
        deleteConfirmBtn.replaceWith(newConfirmBtn);
        
        newConfirmBtn.addEventListener('click', async () => {
            deleteModal.style.display = 'none';
            await deleteVideo(trailId, popup, videoData);
        });
    }
    
    // Handle cancel/close
    const closeModal = () => {
        deleteModal.style.display = 'none';
    };
    
    if (cancelBtn) {
        const newCancelBtn = cancelBtn.cloneNode(true);
        cancelBtn.replaceWith(newCancelBtn);
        newCancelBtn.addEventListener('click', closeModal);
    }
    
    if (closeBtn) {
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.replaceWith(newCloseBtn);
        newCloseBtn.addEventListener('click', closeModal);
    }
}

// Delete video (from both Firestore and Storage if uploaded)
async function deleteVideo(trailId, popup, videoData) {
    try {
        // Check if this is an uploaded video (needs Storage deletion)
        const isUploadedVideo = videoData && (videoData.isUploadedVideo || (videoData.videoUrl && videoData.videoUrl.includes('firebasestorage.googleapis.com')));
        
        if (isUploadedVideo && videoData.videoUrl) {
            // Delete from Firebase Storage
            await deleteVideoFromStorage(videoData.videoUrl);
        }
        
        // Delete from Firestore
        if (window.customVideos && window.customVideos.deleteCustomVideo) {
            await window.customVideos.deleteCustomVideo(trailId);
        }
        
        // Close popup
        if (popup) {
            popup.remove();
        }
        
        // Remove marker from map
        const marker = videoMarkers.find(m => m.trailId === trailId);
        if (marker) {
            marker.remove();
            const index = videoMarkers.indexOf(marker);
            if (index > -1) {
                videoMarkers.splice(index, 1);
            }
        }
        
        // Refresh video markers
        if (window.updateVideoMarkers) {
            window.updateVideoMarkers();
        }
        
        alert('Video deleted successfully!');
    } catch (error) {
        console.error('Error deleting video:', error);
        alert('Error deleting video: ' + error.message);
    }
}

// Delete video file from Firebase Storage
async function deleteVideoFromStorage(videoUrl) {
    try {
        // Import Storage delete function
        const { ref, deleteObject } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js');
        const { storage } = await import('./firebaseConfig.js');
        
        // Extract file path from URL
        // URL format: https://firebasestorage.googleapis.com/v0/b/BUCKET/o/PATH?alt=media&token=...
        const urlMatch = videoUrl.match(/\/o\/(.+?)\?/);
        if (urlMatch) {
            const filePath = decodeURIComponent(urlMatch[1]);
            const fileRef = ref(storage, filePath);
            await deleteObject(fileRef);
            console.log('✅ Video file deleted from Storage');
        }
    } catch (error) {
        console.error('Error deleting video from Storage:', error);
        // Don't throw - Firestore deletion should still proceed
    }
}

// My Videos button handler
document.addEventListener('DOMContentLoaded', function() {
    const myVideosButton = document.getElementById('myVideosButton');
    console.log('My Videos button element:', myVideosButton);
    if (myVideosButton) {
        // Set initial button state to reflect myVideosMode = false (OFF by default)
        if (!myVideosMode) {
            myVideosButton.classList.remove('active');
            myVideosButton.textContent = 'My Videos';
            // Hide category dropdown initially
            const categoryDropdown = document.getElementById('videoCategoryDropdown');
            if (categoryDropdown) {
                categoryDropdown.style.display = 'none';
            }
        }
        
        myVideosButton.addEventListener('click', async function() {
            console.log('My Videos button clicked!');
            
            // If viewing a friend's map, switch back to own map first
            // But skip this if we're programmatically switching to friend map
            if (window._switchingToFriendMap) {
                console.log('Skipping switch-back - programmatically switching to friend map');
                return;
            }
            
            syncFriendMapState();
            if (viewingFriendMap) {
                console.log('Currently viewing friend map, switching back to own map');
                if (window.switchToMyMap) {
                    await window.switchToMyMap();
                    syncFriendMapState();
                }
            }
            
            myVideosMode = !myVideosMode;
            window.myVideosMode = myVideosMode; // Keep in sync
            console.log('My Videos mode toggled to:', myVideosMode);
            
            // Update button appearance
            if (myVideosMode) {
                this.classList.add('active');
                this.textContent = 'My Videos (ON)';
            } else {
                this.classList.remove('active');
                this.textContent = 'My Videos';
            }
            
            // Show/hide category dropdown
            const categoryDropdown = document.getElementById('videoCategoryDropdown');
            if (categoryDropdown) {
                categoryDropdown.style.display = myVideosMode ? 'block' : 'none';
            }
            
            // Update customVideos module state
            if (window.customVideos && window.customVideos.setMyVideosMode) {
                window.customVideos.setMyVideosMode(myVideosMode);
                console.log('Updated customVideos module state');
            } else {
                console.warn('window.customVideos not available or setMyVideosMode missing');
            }
            
            // Update video markers
            updateVideoMarkers();
        });
    } else {
        console.error('myVideosButton not found in DOM!');
    }
    
    // Add event listener for "All" checkbox (master toggle)
    const allCheckbox = document.getElementById('toggleAllVideos');
    if (allCheckbox) {
        allCheckbox.addEventListener('change', function() {
            const isChecked = this.checked;
            // Toggle all category checkboxes
            ['Powder', 'Park', 'Groomers', 'Steeps', 'Lifts', 'Misc', 'Favorites'].forEach(category => {
                const checkbox = document.getElementById(`toggle${category}Videos`);
                if (checkbox) {
                    checkbox.checked = isChecked;
                }
            });
            // Update video markers
            updateVideoMarkers();
        });
    }
    
    // Add event listeners for individual video category checkboxes
    ['Powder', 'Park', 'Groomers', 'Steeps', 'Lifts', 'Misc', 'Favorites'].forEach(category => {
        const checkbox = document.getElementById(`toggle${category}Videos`);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                console.log(`${category} videos checkbox toggled:`, this.checked);
                
                // Update "All" checkbox based on individual checkboxes
                const allCheckbox = document.getElementById('toggleAllVideos');
                if (allCheckbox) {
                    // Check if all individual checkboxes are checked
                    const allCategories = ['Powder', 'Park', 'Groomers', 'Steeps', 'Lifts', 'Misc', 'Favorites'];
                    const allChecked = allCategories.every(cat => {
                        const cb = document.getElementById(`toggle${cat}Videos`);
                        return cb && cb.checked;
                    });
                    allCheckbox.checked = allChecked;
                }
                
                // Update video markers when category changes
                updateVideoMarkers();
            });
        }
    });
    
    // My Pictures button handler
    const myPicturesButton = document.getElementById('myPicturesButton');
    if (myPicturesButton) {
        myPicturesButton.addEventListener('click', async function() {
            console.log('My Pictures button clicked!');
            
            // If viewing a friend's map, switch back to own map first
            // But skip this if we're programmatically switching to friend map
            if (window._switchingToFriendMap) {
                return;
            }
            
            syncFriendMapState();
            if (viewingFriendMap) {
                console.log('Currently viewing friend map, switching back to own map');
                if (window.switchToMyMap) {
                    await window.switchToMyMap();
                    syncFriendMapState();
                }
            }
            
            myPicturesMode = !myPicturesMode;
            window.myPicturesMode = myPicturesMode; // Keep in sync
            console.log('My Pictures mode toggled to:', myPicturesMode);
            
            // Update button appearance
            if (myPicturesMode) {
                this.classList.add('active');
                this.textContent = 'My Pictures';
            } else {
                this.classList.remove('active');
                this.textContent = 'My Pictures';
            }
            
            // Update customPictures module state
            if (window.customPictures && window.customPictures.setMyPicturesMode) {
                window.customPictures.setMyPicturesMode(myPicturesMode);
            }
            
            // Update picture markers
            updatePictureMarkers();
        });
    }
});

// Using hardcoded trailsWithVideosHardcoded array instead (see line ~200)

// Function to create markers with difficulty-based colors
function createFeatureMarkers(featureData) {
    console.log('Creating markers with features:', featureData);
    
    if (!featureData || typeof featureData !== 'object') {
        console.warn('No valid feature data provided');
        return;
    }

    Object.entries(featureData).forEach(([id, feature]) => {
        try {
            const color = feature.difficulty === 'green' ? '#228B22' : 
                         feature.difficulty === 'blue' ? '#0022AA' : '#000000';
            
            // Create marker with custom element (but don't add to map initially - starts hidden)
            const customElement = createCustomMarker(color);
            const marker = new mapboxgl.Marker(customElement)
                .setLngLat(feature.coordinates)
                .setPopup(new mapboxgl.Popup().setHTML(feature.content));
            // Don't add to map initially - will be added when checkbox is checked
            
            // Store both difficulty and featureId with the marker
            marker.difficulty = feature.difficulty;
            marker.featureId = id;
            mountainMarkers.push(marker);
            
            console.log('Marker created for:', id);
        } catch (error) {
            console.error('Error creating marker for', id, ':', error);
        }
    });
}

// Add click event listener for coordinates
map.on('click', (e) => {
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;
    console.log(`Coordinates: [${lng}, ${lat}]`);
});

// Function to toggle features by difficulty
function toggleFeaturesByDifficulty(difficulty, show) {
    console.log(`Toggling ${difficulty} features. Show:`, show);
    mountainMarkers.forEach(marker => {
        if (marker.difficulty.toLowerCase() === difficulty.toLowerCase()) {
            if (show) {
                marker.addTo(map);
            } else {
                marker.remove();
            }
        }
    });
}

// Handle difficulty toggles for trails
['Green', 'Blue', 'Black'].forEach(difficulty => {
    const checkbox = document.getElementById(`toggle${difficulty}Trails`);
    if (checkbox) {  // Add safety check
        checkbox.addEventListener('change', function() {
            console.log(`${difficulty} trails checkbox clicked! Checked:`, this.checked);
            toggleTrailsByDifficulty(difficulty.toLowerCase());
        });
    }
});

// Add this near the top where other trackers are initialized
const trackers = {
    'daily': new ActivityTracker('daily'),
    'monthly': new ActivityTracker('monthly'),
    'season': new ActivityTracker('season')  // Make sure this line exists
};

// Add this to your event listener setup
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all delete buttons
    const deleteButtons = {
        'daily': document.getElementById('deleteSession'),
        'monthly': document.getElementById('deleteMonthlySession'),
        'season': document.getElementById('deleteSeasonSession')
    };

    // Set up each delete button
    Object.entries(deleteButtons).forEach(([type, button]) => {
        if (button) {
            button.style.display = 'none'; // Initially hidden
            button.addEventListener('click', () => {
                trackers[type].deleteCurrentSession();
            });
        }
    });
});

