import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { CryptoCurrencies, News } from '.';
import { millify } from '../utils/Millify';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const [loading, setLoading] = useState(false);;
  const [globalStats, setGlobalStats] = useState({});

  const count = 10;
  
  useEffect(() => {
    setLoading(true);
    const fetchGlobalStats = async() => {
      try {
        await axios.get(`http://localhost:8000/coins?limit=${count}`).then((res) => {
          setGlobalStats(res.data?.data?.stats);
        });
        setLoading(false);
      }
      catch {
        setLoading(true);
      }
    }
    
    fetchGlobalStats();
  },[])
  
  if(loading) return <Loader />;

  return (
    <>
    <Title level = {2} className ="heading"> Global Crypto Statistics </Title>
    <Row>
      <Col span ={12}><Statistic title = "Total Cryptocurrencies" value= {globalStats.totalCoins} /></Col>
      <Col span ={12}><Statistic title = "Total Exchanges" value= {globalStats.totalExchanges}/></Col>
      <Col span ={12}><Statistic title = "Total Market Cap" value= {`$${millify(globalStats.totalMarketCap)}`} /></Col>
      <Col span ={12}><Statistic title = "Total 24h Volume" value= {`$${millify(globalStats.total24hVolume)}`} /></Col>
      <Col span ={12}><Statistic title = "Total Markets" value= {millify(globalStats.totalMarkets)}/></Col>
    </Row>
    <div className="home-heading-container">
      <Title level={2} className="home-title">Top 10 CryptoCurrencies in the world</Title>
      <Title level={3} className="show-more"><Link to ="/cryptocurrencies">Show More</Link></Title>
    </div>
    <CryptoCurrencies simplified />
    <div className="home-heading-container">
      <Title level={2} className="home-title">Latest Crypto News</Title>
      <Title level={3} className="show-more"><Link to ="/news">Show More</Link></Title>
    </div>
    <News simplified/>
    </>
  )
}

export default Homepage;