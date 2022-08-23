import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../config/api';
import { CryptoState } from '../CryptoContext';


export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {

    const [trending, setTrending] = useState([]);

    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }

    useEffect(() => {
      fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin) => {
        const profit = coin.price_change_percentage_24h >= 0;
      return (
        <Link
          to={`/coins/${coin.id}`}
          className='carouselItem'
        >
          <img src={coin?.image} alt={coin.name} height='80' style={{ marginBottom: 10 }} />
          <span style={{ fontWeight: '500' }}>
            {coin?.symbol}
            &nbsp;
            <span style={{ color: profit ? 'rgb(14, 203, 129)' : 'red', fontWeight: '500' }}>
              {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <span style={{ fontSize: 22, fontWeight: 'bold' }}>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
        </Link>
      )
    })

    const responsive = {
      0: {
        items: 2,
      },
      550: {
        items: 3,
      },
      800: {
        items: 4,
      },
    }

  
  return (
    <div className='carousel'>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
    </div>
  )
}

export default Carousel;