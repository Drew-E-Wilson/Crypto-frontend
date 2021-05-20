import {useEffect, useState } from 'react';
// import {Chart} from 'chart.js';
import {Line} from 'react-chartjs-2';

export default function DisplayPage(props) {

    const [cryptoData, setCryptoData] = useState([]);
    const [cryptoChartData, setCryptoChartData] = useState({prices: [[]] });
    const [savePage, setSavePage] = useState({
      name: `${props.match.params.CryptoId}`,
      url: `http://localhost:3000/crypto/${props.match.params.CryptoId}`,
    });
    const [savedCryptoData, setSavedCryptoData] = useState("")
    const savedId = props.match.params.id;
  


    const url = `http://localhost:3000/crypto/${props.match.params.CryptoId}`;
  
    const checkFavoritedApi = async (e) => {
      e.preventDefault()
      try {
        const response = await fetch(`http://localhost:8000/users/favoritedPages`);
        const data = await response.json();
        
        console.log(data);
        const apiID = data.filter(favorited => favorited.name === savePage.name)
        console.log(apiID)
        apiID[0] ? getFavortiedIdFromFavoriteApi(e) : addFavoritedIdToDatabase(e)
      } catch (error) {
        console.log(error);
      }
    }
  
  
    const addFavoritedIdToDatabase = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(
          `http://localhost:8000/favoritedPages/`,
          {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          ///////create a body thats an object containing the information needed to put at the backend
          body: JSON.stringify({
            name: savePage.name,
            url: savePage.url
          })
          }
        );
        const data = await response.json();
        console.log(data)
        await getFavortiedIdFromFavoriteApi(e)
  
      } catch (error) {
        console.error(error);
      }
    }
    console.log(window.localStorage)



    const getFavortiedIdFromFavoriteApi = async (e) => {
      e.preventDefault()
      try {
        const response = await fetch(`http://localhost:8000/favoritedPages/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + window.localStorage.getItem("token")
          }
        });
        const data = await response.json();
        
        console.log(data);
        const apiID = data.filter(favorited => favorited.name === savePage.name)
        setSavedCryptoData(apiID[0]._id)
        console.log(apiID)
      } catch (error) {
        console.log(error);
      }
    }
  
    const addFavoritedToUser = async (e) => {
  
      try {
        const response = await fetch(
          `http://localhost:8000/users/addFavoritedPage/${savedCryptoData}/${window.localStorage.getItem("username")}`,
          {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + window.localStorage.getItem("token")
          }
          }
        );
        const data = await response.json();
        console.log(data)
  
      } catch (error) {
        console.error(error);
      }
    }
  
  
  
    const fetchCrypto = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setSavePage(data);
        console.log('Fetched');
      } catch (error) {
        console.log(error);
      }
    };
  
    // const normalText = /(<([^>]+)>)/ig;
  
    useEffect(() => {
      fetchCrypto();
    }, [props]);

    useEffect(() => {
      if(savedCryptoData.split("").length > 0){
        addFavoritedToUser()
      }
    }, [savedCryptoData])


  const handleChange = (e) => {
    setSavePage({ ...savePage, [e.target.id]: e.target.value });
  };

  console.log(savePage)








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
          // console.log(JSON.stringify(data, null, 4));
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        ChartCryptoData();
      },[]);
    

      const chartPricing = cryptoChartData.prices
    // console.log(JSON.stringify(chartPricing, null, 4));
    

    const mapChartPricing = chartPricing.map((data) => {
        // console.log(JSON.stringify(data[1], null, 4));
        for ( let i = 0; i < data.length; i += 9) {
            return data[1]
            }
    })
    // console.log(mapChartPricing)



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
      console.log(JSON.stringify(data, null, 4));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    DisplayCryptoData();
  },[]);


//   if (chartPricing === undefined) {
//     return <h1>loading ...</h1>
//   } else if (mapChartPricing === undefined) {
//     return <h1>loading ...</h1>
//   }


  if (cryptoData === undefined) {
    return <h1>loading ...</h1>
  } else if (cryptoData.description === undefined) {
    return <h1>loading ...</h1>
  } else if (cryptoData.description.en === undefined) {
    return <h1>loading ...</h1>
  }  



  const labels = [
    'Day 7',
    "",
    "",
    'Day 6',
    "",
    "",
    'Day 5',
    "",
    "",
    'Day 4',
    "",
    "",
    'Day 3',
    "",
    "",
    'Day 2',
    "",
    "",
    'Current',
  ];

  const dataSet = {
    labels: labels,
    datasets: [{
      label: `${cryptoData.name} Price`,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45, 60],
    //   data: `${mapChartPricing}`,
    }]
  };



  const regex = /(<([^>]+)>)/ig;

    return (
        <div>
            <div>
                <h1>{cryptoData.name}</h1>
                <button onClick={checkFavoritedApi}>Like</button>
                <img src={cryptoData.image.small} alt="crypto coin symbol"></img>
                <h2>{cryptoData.symbol.toUpperCase()}</h2>
            </div>
            <div>
                <Line
                    data={dataSet}
                    options={{
                        title:{
                        display:true,
                        fontSize:20
                        },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}
                />
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