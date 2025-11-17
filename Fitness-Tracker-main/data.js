//static data
// Daily Wellness Data
const wellnessData = {
    steps: 7500,
    caloriesBurned: 1450,
    waterIntake: 1600
};

// Pre-loaded Activities
const initialActivities = [
    {
        id: 1,
        name: "Morning Run",
        duration: 30,
        calories: 300,
        timeOfDay: "morning"
    },
    {
        id: 2,
        name: "Cycling",
        duration: 45,
        calories: 450,
        timeOfDay: "afternoon"
    },
    {
        id: 3,
        name: "Yoga Session",
        duration: 60,
        calories: 200,
        timeOfDay: "evening"
    },
    {
        id: 4,
        name: "Swimming",
        duration: 40,
        calories: 350,
        timeOfDay: "morning"
    },
    {
        id: 5,
        name: "Weight Training",
        duration: 50,
        calories: 400,
        timeOfDay: "afternoon"
    },
    {
        id: 6,
        name: "Evening Walk",
        duration: 25,
        calories: 150,
        timeOfDay: "evening"
    }
];

// Pre-loaded Meals
const initialMeals = {
    breakfast: [
        { id: 1, name: "Oatmeal with Berries", calories: 350 },
        { id: 2, name: "Greek Yogurt", calories: 150 }
    ],
    lunch: [
        { id: 1, name: "Grilled Chicken Salad", calories: 450 },
        { id: 2, name: "Quinoa Bowl", calories: 380 }
    ],
    dinner: [
        { id: 1, name: "Salmon with Vegetables", calories: 520 },
        { id: 2, name: "Brown Rice", calories: 200 }
    ]
};

// Weekly Data for Insights
const weeklyData = {
    activities: [5, 7, 4, 6, 8, 5, 6], 
    calories: [1800, 2200, 1900, 2100, 2400, 2000, 1950] 
};

