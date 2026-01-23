import cron from 'node-cron';
import { DMA_REGISTRY } from '../constants/dmaRegistry';

// const FEED_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 hours

class CityFeeder {
    constructor() {
        this.isRunning = false;
    }

    async feedAllCities() {
        if (this.isRunning) return
        this.isRunning = true;

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
                        ...event,
                        dmaId // pass DMA ID to service
                    });
                } catch (error) {
                    console.error(`Failed to save ${event.name}:`, error.message);
                }

                await new Promise(resolve => setTimeout(resolve, 200)); // rate limiting
            }
        } catch (error) {
            console.error(`Failed DMA ${dmaId}:`, error.message);
        }
    }
}

const cityFeeder = new CityFeeder();

cron.schedule('0 */6 * * *', () => {
    feeder.feedAllCities();
});

// execution
if (import.meta.url === `file://${process.argv[1]}`) {
    new CityFeeder().feedAllCities();
}

export default cityFeeder;