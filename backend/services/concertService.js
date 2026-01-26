const pool = require('../config/database');

const createConcertIfNotExists = async ({
    tour_id,
    venue_id,
    date,
    special_notes
}) => {
    const result = await pool.query(
        `INSERT INTO concerts (tour_id, venue_id, date, special_notes)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (tour_id, venue_id, date
        DO NOTHING
        RETURNING id)`,
        [tour_id, venue_id, date, special_notes]
    );

    return result.rows.length > 0;
};

module.exports = { createConcertIfNotExists };