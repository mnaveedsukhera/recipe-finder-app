document.getElementById('searchButton').addEventListener('click', getRecipes);

// Function to get recipes from the API
function getRecipes() {
    const searchQuery = document.getElementById('searchInput').value;
    const categoryQuery = document.getElementById('categorySelect').value;

    // If neither searchQuery nor categoryQuery is provided, alert the user
    if (!searchQuery && !categoryQuery) {
        alert("Please enter a recipe or select a fast food category.");
        return;
    }

    // Clear previous results
    document.getElementById('recipeResults').innerHTML = '';

    let apiUrl = '';

    // If a category is selected, search by category
    if (categoryQuery) {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${categoryQuery}`;
    } else {
        // Else, search by the general query
        apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    }

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if there are any recipes found
            if (data.meals) {
                displayRecipes(data.meals);
            } else {
                document.getElementById('recipeResults').innerHTML = `<div class="col-12"><p>No recipes found. Try another search.</p></div>`;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("An error occurred. Please try again later.");
        });
}

// Function to display recipes on the page
function displayRecipes(meals) {
    const resultsContainer = document.getElementById('recipeResults');
    
    meals.forEach(meal => {
        const mealCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">Category: ${meal.strCategory}</p>
                        <a href="${meal.strSource}" target="_blank" class="btn btn-primary">View Recipe</a>
                    </div>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += mealCard;
    });
}
