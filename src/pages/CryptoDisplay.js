import {useEffect, useState } from 'react';

export default function DisplayPage(props) {

    const [cryptoData, setCryptoData] = useState([]);

  // using search bar API
  const DisplayCryptoData = async () => {
    try { 
      const res = await fetch(`https://coingecko.p.rapidapi.com/coins/${props.match.params.CryptoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
          "x-rapidapi-host": "coingecko.p.rapidapi.com"
        //   `${process.env.REACT_APP_API_KEY}`
        }
      })
      const data = await res.json();
      setCryptoData(data)
      console.log(JSON.stringify(data, null, 4));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    DisplayCryptoData();
  }, []);


  if (cryptoData === undefined) {
    return <h1>loading ...</h1>
  } else if (cryptoData.description === undefined) {
    return <h1>loading ...</h1>
  } else if (cryptoData.description.en === undefined) {
    return <h1>loading ...</h1>
  }


  const regex = /(<([^>]+)>)/ig;

    return (
        <div>
            <div>
                <h1>{cryptoData.name}</h1>
                <img src={cryptoData.image.small}></img>
                <h2>{cryptoData.symbol.toUpperCase()}</h2>
            </div>
            <div>
                <h5><a href={cryptoData.links.homepage}>{cryptoData.links.homepage}</a></h5>
                <h5><a href={cryptoData.links.official_forum_url}>{cryptoData.links.official_forum_url}</a></h5>
            </div>
            <div>
                <h3>Current price: ${cryptoData.market_data.current_price.usd}</h3>
                <h3>Market Cap rank: {cryptoData.market_cap_rank}</h3>
                <h3>Market Cap: ${cryptoData.market_data.market_cap.usd}</h3>
                <h3>All time high: ${cryptoData.market_data.ath.usd}</h3>
                <h3>Total volume: ${cryptoData.market_data.total_volume.usd}</h3>
                <h3>24h high: ${cryptoData.market_data.high_24h.usd}</h3>
                <h3>24h low: ${cryptoData.market_data.low_24h.usd}</h3>
                <h3>24h price change: ${cryptoData.market_data.price_change_24h_in_currency.usd}</h3>
                <h3>24h percent change: {cryptoData.market_data.price_change_percentage_24h}%</h3>
                <h3>7 day percent change: {cryptoData.market_data.price_change_percentage_7d}%</h3>
                <h3>14 day percent change: {cryptoData.market_data.price_change_percentage_14d}%</h3>
                <h3>30 day percent change: {cryptoData.market_data.price_change_percentage_30d}%</h3>
                <h3>1 year percent change: {cryptoData.market_data.price_change_percentage_1y}%</h3>
                <h3>Circulating Supply: {cryptoData.market_data.circulating_supply} coins</h3>
            </div>
            <div>
                <p>
                    {cryptoData.description.en.replace(regex, '')}
                </p>
            </div>
        </div>
    )
}