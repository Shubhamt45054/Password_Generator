
let lengthDisplay = document.querySelector('[lengthDisplay]');
let slider = document.querySelector('input[type=range]');


function handleSlider() {
    slider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = slider.min;
    const max= slider.max;

    slider.style.backgroundSize = (((passwordLength-min)*100)/(max-min))+"% 100%"
}
let password="";
let passwordLength = 10;
handleSlider();
slider.addEventListener('input', (event) => {
    passwordLength = event.target.value;
    handleSlider();
});

let indicator = document.querySelector('.indicator');
    setIndicator("#ccc");
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');


function generateRandom(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function getRandomNumber(){
    return generateRandom(0,10);
}
function generateRandomLowercase() {
    return String.fromCharCode(generateRandom(97, 123));
}
function generateRandomUppercase() {
    return String.fromCharCode(generateRandom(65, 91));
}

const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function generateRandomSymbol() {
    let index = generateRandom(0, symbol.length);
    return symbol[index];
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;
    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}


let passwordDisplay = document.querySelector("input[passwordDisplay]");
let copyMessage = document.querySelector("[copyMessage]");
let copyBtn = document.querySelector(".copyBtn");
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMessage.innerText = "Copied"
    }
    catch (e) {
        copyMessage.innerText = "Failed";
    }

    copyMessage.classList.add('active');
 
    setTimeout(() => {
        copyMessage.classList.remove('active');
 
    }, 2000)
}
copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value)
        copyContent();
});


let checkBoxes = document.querySelectorAll("input[type=checkbox]");
let checkCount = 0;

function handleCheckBoxChange() {
    checkCount = 0;
    checkBoxes.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}
checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});

let generateBtn = document.querySelector("#generateBtn");

generateBtn.addEventListener('click',()=>{
    if(checkCount<=0) return ;

    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    password="";

    let arrayOfCheckedFunction = [];

    if (uppercase.checked) arrayOfCheckedFunction.push(generateRandomUppercase);
    if (lowercase.checked) arrayOfCheckedFunction.push(generateRandomLowercase);
    if (numbers.checked) arrayOfCheckedFunction.push(getRandomNumber);
    if (symbols.checked) arrayOfCheckedFunction.push(generateRandomSymbol);

     for (let i = 0; i < arrayOfCheckedFunction.length; i++) {
        password += arrayOfCheckedFunction[i]();
    }

     for (let i = 0; i < passwordLength - arrayOfCheckedFunction.length; i++) {
        let randIndex = generateRandom(0, arrayOfCheckedFunction.length);
        password += arrayOfCheckedFunction[randIndex]();
    }
  
    password = shuffle(Array.from(password));
    passwordDisplay.value = password;
    calcStrength();
});

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
