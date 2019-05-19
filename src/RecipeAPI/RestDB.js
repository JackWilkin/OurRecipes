import axios from 'axios';

// CORS enabled apikey
const apikey = '5aa5d596f0a7555103cea3c8';

// Autotrade delay
const tradeDelay = 5000; // millis

// TODO: make endpoint variables for all resources
// REST endpoint
const restdb = axios.create({
  baseURL: 'https://llfrecipes-6c4b.restdb.io/rest/',
  timeout: 100000,
  headers: { 'x-apikey': apikey },
});

// Eventource endpoint
// const realtimeURL = 'https://llfrecipes-6c4b.restdb.io/rest/realtime?apikey=${apikey}';

export { apikey, restdb, tradeDelay };
