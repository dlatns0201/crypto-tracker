import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "../atoms";

interface IProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: IProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId));
  const isDarkMode = useRecoilValue(isDarkAtom);
  console.log(data);
  return (
    <div>
      {
        isLoading ? (
          "Loading chart..."
        ): (
          <ReactApexChart
            type="candlestick"
            series={[
              {
                data: data?.map(price => ({
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close].map(p => p.toFixed(2))
                }))
              }
            ]}
            options={{
              theme: {
                mode: isDarkMode ? 'dark' : 'light'
              },
              chart: {
                height: 300,
                width: 500,
              },
              grid: {
                show: false
              },
              stroke: {
                curve: 'smooth',
                width: 2
              },
              yaxis: {
                show: true,
                labels: {
                  formatter: v => String(Math.floor(v))
                }
              },
              xaxis: {
                labels: {
                  show: true
                },
                axisBorder: {
                  show: true
                },
                type: 'datetime',
              },
              tooltip: {
                y: {
                  formatter: v => `${v.toFixed(3)}`
                }
              }
            }}
            />
        )
      }
    </div>
  );
}

export default Chart;