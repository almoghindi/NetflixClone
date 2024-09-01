export const convertUSDtoILS = async (amountInUSD: number) => {
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD"
  ); // Example API endpoint
  console.log(response);
  const data = await response.json();

  const exchangeRate = data.rates.ILS; // Get the exchange rate for ILS
  const amountInILS = amountInUSD * exchangeRate; // Convert USD to ILS

  return amountInILS.toFixed(2).toString();
};
