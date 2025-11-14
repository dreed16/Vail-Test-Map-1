console.log("Loading Breckenridge lift data...");
// Merge Breckenridge lifts into existing liftData (from Vail) or create new if it doesn't exist
if (typeof liftData === 'undefined') {
    var liftData = {};
}
// Add Breckenridge lifts
liftData['ImperialExpress'] = {
    coordinates: [[-106.0935432184688, 39.46928571591374], [-106.10127033029407, 39.47273285379026]],
    color: '#FF0000',
    popupContent: "<strong>Imperial Express</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['6Chair'] = {
    coordinates: [[-106.08407583608127, 39.46593935711431], [-106.09470626358828, 39.46894383756904]],
    color: '#FF0000',
    popupContent: "<strong>6 Chair</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['EChair'] = {
    coordinates: [[-106.07988643761705, 39.46593935711431], [-106.08253517447717, 39.45898766002426]],
    color: '#FF0000',
    popupContent: "<strong>E Chair</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['BeaverRunSuperChair'] = {
    coordinates: [[-106.05185198858679, 39.473379974907914], [-106.07832948912929, 39.46045458292818]],
    color: '#FF0000',
    popupContent: "<strong>Beaver Run Super Chair</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['MercurySuperChair'] = {
    coordinates: [[-106.05831586116071, 39.46825398002443], [-106.08113830922282, 39.45833136499181]],
    color: '#FF0000',
    popupContent: "<strong>Mercury Super Chair</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['Peak8SuperConnect'] = {
    coordinates: [[-106.05533843886009, 39.470983275219396], [-106.07350075837928, 39.47081957624144], [-106.0843716624685, 39.46962595738054]],
    color: '#FF0000',
    popupContent: "<strong>Peak 8 SuperConnect</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['HorshoeTBar'] = {
    coordinates: [[-106.08431771755751, 39.47926372720079], [-106.08934665574368, 39.477668787325456], [-106.0943178653882, 39.47360286537011]],
    color: '#FF0000',
    popupContent: "<strong>Horeshoe Bowl T-Bar</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['CChair'] = {
    coordinates: [[-106.06075757516663, 39.472657096774356], [-106.07606267825535, 39.462835208930585]],
    color: '#FF0000',
    popupContent: "<strong>C Chair</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['QuickSilverSuperChair'] = {
    coordinates: [[-106.04792688289207, 39.47545156017944], [-106.06019072193354, 39.46354022509891]],
    color: '#FF0000',
    popupContent: "<strong>QuickSilver SuperChair</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['AChair'] = {
    coordinates: [[-106.05468878432588, 39.469465187722335], [-106.065528527437, 39.459977858180594]],
    color: '#FF0000',
    popupContent: "<strong>A Chair</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['FalconSuperChair'] = {
    coordinates: [[-106.0581365465026, 39.4622917423809], [-106.07444693238712, 39.453592761875825]],
    color: '#FF0000',
    popupContent: "<strong>Falcon SuperChair</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['RipsRide'] = {
    coordinates: [[-106.06610778893207, 39.47962538581638], [-106.06739264378545, 39.475130709569896]],
    color: '#FF0000',
    popupContent: "<strong>Rip's Ride</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['RockyMountainSuperChair'] = {
    coordinates: [[-106.06798771399866, 39.48086486956663], [-106.08543420692682, 39.47541312104579]],
    color: '#FF0000',
    popupContent: "<strong>Rocky Mountain Super Chair </strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['ColoradoSuperChair'] = {
    coordinates: [[-106.0679241268602, 39.480690531495014], [-106.0852155176904, 39.47096253529395]],
    color: '#FF0000',
    popupContent: "<strong>Colorado Super Chair </strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['FiveSuperChair'] = {
    coordinates: [[-106.0674835794606, 39.4803125040159], [-106.07533129854727, 39.47334810701534]],
    color: '#FF0000',
    popupContent: "<strong>5 Chair </strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['IndependenceSuperChair'] = {
    coordinates: [[-106.06764025535776, 39.48545651562398], [-106.093591132321, 39.48167538128757]],
    color: '#FF0000',
    popupContent: "<strong>Independence SuperChair </strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['FreedomSuperChair'] = {
    coordinates: [[-106.07508791458349, 39.488336518774304], [-106.09421497845489, 39.48164283680464]],
    color: '#FF0000',
    popupContent: "<strong>Freedom SuperChair </strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['ZendoChair'] = {
    coordinates: [[-106.07972502540359, 39.48870466514336], [-106.08795157387912, 39.4919757927932]],
    color: '#FF0000',
    popupContent: "<strong>Zendo Chair </strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['KenshoSuperChair'] = {
    coordinates: [[-106.08825206429813, 39.492850303118786], [-106.10832398166603, 39.49455849593036]],
    color: '#FF0000',
    popupContent: "<strong>Kensho SuperChair </strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['Snowflake'] = {
    coordinates: [[-106.05316821631587, 39.478344165391235], [-106.06196203427622, 39.47356402697048], [-106.06854382526183, 39.47481878929855]],
    color: '#FF0000',
    popupContent: "<strong>Snowflake </strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
liftData['BreckConnectGondola'] = {
    coordinates: [[-106.04766629248093, 39.48543499850149], [-106.05627267478447, 39.48895582828047],[-106.06739879394144, 39.48453335390761], [-106.06690941256136, 39.48113092193702]],
    color: '#FF0000',
    popupContent: "<strong>Breck Connect Gondola</strong><br><strong>Type:</strong> High-Speed Quad<br><strong>Vertical Rise:</strong> 1,400 ft<br><strong> Time:</strong> 9 mins<br>" +
                  "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allowfullscreen></iframe>"
};
// Test hike-to terrain example
liftData['Peak8Hike'] = {
    coordinates: [[-106.10140446851894, 39.47289961800553], [-106.10250661186566, 39.472822903139445]],
    color: '#FF0000',  // Color is ignored for hike-to, will be black
    isHikeTo: true  // Add this property to make it a hike-to terrain
};
liftData['Peak7Hike'] = {
    coordinates: [[-106.10472595138506, 39.47612636334023], [-106.10553383759239, 39.4787371936234]],
    color: '#FF0000',  // Color is ignored for hike-to, will be black
    isHikeTo: true  // Add this property to make it a hike-to terrain
};
liftData['Peak6Hike'] = {
    coordinates: [[-106.10878178745227, 39.494297150264], [-106.11118066779812, 39.49382437506989]],
    color: '#FF0000',  // Color is ignored for hike-to, will be black
    isHikeTo: true  // Add this property to make it a hike-to terrain
};
liftData['Peak6HikeEast'] = {
    coordinates: [[-106.11375157771421, 39.497349676614306], [-106.11385605579142, 39.49958868767192]],
    color: '#FF0000',  // Color is ignored for hike-to, will be black
    isHikeTo: true  // Add this property to make it a hike-to terrain
};
console.log("Breckenridge lift data loaded. Total lifts:", Object.keys(liftData).length);

