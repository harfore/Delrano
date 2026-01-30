require('dotenv').config({ path: __dirname + '/../.env' });

const DMA_REGISTRY = require('../constants/dmaRegistry');
const { fetchEvents } = require('../services/ticketmasterService');
const { saveConcertAndTour } = require('../services/saveConcertAndTour');

class CityFeeder {
    constructor() {
        this.isRunning = false;
    };

    async feedAllCities() {
        if (this.isRunning) {
            console.log('CityFeeder already running, skipping.');
            return
        }
        this.isRunning = true;
        console.log('CityFeeder started');

        try {
            for (const dma of DMA_REGISTRY) {
                await this.processDma(dma);
            }
        } catch (err) {
            console.error('CityFeeder failed:', err);
        } finally {
            this.isRunning = false;
        }
    }

    async processDma({ dmaId }) {

        try {
            const events = await fetchEvents(dmaId);

            for (const rawEvent of events) {
                try {
                    await saveConcertAndTour({
                        ...rawEvent,
                        dmaId // pass DMA ID to service
                    })
                } catch (error) {
                    console.error(`Failed to save ${rawEvent.name}:`,
                        error.message);
                }

                await new Promise(resolve => setTimeout(resolve, 200)); // rate limiting
            }
        } catch (error) {
            console.error(`Failed DMA ${dmaId}:`, error.message);
        }
    }
}

module.exports = new CityFeeder();