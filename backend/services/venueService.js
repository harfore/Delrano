const pool = require('../config/database');

const findOrCreateVenue = async ({ name, cityId, country }) => {
    if (!name || !cityId || !country) {
        throw new Error('Venue name, cityId and country are required');
    };

    const existing = await pool.query(
        'SELECT venue_id FROM venues WHERE name = $1 AND city_id = $2',
        [name, cityId]
    );

    if (existing.rows.length > 0) return existing.rows[0].venue_id;

    const result = await pool.query(
        `INSERT INTO venues (name, city_id, country)
        VALUES ($1, $2, $3)
        ON CONFLICT (name, city_id, country)
        DO UPDATE SET name = EXCLUDED.name
        RETURNING venue_id`,
        [name, cityId, country]
    );

    return result.rows[0].venue_id;
};

module.exports = { findOrCreateVenue };