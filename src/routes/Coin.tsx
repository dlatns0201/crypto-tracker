import React, {useEffect, useState} from 'react';
import {Link, useLocation, useMatch, useParams, Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import Price from "./Price";
import Chart from "./Chart";
import {useQuery} from "react-query";
import {fetchCoinInfo, fetchCoinTickers} from "../api";
import {Helmet} from "react-helmet";
import {useSetRecoilState} from "recoil";
import {isDarkAtom} from "../atoms";
import {MAX_CONTAINER_WIDTH} from "../constants";

interface IRouteParams {
  coinId: string;
}

interface IRouteState {
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface IPriceData {
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

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 30px 20px;
  max-width: ${MAX_CONTAINER_WIDTH};
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  span:first-child {
    font-size: 10px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.5);
  padding: 7px 0;
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  
  a {
    display: block;
  }
`;

function Coin() {
  const { coinId } = useParams<keyof IRouteParams>() as IRouteParams;
  const location = useLocation();
  const routeState = location.state as IRouteState;
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(['info', coinId], () => fetchCoinInfo(coinId));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(['tickers', coinId], () => fetchCoinTickers(coinId), {
    refetchInterval: 5000
  });


  const isLoading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>{routeState?.name ? routeState.name : isLoading ? 'Loading...' : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>
          {routeState?.name ? routeState.name : isLoading ? 'Loading...' : infoData?.name}
        </Title>
      </Header>
      {isLoading ? <Loader>Loading...</Loader> : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to='chart'>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to='price'>Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path='price' element={<Price />} />
            <Route path='chart' element={<Chart coinId={coinId} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;