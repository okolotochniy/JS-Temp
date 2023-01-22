const API_KEY = "09db43ad45f9dc8fc4230a081eec9ed5e24398e2960c471d43f0f1cd2abccd97";

// Сделать через URLSearchParams
export const loadTicker = (tickerName) => fetch(
  `https://min-api.cryptocompare.com/data/price?fsym=${tickerName}&tsyms=USD&api_key=${API_KEY}`
  ).then((resp) => resp.json());

export const getAllTickers = () => fetch(
  "https://min-api.cryptocompare.com/data/all/coinlist?summary=true"
).then((resp) => resp.json())
  .then((data) => Object.keys(data.Data));