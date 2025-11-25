// Breckenridge Trail Popup data
console.log('BreckTrailpopup.js loaded');
// Merge Breckenridge trail popups into existing trailPopups (from Vail) or create new if it doesn't exist
if (typeof trailPopups === 'undefined') {
    var trailPopups = {};
}
// Add Breckenridge trail popups
trailPopups['ImperialBowl'] = {
    content: "<strong>Imperial Bowl</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['ZootChute'] = {
    content: "<strong>Zoot Chute</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['WackysChute'] = {
    content: "<strong>Wacky's Chute</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['9Lives'] = {
    content: "<strong>9 Lives</strong><br><strong>Rating:</strong> Black<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['EasyStreet'] = {
    content: "<strong>Easy Street</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['SnowWhite'] = {
    content: "<strong>Snow White</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['ImperialRidge'] = {
    content: "<strong>Imperial Ridge</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['AlpineAlley'] = {
    content: "<strong>Alpine Alley</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['EaglesNest'] = {
    content: "<strong>Eagle's Nest</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['BrillsThrill'] = {
    content: "<strong>Brill's Thrill</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Lulu'] = {
    content: "<strong>Brill's Thrill</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Humbug'] = {
    content: "<strong>Humbug</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['King'] = {
    content: "<strong>King</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Pioneer'] = {
    content: "<strong>Pioneer</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Queen'] = {
    content: "<strong>Queen</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Joker'] = {
    content: "<strong>Joker</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Claimjumper'] = {
    content: "<strong>Claimjumper</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['FortMaryBRight'] = {
    content: "<strong>Fort Mary B</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['FortMaryBLeft'] = {
    content: "<strong>Fort Mary B</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Lowerforgetmenot'] = {
    content: "<strong>Forget Me Not</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['ColumbineBreck'] = {
    content: "<strong>Columbrine</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['NorthStar'] = {
    content: "<strong>Columbrine</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['RipsRavine'] = {
    content: "<strong>Rip's Ravine</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Wirepatch'] = {
    content: "<strong>Wirepatch</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['LincolnMeadows'] = {
    content: "<strong>Lincoln Meadows</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Peak6Parkway'] = {
    content: "<strong>Peak 6 Parkway</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['SwanCity'] = {
    content: "<strong>Swan City</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['ELiftLine'] = {
    content: "<strong>E Lift Line</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['TomsMom'] = {
    content: "<strong>Toms Mom</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['MineShaft'] = {
    content: "<strong>Mine Shaft</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['DevilsCrotch'] = {
    content: "<strong>Devil's Crotch</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Inferno'] = {
    content: "<strong>Inferno</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Phsycopath'] = {
    content: "<strong>Phsycopath</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['NoNameTrail'] = {
    content: "<strong>No Name Trail</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['DoubleBarrelR'] = {
    content: "<strong>Double Barrel</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Boneyardrunout'] = {
    content: "<strong>Boneyardrunout</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};

trailPopups['DoubleBarrelL'] = {
    content: "<strong>Double Barrel</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Wayout'] = {
    content: "<strong>Wayout</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Unmamed6chair'] = {
    content: "<strong>Unmamed 6 Chair</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Quandry'] = {
    content: "<strong>Quandry</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Boneyard'] = {
    content: "<strong>Boneyard</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Adios'] = {
    content: "<strong>Adios</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Snowbirds'] = {
    content: "<strong>Snowbirds</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['TomsBaby'] = {
    content: "<strong>Toms Baby</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['HighAnxiety'] = {
    content: "<strong>High Anxiety</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Boreas'] = {
    content: "<strong>Boreas</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Spruce'] = {
    content: "<strong>Spruce</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Rounders'] = {
    content: "<strong>Rounders</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['CalliesAlley'] = {
    content: "<strong>Callie's Alley</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Swinger'] = {
    content: "<strong>Swinger</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Crescendo'] = {
    content: "<strong>Crescendo</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['UpperCrescendo'] = {
    content: "<strong>Upper Crescendo</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Powerline'] = {
    content: "<strong>Powerline</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['LowerBoneyard'] = {
    content: "<strong>Lower Boneyard</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['FrostysFreeway'] = {
    content: "<strong>Frosty's Freeway</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['6ChairCatwalk'] = {
    content: "<strong>6 Chair Catwalk</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['LostHorizon'] = {
    content: "<strong>Lost Horizon</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['BartonBreezway'] = {
    content: "<strong>Barton Breezway</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Nirvana'] = {
    content: "<strong>Nirvana</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Daydream'] = {
    content: "<strong>Daydream</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Reverie'] = {
    content: "<strong>Reverie</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Patswonderland'] = {
    content: "<strong>Pat's Wonderland</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['GeorgesThumb'] = {
    content: "<strong>George's Thumb</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['ElysianFields'] = {
    content: "<strong>Elysian Fields</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Intuition'] = {
    content: "<strong>Intuition</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['BeyondBowl'] = {
    content: "<strong>Beyond Bowl</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['ESP'] = {
    content: "<strong>ESP</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Contact'] = {
    content: "<strong>Contact</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Savor'] = {
    content: "<strong>Savor</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['WhalesTail'] = {
    content: "<strong>Whales Tail</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Whiff'] = {
    content: "<strong>Whiff</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Bliss'] = {
    content: "<strong>Bliss</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Corsair'] = {
    content: "<strong>Corsair</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Xanada'] = {
    content: "<strong>Xanada</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Crystal'] = {
    content: "<strong>Crystal</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['DoubleJack'] = {
    content: "<strong>Double Jack</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Trinity'] = {
    content: "<strong>Trinity</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['UpperLehman'] = {
    content: "<strong>Upper Lehman</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['AChairLine'] = {
    content: "<strong>A Chair Line</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Eldorado'] = {
    content: "<strong>Eldorado</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['CountryBoy'] = {
    content: "<strong>Country Boy</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['UpperCashier'] = {
    content: "<strong>Upper Cashier</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['LowerCashier'] = {
    content: "<strong>Lower Cashier</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Bonanza'] = {
    content: "<strong>Bonanza</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['American'] = {
    content: "<strong>American</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Sundown'] = {
    content: "<strong>Sundown</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['LowerSundown'] = {
    content: "<strong>Lower Sundown</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Volunteer'] = {
    content: "<strong>Volunteer</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['4oclock'] = {
    content: "<strong>4 o'clock</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Trailsnowflakeright'] = {
    content: "<strong>Snowflake</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Trailsnowflake'] = {
    content: "<strong>Snowflake</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Lowest4oclock'] = {
    content: "<strong>Lowest 4 o'clock</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['GondolaSkiBack'] = {
    content: "<strong>Gondola Ski Back</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Lower4oclock'] = {
    content: "<strong>Lower 4 o'clock</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Twister'] = {
    content: "<strong>Twister</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Trygves'] = {
    content: "<strong>Trygves</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Dyersville'] = {
    content: "<strong>Dyersville</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['LowerAmerican'] = {
    content: "<strong>Lower American</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Sawmill'] = {
    content: "<strong>Sawmill</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['LowerSawmill'] = {
    content: "<strong>Lower Sawmill</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Crosscut'] = {
    content: "<strong>Crosscut</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Tiger'] = {
    content: "<strong>Tiger</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['SouthernCross'] = {
    content: "<strong>Southern Cross</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Rendezvous'] = {
    content: "<strong>Rendezvous</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Mach1'] = {
    content: "<strong>Mach 1</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['GoodbyeGirl'] = {
    content: "<strong>Goodbye Girl</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['NeedlesEye'] = {
    content: "<strong>Needle's Eye</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Shock'] = {
    content: "<strong>Shock</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['AmericanTerrainPark'] = {
    content: "<strong>American Terrain Park</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['GoldKing'] = {
    content: "<strong>Gold King</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['LowerPeerless'] = {
    content: "<strong>Lower Peerless</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Peerless'] = {
    content: "<strong>Peerless</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['UpperColumbia'] = {
    content: "<strong>Columbia</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['LowerColumbia'] = {
    content: "<strong>Lower Columbia</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['EldoradoTerrainPark'] = {
    content: "<strong>Eldorado Terrain Park</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['PorcupineAlley'] = {
    content: "<strong>Porcupine Alley</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Sizzler'] = {
    content: "<strong>Sizzler</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['BriarRose'] = {
    content: "<strong>Briar Rose</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['LowerLehman'] = {
    content: "<strong>Lower Lehman</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Flapjack'] = {
    content: "<strong>Flapjack</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Frontier'] = {
    content: "<strong>Frontier</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['RedRover'] = {
    content: "<strong>Red Rover</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['SilverThorne'] = {
    content: "<strong>Silver Thorne</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Elan'] = {
    content: "<strong>Elan</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Quiver'] = {
    content: "<strong>Quiver</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Mustang'] = {
    content: "<strong>Mustang</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['DarkRider'] = {
    content: "<strong>Dark Rider</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Cimarron'] = {
    content: "<strong>Cimarron</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Blackhawk'] = {
    content: "<strong>Blackhawk</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Bronc'] = {
    content: "<strong>Bronc</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Centennial'] = {
    content: "<strong>Centennial</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Grits'] = {
    content: "<strong>Grits</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['TheBurn'] = {
    content: "<strong>The Burn</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['SpitFire'] = {
    content: "<strong>Spit Fire</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Peak7Bowl'] = {
    content: "<strong>Peak 7 Bowl</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['DejaVu'] = {
    content: "<strong>Deja Vu</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Delirium'] = {
    content: "<strong>Delirium</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Wanderlust'] = {
    content: "<strong>Wanderlust</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Euophoria'] = {
    content: "<strong>Euophoria</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Behold'] = {
    content: "<strong>Behold</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Chi'] = {
    content: "<strong>Chi</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Rapture'] = {
    content: "<strong>Rapture</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Echo'] = {
    content: "<strong>Echo</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['ArtsBowl'] = {
    content: "<strong>Arts Bowl</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['YChuteMain'] = {
    content: "<strong>Y Chute</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['YChuteRight'] = {
    content: "<strong>Y Chute</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['NorthBowl'] = {
    content: "<strong>North Bowl</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['BoundaryChutes'] = {
    content: "<strong>Boundary Chutes</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['DebbiesAlley'] = {
    content: "<strong>Debbie's Alley</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Vertigo'] = {
    content: "<strong>Vertigo</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Upper4oclock'] = {
    content: "<strong>Upper 4 O'Clock</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['LittleJohnny'] = {
    content: "<strong>Little Johnny</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['ToyotaBankedSlalom'] = {
    content: "<strong>Toyota Banked Slalom</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='150' height='267' src='https://www.youtube.com/embed/JxuiGzD4Ae0?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Parklane'] = {
    content: "<strong>Park Lane</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['SpringMeier'] = {
    content: "<strong>Spring Meier</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['FreewayTerrainPark'] = {
    content: "<strong>Freeway Terrain Park</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/7y4hlm1rYAs?enablejsapi=1&start=445' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['WhiteCrown'] = {
    content: "<strong>White Crown</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Ptarmigan'] = {
    content: "<strong>Ptarmigan</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Pika'] = {
    content: "<strong>Pika</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Forgetmenot'] = {
    content: "<strong>Forgetmenot</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['MagicCarpet'] = {
    content: "<strong>Magic Carpet</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['CJs'] = {
    content: "<strong>CJs</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['TheDunes'] = {
    content: "<strong>The Dunes</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['WhiskeyRiver'] = {
    content: "<strong>Whiskey River</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Santuary'] = {
    content: "<strong>Santuary</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Respite'] = {
    content: "<strong>Respite</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Felicity'] = {
    content: "<strong>Felicity</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Yugen'] = {
    content: "<strong>Yugen</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Irie'] = {
    content: "<strong>Irie</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Sublime'] = {
    content: "<strong>Sublime</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['OreBucket'] = {
    content: "<strong>Ore Bucket</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Breathless'] = {
    content: "<strong>Breathless</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Epiphany'] = {
    content: "<strong>Epiphany</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['AngelsRest'] = {
    content: "<strong>Angel's Rest</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['MonteCristo'] = {
    content: "<strong>Monte Cristo</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Dukesruntop'] = {
    content: "<strong>Dukes Run</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Dukesrunbottom'] = {
    content: "<strong>Dukes Run</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Stampede'] = {
    content: "<strong>Stampede</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Rustler'] = {
    content: "<strong>Rustler</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Outlaw'] = {
    content: "<strong>Rustler</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['Mule'] = {
    content: "<strong>Mule</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
trailPopups['CucumberBowl'] = {
    content: "<strong>Cubumber Bowl</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
console.log("Breckenridge trail popup data loaded. Total popups:", Object.keys(trailPopups).length);

