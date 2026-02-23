const RATE_USD = 3.20;
const RATE_EUR = 3.50;
const RATE_RUB = 0.035;

document.getElementById('loginBtn').addEventListener('click', checkLogin);
function checkLogin() {
  const emailValue = document.getElementById("emailInput").value;
  const ageValue = document.getElementById("ageInput").value;
  const pass = document.getElementById("passInput").value;
  const res = document.getElementById("loginResult");
  const age = Number(ageValue);
  
  if (Number.isNaN(age) || age < 18) {
    res.textContent = "Ошибка: Возраст должен быть числом от 18 и выше.";
    res.style.color = "red";
    return;
}

if (pass.length < 6) {
    res.textContent = "Ошибка: Пароль должен быть не короче 6 символов.";
    res.style.color = "red";
    return;
}

const emailPattern = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

  if (emailPattern.test(emailValue) === false) {
    res.textContent = "Ошибка: введите корректный Email";
    res.style.color = "red";
    return;
  }

    res.textContent = "Доступ разрешён";
    res.style.color = "green";
}
document.getElementById('discountBtn').addEventListener('click', calculateDiscount);
function calculateDiscount() {
  const inputField = document.getElementById("sumInput"); // Берем само поле
  const sum = Number(inputField.value);
  const res = document.getElementById("discountResult");

  const MAX_AMOUNT = Number.MAX_SAFE_INTEGER; 

  // СУПЕР-ЗАЩИТА: Если браузер сломался от длины числа (badInput) ИЛИ сумма больше лимита
  if (inputField.validity.badInput || sum > MAX_AMOUNT) {
    res.textContent = `Ошибка: сумма слишком велика (максимум ${MAX_AMOUNT}).`;
    res.style.color = "red";
    return;
  }

  // Если поле вообще пустое или ввели 0 (или минус)
  if (inputField.value === "" || Number.isNaN(sum) || sum < 0.01) {
    res.textContent = "Ошибка: введите корректную сумму от 0.01 BYN.";
    res.style.color = "red";
    return;
  }

  let discountPercent = 0; 

  if (sum < 100) {
    discountPercent = 0;
  } else if (sum <= 500) {
    discountPercent = 10;
  } else {
    discountPercent = 20;
  }

  const discountAmount = sum * discountPercent / 100;
  const finalSum = sum - discountAmount;
  const delivery = finalSum > 200 ? "Доставка бесплатная" : "Доставка платная";

  res.textContent = `Сумма скидки: ${discountAmount.toFixed(2)} BYN. Итоговая сумма: ${finalSum.toFixed(2)} BYN. ${delivery}`;
  res.style.color = "blue";
}

document.getElementById('convertBtn').addEventListener('click', convertCurrency);
function convertCurrency() {
  const inputField = document.getElementById("amountInput");
  const amount = Number(inputField.value);
  const currency = document.getElementById("currencySelect").value;
  const res = document.getElementById("convertResult");

  const MAX_AMOUNT = Number.MAX_SAFE_INTEGER; 

  if (inputField.value === "" || Number.isNaN(amount) || amount <= 0) {
    res.textContent = `Ошибка: введите сумму от 0.01 до ${MAX_AMOUNT} BYN.`;
    res.style.color = "red";
    return; 
  }

  if (amount > MAX_AMOUNT) {
    res.textContent = `Ошибка: максимальная сумма — ${MAX_AMOUNT} BYN.`;
    res.style.color = "red";
    return;
  }

  let result = 0;
  switch (currency) {
    case "USD": 
        result = amount / RATE_USD; 
        break;
    case "EUR":
        result = amount / RATE_EUR;
        break;
    case "RUB":
        result = amount / RATE_RUB;
        break;
  }
  res.textContent = `${amount} BYN = ${result.toFixed(2)} ${currency}`;
  res.style.color = "green";
  }

document.getElementById('quizBtn').addEventListener('click', startQuiz);
function startQuiz() {
  const res = document.getElementById("quizResult");
  let score = 0;
  const answer1 = prompt("Вопрос 1: Какой оператор проверяет равенство без приведения типов (строгое равенство): == или === ?");
  
  if (answer1 === null) {
  res.textContent = "Квиз отменён";
  res.style.color = "red";
  return;
}

if (answer1 === "===") {
  score = score + 1;
}

const answer2 = prompt("Вопрос 2: Какое ключевое слово используется для создания переменной, которую нельзя изменить: let или const?");

if (answer2 === null) {
  res.textContent = "Квиз отменен";
  res.style.color = "red";
  return;
}

if (answer2 === "const") {
  score = score + 1;
}

const answer3 = prompt("Вопрос 3: Для чего нужна проверка NaN в JavaScript?");

if (answer3 ===null) {
  res.textContent = "Квиз отменён";
  res.style.color = "red";
  return;
}

if (answer3 === "для проверки, является ли значение не числом") {
  score = score + 1;
}

res.textContent = `Ваш результат: ${score}/3`;
res.style.color = "green";

}
  
