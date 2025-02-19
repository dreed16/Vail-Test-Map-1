// Move this to the very top of your file, outside any other functions
const createCustomMarker = (color) => {
    const element = document.createElement('div');
    element.className = 'custom-marker';
    element.style.backgroundImage = 'url("images/cliff-drop.png")';
    element.style.width = '32px';
    element.style.height = '32px';
    element.style.backgroundSize = 'contain';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundPosition = 'center';
    element.style.backgroundColor = 'transparent';
    element.style.border = `2px solid ${color}`;
    element.style.borderRadius = '50%';
    return element;
};

// Then your mountainFeatureData.


// Initialize your variables
let mountainMarkers = [];
let mountainFeatures = []; // Initialize empty array for features

console.log('Script starting');
mapboxgl.accessToken = 'pk.eyJ1IjoiZHJlZWR2YWlsIiwiYSI6ImNtNzFpZm1vZDBjamwyaW9iNXB4d2Y3MXMifQ.SX00x_QQAbJWREWA2j_C8Q';
console.log('Token set');

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-106.336, 39.595],
    zoom: 15,
    bearing: 0,
    pitch: 0
});
console.log('Map initialized');

// Add these new event listeners
map.on('style.load', function() {
    console.log('Map style loaded');
});

map.on('error', function(e) {
    console.error('Map error:', e);
});

// Variables to track visibility states
var trailsVisible = true;
var liftsVisible = true;
var mountainCamsVisible = true;
var currentPopup = null;

// Arrays to store markers
var liveFeedMarkers = [];

// Add this at the top of main.js
let navigationActive = false;

// Temporary function for trail adjustment
function makeTrailsDraggable() {
    Object.keys(trailData).forEach(function(trail) {
        // Create draggable markers for start and end points
        var startMarker = new mapboxgl.Marker({ draggable: true, color: '#00ff00' })
            .setLngLat(trailData[trail].coordinates[0])
            .addTo(map);
            
        var endMarker = new mapboxgl.Marker({ draggable: true, color: '#ff0000' })
            .setLngLat(trailData[trail].coordinates[6])
            .addTo(map);

        // Update coordinates when markers are dragged
        function updateTrail() {
            const newCoords = [
                startMarker.getLngLat().toArray(),
                endMarker.getLngLat().toArray()
            ];
            trailData[trail].coordinates = newCoords;
            
            // Update the map source
            map.getSource(trail).setData({
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: newCoords
                }
            });

            // Log new coordinates
            console.log(`${trail} coordinates:`, JSON.stringify(newCoords));
        }

        startMarker.on('dragend', updateTrail);
        endMarker.on('dragend', updateTrail);
    });
}

// Initialize map and add terrain
map.on('load', function() {
    map.addSource('dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.terrain-rgb',
        tileSize: 512,
        maxzoom: 14
    });
    map.setTerrain({ source: 'dem', exaggeration: 1.5 });

    // Add trails to map
    Object.keys(trailData).forEach(function(trail) {
        if (trailData[trail].coordinates.main) {
            // For split trails, add three separate sources and layers
            ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                // Add source
                map.addSource(`${trail}-${pathType}`, {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates: trailData[trail].coordinates[pathType]
                        }
                    }
                });

                // Add layer
                map.addLayer({
                    'id': `${trail}-${pathType}-layer`,
                    'type': 'line',
                    'source': `${trail}-${pathType}`,
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': trailData[trail].color,
                        'line-width': 6
                    }
                });
            });
        } else {
            // Original code for regular trails
            map.addSource(trail, {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: trailData[trail].coordinates
                    }
                }
            });
            map.addLayer({
                'id': `${trail}-layer`,
                'type': 'line',
                'source': trail,
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': trailData[trail].color,
                    'line-width': 6
                }
            });
        }
    });

    // Then update the click events
    Object.keys(trailData).forEach(function(trail) {
        map.on('click', `${trail}-layer`, function(e) {
            const popupContent = trailPopups[trail] ? 
                trailPopups[trail].content : 
                `<strong>${trail}</strong><br>Difficulty: ${trailData[trail].difficulty}`;
            
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(popupContent)
                .addTo(map);
        });

        // Hover effects
        map.on('mouseenter', `${trail}-layer`, function() {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', `${trail}-layer`, function() {
            map.getCanvas().style.cursor = '';
        });
    });


    // Create custom icon element
    const createCustomMarker = (color) => {
        const element = document.createElement('div');
        element.className = 'custom-marker';
        element.style.backgroundImage = 'url("images/cliff-drop.png")';
        element.style.width = '32px';  // 20% smaller than 40px
        element.style.height = '32px';
        element.style.backgroundSize = 'contain';
        element.style.backgroundRepeat = 'no-repeat';
        element.style.backgroundPosition = 'center';
        element.style.backgroundColor = 'transparent';
        
        // Keep the colored border
        element.style.border = `2px solid ${color}`;
        element.style.borderRadius = '50%';
        
        return element;
    };



    liveFeedLocations.forEach(function(location) {
        var liveFeedMarker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat(location.coords)
            .setPopup(new mapboxgl.Popup().setHTML(
                `<strong>Live Cam</strong><br><a href='${location.url}' target='_blank'>View Mountain Cams - Official Vail Site</a>`
            ))
            .addTo(map);
        liveFeedMarkers.push(liveFeedMarker);
    });

    // Add lift layers
    Object.keys(liftData).forEach(function(lift) {
        console.log('Processing lift:', lift);
        map.addSource(lift, {
            type: 'geojson',
            data: { type: 'Feature', geometry: { type: 'LineString', coordinates: liftData[lift].coordinates } }
        });
        map.addLayer({
            id: `${lift}-layer`,
            type: 'line',
            source: lift,
            paint: {
                'line-color': liftData[lift].color,
                'line-width': 4,
                'line-dasharray': [4, 3]
            },
            layout: { 'visibility': 'visible' }
        });

        map.on('click', `${lift}-layer`, function() {
            if (currentPopup) currentPopup.remove();
            currentPopup = new mapboxgl.Popup().setLngLat(liftData[lift].coordinates[0]).setHTML(liftData[lift].popupContent).addTo(map);
        });
    });

    // makeTrailsDraggable();  // Uncomment this line when you want to adjust trails

    // Add this temporarily to check what sources exist
    console.log("All sources:", Object.keys(map.getStyle().sources));

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
    
    createFeatureMarkers(mountainFeatures); // Add this line

    // Add click event for coordinates
    map.on('click', function(e) {
        console.log('Clicked coordinates:', [e.lngLat.lng, e.lngLat.lat]);
    });

    // Initialize features after map is loaded
    try {
        createFeatureMarkers(mountainFeatures);
    } catch (error) {
        console.error('Error initializing features:', error);
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
    Object.keys(trailData).forEach(function(trail) {
        console.log('Toggling trail:', trail);
        map.setLayoutProperty(`${trail}-layer`, 'visibility', trailsVisible ? 'visible' : 'none');
    });
}


function toggleLifts() {
    liftsVisible = !liftsVisible;
    Object.keys(liftData).forEach(function(lift) {
        map.setLayoutProperty(`${lift}-layer`, 'visibility', liftsVisible ? 'visible' : 'none');
    });
}

function toggleMountainCams() {
    mountainCamsVisible = !mountainCamsVisible;
    liveFeedMarkers.forEach(function(marker) {
        marker.getElement().style.display = mountainCamsVisible ? 'block' : 'none';
    });
}

// Add this near your other toggle functions
function toggleTrailAdjustment() {
    const trailMarkers = [];
    
    Object.keys(trailData).forEach(function(trail) {
        // Check if trail has split paths
        if (trailData[trail].coordinates.main) {
            // Handle split trail
            ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                let points = trailData[trail].coordinates[pathType];
                
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
            let points = [...trailData[trail].coordinates];
            
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
    if (!event.target.matches('#mainToggle')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let dropdown of dropdowns) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    }
}

function toggleTrailsByDifficulty(difficulty) {
    Object.keys(trailData).forEach(trail => {
        if (trailData[trail].difficulty === difficulty) {
            // Check if it's a split trail
            if (trailData[trail].coordinates.main) {
                // Handle split trail visibility
                ['main', 'leftFork', 'rightFork'].forEach(pathType => {
                    const checkbox = document.getElementById(`toggle${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}Trails`);
                    map.setLayoutProperty(
                        `${trail}-${pathType}-layer`,
                        'visibility',
                        checkbox.checked ? 'visible' : 'none'  // Changed this line
                    );
                });
            } else {
                // Handle regular trail visibility
                const checkbox = document.getElementById(`toggle${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}Trails`);
                map.setLayoutProperty(
                    `${trail}-layer`,
                    'visibility',
                    checkbox.checked ? 'visible' : 'none'  // Changed this line
                );
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
            toggleTrailsByDifficulty(cb.id.replace('toggle', '').replace('Trails', '').toLowerCase());
        });
    }
});

// Handle Mountain Features toggle
document.getElementById('toggleFeatures').addEventListener('change', function() {
    const difficultyDropdown = this.parentElement.querySelector('.difficulty-dropdown');
    difficultyDropdown.style.display = this.checked ? 'block' : 'none';
    
    if (!this.checked) {
        difficultyDropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
    }
});

// Handle difficulty toggles for trails
['Green', 'Blue', 'Black'].forEach(difficulty => {
    document.getElementById(`toggle${difficulty}Trails`).addEventListener('change', function() {
        toggleTrailsByDifficulty(difficulty.toLowerCase());
    });
});

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
function createFeatureMarkers(features) {
    console.log('Creating markers with features:', features);
    
    if (!features || !Array.isArray(features)) {
        console.warn('No valid features provided');
        return;
    }

    features.forEach(feature => {
        if (feature && feature.geometry && Array.isArray(feature.geometry.coordinates)) {
            try {
                const marker = new mapboxgl.Marker()
                    .setLngLat(feature.geometry.coordinates)
                    .addTo(map);
                console.log('Marker created for:', feature);
            } catch (error) {
                console.error('Error creating marker:', error);
            }
        }
    });
}

// Updated toggle function for features
function toggleFeaturesByDifficulty(difficulty) {
    console.log(`Toggling ${difficulty} features`);
    mountainMarkers.forEach(marker => {
        if (marker.difficulty === difficulty) {
            const checkbox = document.getElementById(`toggle${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}Features`);
            if (checkbox) {
                console.log(`Setting ${difficulty} markers visibility:`, checkbox.checked);
                marker.getElement().style.visibility = checkbox.checked ? 'visible' : 'hidden';
            }
        }
    });
}

// Update the main features toggle handler
document.getElementById('toggleFeatures').addEventListener('change', function() {
    console.log("Main features toggle clicked!");
    const difficultyDropdown = this.parentElement.querySelector('.difficulty-dropdown');
    console.log("Dropdown found:", difficultyDropdown !== null);
    difficultyDropdown.style.display = this.checked ? 'block' : 'none';
    
    if (!this.checked) {
        difficultyDropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
    }
});

['Green', 'Blue', 'Black'].forEach(difficulty => {
    const checkbox = document.getElementById(`toggle${difficulty}Features`);
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            console.log(`${difficulty} features checkbox clicked! Checked:`, this.checked);
            toggleFeaturesByDifficulty(difficulty.toLowerCase());
        });
    } else {
        console.log(`${difficulty} features checkbox not found!`);
    }
});

// Add click event listener for coordinates
map.on('click', (e) => {
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;
    console.log(`Coordinates: [${lng}, ${lat}]`);
});

