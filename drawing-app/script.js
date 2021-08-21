const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const cleanBtn = document.getElementById("clean");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const colorBtn = document.getElementById("color");
const sizeSpan = document.getElementById("size");
const shapesBtn = document.getElementById("shapes");
const eventsBtn = document.getElementById("events");
const fillBtn = document.getElementById("fill");
const circleRadio = document.getElementById("circle");
const rectangleRadio = document.getElementById("rectangle");
const lineRadio = document.getElementById("line");
let size = 20;
sizeSpan.innerText = size;
isPressed = false;
let color = "black";
let fill = false;
let originalShape = "";

shapesBtn.classList.toggle("visited");
shapes();
//objects:
function drawLine(x1, y1, x2, y2) {
    console.log('drawLine',originalShape,fill);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = size/10;

    ctx.strokeStyle = color;
    ctx.stroke();
  
}
function drawCircle(x, y, r, s, e, fill = false) {
    console.log('drawCircle',originalShape,fill);
  ctx.beginPath();
  ctx.arc(x, y, r, s, Math.PI * 2);
  if (fill) {
    ctx.fillText = "fill Applied";
    ctx.fillStyle = color;
    ctx.lineWidth = size/10;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}
function drawRectangle(x, y, w, h, fill = false) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.lineWidth = size/10;
  console.log('drawRectangle',originalShape,fill);
  if (fill) {
    ctx.fillText = "fill Applied";
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}
//buttons
function selectShape() {
  if (circleRadio.checked) {
    originalShape = "circle";
    console.log("circle",circleRadio.checked,originalShape);
  }
  if (rectangleRadio.checked) {
      console.log('rectangle',rectangleRadio.checked,originalShape);
    originalShape = "rectangle";
  }
  if (lineRadio.checked) {
    originalShape = "line";
    console.log('line',lineRadio.checked,originalShape);
  }
  console.log(originalShape, "original shape");
}
fillBtn.addEventListener("change", () => {
  //console.log('fill',fill);
  fill = !fill;
  console.log("fill", fill);
});

eventsBtn.addEventListener("click", () => {
  events();
  shapesBtn.classList.toggle("visited");
  eventsBtn.classList.toggle("visited");
});

shapesBtn.addEventListener("click", () => {
  shapesBtn.classList.toggle("visited");
  eventsBtn.classList.toggle("visited");
  shapes();
});
cleanBtn.addEventListener("click", () => {
  clear();
  if (!shapesBtn.className.includes("visited")) {
    shapesBtn.classList.add("visited");
    eventsBtn.classList.remove("visited");
  }
});

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
decreaseBtn.addEventListener("click", () => {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  sizeSpan.innerText = size;
});
increaseBtn.addEventListener("click", () => {
  size += 5;
  if (size > 50) {
    size = 50;
  }
  sizeSpan.innerText = size;
});
colorBtn.addEventListener("change", () => {
  color = colorBtn.value;
});
//Events
function events() {
  canvas.addEventListener("mouseup", () => {
    isPressed = false;
  });
  canvas.addEventListener("mousedown", (e) => {
    isPressed = true;

    console.log("keydown");
    const x = e.offsetX;
    const y = e.offsetY;
    console.log("mousedown", "circle", x, y);
  //  clear();
    drawCircle(x, y, 1, 0, Math.PI * 2, fill);

    canvas.addEventListener("mousemove", (e) => {
      if (isPressed) {
        const x2 = e.offsetX - x;
        const y2 = e.offsetY - y;
        const distance = Math.sqrt(x2 * x2 + y2 * y2) + 1;
        console.log(x, x2, y, y2, distance);
    //    clear();
        if ((originalShape === "circle")) {
            drawCircle(x, y, Math.round(distance), 0, Math.PI * 2, fill);
            console.log("mousemove", "circle", x, y, distance * 100);
          } else if ((originalShape === "rectangle")) {
            drawRectangle(x,y,distance,distance*2,fill);
          } else {
            drawLine(x, y, x2,y2);
          }

      }
    });
  });
}
function shapes() {
  canvas.addEventListener("mouseup", () => {
    isPressed = false;
  });
  canvas.addEventListener("mousedown", (e) => {
    isPressed = true;

    console.log("keydown");
    const x = e.offsetX;
    const y = e.offsetY;
    console.log("mousedown", originalShape, x, y);
    if (originalShape == "circle") {
      drawCircle(x, y, size, 0, Math.PI * 2, fill);
    } else if (originalShape == "rectangle") {
      drawRectangle(x,y,50,100,fill);
    } else {
        console.log(originalShape);
     // drawLine(100, 100, x, y);
    }
    canvas.addEventListener("mousemove", (e) => {
      if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        console.log(x, x2, y, y2, size);
        
        if ((originalShape === "circle")) {
            drawCircle(x2, y2, size, 0, Math.PI * 2, fill);
          } else if ((originalShape === "rectangle")) {
            drawRectangle(x,y,Math.abs( x2-x),Math.abs(y2-y));
          } else {
            drawLine(x, y, x2, y2);
          }
        // console.log("mousemove", "circle", x, y, distance * 100);
      }
    });
  });
}
