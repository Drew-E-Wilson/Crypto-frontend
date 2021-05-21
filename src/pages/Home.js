import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'

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
        <div className={styles.header_description}>
          <h2>Welcome To CryptoTalk</h2>
          <h3>Up to date information and stats on your favorite crypto currencies.</h3>
        </div>
        {homeCryptoData.map((crypto) => {
          return (
            <div className={styles.homepage_container} key={uuidv4()}>
                <Link to={`crypto/${crypto.id.toLowerCase()}`}>
                  <div className={styles.main_data_container}>
                    <div className={styles.first_container}>
                      <h2 className={styles.individual_stats_name}>{crypto.name}</h2>
                      <h4 className={styles.individual_stats}>Price: ${crypto.current_price}</h4>
                      <h4 className={styles.individual_stats}>24hr high/low: ${crypto.high_24h}/${crypto.low_24h}</h4>
                      <h4 className={styles.individual_stats}>24hr: {crypto.market_cap_change_percentage_24h}%</h4>
                    </div>
                  </div>
                </Link>
            </div>
          )
        })}
    </div>
  );
};