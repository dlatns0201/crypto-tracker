import React, {useEffect, useMemo, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import {useQuery} from "react-query";
import {fetchCoins} from "../api";
import {Helmet} from "react-helmet";
import {MAX_CONTAINER_WIDTH} from "../constants";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: ${MAX_CONTAINER_WIDTH};
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background: white;
  margin-bottom: 20px;
  border-radius: 15px;
  color: ${props => props.theme.textColor};
  
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

function Coins() {
  const { isLoading, data: coinsData } = useQuery<ICoin[]>('allCoins', fetchCoins);
  const coins = useMemo(() => coinsData?.slice(0, 100), [coinsData]);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ): (
        <CoinsList>
          {coins?.map(coin => (
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
              }}
              state={{ name: coin.name }}
              >
                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;