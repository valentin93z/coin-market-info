import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { Chart, Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Title);

const CoinInfo = ({ coin }) => {

  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  }

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
});

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='chartContainer'>
        {
          !historicalData ? (
            <CircularProgress color='primary' size={250} thickness={1} />
          ) : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time = date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    label: `Price (Past ${days} Days) in ${currency}`,
                    data: historicalData.map((coin) => coin[1]),
                    borderColor: '#EEBC1D',
                  }
                ]
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  }
                }
              }}
            />
            <div style={{
              display: 'flex',
              width: '100%',
              marginTop: 20,
              justifyContent: 'space-around',
            }}>
                {chartDays.map((day) => (
                  <SelectButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
            </div>
          </>
          )
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo;