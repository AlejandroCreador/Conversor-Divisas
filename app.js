const form = document.getElementById('converter-form');
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const resultDiv = document.getElementById('result');
const toggleThemeButton = document.getElementById('toggle-theme');
const toggleLangButton = document.getElementById('toggle-lang');

// Lista de monedas
const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

// Traducción
const translations = {
    en: {
        title: "Currency Converter",
        labelAmount: "Amount:",
        labelFrom: "From:",
        labelTo: "To:",
        convertButton: "Convert"
    },
    es: {
        title: "Conversor de Monedas",
        labelAmount: "Cantidad:",
        labelFrom: "De:",
        labelTo: "A:",
        convertButton: "Convertir"
    }
};

let currentLang = 'en'; // Idioma inicial

// Inserta las opciones en los selects
currencies.forEach(currency => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
});

// Cambiar el tema
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

// Cambiar el idioma
toggleLangButton.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    translateApp();
});

function translateApp() {
    document.getElementById('title').textContent = translations[currentLang].title;
    document.getElementById('label-amount').textContent = translations[currentLang].labelAmount;
    document.getElementById('label-from').textContent = translations[currentLang].labelFrom;
    document.getElementById('label-to').textContent = translations[currentLang].labelTo;
    document.getElementById('convert-button').textContent = translations[currentLang].convertButton;
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Llama a la API para obtener la tasa de cambio
    convertCurrency(amount, from, to);
});

async function convertCurrency(amount, from, to) {
    const apiKey = 'TU_API_KEY';  // Reemplaza esto con tu API Key de OpenExchangeRates
    const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=${from}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.rates[to];
        if (!rate) {
            resultDiv.textContent = currentLang === 'en' ? 'Exchange rate not available' : 'Tasa de cambio no disponible';
            return;
        }
        const convertedAmount = (amount * rate).toFixed(2);
        resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        resultDiv.textContent = currentLang === 'en' ? 'Error fetching exchange rate' : 'Error al obtener la tasa de cambio';
    }
}

// Traducción inicial
translateApp();
