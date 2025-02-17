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

// Then your mountainFeatureData
const mountainFeatureData = {
    'RockDrop1': {
        coordinates: [-106.339999, 39.585711],
        difficulty: 'green',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 1</strong><br><strong>Rating:</strong> Green<br><strong>Type:</strong> Beginner Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'RockDrop2': {
        coordinates: [-106.336291, 39.594849],
        difficulty: 'blue',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 2</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'RockDrop3': {
        coordinates: [-106.308402, 39.596582],
        difficulty: 'blue',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 2</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'RockDrop4': {
        coordinates: [-106.313593, 39.594497],
        difficulty: 'black',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 2</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'RockDrop5': {
        coordinates: [-106.323305, 39.593049],
        difficulty: 'black',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 2</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'RockDrop6': {
        coordinates: [-106.323688, 39.591749],
        difficulty: 'black',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 2</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'RockDrop7': {
        coordinates: [-106.302832, 39.596664],
        difficulty: 'green',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 2</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'RockDrop8': {
        coordinates: [-106.303139, 39.591508],
        difficulty: 'green',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 2</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'RockDrop9': {
        coordinates: [-106.353852, 39.597364],
        difficulty: 'green',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 2</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'RockDrop10': {
        coordinates: [-106.353365, 39.594066],
        difficulty: 'black',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 2</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'RockDrop11': {
        coordinates: [-106.347805, 39.595189],
        difficulty: 'black',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 2</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'RockDrop12': {
        coordinates: [-106.369066, 39.595175],
        difficulty: 'black',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 2</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'RockDrop13': {
        coordinates: [-106.367089, 39.602693],
        difficulty: 'black',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 2</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'TerrainPark3': {
        coordinates: [-106.333330, 39.605559],
        difficulty: 'black',
        videoUrl: 'https://www.youtube.com/embed/EFjP6GB0zdk',
        content: "<strong>Terrain Park 3</strong><br><strong>Rating:</strong> Black<br><strong>Type:</strong> Advanced Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/EFjP6GB0zdk' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'TerrainPark4': {
        coordinates: [-106.32697124, 39.59998474],
        difficulty: 'green',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 4</strong><br><strong>Rating:</strong> Green<br><strong>Type:</strong> Beginner Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'TerrainPark5': {
        coordinates: [-106.32895412, 39.59646740],
        difficulty: 'blue',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 5</strong><br><strong>Rating:</strong> Blue<br><strong>Type:</strong> Intermediate Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'TerrainPark6': {
        coordinates: [-106.33142281, 39.59184998],
        difficulty: 'black',
        videoUrl: 'https://www.youtube.com/embed/oEGp6xxbvLo',
        content: "<strong>Terrain Park 6</strong><br><strong>Rating:</strong> Black<br><strong>Type:</strong> Advanced Terrain Park<br>" +
            "<iframe width='200' height='113' src='https://www.youtube.com/embed/oEGp6xxbvLo' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    'MarmotValley': {
        coordinates: [
            [-106.34121769108032,39.590748368721535],
            [-106.34076993307175,39.58992340367948],
            [-106.34076463974233,39.588942164680475],
            [-106.34067035276605,39.58825782483714],
            [-106.34028551361685,39.58699356620821],
            [-106.34012420108256,39.585933878251296],
            [-106.33994321846883,39.5849478093738]
        ],
        difficulty: 'black',
        color: '#000000'
    }
};

// Initialize your variables
let mountainMarkers = [];

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
    'SilkRoad2': { 
        coordinates: [
            [-106.30987152325706,39.599670057332474],
            [-106.30419055630101,39.598441117743164],
            [-106.29925631666852,39.59637861613626],
            [-106.29922397276528,39.593646036833746],
            [-106.30094603891776,39.59138686893766],
            [-106.3035114053874,39.58999889155757],
            [-106.30482611381514,39.589147953774585],
            [-106.3063820812357,39.589052668438],
            [-106.3078981326763,39.58913606794755],
            [-106.30908711615977,39.5894391388498],
            [-106.31166918576231,39.589098468099735],
            [-106.31275981055472,39.58947772169489],
            [-106.3146740120924,39.59057428453093],
            [-106.31608211889603,39.59086236930622],
            [-106.31821316552613,39.59087632394005],
            [-106.3197355998969,39.59020424766655],
            [-106.32665709905902,39.58652030531371],
            [-106.32926119715509,39.58573297871578],
            [-106.33202344872058,39.585794813749885]
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
    'OuterMongoliaBowl': { 
        coordinates: [
            [-106.30141526757174,39.59697019989372],
            [-106.30208364323178,39.59599739220411],
            [-106.30280548468416,39.595106991068604],
            [-106.30375882082515,39.59395024281429],
            [-106.30459141390111,39.592502099315794],
            [-106.30491300691888,39.5912224273313],
            [-106.30612371127309,39.58914653702459]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'GorkyPark': { 
        coordinates: [
            [-106.31838683657757,39.600151251433914],
            [-106.31823673681502,39.59921725138608],
            [-106.31801801748944,39.59856322715248],
            [-106.31793604384676,39.597474222825554],
            [-106.31817851066775,39.59622577405656],
            [-106.31887647285546,39.59334676472503],
            [-106.3187343899681,39.59070141710984]
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
    'InnerMongoliaBowl': { 
        coordinates: {
            main: [
                [-106.3098381753307,39.59949192811237],
                [-106.30912405668799,39.598763977247984],
                [-106.30856201374378,39.59804696271047],
                [-106.30812210410944,39.59753013991002],
                [-106.30781698953906,39.59709120593902],
                [-106.30792218142221,39.59668416747974]
            ],
            leftFork: [
                // Starting from merge point
                [-106.30792218142221,39.59668416747974],
                [-106.30842698386985,39.59594163633608],
                [-106.30882527781527,39.59548211326691],
                [-106.30932048517695,39.59499182224337],
                [-106.31008582820849,39.59426933777857],
                [-106.31080353919397,39.5935641991222],
                [-106.31129149575153,39.5929608480362],
                [-106.31183128921363,39.59213550686317],
                [-106.31240819576766,39.59117588352285],
                [-106.31298352951961,39.59041559657507]
            ],
            rightFork: [
                // Starting from merge point
                [-106.30792218142221,39.59668416747974],
                [-106.30730259159799,39.59695000998968],
                [-106.30671352414076,39.59719788427341],
                [-106.30605987063622,39.59752356330617],
                [-106.30525496293883,39.597871512659225],
                [-106.30471730521963,39.59810197188463],
                [-106.3042754819121,39.59822214524888]
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
        difficulty: 'black',
        color: '#000000'
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
        difficulty: 'black',
        color: '#000000'
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
    'Miltsface': { 
        coordinates: [
            [-106.35478541900021,39.60200606316275],
            [-106.3540932242399,39.601758693961756],
            [-106.35316438415161,39.60129920600363],
            [-106.35256369793255,39.60118620338136],
            [-106.35185972571527,39.601055292526496],
            [-106.35128787374813,39.600972520226435],
            [-106.35067905035888,39.600808503895905]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'CowsFace': { 
        coordinates: [
            [-106.35492321944508,39.599521416993866],
            [-106.35403026414622,39.599031573280456],
            [-106.35293766159205,39.59824191184185],
            [-106.35217073872639,39.59769694128451],
            [-106.35138278600863,39.59717361759391],
            [-106.35064522629615,39.59659843363474],
            [-106.34982525861625,39.59567142100542]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'Campbells': { 
        coordinates: [
            [-106.3544738661612,39.6009218961982],
            [-106.35348239165587,39.60005855662797],
            [-106.35254388230284,39.59948001956374],
            [-106.3515365934209,39.59905757926464],
            [-106.35028719016778,39.59832188661278],
            [-106.34932254480997,39.59765368545891],
            [-106.34887818737322,39.59715549098814]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'ChickenYard': { 
        coordinates: [
            [-106.35548024719468,39.59900136846218],
            [-106.35655476700254,39.59804141804335],
            [-106.35688706869573,39.59669947680058],
            [-106.35661224894417,39.59574053953193],
            [-106.35598422117685,39.59470910393975],
            [-106.35538270532624,39.594119325728855],
            [-106.35469562526505,39.59253023550244]
        ],
        difficulty: 'black',  // Assuming blue based on name, let me know if different
        color: '#000000'
    },
    'TheSlot': { 
        coordinates: [
            [-106.3543401753827,39.60409251248532],
            [-106.35347647439747,39.60342832933762],
            [-106.35285586342863,39.60298297103964],
            [-106.34957212175378,39.59986378384926],
            [-106.34850958727114,39.59817837899979],
            [-106.3486277371072,39.59713070801436],
            [-106.34991202482227,39.59530664248376],
            [-106.35254032699737,39.593281046969],
            [-106.35794456354837,39.59064872083408],
            [-106.35926917719121,39.59086992234657],
            [-106.36085723289565,39.590831974399805]
        ],
        difficulty: 'blue',
        color: '#0000FF'
    },
    'ApresVous': { 
        coordinates: [
            [-106.3551822258895,39.60364029191007],
            [-106.35526945528397,39.60283697491343],
            [-106.35508003338758,39.600878295201966],
            [-106.35532092912666,39.59957688675388],
            [-106.35541536121046,39.5984768969943],
            [-106.35476752686908,39.59674137261737],
            [-106.35420465780342,39.59604315515054],
            [-106.35326891134582,39.59532925210314],
            [-106.35302045847921,39.5950805303184],
            [-106.35270784877717,39.59469392251043],
            [-106.3523569839152,39.59403499523444]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'Forever': { 
        coordinates: [
            [-106.35592080135322,39.60380466857936],
            [-106.35612403924665,39.603028252666604],
            [-106.35634322827657,39.60188254842171],
            [-106.35721859975588,39.600932188333985],
            [-106.35860855395758,39.60064408285291],
            [-106.35933486668392,39.60044631445783],
            [-106.35976854425816,39.59941868773785],
            [-106.36024046549778,39.59809391967278],
            [-106.36140537500741,39.59695298059714],
            [-106.36337124781947,39.59573019126472],
            [-106.36466678033834,39.594975226581454]
        ],
        difficulty: 'black',  // Assuming black based on length/steepness, let me know if different
        color: '#000000'
    },
    'Wow': { 
        coordinates: [
            [-106.35748507062063,39.604459218696235],
            [-106.35745196707185,39.603578052479094],
            [-106.35753521859499,39.60301432160776],
            [-106.35978851883641,39.601459532184634],
            [-106.3602151258385,39.60085102770941],
            [-106.36099409426967,39.60030694413186],
            [-106.3622269870212,39.59980603528314],
            [-106.36298149440077,39.59944448979394],
            [-106.36393343003076,39.59901607119025],
            [-106.36474075816344,39.59841303163611],
            [-106.36590866011223,39.59757321995622]
        ],
        difficulty: 'black',  // Assuming black based on steepness, let me know if different
        color: '#000000'
    },
    'Windows': { 
        coordinates: [
            [-106.36434529925234,39.60408142605766],
            [-106.36452513890472,39.60354245276619],
            [-106.36451739880087,39.60289423115978],
            [-106.36443532211133,39.602243471780184],
            [-106.36477144010028,39.60163220065681],
            [-106.36608098174132,39.600491994322994],
            [-106.36647617245306,39.60007468913281]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'MorningSideRidge': { 
        coordinates: [
            [-106.37230889371128,39.60271215771948],
            [-106.37178417772057,39.60187954249099],
            [-106.3712782250805,39.60126322727257],
            [-106.3704706603337,39.60037704859545],
            [-106.36954306776465,39.599560317098934],
            [-106.36812419034537,39.59892894899576],
            [-106.36708976025852,39.59875421242924]
        ],
        difficulty: 'black',  // Assuming black based on name and location, let me know if different
        color: '#000000'
    },
    'StraightShot': { 
        coordinates: [
            [-106.36947761248742,39.60448989803126],
            [-106.36888513216144,39.60401462342699],
            [-106.36787374826571,39.60216031871306],
            [-106.36709353624111,39.60069708407556],
            [-106.366791267308,39.59979003490204],
            [-106.36652464152122,39.5983201985629],
            [-106.36594868069295,39.597088415839096],
            [-106.3649685635435,39.595358609360545],
            [-106.36396811112063,39.59343602056791],
            [-106.36338927985685,39.592105253836905],
            [-106.36134218291144,39.59108098428425]
        ],
        difficulty: 'black',  // Assuming black based on steepness, let me know if different
        color: '#000000'
    },
    'OS': { 
        coordinates: [
            [-106.37266364571751,39.602311886885985],
            [-106.3737776125502,39.600887684968995],
            [-106.37448589421966,39.599815425181816],
            [-106.3757398342663,39.598884723433656],
            [-106.3766786241653,39.597481083881746],
            [-106.37639266572978,39.594841481703156],
            [-106.3745845547199,39.593597850785216],
            [-106.37103558515356,39.59349371284014],
            [-106.36896022255641,39.59357941794951],
            [-106.36656393769431,39.59416868703332],
            [-106.3647903735342,39.59460632022416]
        ],
        difficulty: 'black',  // Assuming black based on location and path, let me know if different
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
    'RickysRidge': { 
        coordinates: [
            [-106.37383407118429,39.600305323564584],
            [-106.37305201850025,39.59980426949198],
            [-106.37232573437176,39.59932772778481],
            [-106.37133619000298,39.59876769670902],
            [-106.37053124878125,39.598493801200135],
            [-106.36923190115641,39.59814386805681],
            [-106.36642758938953,39.59779150567536]
        ],
        difficulty: 'black',  // Assuming blue based on name, let me know if different
        color: '#000000'
    },
    'Seldom': { 
        coordinates: [
            [-106.37631824181072,39.59714810606357],
            [-106.37447831210973,39.59690274411324],
            [-106.37260618400909,39.59672336871583],
            [-106.37124857960127,39.596825499539705],
            [-106.36985137710334,39.5969991746251],
            [-106.36807470346173,39.5967414786671],
            [-106.36591730396673,39.59661250381578]
        ],
        difficulty: 'black',  // Assuming black based on location, let me know if different
        color: '#000000'
    },
    'Never': { 
        coordinates: [
            [-106.37607457213849,39.59517363413329],
            [-106.37482861501582,39.5951237749388],
            [-106.37313296857353,39.595189885537735],
            [-106.3717051941947,39.59539101257127],
            [-106.36983295054996,39.59546327735538],
            [-106.36795929222777,39.59550361822693],
            [-106.36543549576909,39.595769659831745]
        ],
        difficulty: 'black',  // Assuming black based on location, let me know if different
        color: '#000000'
    },
    'Widges': { 
        coordinates: [
            [-106.37520511997711,39.59897164661936],
            [-106.37464764129554,39.59886426965457],
            [-106.37415088130871,39.598809089661074],
            [-106.37363970350694,39.598683986352995],
            [-106.37311671951193,39.59862853000797],
            [-106.37263791514435,39.59846878378866],
            [-106.37026460265045,39.597114594220045]
        ],
        difficulty: 'black',  // Assuming black based on location, let me know if different
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
        difficulty: 'black',
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
            [-106.34254379843672,39.58962216551578]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'TeaCupGlades': {
        coordinates: [
            [-106.34408838371183,39.58678354923842],
            [-106.34354269406246,39.58657951506959],
            [-106.34290303938485,39.58632096372608],
            [-106.34246117651868,39.586127377572325],
            [-106.34190774641381,39.58587098069776],
            [-106.34123981353886,39.58547798548901],
            [-106.3402251680436,39.584711941342846]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'MarmotValley': {
        coordinates: [
            [-106.34121769108032,39.590748368721535],
            [-106.34076993307175,39.58992340367948],
            [-106.34076463974233,39.588942164680475],
            [-106.34067035276605,39.58825782483714],
            [-106.34028551361685,39.58699356620821],
            [-106.34012420108256,39.585933878251296],
            [-106.33994321846883,39.5849478093738]
        ],
        difficulty: 'black',
        color: '#000000'
    },
    'WFO': {
        coordinates: [
            [-106.34979530334019,39.590111696965096],
            [-106.35060284704635,39.59024942779675],
            [-106.35158690029601,39.59036048585648],
            [-106.35264145724341,39.590611850163015],
            [-106.35372923494538,39.59082783429295],
            [-106.35506355524932,39.59091593542226],
            [-106.35629819408152,39.59103228182079]
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
    'HighNoonExpress': {
        coordinates: [
            [-106.36113961282129,39.590581899373234],
            [-106.35661343672389,39.60450585503446]
        ],
        color: '#FF0000'  // Assuming it's red like other lifts
    },
    'SunUpExpress': {
        coordinates: [
            [-106.36148710905488,39.59074324292021],
            [-106.37029027787614,39.60474819599358]
        ],
        color: '#FF0000'  // Assuming red like other lifts
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
        'SilkRoad2': {
            content: "<strong>Silk Road</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'RedSquare': {
            content: "<strong>Red Square</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'OuterMongoliaBowl': {
            content: "<strong>Outer Mongolia Bowl</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'GorkyPark': {
            content: "<strong>Gorky Park</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
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
        'TheSlot': {
            content: "<strong>The Slot</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'MiltsFace': {
            content: "<strong>Milt's Face</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'CowsFace': {
            content: "<strong>Cow's Face</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Campbells': {
            content: "<strong>Campbell's</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'ChickenYard': {
            content: "<strong>Chicken Yard</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'ApresVous': {
            content: "<strong>Apres Vous</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'YonderGully': {
            content: "<strong>Yonder Gully</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Forever': {
            content: "<strong>Forever</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Wow': {
            content: "<strong>Wow</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Windows': {
            content: "<strong>Windows</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'OS': {
            content: "<strong>OS</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'MorningSideRidge': {
            content: "<strong>Morning Side Ridge</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'StraightShot': {
            content: "<strong>Straight Shot</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
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
        'RickysRidge': {
            content: "<strong>Ricky's Ridge</strong><br><strong>Rating:</strong> Blue<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Seldom': {
            content: "<strong>Seldom</strong><br><strong>Rating:</strong> Blue<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Never': {
            content: "<strong>Never</strong><br><strong>Rating:</strong> Blue<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Widges': {
            content: "<strong>Widges</strong><br><strong>Rating:</strong> Blue<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
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
        'TeaCupGlades': {
            content: "<strong>Tea Cup Glades</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'MarmotValley': {
            content: "<strong>Marmot Valley</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'WFO': {
            content: "<strong>Tea Cup Glades</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'JadeGlade': {
            content: "<strong>Jade's Glade</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 750 feet<br><strong>Average Slope:</strong> 33 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/ALC1TUvSRMQ' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'BolshoiBallroom': {
            content: "<strong>Bolshoi Ballroom</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 750 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
                "<iframe width='200' height='113' src='https://www.youtube.com/embed/kR-SCpBAOmM?si=nfdaKQtbtGFnq5k5' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
        },
        'Windows': {
            content: "<strong>Windows</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
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
    
    createFeatureMarkers(); // Add this line
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
    
    // Add remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Lift Adjustment Markers';
    removeButton.style.position = 'absolute';
    removeButton.style.top = '10px';
    removeButton.style.right = '10px';
    removeButton.style.zIndex = '1';
    removeButton.onclick = function() {
        document.querySelectorAll('.mapboxgl-marker').forEach(function(marker) {
            marker.remove();
        });
        removeButton.remove();
    };
    document.body.appendChild(removeButton);
}

// Update the adjustLiftsButton to use this function
var adjustLiftsButton = document.createElement('button');
adjustLiftsButton.textContent = 'Adjust Lifts';
adjustLiftsButton.onclick = toggleLiftAdjustment;
document.body.appendChild(adjustLiftsButton);

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
function createFeatureMarkers() {
    console.log("Creating feature markers...");
    mountainMarkers = []; // Clear existing markers
    
    Object.keys(mountainFeatureData).forEach(feature => {
        console.log("Creating marker for:", feature);
        const featureInfo = mountainFeatureData[feature];
        let markerColor;
        
        // Set marker color based on difficulty
        switch(featureInfo.difficulty) {
            case 'green':
                markerColor = '#00ff00';
                break;
            case 'blue':
                markerColor = '#0000ff';
                break;
            case 'black':
                markerColor = '#000000';
                break;
        }

        var marker = new mapboxgl.Marker({
            element: createCustomMarker(markerColor)
        })
            .setLngLat(featureInfo.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(featureInfo.content))
            .addTo(map);
        
        marker.difficulty = featureInfo.difficulty;
        mountainMarkers.push(marker);
        console.log("Marker added:", marker);
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
    const difficultyDropdown = this.parentElement.querySelector('.difficulty-dropdown');
    difficultyDropdown.style.display = this.checked ? 'block' : 'none';
    
    if (!this.checked) {
        // If main features toggle is unchecked, hide all features
        mountainMarkers.forEach(marker => {
            marker.getElement().style.visibility = 'hidden';
        });
        // Uncheck all difficulty checkboxes
        difficultyDropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
    } else {
        // If main toggle is checked, show features based on their difficulty checkbox states
        ['green', 'blue', 'black'].forEach(difficulty => {
            toggleFeaturesByDifficulty(difficulty);
        });
    }
});

// Make sure the difficulty toggle event listeners are set up
['Green', 'Blue', 'Black'].forEach(difficulty => {
    const checkbox = document.getElementById(`toggle${difficulty}Features`);
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            console.log(`${difficulty} checkbox clicked:`, this.checked);
            toggleFeaturesByDifficulty(difficulty.toLowerCase());
        });
    }
});


// First, let's check if our HTML elements exist
console.log("Main toggle exists:", document.getElementById('toggleFeatures') !== null);
console.log("Green toggle exists:", document.getElementById('toggleGreenFeatures') !== null);
console.log("Blue toggle exists:", document.getElementById('toggleBlueFeatures') !== null);
console.log("Black toggle exists:", document.getElementById('toggleBlackFeatures') !== null);

// Update the event listeners with more logging
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
