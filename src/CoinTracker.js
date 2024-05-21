import { useEffect, useState } from "react";

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState();
  const onChangeCoin = (event) => setCoin(event.target.value);
  const [myAmount, setMyAmount] = useState(0);
  const onChange = (event) => setMyAmount(event.target.value);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      <div>
        <label>Dolloar</label>
        <input value={myAmount} onChange={onChange} />
      </div>
      {coin ? (
        <div>
          <label>{coin.name}</label>
          <input value={myAmount / coin.quotes.USD.price} />
        </div>
      ) : null}
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select value={coin} onChange={onChangeCoin}>
          {coins.map((coin, index) => (
            <option key={index}>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default CoinTracker;
