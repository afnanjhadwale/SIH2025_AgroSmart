# AgroSmart - Smart Irrigation System

A complete web-based smart irrigation system for hackathons, featuring real-time sensor monitoring, AI-powered crop recommendations, and multi-language support.

## 🌟 Features

### 📊 Real-time Dashboard
- **ESP32 Device Status**: Live connection monitoring with visual indicators
- **Multi-sensor Data**: Temperature, humidity, weather, rainfall prediction, soil moisture
- **Water Level Management**: Tank and water sources (pond, jalkund) with color-coded alerts
- **Irrigation Control**: Manual ON/OFF with AI recommendations

### 🤖 AI Advisory System
- **Crop Recommendations**: Personalized suggestions based on soil type and conditions
- **Detailed Crop Information**: Water requirements, best seasons, cross-cropping options
- **Search & Filter**: Find crops by name or soil compatibility
- **Visual Indicators**: Star-marked recommended crops

### 🚨 Alert System
- **Real-time Monitoring**: Automatic threshold monitoring for all sensors
- **Color-coded Alerts**: Green (optimal), Yellow (warning), Red (critical)
- **Time Estimates**: "Water will last X days" predictions
- **Smart Notifications**: Toast notifications for important events

### 👤 Farmer Profile
- **Complete Profile Management**: Name, location, contact, soil type, field size
- **Crop Duration Tracking**: From planting to harvest dates
- **AI Integration Ready**: Profile data feeds into recommendation engine
- **Local Storage**: Persistent data across sessions

### 📈 Historical Data
- **Interactive Charts**: Moisture, temperature, humidity trends
- **Multiple Time Ranges**: 7 days, 4 weeks, 6 months
- **Chart.js Integration**: Responsive and interactive visualizations
- **Hover Tooltips**: Detailed data points on demand

### 🌐 Multi-language Support
- **Three Languages**: English, Hindi (हिंदी), Nepali (नेपाली)
- **Complete Translation**: All UI elements and messages
- **Instant Switching**: No page reload required
- **Cultural Adaptation**: Appropriate number formats and date displays

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in browser
- Internet connection for CDN resources (Chart.js, Font Awesome)

### Installation
1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **That's it!** The system will initialize automatically

### File Structure
```
agrosmart-website/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and responsive design
├── script.js           # All JavaScript functionality
└── README.md           # This documentation
```

## 🔧 ESP32 Integration Points

The system is designed for easy ESP32 integration. Key integration points are marked in the code:

### 1. Sensor Data Integration
```javascript
// In script.js - Replace dummy data with ESP32 endpoints
const ESP32Integration = {
    async getSensorData() {
        // Replace with: const response = await fetch('http://esp32-ip/api/sensors');
        // return await response.json();
        return dummySensorData; // Currently using dummy data
    }
}
```

### 2. Irrigation Control
```javascript
async sendIrrigationCommand(isOn, duration = 0) {
    // Replace with: 
    // const response = await fetch('http://esp32-ip/api/irrigation', {
    //     method: 'POST',
    //     body: JSON.stringify({ action: isOn ? 'start' : 'stop', duration })
    // });
    
    console.log(`Would send to ESP32: ${isOn ? 'START' : 'STOP'}`);
}
```

### 3. Profile Data Sync
```javascript
async updateProfile(profileData) {
    // Replace with cloud/ESP32 storage endpoint
    // Send profile data to ESP32/cloud for AI processing
    console.log('Would send profile to ESP32/Cloud:', profileData);
}
```

## 📱 Responsive Design

### Mobile-First Approach
- **Breakpoints**: 768px (tablet), 480px (mobile)
- **Touch-Friendly**: Large buttons and touch targets
- **Optimized Layout**: Stacked navigation and single-column layouts
- **Fast Loading**: Minimal external dependencies

### Cross-Device Compatibility
- **Desktop**: Full multi-column layout with all features
- **Tablet**: Adjusted layouts with preserved functionality
- **Mobile**: Optimized single-column design
- **Performance**: Smooth animations and interactions

## 🎨 UI/UX Design

### Color Scheme
- **Primary Green**: #4caf50 (agriculture/nature theme)
- **Secondary Blue**: #2196f3 (water/technology theme)
- **Warning Orange**: #ff9800 (alerts and warnings)
- **Critical Red**: #f44336 (urgent alerts)

### Design Principles
- **Clean & Modern**: Minimal clutter with focus on data
- **Intuitive Navigation**: Clear visual hierarchy
- **Accessibility**: High contrast ratios and readable fonts
- **Consistent**: Uniform spacing, typography, and interactions

## 🔍 Dummy Data Examples

### Sensor Data Structure
```javascript
{
    temperature: {
        current: 28.5,
        unit: '°C',
        trend: 'stable',
        readings: [/* recent readings */]
    },
    soil: {
        current: 32,
        unit: '%',
        status: 'Needs Water',
        depths: [/* multi-level readings */]
    }
}
```

### Crop Data Structure
```javascript
{
    id: 1,
    name: 'Cardamom',
    icon: '🌿',
    waterRequirement: { min: 150, max: 200, unit: 'cm/year' },
    bestSeason: 'June-September',
    suitableSoil: ['loam', 'clay'],
    recommended: true
}
```

## 🚀 Hackathon Ready Features

### 1. **Demo Mode**
- Real-time data simulation
- Automatic sensor value changes
- Simulated device disconnections
- Random alert generation

### 2. **Complete Functionality**
- All features working out-of-the-box
- No backend required for demo
- Persistent user data (localStorage)
- Professional appearance

### 3. **Easy Customization**
- Well-commented code
- Modular structure
- Easy color/theme changes
- Simple data format

### 4. **Presentation Ready**
- Smooth animations
- Professional design
- Multi-language demo
- Interactive elements

## 🔧 Customization Guide

### Adding New Crops
```javascript
// Add to cropsData array in script.js
{
    id: 7,
    name: 'New Crop',
    icon: '🌱',
    waterRequirement: { min: 100, max: 150, unit: 'cm/year' },
    bestSeason: 'Season',
    suitableSoil: ['soil1', 'soil2'],
    recommended: false
}
```

### Changing Colors
```css
/* Update CSS custom properties in styles.css */
:root {
    --primary-color: #4caf50;
    --secondary-color: #2196f3;
    --warning-color: #ff9800;
    --danger-color: #f44336;
}
```

### Adding New Languages
```javascript
// Add to translations object in script.js
const translations = {
    newLang: {
        'deviceStatus': 'Translation',
        'sensorData': 'Translation',
        // ... more translations
    }
}
```

## 🐛 Troubleshooting

### Chart Not Displaying
- Check browser console for Chart.js errors
- Ensure CDN connection is available
- Verify canvas element exists

### Language Switching Issues
- Check data-* attributes in HTML
- Verify translation keys exist
- Ensure currentLanguage variable is set

### Mobile Layout Issues
- Check CSS media queries
- Verify viewport meta tag
- Test on different screen sizes

## 📄 License

This project is created for educational and hackathon purposes. Feel free to use, modify, and distribute as needed.

## 🤝 Contributing

For hackathon improvements:
1. Fork the project
2. Make your enhancements
3. Test across devices
4. Share your improvements

## 📞 Support

For hackathon support and questions:
- Check browser console for errors
- Verify all files are in same directory
- Ensure internet connection for CDN resources
- Test in different browsers

---

**Built for Hackathons** 🏆 **Ready to Demo** 🚀 **Easy to Customize** ⚙️