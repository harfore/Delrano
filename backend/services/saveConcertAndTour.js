const { normalizeEvent } = require('../utils/ticketmasterNormalizer');
const { findOrCreateCity } = require('./cityService');
const { findOrCreateTour } = require('./tourService');
const { findOrCreateVenue } = require('./venueService');
const { createConcertIfNotExists } = require('./concertService');

const saveConcertAndTour = async (rawEvent) => {
    try {
        const event = normalizeEvent(rawEvent);

        if (!event.name || !event.start_date) {
            throw new Error('Invalid normalized event');
        }

        const cityId = await findOrCreateCity(
            event.venue.city,
            event.venue.country,
            event.dmaId
        );

        const venueId = await findOrCreateVenue({
            name: event.venue.name,
            cityId
        });

        const tourId = await findOrCreateTour({
            name: event.name,
            artist_id: event.artist_id,
            start_date: event.start_date,
            end_date: event.end_date,
            image_urls: event.image_urls
        });

        await createConcertIfNotExists({
            tour_id: tourId,
            venue_id: venueId,
            date: event.start_date,
            special_notes: rawEvent.info ?? null
        });

    } catch (error) {
        console.error(
            `[saveConcertAndTour] Failed for event: ${rawEvent?.name}`,
            error.message
        );
        throw error;
    }
}