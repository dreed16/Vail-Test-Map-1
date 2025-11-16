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

// Then your mountainFeatureData.


// Initialize your variables
const mountainMarkers = [];
var trailsVisible = true;
var liftsVisible = true;
var mountainCamsVisible = false;  // Start with cams hidden for better performance
var currentPopup = null;
var liveFeedMarkers = [];
let navigationActive = false;

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
                         feature.difficulty === 'blue' ? '#0000FF' : '#000000';
            
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
                    const isCatwalk = trailData[trail].isCatwalk === true || trailData[trail].type === 'catwalk';
                    const borderColor = isExtreme ? '#FF0000' : (isDoubleBlack ? '#FFB84D' : '#FFFFFF');  // Red for extreme, yellow-orange for double black, white for others
                    
                    // Only add border layer for non-catwalk trails
                    if (!isCatwalk) {
                        // Build paint properties for border layer
                        const borderPaint = {
                            'line-color': borderColor,
                            'line-width': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                10, 1.5,   // Wider border
                                12, 2.5,
                                14, 4.5,
                                16, 6.5
                            ],
                            'line-translate': [0, 0]  // Ensure no offset
                        };
                        
                        // Bottom layer: border/highlight (wider)
                        // Hide border at low zoom for performance (zoom < 12)
                        const currentZoomForBorder = map.getZoom();
                        map.addLayer({
                            'id': `${trail}-${pathType}-layer-border`,
                            'type': 'line',
                            'source': sourceId,
                            'layout': {
                                'line-join': 'round',
                                'line-cap': 'square',  // Use 'square' for better alignment
                                'visibility': currentZoomForBorder >= 12 ? 'visible' : 'none'
                            },
                            'paint': borderPaint
                        });
                    }
                    
                    // Build paint properties for main layer
                    const mainPaint = {
                        'line-color': trailData[trail].color,
                        'line-width': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            10, 0.9,
                            12, 1.8,
                            14, 3.6,
                            16, 5.4
                        ],
                        'line-translate': [0, 0]  // Ensure no offset
                    };
                    // Add dash array for catwalks
                    if (isCatwalk) {
                        mainPaint['line-dasharray'] = [4, 3];
                    }
                    
                    // Top layer: colored line (narrower, centered on white for non-catwalks)
                    map.addLayer({
                        'id': `${trail}-${pathType}-layer`,
                        'type': 'line',
                        'source': sourceId,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': isCatwalk ? 'round' : 'square'  // Round caps for catwalks look better
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
                const isCatwalk = trailData[trail].isCatwalk === true || trailData[trail].type === 'catwalk';
                const borderColor = isExtreme ? '#FF0000' : (isDoubleBlack ? '#FFB84D' : '#FFFFFF');  // Red for extreme, yellow-orange for double black, white for others
                
                // Only add border layer for non-catwalk trails
                if (!isCatwalk) {
                    // Build paint properties for border layer
                    const borderPaint = {
                        'line-color': borderColor,
                        'line-width': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            10, 1.5,   // Wider border
                            12, 2.5,
                            14, 4.5,
                            16, 6.5
                        ],
                        'line-translate': [0, 0]  // Ensure no offset
                    };
                    
                    // Bottom layer: border/highlight (wider)
                    // Hide border at low zoom for performance (zoom < 12)
                    const currentZoomForBorder = map.getZoom();
                    map.addLayer({
                        'id': `${trail}-layer-border`,
                        'type': 'line',
                        'source': trail,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'square',  // Use 'square' for better alignment
                            'visibility': currentZoomForBorder >= 12 ? 'visible' : 'none'
                        },
                        'paint': borderPaint
                    });
                }
                
                // Build paint properties for main layer
                const mainPaint = {
                    'line-color': trailData[trail].color,
                    'line-width': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        10, 0.9,
                        12, 1.8,
                        14, 3.6,
                        16, 5.4
                    ],
                    'line-translate': [0, 0]  // Ensure no offset
                };
                // Add dash array for catwalks
                if (isCatwalk) {
                    mainPaint['line-dasharray'] = [4, 3];
                }
                
                // Top layer: colored line (narrower, centered on white for non-catwalks)
                map.addLayer({
                    'id': `${trail}-layer`,
                    'type': 'line',
                    'source': trail,
                    'layout': {
                        'line-join': 'round',
                        'line-cap': isCatwalk ? 'round' : 'square'  // Round caps for catwalks look better
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
    function unloadTrail(trail) {
        if (trailData[trail].coordinates.main) {
            // Handle split trails
            ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                const sourceId = `${trail}-${pathType}`;
                const borderLayerId = `${trail}-${pathType}-layer-border`;
                const mainLayerId = `${trail}-${pathType}-layer`;
                
                // Remove layers
                if (map.getLayer(borderLayerId)) map.removeLayer(borderLayerId);
                if (map.getLayer(mainLayerId)) map.removeLayer(mainLayerId);
                
                // Remove source
                if (map.getSource(sourceId)) map.removeSource(sourceId);
            });
        } else {
            // Handle regular trails
            const borderLayerId = `${trail}-layer-border`;
            const mainLayerId = `${trail}-layer`;
            
            // Remove layers
            if (map.getLayer(borderLayerId)) map.removeLayer(borderLayerId);
            if (map.getLayer(mainLayerId)) map.removeLayer(mainLayerId);
            
            // Remove source
            if (map.getSource(trail)) map.removeSource(trail);
        }
        
        loadedTrails.delete(trail);
    }
    
    // Load trails that are in viewport, unload ones that aren't
    function loadTrailsInViewport() {
        const bounds = map.getBounds();
        const trailsToKeep = new Set();
        
        // First, check which trails should be loaded
        Object.keys(trailData).forEach(function(trail) {
            // Check if trail is in viewport
            let trailCoords = null;
            if (trailData[trail].coordinates.main) {
                trailCoords = trailData[trail].coordinates.main;
            } else {
                trailCoords = trailData[trail].coordinates;
            }
            
            if (isInViewport(trailCoords, bounds, 0.15)) {
                trailsToKeep.add(trail);
                
                // Load if not already loaded
                if (!loadedTrails.has(trail)) {
                    loadTrail(trail);
                    loadedTrails.add(trail);
                }
            }
        });
        
        // Unload trails that are no longer in viewport
        loadedTrails.forEach(function(trail) {
            if (!trailsToKeep.has(trail)) {
                unloadTrail(trail);
            }
        });
    }
    
    // Initial load - only load trails in viewport
    loadTrailsInViewport();
    
    // Load trails and lifts as map moves (when viewport changes)
    let moveEndTimeout;
    map.on('moveend', function() {
        clearTimeout(moveEndTimeout);
        moveEndTimeout = setTimeout(function() {
            loadTrailsInViewport();
            loadLiftsInViewport();
        }, 200); // Small delay to avoid loading during rapid panning
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
                        const popupContent = trailPopups[trail] ? 
                            trailPopups[trail].content : 
                            `<strong>${trail}</strong><br>Difficulty: ${trailData[trail].difficulty}`;
                        
                        new mapboxgl.Popup()
                            .setLngLat(e.lngLat)
                            .setHTML(popupContent)
                            .addTo(map);
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
                    const popupContent = trailPopups[trail] ? 
                        trailPopups[trail].content : 
                        `<strong>${trail}</strong><br>Difficulty: ${trailData[trail].difficulty}`;
                    
                    new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(popupContent)
                        .addTo(map);
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

    // Update the slope toggle event listener
    document.getElementById('toggleSlope').addEventListener('change', function() {
        console.log('Slope toggle clicked');
        const visibility = this.checked ? 'visible' : 'none';
        
        if (map.getLayer('slopes')) {
            map.setLayoutProperty('slopes', 'visibility', visibility);
            if (this.checked) {
                map.setPitch(45);
            } else {
                map.setPitch(0);
            }
        } else {
            console.error('Slopes layer not found!');
        }
    });

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
        const visibility = showBorders ? 'visible' : 'none';
        
        // Update borders for all loaded trails
        if (window.loadedTrails) {
            window.loadedTrails.forEach(function(trail) {
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
    function updateTrailCoordinatesForZoom() {
        const currentZoom = map.getZoom();
        const bounds = map.getBounds();
        
        Object.keys(trailData).forEach(function(trail) {
            // Check if trail is in viewport before updating (skip off-screen trails)
            let trailCoords = null;
            if (trailData[trail].coordinates.main) {
                // For split trails, check the main path
                trailCoords = trailData[trail].coordinates.main;
            } else {
                // For regular trails, use the coordinates directly
                trailCoords = trailData[trail].coordinates;
            }
            
            // Skip this trail if it's not in the viewport
            if (!isInViewport(trailCoords, bounds, 0.2)) {
                return; // Skip this trail - it's off-screen
            }
            
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
                        
                        // Update the source data
                        source.setData({
                            type: 'Feature',
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
                    
                    // Update the source data
                    source.setData({
                        type: 'Feature',
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
            const lastLevel = getSimplificationLevel(lastZoomLevel);
            
            // Update border visibility based on zoom (quick operation)
            updateBorderVisibility();
            
            // Only update if we crossed a threshold or zoomed significantly (0.3 instead of 0.5 for more sensitivity)
            if (currentLevel !== lastLevel || Math.abs(currentZoom - lastZoomLevel) > 0.3) {
                // Use requestIdleCallback if available, otherwise requestAnimationFrame with delay
                if (window.requestIdleCallback) {
                    requestIdleCallback(function() {
                        updateTrailCoordinatesForZoom();
                        lastZoomLevel = currentZoom;
                    }, { timeout: 2000 }); // Longer timeout to wait for idle
                } else {
                    // Use setTimeout to delay even requestAnimationFrame
                    setTimeout(function() {
                        requestAnimationFrame(function() {
                            updateTrailCoordinatesForZoom();
                            lastZoomLevel = currentZoom;
                        });
                    }, 300); // 300ms delay to let tilt/pan finish
                }
            } else {
                lastZoomLevel = currentZoom;
            }
        }, 500); // Wait 500ms after zoom ends before checking (gives time for tilt to finish)
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
    
    Object.keys(trailData).forEach(function(trail) {
        const isDoubleBlack = trailData[trail].difficulty === 'doubleBlack' || trailData[trail].isDoubleBlack === true;
        
        if (trailData[trail].coordinates.main) {
            // Handle split trails - all trails now have border and main layers
            ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                const borderLayerId = `${trail}-${pathType}-layer-border`;
                const mainLayerId = `${trail}-${pathType}-layer`;
                if (map.getLayer(borderLayerId)) {
                    map.setLayoutProperty(borderLayerId, 'visibility', trailsVisible ? 'visible' : 'none');
                }
                if (map.getLayer(mainLayerId)) {
                    map.setLayoutProperty(mainLayerId, 'visibility', trailsVisible ? 'visible' : 'none');
                }
            });
        } else {
            // Handle regular trails - all trails now have border and main layers
            const borderLayerId = `${trail}-layer-border`;
            const mainLayerId = `${trail}-layer`;
            if (map.getLayer(borderLayerId)) {
                map.setLayoutProperty(borderLayerId, 'visibility', trailsVisible ? 'visible' : 'none');
            }
            if (map.getLayer(mainLayerId)) {
                map.setLayoutProperty(mainLayerId, 'visibility', trailsVisible ? 'visible' : 'none');
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
                    
                    try {
                        const source = map.getSource(sourceName);
                        if (source) {
                            source.setData({
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'LineString',
                                    coordinates: newCoords
                                }
                            });
                            console.log(`${trail} ${pathType} new coordinates:`, JSON.stringify(newCoords));
                        } else {
                            console.error(`Source not found: ${sourceName}`);
                        }
                    } catch (error) {
                        console.error(`Error updating ${sourceName}:`, error);
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
                
                map.getSource(trail).setData({
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: newCoords
                    }
                });

                console.log(`${trail} new coordinates:`, JSON.stringify(newCoords));
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

// Function to update all trail colors from trailData
// Optimized: Only updates loaded trails (not all trails)
function updateTrailColors() {
    console.log('Updating trail colors from trailData...');
    
    // Only update trails that are currently loaded
    const trailsToUpdate = window.loadedTrails ? Array.from(window.loadedTrails) : Object.keys(trailData);
    
    trailsToUpdate.forEach(function(trail) {
        const trailColor = trailData[trail].color;
        const isExtreme = trailData[trail].difficulty === 'extreme' || trailData[trail].isExtreme === true;
        const isDoubleBlack = trailData[trail].difficulty === 'doubleBlack' || trailData[trail].isDoubleBlack === true;
        const isCatwalk = trailData[trail].isCatwalk === true || trailData[trail].type === 'catwalk';
        const borderColor = isExtreme ? '#FF0000' : (isDoubleBlack ? '#FFB84D' : '#FFFFFF');  // Red for extreme, yellow-orange for double black, white for others
        
        if (trailData[trail].coordinates.main) {
            // Handle split trails
            ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                // Update the main layer color
                const mainLayerId = `${trail}-${pathType}-layer`;
                if (map.getLayer(mainLayerId)) {
                    map.setPaintProperty(mainLayerId, 'line-color', trailColor);
                    console.log(`Updated color for ${trail}-${pathType}: ${trailColor}`);
                }
                // Update the border layer color (only if not a catwalk)
                if (!isCatwalk) {
                    const borderLayerId = `${trail}-${pathType}-layer-border`;
                    if (map.getLayer(borderLayerId)) {
                        map.setPaintProperty(borderLayerId, 'line-color', borderColor);
                        console.log(`Updated border color for ${trail}-${pathType}: ${borderColor}`);
                    }
                }
            });
        } else {
            // Handle regular trails
            // Update the main layer color
            const mainLayerId = `${trail}-layer`;
            if (map.getLayer(mainLayerId)) {
                map.setPaintProperty(mainLayerId, 'line-color', trailColor);
                console.log(`Updated color for ${trail}: ${trailColor}`);
            }
            // Update the border layer color (only if not a catwalk)
            if (!isCatwalk) {
                const borderLayerId = `${trail}-layer-border`;
                if (map.getLayer(borderLayerId)) {
                    map.setPaintProperty(borderLayerId, 'line-color', borderColor);
                    console.log(`Updated border color for ${trail}: ${borderColor}`);
                }
            }
        }
    });
    console.log('Trail colors updated!');
}

function toggleTrailsByDifficulty(difficulty) {
    Object.keys(trailData).forEach(trail => {
        // Handle both 'black' and 'doubleBlack' for black trails, and 'extreme', and 'terrainPark'
        const trailDifficulty = trailData[trail].difficulty;
        const isExtreme = trailDifficulty === 'extreme' || trailData[trail].isExtreme === true;
        const isDoubleBlack = trailDifficulty === 'doubleBlack' || trailData[trail].isDoubleBlack === true;
        const isTerrainPark = trailDifficulty === 'terrainPark' || trailData[trail].isTerrainPark === true;
        // Match difficulty - but don't show double black when regular black is toggled, and don't show extreme when others are toggled
        const matchesDifficulty = (difficulty === 'black' && trailDifficulty === 'black' && !isDoubleBlack && !isExtreme && !isTerrainPark) || 
                                  (difficulty === 'doubleBlack' && isDoubleBlack && !isExtreme && !isTerrainPark) ||
                                  (difficulty === 'extreme' && isExtreme && !isTerrainPark) ||
                                  (difficulty === 'terrainPark' && isTerrainPark) ||
                                  (trailDifficulty === difficulty && !isDoubleBlack && !isExtreme && !isTerrainPark);
        
        if (matchesDifficulty) {
            // Handle camelCase for doubleBlack, extreme, and terrainPark
            let checkboxId;
            if (difficulty === 'doubleBlack') {
                checkboxId = 'toggleDoubleBlackTrails';
            } else if (difficulty === 'extreme') {
                checkboxId = 'toggleExtremeTrails';
            } else if (difficulty === 'terrainPark') {
                checkboxId = 'toggleTerrainParkTrails';
            } else {
                checkboxId = `toggle${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}Trails`;
            }
            const checkbox = document.getElementById(checkboxId);
            const isVisible = checkbox ? checkbox.checked : true;
            
            // Check if it's a split trail
            if (trailData[trail].coordinates.main) {
                // Handle split trail visibility - all trails have border and main layers
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
                // Handle regular trail visibility - all trails have border and main layers
                const borderLayerId = `${trail}-layer-border`;
                const mainLayerId = `${trail}-layer`;
                if (map.getLayer(borderLayerId)) {
                    map.setLayoutProperty(borderLayerId, 'visibility', isVisible ? 'visible' : 'none');
                }
                if (map.getLayer(mainLayerId)) {
                    map.setLayoutProperty(mainLayerId, 'visibility', isVisible ? 'visible' : 'none');
                }
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
                    console.log(`${liftId} new coordinates:`, JSON.stringify(newCoords));
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
    
    // If unchecked, uncheck all difficulty options
    if (!this.checked) {
        difficultyDropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => {
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
    }
});

// Add event listeners for individual difficulty checkboxes
        ['Green', 'Blue', 'Black', 'DoubleBlack', 'Extreme', 'TerrainPark'].forEach(difficulty => {
    const checkbox = document.getElementById(`toggle${difficulty}Trails`);
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            let difficultyLower;
            if (difficulty === 'DoubleBlack') {
                difficultyLower = 'doubleBlack';
            } else if (difficulty === 'Extreme') {
                difficultyLower = 'extreme';
            } else if (difficulty === 'TerrainPark') {
                difficultyLower = 'terrainPark';
            } else {
                difficultyLower = difficulty.toLowerCase();
            }
            toggleTrailsByDifficulty(difficultyLower);
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
                         feature.difficulty === 'blue' ? '#0000FF' : '#000000';
            
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

