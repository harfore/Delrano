export const normalizeEvent = (event) => {
    const venue = event._embedded?.venues?.[0] || {};


    return {
        // core data
        name: event.name,
        artist_id: event.artist_id || null,

        // dates
        start_date: event.dates.start.localDate,
        end_date: event.dates.end?.localDate || event.dates.start.localDate,

        // media
        image_urls: event.images?.[0]?.url || null,

        // preserve DMA ID from ticketmaster
        dmaId: event.dmaId || venue.dma?.dmaId,

        // location
        venue: {
            name: venue.name || 'Unknown Venue',
            city: venue.city?.name || null,
            country: venue.country?.name || null
        }
    };
};