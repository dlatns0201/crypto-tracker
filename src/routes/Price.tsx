import React from 'react';
import {fetchCoinTickers} from "../api";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import styled from "styled-components";

interface IRouteParams {
  coinId: string;
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

const PriceWrapper = styled.ol`
  display: flex;
  flex-direction: column;
`;

const PriceItem = styled.li`
  display: flex;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  padding: 12px 18px 10px;
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.textColor};
  
  span {
    flex: 1 1 0;
  }
  
  .item_def {
    font-weight: bold;
  }
  
  .item_desc {
    font-weight: 500;
    
    &.as_positive {
      color: #1f2;
    }
    
    &.as_negative {
      color: #f21;
    }
  }
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price() {
  const { coinId } = useParams<keyof IRouteParams>() as IRouteParams;
  const {isLoading, data} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));

  console.log(data);
  return (
    <Container>
      {isLoading ? "Loading..." :
        data ?
          <PriceWrapper>
            <PriceItem>
              <span className="item_def">Price : </span>
              <span className="item_desc">${data?.quotes.USD.ath_price.toFixed(3)}</span>
            </PriceItem>
            <PriceItem>
              <span className="item_def">Percent Change 1hours : </span>
              <span className={`item_desc ${data?.quotes.USD.percent_change_1h > 0 ? 'as_positive' : 'as_negative'}`}>{data?.quotes.USD.percent_change_1h}%</span>
            </PriceItem>
            <PriceItem>
              <span className="item_def">Percent Change 6hours : </span>
              <span className={`item_desc ${data?.quotes.USD.percent_change_6h > 0 ? 'as_positive' : 'as_negative'}`}>{data?.quotes.USD.percent_change_6h}%</span>
            </PriceItem>
            <PriceItem>
              <span className="item_def">Percent Change 1Days : </span>
              <span className={`item_desc ${data?.quotes.USD.percent_change_24h > 0 ? 'as_positive' : 'as_negative'}`}>{data?.quotes.USD.percent_change_24h}%</span>
            </PriceItem>
            <PriceItem>
              <span className="item_def">Percent Change 7Days : </span>
              <span className={`item_desc ${data?.quotes.USD.percent_change_7d > 0 ? 'as_positive' : 'as_negative'}`}>{data?.quotes.USD.percent_change_7d}%</span>
            </PriceItem>
            <PriceItem>
              <span className="item_def">percent_change_30m : </span>
              <span className={`item_desc ${data?.quotes.USD.percent_change_30m > 0 ? 'as_positive' : 'as_negative'}`}>{data?.quotes.USD.percent_change_30m}%</span>
            </PriceItem>
          </PriceWrapper>
        : null
      }
    </Container>
  )
}

export default Price;