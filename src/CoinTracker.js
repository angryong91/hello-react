import React, { useEffect, useState } from "react";

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState(); // 선택된 코인을 상태로 관리합니다.
  const [myAmount, setMyAmount] = useState(0);

  // select에서 코인을 선택했을 때 호출되는 함수
  const onChangeCoin = (event) => {
    const selectedCoin = coins.find((c) => c.name === event.target.value); // 선택된 코인을 찾습니다.
    setCoin(selectedCoin); // 선택된 코인을 상태로 설정합니다.
  };

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
        <label>Dollar</label>
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
        <select value={coin ? coin.name : ""} onChange={onChangeCoin}>
          {/* 선택된 코인을 표시하기 위해 option 태그에 value를 설정합니다. */}
          {coins.map((coin, index) => (
            <option key={index} value={coin.name}>
              {/* 코인의 이름과 심볼을 표시합니다. */}
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default CoinTracker;
