const result = document.querySelector("#result");
const form = document.querySelector("#currency-converter");
const errorLabel = document.querySelector("#error-label");

const urlNbp = "https://api.nbp.pl/api/exchangerates/tables/A";

const showError = () => {
  errorLabel.textContent = "Nie pobrano kursu walut!";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorLabel.textContent = "";

  const amount = event.target.amount.value;
  const selectedCurrency = event.target.currency.value;

  fetch(urlNbp)
    .then((response) => {
      if (!response.ok) {
        showError();
      }
      return response.json();
    })
    .then((data) => {
      if (data.length > 0 && data[0].rates) {
        const rates = {};
        data[0].rates.forEach((singleRate) => {
          rates[singleRate.code] = singleRate.mid;
        });
        const exchangeRate = rates[selectedCurrency];
        const resultExchange = amount * exchangeRate;
        result.textContent = `${resultExchange.toFixed(2)} PLN`;
      } else {
        showError();
      }
    })
    .catch(() => {
      showError();
    });
});
