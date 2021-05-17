import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

export default function HomePage() {

    const [homeCryptoData, setHomeCryptoData] = useState([]);

    // Home page display API
    const homePageCryptoData = async () => {
        try {
          const res = await fetch("https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=100&order=market_cap_desc", {
            "method": "GET",
            "headers": {
              "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
              "x-rapidapi-host": "coingecko.p.rapidapi.com"
            }
          })
          const data = await res.json();
          // console.log(data)
          setHomeCryptoData(data)
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(() => {
        homePageCryptoData();
      }, []);


  return (
    <div>
        <h1>Hello World</h1>
        {homeCryptoData.map((crypto) => {
          console.log(crypto)
          return (
            <div key={uuidv4()}>
                <Link to={`crypto/${crypto.id.toLowerCase()}`}>
                    <h2>{crypto.name}</h2>
                </Link>
            </div>
          )
        })}
    </div>
  );
};