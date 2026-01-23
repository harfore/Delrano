import { fetchEvents } from '../events/sources/ticketmasterService.js';
import { saveConcertAndTour } from '../events/eventService.js';
import { DMA_REGISTRY } from '../../constants/dmaRegistry.js';

// test parameters
const TEST_DMA = DMA_REGISTRY.find(dma => dma.name === 'New York'); // or any city
const MAX_EVENTS = 3; // limit for testing

const testFlow = async () => {
    try {
        console.log(`Testing with ${TEST_DMA.name} (DMA ${TEST_DMA.dmaId})...`);

        // 1. fetch events from ticketmaster
        const events = await fetchEvents(TEST_DMA.dmaId);
        console.log(`Found ${events.length} events`);

        for (const [index, event] of events.slice(0, MAX_EVENTS).entries()) {
            try {
                console.log(`\nProcessing ${index + 1}/${MAX_EVENTS}: ${event.name}`);

                // save to database
                const result = await saveConcertAndTour({
                    ...event,
                    dmaId: TEST_DMA.dmaId // pass DMA ID through
                });

                console.log('Saved:', {
                    cityId: result.cityId,
                    venueId: result.venueId,
                    tourId: result.tourId
                });
            } catch (error) {
                console.log('Failed:', error.message);
            }
            await new Promise(resolve => setTimeout(resolve, 500)); // rate limit
        }
    } catch (error) {
        console.error('Test failed:', error);
    }
};

testFlow();