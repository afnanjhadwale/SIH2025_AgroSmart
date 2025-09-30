// AgroSmart Smart Irrigation System JavaScript

// Global Variables and Configuration
let currentLanguage = 'en';
let sensorData = {};
let chart = null;
let alertsData = [];
let profileData = {};

// Multi-language Support
const translations = {
    en: {
        'deviceStatus': 'ESP32: Active',
        'sensorData': 'Sensor Data',
        'temperature': 'Temperature',
        'humidity': 'Humidity',
        'weather': 'Weather',
        'rainfall': 'Rainfall',
        'soilMoisture': 'Soil Moisture',
        'waterTank': 'Water Tank',
        'waterSources': 'Water Sources',
        'optimalLevel': 'Optimal Level',
        'daysRemaining': 'Days remaining',
        'irrigationControl': 'Irrigation Control',
        'aiRecommendation': 'AI Recommendation',
        'cropStatus': 'Crop Status',
        'historicalData': 'Historical Data',
        'cropAdvisory': 'AI Crop Advisory',
        'realTimeAlerts': 'Real-time Alerts',
        'farmerProfile': 'Farmer Profile',
        'saveProfile': 'Save Profile',
        'searchPlaceholder': 'Search crops by name or soil type...',
        'ON': 'ON',
        'OFF': 'OFF'
    },
    hi: {
        'deviceStatus': 'ESP32: सक्रिय',
        'sensorData': 'सेंसर डेटा',
        'temperature': 'तापमान',
        'humidity': 'नमी',
        'weather': 'मौसम',
        'rainfall': 'वर्षा',
        'soilMoisture': 'मिट्टी की नमी',
        'waterTank': 'पानी की टंकी',
        'waterSources': 'पानी के स्रोत',
        'optimalLevel': 'उत्तम स्तर',
        'daysRemaining': 'बचे दिन',
        'irrigationControl': 'सिंचाई नियंत्रण',
        'aiRecommendation': 'AI सिफारिश',
        'cropStatus': 'फसल की स्थिति',
        'historicalData': 'ऐतिहासिक डेटा',
        'cropAdvisory': 'AI फसल सलाह',
        'realTimeAlerts': 'रियल-टाइम अलर्ट',
        'farmerProfile': 'किसान प्रोफाइल',
        'saveProfile': 'प्रोफाइल सेव करें',
        'searchPlaceholder': 'नाम या मिट्टी के प्रकार से फसल खोजें...',
        'ON': 'चालू',
        'OFF': 'बंद'
    },
    ne: {
        'deviceStatus': 'ESP32: सक्रिय',
        'sensorData': 'सेन्सर डाटा',
        'temperature': 'तापक्रम',
        'humidity': 'आर्द्रता',
        'weather': 'मौसम',
        'rainfall': 'वर्षा',
        'soilMoisture': 'माटोको आर्द्रता',
        'waterTank': 'पानी ट्यांकी',
        'waterSources': 'पानीका स्रोत',
        'optimalLevel': 'उत्तम स्तर',
        'daysRemaining': 'बाँकी दिन',
        'irrigationControl': 'सिँचाइ नियन्त्रण',
        'aiRecommendation': 'AI सिफारिस',
        'cropStatus': 'बालीको अवस्था',
        'historicalData': 'ऐतिहासिक डाटा',
        'cropAdvisory': 'AI बाली सल्लाह',
        'realTimeAlerts': 'रियल-टाइम चेतावनी',
        'farmerProfile': 'किसान प्रोफाइल',
        'saveProfile': 'प्रोफाइल सेभ गर्नुहोस्',
        'searchPlaceholder': 'नाम वा माटोको प्रकारले बाली खोज्नुहोस्...',
        'ON': 'खुला',
        'OFF': 'बन्द'
    }
};

// Dummy Sensor Data - Replace with real ESP32 data integration
const dummySensorData = {
    temperature: {
        current: 28.5,
        unit: '°C',
        description: 'Current ambient temperature',
        icon: 'fas fa-thermometer-half',
        trend: 'stable',
        readings: [
            { time: '06:00', value: 25.2 },
            { time: '09:00', value: 27.8 },
            { time: '12:00', value: 32.1 },
            { time: '15:00', value: 30.4 },
            { time: '18:00', value: 28.5 }
        ]
    },
    humidity: {
        current: 65,
        unit: '%',
        description: 'Relative humidity in air',
        icon: 'fas fa-tint',
        trend: 'increasing',
        readings: [
            { time: '06:00', value: 72 },
            { time: '09:00', value: 68 },
            { time: '12:00', value: 55 },
            { time: '15:00', value: 58 },
            { time: '18:00', value: 65 }
        ]
    },
    weather: {
        current: 'Partly Cloudy',
        temperature: 28.5,
        humidity: 65,
        windSpeed: 12,
        description: 'Current weather conditions',
        icon: 'fas fa-cloud-sun',
        forecast: [
            { day: 'Today', temp: '28/22°C', condition: 'Partly Cloudy' },
            { day: 'Tomorrow', temp: '30/24°C', condition: 'Sunny' },
            { day: 'Day After', temp: '26/20°C', condition: 'Rain Possible' }
        ]
    },
    rainfall: {
        current: '15mm expected',
        probability: 70,
        timing: 'Evening (6-9 PM)',
        description: '24-hour rainfall prediction',
        icon: 'fas fa-cloud-rain',
        prediction: [
            { time: '6 PM', probability: 30, amount: '2mm' },
            { time: '8 PM', probability: 70, amount: '8mm' },
            { time: '10 PM', probability: 45, amount: '5mm' }
        ]
    },
    soil: {
        current: 32,
        unit: '%',
        description: 'Soil moisture at root level',
        icon: 'fas fa-seedling',
        status: 'Needs Water',
        depths: [
            { depth: '0-10cm', moisture: 28, status: 'low' },
            { depth: '10-20cm', moisture: 32, status: 'medium' },
            { depth: '20-30cm', moisture: 45, status: 'optimal' }
        ]
    }
};

// Crop Data for AI Advisory System
const cropsData = [
    {
        id: 1,
        name: 'Cardamom',
        icon: '🌿',
        waterRequirement: { min: 150, max: 200, unit: 'cm/year' },
        bestSeason: 'June-September',
        crossCropping: ['Coffee', 'Areca Nut'],
        suitableSoil: ['loam', 'clay'],
        description: 'High-value spice crop suitable for hill regions',
        phRange: '6.0-7.0',
        temperature: '18-25°C',
        recommended: true
    },
    {
        id: 2,
        name: 'Ginger',
        icon: '🫚',
        waterRequirement: { min: 180, max: 220, unit: 'cm/year' },
        bestSeason: 'May-August',
        crossCropping: ['Turmeric', 'Banana'],
        suitableSoil: ['loam', 'sandy'],
        description: 'Medicinal and culinary rhizome crop',
        phRange: '5.5-6.5',
        temperature: '25-30°C',
        recommended: false
    },
    {
        id: 3,
        name: 'Turmeric',
        icon: '🟡',
        waterRequirement: { min: 160, max: 200, unit: 'cm/year' },
        bestSeason: 'June-September',
        crossCropping: ['Ginger', 'Banana'],
        suitableSoil: ['loam', 'clay'],
        description: 'Golden spice with medicinal properties',
        phRange: '6.0-7.5',
        temperature: '20-30°C',
        recommended: true
    },
    {
        id: 4,
        name: 'Black Pepper',
        icon: '⚫',
        waterRequirement: { min: 200, max: 250, unit: 'cm/year' },
        bestSeason: 'June-October',
        crossCropping: ['Cardamom', 'Coffee'],
        suitableSoil: ['loam', 'clay'],
        description: 'King of spices climbing vine',
        phRange: '6.0-7.0',
        temperature: '23-28°C',
        recommended: false
    },
    {
        id: 5,
        name: 'Rice',
        icon: '🌾',
        waterRequirement: { min: 120, max: 150, unit: 'cm/season' },
        bestSeason: 'June-November',
        crossCropping: ['Fish', 'Duck'],
        suitableSoil: ['clay', 'silt'],
        description: 'Staple food grain crop',
        phRange: '6.0-7.0',
        temperature: '22-32°C',
        recommended: true
    },
    {
        id: 6,
        name: 'Maize',
        icon: '🌽',
        waterRequirement: { min: 60, max: 80, unit: 'cm/season' },
        bestSeason: 'March-July',
        crossCropping: ['Beans', 'Pumpkin'],
        suitableSoil: ['loam', 'sandy'],
        description: 'Versatile cereal crop',
        phRange: '6.0-7.5',
        temperature: '21-27°C',
        recommended: false
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('🌱 Initializing AgroSmart System...');
    
    // Load saved data
    loadProfileData();
    
    // Initialize UI components
    setupNavigationTabs();
    setupLanguageSelector();
    setupSensorTabs();
    setupIrrigationControl();
    setupProfileForm();
    setupCropSearch();
    setupModal();
    
    // Initialize data displays
    updateSensorDisplay('temperature');
    updateWaterLevels();
    updateCropStatusGrid();
    updateAlertsDisplay();
    loadCropGrid();
    initializeChart();
    
    // Start real-time simulation
    startRealTimeUpdates();
    
    // Show initialization complete
    showToast('AgroSmart System Initialized Successfully!', 'success');
}

// Navigation Tab Management
function setupNavigationTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-tab');
            switchToPage(targetPage);
        });
    });
}

function switchToPage(pageId) {
    // Update navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${pageId}"]`).classList.add('active');
    
    // Update page content
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId + 'Page').classList.add('active');
    
    // Page-specific initialization
    if (pageId === 'advisory') {
        loadCropGrid();
    } else if (pageId === 'alerts') {
        updateAlertsDisplay();
    }
}

// Language Management
function setupLanguageSelector() {
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', function() {
        currentLanguage = this.value;
        updateLanguage();
        showToast('Language updated successfully!', 'success');
    });
}

function updateLanguage() {
    document.querySelectorAll('[data-en]').forEach(element => {
        const key = element.getAttribute('data-' + currentLanguage);
        if (key) {
            element.textContent = key;
        }
    });
    
    // Update search placeholder
    const searchInput = document.getElementById('cropSearch');
    if (searchInput) {
        const placeholders = {
            en: 'Search crops by name or soil type...',
            hi: 'नाम या मिट्टी के प्रकार से फसल खोजें...',
            ne: 'नाम वा माटोको प्रकारले बाली खोज्नुहोस्...'
        };
        searchInput.placeholder = placeholders[currentLanguage];
    }
}

// Sensor Data Management
function setupSensorTabs() {
    const sensorTabs = document.querySelectorAll('.sensor-tab');
    sensorTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const sensorType = this.getAttribute('data-sensor');
            switchSensor(sensorType);
        });
    });
}

function switchSensor(sensorType) {
    // Update sensor tabs
    document.querySelectorAll('.sensor-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-sensor="${sensorType}"]`).classList.add('active');
    
    // Update sensor display
    updateSensorDisplay(sensorType);
}

function updateSensorDisplay(sensorType) {
    const displayContainer = document.getElementById('sensorDataDisplay');
    const data = dummySensorData[sensorType];
    
    if (!data) return;
    
    let html = '';
    
    switch (sensorType) {
        case 'temperature':
            html = createTemperatureDisplay(data);
            break;
        case 'humidity':
            html = createHumidityDisplay(data);
            break;
        case 'weather':
            html = createWeatherDisplay(data);
            break;
        case 'rainfall':
            html = createRainfallDisplay(data);
            break;
        case 'soil':
            html = createSoilDisplay(data);
            break;
    }
    
    displayContainer.innerHTML = html;
}

function createTemperatureDisplay(data) {
    return `
        <div class="sensor-data">
            <div class="sensor-card">
                <i class="${data.icon}" style="font-size: 2rem; color: #ff6b35; margin-bottom: 0.5rem;"></i>
                <div class="sensor-value">${data.current}</div>
                <div class="sensor-unit">${data.unit}</div>
                <div class="sensor-description">${data.description}</div>
            </div>
            <div class="sensor-card">
                <h4>Recent Readings</h4>
                ${data.readings.map(reading => 
                    `<div style="display: flex; justify-content: space-between; margin: 0.3rem 0;">
                        <span>${reading.time}</span>
                        <span>${reading.value}°C</span>
                    </div>`
                ).join('')}
            </div>
            <div class="sensor-card">
                <h4>Status</h4>
                <p>Trend: <span style="color: #4caf50;">${data.trend}</span></p>
                <p>Range: Optimal (20-35°C)</p>
                <p style="color: ${data.current > 35 ? '#f44336' : data.current < 20 ? '#ff9800' : '#4caf50'};">
                    ${data.current > 35 ? 'High' : data.current < 20 ? 'Low' : 'Normal'}
                </p>
            </div>
        </div>
    `;
}

function createHumidityDisplay(data) {
    return `
        <div class="sensor-data">
            <div class="sensor-card">
                <i class="${data.icon}" style="font-size: 2rem; color: #2196f3; margin-bottom: 0.5rem;"></i>
                <div class="sensor-value">${data.current}</div>
                <div class="sensor-unit">${data.unit}</div>
                <div class="sensor-description">${data.description}</div>
            </div>
            <div class="sensor-card">
                <h4>Recent Readings</h4>
                ${data.readings.map(reading => 
                    `<div style="display: flex; justify-content: space-between; margin: 0.3rem 0;">
                        <span>${reading.time}</span>
                        <span>${reading.value}%</span>
                    </div>`
                ).join('')}
            </div>
            <div class="sensor-card">
                <h4>Analysis</h4>
                <p>Trend: <span style="color: #ff9800;">${data.trend}</span></p>
                <p>Ideal Range: 60-80%</p>
                <p style="color: ${data.current > 80 ? '#f44336' : data.current < 40 ? '#f44336' : '#4caf50'};">
                    ${data.current > 80 ? 'Too High' : data.current < 40 ? 'Too Low' : 'Good'}
                </p>
            </div>
        </div>
    `;
}

function createWeatherDisplay(data) {
    return `
        <div class="sensor-data">
            <div class="sensor-card">
                <i class="${data.icon}" style="font-size: 2rem; color: #ffb74d; margin-bottom: 0.5rem;"></i>
                <div class="sensor-value">${data.current}</div>
                <div class="sensor-description">Temperature: ${data.temperature}°C</div>
                <div class="sensor-description">Wind: ${data.windSpeed} km/h</div>
            </div>
            <div class="sensor-card">
                <h4>3-Day Forecast</h4>
                ${data.forecast.map(day => 
                    `<div style="display: flex; justify-content: space-between; margin: 0.5rem 0; align-items: center;">
                        <span style="font-weight: 500;">${day.day}</span>
                        <div style="text-align: right;">
                            <div>${day.temp}</div>
                            <small style="color: #666;">${day.condition}</small>
                        </div>
                    </div>`
                ).join('')}
            </div>
        </div>
    `;
}

function createRainfallDisplay(data) {
    return `
        <div class="sensor-data">
            <div class="sensor-card">
                <i class="${data.icon}" style="font-size: 2rem; color: #42a5f5; margin-bottom: 0.5rem;"></i>
                <div class="sensor-value">${data.current}</div>
                <div class="sensor-description">${data.description}</div>
                <div class="sensor-description">Probability: ${data.probability}%</div>
                <div class="sensor-description">Expected: ${data.timing}</div>
            </div>
            <div class="sensor-card">
                <h4>Hourly Prediction</h4>
                ${data.prediction.map(hour => 
                    `<div style="display: flex; justify-content: space-between; margin: 0.3rem 0;">
                        <span>${hour.time}</span>
                        <span>${hour.probability}% - ${hour.amount}</span>
                    </div>`
                ).join('')}
            </div>
            <div class="sensor-card">
                <h4>Irrigation Impact</h4>
                <p style="color: ${data.probability > 60 ? '#4caf50' : '#ff9800'};">
                    ${data.probability > 60 ? 
                        '✅ Irrigation can be delayed' : 
                        '⚠️ Irrigation recommended'
                    }
                </p>
                <p style="font-size: 0.9rem; color: #666;">
                    Expected rainfall: ${data.current}
                </p>
            </div>
        </div>
    `;
}

function createSoilDisplay(data) {
    return `
        <div class="sensor-data">
            <div class="sensor-card">
                <i class="${data.icon}" style="font-size: 2rem; color: #66bb6a; margin-bottom: 0.5rem;"></i>
                <div class="sensor-value">${data.current}</div>
                <div class="sensor-unit">${data.unit}</div>
                <div class="sensor-description">${data.description}</div>
                <div style="color: ${data.current < 40 ? '#f44336' : data.current < 60 ? '#ff9800' : '#4caf50'}; font-weight: 500;">
                    Status: ${data.status}
                </div>
            </div>
            <div class="sensor-card">
                <h4>Depth Analysis</h4>
                ${data.depths.map(layer => 
                    `<div style="display: flex; justify-content: space-between; margin: 0.5rem 0; align-items: center;">
                        <span>${layer.depth}</span>
                        <div style="text-align: right;">
                            <span>${layer.moisture}%</span>
                            <div style="width: 50px; height: 8px; background: #eee; border-radius: 4px; margin-top: 2px;">
                                <div style="width: ${layer.moisture}%; height: 100%; background: ${
                                    layer.status === 'optimal' ? '#4caf50' : 
                                    layer.status === 'medium' ? '#ff9800' : '#f44336'
                                }; border-radius: 4px;"></div>
                            </div>
                        </div>
                    </div>`
                ).join('')}
            </div>
            <div class="sensor-card">
                <h4>Recommendation</h4>
                <p style="color: #9c27b0; font-weight: 500;">
                    💡 Irrigation needed for 25 minutes
                </p>
                <p style="font-size: 0.9rem; color: #666;">
                    Root zone moisture is below optimal level
                </p>
            </div>
        </div>
    `;
}

// Water Level Management
function updateWaterLevels() {
    // Water tank level (75%)
    const tankLevel = 75;
    const tankFill = document.getElementById('waterTankFill');
    const tankPercentage = document.getElementById('waterTankPercentage');
    const tankStatus = document.getElementById('waterTankStatus');
    const tankDays = document.getElementById('waterTankDays');
    
    if (tankFill) {
        tankFill.style.height = tankLevel + '%';
        tankPercentage.textContent = tankLevel + '%';
        
        // Update color and status based on level
        const waterLevelContainer = document.getElementById('waterTankLevel');
        if (tankLevel > 70) {
            waterLevelContainer.className = 'water-level high';
            tankStatus.textContent = translations[currentLanguage]['optimalLevel'] || 'Optimal Level';
            tankDays.textContent = (translations[currentLanguage]['daysRemaining'] || 'Days remaining') + ': 8';
        } else if (tankLevel > 30) {
            waterLevelContainer.className = 'water-level medium';
            tankStatus.textContent = 'Moderate Level';
            tankDays.textContent = (translations[currentLanguage]['daysRemaining'] || 'Days remaining') + ': 4';
        } else {
            waterLevelContainer.className = 'water-level low';
            tankStatus.textContent = 'Low Level - Refill Soon';
            tankDays.textContent = (translations[currentLanguage]['daysRemaining'] || 'Days remaining') + ': 1';
        }
    }
    
    // Update water source levels with animation
    setTimeout(() => {
        const pondFill = document.querySelector('.pond-fill');
        const jalkundFill = document.querySelector('.jalkund-fill');
        
        if (pondFill) pondFill.style.width = '45%';
        if (jalkundFill) jalkundFill.style.width = '82%';
    }, 500);
}

// Irrigation Control
function setupIrrigationControl() {
    const irrigationToggle = document.getElementById('irrigationToggle');
    const irrigationStatus = document.getElementById('irrigationStatus');
    
    if (irrigationToggle) {
        irrigationToggle.addEventListener('change', function() {
            const isOn = this.checked;
            updateIrrigationStatus(isOn);
            
            // Simulate sending command to ESP32
            console.log(`📡 Sending irrigation command to ESP32: ${isOn ? 'ON' : 'OFF'}`);
            showToast(`Irrigation turned ${isOn ? 'ON' : 'OFF'}`, 'info');
            
            // Add to alerts
            addAlert({
                type: 'info',
                title: 'Irrigation Control',
                message: `Irrigation system ${isOn ? 'activated' : 'deactivated'} manually`,
                time: new Date().toLocaleTimeString()
            });
        });
    }
}

function updateIrrigationStatus(isOn) {
    const irrigationStatus = document.getElementById('irrigationStatus');
    if (irrigationStatus) {
        irrigationStatus.textContent = isOn ? 
            (translations[currentLanguage]['ON'] || 'ON') : 
            (translations[currentLanguage]['OFF'] || 'OFF');
        irrigationStatus.style.color = isOn ? '#4caf50' : '#f44336';
    }
}

// Crop Status Grid
function updateCropStatusGrid() {
    const cropStatusGrid = document.getElementById('cropStatusGrid');
    if (!cropStatusGrid) return;
    
    const cropStatuses = [
        {
            name: 'Cardamom',
            icon: '🌿',
            status: 'optimal',
            details: 'Moisture: 68% | pH: 6.2 | Growth: Excellent'
        },
        {
            name: 'Ginger',
            icon: '🫚',
            status: 'stressed',
            details: 'Moisture: 45% | pH: 5.8 | Growth: Moderate'
        },
        {
            name: 'Rice',
            icon: '🌾',
            status: 'critical',
            details: 'Moisture: 25% | pH: 6.8 | Growth: Poor - Needs Water'
        }
    ];
    
    cropStatusGrid.innerHTML = cropStatuses.map(crop => `
        <div class="crop-status-card ${crop.status}">
            <div class="crop-name">
                <span>${crop.icon}</span>
                <span>${crop.name}</span>
            </div>
            <div class="crop-details">${crop.details}</div>
        </div>
    `).join('');
}

// Historical Chart
function initializeChart() {
    const chartCanvas = document.getElementById('historicalChart');
    if (!chartCanvas) return;
    
    const ctx = chartCanvas.getContext('2d');
    
    // Generate sample historical data
    const labels = [];
    const moistureData = [];
    const temperatureData = [];
    const humidityData = [];
    
    // Generate data for last 7 days
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        // Generate realistic data with some variation
        moistureData.push(Math.floor(Math.random() * 40 + 30)); // 30-70%
        temperatureData.push(Math.floor(Math.random() * 15 + 20)); // 20-35°C
        humidityData.push(Math.floor(Math.random() * 30 + 50)); // 50-80%
    }
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Soil Moisture (%)',
                    data: moistureData,
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Temperature (°C)',
                    data: temperatureData,
                    borderColor: '#ff6b35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Humidity (%)',
                    data: humidityData,
                    borderColor: '#2196f3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Values'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
    
    // Setup time range selector
    const timeRangeSelect = document.getElementById('graphTimeRange');
    if (timeRangeSelect) {
        timeRangeSelect.addEventListener('change', function() {
            updateChartData(this.value);
        });
    }
}

function updateChartData(timeRange) {
    if (!chart) return;
    
    let labels = [];
    let dataPoints = 0;
    
    switch (timeRange) {
        case '7days':
            dataPoints = 7;
            for (let i = dataPoints - 1; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            }
            break;
        case 'weeks':
            dataPoints = 4;
            for (let i = dataPoints - 1; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - (i * 7));
                labels.push(`Week ${4 - i}`);
            }
            break;
        case 'months':
            dataPoints = 6;
            for (let i = dataPoints - 1; i >= 0; i--) {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
            }
            break;
    }
    
    // Generate new data
    const moistureData = [];
    const temperatureData = [];
    const humidityData = [];
    
    for (let i = 0; i < dataPoints; i++) {
        moistureData.push(Math.floor(Math.random() * 40 + 30));
        temperatureData.push(Math.floor(Math.random() * 15 + 20));
        humidityData.push(Math.floor(Math.random() * 30 + 50));
    }
    
    chart.data.labels = labels;
    chart.data.datasets[0].data = moistureData;
    chart.data.datasets[1].data = temperatureData;
    chart.data.datasets[2].data = humidityData;
    chart.update();
}

// Crop Advisory System
function loadCropGrid() {
    const cropGrid = document.getElementById('cropGrid');
    if (!cropGrid) return;
    
    // Get farmer profile to determine recommendations
    const profile = getProfileData();
    
    cropGrid.innerHTML = cropsData.map(crop => {
        const isRecommended = crop.recommended && 
            (profile.soilType ? crop.suitableSoil.includes(profile.soilType) : crop.recommended);
        
        return `
            <div class="crop-card ${isRecommended ? 'recommended' : ''}" onclick="showCropDetails(${crop.id})">
                <div class="crop-icon">${crop.icon}</div>
                <div class="crop-name">${crop.name}</div>
                <div class="crop-suitability">
                    <i class="fas fa-leaf" style="color: #4caf50;"></i>
                    <span>${crop.suitableSoil.join(', ')} soil</span>
                </div>
            </div>
        `;
    }).join('');
}

function setupCropSearch() {
    const cropSearch = document.getElementById('cropSearch');
    if (cropSearch) {
        cropSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterCrops(searchTerm);
        });
    }
}

function filterCrops(searchTerm) {
    const cropCards = document.querySelectorAll('.crop-card');
    
    cropCards.forEach(card => {
        const cropName = card.querySelector('.crop-name').textContent.toLowerCase();
        const soilTypes = card.querySelector('.crop-suitability span').textContent.toLowerCase();
        
        if (cropName.includes(searchTerm) || soilTypes.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function showCropDetails(cropId) {
    const crop = cropsData.find(c => c.id === cropId);
    if (!crop) return;
    
    const modal = document.getElementById('cropModal');
    const cropDetails = document.getElementById('cropDetails');
    
    cropDetails.innerHTML = `
        <div class="crop-detail-header">
            <div class="crop-detail-icon">${crop.icon}</div>
            <div>
                <h2>${crop.name}</h2>
                <p style="color: #666; margin: 0;">${crop.description}</p>
            </div>
        </div>
        
        <div class="crop-detail-info">
            <div class="detail-item">
                <div class="detail-label">💧 Water Requirement</div>
                <div class="detail-value">${crop.waterRequirement.min}-${crop.waterRequirement.max} ${crop.waterRequirement.unit}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">🌱 Best Season</div>
                <div class="detail-value">${crop.bestSeason}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">🌡️ Temperature Range</div>
                <div class="detail-value">${crop.temperature}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">🧪 pH Range</div>
                <div class="detail-value">${crop.phRange}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">🌾 Cross Cropping</div>
                <div class="detail-value">${crop.crossCropping.join(', ')}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">🏞️ Suitable Soil</div>
                <div class="detail-value">${crop.suitableSoil.map(soil => soil.charAt(0).toUpperCase() + soil.slice(1)).join(', ')}</div>
            </div>
        </div>
        
        ${crop.recommended ? 
            '<div style="background: linear-gradient(135deg, #e8f5e8, #f0f8ff); padding: 1rem; border-radius: 10px; margin-top: 1rem; border-left: 4px solid #4caf50;"><strong>🌟 AI Recommendation:</strong> This crop is highly suitable for your soil type and current weather conditions!</div>' : 
            ''
        }
    `;
    
    modal.style.display = 'block';
}

function setupModal() {
    const modal = document.getElementById('cropModal');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Alerts System
function updateAlertsDisplay() {
    generateAlerts();
    const alertsContainer = document.getElementById('alertsContainer');
    
    if (!alertsContainer) return;
    
    if (alertsData.length === 0) {
        alertsContainer.innerHTML = `
            <div class="alert-item green">
                <div class="alert-icon"><i class="fas fa-check"></i></div>
                <div class="alert-content">
                    <div class="alert-title">All Systems Normal</div>
                    <div class="alert-description">No critical alerts at this time. All sensors and systems are functioning normally.</div>
                </div>
                <div class="alert-time">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        return;
    }
    
    alertsContainer.innerHTML = alertsData.map(alert => `
        <div class="alert-item ${alert.type}">
            <div class="alert-icon">
                <i class="fas ${getAlertIcon(alert.type)}"></i>
            </div>
            <div class="alert-content">
                <div class="alert-title">${alert.title}</div>
                <div class="alert-description">${alert.message}</div>
            </div>
            <div class="alert-time">${alert.time}</div>
        </div>
    `).join('');
}

function generateAlerts() {
    alertsData = [];
    
    // Check soil moisture
    const soilMoisture = dummySensorData.soil.current;
    if (soilMoisture < 30) {
        addAlert({
            type: 'red',
            title: 'Critical: Low Soil Moisture',
            message: `Soil moisture is at ${soilMoisture}%. Immediate irrigation recommended. Crop stress detected.`,
            time: new Date().toLocaleTimeString()
        });
    } else if (soilMoisture < 50) {
        addAlert({
            type: 'yellow',
            title: 'Warning: Soil Moisture Low',
            message: `Soil moisture is at ${soilMoisture}%. Consider irrigation within next 2 hours.`,
            time: new Date().toLocaleTimeString()
        });
    }
    
    // Check water tank level
    const tankLevel = 75; // From updateWaterLevels function
    if (tankLevel < 30) {
        addAlert({
            type: 'red',
            title: 'Critical: Water Tank Low',
            message: `Water tank level is at ${tankLevel}%. Refill immediately. Water will last approximately 1 day.`,
            time: new Date().toLocaleTimeString()
        });
    }
    
    // Check pond level
    const pondLevel = 45;
    if (pondLevel < 30) {
        addAlert({
            type: 'yellow',
            title: 'Warning: Pond Water Low',
            message: `Pond water level is ${pondLevel}%. Water will last approximately 3 days. Consider alternative water sources.`,
            time: new Date().toLocaleTimeString()
        });
    }
    
    // Check temperature extremes
    const temperature = dummySensorData.temperature.current;
    if (temperature > 35) {
        addAlert({
            type: 'yellow',
            title: 'High Temperature Alert',
            message: `Temperature is ${temperature}°C. Monitor crop stress and increase irrigation frequency.`,
            time: new Date().toLocaleTimeString()
        });
    }
    
    // Rainfall prediction alert
    const rainfallProb = dummySensorData.rainfall.probability;
    if (rainfallProb > 70) {
        addAlert({
            type: 'green',
            title: 'Rainfall Predicted',
            message: `${rainfallProb}% chance of rainfall (${dummySensorData.rainfall.current}). You can delay irrigation.`,
            time: new Date().toLocaleTimeString()
        });
    }
}

function addAlert(alert) {
    alertsData.unshift(alert); // Add to beginning of array
    
    // Keep only last 10 alerts
    if (alertsData.length > 10) {
        alertsData = alertsData.slice(0, 10);
    }
    
    // Update display if on alerts page
    if (document.getElementById('alertsPage').classList.contains('active')) {
        updateAlertsDisplay();
    }
}

function getAlertIcon(type) {
    switch (type) {
        case 'green': return 'fa-check';
        case 'yellow': return 'fa-exclamation-triangle';
        case 'red': return 'fa-exclamation-circle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-bell';
    }
}

// Profile Management
function setupProfileForm() {
    const profileForm = document.getElementById('profileForm');
    if (!profileForm) return;
    
    // Load existing profile data
    loadProfileForm();
    
    // Phone number validation
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+\-\s()]/g, '');
        });
    }
    
    // Form submission
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfileData();
    });
}

function loadProfileForm() {
    const profile = getProfileData();
    if (!profile || Object.keys(profile).length === 0) return;
    
    Object.keys(profile).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = profile[key];
        }
    });
}

function saveProfileData() {
    const formData = new FormData(document.getElementById('profileForm'));
    const profile = {};
    
    for (let [key, value] of formData.entries()) {
        profile[key] = value;
    }
    
    // Validate required fields
    const requiredFields = ['farmerName', 'phoneNumber', 'location', 'soilType', 'fieldSize'];
    const missingFields = requiredFields.filter(field => !profile[field]);
    
    if (missingFields.length > 0) {
        showToast(`Please fill in: ${missingFields.join(', ')}`, 'error');
        return;
    }
    
    // Validate phone number
    if (!/^[+]?[\d\s\-()]{10,15}$/.test(profile.phoneNumber)) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }
    
    // Save to localStorage (in real app, send to server/ESP32)
    localStorage.setItem('agrosmartProfile', JSON.stringify(profile));
    profileData = profile;
    
    console.log('📱 Profile data saved:', profile);
    console.log('📡 Would send to ESP32/Cloud for AI recommendations');
    
    showToast('Profile saved successfully!', 'success');
    
    // Trigger crop recommendations update
    loadCropGrid();
    
    // Add to alerts
    addAlert({
        type: 'info',
        title: 'Profile Updated',
        message: 'Farmer profile has been updated. AI recommendations refreshed.',
        time: new Date().toLocaleTimeString()
    });
}

function loadProfileData() {
    try {
        const savedProfile = localStorage.getItem('agrosmartProfile');
        if (savedProfile) {
            profileData = JSON.parse(savedProfile);
        }
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

function getProfileData() {
    return profileData;
}

// Real-time Updates Simulation
function startRealTimeUpdates() {
    // Update sensor data every 30 seconds
    setInterval(() => {
        updateSensorValues();
    }, 30000);
    
    // Update alerts every 60 seconds
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance of new alert
            generateAlerts();
        }
    }, 60000);
    
    // Simulate device status changes occasionally
    setInterval(() => {
        if (Math.random() > 0.95) { // 5% chance
            toggleDeviceStatus();
        }
    }, 45000);
    
    console.log('🔄 Real-time updates started');
}

function updateSensorValues() {
    // Add slight variations to sensor data to simulate real readings
    dummySensorData.temperature.current += (Math.random() - 0.5) * 2;
    dummySensorData.humidity.current += (Math.random() - 0.5) * 5;
    dummySensorData.soil.current += (Math.random() - 0.5) * 3;
    
    // Keep values within realistic ranges
    dummySensorData.temperature.current = Math.max(15, Math.min(40, dummySensorData.temperature.current));
    dummySensorData.humidity.current = Math.max(30, Math.min(90, dummySensorData.humidity.current));
    dummySensorData.soil.current = Math.max(10, Math.min(80, dummySensorData.soil.current));
    
    // Update display if on home page
    if (document.getElementById('homePage').classList.contains('active')) {
        const activeTab = document.querySelector('.sensor-tab.active');
        if (activeTab) {
            const sensorType = activeTab.getAttribute('data-sensor');
            updateSensorDisplay(sensorType);
        }
    }
    
    console.log('📊 Sensor data updated');
}

function toggleDeviceStatus() {
    const statusLight = document.getElementById('statusLight');
    const statusText = document.getElementById('statusText');
    
    const isActive = statusLight.classList.contains('active');
    
    if (isActive) {
        statusLight.classList.remove('active');
        statusText.textContent = 'ESP32: Inactive';
        showToast('Device connection lost!', 'error');
        
        addAlert({
            type: 'red',
            title: 'Device Disconnected',
            message: 'ESP32 device is not responding. Check power and connection.',
            time: new Date().toLocaleTimeString()
        });
    } else {
        statusLight.classList.add('active');
        statusText.textContent = 'ESP32: Active';
        showToast('Device reconnected!', 'success');
        
        addAlert({
            type: 'green',
            title: 'Device Reconnected',
            message: 'ESP32 device is back online. All systems operational.',
            time: new Date().toLocaleTimeString()
        });
    }
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    
    // Update toast color based on type
    toast.style.borderLeftColor = {
        'success': '#4caf50',
        'error': '#f44336',
        'warning': '#ff9800',
        'info': '#2196f3'
    }[type] || '#4caf50';
    
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('show');
}

// ESP32 Integration Points - Replace these with real API calls
class ESP32Integration {
    static async getSensorData() {
        // Replace with actual ESP32 API endpoint
        // const response = await fetch('http://esp32-device-ip/api/sensors');
        // return await response.json();
        
        console.log('🔌 Would fetch real sensor data from ESP32');
        return dummySensorData;
    }
    
    static async sendIrrigationCommand(isOn, duration = 0) {
        // Replace with actual ESP32 API endpoint
        // const response = await fetch('http://esp32-device-ip/api/irrigation', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ action: isOn ? 'start' : 'stop', duration })
        // });
        
        console.log(`🔌 Would send irrigation command to ESP32: ${isOn ? 'START' : 'STOP'}${duration ? ` for ${duration} minutes` : ''}`);
        return { success: true };
    }
    
    static async updateProfile(profileData) {
        // Replace with actual cloud/ESP32 storage
        console.log('🔌 Would send profile data to cloud/ESP32 for AI processing:', profileData);
        return { success: true };
    }
}

// Export functions for potential external use
window.AgroSmart = {
    switchToPage,
    updateLanguage,
    showCropDetails,
    ESP32Integration,
    showToast
};

console.log('🌱 AgroSmart JavaScript loaded successfully!');