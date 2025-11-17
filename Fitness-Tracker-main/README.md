# FitTrack Pro 🏃‍♂️

> A modern, dark-themed fitness tracking dashboard built with pure vanilla JavaScript - no frameworks, no dependencies, just clean code.

## ✨ Features

### 📊 Page 1: Daily Wellness Overview
- **Live Clock** with elegant typography that updates every second
- **Step Counter** with visual progress tracking (9,178 steps)
- **Activity Cards** for Bicycle and Jogging with completion percentages
- **Daily Jogging Stats**: 6.2 hours, 475 calories, 21km distance
- **Water Intake Tracker** with animated glass visualization (increment/decrement by 250ml)
- **Friends Section** with horizontal scroll and quick message buttons
- All dashboard values loaded dynamically from JavaScript objects

### 🏃 Page 2: Activity Log
- **Time-based Filters**: All, Morning, Afternoon, Evening
- **Activity List** with custom icons and calorie tracking
- **Add Activity Modal** with form validation
  - Activity name (required)
  - Duration in minutes
  - Calories burned
  - Time of day selection
- **Total Calories Card** with circular SVG progress indicator
- **Real-time Updates** to weekly summary charts
- Activities persist across sessions via localStorage

### 🍽️ Page 3: Meal Planner
- **Three Meal Categories**: Breakfast, Lunch, Dinner
- **Pre-loaded Meals**:
  - Breakfast: Oatmeal (250 cal), Banana (90 cal)
  - Lunch: Chicken Salad (450 cal)
  - Dinner: Salmon (380 cal), Rice (200 cal)
- **Add/Remove Meals** with dynamic icons
- **Daily Nutrition Summary** with progress bars
- **Automatic Calorie Calculation** across all meals
- Meals persist in localStorage

### 📈 Page 4: Insights & Summary
- **Custom CSS Bar Charts** (no chart libraries - built with pure divs!)
  - Weekly Activities Chart
  - Weekly Calories Chart
- **Summary Statistics**: Total activities, calories burned, meals logged
- **Download Summary** button (exports text summary)
- **Reset Dashboard** button (clears all localStorage/sessionStorage)
- **Real-time Chart Updates** when activities or meals change

## 🎨 Design Highlights

- **Dark Theme**: Pure black (#000000) background with elegant contrast
- **Purple-Blue Gradient Accents**: #667eea to #764ba2
- **Glassmorphism Effects**: Backdrop blur on modals and overlays
- **Smooth Animations**: CSS transitions and keyframe animations
- **Custom Progress Indicators**: Circular SVG, linear bars, animated waves
- **Responsive Layout**: 2-column grid system with breakpoints
- **SF Pro Display Font**: For the live clock display

## 🛠️ Technical Stack

**100% Vanilla - Zero Dependencies**

- **HTML5**: Semantic markup, 669 lines
- **CSS3**: Custom animations, 2634 lines
  - Flexbox & Grid layouts
  - CSS variables for dynamic values
  - Custom @keyframes animations
  - Backdrop filters for glassmorphism
- **JavaScript ES6+**: Pure DOM manipulation, 1046 lines
  - `querySelector` and `createElement` for dynamic content
  - `localStorage` for data persistence
  - Arrow functions and template literals
  - Event delegation and custom modals

**Technical Constraints Satisfied:**
✅ Only HTML, CSS, JS (ES6+)  
✅ No external frameworks or libraries  
✅ No backend or database  
✅ Dynamic updates through JS DOM manipulation  
✅ All popups are custom-built overlays  
✅ Fully functional on static hosting platforms  

## 📁 Project Structure

```
fittrack-pro/
├── index.html          # Main HTML structure (669 lines)
├── styles.css          # All styling & animations (2634 lines)
├── app.js              # JavaScript functionality (1046 lines)
├── data.js             # Dashboard data objects (optional)
└── README.md           # This file
```

## 💾 Data Persistence

- **localStorage**: Stores activities, meals, water intake, and weekly data
- **sessionStorage**: Used for temporary session data (cleared on reset)
- **Reset Function**: Clears all storage and reloads default values

## 🌐 Browser Compatibility

Works perfectly in all modern browsers:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

**Requirements:**
- ES6+ JavaScript support
- CSS Grid and Flexbox
- localStorage API
- CSS backdrop-filter (for glassmorphism)

## 🎯 Key Features Implementation

### Custom Charts (No Libraries!)
Charts are built using pure HTML divs with CSS styling:
```javascript
const bar = document.createElement('div');
bar.style.setProperty('--bar-height', `${percentage}%`);
```

### Custom Modals
No Bootstrap or libraries - pure CSS overlays:
```css
.modal {
    backdrop-filter: blur(5px);
    animation: fadeIn 0.3s ease;
}
```

### Real-time Synchronization
Activities and meals automatically update weekly charts:
```javascript
updateWeeklyDataFromSession(); // Syncs changes instantly
```

