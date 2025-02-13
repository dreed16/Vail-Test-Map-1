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
var mountainFeaturesVisible = true;
var liftsVisible = true;
var mountainCamsVisible = true;
var currentPopup = null;

// Arrays to store markers
var mountainMarkers = [];
var liveFeedMarkers = [];

// Trail data
var trailData = {
    'DragonsTeeth': { 
        coordinates: [
            [-106.33360120367342, 39.60487501838793],
            [-106.33320491588736, 39.60402103893163],
            [-106.33271021122039, 39.60325902837016],
            [-106.33209297171938, 39.60240500687101],
            [-106.33130325388896, 39.600440235465385],
            [-106.33125380218794, 39.59934548127268],
            [-106.33130581392386, 39.59801825867885]
        ],
        color: '#000000'
    },
    'MarmotValley': { 
        coordinates: [
            [-106.34111762395904, 39.59072123911366],
            [-106.34091762395904, 39.58972123911366],
            [-106.34071762395904, 39.58872123911366],
            [-106.34051762395904, 39.58772123911366],
            [-106.34031762395904, 39.58672123911366],
            [-106.34021762395904, 39.58572123911366],
            [-106.340036, 39.584859]
        ],
        color: '#000000'
    },
    'JadeGlade': { 
        coordinates: [
            [-106.335494, 39.601828],
            [-106.33483276158740, 39.60147547288984],
            [-106.33416617512561, 39.60082825485608],
            [-106.33370932092017, 39.60002633337050],
            [-106.33325246671473, 39.59922441188492],
            [-106.33279561250929, 39.59842249039934],
            [-106.33237932092017, 39.5967263333705]
        ],
        color: '#000000'
    },
    'GenghisKhan': { 
        coordinates: [
            [-106.33706053875133, 39.59736479932204],
            [-106.33654325048524, 39.59698593461498],
            [-106.33602596221915, 39.59660706990792],
            [-106.33538103459930, 39.59610055236565],
            [-106.33473610697945, 39.59559403482339],
            [-106.33417415130837, 39.59514304698915],
            [-106.33361219563729, 39.59469205915491]
        ],
        color: '#000000'
    },
    'Sweetnsour': { 
        coordinates: [
            [-106.33743671975635, 39.59658399932417],
            [-106.33761086016106, 39.59510707341883],
            [-106.33757342433755, 39.59412760869432],
            [-106.33747469911975, 39.59298044523888],
            [-106.33694302789574, 39.591983099674025],
            [-106.33512233845303, 39.5900351430665],
            [-106.33344662604492, 39.58908762667821]
        ],
        color: '#000000'
    },
    'PoppyfieldsWest': {
        coordinates: [
            [-106.33040768767634, 39.605620623631125],
            [-106.32955869012842, 39.60487847354679],
            [-106.32839052832892, 39.60409136595189],
            [-106.32790221621799, 39.60352931644377],
            [-106.32774366204681, 39.60308412100423],
            [-106.32756750224974, 39.60245802375934],
            [-106.32747703958593, 39.60102845561829]
        ],
        color: '#0000FF'
    },
    'PoppyfieldsEast': { 
        coordinates: [
            [-106.3213870335674, 39.60383772859976],
            [-106.32254914213337, 39.60169978993645],
            [-106.32411381148857, 39.60015780892715],
            [-106.32551718537667, 39.59908120254792],
            [-106.32688440928524, 39.59905095744216],
            [-106.3277140937584, 39.59916156114991],
            [-106.32879368407545, 39.599416867373066]
        ],
        color: '#0000FF'
    },
    'Chopstik': { 
        coordinates: [
            [-106.32406563973177, 39.604773053393416],
            [-106.32475805519992, 39.60411475062989],
            [-106.32527541955858, 39.6035772293921],
            [-106.32567800112145, 39.60301202974799],
            [-106.32604343305513, 39.60264749771602],
            [-106.32642477130658, 39.60220493553436],
            [-106.32739667721695, 39.601005948448574]
        ], 
        color: '#0000FF' 
    },
    'ShangriLa': { 
        coordinates: [
            [-106.32030589705374, 39.60126207868632],
            [-106.32186516198163, 39.598503015407346],
            [-106.32421650775059, 39.59688179873734],
            [-106.32594609190443, 39.596242214429026],
            [-106.32766501839058, 39.59567923600909],
            [-106.32968596420775, 39.59539106066731],
            [-106.33332426137922, 39.59485715833674]
        ], 
        color: '#000000' 
    },
    'ShangriLaGlades': {
        coordinates: [
            [-106.32781805591867, 39.59563456762777],
            [-106.32888101291769, 39.594639139629095],
            [-106.32968210289968, 39.5937502236938],
            [-106.33028793368395, 39.59295329312354],
            [-106.33097076692633, 39.592094116829145],
            [-106.33201678309163, 39.59097408760894],
            [-106.33274787380067, 39.58994356568138]
        ],
        color: '#000000'
    },
    'Poppyfields': { 
        coordinates: [
            [-106.32745982638474, 39.60099659231287],
            [-106.32916899905675, 39.599165780383856],
            [-106.33158557764204, 39.59724701620354],
            [-106.33320122839825, 39.595857143860314],
            [-106.33394378507137, 39.59350137980542],
            [-106.33361055744177, 39.59117530319412],
            [-106.33293042428278, 39.58622009339834]
        ],
        color: '#0000FF'
    }
};

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
            trailData[trail].coordinates = [
                startMarker.getLngLat().toArray(),
                endMarker.getLngLat().toArray()
            ];
            
            // Update the map source
            map.getSource(trail).setData({
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: trailData[trail].coordinates
                }
            });

            // Log new coordinates
            console.log(`${trail} coordinates:`, trailData[trail].coordinates);
        }

        startMarker.on('dragend', updateTrail);
        endMarker.on('dragend', updateTrail);
    });
}

// Lift data
var liftData = {
    'Orient': {
        coordinates: [[-106.332047, 39.586120], [-106.321984, 39.605166]],
        color: '#FF0000',
        popupContent: "<strong>Orient Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?si=JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'Teacupexpress': {
        coordinates: [[-106.339910, 39.584593], [-106.336286, 39.602144]],
        color: '#FF0000',
        popupContent: "<strong>Tea Cup Express</strong><br><strong>Type:</strong> High Speed Quad<br><strong>Vertical Rise:</strong> 900 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/ZwtX_f373Fc?si=lMzFeG5blH5rLmIw' frameborder='0' allowfullscreen></iframe>"
    }
};

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
                'line-cap': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': trailData[trail].color,
                'line-width': 4
            }
        });
    });

    // Trail popups
    var trailPopups = {
        'DragonsTeeth': new mapboxgl.Popup().setHTML(
            "<strong>Dragon's Teeth</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        ),
        'MarmotValley': new mapboxgl.Popup().setHTML(
            "<strong>Marmot Valley</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 750 feet<br><strong>Average Slope:</strong> 33 degrees<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/ALC1TUvSRMQ' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        ),
        'JadeGlade': new mapboxgl.Popup().setHTML(
            "<strong>Jade's Glade</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 750 feet<br><strong>Average Slope:</strong> 33 degrees<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/ALC1TUvSRMQ' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        ),
        'GenghisKhan': new mapboxgl.Popup().setHTML(
            "<strong>Genghis Khan</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 750 feet<br><strong>Average Slope:</strong> 33 degrees<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/yJVx9EpTIVc?si=mB7-5PNqzV-4AInp' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        ),
        'Sweetnsour': new mapboxgl.Popup().setHTML(
            "<strong>Sweet N Sour</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 1,000 feet<br><strong>Average Slope:</strong> 30 degrees<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/ThOTa-JYJy8' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        ),
        
        'PoppyfieldsWest': new mapboxgl.Popup().setHTML(
            "<strong>Poppyfields West</strong><br><strong>Rating:</strong> Blue<br><strong>Length:</strong> 800 feet<br><strong>Average Slope:</strong> 25 degrees<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/ALC1TUvSRMQ' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        ),
        'PoppyfieldsEast': new mapboxgl.Popup().setHTML(
            "<strong>Poppyfields East</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 800 feet<br><strong>Average Slope:</strong> 32 degrees<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/ALC1TUvSRMQ' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        ),
        'Chopstik': new mapboxgl.Popup().setHTML(
            "<strong>Chopstik</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 850 feet<br><strong>Average Slope:</strong> 33 degrees<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/ALC1TUvSRMQ' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        ),
        'ShangriLa': new mapboxgl.Popup().setHTML(
            "<strong>Shangri-La</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 900 feet<br><strong>Average Slope:</strong> 34 degrees<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/ALC1TUvSRMQ' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        ),
        'Poppyfields': new mapboxgl.Popup().setHTML(
            "<strong>Poppyfields</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 900 feet<br><strong>Average Slope:</strong> 32 degrees<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/ALC1TUvSRMQ' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        ),
        'ShangriLaGlades': new mapboxgl.Popup().setHTML(
            "<strong>Shangri-La Glades</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 800 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/ALC1TUvSRMQ' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        )
    };

    // Add click handlers for trails
    Object.keys(trailData).forEach(function(trail) {
        map.on('click', trail, function() {
            if (currentPopup) currentPopup.remove();
            currentPopup = trailPopups[trail].setLngLat(trailData[trail].coordinates[0]).addTo(map);
        });
    });

    // Add mountain features
    var mountainFeatureCoordinates = [
        { coords: [-106.339999, 39.585711], videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo' },
        { coords: [-106.336291, 39.594849], videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo' },
        { coords: [-106.333330, 39.604559], videoUrl: 'https://www.youtube.com/embed/EFjP6GB0zdk' },
        
        // New coordinates from your dragged markers
        { coords: [-106.32697124, 39.59998474], videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo' },
        { coords: [-106.32895412, 39.59646740], videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo' },
        { coords: [-106.33142281, 39.59184998], videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo' }
    ];

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

    // Add markers with custom icon
    mountainFeatureCoordinates.forEach(function(feature, index) {
        const colors = ['#ff0000', '#00ff00', '#000000'];
        var marker = new mapboxgl.Marker({
            element: createCustomMarker(colors[index % 3])
        })
            .setLngLat(feature.coords)
            .setPopup(new mapboxgl.Popup().setHTML(
                "<strong>Mountain Features</strong><br>" +
                `<iframe width='200' height='113' src='${feature.videoUrl}' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>`
            ))
            .addTo(map);
        mountainMarkers.push(marker);
    });

    // Add live feed markers
    var liveFeedLocations = [
        { coords: [-106.355674, 39.604221], url: 'https://www.vail.com/the-mountain/mountain-conditions/mountain-cams.aspx' },
        { coords: [-106.368018, 39.614264], url: 'https://www.vail.com/the-mountain/mountain-conditions/mountain-cams.aspx' },
        { coords: [-106.301739, 39.601607], url: 'https://www.vail.com/the-mountain/mountain-conditions/mountain-cams.aspx' },
        { coords: [-106.331016, 39.573307], url: 'https://www.vail.com/the-mountain/mountain-conditions/mountain-cams.aspx' },
        { coords: [-106.338181, 39.602480], url: 'https://www.vail.com/the-mountain/mountain-conditions/mountain-cams.aspx' },
        { coords: [-106.386440, 39.617826], url: 'https://www.vail.com/the-mountain/mountain-conditions/mountain-cams.aspx' }
    ];

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
                'line-dasharray': [4, 4]
            },
            layout: { 'visibility': 'visible' }
        });

        map.on('click', `${lift}-layer`, function() {
            if (currentPopup) currentPopup.remove();
            currentPopup = new mapboxgl.Popup().setLngLat(liftData[lift].coordinates[0]).setHTML(liftData[lift].popupContent).addTo(map);
        });
    });

    // makeTrailsDraggable();  // Uncomment this line when you want to adjust trails
});

// Toggle functions
function toggleTrails() {
    trailsVisible = !trailsVisible;
    Object.keys(trailData).forEach(function(trail) {
        map.setLayoutProperty(`${trail}-layer`, 'visibility', trailsVisible ? 'visible' : 'none');
    });
}

function toggleMountainFeatures() {
    mountainFeaturesVisible = !mountainFeaturesVisible;
    mountainMarkers.forEach(function(marker) {
        marker.getElement().style.display = mountainFeaturesVisible ? 'block' : 'none';
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
        // Create array to store all points (start, mid1, mid2, end)
        let points = [...trailData[trail].coordinates];
        
        // Add midpoints if they don't exist
        if (points.length === 2) {
            const [start, end] = points;
            // Calculate two midpoints to create 3 equal segments
            const mid1 = [
                start[0] + (end[0] - start[0]) / 3,
                start[1] + (end[1] - start[1]) / 3
            ];
            const mid2 = [
                start[0] + 2 * (end[0] - start[0]) / 3,
                start[1] + 2 * (end[1] - start[1]) / 3
            ];
            points = [start, mid1, mid2, end];
        }
        
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
            // Get coordinates from all markers
            const newCoords = markers.map(marker => marker.getLngLat().toArray());
            trailData[trail].coordinates = newCoords;
            
            // Update the map source
            map.getSource(trail).setData({
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: newCoords
                }
            });

            console.log(`${trail} new coordinates:`, JSON.stringify(newCoords));
        }

        // Add dragend listener to all markers
        markers.forEach(marker => marker.on('dragend', updateTrail));
    });

    // Add button to remove adjustment markers
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Trail Adjustment Markers';
    removeButton.style.position = 'absolute';
    removeButton.style.top = '10px';
    removeButton.style.right = '10px';
    removeButton.style.zIndex = '1';
    removeButton.onclick = function() {
        trailMarkers.forEach(marker => marker.remove());
        removeButton.remove();
    };
    document.body.appendChild(removeButton);
}
