require('dotenv').config({ path: __dirname + '/.env' });

const cityFeeder = require('./scripts/cityFeeder');

console.log('Starting city feeder...');
cityFeeder.feedAllCities()
    .then(() => console.log('Done feeding'))
    .catch(err => console.error('Error:', err));