console.log("Loading lift data...");
var liftData = {
    'Orient': {
        coordinates: [[-106.332047, 39.586120], [-106.321984, 39.605166]],
        color: '#FF0000',
        popupContent: "<strong>Orient Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'Wapiti': {
        coordinates: [[-106.3308982336383, 39.606005723781834], [-106.32862158916038, 39.60553707497087]],
        color: '#FF0000',
        popupContent: "<strong>Wapiti</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'GameCreekExpress': {
        coordinates: [[-106.38524840078642, 39.609128108868475], [-106.37122350660105, 39.60446376004637]],
        color: '#FF0000',
        popupContent: "<strong>Game Creek Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'SunUpExpress': {
        coordinates: [[-106.348416, 39.597273], [-106.336842, 39.602036]],
        color: '#FF0000',
        popupContent: "<strong>Sun Up Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'PetesExpressLift': {
        coordinates: [[-106.32855634230215, 39.580990685381465], [-106.30804156945408, 39.5730717424816]],
        color: '#FF0000',
        popupContent: "<strong>Pete's Express Lift</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'EarlsExpressLift': {
        coordinates: [[-106.34233944935606, 39.57053333824993], [-106.32895829509683, 39.56331794108942]],
        color: '#FF0000',
        popupContent: "<strong>Pete's Express Lift</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'Mongolia': {
        coordinates: [[-106.31537974887122, 39.59980436898809], [-106.31027072825114, 39.59998686506145]],
        color: '#FF0000',
        popupContent: "<strong>Mongolia</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'Skylineexpress': {
        coordinates: [[-106.34070593717222, 39.58408506001541], [-106.32887660958609, 39.56374205768566]],
        color: '#FF0000',
        popupContent: "<strong>Skyline Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'RivaBahnExpress': {
        coordinates: [[-106.36904510388797, 39.63842342002539], [-106.35918596492314, 39.62807975724431], [-106.3489624816169, 39.61981482229396]],
        color: '#FF0000',
        popupContent: "<strong>Skyline Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'Avanit': {
        coordinates: [[-106.37453094820594, 39.62866037928515], [-106.3743322184949, 39.61084898022517]],
        color: '#FF0000',
        popupContent: "<strong>Avani Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    '27': {
        coordinates: [[-106.37335311359175, 39.62841869888439], [-106.37405160358108, 39.62330246481662]],
        color: '#FF0000',
        popupContent: "<strong>27</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'EagleBahn': {
        coordinates: [[-106.3881409685974, 39.64263731967003], [-106.38645513260806, 39.618252447179316]],
        color: '#FF0000',
        popupContent: "<strong>Eagle Bahn Gondola</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'BornFree': {
        coordinates: [[-106.38792210845642, 39.64270278125275], [-106.3866590549985, 39.626394268292415]],
        color: '#FF0000',
        popupContent: "<strong>Born Free Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'PrideExpress': {
        coordinates: [[-106.39060419949304, 39.63240645939575], [-106.38742447572322, 39.61829170231559]],
        color: '#FF0000',
        popupContent: "<strong>Born Free Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'CascadeVillage': {
        coordinates: [[-106.40167270903693, 39.638121182574906], [-106.39427499974715, 39.631320915094875]],
        color: '#FF0000',
        popupContent: "<strong>Cascade Village Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'HighNoonExpress': {
        coordinates: [
            [-106.36113961282129,39.590581899373234],
            [-106.35661343672389,39.60450585503446]
        ],
        color: '#FF0000'  // Assuming it's red like other lifts
    },
    'SunDownExpress': {
        coordinates: [
            [-106.36148710905488,39.59074324292021],
            [-106.37029027787614,39.60474819599358]
        ],
        color: '#FF0000'  // Assuming red like other lifts
    },
    'GondolaOne': {
        coordinates: [
            [-106.37348906916155,39.63922932856366],
            [-106.36878761343198,39.61485402611231]
        ],
        color: '#FF0000'  // Assuming red like other lifts
    },
    'WildwoodExpress': {
        coordinates: [[-106.36639467559803, 39.614152746773215], [-106.37021820196017, 39.605543971161495]],
        color: '#FF0000',
        popupContent: "<strong>Wildwood Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'MountainTopExpress': {
        coordinates: [[-106.3657937333782, 39.61448675876747], [-106.35706230302121, 39.60522600090246]],
        color: '#FF0000',
        popupContent: "<strong>Mountain Top Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'SourdoughExpress': {
        coordinates: [[-106.34118134352113, 39.608600384085065], [-106.33402594610068, 39.605352046842455]],
        color: '#FF0000',
        popupContent: "<strong>Sourdough Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'HighPointExpress': {
        coordinates: [[-106.35161440728312, 39.62504834088702], [-106.3362207239278, 39.6119052357476]],
        color: '#FF0000',
        popupContent: "<strong>High Point Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'NorthwoodsExpress': {
        coordinates: [[-106.35047663878525, 39.6198440021561], [-106.35631848015673, 39.60502378985623]],
        color: '#FF0000',
        popupContent: "<strong>Mountain Top Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'GoldenPeak': {
        coordinates: [[-106.35856637291823, 39.62970305243411], [-106.35194773335272, 39.62907337459376]],
        color: '#FF0000',
        popupContent: "<strong>Golden Peak T-Bar</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'GopherHill': {
        coordinates: [[-106.37019995527677, 39.63866360002169], [-106.3694933001636, 39.63622373731147]],
        color: '#FF0000',
        popupContent: "<strong>Gopher Hill</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'Teacupexpress': {
        coordinates: [[-106.339910, 39.584593], [-106.336286, 39.602144]],
        color: '#FF0000',
        popupContent: "<strong>Tea Cup Express</strong><br><strong>Type:</strong> High Speed Quad<br><strong>Vertical Rise:</strong> 900 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/ZwtX_f373Fc?enablejsapi=1lMzFeG5blH5rLmIw' frameborder='0' allowfullscreen></iframe>"
    }
};
console.log("Lift data loaded:", Object.keys(liftData));

