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
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    DisplayCryptoData();
  }, []);

    return (
        <div>
            {cryptoData.name}
        </div>
    )
}