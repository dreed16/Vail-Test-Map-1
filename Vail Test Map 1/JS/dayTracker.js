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
        
        // Add delete button event listener based on type
        const deleteButtonId = 
            this.type === 'daily' ? 'deleteSession' : 
            this.type === 'monthly' ? 'deleteMonthlySession' : 
            'deleteSeasonSession';
        const deleteButton = document.getElementById(deleteButtonId);
        if (deleteButton) {
            deleteButton.addEventListener('click', () => this.deleteCurrentSession());
        }
    }

    initializeTracker() {
        // Add click handlers for the tracker buttons
        const button = document.getElementById(`${this.type}TrackerButton`);
        const newSessionButton = document.getElementById(`new${this.type.charAt(0).toUpperCase() + this.type.slice(1)}Session`);
        
        button.addEventListener('click', () => {
            if (!this.isTracking) {
                this.startTracking();
                button.textContent = `${this.type.charAt(0).toUpperCase() + this.type.slice(1)} Tracker (Active)`;
                this.dimAllFeatures();  // Dim features when starting tracking
            } else {
                this.stopTracking();
                button.textContent = `${this.type.charAt(0).toUpperCase() + this.type.slice(1)} Tracker`;
                
                // Restore full visibility to everything
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
                
                if (mountainMarkers) {
                    mountainMarkers.forEach(marker => {
                        const el = marker.getElement();
                        el.style.cssText += 'opacity: 1 !important;';
                        el.style.setProperty('opacity', '1', 'important');
                        
                        const innerElements = el.getElementsByTagName('*');
                        for (let inner of innerElements) {
                            inner.style.cssText += 'opacity: 1 !important;';
                            inner.style.setProperty('opacity', '1', 'important');
                        }
                    });
                }
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
        
        // Hide all containers first
        ['daily', 'monthly', 'season'].forEach(type => {
            const container = document.getElementById(`${type}TrailsContainer`);
            container.style.display = 'none';
        });
        
        // Show only the current container
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
            this.undimFeature(featureId, type);
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
            this.dimFeature(featureId, type);
        }
        
        this.updateFeaturesList();
    }

    dimFeature(featureId, type) {
        console.log('DIMMING ATTEMPT =================');
        console.log('Feature ID:', featureId);
        console.log('Type:', type);
        
        if (type === 'trail' || type === 'lift') {
            const layer = `${featureId}-layer`;
            if (map.getLayer(layer)) {
                map.setPaintProperty(layer, 'line-opacity', 0.3);
            }
        } else if (type === 'mountainFeature') {
            console.log('Mountain Markers Array:', mountainMarkers);
            const marker = mountainMarkers.find(m => m.featureId === featureId);
            console.log('Found Marker:', marker);
            if (marker) {
                console.log('Setting opacity to 0.3');
                marker.getElement().style.opacity = '0.3';
            } else {
                console.log('No marker found for ID:', featureId);
            }
        }
        console.log('=====================================');
    }

    undimFeature(featureId, type) {
        if (type === 'trail' || type === 'lift') {
            const layer = `${featureId}-layer`;
            if (map.getLayer(layer)) {
                map.setPaintProperty(layer, 'line-opacity', 1);
            }
        } else if (type === 'mountainFeature') {
            const marker = mountainMarkers.find(m => m.featureId === featureId);
            if (marker) {
                const el = marker.getElement();
                // Set full opacity with !important
                el.style.cssText += 'opacity: 1 !important;';
                el.style.setProperty('opacity', '1', 'important');
                
                // Also undim inner elements
                const innerElements = el.getElementsByTagName('*');
                for (let inner of innerElements) {
                    inner.style.cssText += 'opacity: 1 !important;';
                    inner.style.setProperty('opacity', '1', 'important');
                }
            }
        }
    }

    stopTracking() {
        console.log(`Stopping ${this.type} tracking...`);
        this.isTracking = false;
        
        // Remove click listener
        if (this.clickListener) {
            map.off('click', this.clickListener);
        }
        
        // Restore ALL trails and lifts to full opacity
        Object.keys(trailData).forEach(trailId => {
            const layer = `${trailId}-layer`;
            if (map.getLayer(layer)) {
                map.setPaintProperty(layer, 'line-opacity', 1);
                map.setPaintProperty(layer, 'line-color', trailData[trailId].color || '#000000');
            }
        });
        
        Object.keys(liftData).forEach(liftId => {
            const layer = `${liftId}-layer`;
            if (map.getLayer(layer)) {
                map.setPaintProperty(layer, 'line-opacity', 1);
                map.setPaintProperty(layer, 'line-color', liftData[liftId].color || '#000000');
            }
        });

        // Restore mountain features to full opacity using the same approach that worked for dimming
        if (typeof mountainMarkers !== 'undefined' && mountainMarkers.length > 0) {
            mountainMarkers.forEach(marker => {
                const el = marker.getElement();
                el.style.cssText += 'opacity: 1 !important;';
                el.style.setProperty('opacity', '1', 'important');
                
                const innerElements = el.getElementsByTagName('*');
                for (let inner of innerElements) {
                    inner.style.cssText += 'opacity: 1 !important;';
                    inner.style.setProperty('opacity', '1', 'important');
                }
            });
        }

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
            
            // Update this line to handle all three types
            const deleteButtonId = 
                this.type === 'daily' ? 'deleteSession' : 
                this.type === 'monthly' ? 'deleteMonthlySession' : 
                'deleteSeasonSession';
            
            const deleteButton = document.getElementById(deleteButtonId);
            
            if (selector) {
                selector.innerHTML = '<option value="current">New Session</option>';
                
                // Add saved sessions to dropdown
                Object.entries(sessions)
                    .sort(([,a], [,b]) => new Date(b.date) - new Date(a.date))
                    .forEach(([sessionId, session]) => {
                        const option = document.createElement('option');
                        option.value = sessionId;
                        option.textContent = session.name;
                        selector.appendChild(option);
                    });

                // Update delete button visibility
                if (deleteButton) {
                    deleteButton.style.display = selector.value === 'current' ? 'none' : 'inline-block';
                }

                // Add change event listener
                selector.addEventListener('change', (e) => {
                    if (deleteButton) {
                        deleteButton.style.display = e.target.value === 'current' ? 'none' : 'inline-block';
                    }
                    this.loadSession(e.target.value);
                });
            }
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

        // Generate a unique session ID using timestamp
        const sessionId = `${this.type}_${Date.now()}`;
        const sessionData = {
            name: customName,
            trails: features ? features.trails : Array.from(this.trackedTrails),
            lifts: features ? features.lifts : Array.from(this.trackedLifts),
            mountainFeatures: features ? features.mountainFeatures : Array.from(this.trackedMountainFeatures),
            date: customDate.toISOString()
        };

        // Get existing sessions and add new one
        const sessions = JSON.parse(localStorage.getItem(`${currentUser.username}_${this.type}_sessions`)) || {};
        sessions[sessionId] = sessionData;
        localStorage.setItem(`${currentUser.username}_${this.type}_sessions`, JSON.stringify(sessions));

        // Reload sessions list
        this.loadSessions();
        
        // Select the new session
        const selector = document.getElementById(`${this.type}Sessions`);
        if (selector) {
            selector.value = sessionId;
            this.loadSession(sessionId);
        }

        // Show delete button for the new session
        const deleteButtonId = this.type === 'daily' ? 'deleteSession' : 'deleteMonthlySession';
        const deleteButton = document.getElementById(deleteButtonId);
        if (deleteButton) {
            deleteButton.style.display = 'inline-block';
        }
    }

    loadSession(sessionId) {
        console.log(`Loading session: ${sessionId}`);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.currentSessionId = sessionId;
            
            // Update delete button visibility based on type
            const deleteButtonId = this.type === 'daily' ? 'deleteSession' : 'deleteMonthlySession';
            const deleteButton = document.getElementById(deleteButtonId);
            if (deleteButton) {
                deleteButton.style.display = sessionId === 'current' ? 'none' : 'inline-block';
            }

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
                // For 'current' session, restore full visibility to everything
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
                
                if (mountainMarkers) {
                    mountainMarkers.forEach(marker => {
                        const el = marker.getElement();
                        el.style.cssText += 'opacity: 1 !important;';
                        el.style.setProperty('opacity', '1', 'important');
                        
                        const innerElements = el.getElementsByTagName('*');
                        for (let inner of innerElements) {
                            inner.style.cssText += 'opacity: 1 !important;';
                            inner.style.setProperty('opacity', '1', 'important');
                        }
                    });
                }
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

        // Dim ALL mountain features first
        console.log('Dimming all mountain features');
        mountainMarkers.forEach(marker => {
            const el = marker.getElement();
            // Try multiple approaches to set opacity
            el.style.cssText += 'opacity: 0.5 !important;';
            el.style.setProperty('opacity', '0.5', 'important');
            
            // Also try to dim the inner elements
            const innerElements = el.getElementsByTagName('*');
            for (let inner of innerElements) {
                inner.style.cssText += 'opacity: 0.5 !important;';
                inner.style.setProperty('opacity', '0.5', 'important');
            }
            
            console.log('Set opacity for marker:', marker.featureId);
        });
    }

    undimTrackedFeatures() {
        // Undim tracked trails
        this.trackedTrails.forEach(trailId => {
            this.undimFeature(trailId, 'trail');
        });

        // Undim tracked lifts
        this.trackedLifts.forEach(liftId => {
            this.undimFeature(liftId, 'lift');
        });

        // Undim tracked mountain features
        this.trackedMountainFeatures.forEach(featureId => {
            this.undimFeature(featureId, 'mountainFeature');
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
        const confirmButton = document.getElementById('pushSessionConfirm');
        const cancelButton = document.getElementById('pushSessionCancel');
        const newSessionFields = document.getElementById('newSessionFields');
        const newSessionName = document.getElementById('newSessionName');
        
        // Clear select
        select.innerHTML = '';
        
        // Get existing sessions and populate the dropdown
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const sessions = JSON.parse(localStorage.getItem(`${currentUser.username}_${destinationType}_sessions`)) || {};
            
            // Filter sessions based on destination type
            const validSessions = Object.entries(sessions).filter(([sessionId, session]) => {
                if (destinationType === 'monthly') {
                    // For pushing to monthly, show monthly sessions
                    return sessionId.startsWith('monthly_');
                } else if (destinationType === 'season') {
                    // For pushing to season, show season sessions
                    return sessionId.startsWith('season_');
                }
                return false;
            });

            // Add existing sessions first
            validSessions
                .sort(([,a], [,b]) => new Date(b.date) - new Date(a.date))
                .forEach(([sessionId, session]) => {
                    const option = document.createElement('option');
                    option.value = sessionId;
                    option.textContent = session.name;
                    select.appendChild(option);
                });
        }

        // Add "Create New Session" at the bottom
        const newOption = document.createElement('option');
        newOption.value = 'new';
        newOption.textContent = 'Create New Session';
        select.appendChild(newOption);

        // Initialize new session fields visibility
        newSessionFields.style.display = 'none';

        // Show/hide new session fields based on selection
        select.addEventListener('change', () => {
            newSessionFields.style.display = select.value === 'new' ? 'block' : 'none';
        });

        // Handle push confirmation
        confirmButton.onclick = () => {
            if (select.value === 'new') {
                // Create new session
                if (!newSessionName.value.trim()) {
                    alert('Please enter a name for the new session');
                    return;
                }
                
                const destTracker = new ActivityTracker(destinationType);
                destTracker.saveNewSession(
                    newSessionName.value,
                    new Date(),
                    {
                        trails: Array.from(this.trackedTrails),
                        lifts: Array.from(this.trackedLifts),
                        mountainFeatures: Array.from(this.trackedMountainFeatures)
                    }
                );
                alert(`Successfully created new ${destinationType} session: ${newSessionName.value}`);
            } else {
                // Push to existing session
                const sessions = JSON.parse(localStorage.getItem(`${currentUser.username}_${destinationType}_sessions`));
                const targetSession = sessions[select.value];
                
                // Merge features
                const updatedTrails = new Set([...targetSession.trails, ...this.trackedTrails]);
                const updatedLifts = new Set([...targetSession.lifts, ...this.trackedLifts]);
                const updatedMountainFeatures = new Set([...targetSession.mountainFeatures, ...this.trackedMountainFeatures]);
                
                targetSession.trails = Array.from(updatedTrails);
                targetSession.lifts = Array.from(updatedLifts);
                targetSession.mountainFeatures = Array.from(updatedMountainFeatures);
                
                sessions[select.value] = targetSession;
                localStorage.setItem(`${currentUser.username}_${destinationType}_sessions`, JSON.stringify(sessions));
                alert(`Successfully added features to ${targetSession.name}`);
            }
            
            modal.style.display = 'none';
        };

        // Handle cancel
        cancelButton.onclick = () => {
            modal.style.display = 'none';
        };

        // Show the modal
        modal.style.display = 'block';
    }

    deleteCurrentSession() {
        if (this.currentSessionId === 'current') return;

        // Show confirmation dialog
        if (confirm('Are you sure you want to delete this session?')) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                // Get existing sessions
                const sessions = JSON.parse(localStorage.getItem(`${currentUser.username}_${this.type}_sessions`)) || {};
                
                // Delete the current session
                delete sessions[this.currentSessionId];
                
                // Save updated sessions back to localStorage
                localStorage.setItem(`${currentUser.username}_${this.type}_sessions`, JSON.stringify(sessions));
                
                // Reset to new session
                this.currentSessionId = 'current';
                
                // Clear tracked features
                this.trackedTrails.clear();
                this.trackedLifts.clear();
                this.trackedMountainFeatures.clear();
                
                // Update features list
                this.updateFeaturesList();
                
                // Reload sessions dropdown
                this.loadSessions();
                
                // Select "New Session" in dropdown
                const selector = document.getElementById(`${this.type}Sessions`);
                if (selector) {
                    selector.value = 'current';
                }
                
                // Hide delete button - Updated this part
                const deleteButtonId = 
                    this.type === 'daily' ? 'deleteSession' : 
                    this.type === 'monthly' ? 'deleteMonthlySession' : 
                    'deleteSeasonSession';
                const deleteButton = document.getElementById(deleteButtonId);
                if (deleteButton) {
                    deleteButton.style.display = 'none';
                }

                // Reset trail visibility
                this.stopTracking();
                this.startTracking();
            }
        }
    }

    pushToMonthly() {
        console.log('Starting pushToMonthly...');
        
        // If no features are tracked, show alert and return
        if (this.trackedTrails.size === 0 && this.trackedLifts.size === 0 && this.trackedMountainFeatures.size === 0) {
            alert('No features tracked in current session!');
            return;
        }

        // Get the push dialog selector value
        const pushSelector = document.querySelector('.push-features-dialog select');
        console.log('Push selector value:', pushSelector.value);
        
        if (pushSelector.value === 'current' || pushSelector.value === 'Create New Session') {
            console.log('Creating new monthly session...');
            // Prompt for new monthly session name
            const monthName = prompt('Enter a name for the new monthly session (e.g., "March 2025"):');
            if (!monthName) {
                console.log('User cancelled new session creation');
                return;
            }

            // Create new monthly session
            const monthlyTracker = new ActivityTracker('monthly');
            const features = {
                trails: Array.from(this.trackedTrails),
                lifts: Array.from(this.trackedLifts),
                mountainFeatures: Array.from(this.trackedMountainFeatures)
            };

            monthlyTracker.saveNewSession(monthName, new Date(), features);
            alert(`Successfully created new monthly session: ${monthName}`);
        } else {
            // Handle existing session...
            const monthlySelector = document.getElementById('monthlySessions');
            const selectedSession = pushSelector.options[pushSelector.selectedIndex].text;
            
            const confirmMerge = confirm(`Add these features to "${selectedSession}"?`);
            if (!confirmMerge) return;

            // Rest of existing merge code...
        }
    }

    populatePushDestinations(select) {
        // Clear existing options except "Create New Session"
        select.innerHTML = '<option value="current">Create New Session</option>';
        
        // Add existing monthly sessions
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const monthlySessions = JSON.parse(localStorage.getItem(`${currentUser.username}_monthly_sessions`)) || {};
            Object.entries(monthlySessions)
                .sort(([,a], [,b]) => new Date(b.date) - new Date(a.date))
                .forEach(([sessionId, session]) => {
                    const option = document.createElement('option');
                    option.value = sessionId;
                    option.textContent = session.name;
                    select.appendChild(option);
                });
        }
    }

    executePushToMonthly(destinationId) {
        console.log('Executing push to monthly with destination:', destinationId);
        
        if (this.trackedTrails.size === 0 && this.trackedLifts.size === 0 && this.trackedMountainFeatures.size === 0) {
            alert('No features tracked in current session!');
            return;
        }

        if (destinationId === 'current') {
            // Create new monthly session
            const monthName = prompt('Enter a name for the new monthly session (e.g., "March 2025"):');
            if (!monthName) return;

            const monthlyTracker = new ActivityTracker('monthly');
            const features = {
                trails: Array.from(this.trackedTrails),
                lifts: Array.from(this.trackedLifts),
                mountainFeatures: Array.from(this.trackedMountainFeatures)
            };

            monthlyTracker.saveNewSession(monthName, new Date(), features);
            alert(`Successfully created new monthly session: ${monthName}`);
        } else {
            // Handle pushing to existing session
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                const monthlySessions = JSON.parse(localStorage.getItem(`${currentUser.username}_monthly_sessions`)) || {};
                const monthlySession = monthlySessions[destinationId];

                if (monthlySession) {
                    const updatedTrails = new Set([...monthlySession.trails, ...this.trackedTrails]);
                    const updatedLifts = new Set([...monthlySession.lifts, ...this.trackedLifts]);
                    const updatedMountainFeatures = new Set([...monthlySession.mountainFeatures, ...this.trackedMountainFeatures]);

                    monthlySession.trails = Array.from(updatedTrails);
                    monthlySession.lifts = Array.from(updatedLifts);
                    monthlySession.mountainFeatures = Array.from(updatedMountainFeatures);

                    monthlySessions[destinationId] = monthlySession;
                    localStorage.setItem(`${currentUser.username}_monthly_sessions`, JSON.stringify(monthlySessions));
                    alert(`Successfully added features to ${monthlySession.name}`);
                }
            }
        }
    }

    initializeTrackingDropdown() {
        // Get the existing elements instead of creating new ones
        const exitButton = document.createElement('button');
        exitButton.id = 'exitTrackingButton';
        exitButton.className = 'tracker-option';
        exitButton.textContent = 'Exit Tracking';

        const divider = document.createElement('hr');
        divider.className = 'tracker-divider';

        const trackingOptions = document.getElementById('trackingOptions');
        trackingOptions.appendChild(divider);
        trackingOptions.appendChild(exitButton);
        
        // Add click handler for exit tracking
        exitButton.addEventListener('click', () => {
            // Restore full visibility to everything
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
            
            if (mountainMarkers) {
                mountainMarkers.forEach(marker => {
                    const el = marker.getElement();
                    el.style.cssText += 'opacity: 1 !important;';
                    el.style.setProperty('opacity', '1', 'important');
                    
                    const innerElements = el.getElementsByTagName('*');
                    for (let inner of innerElements) {
                        inner.style.cssText += 'opacity: 1 !important;';
                        inner.style.setProperty('opacity', '1', 'important');
                    }
                });
            }
            
            // Stop all trackers
            Object.values(trackers).forEach(tracker => {
                if (tracker.isTracking) {
                    tracker.stopTracking();
                }
            });
            
            // Hide all tracking containers
            ['daily', 'monthly', 'season'].forEach(type => {
                const container = document.getElementById(`${type}TrailsContainer`);
                if (container) {
                    container.style.display = 'none';
                }
            });

            // Hide the tracking options menu
            trackingOptions.style.display = 'none';
        });
    }
}


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

    // Add this where you set up your other tracking button listeners
    document.getElementById('exitTrackingButton').addEventListener('click', () => {
        // Restore full visibility to everything
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
        
        if (mountainMarkers) {
            mountainMarkers.forEach(marker => {
                const el = marker.getElement();
                el.style.cssText += 'opacity: 1 !important;';
                el.style.setProperty('opacity', '1', 'important');
                
                const innerElements = el.getElementsByTagName('*');
                for (let inner of innerElements) {
                    inner.style.cssText += 'opacity: 1 !important;';
                    inner.style.setProperty('opacity', '1', 'important');
                }
            });
        }
        
        // Stop all trackers
        Object.values(trackers).forEach(tracker => {
            if (tracker.isTracking) {
                tracker.stopTracking();
            }
        });
        
        // Hide all tracking containers
        ['daily', 'monthly', 'season'].forEach(type => {
            const container = document.getElementById(`${type}TrailsContainer`);
            if (container) {
                container.style.display = 'none';
            }
        });

        // Hide the tracking options menu
        document.getElementById('trackingOptions').style.display = 'none';
    });
});
