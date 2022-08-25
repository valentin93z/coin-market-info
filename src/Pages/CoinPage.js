import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import CoinInfo from '../Components/CoinInfo';
import { LinearProgress, Typography } from '@mui/material';
import { numberWithCommas } from '../Components/Carousel';


const CoinPage = () => {

  const { id } = useParams();
  const { currency, symbol } = CryptoState();

  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  useEffect(() => {
    fetchCoin();
  }, [])


  if (!coin) return <LinearProgress color='primary' />

  return (
    <div className='coinContainer'>
      <div className='sidebar'>
        <img height='200px' style={{ marginBottom: 20 }} alt={coin?.name} src={coin?.image.large} />
        <Typography variant='h3' className='coinHeader'>{coin?.name}</Typography>
        <Typography variant='subtitle1' className='coinDescription' dangerouslySetInnerHTML={{ __html: coin?.description.en.split('. ')[0] + '.'}}></Typography>
        <div className='marketData'>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className='coinHeader'>Rank:</Typography>
            &nbsp;&nbsp;
            <Typography variant='h5' style={{ foontFamily: 'Montserrat' }}>{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className='coinHeader'>Current Price:</Typography>
            &nbsp;&nbsp;
            <Typography variant='h5' style={{ foontFamily: 'Montserrat' }}>
              {symbol}{' '}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className='coinHeader'>Market Cap:</Typography>
            &nbsp;&nbsp;
            <Typography variant='h5' style={{ foontFamily: 'Montserrat' }}>
              {symbol}{' '}
              {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage;