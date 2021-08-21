const contentTodo = document.querySelector(".content-todo");

const form = contentTodo.querySelector(".form");
const input = form.querySelector(".input");
const ul = form.querySelector("ul");
const getListsArray = JSON.parse(localStorage.getItem("lists"));
if (getListsArray) {
  for (let i = 0; i < getListsArray.length / 3; i++) {

    toDo(getListsArray[i * 3], getListsArray[i * 3 + 1],getListsArray[i * 3 + 2]);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  toDo();
});
function toDo(id = "0", task = "",completed=false) {
  let todoText = input.value;
  if (id!="0") {
    todoText = task;
    console.log('text',id);
  }
 // console.log(todoText);
  if (todoText) {
    const span = document.createElement("span");
    span.innerHTML =
      "<br>" + (document.querySelectorAll("li").length + 1) + " . ";
    if (id!="0") {
      span.innerHTML = "<br>" + id + " . ";
    }
    const li = document.createElement("li");
    li.innerText = todoText;
    if(completed){
        li.classList.toggle("completed");
        
    }
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      updateLocalStorage();
    });
    li.addEventListener("contextmenu", () => {
      li.remove();
      span.remove();
      updateLocalStorage();
    });
    ul.appendChild(span);
    ul.appendChild(li);
    input.value = "";
    updateLocalStorage();
    //console.log(li, ul);
  }
}
function updateLocalStorage() {
  const lists = document.querySelectorAll("li");
  const spans = document.querySelectorAll("span");
  const listsArray = [];
  //console.log(list.classList.includes('completed'))
  let i=0;
  lists.forEach(list => {
    listsArray.push(spans[i].innerText.replace('\n','').replace(' . ',''));
    listsArray.push(list.innerText);
    listsArray.push(list.className.includes('completed'));
    console.log(list.innerText,spans[i].innerText.replace('\n',''),list.className.includes('completed'));
    i++;
  });
  console.log(listsArray);
  localStorage.setItem("lists", JSON.stringify(listsArray));
  console.log(listsArray);
}
