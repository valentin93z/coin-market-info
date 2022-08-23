import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { CryptoState } from '../CryptoContext';


const Header = () => {

    const navigate = useNavigate();

    const { currency, setCurrency } = CryptoState();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark'
        }
    });

  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography
                        className='title'
                        onClick={() => navigate('/')}
                        variant='h6'
                    >
                        Coin Market
                    </Typography>

                    <Select
                        variant='outlined'
                        style={{
                            width: 100,
                            height: 40,
                            marginLeft: 15
                        }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'EUR'}>EUR</MenuItem>
                        <MenuItem value={'RUB'}>RUB</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    </ThemeProvider>
  )
}

export default Header;