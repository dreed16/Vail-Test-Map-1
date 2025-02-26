class TrailTracker {
    constructor(type) {
        this.type = type; // 'daily', 'monthly', or 'season'
        this.isTracking = false;
        this.trackedTrails = new Set();
        this.trailClickListener = null;
        
        // Load saved trails for current user on initialization
        this.loadSavedTrails();
    }

    startTracking() {
        this.isTracking = true;
        document.getElementById(`${this.type}TrailsContainer`).style.display = 'block';
        
        // Dim all trails initially
        Object.keys(trailData).forEach(trail => {
            if (!this.trackedTrails.has(trail)) {
                this.dimTrail(trail);
            }
        });

        // Add click listener to map
        this.trailClickListener = (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: Object.keys(trailData).map(trail => `${trail}-layer`)
            });
            
            if (features.length > 0) {
                const trailId = features[0].layer.id.replace('-layer', '');
                console.log('Trail clicked:', trailId, trailData[trailId]);
                const trailName = trailData[trailId].name || trailId;
                this.addTrailToList(trailId, trailName);
            }
        };
        
        map.on('click', this.trailClickListener);
        console.log(`${this.type} tracking started`);
    }

    stopTracking() {
        this.isTracking = false;
        document.getElementById(`${this.type}TrailsContainer`).style.display = 'none';
        
        if (this.trailClickListener) {
            map.off('click', this.trailClickListener);
        }

        Object.keys(trailData).forEach(trail => {
            this.undimTrail(trail);
        });
        console.log(`${this.type} tracking stopped`);
    }

    addTrailToList(trailId, trailName) {
        if (!this.trackedTrails.has(trailId)) {
            this.trackedTrails.add(trailId);
            this.undimTrail(trailId);

            const trailsList = document.getElementById(`${this.type}TrailsList`);
            const trailItem = document.createElement('div');
            trailItem.className = 'trail-item';
            trailItem.innerHTML = `
                ${trailName}
                <button onclick="trackers['${this.type}'].removeTrail('${trailId}', '${trailName}', this.parentElement)">✕</button>
            `;
            trailsList.appendChild(trailItem);
        }
    }

    removeTrail(trailId, trailName, element) {
        this.trackedTrails.delete(trailId);
        this.dimTrail(trailId);
        element.remove();
    }

    dimTrail(trailId) {
        map.setPaintProperty(`${trailId}-layer`, 'line-opacity', 0.3);
    }

    undimTrail(trailId) {
        map.setPaintProperty(`${trailId}-layer`, 'line-opacity', 1);
    }

    loadSavedTrails() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            try {
                const savedTrails = JSON.parse(localStorage.getItem(`${currentUser.username}_${this.type}Trails`)) || [];
                console.log(`Loading ${this.type} trails for ${currentUser.username}:`, savedTrails);
                
                // Clear existing trails first
                this.trackedTrails.clear();
                const trailsList = document.getElementById(`${this.type}TrailsList`);
                trailsList.innerHTML = '';

                // Add saved trails
                savedTrails.forEach(trail => {
                    if (trailData[trail]) {
                        this.addTrailToList(trail, trailData[trail].name || trail);
                    }
                });
            } catch (error) {
                console.error('Error loading saved trails:', error);
            }
        }
    }

    saveTrails() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const trailsArray = Array.from(this.trackedTrails);
            console.log(`Saving ${this.type} trails for ${currentUser.username}:`, trailsArray);
            localStorage.setItem(`${currentUser.username}_${this.type}Trails`, JSON.stringify(trailsArray));
            alert(`${this.type.charAt(0).toUpperCase() + this.type.slice(1)} trails saved!`);
        }
    }

    pushTrailsTo(targetTracker) {
        // Add all current trails to the target tracker
        this.trackedTrails.forEach(trailId => {
            if (trailData[trailId]) {
                targetTracker.addTrailToList(trailId, trailData[trailId].name || trailId);
            }
        });
    }
}

// Create instances for each tracker type
const trackers = {
    daily: new TrailTracker('daily'),
    monthly: new TrailTracker('monthly'),
    season: new TrailTracker('season')
};

document.addEventListener('DOMContentLoaded', () => {
    // Tracking menu toggle
    const trackingMenuButton = document.getElementById('trackingMenuButton');
    const trackingOptions = document.getElementById('trackingOptions');
    
    trackingMenuButton.addEventListener('click', () => {
        trackingOptions.style.display = 
            trackingOptions.style.display === 'none' ? 'block' : 'none';
    });

    // Setup each tracker button
    ['daily', 'monthly', 'season'].forEach(type => {
        const button = document.getElementById(`${type}TrackerButton`);
        const saveButton = document.getElementById(`${type}SaveButton`);
        
        button.addEventListener('click', () => {
            const tracker = trackers[type];
            if (!tracker.isTracking) {
                // Stop other trackers if they're running
                Object.values(trackers).forEach(t => {
                    if (t.isTracking) t.stopTracking();
                });
                
                tracker.startTracking();
                button.classList.add('active');
                button.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Tracker`;
            } else {
                tracker.stopTracking();
                button.classList.remove('active');
                button.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Tracker`;
            }
            trackingOptions.style.display = 'none';
        });

        // Update save button handler
        saveButton.addEventListener('click', () => {
            trackers[type].saveTrails();
        });
    });

    // Add push button handlers
    document.getElementById('pushToMonthly').addEventListener('click', () => {
        const dailyTracker = trackers['daily'];
        const monthlyTracker = trackers['monthly'];
        
        if (dailyTracker.trackedTrails.size > 0) {
            dailyTracker.pushTrailsTo(monthlyTracker);
            monthlyTracker.saveTrails();
            alert('Trails pushed to monthly tracker!');
        } else {
            alert('No daily trails to push!');
        }
    });

    document.getElementById('pushToSeason').addEventListener('click', () => {
        const monthlyTracker = trackers['monthly'];
        const seasonTracker = trackers['season'];
        
        if (monthlyTracker.trackedTrails.size > 0) {
            monthlyTracker.pushTrailsTo(seasonTracker);
            seasonTracker.saveTrails();
            alert('Trails pushed to season tracker!');
        } else {
            alert('No monthly trails to push!');
        }
    });
});
