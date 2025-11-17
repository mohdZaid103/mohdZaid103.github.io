const dashboardData = {
    // Daily Jogging Stats
    jogging: {
        hours: 6.2,
        calories: 475,
        distance: 21,
        monthProgress: 78,
        completedDays: 23,
        totalDays: 30
    },
    // Overview Stats
    overview: {
        steps: 9178,
        totalTime: '748 Hr',
        totalSteps: '9.178 St',
        target: '9.200 St'
    },
    // Activity Cards
    activities: {
        bicycle: {
            distance: 36,
            progress: 45,
            completed: 17,
            daysLeft: 2
        },
        jogging: {
            distance: 12,
            progress: 13,
            completed: 2,
            daysLeft: 17
        }
    },
    // Water Intake
    water: {
        current: 1500,
        goal: 3000
    },
    // Friends Data
    friends: [
        { name: 'Max Stone', activity: 'Weekly Bicycle', time: '10 min ago', avatar: '👤' },
        { name: 'Grisha Jack', activity: 'Slow Jogging', time: '22 min ago', avatar: '👤' },
        { name: 'Levi Patrick', activity: 'Morning Swim', time: '32 min ago', avatar: '👤' }
    ]
};

// Sample data
const appData = {
    activities: [
        { id: 1, name: 'Morning Run', duration: '45 min', time: '7:30 AM', period: 'morning', calories: 380 },
        { id: 2, name: 'Lunch Walk', duration: '30 min', time: '1:00 PM', period: 'afternoon', calories: 150 },
        { id: 3, name: 'Evening Gym', duration: '60 min', time: '6:00 PM', period: 'evening', calories: 420 }
    ],
    meals: {
        breakfast: [
            { id: 1, name: 'Oatmeal', calories: 250 },
            { id: 2, name: 'Banana', calories: 90 }
        ],
        lunch: [
            { id: 3, name: 'Chicken Salad', calories: 450 }
        ],
        dinner: [
            { id: 4, name: 'Salmon', calories: 380 },
            { id: 5, name: 'Rice', calories: 200 }
        ]
    }
};

let currentPage = 'wellness';
let activityIdCounter = 3;
let mealIdCounter = 5;

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeClock();
});

function initializeApp() {
    console.log(' FitTrack Pro Initialized');
    // Page navigation
    const navItems = document.querySelectorAll('.nav-item');
    console.log('Nav items found:', navItems.length);
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            switchPage(page);
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Start workout button interaction
    const startWorkoutBtn = document.querySelector('.start-workout-btn');
    if (startWorkoutBtn) {
        startWorkoutBtn.addEventListener('click', function() {
            this.innerHTML = '<span class="btn-icon">⏸</span><span>Workout Started!</span>';
            setTimeout(() => {
                this.innerHTML = '<span class="btn-icon">▶</span><span>Start Workout</span>';
            }, 2000);
        });
    }

    // Friend interaction
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Message sent!');
        });
    });

    // Load dashboard data
    loadDashboardData();

    // Initialize pages
    switchPage('wellness');
    setupWaterIntake();
    setupActivityPage();
    setupMealPage();
    setupInsightsPage();
}

function loadDashboardData() {
    // Load Daily Jogging Stats
    const joggingStats = document.querySelectorAll('.daily-jogging-card .stat-value');
    if (joggingStats.length >= 3) {
        joggingStats[0].textContent = dashboardData.jogging.hours;
        joggingStats[1].textContent = dashboardData.jogging.calories;
        joggingStats[2].textContent = dashboardData.jogging.distance;
    }

    // Load jogging progress
    const progressPercentage = document.querySelector('.daily-jogging-card .progress-percentage');
    const progressBarFill = document.querySelector('.daily-jogging-card .progress-bar-fill');
    const progressInfo = document.querySelector('.daily-jogging-card .progress-info');
    
    if (progressPercentage) progressPercentage.textContent = dashboardData.jogging.monthProgress + '%';
    if (progressBarFill) progressBarFill.style.width = dashboardData.jogging.monthProgress + '%';
    if (progressInfo) progressInfo.textContent = `You've completed ${dashboardData.jogging.completedDays} of ${dashboardData.jogging.totalDays} days`;

    // Load Overview Stats
    const stepValue = document.querySelector('.overview-card .step-value');
    const overviewStats = document.querySelectorAll('.overview-card .stat-value');
    
    if (stepValue) stepValue.textContent = dashboardData.overview.steps.toLocaleString();
    if (overviewStats.length >= 3) {
        overviewStats[0].textContent = dashboardData.overview.totalTime;
        overviewStats[1].textContent = dashboardData.overview.totalSteps;
        overviewStats[2].textContent = dashboardData.overview.target;
    }

    // Load Bicycle Activity
    const bicycleCard = document.querySelector('.activity-card.bicycle');
    if (bicycleCard) {
        const bicycleDetail = bicycleCard.querySelector('.activity-detail');
        const bicyclePercent = bicycleCard.querySelector('.percent');
        const bicycleProgressBar = bicycleCard.querySelector('.progress-fill');
        const bicycleInfo = bicycleCard.querySelectorAll('.progress-info span');
        
        if (bicycleDetail) bicycleDetail.textContent = `${dashboardData.activities.bicycle.distance} km / weeks`;
        if (bicyclePercent) bicyclePercent.textContent = `${dashboardData.activities.bicycle.progress}%`;
        if (bicycleProgressBar) bicycleProgressBar.style.width = `${dashboardData.activities.bicycle.progress}%`;
        if (bicycleInfo.length >= 2) {
            bicycleInfo[0].textContent = `${dashboardData.activities.bicycle.completed} / ${dashboardData.activities.bicycle.distance}km`;
            bicycleInfo[1].textContent = `${dashboardData.activities.bicycle.daysLeft} days left`;
        }
    }

    // Load Jogging Activity
    const joggingCard = document.querySelector('.activity-card.jogging');
    if (joggingCard) {
        const joggingDetail = joggingCard.querySelector('.activity-detail');
        const joggingPercent = joggingCard.querySelector('.percent');
        const joggingProgressBar = joggingCard.querySelector('.progress-fill');
        const joggingInfo = joggingCard.querySelectorAll('.progress-info span');
        
        if (joggingDetail) joggingDetail.textContent = `${dashboardData.activities.jogging.distance} km / month`;
        if (joggingPercent) joggingPercent.textContent = `${dashboardData.activities.jogging.progress}%`;
        if (joggingProgressBar) joggingProgressBar.style.width = `${dashboardData.activities.jogging.progress}%`;
        if (joggingInfo.length >= 2) {
            joggingInfo[0].textContent = `${dashboardData.activities.jogging.completed} / ${dashboardData.activities.jogging.distance}km`;
            joggingInfo[1].textContent = `${dashboardData.activities.jogging.daysLeft} days left`;
        }
    }

    const waterGoalEl = document.querySelector('.water-goal');
    if (waterGoalEl) waterGoalEl.textContent = `Goal: ${dashboardData.water.goal}ml`;

    // Load Friends List
    loadFriendsList();

    console.log('✅ Dashboard data loaded from JS object');
}

function loadFriendsList() {
    const friendsList = document.querySelector('.friends-list');
    if (!friendsList) return;

    friendsList.innerHTML = '';
    
    dashboardData.friends.forEach(friend => {
        const friendItem = document.createElement('div');
        friendItem.className = 'friend-item';
        friendItem.innerHTML = `
            <div class="friend-avatar">${friend.avatar}</div>
            <div class="friend-info">
                <div class="friend-name">${friend.name}</div>
                <div class="friend-activity">${friend.activity}</div>
                <div class="friend-time">${friend.time}</div>
            </div>
            <button class="action-btn">💬</button>
        `;
        friendsList.appendChild(friendItem);
    });
}

function switchPage(pageName) {
    console.log('📄 Switching to page:', pageName);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    console.log('Total pages found:', pages.length);
    pages.forEach(page => {
        console.log('Hiding page:', page.id);
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageName + '-page');
    console.log('Selected page element:', selectedPage);
    if (selectedPage) {
        console.log('Adding active class to:', selectedPage.id);
        selectedPage.classList.add('active');
    } else {
        console.log('Page not found:', pageName + '-page');
    }

    // Update nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    const activeNav = document.querySelector(`[data-page="${pageName}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    // Update page title
    const titles = {
        'wellness': 'Daily Wellness',
        'activity': 'Activity Log',
        'meals': 'Meal Planner',
        'insights': 'Insights & Summary'
    };
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = titles[pageName] || 'Dashboard';
    }

    currentPage = pageName;
}

function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        document.getElementById('themeToggle').textContent = '🌙 Dark Mode';
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        document.getElementById('themeToggle').textContent = '☀️ Light Mode';
    }
}

// Activity Page Setup
function setupActivityPage() {
    const activityLog = document.getElementById('activityLog');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const addActivityBtn = document.getElementById('addActivityBtn');
    const activityModal = document.getElementById('activityModal');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const activityForm = document.getElementById('activityForm');

    console.log('Setup Activity Page:', {
        activityLog: !!activityLog,
        addActivityBtn: !!addActivityBtn,
        activityModal: !!activityModal,
        activityForm: !!activityForm
    });

    // Update calories stats
    function updateCaloriesStats() {
        const totalCalories = appData.activities.reduce((sum, activity) => sum + activity.calories, 0);
        const activityCount = appData.activities.length;
        const goal = 2000;
        const remaining = Math.max(0, goal - totalCalories);
        const percentage = Math.min(100, (totalCalories / goal) * 100);

        // Update values
        const totalCaloriesEl = document.getElementById('totalCalories');
        const calorieGoalEl = document.getElementById('calorieGoal');
        const calorieRemainingEl = document.getElementById('calorieRemaining');
        const activityCountEl = document.getElementById('activityCount');
        const progressCircle = document.getElementById('caloriesProgress');

        if (totalCaloriesEl) totalCaloriesEl.textContent = totalCalories;
        if (calorieGoalEl) calorieGoalEl.textContent = goal;
        if (calorieRemainingEl) calorieRemainingEl.textContent = remaining;
        if (activityCountEl) activityCountEl.textContent = activityCount;

        // Animate circular progress
        if (progressCircle) {
            const radius = 85;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percentage / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
    }

    // Render activities
    function renderActivities(filter = 'all') {
        if (!activityLog) return;
        
        activityLog.innerHTML = '';
        const filtered = filter === 'all' 
            ? appData.activities 
            : appData.activities.filter(a => a.period === filter);

        if (filtered.length === 0) {
            activityLog.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📊</div>
                    <div class="empty-state-text">No activities logged yet</div>
                    <div class="empty-state-subtext">Start tracking your fitness journey by adding your first activity!</div>
                </div>
            `;
            return;
        }

        filtered.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            
            let icon = '🏃';
            if (activity.name.toLowerCase().includes('cycle') || activity.name.toLowerCase().includes('bike')) icon = '🚴';
            else if (activity.name.toLowerCase().includes('swim')) icon = '🏊';
            else if (activity.name.toLowerCase().includes('yoga')) icon = '🧘';
            else if (activity.name.toLowerCase().includes('gym') || activity.name.toLowerCase().includes('weight')) icon = '💪';
            else if (activity.name.toLowerCase().includes('walk')) icon = '🚶';
            else if (activity.name.toLowerCase().includes('hike')) icon = '🥾';
            else if (activity.name.toLowerCase().includes('dance')) icon = '💃';
            
            item.innerHTML = `
                <div class="activity-icon">${icon}</div>
                <div class="activity-details">
                    <h4 class="activity-name">${activity.name}</h4>
                    <div class="activity-meta">
                        <div class="activity-meta-item">
                            ⏱️ <span>${activity.duration}</span>
                        </div>
                        <div class="activity-meta-item">
                            🔥 <span>${activity.calories} cal</span>
                        </div>
                        <div class="activity-time">
                            🕐 ${activity.time} - ${activity.period}
                        </div>
                    </div>
                </div>
                <div class="activity-actions">
                    <button class="activity-action-btn delete" data-id="${activity.id}" title="Remove activity">
                        🗑️
                    </button>
                </div>
            `;
            activityLog.appendChild(item);
        });

        // Add remove functionality
        document.querySelectorAll('.activity-action-btn.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                if (confirm('Are you sure you want to remove this activity?')) {
                    appData.activities = appData.activities.filter(a => a.id !== id);
                    localStorage.setItem('activities', JSON.stringify(appData.activities));
                    renderActivities(filter);
                    updateCaloriesStats();
                }
            });
        });

        updateCaloriesStats();
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderActivities(this.getAttribute('data-filter'));
        });
    });

    if (addActivityBtn && activityModal) {
        console.log('Adding click listener to Add Activity button');
        addActivityBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add Activity button clicked');
            activityModal.classList.add('show');
        });
    } else {
        console.error('Add Activity button or modal not found:', { addActivityBtn: !!addActivityBtn, activityModal: !!activityModal });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            activityModal.classList.remove('show');
        });
    }

    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', function() {
            successModal.classList.remove('show');
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === activityModal) {
            activityModal.classList.remove('show');
        }
        if (e.target === successModal) {
            successModal.classList.remove('show');
        }
    });

    if (activityForm) {
        activityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('activityName').value;
            const duration = document.getElementById('activityDuration').value;
            const calories = document.getElementById('activityCalories').value;
            const timeOfDay = document.getElementById('activityTime').value;
            
            // Validation
            if (!name || !duration || !calories || !timeOfDay) {
                alert('Please fill in all fields');
                return;
            }
            
            if (duration < 1 || calories < 1) {
                alert('Duration and calories must be positive numbers');
                return;
            }
            
            // Add activity
            activityIdCounter++;
            const now = new Date();
            appData.activities.push({
                id: activityIdCounter,
                name: name,
                duration: duration + ' min',
                time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                period: timeOfDay,
                calories: parseInt(calories)
            });
            
            activityModal.classList.remove('show');
            successModal.classList.add('show');
            
            activityForm.reset();
            
            renderActivities('all');
            updateCaloriesStats();
            filterBtns[0].classList.add('active');
            
            updateWeeklyDataFromSession();
            
            setTimeout(() => {
                successModal.classList.remove('show');
            }, 2000);
        });
    }

    if (activityLog) {
        activityLog.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-remove')) {
                const id = parseInt(e.target.getAttribute('data-id'));
                appData.activities = appData.activities.filter(a => a.id !== id);
                const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                renderActivities(activeFilter);
                updateCaloriesStats();
                
                // Update weekly summary data
                updateWeeklyDataFromSession();
            }
        });
    }

    renderActivities('all');
}

// Meal Page Setup
function setupMealPage() {
    const savedMeals = localStorage.getItem('meals');
    if (savedMeals) {
        appData.meals = JSON.parse(savedMeals);
    }

    function saveMeals() {
        localStorage.setItem('meals', JSON.stringify(appData.meals));
    }

    function getMealIcon(name) {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('egg') || lowerName.includes('omelette')) return '🍳';
        if (lowerName.includes('salad')) return '🥗';
        if (lowerName.includes('chicken')) return '🍗';
        if (lowerName.includes('fish') || lowerName.includes('salmon')) return '🐟';
        if (lowerName.includes('rice')) return '🍚';
        if (lowerName.includes('pasta')) return '🍝';
        if (lowerName.includes('burger')) return '🍔';
        if (lowerName.includes('pizza')) return '🍕';
        if (lowerName.includes('soup')) return '🍲';
        if (lowerName.includes('fruit') || lowerName.includes('banana') || lowerName.includes('apple')) return '🍎';
        if (lowerName.includes('bread') || lowerName.includes('toast')) return '🍞';
        if (lowerName.includes('cereal') || lowerName.includes('oatmeal')) return '🥣';
        if (lowerName.includes('steak') || lowerName.includes('beef')) return '🥩';
        if (lowerName.includes('vegetable') || lowerName.includes('broccoli')) return '🥦';
        if (lowerName.includes('sandwich')) return '🥪';
        return '🍽️';
    }

    function renderMeals() {
        ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
            const mealsList = document.getElementById(mealType + 'List');
            if (!mealsList) return;
            
            mealsList.innerHTML = '';
            
            if (appData.meals[mealType].length === 0) {
                mealsList.innerHTML = '<p style="color: rgba(255,255,255,0.4); text-align: center; padding: 1rem; font-size: 0.9rem;">No items added yet</p>';
            } else {
                appData.meals[mealType].forEach(meal => {
                    const item = document.createElement('div');
                    item.className = 'meal-item';
                    const icon = getMealIcon(meal.name);
                    item.innerHTML = `
                        <div class="meal-item-info">
                            <span class="meal-item-icon">${icon}</span>
                            <div class="meal-item-details">
                                <div class="meal-item-name">${meal.name}</div>
                                <div class="meal-item-cal">${meal.calories} calories</div>
                            </div>
                        </div>
                        <div class="meal-item-actions">
                            <button class="meal-action-btn" data-meal="${mealType}" data-id="${meal.id}">🗑️</button>
                        </div>
                    `;
                    mealsList.appendChild(item);
                });
            }
        });

        updateNutritionStats();
    }

    function updateNutritionStats() {
        // Calculate totals for each meal
        const breakfastTotal = appData.meals.breakfast.reduce((sum, meal) => sum + meal.calories, 0);
        const lunchTotal = appData.meals.lunch.reduce((sum, meal) => sum + meal.calories, 0);
        const dinnerTotal = appData.meals.dinner.reduce((sum, meal) => sum + meal.calories, 0);
        const total = breakfastTotal + lunchTotal + dinnerTotal;

        // Update individual meal calories
        const breakfastCalEl = document.getElementById('breakfastCalories');
        const lunchCalEl = document.getElementById('lunchCalories');
        const dinnerCalEl = document.getElementById('dinnerCalories');
        
        if (breakfastCalEl) breakfastCalEl.textContent = `${breakfastTotal} cal`;
        if (lunchCalEl) lunchCalEl.textContent = `${lunchTotal} cal`;
        if (dinnerCalEl) dinnerCalEl.textContent = `${dinnerTotal} cal`;

        // Update total calories
        const totalCalEl = document.getElementById('totalMealCalories');
        if (totalCalEl) totalCalEl.textContent = total;

        // Calculate percentages
        const breakfastPercent = total > 0 ? Math.round((breakfastTotal / total) * 100) : 0;
        const lunchPercent = total > 0 ? Math.round((lunchTotal / total) * 100) : 0;
        const dinnerPercent = total > 0 ? Math.round((dinnerTotal / total) * 100) : 0;

        // Update percentage displays
        const breakfastPercentEl = document.getElementById('breakfastPercent');
        const lunchPercentEl = document.getElementById('lunchPercent');
        const dinnerPercentEl = document.getElementById('dinnerPercent');
        
        if (breakfastPercentEl) breakfastPercentEl.textContent = `${breakfastPercent}%`;
        if (lunchPercentEl) lunchPercentEl.textContent = `${lunchPercent}%`;
        if (dinnerPercentEl) dinnerPercentEl.textContent = `${dinnerPercent}%`;

        // Update progress bars
        const breakfastBar = document.getElementById('breakfastBar');
        const lunchBar = document.getElementById('lunchBar');
        const dinnerBar = document.getElementById('dinnerBar');
        
        if (breakfastBar) breakfastBar.style.width = `${breakfastPercent}%`;
        if (lunchBar) lunchBar.style.width = `${lunchPercent}%`;
        if (dinnerBar) dinnerBar.style.width = `${dinnerPercent}%`;
    }

    // Add meal buttons
    const addMealBtns = document.querySelectorAll('.add-meal-btn');
    addMealBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mealType = this.getAttribute('data-meal');
            const name = prompt('Enter meal name:');
            if (!name) return;
            
            const calories = prompt('Enter calories:');
            if (!calories || isNaN(calories)) {
                alert('Please enter a valid number for calories');
                return;
            }
            
            mealIdCounter++;
            appData.meals[mealType].push({
                id: mealIdCounter,
                name: name,
                calories: parseInt(calories)
            });
            saveMeals();
            renderMeals();
            
            // Update weekly summary data
            updateWeeklyDataFromSession();
        });
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('meal-action-btn')) {
            const mealType = e.target.getAttribute('data-meal');
            const id = parseInt(e.target.getAttribute('data-id'));
            if (confirm('Remove this meal item?')) {
                appData.meals[mealType] = appData.meals[mealType].filter(m => m.id !== id);
                saveMeals();
                renderMeals();
                
                updateWeeklyDataFromSession();
            }
        }
    });

    renderMeals();
}

function getWeeklyData() {
    const stored = localStorage.getItem('weeklyData');
    if (stored) {
        return JSON.parse(stored);
    }
    return {
        activities: [3, 4, 2, 5, 3, 6, 2],
        calories: [380, 520, 280, 650, 450, 720, 340]
    };
}

function saveWeeklyData(data) {
    localStorage.setItem('weeklyData', JSON.stringify(data));
}

function updateWeeklyDataFromSession() {
    const weeklyData = getWeeklyData();
    const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
    const dayIndex = today === 0 ? 6 : today - 1; // Convert to Mon=0, Sun=6
    
    weeklyData.activities[dayIndex] = appData.activities.length;
    
    const activityCalories = appData.activities.reduce((sum, a) => sum + a.calories, 0);
    const mealCalories = 
        appData.meals.breakfast.reduce((sum, m) => sum + m.calories, 0) +
        appData.meals.lunch.reduce((sum, m) => sum + m.calories, 0) +
        appData.meals.dinner.reduce((sum, m) => sum + m.calories, 0);
    
    weeklyData.calories[dayIndex] = activityCalories;
    
    // Save updated data
    saveWeeklyData(weeklyData);
    
    if (currentPage === 'insights') {
        const insightsCharts = document.getElementById('activitiesChart');
        if (insightsCharts) {
            refreshInsightsCharts();
        }
    }
}

let refreshInsightsCharts = null;

// Insights Page Setup
function setupInsightsPage() {

    function renderCharts() {
        renderActivityChart();
        renderCalorieChart();
        updateSummaryStats();
    }
    
    refreshInsightsCharts = renderCharts;

    function renderActivityChart() {
        const chart = document.getElementById('activitiesChart');
        if (!chart) return;
        
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const weeklyData = getWeeklyData();
        const data = weeklyData.activities;
        const maxValue = Math.max(...data, 10); // Minimum 10

        chart.innerHTML = '';
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * 100;
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.innerHTML = `
                <div class="bar-wrapper">
                    <div class="bar-value">${value > 0 ? value : ''}</div>
                    <div class="bar-fill" style="--bar-height: ${barHeight}%"></div>
                    <div class="bar-label">${days[index]}</div>
                </div>
            `;
            chart.appendChild(bar);
        });
    }

    function renderCalorieChart() {
        const chart = document.getElementById('caloriesChart');
        if (!chart) return;
        
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const weeklyData = getWeeklyData();
        const data = weeklyData.calories;
        const maxValue = Math.max(...data, 500); // Minimum 500

        chart.innerHTML = '';
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * 100;
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.innerHTML = `
                <div class="bar-wrapper">
                    <div class="bar-value">${value > 0 ? value : ''}</div>
                    <div class="bar-fill" style="--bar-height: ${barHeight}%"></div>
                    <div class="bar-label">${days[index]}</div>
                </div>
            `;
            chart.appendChild(bar);
        });
    }

    function updateSummaryStats() {
        const weeklyData = getWeeklyData();
        
        // Calculate totals
        const totalActivities = weeklyData.activities.reduce((sum, val) => sum + val, 0);
        const totalCalories = weeklyData.calories.reduce((sum, val) => sum + val, 0);
        const activeDays = weeklyData.activities.filter(val => val > 0).length;
        
        const totalDuration = totalActivities * 45;

        // Update DOM
        const totalActivitiesEl = document.getElementById('totalActivities');
        const totalCaloriesBurnedEl = document.getElementById('totalCaloriesBurned');
        const totalDurationEl = document.getElementById('totalDuration');
        const activeDaysEl = document.getElementById('activeDays');

        if (totalActivitiesEl) totalActivitiesEl.textContent = totalActivities;
        if (totalCaloriesBurnedEl) totalCaloriesBurnedEl.textContent = totalCalories.toLocaleString();
        if (totalDurationEl) totalDurationEl.textContent = totalDuration;
        if (activeDaysEl) activeDaysEl.textContent = activeDays;
    }

    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const weeklyData = getWeeklyData();
            const totalActivities = weeklyData.activities.reduce((sum, val) => sum + val, 0);
            const totalCalories = weeklyData.calories.reduce((sum, val) => sum + val, 0);
            const activeDays = weeklyData.activities.filter(val => val > 0).length;
            const totalDuration = totalActivities * 45;

            // Create summary text
            const summary = `
╔════════════════════════════════════╗
║    FITTRACK PRO WEEKLY SUMMARY    ║
╚════════════════════════════════════╝

📊 WEEKLY STATISTICS
────────────────────────────────────
🏃 Total Activities: ${totalActivities}
🔥 Calories Burned: ${totalCalories.toLocaleString()} cal
⏱️  Active Minutes: ${totalDuration} min
📅 Active Days: ${activeDays}/7 days

📈 DAILY BREAKDOWN
────────────────────────────────────
Mon: ${weeklyData.activities[0]} activities, ${weeklyData.calories[0]} cal
Tue: ${weeklyData.activities[1]} activities, ${weeklyData.calories[1]} cal
Wed: ${weeklyData.activities[2]} activities, ${weeklyData.calories[2]} cal
Thu: ${weeklyData.activities[3]} activities, ${weeklyData.calories[3]} cal
Fri: ${weeklyData.activities[4]} activities, ${weeklyData.calories[4]} cal
Sat: ${weeklyData.activities[5]} activities, ${weeklyData.calories[5]} cal
Sun: ${weeklyData.activities[6]} activities, ${weeklyData.calories[6]} cal

📋 CURRENT ACTIVITIES
────────────────────────────────────
${appData.activities.map(a => `• ${a.name}: ${a.duration}, ${a.calories} cal`).join('\n')}

🍽️  MEAL PLAN
────────────────────────────────────
Breakfast: ${appData.meals.breakfast.reduce((sum, m) => sum + m.calories, 0)} cal
Lunch: ${appData.meals.lunch.reduce((sum, m) => sum + m.calories, 0)} cal
Dinner: ${appData.meals.dinner.reduce((sum, m) => sum + m.calories, 0)} cal

Generated: ${new Date().toLocaleString()}
            `;

            // Simulate download
            const blob = new Blob([summary], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `FitTrack_Summary_${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            // Show success message
            alert('✅ Summary downloaded successfully!\nCheck your downloads folder.');
        });
    }

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (confirm('⚠️ Are you sure you want to reset the dashboard?\n\nThis will:\n• Clear all activities\n• Clear all meals\n• Clear weekly data\n• Reset all statistics\n\nThis action cannot be undone!')) {
                // Clear all data
                appData.activities = [
                    { id: 1, name: 'Morning Run', duration: '45 min', time: '7:30 AM', period: 'morning', calories: 380 },
                    { id: 2, name: 'Lunch Walk', duration: '30 min', time: '1:00 PM', period: 'afternoon', calories: 150 },
                    { id: 3, name: 'Evening Gym', duration: '60 min', time: '6:00 PM', period: 'evening', calories: 420 }
                ];
                appData.meals = {
                    breakfast: [
                        { id: 1, name: 'Oatmeal', calories: 250 },
                        { id: 2, name: 'Banana', calories: 90 }
                    ],
                    lunch: [
                        { id: 3, name: 'Chicken Salad', calories: 450 }
                    ],
                    dinner: [
                        { id: 4, name: 'Salmon', calories: 380 },
                        { id: 5, name: 'Rice', calories: 200 }
                    ]
                };

                // Reset weekly data
                const defaultWeeklyData = {
                    activities: [3, 4, 2, 5, 3, 6, 2],
                    calories: [380, 520, 280, 650, 450, 720, 340]
                };
                
                console.log('🧹 Clearing all localStorage items...');
                localStorage.clear();
                console.log('🧹 Clearing all sessionStorage items...');
                sessionStorage.clear();

                console.log('💾 Restoring default data...');
                localStorage.setItem('activities', JSON.stringify(appData.activities));
                localStorage.setItem('meals', JSON.stringify(appData.meals));
                localStorage.setItem('weeklyData', JSON.stringify(defaultWeeklyData));
                localStorage.setItem('waterIntake', dashboardData.water.current.toString());
                
                console.log('✅ All storage cleared and defaults restored!');

                location.reload();
            }
        });
    }

    renderCharts();
}

// Water Intake Tracker
function setupWaterIntake() {
    let waterAmount = localStorage.getItem('waterIntake') ? parseInt(localStorage.getItem('waterIntake')) : dashboardData.water.current;
    const waterGoal = dashboardData.water.goal;
    
    const waterAmountEl = document.getElementById('waterAmount');
    const waterFill = document.getElementById('waterFill');
    const incrementBtn = document.getElementById('waterIncrement');
    const decrementBtn = document.getElementById('waterDecrement');
    
    function updateWaterDisplay() {
        if (waterAmountEl) waterAmountEl.textContent = waterAmount;
        
        const percentage = Math.min((waterAmount / waterGoal) * 100, 100);
        
        if (waterFill) {
            waterFill.style.height = percentage + '%';
        }
        
        localStorage.setItem('waterIntake', waterAmount);
    }
    
    if (incrementBtn) {
        incrementBtn.addEventListener('click', function() {
            if (waterAmount < waterGoal) {
                waterAmount += 250;
                updateWaterDisplay();
                
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-2px)';
                }, 150);
            }
        });
    }
    
    if (decrementBtn) {
        decrementBtn.addEventListener('click', function() {
            if (waterAmount > 0) {
                waterAmount = Math.max(0, waterAmount - 250);
                updateWaterDisplay();
                
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-2px)';
                }, 150);
            }
        });
    }
    
    updateWaterDisplay();
}

function initializeClock() {
    function updateClock() {
        const now = new Date();
        
        // Format time
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12;
        const hoursStr = String(hours).padStart(2, '0');
        
        // Format date
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayName = days[now.getDay()];
        const monthName = months[now.getMonth()];
        const date = now.getDate();
        
        // Update DOM
        const clockTime = document.querySelector('.clock-time');
        const clockDate = document.querySelector('.clock-date');
        
        if (clockTime) {
            clockTime.textContent = `${hoursStr}:${minutes}:${seconds}`;
        }
        
        if (clockDate) {
            clockDate.textContent = `${dayName}, ${monthName} ${date} • ${ampm}`;
        }
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

window.switchPage = switchPage;
