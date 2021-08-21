/**
 * 1) design app
 * 2) css beutify
 * 3) javascript
 *    a-  cut and paste HTML design to add item function ok
 *    b-  define add item button in js                    ok
 *    c-  edit button
 *    d-  delete button
 *    e-  setting btn
 *    f-  selection
 *    g-  localstorage
 */

const addBtn = document.querySelector(".addItem");

const itemsText = JSON.parse(localStorage.getItem("items"));

if (itemsText) {
  for (let i = 0; i < itemsText.length / 3; i++) {
    addItem(itemsText[i * 3], itemsText[i * 3 + 1], itemsText[i * 3 + 2]);
  }
} else {
}

addBtn.addEventListener("click", () => {
  const mains = document.querySelectorAll(".main");
  //console.log(mains);
  if (mains.length) {
    for (let i = 0; i < mains.length; i++) {
      if (mains[i].className.includes("hidden")) {
        console.log("There is empty Item");
        return;
      }
    }
  }

  console.log("There is no empty Item");
  // addItem();
  addcard_fwd();
});
function addcard_fwd() {
  createTemplate();
  const frontCard = document.createElement("div");
  frontCard.innerHTML =
    '<div class="template_fwd">' +
    '<img src="images/profile/logo.png" alt="logo" class="logo" />' +
    '<img src="images/profile/rozita.jpg" class="profile_images" alt="" />' +
    '<div class="template-detail">' +
    '<div><label for="name">NAME</label>' +
    '<input type="text" class="name hidden" id="name" name="name" />' +
    '<span class="name">Essa Jamal</span></div>' +
    '<div><label for="title">TITLE</label>' +
    '<input type="text" id="title" class="title hidden" name="title" />' +
    '<span class="title" class="title">Charging / billing engineer</span></div>' +
    '<div><label for="idnumber">ID NUMBER</label>' +
    '<input type="text" id="idnumber" class="idnumber hidden" name="idnumber" />' +
    '<span class="idnumber">0517</span></div>' +
    '<div><label for="bloodtype">BLOOD TYPE:</label>' +
    '<input type="text" id="bloodtype" class="bloodtype hidden" name="bloodtype" />' +
    '<span class="bloodtype">b+</span>' +
    '<label for="expirydate">Expiry Date:</label>' +
    '<input type="date" id="expirydate" class="expirydate hidden" />' +
    '<span class="expirydate">2022/02/01</span></div></div>' +
    '<div class="footer"></div></div>  ';
  items = document.querySelector(".items");
  items.appendChild(frontCard);
  const editBtn = items.parentNode.querySelector(".edit");
  const deleteBtn = items.querySelector(".delete");

  const inputNameFwd = frontCard.querySelector("input.name");
  const spanNameFwd = frontCard.querySelector("span.name");
  const inputTitleFwd = frontCard.querySelector("input.title");
  const spanTitleFwd = frontCard.querySelector("span.title");
  const inputIDNumberFwd = frontCard.querySelector("input.idnumber");
  const spanIDNumberFwd = frontCard.querySelector("span.idnumber");
  const inputBloodTypeFwd = frontCard.querySelector("input.bloodtype");
  const spanBloodTypeFwd = frontCard.querySelector("span.bloodtype");
  const inputExpDFwd = frontCard.querySelector("input.expirydate");
  const spanExpDFwd = frontCard.querySelector("span.expirydate");
  
  
  editBtn.addEventListener("click", () => {
    inputNameFwd.classList.toggle("hidden");
    spanNameFwd.classList.toggle("hidden");
    inputTitleFwd.classList.toggle("hidden");
    spanTitleFwd.classList.toggle("hidden");
    inputBloodTypeFwd.classList.toggle("hidden");
    spanBloodTypeFwd.classList.toggle("hidden");
    inputIDNumberFwd.classList.toggle("hidden");
    spanIDNumberFwd.classList.toggle("hidden");
    inputExpDFwd.classList.toggle("hidden");
    spanExpDFwd.classList.toggle("hidden");
  });
  inputNameFwd.addEventListener("input", (e) => {
    const { value } = e.target;
    spanNameFwd.innerHTML = marked(value);
    console.log(value, spanNameFwd.innerHTML);
  });
  inputNameFwd.addEventListener("input", (e) => {
    const { value } = e.target;
    spanNameFwd.innerHTML = marked(value);
    console.log(value, spanNameFwd.innerHTML);
  });
  inputNameFwd.addEventListener("input", (e) => {
    const { value } = e.target;
    spanNameFwd.innerHTML = marked(value);
    console.log(value, spanNameFwd.innerHTML);
  });
  inputNameFwd.addEventListener("input", (e) => {
    const { value } = e.target;
    spanNameFwd.innerHTML = marked(value);
    console.log(value, spanNameFwd.innerHTML);
  });

  deleteBtn.addEventListener('click',()=>{
items.remove();

  });
}

function addItem(
  _text = "",
  _profile = "images/profile/profile2.jpg",
  _background = "url('images/background/background2.jpg')"
) {
  const item = document.createElement("div");
  item.innerHTML =
    '<div class="items">' +
    '<div class="tools">' +
    '<button class="collection">( Tishknet )</button>' +
    '<button class="prev"><i class="fa fa-fast-backward" title="print"></i></button>' +
    '<button class="prev"><i class="fa fa-backward" title="print"></i></button>' +
    '<button class="curr">1</button>' +
    '<button class="next"><i class="fa fa-forward" title="print"></i></button>' +
    '<button class="next"><i class="fa fa-fast-forward" title="print"></i></button>' +
    '<button class="setting"><i class="fa fa-print" title="print"></i></button>' +
    '<button class="setting"><i class="fa fa-cog" title="setting"></i></button>' +
    '<button class="edit"><i class="fa fa-edit" title="edit"></i></button>' +
    '<button class="delete"><i class="fa fa-trash" title="delete"></i></button></div>' +
    '<div class="main hidden"></div>' +
    '<img src="' +
    _profile +
    '" alt="" class="profile-image" />' +
    "<textarea>" +
    _text +
    "</textarea>" +
    '<div class="item-setting hidden"> ' +
    '<div class="tools"> Setting' +
    '<button class="close"><i class="fa fa-close" title="close"></i></button>' +
    "<div class='item-setting-container'></div></div></div>" +
    '<span class="upddate"> Updated on: 2021-08-12 10:10:20PM </span>    </div>';
  document.body.appendChild(item);
  const template_bwd = document.querySelector(".template_bwd");
  const editBtn = item.querySelector(".edit");
  const deleteBtn = item.querySelector(".delete");
  const settingBtn = item.querySelector(".setting");
  const closeBtn = item.querySelector(".close");
  const main = item.querySelector(".main");
  const textArea = item.querySelector("textarea");
  const itemSetting = item.querySelector(".item-setting");
  const profileImage = item.querySelector(".profile-image");
  main.style.backgroundImage = _background;
  const itemSettingc = itemSetting.querySelector(".item-setting-container");

  editBtn.addEventListener("click", () => {
    textArea.classList.toggle("hidden");
    main.classList.toggle("hidden");
    updateLocalStorage();
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerText = marked(value);
    console.log(value);
  });
  deleteBtn.addEventListener("click", () => {
    item.remove();
    updateLocalStorage();
  });
  settingBtn.addEventListener("click", () => {
    if (!textArea.className.includes("hidden")) {
      textArea.classList.toggle("hidden");
    }
    if (!main.className.includes("hidden")) {
      main.classList.toggle("hidden");
    }
    if (itemSetting.className.includes("hidden")) {
      itemSetting.classList.toggle("hidden");
    }
    deleteBtn.disabled = true;
    editBtn.disabled = true;
    settingBtn.disabled = true;
  });

  closeBtn.addEventListener("click", () => {
    if (main.className.includes("hidden")) {
      main.classList.toggle("hidden");
    }
    itemSetting.classList.toggle("hidden");
    deleteBtn.disabled = false;
    editBtn.disabled = false;
    settingBtn.disabled = false;
    updateLocalStorage();
  });
  //Add profile Image
  const profileSelecImage = document.createElement("select");
  const profiles = ["profile1", "profile2", "profile3", "profile4"];
  for (let i = 0; i < profiles.length; i++) {
    let imageOptions = document.createElement("option");
    imageOptions.value = profiles[i] + ".jpg";
    imageOptions.innerText = profiles[i];
    profileSelecImage.appendChild(imageOptions);
  }
  profileSelecImageTitle = document.createElement("h3");
  profileSelecImageTitle.classList.add("title");
  profileSelecImageTitle.innerText = "Select Profile Image";
  itemSettingc.appendChild(profileSelecImageTitle);
  itemSettingc.appendChild(profileSelecImage);

  //Add background Image
  const backgroundSelecImage = document.createElement("select");
  const backgrounds = [
    "background1",
    "background2",
    "background3",
    "background4",
  ];
  for (let i = 0; i < profiles.length; i++) {
    let imageOptionsbg = document.createElement("option");
    imageOptionsbg.value = backgrounds[i] + ".jpg";
    imageOptionsbg.innerText = backgrounds[i];
    backgroundSelecImage.appendChild(imageOptionsbg);
  }
  bgSelecImageTitle = document.createElement("h3");
  bgSelecImageTitle.classList.add("title");
  bgSelecImageTitle.innerText = "Select background Image";
  itemSettingc.appendChild(bgSelecImageTitle);
  itemSettingc.appendChild(backgroundSelecImage);
  profileSelecImage.addEventListener("change", () => {
    profileImage.src = "images/profile/" + profileSelecImage.value;
    console.log(profileSelecImage.value);
    updateLocalStorage();
  });
  backgroundSelecImage.addEventListener("change", () => {
    main.style.backgroundImage =
      "url('" + "images/background/" + backgroundSelecImage.value + "')";
    // console.log(backgroundSelecImage.value);

    updateLocalStorage();
  });
}

function updateLocalStorage() {
  const textAreas = document.querySelectorAll("textarea");
  const imageProfile = document.querySelectorAll(".profile-image");
  const main = document.querySelectorAll(".main");
  const Items = [];
  for (let i = 0; i < textAreas.length; i++) {
    Items.push(textAreas[i].value);
    Items.push(imageProfile[i].src);
    Items.push(main[i].backgroundImage);
  }
  localStorage.setItem("items", JSON.stringify(Items));
}

function createTemplate() {
  const template = document.createElement("div");
  template.classList.add("template");
  template.innerHTML =
    '<div class="items">' +
    '<div class="tools">' +
    '<button class="collection">( Tishknet )</button>' +
    '<button class="prev"><i class="fa fa-fast-backward" title="print"></i></button>' +
    '<button class="prev"><i class="fa fa-backward" title="print"></i></button>' +
    '<button class="curr">1</button>' +
    '<button class="next"><i class="fa fa-forward" title="print"></i></button>' +
    '<button class="next"><i class="fa fa-fast-forward" title="print"></i></button>' +
    '<button class="setting"><i class="fa fa-print" title="print"></i></button>' +
    '<button class="setting"><i class="fa fa-cog" title="setting"></i></button>' +
    '<button class="edit"><i class="fa fa-edit" title="edit"></i></button>' +
    '<button class="delete"><i class="fa fa-trash" title="delete"></i></button></div></div><div class="container"></div>';
  document.body.appendChild(template);
}
