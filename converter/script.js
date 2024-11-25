const apiKey = '4d87f049bda6485c9ecfa5ff558c3472';
const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

let currencyRates = {};

const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convert-btn');
const result = document.getElementById('result');

async function fetchCurrencyRates() {
    try {
        const responce = await fetch(apiUrl);
        const data = await responce.json();
        currencyRates = data.rates;
        populateCurrencySelectors();
    } catch (error) {
        console.error('Ошибка при загрузке данных о курсах валют:', error);
    }
};

function populateCurrencySelectors() {
    const currencies = Object.keys(currencyRates);

    currencies.forEach (currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrency.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrency.appendChild(optionTo);
    });
};

function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(amountInput.value);

    if (from && to && amount) {
        const conversionRate = currencyRates[to] / currencyRates[from];
        const convertAmount = (amount * conversionRate).toFixed(2);
        result.textContent = `${amount} ${from} = ${convertAmount} ${to}`;
    } else {
        result.textContent = 'Пожалуйста заполни все поля.';
    }
};

convertButton.addEventListener('click', convertCurrency);

fetchCurrencyRates();