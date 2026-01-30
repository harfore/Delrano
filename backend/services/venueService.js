const pool = require('../config/database');

const findOrCreateVenue = async ({ name, city_id }) => {
    if (!name || !city_id) {
        throw new Error('Venue name and city_id are required');
    };

    const existing = await pool.query(
        'SELECT venue_id FROM venues WHERE name = $1 AND city_id = $2',
        [name, city_id]
    );

    if (existing.rows.length > 0) return existing.rows[0].venue_id;

    const result = await pool.query(
        `INSERT INTO venues (name, city_id)
        VALUES ($1, $2)
        ON CONFLICT (name, city_id)
        DO UPDATE SET name = EXCLUDED.name
        RETURNING venue_id`,
        [name, city_id]
    );

    return result.rows[0].venue_id;
};

module.exports = { findOrCreateVenue };