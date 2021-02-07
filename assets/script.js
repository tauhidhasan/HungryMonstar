
const mealContainer = document.getElementById('meals');
const searchBtn = document.getElementById('searchBtn');
const danger = document.getElementById('danger');

// Add EventListener With Validation
searchBtn.addEventListener('click', function () {
    const searchKey = document.getElementById('searchKey').value;
    mealContainer.innerHTML = '';
    if (searchKey === '') {
        danger.style.display = 'block';
    }else {
        getMeal(searchKey);
        danger.style.display = 'none';
    }
});


const mealDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            mealInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
};
// Meal Details Modal
const mealInfo = meal => {
    const mealDetails = document.getElementById('mealsDetails');

    mealDetails.innerHTML = `
    <img class="img-fluid meal-img mb-4" src="${meal.strMealThumb}" alt="">
    <h4>${meal.strMeal}</h4>
    
    <h5 class="pt-3 pb-2">Ingredients</h5>
    <ul>
        <li>${meal.strMeasure1}, ${meal.strIngredient1}</li>
        <li>${meal.strMeasure2}, ${meal.strIngredient2}</li>
        <li>${meal.strMeasure3}, ${meal.strIngredient3}</li>
        <li>${meal.strMeasure4}, ${meal.strIngredient4}</li>
        <li>${meal.strMeasure5}, ${meal.strIngredient5}</li>
        <li>${meal.strMeasure6}, ${meal.strIngredient6}</li>


    </ul>

`;
};

function getMeal(mealId) {
    // MainAPI
    const mealdbAPI = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(mealdbAPI)
        .then(res => res.json())
        .then(data => {
            displayMeals(data.meals);
        });
    const displayMeals = meals => {
        const mealsDiv = document.getElementById('meals');
        if (meals != null) {
            meals.map(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.className = 'col-md-3';
                const mealInfo = `
                        <div onclick="mealDetails('${meal.idMeal}')" class="border meal-title text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid meal-img" src="${meal.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${meal.strMeal}</h4>
                        </div>
                    `;
                mealDiv.innerHTML = mealInfo;
                mealsDiv.appendChild(mealDiv);
            });
        } else {
            danger.style.display = 'block';
        }
    };
}
