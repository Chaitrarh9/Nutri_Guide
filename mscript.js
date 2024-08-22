// script.js
document.getElementById("userProfile").addEventListener("submit", function(event) {
    event.preventDefault();

    const caloriesGoal = parseInt(document.getElementById("calories").value);
    const dietaryPreference = document.getElementById("dietaryPreference").value;

    const mealPlan = generateMealPlan(caloriesGoal, dietaryPreference);

    displayMealPlan(mealPlan);
});

function generateMealPlan(caloriesGoal, dietaryPreference) {
    const mealPlan = {
        "Breakfast": {},
        "Lunch": {},
        "Dinner": {},
        "Snack": {}
    };

    // Define meal options based on dietary preferences
    const mealOptions = {
        "balanced": {
            "Breakfast": { name: "Oatmeal with fruits and nuts", calories: 300 },
            "Lunch": { name: "Grilled chicken salad", calories: 400 },
            "Dinner": { name: "Salmon with quinoa and roasted vegetables", calories: 500 },
            "Snack": { name: "Greek yogurt with berries", calories: 150 }
        },
        "vegetarian": {
            "Breakfast": { name: "Avocado toast with poached eggs", calories: 350 },
            "Lunch": { name: "Quinoa and black bean salad", calories: 450 },
            "Dinner": { name: "Vegetable stir-fry with tofu", calories: 400 },
            "Snack": { name: "Hummus with carrot sticks", calories: 200 }
        },
        "vegan": {
            "Breakfast": { name: "Smoothie bowl with mixed fruits and seeds", calories: 300 },
            "Lunch": { name: "Chickpea and vegetable curry", calories: 450 },
            "Dinner": { name: "Stuffed bell peppers with rice and lentils", calories: 400 },
            "Snack": { name: "Almond butter on whole grain toast", calories: 200 }
        },
        "keto": {
            "Breakfast": { name: "Scrambled eggs with avocado and bacon", calories: 400 },
            "Lunch": { name: "Caesar salad with grilled chicken and avocado", calories: 450 },
            "Dinner": { name: "Steak with cauliflower mash and asparagus", calories: 500 },
            "Snack": { name: "Cheese and pepperoni slices", calories: 300 }
        }
    };

    // Set meal options based on dietary preference
    const selectedMealOptions = mealOptions[dietaryPreference];

    // Check if the selected dietary preference exists
    if (selectedMealOptions) {
        // Calculate calories for each meal
        for (const meal in mealPlan) {
            mealPlan[meal] = selectedMealOptions[meal];
            mealPlan[meal].calories = Math.floor(selectedMealOptions[meal].calories * caloriesGoal / 2000);
        }
    } else {
        console.error("Invalid dietary preference");
    }

    return mealPlan;
}



function displayMealPlan(mealPlan) {
    // Convert the meal plan object to a query string
    const queryString = Object.entries(mealPlan)
        .map(([meal, mealItem]) => `${meal}=${mealItem.name}&calories=${mealItem.calories}`)
        .join('&');

    // Redirect to the meal plan result page with the query string
    window.location.href = `mealplanresult.html?${queryString}`;
}

