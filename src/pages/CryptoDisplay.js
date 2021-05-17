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



  const remover = /(<([^>]+)>)/ig;

    return (
        <div>
            <div>
                {cryptoData.name}
            </div>
            <div>
                {cryptoData.description.en.replace(remover, '')}

                {/* {description.map((data) => {
                    console.log(data)
                })} */}
                
                {/* {description.map((crypto) => {
                    console.log(crypto)
                    return crypto.map((des) => {
                        console.log(des)
                        return (
                          <div>1</div>
                        )
                      })
                })} */}

                {/* {description.map((crypto) => {
                    console.log(JSON.stringify(crypto, null, 4));
                    return (
                        <div>1</div>
                    )})} */}



            </div>
        </div>
    )
}