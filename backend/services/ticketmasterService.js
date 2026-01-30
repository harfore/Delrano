const fetch = require('node-fetch');
require('dotenv').config({ path: __dirname + '/../.env' });

const API_KEY = process.env.TM_API_KEY;

if (!API_KEY) {
    throw new Error('Lost TM_API_KEY');
}

//  fetches music events from Ticketmaster API for specified DMA (Designated Market Area)
//  @param {number} dmaId - geographic region identifier
//  @returns {Promise<Array>} array of event objects
//  @throws {Error} on API failure or missing data

const fetchEvents = async (dmaId) => {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${dmaId}&apikey=${API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Ticketmaster error ${res.status}`)
    }

    const data = await res.json();
    return data._embedded?.events ?? [];
};

module.exports = { fetchEvents };