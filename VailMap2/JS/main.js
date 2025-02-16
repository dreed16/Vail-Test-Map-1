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
            [-106.3338499807374,39.60494616948563],
            [-106.33320491588736,39.60402103893163],
            [-106.33271021122039,39.60325902837016],
            [-106.33209297171938,39.60240500687101],
            [-106.33130325388896,39.600440235465385],
            [-106.33125380218794,39.59934548127268],
            [-106.33130581392386,39.59801825867885]
        ],
        color: '#000000',
        difficulty: 'black'
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
        color: '#000000',
        difficulty: 'black'
    },
    'SilkRoad': { 
        coordinates: [
            [-106.32177142106718,39.60512540388757],
            [-106.31982910351314,39.60069588590832],
            [-106.3192637211678,39.60036057567319],
            [-106.31861148221404,39.60038243045415],
            [-106.31803933000627,39.60065949992057],
            [-106.31694520650642,39.60074489960306],
            [-106.31535848920245,39.59984724473259]
        ],
        difficulty: 'blue',
        color: '#0000FF'
    },
    'OrientExpressTrail': { 
        coordinates: [
            [-106.32017866171509,39.600167528619636],
            [-106.32171113700412,39.598035082773805],
            [-106.32265227435059,39.59672452659342],
            [-106.32336591893663,39.59526745819309],
            [-106.32393586258281,39.593944289253386],
            [-106.32406684963038,39.59288506772745],
            [-106.32291139823022,39.58890346095947]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'Rasputinsrevenge': { 
        coordinates: [
            [-106.32323000030945,39.594938372437326],
            [-106.32157417286649,39.59439883521651],
            [-106.3207762805065,39.593960869019185],
            [-106.32019196005288,39.59363826838779],
            [-106.31975532198952,39.59323680865535],
            [-106.3195219230439,39.59300014960115],
            [-106.31923337863525,39.5927286187611]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'RedSquare': { 
        coordinates: [
            [-106.32146655756654,39.59714541727155],
            [-106.32084781524293,39.596771624968284],
            [-106.32020354779445,39.596238007916554],
            [-106.31966599783497,39.59568820387241],
            [-106.31919209656007,39.59519056993349],
            [-106.31892999603677,39.59480467598368],
            [-106.31866039066918,39.59439579438853]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'BolshoiBallroom': { 
        coordinates: {
            main: [
                [-106.31542457730255,39.599387440670625],
                [-106.31534268498602,39.59883929720101],
                [-106.31531962387996,39.59824019554941],
                [-106.31516317956397,39.59789934865634],
                [-106.31507871509719,39.597403603626816],
                [-106.31484598495133,39.597020741294756]
            ],
            leftFork: [
                [-106.31484598495133,39.597020741294756],
                [-106.31554505002063,39.5955666409227],
                [-106.31614398792476,39.59484888893306],
                [-106.31643375491083,39.594158128964494],
                [-106.3165850686041,39.593566590530656],
                [-106.31693790620069,39.592955520452705],
                [-106.31732840268984,39.59251740429093],
                [-106.31747729916646,39.592180393584925],
                [-106.31759149011855,39.59180121197559],
                [-106.31781028761887,39.59111811236261]
            ],
            rightFork: [
                [-106.31484598495133,39.597020741294756],
                [-106.31364923744357,39.59749985534319],
                [-106.31298690629467,39.59802997799602],
                [-106.31234333342263,39.59860949318423],
                [-106.3116214965331,39.59926982353977],
                [-106.31089167279536,39.59964552990439],
                [-106.31011903296603,39.59989292170113]
            ]
        },
        difficulty: 'black',
        color: '#000000'
    },

    'SleepyTimeRoad': { 
        coordinates: {
            main: [
                // First 10 coordinates (start to split point)
                [-106.35606890285922,39.60471593997872],
                [-106.3505874254397,39.6042846391654],
                [-106.3463426235185,39.60320615797832],
                [-106.34274705232006,39.60151764093206],
                [-106.34231767062953,39.59994233160447],
                [-106.3441216567242,39.59542845599796],
                [-106.34515727815311,39.593624382703496],
                [-106.34680933809939,39.591905611144966],
                [-106.34839064811338,39.590913257886484],
                [-106.3495562680591,39.589237878082855]
            ],
            leftFork: [
                // Starting from split point
                [-106.3495562680591,39.589237878082855],
                [-106.34790539842167,39.588259367852515],
                [-106.34620613585055,39.58680705965301],
                [-106.34444006984933,39.586715100184904],
                [-106.34150863238565,39.59095768718751],
                [-106.3404237069598,39.59060937432679],
                [-106.33888181256125,39.58789405675478],
                [-106.33802222942467,39.58646331011954],
                [-106.33629508399363,39.585801815773124],
                [-106.33453441410799,39.58571753260043],
                [-106.33373156159465,39.58747029513219],
                [-106.33328419654654,39.58742250554795],
                [-106.33236095807321,39.58593923491941]
            ],
            rightFork: [
                [-106.3495562680591,39.589237878082855],
                [-106.34952097457875,39.58969936941591],
                [-106.34957234459563,39.59005225586307],
                [-106.34952051102074,39.59047928843185],
                [-106.34944958831323,39.59109001467837],
                [-106.34922029406776,39.59251902059992],
                [-106.34841844076763,39.595030612474545],
                [-106.34843150722615,39.59690354558532]
            ]
        },
        difficulty: 'blue',
        color: '#0000FF'
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
        color: '#000000',
        difficulty: 'black'
    },
    'OverYonder': { 
        coordinates: [
            [-106.34494559343842,39.59430598848766],
            [-106.34545837254494,39.594690969966706],
            [-106.34590776695947,39.595025089533806],
            [-106.34650376382278,39.59528518321977],
            [-106.34738979426069,39.5956663269433],
            [-106.34779137591633,39.595830585050095],
            [-106.3483717378382,39.596013311949235]
        ],
        difficulty: 'blue',
        color: '#0000FF'
    },
    'Yonder': { 
        coordinates: [
            [-106.34821857329123,39.597581270323786],
            [-106.34494918543417,39.59949859334523],
            [-106.34307057678743,39.60027034491665],
            [-106.34164249417324,39.600889668308724],
            [-106.34066195091175,39.6016188513228],
            [-106.33983656047991,39.60244813351076],
            [-106.33704564863534,39.602133817674996]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'Headwall': { 
        coordinates: [
            [-106.34844027497086,39.59740067241066],
            [-106.34846853695223,39.59898901292004],
            [-106.34862979542699,39.600053442395534],
            [-106.34889430697068,39.60115277139988],    
            [-106.34904911333521,39.602132941877045],
            [-106.34902876475667,39.6028644717135],
            [-106.34921414379075,39.60373965512446]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'YonderGully': { 
        coordinates: [
            [-106.3481212239938,39.59826293298076],
            [-106.34571145598846,39.6000645644111],
            [-106.34419591440916,39.601209673053916],
            [-106.342797438672,39.60211998206137],
            [-106.34147315446087,39.60250499077546],
            [-106.34007240570244,39.60252438932349],
            [-106.33704340562252,39.602128916129374]
        ],
        difficulty: 'black',
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
        color: '#000000',
        difficulty: 'black'
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
        color: '#0000FF',
        difficulty: 'blue'
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
        color: '#0000FF',
        difficulty: 'blue'
    },
    'Chopstix': { 
        coordinates: [
            [-106.32406563973177, 39.604773053393416],
            [-106.32475805519992, 39.60411475062989],
            [-106.32527541955858, 39.6035772293921],
            [-106.32567800112145, 39.60301202974799],
            [-106.32604343305513, 39.60264749771602],
            [-106.32642477130658, 39.60220493553436],
            [-106.32739667721695, 39.601005948448574]
        ], 
        color: '#0000FF',
        difficulty: 'blue' 
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
        color: '#000000',
        difficulty: 'black' 
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
        color: '#000000',
        difficulty: 'black'
    },
    'RedZinger': {
        coordinates: [
            [-106.33668313576999,39.60173021689437],
            [-106.33845386610771,39.59939275831738],
            [-106.34031610799737,39.597706734459706],
            [-106.3427777905386,39.59646852365779],
            [-106.34302246774338,39.59589845214032],
            [-106.3424227697137,39.59295216250419],
            [-106.34160259253032,39.591152092197774]
        ],
        difficulty: 'blue',
        color: '#0000FF'
    },
    'EmperorsChoice': {
        coordinates: [
            [-106.33894304082807,39.59719316081336],
            [-106.33947475943913,39.59548304097825],
            [-106.33980995178283,39.59465459891862],
            [-106.34017884135383,39.59360205512519],
            [-106.34054496081725,39.5925595058053],
            [-106.34076257704852,39.59164562854457],
            [-106.34103374147472,39.59105886496474]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'MorningThunder': {
        coordinates: [
            [-106.34583811317843,39.59138940041677],
            [-106.34499923032627,39.59099832015096],
            [-106.3445061815571,39.590742146108795],
            [-106.34402326893745,39.590513042191844],
            [-106.34334685315699,39.59011480141331],
            [-106.34289321564594,39.58982470581495],
            [-106.34240697602664,39.589545984274025]
        ],
        difficulty: 'black',
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
        color: '#0000FF',
        difficulty: 'blue'
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

// Lift data
var liftData = {
    'Orient': {
        coordinates: [[-106.332047, 39.586120], [-106.321984, 39.605166]],
        color: '#FF0000',
        popupContent: "<strong>Orient Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?si=JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'Wapiti': {
        coordinates: [[-106.3308982336383, 39.606005723781834], [-106.32862158916038, 39.60553707497087]],
        color: '#FF0000',
        popupContent: "<strong>Wapiti</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?si=JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'Test1': {
        coordinates: [[-106.348416, 39.597273], [-106.336842, 39.602036]],
        color: '#FF0000',
        popupContent: "<strong>Orient Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?si=JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'Mongolia': {
        coordinates: [[-106.31537974887122, 39.59980436898809], [-106.31027072825114, 39.59998686506145]],
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

    // First, define your popup content
    var trailPopups = {
        'DragonsTeeth': {
            content: "<strong>Dragon's Teeth</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Chopstix': {
            content: "<strong>Chopstix</strong><br><strong>Rating:</strong> Blue<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'PoppyfieldsWest': {
            content: "<strong>Poppyfields West</strong><br><strong>Rating:</strong> Blue<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'PoppyfieldsEast': {
            content: "<strong>Poppyfields West</strong><br><strong>Rating:</strong> Blue<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Poppyfields': {
            content: "<strong>Poppyfields</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'SilkRoad': {
            content: "<strong>Silk Road</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'RedSquare': {
            content: "<strong>Red Square</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'OrientExpressTrail': {
            content: "<strong>Orient Express</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Rasputinsrevenge': {
            content: "<strong>Rasputin's Revenge</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'SleepyTimeRoad': {
            content: "<strong>Sleepy Time Road</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
                'OverYonder': {
            content: "<strong>Over Yonder</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Headwall': {
            content: "<strong>Headwall</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'YonderGully': {
            content: "<strong>Yonder Gully</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Yonder': {
            content: "<strong>Yonder</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Sweetnsour': {
            content: "<strong>Sweet N Sour</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'GenghisKhan': {
            content: "<strong>Genghis Khan</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'ShangriLa': {
            content: "<strong>Shangri La</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'ShangriLaGlades': {
            content: "<strong>Shangri La Glades</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'RedZinger': {
            content: "<strong>Red Zinger</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'EmperorsChoice': {
            content: "<strong>Emperor's Choice</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'MorningThunder': {
            content: "<strong>Morning Thunder</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'JadeGlade': {
            content: "<strong>Jade's Glade</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 750 feet<br><strong>Average Slope:</strong> 33 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/ALC1TUvSRMQ' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'BolshoiBallroom': {
            content: "<strong>Bolshoi Ballroom</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 750 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        }
    };

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
});

// Toggle functions
function toggleTrails() {
    trailsVisible = !trailsVisible;
    console.log('Toggling trails:', trailsVisible);
    Object.keys(trailData).forEach(function(trail) {
        console.log('Toggling trail:', trail);
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

function toggleDropdown() {
    document.getElementById('difficultyDropdown').classList.toggle('show');
}

function toggleTrailsByDifficulty(difficulty, show) {
    console.log('Toggling', difficulty, 'trails:', show ? 'show' : 'hide');
    Object.keys(trailData).forEach(function(trail) {
        console.log('Checking trail:', trail, 'difficulty:', trailData[trail].difficulty);
        if (trailData[trail].difficulty === difficulty) {
            console.log('Matching trail found:', trail);
            map.setLayoutProperty(`${trail}-layer`, 'visibility', show ? 'visible' : 'none');
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
        'Teacupexpress-layer'
    ];
    
    liftLayers.forEach(liftId => {
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
    
    // Add remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Lift Adjustment Markers';
    removeButton.style.position = 'absolute';
    removeButton.style.top = '10px';
    removeButton.style.right = '10px';
    removeButton.style.zIndex = '1';
    removeButton.onclick = function() {
        document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());
        removeButton.remove();
    };
    document.body.appendChild(removeButton);
}

// Update the adjustLiftsButton to use this function
var adjustLiftsButton = document.createElement('button');
adjustLiftsButton.textContent = 'Adjust Lifts';
adjustLiftsButton.onclick = toggleLiftAdjustment;
document.body.appendChild(adjustLiftsButton);
