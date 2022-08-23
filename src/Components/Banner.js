import { Container, Typography } from '@mui/material';
import React from 'react';
import Carousel from './Carousel';

const Banner = () => {
  return (
    <div className='banner'>
        <Container className='bannerContainer'>
            <div className='tagline'>
                <Typography
                    variant='h2'
                    style={{
                        fontWeight: 'bold',
                        marginBottom: 15,
                        fontFamily: 'Montserrat',
                    }}
                >
                    Coin Market
                </Typography>
                <Typography
                    variant='subtitle2'
                    style={{
                        color: 'darkgrey',
                        fontFamily: 'Montserrat'
                    }}
                >
                    Get All The Info Regarding Your Favorite Crypto Currency
                </Typography>
            </div>
            <Carousel />
        </Container>
    </div>
  )
}

export default Banner;