import React, { useEffect, useState } from 'react';
import { millify } from '../utils/Millify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [loading, setLoading] = useState(false);
  const [cryptos, setCryptos] = useState();
  const [searchData, setSearchData] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const cryptoList = async() => {
    try {
      await axios.get(`http://localhost:8000/coins?limit=${count}`).then((res) => {
        setCryptos(res.data?.data?.coins);
        setLoading(false);
      })
    }
    catch {
      setLoading(true);
    }
  }

  const search = () => {
    axios.get(`http://localhost:8000/coins?limit=${count}`).then((res) => {
      setSearchData(res.data?.data?.coins);
    })
    const filteredData = searchData?.filter((item) => item.name.toLowerCase().includes(searchTerm));
    setCryptos(filteredData);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    if(searchTerm) {
      search();
    } 
    else {
      cryptoList();
    }
  }, [searchTerm]);

  if (loading) return <Loader />;

  return (
    <>  
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img alt="Crypto" className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: ${millify(currency.price)}</p>
                <p>Market Cap: ${millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
                <p>BTC Price: {currency.btcPrice}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;