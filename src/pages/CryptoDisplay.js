import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './CryptoDisplay.module.css';

export default function DisplayPage(props) {

  const [cryptoData, setCryptoData] = useState([]);
  const [cryptoChartData, setCryptoChartData] = useState({ prices: [[]] });
  const [savePage, setSavePage] = useState({
    name: `${props.match.params.CryptoId}`,
    url: `/crypto/${props.match.params.CryptoId.toLowercase()}`,
  });
  const [savedCryptoData, setSavedCryptoData] = useState("")
  const [getTime, setGetTime] = useState([])


  const getDate1 = () => {
    let today = new Date()
    let day1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    return {
      currentDate: day1
    }
  }
  const getDate2 = () => {
    let today = new Date()
    let day2 = (today.getDate() - 1) + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    return {
      currentDate: day2
    }
  }
  const getDate3 = () => {
    let today = new Date()
    let day3 = (today.getDate() - 2) + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    return {
      currentDate: day3
    }
  }
  const getDate4 = () => {
    let today = new Date()
    let day4 = (today.getDate() - 3) + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    return {
      currentDate: day4
    }
  }
  const getDate5 = () => {
    let today = new Date()
    let day5 = (today.getDate() - 4) + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    return {
      currentDate: day5
    }
  }
  const getDate6 = () => {
    let today = new Date()
    let day6 = (today.getDate() - 5) + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    return {
      currentDate: day6
    }
  }
  const getDate7 = () => {
    let today = new Date()
    let day7 = (today.getDate() - 6) + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    return {
      currentDate: day7
    }
  }

  const day1 = getDate1().currentDate
  const day2 = getDate2().currentDate
  const day3 = getDate3().currentDate
  const day4 = getDate4().currentDate
  const day5 = getDate5().currentDate
  const day6 = getDate6().currentDate
  const day7 = getDate7().currentDate

  const sevenDays = [day1, day2, day3, day4, day5, day6, day7]
  const getThatDates = []


  const labels = [
    `${day7}`,
    `${day6}`,
    `${day5}`,
    `${day4}`,
    `${day3}`,
    `${day2}`,
    `${day1}`
  ];

  const [dataSet, setDataSet] = useState(
    {
      labels: labels,
      datasets: [{
        label: `${cryptoData.name} 7 day Price Recap`,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: []
      }]
    }
  )

  const url = `/crypto/${props.match.params.CryptoId.toLowercase()}`;

  const checkFavoritedApi = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://capstoneback.herokuapp.com/users/favoritedPages`);
      const data = await response.json();
      const apiID = data.filter(favorited => favorited.name === savePage.name)
      apiID[0] ? getFavortiedIdFromFavoriteApi(e) : addFavoritedIdToDatabase(e)
    } catch (error) {
      console.log(error);
    }
  }


  const addFavoritedIdToDatabase = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://capstoneback.herokuapp.com/favoritedPages/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: savePage.name,
            url: savePage.url
          })
        }
      );
      const data = await response.json();
      await getFavortiedIdFromFavoriteApi(e)

    } catch (error) {
      console.error(error);
    }
  }

  const getFavortiedIdFromFavoriteApi = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://capstoneback.herokuapp.com/favoritedPages/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
      });
      const data = await response.json();
      const apiID = data.filter(favorited => favorited.name === savePage.name)
      setSavedCryptoData(apiID[0]._id)
    } catch (error) {
      console.log(error);
    }
  }

  const addFavoritedToUser = async (e) => {

    try {
      const response = await fetch(
        `https://capstoneback.herokuapp.com/users/addFavoritedPage/${savedCryptoData}/${window.localStorage.getItem("username")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + window.localStorage.getItem("token")
          }
        }
      );
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  const fetchCrypto = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSavePage(data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchCrypto();
  }, [props]);


  useEffect(() => {
    if (savedCryptoData.split("").length > 0) {
      addFavoritedToUser()
    }
  }, [savedCryptoData])


  //API data for Chart
  const ChartCryptoData = async () => {
    try {
      const res = await fetch(`https://coingecko.p.rapidapi.com/coins/${props.match.params.CryptoId}/market_chart?vs_currency=usd&days=7`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
          "x-rapidapi-host": "coingecko.p.rapidapi.com"
        }
      })
      const data = await res.json();
      setCryptoChartData(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    ChartCryptoData();
  }, []);


  // Bulk data for Page
  const DisplayCryptoData = async () => {
    try {
      const res = await fetch(`https://coingecko.p.rapidapi.com/coins/${props.match.params.CryptoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
          "x-rapidapi-host": "coingecko.p.rapidapi.com"
        }
      })
      const data = await res.json();
      setCryptoData(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    DisplayCryptoData();
  }, []);


  const callChartApi = async (theDay) => {
    try {
      const res = await fetch(`https://coingecko.p.rapidapi.com/coins/${props.match.params.CryptoId}/history?date=${theDay}]&localization=false`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
          "x-rapidapi-host": "coingecko.p.rapidapi.com"
        }
      })
      const data = await res.json();
      getThatDates.push(data.market_data.current_price.usd)
      setDataSet({
        labels: labels,
        datasets: [{
          label: `${cryptoData.name} 7 day Price Recap`,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: getThatDates
        }]
      })

    } catch (error) {
      console.log(error);
    }
  }
  function getChartDates() {
    for (let i = 0; i < sevenDays.length; i++) {
      callChartApi(sevenDays[i])
    }
  }

  useEffect(() => {
    getChartDates();
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
      <div className={styles.name_display}>
        <h1>{cryptoData.name}</h1>

        <img src={cryptoData.image.small} alt="crypto coin symbol"></img>
        <button className={styles.favorite_button} onClick={checkFavoritedApi}>Favorite</button>
      </div>
      <div className={styles.chart_holder}>
        <div className={styles.chart}>
          <Bar
            data={dataSet}
            options={{
              title: {
                display: true,
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </div>
      </div>
      <div className={styles.left_right}>
        <div>
          <div className={styles.description}>
            <h3>What is {cryptoData.name}?</h3>
            <p>
              {cryptoData.description.en.replace(regex, '')}
            </p>
            <h4>External Links:</h4>
            <div className={styles.site_links}>
              <a href={cryptoData.links.homepage}><h4>{cryptoData.links.homepage}</h4></a>
              <a href={cryptoData.links.homepage}><h4>{cryptoData.links.official_forum_url}</h4></a>
            </div>
          </div>

        </div>
        <div className={styles.data_container}>
          <h2>{cryptoData.symbol.toUpperCase()} Price Stats</h2>
          <h2>{getDate1().currentDate}</h2>
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
      </div>
    </div>
  )
}