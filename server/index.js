import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));

app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.json({
    "error":{
      "code": 422,
      "message": "ERR_BAD_REQUEST"
    }
  });
});

app.get('/coins', (req, res) => {
  const limit = req.query.limit;
  const options = {
    method: 'GET',
    url: `${process.env.CRYPTO_API_URL}/coins`,
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: `${limit}`,
      offset: '0',
    },
    headers: {
      'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
      'X-RapidAPI-Host': `${process.env.CRYPTO_RAPIDAPI_HOST}`
    }
  };
  
  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    res.status(422).json({
      "error":{
        "code": 422,
        "message": "ERR_BAD_REQUEST"
      }
    });
  });
});

app.get('/coin', (req, res) => {
  const coinId = req.query.q;
  const options = {
    method: 'GET',
    url: `${process.env.CRYPTO_API_URL}/coin/${coinId}`,
    params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h'},
    headers: {
      'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
      'X-RapidAPI-Host': `${process.env.CRYPTO_RAPIDAPI_HOST}`
    }
  };
  
  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    res.status(422).json({
      "error":{
        "code": 422,
        "message": "ERR_BAD_REQUEST"
      }
    });
  });
})

app.get('/history', (req, res) => {
  const coinId = req.query.q;
  const timePeriod = req.query.timePeriod;
  const options = {
    method: 'GET',
    url: `${process.env.CRYPTO_API_URL}/coin/${coinId}/history`,
    params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: `${timePeriod}`},
    headers: {
      'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
      'X-RapidAPI-Host': `${process.env.CRYPTO_RAPIDAPI_HOST}`
    }
  };
  
  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    res.status(422).json({
      "error":{
        "code": 422,
        "message": "ERR_BAD_REQUEST"
      }
    });
  });
})

app.get('/news', (req, res) => {
  const newsCategory = req.query.newsCategory;
  const count = req.query.count;
  const options = {
    method: 'GET',
    url: `${process.env.NEWS_API_URL}/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
      'X-RapidAPI-Host': `${process.env.NEWS_RAPIDAPI_HOST}`
    }
  };

  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    res.status(422).json({
      "error":{
        "code": 422,
        "message": "ERR_BAD_REQUEST"
      }
    });
  });
})

app.listen(process.env.PORT|| 5000);
