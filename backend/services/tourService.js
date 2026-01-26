const pool = require('../config/database');

const findOrCreateTour = async ({
    name,
    artist_id,
    start_date,
    end_date,
    image_urls = []
}) => {
    const client = await pool.connect();
    try {
        const existing = await client.query(
            `SELECT id FROM tours
            WHERE name = $1 AND artist_id = $2 AND start_date = $3`,
            [name, artist_id, start_date]
        );

        if (existing.rows.length) {
            return existing.rows[0].id;
        }

        const created = await client.query(
            `INSERT INTO tours (name, artist_id, start_date, end_date, image_urls)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
            [name, artist_id, start_date, end_date, image_urls]
        );

        return created.rows[0].id
    } finally {
        client.release();
    }
}

module.exports = { findOrCreateTour }