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
trailPopups['ImerialRidge'] = {
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
trailPopups['CucumberBowl'] = {
    content: "<strong>Cubumber Bowl</strong><br><strong>Rating:</strong> Pink<br><strong>Length:</strong> 250 feet<br><strong>Average Slope:</strong> 35 degrees<br>" +
        "<iframe width='200' height='113' src='https://www.youtube.com/embed/nkeJFKI1Y9o?enablejsapi=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
};
console.log("Breckenridge trail popup data loaded. Total popups:", Object.keys(trailPopups).length);

