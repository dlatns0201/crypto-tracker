const BASE_URL = 'https://api.coinpaprika.com/v1';

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`)
    .then(res => res.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`)
    .then(res => res.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`)
    .then(res => res.json());
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); // current Second
  const startDate = endDate - 60 * 60 * 24 * 7;  // before 1weekend based on current Time

  return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
    .then(res => res.json());
}