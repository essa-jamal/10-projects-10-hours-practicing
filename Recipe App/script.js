getRandomMeal();
//getMealById(53008);
//getMealsBySearchByName("Minced Beef Pie");
const meals = document.getElementById("meals");
const favConatiner = document.getElementById("meal_Fav");
favConatiner.innerHTML = "";

const search_txt = document.getElementById("search_txt");
const searchbtn = document.getElementById("searchbtn");

async function getMealById(id) {
  const text = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
  //console.log(text);
  const resp = await fetch(text);
  const respData = await resp.json();
  const meal = respData.meals[0];
  //console.log("getMealById", meal);
  return respData.meals[0];
}

async function getMealsBySearchByName(term) {
  const text = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term;
  //console.log(text);
  const resp = await fetch(text);
  const respData = await resp.json();
  //const meal = respData.meals[0];
  //console.log("getMealById", meal);
  return respData.meals;
}
async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  // console.log("getRandomMeal:", randomMeal);
  addMeal(randomMeal, true);
}
let randomMealId = 0;
function addMeal(mealData, random = false) {
  //console.log("array check", mealData);
  const random_meal_text = document.getElementById("random_meal_text");
  const meal_body_text = document.getElementById("meal_body");
  random_food_image = document.getElementById("random_food_image");
  random_meal_text.innerText = mealData["strMeal"];
  meal_body_text.innerText = mealData["strMeal"];
  random_food_image.src = mealData["strMealThumb"];
  random_food_image.alt = mealData["Meal"];
  randomMealId = mealData["idMeal"];
  //console.log(mealData["strMeal"]);
  //console.log(randomMealId);
}

function favorite() {
  const el = document.getElementById("icons");
  if (el.style.opacity != 1) {
    el.style.opacity = "1";
    //  console.log(randomMealId);
    //addMealToFavourite(randomMealId);
    addMealToLS(randomMealId);
    favConatiner.innerHTML = "";
    addMealsLStoFav();
    // console.log('meal Added!',randomMealId);
  } else {
    removeMealFromLS(randomMealId);
    el.style.opacity = "0.3";
    favConatiner.innerHTML = "";
    addMealsLStoFav();
  }
  //alert('clicked');
}
function addMealToLS(mealId) {
  const mealIds = getMealsFromLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function getMealsFromLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  //console.log(mealIds);
  return mealIds === null ? [] : mealIds;
}
function removeFavEl(mealId) {
  const el = document.getElementById("icons");
  if (randomMealId == mealId) {
    el.style.opacity = ".3";
  }
  removeMealFromLS(mealId.toString());

  favConatiner.innerHTML = "";
  addMealsLStoFav();
}
function removeMealFromLS(mealId) {
  const mealIds = getMealsFromLS();
  localStorage.setItem("mealIds", null);

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
  // console.log(mealIds.length);
}

function removeMealFromFavourite(mealData) {}
addMealsLStoFav();

function addMealsLStoFav() {
  favConatiner.innerHTML = "";
  // console.log('addMealsLStoFav');
  mealsFav = getMealsFromLS();
  //console.log(mealIds[1],mealIds);
  /*console.log('addMealsLStoFav');
  const x=mealsFav.length;
  console.log('length of meals',x);
  let i=mealsFav.length-4<0?0:mealsFav.length-4;
  console.log(i,mealsFav.length-i);
  for(;i<mealsFav.length-i;){
    console.log(mealsFav[i],'in for ');
    addMealToFavourite(mealsFav[i]);
    console.log(i,mealsFav.length-i);
  }*/

  mealsFav.forEach((meal) => {
    // console.log(meal,'in for ');
    addMealToFavourite(meal);
  });
}
const close_btn = document.getElementsByClassName("close_btn");
async function addMealToFavourite(data) {
  const randomMeal = await getMealById(data);

  //console.log('addMealFromFavourite',randomMeal,'data \n',data);
  const favEl = document.createElement("li");

  favEl.innerHTML =
    '<img src="' +
    randomMeal["strMealThumb"] +
    '" alt="' +
    randomMeal["strMeal"] +
    '" onclick="showPopUp('+randomMeal+')" />' +
    '<span class="fav_span" title="' +
    randomMeal["strMeal"] +
    '"><span class="material-icons close_btn" id="close_btn"  onclick="removeFavEl(' +
    data +
    ')">close </span>' +
    randomMeal["strMeal"] +
    "</span>";

  //  console.log(favEl,'text',data,randomMeal);
  favConatiner.appendChild(favEl);
}

const lblerror = document.getElementById("lblerror");
searchbtn.addEventListener("click", async () => {
  const searchText = search_txt.value;
  if (searchText == "") {
    lblerror.innerHTML = "Please Insert Meal Name!";
    lblerror.style.visibility = "Visible";
    return;
  } else {
    lblerror.innerHTML = "";
    lblerror.style.visibility = "hidden";
  }

  const meals = await getMealsBySearchByName(searchText);
  //console.log(meals);
  //getMealsBySearchByName(searchText);
  //addMealToLS(meals[0]["idMeal"]);
  addMeal(meals[0], true);
  favConatiner.innerHTML = "";
  addMealsLStoFav();

  const el = document.getElementById("icons");
  //console.log(meals[0]["idMeal"]);
  const mealsLS = getMealsFromLS();
  const randomMealId = meals[0]["idMeal"];
  let found = false;
  //console.log('meals',mealsLS,'randomMealId',randomMealId,'found',found);

  for (let i = 0; i < mealsLS.length; i++) {
    if (mealsLS[i] == randomMealId) {
      found = true;
    }
  }
  if (found) {
    el.style.opacity = "1";
    //console.log(meals[0]["idMeal"],'in find');
  } else {
    el.style.opacity = "0.3";
    //console.log(meals[0]["idMeal"],'out find');
  }

  //console.log('meals',mealsLS,'randomMealId',randomMealId,'found',found);
});
