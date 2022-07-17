import React from 'react'
import { Link, Route, Routes} from "react-router-dom";
import { Layout, Typography, Space } from 'antd';
import { Navbar, Homepage, CryptoCurrencies, News, CryptoDetails } from './components';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path ='/' exact element = {<Homepage/>}/>
              <Route path ='/cryptocurrencies' exact element = {<CryptoCurrencies/>}/>
              <Route path ='/crypto/:coinId' exact element = {<CryptoDetails/>}/>
              <Route path ='/news' exact element = {<News/>}/>
              <Route path="*" exact element={<Homepage/>} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center'}}> Copyright © 2022
            CryptoWorld <br/>
            All right reserved
          </Typography.Title>
          <Space>
            <Link to = "/">Home</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App;