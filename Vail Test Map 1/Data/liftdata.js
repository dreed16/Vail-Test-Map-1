console.log("Loading lift data...");
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
    'SunUpExpress': {
        coordinates: [[-106.348416, 39.597273], [-106.336842, 39.602036]],
        color: '#FF0000',
        popupContent: "<strong>Sun Up Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?si=JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
    },
    'Mongolia': {
        coordinates: [[-106.31537974887122, 39.59980436898809], [-106.31027072825114, 39.59998686506145]],
        color: '#FF0000',
        popupContent: "<strong>Mongolia</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?si=JVCOQWtmuaPkoaYp' frameborder='0' allowfullscreen></iframe>"
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
    'Teacupexpress': {
        coordinates: [[-106.339910, 39.584593], [-106.336286, 39.602144]],
        color: '#FF0000',
        popupContent: "<strong>Tea Cup Express</strong><br><strong>Type:</strong> High Speed Quad<br><strong>Vertical Rise:</strong> 900 ft<br><strong> Time:</strong> 9 mins<br>" +
                      "<iframe width='200' height='113' src='https://www.youtube.com/embed/ZwtX_f373Fc?si=lMzFeG5blH5rLmIw' frameborder='0' allowfullscreen></iframe>"
    }
};
console.log("Lift data loaded:", Object.keys(liftData));

