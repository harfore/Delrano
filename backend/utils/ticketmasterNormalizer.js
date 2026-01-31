const { findOrCreateArtist } = require('../services/artistService');

const safeDate = (date) => date ?? null;

const extractArtistName = (eventName) => {
    if (!eventName) return null;

    let main = eventName.split(/[-:]/)[0].trim();

    main = main.replace(/(?:Event|Concert|Ages\s?\d+\+).*$/i, '').trim();

    return main || null;
};

module.exports.normalizeEvent = async (event) => {

    const venue = event._embedded?.venues?.[0] ?? {};

    let artistId = event.artist_id ?? null;
    let artistName = event.artist_name ?? null;

    if (!artistId) {
        artistName = extractArtistName(event.name);
        artistId = await findOrCreateArtist(artistName);
        if (!artistId) {
            artistId = await findOrCreateArtist('Unknown Artist');
        }
    }

    return {
        // core data
        name: event.name ?? null,
        artist_id: artistId,

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