
const safeDate = (date) => date ?? null;

module.exports.normalizeEvent = (event) => {
    const venue = event._embedded?.venues?.[0] ?? {};


    return {
        // core data
        name: event.name ?? null,
        artist_id: event.artist_id ?? null,

        // dates
        start_date: safeDate(event.dates.start.localDate),
        end_date: safeDate(event.dates.end?.localDate) ?? safeDate(event.dates.start.localDate),

        // media
        image_urls: event.images?.[0]?.url ?? null,

        // preserve DMA ID from ticketmaster
        dmaId: event.dmaId ?? venue.dma?.dmaId ?? null,

        // location
        venue: {
            name: venue.name ?? 'Unknown Venue',
            city: venue.city?.name ?? null,
            country: venue.country?.name ?? null
        }
    };
}