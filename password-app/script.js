const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

//dictionary
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function getUpperCase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
function getLowerCase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
function getNumbers() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}
function getSymbols() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

console.log(getUpperCase(), getLowerCase(), getNumbers(), getSymbols());

copyEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = pwEl.value;
  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  pwEl.value="";
  alert("password copied to clipboard");
});

let pattern = "";
generateEl.addEventListener("click", () => {
  if (
    upperEl.checked ||
    lowerEl.checked ||
    numberEl.checked ||
    symbolEl.checked
  ) {
    let len = 0;
    if (lenEl.value) {
      len = lenEl.value;
      if (pwEl.value.length < lenEl.value) {
        pattern = pwEl.value;
      }
      len -= pattern.length;
      pwEl.value = pattern + generatePassword(len);
    }
  }
});

function generatePassword(len) {
  let password = "";
  for (let i = 0; i < len; i++) {
    const c = generateX();
    password += c;
  }

  console.log(password);

  return password;
}

function generateX() {
  const xs = [];
  if (upperEl.checked) {
    xs.push(getUpperCase());
  }
  if (lowerEl.checked) {
    xs.push(getLowerCase());
  }
  if (numberEl.checked) {
    xs.push(getNumbers());
  }
  if (symbolEl.checked) {
    xs.push(getSymbols());
  }
  console.log(xs);
  return xs[Math.floor(Math.random() * xs.length)];
}
