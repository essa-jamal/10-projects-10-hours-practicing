/*  '
    5)  JAVASCRIPT  Create General Functions to get meals, mealById and mealByName 
    6)  JAVASCRIPT  Define Elements     done.
    7)  JAVASCRIPT  Data Bind to elements in fav-meal and rand-meal done.
    8)  JAVASCRIPT  Use Local Storage to store Favorite Meals done
    9)  JAVASCRIPT  Add Events to search button and favourite button. FavourMealPopUp done.
    10)             ALL Test Cenarios
*/
//Create General Functions to get meals, mealById and mealByName
//Define Elements
let searchMeal,
  searchBtn,
  favList,
  randImage,
  randText,
  randFav,
  closePopUpBtn,
  mealPopUp,
  mealPopUpDiv,
  random_meal_text,
  randFavPop,
  sharedOpacity = "0",
  randMealId = 0;

callAppMealEls();
setFavMeals();
getRandMeal();
randFav_click();
searchBtn_click();
visibleErrorLable();

//monitorElValues();
function callElHeader() {
  searchMeal = document.getElementById("searchMeal");
  searchBtn = document.getElementById("searchBtn");
}
function callAppMealEls() {
  try {
    popUpMeal();
    callElHeader();
    callElFavMeal();
    callElRandMeal();
    callElErrApp();
  } catch (err) {
    errApp.innerHTML = "callAppMealEls:" + err;
  }
}

function callElFavMeal() {
  favList = document.getElementById("fav-list");
}
function callElRandMeal() {
  randImage = document.getElementById("rand-image");
  randText = document.getElementById("rand-text");
  randFav = document.getElementById("rand-fav");

  random_meal_text = document.getElementById("random_meal_text");
}
function callElErrApp() {
  errApp = document.getElementById("err-app");
}
function visibleErrorLable() {
  if (errApp.innerHTML == "") {
    errApp.style.visible = "hidden";
  } else {
    errApp.style.visible = "visible";
  }
}

function popUpMeal() {
  mealPopUp = document.getElementById("popup-container");
  closePopUpBtn = document.getElementById("close-popup");
  mealPopUpDiv = document.getElementById("meal-popup");
  randFavPop = document.getElementById("rand-fav-pop");
}
function monitorElValues() {
  console.log("Test");
  console.log(
    "searchMeal",
    searchMeal.value,
    "searchBtn",
    searchBtn.innerHTML,
    "favList",
    favList.innerHTML,
    "randImage",
    randImage.style.src,
    "randText",
    randText.innerHTML,
    "randFav",
    randFav.innerHTML
  );
}
function monitorValues(...args) {
  console.log(args);
}
async function getMealByIdToVar(id) {
  const meal = await getMealById(id);
  meal[idmeal];
}
console.log();
//console.log(getMealByName("Teriyaki Chicken Casserole"));

//End of Define Elements

//get API Data:
async function getMealById(mealId) {
  const APITEXT =
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;
  const resp = await fetch(APITEXT);
  const respData = await resp.json();
  const meal = respData.meals[0];
  return meal;
  const text = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
  //console.log(text);
}
async function getMealByName(term) {
  const APITEXT =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term;
  const resp = await fetch(APITEXT);
  console.log(await resp);
  const respData = await resp.json();
  const meal = respData.meals[0];
  console.log("getMealByName", meal, APITEXT);
  return meal;
}

async function getRandMeal() {
  try {
    const APITEXT = "https://www.themealdb.com/api/json/v1/1/random.php";
    const resp = await fetch(APITEXT);
    const respData = await resp.json();
    const randMeal = await respData.meals[0];
    console.log("getMeal()", randMeal);
    setRandMeal(randMeal);
  } catch (err) {
    errApp.innerHTML = "callAppMealEls:" + err;
  }
}
function getOpacity(mealid) {
  let opacity = ".1";
  const meals = getFavMeals();
  console.log("meals[idmeal]", mealid, meals["idMeal"], meals.length);
  meals.forEach((meal) => {
    if (meal == mealid) {
      opacity = "1";
    }
    console.log("meal", "mealid", meal, mealid);
    console.log(opacity, "opacity");
  });

  return opacity;
}
async function getMeals() {}

//End of General Functions

//Data Bind to elements in fav-meal and rand-meal
function setRandMeal(meal) {
  randMealId = meal["idMeal"];
  randImage.src = meal["strMealThumb"];
  randImage.alt = meal["strMeal"];
  random_meal_text.innerHTML = meal["strMeal"];
  randText.innerHTML = meal["strMeal"];
  sharedOpacity = getOpacity(randMealId);
  randFav.style.opacity = sharedOpacity;

  console.log(getOpacity(randMealId));

  setRandMealPopUp(meal);
}
function setFavMeals() {
  try {
    favList.innerHTML = "";

    const mealIds = getFavMeals();
    mealIds.forEach((meal) => {
      console.log(meal, "in for ");
      setFavMealBind(meal);
    });
  } catch (err) {
    errApp.innerHTML = "callAppMealEls:" + err;
  }
}
async function setFavMealBind(mealId) {
  const meal = await getMealById(mealId);
  const favEl = document.createElement("li");
  console.log("meal", meal);
  favEl.innerHTML =
    '<img src="' +
    meal["strMealThumb"] +
    '" alt="' +
    meal["strMeal"] +
    '" onclick="showPopUp(' +
    meal["idMeal"] +
    ')" />' +
    '<span class="fav_span" title="' +
    meal["strMeal"] +
    '"><span class="material-icons closeIcon" id="closeIcon"  onclick="removeFavEl(' +
    meal["idMeal"] +
    ')">close </span>' +
    meal["strMeal"] +
    "</span>";

  //  console.log(favEl,'text',data,randomMeal);
  favList.appendChild(favEl);
}

function setFavMeal(mealId) {
  setMealToLS(mealId);
  randFav.style.opacity = "1";
  sharedOpacity = "1";
}
function getFavMeals() {
  return getMealsFromLS();
}
function removFavMeal(mealId) {
  removeMealFromLS(mealId);
  if (mealId == randMealId) {
    randFav.style.opacity = ".1";
    sharedOpacity = ".1";
    // randFavPop.style.opacity = ".1";
  }
}

function setRandMealPopUp(meal) {
  randMealId = meal["idMeal"];
  HTMLTEXT = "";
  HTMLTEXT =
    "   <h1>" +
    meal["strMeal"] +
    "</h1>" +
    '<img src="' +
    meal["strMealThumb"] +
    '"   alt="' +
    meal["strMeal"] +
    '"  />' +
    '    <span class="material-icons favorite" id="rand-fav-pop" onclick="setFavourMeal(' +
    randMealId +
    ')"> favorite </span>' +
    "<div> <p>" +
    meal["strInstructions"] +
    "</p> <hr width='80%' >" +
    "<ul>";
  console.log(meal);

  for (let i = 1; i < 21; i++) {
    if (meal["strIngredient" + i] != ""  ) {
      console.log(meal["strIngredient" + i], i);
      if(meal["strIngredient" + i]!=null){
      HTMLTEXT += "<li>" + meal["strIngredient" + i]  + " - "+meal["strMeasure" + i] +"</li>";
    }
    }
  }
  HTMLTEXT += "</ul> </div> </div>";
  console.log(HTMLTEXT);
  mealPopUpDiv.innerHTML = HTMLTEXT;
  popUpMeal();
  randFavPop.style.opacity = sharedOpacity;
  console.log(sharedOpacity, "sharedOpacity");
}
//End of Data Bind tol fav and rand meal

//Use Local Storage to store Favorite Meals
function setMealToLS(mealId) {
  const mealIds = getMealsFromLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));

  console.log(getMealsFromLS());
}
function getMealsFromLS() {
  let mealIds = [];
  mealIds = JSON.parse(localStorage.getItem("mealIds"));
  //console.log(mealIds);
  return mealIds === null ? [] : mealIds;
}
function removeMealFromLS(mealId) {
  const mealIds = getMealsFromLS();
  console.log(mealIds.length);
  localStorage.setItem("mealIds", null);

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id != mealId))
  );
  console.log(mealIds.length);
}

//End of Use Local Storage to store Favorite Meals

//Add Events to search button and favourite button.

function randFav_click() {
  try {
    randFav.addEventListener("click", () => {
      if (randFav.style.opacity != "1") {
        setFavMeal(randMealId);
        sharedOpacity = "1";
      } else {
        removFavMeal(randMealId);
        sharedOpacity = ".1";
      }
      setFavMeals();
    });
  } catch (err) {
    errApp.innerHTML = "callAppMealEls:" + err;
  }
}
function setFavourMeal(mealId) {
  console.log(randFavPop, mealId);
  if (randFavPop.style.opacity != "1") {
    console.log(mealId);
    sharedOpacity = "1";
    randFavPop.style.opacity = sharedOpacity;
    setFavMeal(mealId);
  } else {
    sharedOpacity = ".1";
    removFavMeal(mealId);
    randFavPop.style.opacity = sharedOpacity;
  }
  setFavMeals();
}

function searchBtn_click() {
  try {
    searchBtn.addEventListener("click", async () => {
      if (searchMeal.value == "") {
        return;
      }
      setRandMeal(await getMealByName(searchMeal.value));
    });
  } catch (err) {
    errApp.innerHTML = "callAppMealEls:" + err;
  }
}
function removeFavEl(mealId) {
  try {
    console.log("mealId", mealId);
    removFavMeal(mealId);
    setFavMeals();
  } catch (err) {
    errApp.innerHTML = "callAppMealEls:" + err;
  }
}

closePopUpBtn.addEventListener("click", () => {
  mealPopUp.classList.add("hidden");
  console.log(mealPopUp, "mealPopUp");
  console.log("closing ...");
});

randImage.addEventListener("click", () => {
  mealPopUp.classList.remove("hidden");
});
async function showPopUp(mealid) {
  console.log("showPopUp(mealid)", mealid);
  setRandMealPopUp(await getMealById(mealid));

  mealPopUp.classList.remove("hidden");
}
//End of Add Events to search button and favourite button.
