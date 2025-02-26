class TrailTracker {
    constructor(type) {
        this.type = type; // 'daily', 'monthly', or 'season'
        this.isTracking = false;
        this.trackedTrails = new Set();
        this.trailClickListener = null;
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
        button.addEventListener('click', () => {
            const tracker = trackers[type];
            if (!tracker.isTracking) {
                // Stop other trackers if they're running
                Object.values(trackers).forEach(t => {
                    if (t.isTracking) t.stopTracking();
                });
                
                tracker.startTracking();
                button.textContent = `Stop ${type.charAt(0).toUpperCase() + type.slice(1)} Tracker`;
                button.style.background = '#f44336';
            } else {
                tracker.stopTracking();
                button.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Tracker`;
                button.style.background = 'none';
            }
            trackingOptions.style.display = 'none';
        });
    });
});
