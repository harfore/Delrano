import cron from 'node-cron';
import { DMA_REGISTRY } from '../constants/dmaRegistry';
const { normalizeEvent } = require('../utils/ticketmasterNormalizer')

class CityFeeder {
    constructor() {
        this.isRunning = false;
    }

    async feedAllCities() {
        if (this.isRunning) {
            console.log('CityFeeder already running, skipping.')
            return
        }
        this.isRunning = true;
        console.log('CityFeeder started')

        try {
            for (const dma of DMA_REGISTRY) {
                await this.processDma(dma);
            }
        } catch (err) {
            console.error('CityFeeder failed:', err);
        } finally {
            this.isRunning = false;
            setTimeout(() => this.feedAllCities(), FEED_INTERVAL_MS);
        }
    }

    async processDma({ dmaId }) {

        try {
            const events = await fetchEvents(dmaId);

            for (const event of events) {
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

export const cityFeeder = new CityFeeder();
