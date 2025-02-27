class ActivityTracker {
    constructor(type) {
        this.type = type;  // 'daily', 'monthly', 'season'
        this.isTracking = false;
        this.trackedTrails = new Set();
        this.trackedLifts = new Set();
        this.trackedMountainFeatures = new Set();
        this.clickListener = null;
        this.currentSessionId = 'current';
        
        // Load saved sessions
        this.loadSessions();
    }

    initializeTracker() {
        // Add click handlers for the tracker buttons
        const button = document.getElementById(`${this.type}TrackerButton`);
        const newSessionButton = document.getElementById(`new${this.type.charAt(0).toUpperCase() + this.type.slice(1)}Session`);
        
        button.addEventListener('click', () => {
            if (!this.isTracking) {
                this.startTracking();
                button.textContent = `${this.type.charAt(0).toUpperCase() + this.type.slice(1)} Tracker (Active)`;
            } else {
                this.stopTracking();
                button.textContent = `${this.type.charAt(0).toUpperCase() + this.type.slice(1)} Tracker`;
            }
        });

        newSessionButton.addEventListener('click', () => this.showSaveDialog());
        
        // Initialize session selector
        const selector = document.getElementById(`${this.type}Sessions`);
        selector.addEventListener('change', (e) => this.loadSession(e.target.value));
        
        // Load existing sessions
        this.loadSessions();
    }

    startTracking() {
        console.log(`Starting ${this.type} tracking...`);
        
        const container = document.getElementById(`${this.type}TrailsContainer`);
        container.style.display = 'block';
        
        if (!this.isTracking) {
            this.isTracking = true;
            
            // Dim all features when starting tracking
            this.dimAllFeatures();
            
            // Undim any previously tracked features
            this.undimTrackedFeatures();
            
            this.clickListener = (e) => {
                // First check trails and lifts
                const mapFeatures = map.queryRenderedFeatures(e.point, {
                    layers: [
                        ...Object.keys(trailData).map(trail => `${trail}-layer`),
                        ...Object.keys(liftData).map(lift => `${lift}-layer`)
                    ]
                });
                
                if (mapFeatures.length > 0) {
                    const featureId = mapFeatures[0].layer.id.replace('-layer', '');
                    const isLift = liftData.hasOwnProperty(featureId);
                    const featureData = isLift ? liftData[featureId] : trailData[featureId];
                    const featureName = featureData.name || featureId;
                    
                    if (isLift) {
                        if (this.trackedLifts.has(featureId)) {
                            this.removeFeature(featureId, featureName, 'lift');
                        } else {
                            this.addFeatureToList(featureId, featureName, 'lift');
                        }
                    } else {
                        if (this.trackedTrails.has(featureId)) {
                            this.removeFeature(featureId, featureName, 'trail');
                        } else {
                            this.addFeatureToList(featureId, featureName, 'trail');
                        }
                    }
                    return;
                }

                // If no trail/lift found, check for mountain features
                const clickedLng = e.lngLat.lng;
                const clickedLat = e.lngLat.lat;
                console.log("Checking mountain features at:", [clickedLng, clickedLat]);

                try {
                    // Check if mountainFeatureData is available
                    if (typeof mountainFeatureData === 'undefined') {
                        console.error('Mountain features data not loaded');
                        return;
                    }

                    const CLICK_RADIUS = 0.001; // Increased radius for easier detection
                    
                    Object.entries(mountainFeatureData).forEach(([featureId, feature]) => {
                        const featureLng = feature.coordinates[0];
                        const featureLat = feature.coordinates[1];
                        
                        const distance = Math.sqrt(
                            Math.pow(clickedLng - featureLng, 2) + 
                            Math.pow(clickedLat - featureLat, 2)
                        );
                        
                        console.log(`Checking ${featureId}:`, {
                            clicked: [clickedLng, clickedLat],
                            feature: [featureLng, featureLat],
                            distance: distance
                        });

                        if (distance < CLICK_RADIUS) {
                            console.log(`Found mountain feature: ${featureId}`);
                            if (this.trackedMountainFeatures.has(featureId)) {
                                this.removeFeature(featureId, featureId, 'mountainFeature');
                            } else {
                                this.addFeatureToList(featureId, featureId, 'mountainFeature');
                            }
                        }
                    });
                } catch (error) {
                    console.error('Error checking mountain features:', error);
                }
            };
            
            map.on('click', this.clickListener);
        }
    }

    addFeatureToList(featureId, featureName, type) {
        console.log(`Adding ${type}: ${featureId}`);
        
        if (type === 'trail') {
            this.trackedTrails.add(featureId);
            this.undimFeature(featureId, type);
        } else if (type === 'lift') {
            this.trackedLifts.add(featureId);
            this.undimFeature(featureId, type);
        } else if (type === 'mountainFeature') {
            console.log('Adding mountain feature to tracked list:', featureId);
            this.trackedMountainFeatures.add(featureId);
            // We'll handle visual feedback for mountain features later
        }
        
        this.updateFeaturesList();
    }

    removeFeature(featureId, featureName, type) {
        console.log(`Removing ${type}: ${featureId}`);
        
        if (type === 'trail') {
            this.trackedTrails.delete(featureId);
            this.dimFeature(featureId, type);
        } else if (type === 'lift') {
            this.trackedLifts.delete(featureId);
            this.dimFeature(featureId, type);
        } else if (type === 'mountainFeature') {
            this.trackedMountainFeatures.delete(featureId);
            // We'll add dimming functionality for mountain features later
        }
        
        this.updateFeaturesList();
    }

    dimFeature(featureId, type) {
        const layer = `${featureId}-layer`;
        if (map.getLayer(layer)) {
            map.setPaintProperty(layer, 'line-opacity', 0.3);
        }
    }

    undimFeature(featureId, type) {
        const layer = `${featureId}-layer`;
        if (map.getLayer(layer)) {
            map.setPaintProperty(layer, 'line-opacity', 1);
        }
    }

    stopTracking() {
        console.log(`Stopping ${this.type} tracking...`);
        this.isTracking = false;
        
        // Remove click listener
        if (this.clickListener) {
            map.off('click', this.clickListener);
        }
        
        // Restore all features to full opacity
        Object.keys(trailData).forEach(trailId => {
            const layer = `${trailId}-layer`;
            if (map.getLayer(layer)) {
                map.setPaintProperty(layer, 'line-opacity', 1);
            }
        });
        
        Object.keys(liftData).forEach(liftId => {
            const layer = `${liftId}-layer`;
            if (map.getLayer(layer)) {
                map.setPaintProperty(layer, 'line-opacity', 1);
            }
        });

        // Hide the container
        const container = document.getElementById(`${this.type}TrailsContainer`);
        container.style.display = 'none';
    }

    pushFeaturesTo(targetTracker) {
        // Push trails
        this.trackedTrails.forEach(trailId => {
            if (trailData[trailId]) {
                targetTracker.addFeatureToList(trailId, trailData[trailId].name || trailId, 'trail');
            }
        });
        
        // Push lifts
        this.trackedLifts.forEach(liftId => {
            if (liftData[liftId]) {
                targetTracker.addFeatureToList(liftId, liftData[liftId].name || liftId, 'lift');
            }
        });
    }

    saveFeatures() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const saveData = {
                trails: Array.from(this.trackedTrails),
                lifts: Array.from(this.trackedLifts),
                mountainFeatures: Array.from(this.trackedMountainFeatures)
            };
            localStorage.setItem(`${currentUser.username}_${this.type}Features`, JSON.stringify(saveData));
            alert(`${this.type.charAt(0).toUpperCase() + this.type.slice(1)} features saved!`);
        }
    }

    loadSavedFeatures() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            try {
                const savedData = JSON.parse(localStorage.getItem(`${currentUser.username}_${this.type}Features`)) || { trails: [], lifts: [], mountainFeatures: [] };
                
                // Clear existing features
                this.trackedTrails.clear();
                this.trackedLifts.clear();
                this.trackedMountainFeatures.clear();
                const featuresList = document.getElementById(`${this.type}TrailsList`);
                featuresList.innerHTML = '';

                // Add saved trails
                savedData.trails.forEach(trailId => {
                    if (trailData[trailId]) {
                        this.addFeatureToList(trailId, trailData[trailId].name || trailId, 'trail');
                    }
                });

                // Add saved lifts
                savedData.lifts.forEach(liftId => {
                    if (liftData[liftId]) {
                        this.addFeatureToList(liftId, liftData[liftId].name || liftId, 'lift');
                    }
                });

                // Add saved mountain features
                savedData.mountainFeatures.forEach(featureId => {
                    if (window.mountainFeatures[featureId]) {
                        this.addFeatureToList(featureId, window.mountainFeatures[featureId].name || featureId, 'mountainFeature');
                    }
                });
            } catch (error) {
                console.error('Error loading saved features:', error);
            }
        }
    }

    loadSessions() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const sessions = JSON.parse(localStorage.getItem(`${currentUser.username}_${this.type}_sessions`)) || {};
            const selector = document.getElementById(`${this.type}Sessions`);
            
            // Clear existing options except "Current Session"
            selector.innerHTML = '<option value="current">Current Session</option>';
            
            // Add saved sessions to dropdown
            Object.entries(sessions)
                .sort(([,a], [,b]) => new Date(b.date) - new Date(a.date))
                .forEach(([sessionId, session]) => {
                    const option = document.createElement('option');
                    option.value = sessionId;
                    option.textContent = session.name;
                    selector.appendChild(option);
                });

            // Add delete button container after selector
            let controlsDiv = document.querySelector(`#${this.type}SessionControls`);
            if (!controlsDiv) {
                controlsDiv = document.createElement('div');
                controlsDiv.id = `${this.type}SessionControls`;
                controlsDiv.className = 'session-controls';
                selector.parentNode.insertBefore(controlsDiv, selector.nextSibling);
            }

            // Update delete button visibility based on selection
            selector.addEventListener('change', (e) => {
                this.loadSession(e.target.value);
                controlsDiv.innerHTML = e.target.value !== 'current' ? 
                    `<button class="session-delete-button" onclick="trackers['${this.type}'].deleteSession('${e.target.value}')">Delete Session</button>` : '';
            });
        }
    }

    showSaveDialog() {
        const modal = document.getElementById('saveSessionModal');
        const nameInput = document.getElementById('sessionName');
        const dateInput = document.getElementById('sessionDate');
        const saveButton = document.getElementById('saveSessionConfirm');
        const cancelButton = document.getElementById('saveSessionCancel');

        // Set default date to today
        const today = new Date();
        dateInput.value = today.toISOString().split('T')[0];

        // Set default name
        nameInput.value = `Day ${this.getSessionCount() + 1} - ${today.toLocaleDateString()}`;

        modal.style.display = 'flex';

        // Remove any existing event listeners
        const newSaveButton = saveButton.cloneNode(true);
        const newCancelButton = cancelButton.cloneNode(true);
        saveButton.parentNode.replaceChild(newSaveButton, saveButton);
        cancelButton.parentNode.replaceChild(newCancelButton, cancelButton);

        // Add new event listeners
        newSaveButton.addEventListener('click', () => {
            const sessionName = nameInput.value.trim();
            const sessionDate = dateInput.value;
            
            if (sessionName) {
                this.saveNewSession(sessionName, new Date(sessionDate));
                modal.style.display = 'none';
            } else {
                alert('Please enter a session name');
            }
        }, { once: true }); // This ensures the listener only fires once

        newCancelButton.addEventListener('click', () => {
            modal.style.display = 'none';
        }, { once: true });
    }

    getSessionCount() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const sessions = JSON.parse(localStorage.getItem(`${currentUser.username}_${this.type}_sessions`)) || {};
            return Object.keys(sessions).length;
        }
        return 0;
    }

    saveNewSession(customName, customDate, features = null) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        if (!features && 
            this.trackedTrails.size === 0 && 
            this.trackedLifts.size === 0 && 
            this.trackedMountainFeatures.size === 0) {
            alert('No features tracked in current session!');
            return;
        }

        const sessionId = `${this.type}_${Date.now()}`;
        const sessionData = {
            name: customName,
            trails: features ? features.trails : Array.from(this.trackedTrails),
            lifts: features ? features.lifts : Array.from(this.trackedLifts),
            mountainFeatures: features ? features.mountainFeatures : Array.from(this.trackedMountainFeatures),
            date: customDate.toISOString()
        };

        // Save session
        const sessions = JSON.parse(localStorage.getItem(`${currentUser.username}_${this.type}_sessions`)) || {};
        sessions[sessionId] = sessionData;
        localStorage.setItem(`${currentUser.username}_${this.type}_sessions`, JSON.stringify(sessions));

        // Update dropdown
        this.loadSessions();
        
        // Select the new session
        const selector = document.getElementById(`${this.type}Sessions`);
        selector.value = sessionId;
        
        // Load the new session
        this.loadSession(sessionId);
    }

    loadSession(sessionId) {
        console.log(`Loading session: ${sessionId}`);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.currentSessionId = sessionId;
            
            // Update save button state
            const saveButton = document.getElementById(`save${this.type.charAt(0).toUpperCase() + this.type.slice(1)}Session`);
            if (saveButton) {
                saveButton.disabled = sessionId === 'current';
            }

            // Clear current tracking sets
            this.trackedTrails.clear();
            this.trackedLifts.clear();
            this.trackedMountainFeatures.clear();
            
            if (sessionId !== 'current') {
                const sessions = JSON.parse(localStorage.getItem(`${currentUser.username}_${this.type}_sessions`)) || {};
                const session = sessions[sessionId];
                
                if (session) {
                    // Load tracked features
                    if (Array.isArray(session.trails)) {
                        session.trails.forEach(trail => this.trackedTrails.add(trail));
                    }
                    if (Array.isArray(session.lifts)) {
                        session.lifts.forEach(lift => this.trackedLifts.add(lift));
                    }
                    if (Array.isArray(session.mountainFeatures)) {
                        session.mountainFeatures.forEach(feature => this.trackedMountainFeatures.add(feature));
                    }
                    
                    // Update visibility
                    this.dimAllFeatures();
                    this.undimTrackedFeatures();
                }
            } else {
                // If loading 'current' session, dim all features
                this.dimAllFeatures();
            }
            
            // Update the features list
            this.updateFeaturesList();
        }
    }

    updateFeaturesList() {
        const featuresList = document.getElementById(`${this.type}TrailsList`);
        featuresList.innerHTML = '';

        // Add trails with icons
        Array.from(this.trackedTrails)
            .sort((a, b) => {
                const nameA = trailData[a]?.name || a;
                const nameB = trailData[b]?.name || b;
                return nameA.localeCompare(nameB);
            })
            .forEach(trailId => {
                if (trailData[trailId]) {
                    const listItem = document.createElement('div');
                    listItem.className = 'feature-list-item';
                    listItem.innerHTML = `
                        <span class="feature-icon">🏂</span>
                        <span class="feature-name">${trailData[trailId].name || trailId}</span>
                    `;
                    featuresList.appendChild(listItem);
                }
            });

        // Add lifts with icons
        Array.from(this.trackedLifts)
            .sort((a, b) => {
                const nameA = liftData[a]?.name || a;
                const nameB = liftData[b]?.name || b;
                return nameA.localeCompare(nameB);
            })
            .forEach(liftId => {
                if (liftData[liftId]) {
                    const listItem = document.createElement('div');
                    listItem.className = 'feature-list-item';
                    listItem.innerHTML = `
                        <span class="feature-icon">🚡</span>
                        <span class="feature-name">${liftData[liftId].name || liftId}</span>
                    `;
                    featuresList.appendChild(listItem);
                }
            });

        // Add mountain features with icons
        Array.from(this.trackedMountainFeatures)
            .forEach(featureId => {
                const listItem = document.createElement('div');
                listItem.className = 'feature-list-item';
                listItem.innerHTML = `
                    <span class="feature-icon">🏔️</span>
                    <span class="feature-name">${featureId}</span>
                `;
                featuresList.appendChild(listItem);
            });

        // Show empty state message if no features
        if (featuresList.children.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.textContent = 'No features tracked';
            featuresList.appendChild(emptyState);
        }
    }

    dimAllFeatures() {
        // Dim all trails
        Object.keys(trailData).forEach(trailId => {
            const layer = `${trailId}-layer`;
            if (map.getLayer(layer)) {
                map.setPaintProperty(layer, 'line-opacity', 0.3);
            }
        });

        // Dim all lifts
        Object.keys(liftData).forEach(liftId => {
            const layer = `${liftId}-layer`;
            if (map.getLayer(layer)) {
                map.setPaintProperty(layer, 'line-opacity', 0.3);
            }
        });
    }

    undimTrackedFeatures() {
        // Undim tracked trails
        this.trackedTrails.forEach(trailId => {
            const layer = `${trailId}-layer`;
            if (map.getLayer(layer)) {
                map.setPaintProperty(layer, 'line-opacity', 1);
            }
        });

        // Undim tracked lifts
        this.trackedLifts.forEach(liftId => {
            const layer = `${liftId}-layer`;
            if (map.getLayer(layer)) {
                map.setPaintProperty(layer, 'line-opacity', 1);
            }
        });
    }

    deleteSession(sessionId) {
        const deleteModal = document.getElementById('deleteSessionModal');
        const confirmButton = document.getElementById('deleteSessionConfirm');
        const cancelButton = document.getElementById('deleteSessionCancel');

        deleteModal.style.display = 'flex';

        // Remove any existing event listeners
        const newConfirmButton = confirmButton.cloneNode(true);
        const newCancelButton = cancelButton.cloneNode(true);
        confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
        cancelButton.parentNode.replaceChild(newCancelButton, cancelButton);

        newConfirmButton.addEventListener('click', () => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                // Get current sessions
                const sessions = JSON.parse(localStorage.getItem(`${currentUser.username}_${this.type}_sessions`)) || {};
                
                // Delete the session
                delete sessions[sessionId];
                
                // Save updated sessions
                localStorage.setItem(`${currentUser.username}_${this.type}_sessions`, JSON.stringify(sessions));
                
                // Reset to current session
                const selector = document.getElementById(`${this.type}Sessions`);
                selector.value = 'current';
                this.loadSession('current');
                
                // Reload sessions in dropdown
                this.loadSessions();
                
                deleteModal.style.display = 'none';
                alert('Session deleted successfully!');
            }
        }, { once: true });

        newCancelButton.addEventListener('click', () => {
            deleteModal.style.display = 'none';
        }, { once: true });
    }

    saveCurrentSession() {
        if (this.currentSessionId === 'current') {
            alert('Please select a session to save or create a new session.');
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        if (this.trackedTrails.size === 0 && this.trackedLifts.size === 0 && this.trackedMountainFeatures.size === 0) {
            alert('No features tracked in current session!');
            return;
        }

        // Get existing sessions
        const sessions = JSON.parse(localStorage.getItem(`${currentUser.username}_${this.type}_sessions`)) || {};
        const currentSession = sessions[this.currentSessionId];

        if (!currentSession) {
            alert('Session not found. Please create a new session.');
            return;
        }

        // Update session data
        sessions[this.currentSessionId] = {
            ...currentSession,
            trails: Array.from(this.trackedTrails),
            lifts: Array.from(this.trackedLifts),
            mountainFeatures: Array.from(this.trackedMountainFeatures),
            lastModified: new Date().toISOString()
        };

        // Save updated sessions
        localStorage.setItem(`${currentUser.username}_${this.type}_sessions`, JSON.stringify(sessions));
        alert(`Session "${currentSession.name}" updated successfully!`);
    }

    showPushDialog(destinationType) {
        const modal = document.getElementById('pushSessionModal');
        const select = document.getElementById('pushDestinationSelect');
        const newSessionFields = document.getElementById('newSessionFields');
        const newSessionName = document.getElementById('newSessionName');
        const confirmButton = document.getElementById('pushSessionConfirm');
        const cancelButton = document.getElementById('pushSessionCancel');

        // Get destination tracker
        const destTracker = trackers[destinationType];

        // Load existing sessions into select
        select.innerHTML = '<option value="new">Create New Session</option>';
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let hasExistingSessions = false;
        
        if (currentUser) {
            const sessions = JSON.parse(localStorage.getItem(`${currentUser.username}_${destinationType}_sessions`)) || {};
            const sortedSessions = Object.entries(sessions)
                .sort(([,a], [,b]) => new Date(b.date) - new Date(a.date));
            
            hasExistingSessions = sortedSessions.length > 0;
            
            sortedSessions.forEach(([sessionId, session]) => {
                const option = document.createElement('option');
                option.value = sessionId;
                option.textContent = session.name;
                select.appendChild(option);
            });
        }

        // Set default name for new session
        const date = new Date();
        let defaultName = '';
        if (destinationType === 'monthly') {
            defaultName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        } else if (destinationType === 'season') {
            const year = date.getFullYear();
            defaultName = `${year}-${year + 1} Season`;
        }
        newSessionName.value = defaultName;

        // If no existing sessions, hide the selector and show new session fields
        if (!hasExistingSessions) {
            select.style.display = 'none';
            newSessionFields.style.display = 'block';
        } else {
            select.style.display = 'block';
            // Show/hide new session fields based on selection
            select.addEventListener('change', () => {
                newSessionFields.style.display = select.value === 'new' ? 'block' : 'none';
                if (select.value === 'new') {
                    newSessionName.value = defaultName;
                }
            });
        }

        // Show modal
        modal.style.display = 'flex';

        // Handle push confirmation
        const pushHandler = () => {
            if (select.value === 'new' || !hasExistingSessions) {
                // Create new session with default name if none provided
                const sessionName = newSessionName.value.trim() || defaultName;
                destTracker.saveNewSession(sessionName, new Date(), {
                    trails: Array.from(this.trackedTrails),
                    lifts: Array.from(this.trackedLifts),
                    mountainFeatures: Array.from(this.trackedMountainFeatures)
                });
                modal.style.display = 'none';
                alert(`Features pushed to new session: "${sessionName}"`);
            } else {
                // Push to existing session
                destTracker.pushToExistingSession(select.value, {
                    trails: Array.from(this.trackedTrails),
                    lifts: Array.from(this.trackedLifts),
                    mountainFeatures: Array.from(this.trackedMountainFeatures)
                });
                modal.style.display = 'none';
                const selectedOption = select.options[select.selectedIndex];
                alert(`Features pushed to "${selectedOption.textContent}"`);
            }
        };

        const cancelHandler = () => {
            modal.style.display = 'none';
        };

        confirmButton.addEventListener('click', pushHandler, { once: true });
        cancelButton.addEventListener('click', cancelHandler, { once: true });
    }

    pushToExistingSession(sessionId, features) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const sessions = JSON.parse(localStorage.getItem(`${currentUser.username}_${this.type}_sessions`)) || {};
        const session = sessions[sessionId];

        if (session) {
            // Merge features
            const updatedTrails = new Set([...session.trails, ...features.trails]);
            const updatedLifts = new Set([...session.lifts, ...features.lifts]);
            const updatedMountainFeatures = new Set([...session.mountainFeatures, ...features.mountainFeatures]);

            // Update session
            sessions[sessionId] = {
                ...session,
                trails: Array.from(updatedTrails),
                lifts: Array.from(updatedLifts),
                mountainFeatures: Array.from(updatedMountainFeatures),
                lastModified: new Date().toISOString()
            };

            // Save updated sessions
            localStorage.setItem(`${currentUser.username}_${this.type}_sessions`, JSON.stringify(sessions));
            
            // Reload sessions in dropdown
            this.loadSessions();
        }
    }
}

// Initialize trackers
const trackers = {
    daily: new ActivityTracker('daily'),
    monthly: new ActivityTracker('monthly'),
    season: new ActivityTracker('season')
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
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const tracker = trackers[type];
            
            // Stop other trackers if they're running
            Object.entries(trackers).forEach(([key, t]) => {
                if (key !== type && t.isTracking) {
                    t.stopTracking();
                    const otherButton = document.getElementById(`${key}TrackerButton`);
                    otherButton.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)} Tracker`;
                }
            });

            // Start this tracker if it's not already running
            if (!tracker.isTracking) {
                tracker.startTracking();
                button.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Tracker (Active)`;
            }

            // Close tracking options menu
            trackingOptions.style.display = 'none';
        });
    });

    // Add new session button handlers
    ['daily', 'monthly', 'season'].forEach(type => {
        const newSessionButton = document.getElementById(`new${type.charAt(0).toUpperCase() + type.slice(1)}Session`);
        if (newSessionButton) {
            newSessionButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                trackers[type].showSaveDialog();
            });
        }
    });

    // Add click handler to prevent menu closing when clicking inside containers
    ['daily', 'monthly', 'season'].forEach(type => {
        const container = document.getElementById(`${type}TrailsContainer`);
        if (container) {
            container.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    });

    // Add push button handlers
    document.getElementById('pushToMonthly').addEventListener('click', () => {
        trackers['daily'].showPushDialog('monthly');
    });

    document.getElementById('pushToSeason').addEventListener('click', () => {
        trackers['monthly'].showPushDialog('season');
    });

    // Add save button handlers
    ['daily', 'monthly', 'season'].forEach(type => {
        const saveButton = document.getElementById(`save${type.charAt(0).toUpperCase() + type.slice(1)}Session`);
        const selector = document.getElementById(`${type}Sessions`);

        if (saveButton) {
            saveButton.addEventListener('click', () => {
                trackers[type].saveCurrentSession();
            });
        }

        if (selector) {
            selector.addEventListener('change', (e) => {
                const saveButton = document.getElementById(`save${type.charAt(0).toUpperCase() + type.slice(1)}Session`);
                saveButton.disabled = e.target.value === 'current';
            });
        }
    });
});
