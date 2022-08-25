import { Container, createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Carousel';

const CoinsTable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const { currency, symbol } = CryptoState();
    const navigate = useNavigate();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        }
    })

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        ))
    }

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: 'center' }}>
            <Typography variant='h4' style={{ margin: 18, fontFamily: 'Montserrat' }}>
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField
                label='Search for a Crypto Currency...'
                variant='outlined'
                fullWidth
                style={{marginBottom: 20}}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <TableContainer className='tableContainer'>
                {
                    loading ? (
                        <LinearProgress color='primary' />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: '#EEBC1D' }} className='tableHead'>
                                <TableRow>
                                    {
                                        ['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                                            <TableCell
                                                style={{ color: 'black', fontWeight: 700, fontFamily: 'Montserrat' }}
                                                key={head}
                                                align={head === 'Coin' ? 'left' : 'right'}
                                            >
                                                {head}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow key={row.name} className='row' onClick={() => navigate(`/coins/${row.id}`)}>
                                                <TableCell component='th' scope='row' style={{ display: 'flex', gap: 15 }}>
                                                    <img alt={row.name} src={row?.image} height='50' style={{ marginBottom: 10 }} />
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ textTransform: 'uppercase', fontSize: 22, fontFamily: 'Montserrat' }}>{row.symbol}</span>
                                                        <span style={{ color: 'darkgrey', fontFamily: 'Montserrat' }}>{row.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align='right' style={{ fontFamily: 'Montserrat' }}>
                                                    {symbol}{' '}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell align='right' style={{ fontWeight: 500, fontFamily: 'Montserrat', color: profit > 0 ? 'rgb(14, 203, 129)' : 'red' }}>
                                                    {profit && '+'}{row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell align='right' style={{ fontFamily: 'Montserrat' }}>
                                                    {symbol}{' '}
                                                    {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            <Pagination
                count={(handleSearch()?.length / 10).toFixed(0)}
                className='pagination'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    padding: 20,
                    color: 'gold'
                }}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable;