const addBtn = document.querySelector(".add");
const notesText = JSON.parse(localStorage.getItem("notes"));

//console.log(notesText.length,localStorage.getItem("notes"));
if (notesText) {
  const startTime = notesText[0];

  console.log(notesText[0]);
  for (let i = 0; i < (notesText.length - 1) / 5; i++) {
    console.log(
      "str: ",
      notesText[i + 1],
      "  create  ",
      notesText[i + 2] + startTime,
      "  update   ",
      notesText[i + 3] + startTime,
      "  profile Image   ",
      notesText[i + 4],
      "  bg image   ",
      notesText[i + 5]
    );

    addNewNote(
      notesText[i * 5 + 1],
      new Date((notesText[i * 5 + 2] + startTime) * 1000),
      new Date((notesText[i * 5 + 3] + startTime) * 1000),
      "images/profile/" + notesText[i * 5 + 4],
      "images/background/" + notesText[i * 5 + 5]
    );
  }
}

addBtn.addEventListener("click", () => {
  if (document.body.childElementCount > 3) {
    const mains = document.querySelectorAll(".main");
    for (let i = 0; i < mains.length; i++) {
      if (mains[i].innerText.startsWith("Updated Date:")) {
        console.log(" You have empty note.");
        return;
      }
    }
  }

  addNewNote();
});

function addNewNote(
  noteText = "",
  _createdDate = new Date(),
  _updateDate = "",
  _imgProfile = "images/profile/profile1.jpg",
  _imgBackground = "images/background/background1.jpg"
) {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML =
    '  <div class="notes"> ' +
    '<div class="tools">' +
    '<button class="setting" title="Image Setting"><i class="fa fa-cog"></i></button>' +
    '<button class="edit" title="Marked Text editting"><i class="fa fa-edit"></i></button>' +
    '<button class="delete" title="Remove note"><i class="fa fa-trash"></i></button>' +
    "</div>" +
    '<img id="img_profile" class="img_profile" src="images/background/background1.jpg"/>' +
    '<div class="main hidden"></div>' +
    '<div class="note_setting hidden">' +
    '<div class="tools"><button class="close"><i class="fa fa-close"></i></button></div>' +
    "<h3>Change Profile Image</h3>" +
    '<select name="img_select" class="img_select" id="img_select">' +
    '  <option value="profile1.jpg">profile1</option>' +
    ' <option value="profile2.jpg">profile2</option>' +
    '<option value="profile3.jpg">profile3</option>' +
    '<option value="profile4.jpg">profile4</option></select>' +
    "<h3>Change Background Image</h3>" +
    '<select name="img_bgselect" class="img_bgselect" id="img_bgselect">' +
    '  <option value="background1.jpg">background1</option>' +
    ' <option value="background2.jpg">background2</option>' +
    '<option value="background3.jpg">background3</option>' +
    '<option value="background4.jpg">background4</option>' +
    " </select> </div>" +
    ' <textarea  ></textarea></div> <span id="CreatedDate" style="padding-left:1rem;color:Red;font-size:.5rem;"></span>  ';
  const notesEl = note.querySelector(".notes");
  const editBtn = note.querySelector(".edit");
  const settingBtn = note.querySelector(".setting");
  const deleteBtn = note.querySelector(".delete");
  const main = notesEl.querySelector(".main");
  const textArea = notesEl.querySelector("textarea");
  if (noteText) {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    textArea.value = noteText;
    main.innerHTML = marked(noteText);
  }

  //console.log(_createdDate,_updateDate  );
  if (_createdDate) {
    insertUpdateDateTime(note, "Created Date:" + _createdDate);
  }
  if (_updateDate) {
    insertUpdateDateTime(main, "Updated Date:" + _updateDate);
  }
  editBtn.addEventListener("click", () => {
    //removeUpadatedDate();
    console.log("here");
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    if (!textArea.className.includes("hidden")) {
      textArea.focus();
    }
    //insertUpdateDateTime(note,'Created Date:'+_createdDate);
    insertUpdateDateTime(main, "Updated Date:" + new Date());
    updateLS();
  });
  deleteBtn.addEventListener("click", () => {
    note.remove();
    console.log("after Remove");
    updateLS();
  });
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
  });

  document.body.appendChild(note);
  let imgProfile = note.querySelector(".img_profile");
  if (imgProfile) {
    imgProfile.src = _imgProfile;
    main.style.backgroundImage = "url('" + _imgBackground + "')";
    console.log("main.backgroundimage", main.backgroundimage);
    imgProfile.addEventListener("dblclick", () => {
      notesSetting(notesEl, imgProfile, main);
    });
    settingBtn.addEventListener("click", () => {
      notesSetting(notesEl, imgProfile, main);
    });
    main.addEventListener("dblclick", () => {
      notesSetting(notesEl, imgProfile, main);
    });
  }
}

function notesSetting(notesEl, imgProfile, main) {
  let noteSetting = notesEl.querySelector(".note_setting");
  console.log("noteSetting", noteSetting);
  noteSetting.classList.toggle("hidden");
  let imgSelect = noteSetting.querySelector(".img_select");
  imgSelect.addEventListener("change", () => {
    console.log(imgSelect.value);
    imgProfile.src = "images/profile/" + imgSelect.value;
    updateLS();
  });

  let imgbgSelect = noteSetting.querySelector(".img_bgselect");
  imgbgSelect.addEventListener("change", () => {
    console.log(imgbgSelect.value);

    main.style.backgroundImage =
      "url('" + "images/background/" + imgbgSelect.value + "')";

    updateLS();
    let closeBtn = noteSetting.querySelector(".close");
    closeBtn.addEventListener("click", () => {
      console.log(imgSelect.value);

      if (!noteSetting.className.includes("hidden")) {
        noteSetting.classList.toggle("hidden");
      }
      console.log(noteSetting.className);
    });
  });
  updateLS();
  let closeBtn = noteSetting.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    console.log(imgSelect.value);
    if (!noteSetting.className.includes("hidden")) {
      noteSetting.classList.toggle("hidden");
    }
    console.log(noteSetting.className);
  });
}
function insertUpdateDateTime(elem, spanText = "") {
  const span = document.createElement("span");

  let cls = "createdDate";
  if (elem.className.includes("main")) {
    cls = "updatedDate";
  }
  if (spanText.includes("Updated Date:")) {
    if (elem.childNodes[1]) {
      elem.removeChild(elem.childNodes[1]);
    }
  }
  span.classList.add(cls);
  span.innerHTML = "";
  span.innerHTML = elem.className.includes("main") ? "<hr width='70%' >" : "";
  span.classList.add("span");
  if (spanText) {
    span.innerHTML += spanText;
  } else {
    span.innerHTML += new Date();
  }
  elem.appendChild(span);
}
function removeUpadatedDate() {
  const span = document.querySelectorAll("span");
  for (let i = 0; i < span.length; i++) {
    //span[i].remove();
  }
}

function updateLS() {
  let startDateTime = new Date("8/10/2021 22:04:00");

  //Tue Aug 10 2021 22:04:00 GMT+0300 (Arabian Standard Time)

  console.log(startDateTime / 1000, startDateTime);
  textAreas = document.querySelectorAll("textarea");
  const createdDate = document.querySelectorAll(".createdDate");
  const updatedDate = document.querySelectorAll(".updatedDate");
  const mains = document.querySelectorAll(".main");
  console.log(
    ".main",
    mains[0].style.backgroundImage
      .replace('url("images/background/', "")
      .replace('")', "")
  );
  const imageProfile = document.querySelectorAll(".img_profile");
  console.log("imageProfile[0].src:", imageProfile[0].style.src);
  if (imageProfile) {
    console.log("imageProfile[0]", imageProfile[0].src);
    /*console.log(
    imageProfile[0].src.replace(
      " http://127.0.0.1:5500/notes-app/images/profile/http://127.0.0.1:5500/notes-app/",
      ""
    )
  );
*/
  }
  //console.log('createdDate',new Date(createdDate[0].innerText.replace('Created Date:',''))/1000);
  //console.log('updatedDate',new Date(updatedDate[0].innerText.replace('Updated Date:',''))/1000);
  const notes = [];
  notes.push(startDateTime / 1000);
  /* textAreas.forEach((note) => {
    notes.push(note.value);
  });*/
  //console.log(textArea.length);
  console.log(imageProfile[0]);
  // console.log(textArea.length);
  for (let i = 0; i < textAreas.length; i++) {
    let duration1 =
      new Date(createdDate[i].innerText.replace("Created Date:", "")) -
      startDateTime;
    let duration2 =
      new Date(updatedDate[i].innerText.replace("Updated Date:", "")) -
      startDateTime;

    notes.push(textAreas[i].value);
    notes.push(duration1 / 1000);
    notes.push(duration2 / 1000);
    notes.push(
      imageProfile[i].src.replace(
        "http://127.0.0.1:5500/notes-app/images/profile/",
        ""
      )
    );
    notes.push(
      mains[i].style.backgroundImage
        .replace('url("images/background/', "")
        .replace('")', "")
    );

    //src.replace(' http://127.0.0.1:5500/notes-app/images/profile/http://127.0.0.1:5500/notes-app/',''));
  }
  localStorage.setItem("notes", JSON.stringify(notes));
}
